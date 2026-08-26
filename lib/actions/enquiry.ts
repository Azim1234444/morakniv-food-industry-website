"use server";

import { headers } from "next/headers";

import { sendEnquiry } from "@/lib/email";
import { clientIpFrom, rateLimit } from "@/lib/rate-limit";
import {
  MIN_COMPLETION_MS,
  enquirySubmissionSchema,
  type EnquiryState,
  type FieldErrors,
} from "@/lib/validation/enquiry";
import { z } from "zod";

/**
 * Enquiry Server Action.
 *
 * SECURITY POSTURE
 * Client-side validation is a convenience for the person filling in the form
 * and carries no weight here: every submission is re-parsed from raw FormData
 * against the Zod schema before anything is read, sent or logged. The schema
 * strips control characters from every field, which also removes the CR/LF
 * that a header-injection attempt would need — belt and braces alongside
 * Resend's JSON API, which never concatenates headers as strings.
 *
 * LOGGING
 * Nothing a customer typed is logged. Failures record the reason and, at most,
 * a truncated IP-derived key. The message body, email address, phone number
 * and company name never reach the server log.
 */

/* Five submissions per ten minutes from one address. Generous for a buyer
   sending several product enquiries; useless for a script. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

const GENERIC_REJECTION =
  "Your enquiry could not be submitted. Please reload the page and try again.";

function errorState(message: string, fieldErrors: FieldErrors = {}): EnquiryState {
  return { status: "error", message, fieldErrors };
}

export async function submitEnquiry(
  _prevState: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  /* ---------------------------------------------------------------------
     0. Reject a malformed invocation outright.

        A well-behaved browser always sends FormData here. A hand-rolled POST
        to the action endpoint may not, and reading `.entries()` off whatever
        arrives would throw a 500 - an error page is a worse answer than a
        refusal, and a noisier one in the logs.
     --------------------------------------------------------------------- */
  if (!(formData instanceof FormData)) {
    console.warn("[enquiry] rejected: malformed request body");
    return errorState(GENERIC_REJECTION);
  }

  /* ---------------------------------------------------------------------
     1. Rate limit — cheapest rejection, so it runs before any parsing.
     --------------------------------------------------------------------- */
  const requestHeaders = await headers();
  const ip = clientIpFrom(requestHeaders);
  const limit = rateLimit(`enquiry:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);

  if (!limit.allowed) {
    const minutes = Math.max(1, Math.ceil(limit.retryAfter / 60));
    console.warn("[enquiry] rate limited");
    return errorState(
      `Too many enquiries have been sent from this connection. Please try again in about ${minutes} minute${
        minutes === 1 ? "" : "s"
      }.`,
    );
  }

  /* ---------------------------------------------------------------------
     2. Shape check. FormData values can be File objects; anything that is
        not a string is rejected outright rather than coerced.
     --------------------------------------------------------------------- */
  const raw: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (typeof value !== "string") {
      console.warn("[enquiry] rejected: non-string field");
      return errorState(GENERIC_REJECTION);
    }
    raw[key] = value;
  }

  /* ---------------------------------------------------------------------
     3. Validate. This is the authoritative pass.
     --------------------------------------------------------------------- */
  const parsed = enquirySubmissionSchema.safeParse(raw);

  if (!parsed.success) {
    const flattened = z.flattenError(parsed.error);

    /*
     * The honeypot and the timestamp are invisible to a real user, so a
     * failure there must not surface as a field error pointing at a field
     * nobody can see. Treat it as a silent, generic rejection instead.
     */
    if (flattened.fieldErrors.website || flattened.fieldErrors.renderedAt) {
      console.warn("[enquiry] rejected: spam signal");
      return errorState(GENERIC_REJECTION);
    }

    return errorState(
      "Please check the highlighted fields and try again.",
      flattened.fieldErrors as FieldErrors,
    );
  }

  const { website, renderedAt, ...fields } = parsed.data;

  /* Belt and braces: the schema already requires this to be empty. */
  if (website !== "") {
    console.warn("[enquiry] rejected: honeypot");
    return errorState(GENERIC_REJECTION);
  }

  /* ---------------------------------------------------------------------
     4. Completion time. `renderedAt` is stamped by the server when the page
        renders, not by the browser, so client clock skew cannot produce a
        false positive here.
     --------------------------------------------------------------------- */
  const elapsed = Date.now() - renderedAt;

  if (renderedAt <= 0 || elapsed < 0) {
    console.warn("[enquiry] rejected: invalid render timestamp");
    return errorState(GENERIC_REJECTION);
  }

  if (elapsed < MIN_COMPLETION_MS) {
    console.warn("[enquiry] rejected: submitted too quickly");
    return errorState(
      "That was submitted faster than expected. Please take a moment and send it again.",
    );
  }

  /* ---------------------------------------------------------------------
     5. Deliver. A failure here is reported honestly — the customer is given
        a working alternative rather than a thank-you for a message that
        never arrived.
     --------------------------------------------------------------------- */
  const result = await sendEnquiry(fields, new Date());

  if (!result.delivered) {
    if (result.reason === "not-configured") {
      console.error(
        `[enquiry] email not configured; missing: ${result.missing.join(", ")}`,
      );
    } else {
      console.error(`[enquiry] delivery failed: ${result.error}`);
    }

    return errorState(
      "We could not send your enquiry just now. Please try again shortly, or contact us using the details on this page.",
    );
  }

  return {
    status: "success",
    message: result.acknowledged
      ? "Thank you — your enquiry has been sent. A copy has been emailed to you for your records."
      : "Thank you — your enquiry has been sent.",
    fieldErrors: {},
  };
}
