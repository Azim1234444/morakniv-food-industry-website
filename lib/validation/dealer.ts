import { z } from "zod";

const CONTROL_ALL = new RegExp("[\u0000-\u001F\u007F]", "g");
const CONTROL_KEEP_LINE_BREAKS = new RegExp(
  "[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]",
  "g",
);

function singleLine(value: string): string {
  return value.replace(CONTROL_ALL, " ").replace(/\s+/g, " ").trim();
}

function addressText(value: string): string {
  return value
    .replace(/\r\n/g, "\n")
    .replace(CONTROL_KEEP_LINE_BREAKS, "")
    .split("\n")
    .map((line) => line.replace(/[\t ]+/g, " ").trim())
    .filter(Boolean)
    .join("\n")
    .trim();
}

const phoneSchema = z
  .string()
  .transform(singleLine)
  .pipe(
    z
      .string()
      .min(7, "Phone number is required.")
      .max(40, "Phone number must be 40 characters or fewer.")
      .regex(
        /^\+?[0-9() .-]+$/,
        "Enter a valid phone number using digits, spaces, brackets, + or -.",
      )
      .refine(
        (value) => {
          const digitCount = value.replace(/\D/g, "").length;
          return digitCount >= 7 && digitCount <= 15;
        },
        "Enter a phone number containing 7 to 15 digits.",
      ),
  );

export const dealerSchema = z.object({
  company_name: z
    .string()
    .transform(singleLine)
    .pipe(
      z
        .string()
        .min(2, "Company name is required.")
        .max(160, "Company name must be 160 characters or fewer."),
    ),
  address: z
    .string()
    .transform(addressText)
    .pipe(
      z
        .string()
        .min(5, "Address is required.")
        .max(500, "Address must be 500 characters or fewer."),
    ),
  phone_number: phoneSchema,
});

export const dealerIdSchema = z.uuid();

export type DealerInput = z.infer<typeof dealerSchema>;

export type DealerFieldErrors = Partial<
  Record<keyof DealerInput | "form", string[]>
>;

export type DealerActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: DealerFieldErrors;
};

export const initialDealerActionState: DealerActionState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
