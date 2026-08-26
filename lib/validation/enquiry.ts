import { z } from "zod";

import { COUNTRIES } from "@/lib/countries";

/*
 * Control-character classes, built from strings so this source file never
 * contains a literal control byte.
 * CONTROL_ALL      - C0 range plus DEL, including CR/LF and tab.
 * CONTROL_KEEP_WS  - the same, but preserving \n and \t.
 */
const CONTROL_ALL = new RegExp("[\u0000-\u001F\u007F]", "g");
const CONTROL_KEEP_WS = new RegExp(
  "[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]",
  "g",
);

/**
 * Enquiry validation.
 *
 * This schema is the single source of truth for both the client (UX hints) and
 * the server (authoritative). Client-side validation is never trusted: the
 * Server Action re-parses the raw FormData with `enquirySubmissionSchema`
 * before anything is sent anywhere.
 */

/** Enquiry types, matching the options offered in the UI. */
export const ENQUIRY_TYPES = [
  { value: "general", label: "General enquiry" },
  { value: "product", label: "Product enquiry" },
  { value: "quotation", label: "Quotation" },
  { value: "distribution", label: "Distribution" },
  { value: "technical", label: "Technical enquiry" },
] as const;

export const ENQUIRY_TYPE_VALUES = ENQUIRY_TYPES.map(
  (type) => type.value,
) as unknown as [string, ...string[]];

export function enquiryTypeLabel(value: string): string {
  return ENQUIRY_TYPES.find((type) => type.value === value)?.label ?? value;
}

/**
 * Collapses a value to a single line, stripping all control characters
 * (C0 range plus DEL) including CR and LF.
 *
 * Values from this form reach an email subject and a reply-to address.
 * Removing newlines here closes off header-injection attempts at the boundary,
 * independently of the transport — Resend takes JSON so headers are never
 * string-concatenated, but the guarantee should not depend on that.
 */
function singleLine(value: string): string {
  return value
    .replace(CONTROL_ALL, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Multi-line text: keeps newlines and tabs, drops other control characters. */
function multiLine(value: string): string {
  return value
    .replace(/\r\n/g, "\n")
    .replace(CONTROL_KEEP_WS, "")
    .trim();
}

const requiredLine = (min: number, max: number, label: string) =>
  z
    .string()
    .transform(singleLine)
    .pipe(
      z
        .string()
        .min(min, `${label} must be at least ${min} characters.`)
        .max(max, `${label} must be ${max} characters or fewer.`),
    );

const optionalLine = (max: number, label: string) =>
  z
    .string()
    .transform(singleLine)
    .pipe(z.string().max(max, `${label} must be ${max} characters or fewer.`))
    .transform((value) => (value === "" ? undefined : value));

/** The fields a person actually fills in. */
export const enquiryFieldsSchema = z.object({
  name: requiredLine(2, 100, "Name"),

  company: requiredLine(2, 120, "Company"),

  email: z
    .string()
    .transform(singleLine)
    .pipe(
      z
        .email("Enter a valid email address.")
        .max(200, "Email must be 200 characters or fewer."),
    ),

  phone: optionalLine(40, "Phone"),

  country: z
    .string()
    .transform(singleLine)
    .pipe(
      z.enum(
        COUNTRIES as unknown as [string, ...string[]],
        "Select a country from the list.",
      ),
    ),

  enquiryType: z.enum(
    ENQUIRY_TYPE_VALUES,
    "Select an enquiry type from the list.",
  ),

  /**
   * Free text. Deliberately NOT validated against the catalogue: a value
   * arriving from a query string is treated as user input, never as verified
   * product data.
   */
  articleNo: optionalLine(60, "Article number"),

  quantity: optionalLine(60, "Quantity"),

  message: z
    .string()
    .transform(multiLine)
    .pipe(
      z
        .string()
        .min(10, "Please give us a little more detail (at least 10 characters).")
        .max(4000, "Message must be 4000 characters or fewer."),
    ),

  consent: z
    .string()
    .optional()
    .transform((value) => value === "on" || value === "true")
    .pipe(
      z.literal(
        true,
        "Please confirm you agree to your details being used to respond to this enquiry.",
      ),
    ),
});

export type EnquiryFields = z.infer<typeof enquiryFieldsSchema>;

/**
 * Server-side schema: the visible fields plus two anti-spam signals.
 *
 * Both are weak by design — a determined bot can forge either, since the
 * timestamp is client-supplied. They exist to filter naive form-spam without
 * putting a CAPTCHA in front of a B2B buyer. Escalate to Turnstile only if
 * real spam appears.
 */
export const enquirySubmissionSchema = enquiryFieldsSchema.extend({
  /** Hidden field. Real users never see it, so it must arrive empty. */
  website: z
    .string()
    .optional()
    .transform((value) => value ?? "")
    .pipe(z.literal("", "Submission rejected.")),

  /** Millisecond timestamp written when the form rendered. */
  renderedAt: z
    .string()
    .optional()
    .transform((value) => Number(value ?? 0))
    .pipe(z.number().finite()),
});

export type EnquirySubmission = z.infer<typeof enquirySubmissionSchema>;

/** Shortest plausible time for a human to complete this form. */
export const MIN_COMPLETION_MS = 3000;

export type FieldErrors = Partial<
  Record<keyof EnquiryFields | "form", string[]>
>;

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: FieldErrors;
};

export const initialEnquiryState: EnquiryState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
