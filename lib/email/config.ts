/**
 * Email configuration, read from the environment at call time.
 *
 * No address or key is hardcoded anywhere in application logic. If a variable
 * is missing the system reports "not configured" rather than falling back to a
 * default recipient — silently mailing the wrong inbox is worse than failing.
 */

export type EmailConfig = {
  apiKey: string;
  to: string;
  from: string;
};

export type ConfigResult =
  | { ok: true; config: EmailConfig }
  | { ok: false; missing: string[] };

const REQUIRED = [
  "RESEND_API_KEY",
  "ENQUIRY_TO_EMAIL",
  "ENQUIRY_FROM_EMAIL",
] as const;

export function getEmailConfig(): ConfigResult {
  const missing = REQUIRED.filter((name) => !process.env[name]?.trim());

  if (missing.length > 0) {
    return { ok: false, missing: [...missing] };
  }

  return {
    ok: true,
    config: {
      apiKey: process.env.RESEND_API_KEY!.trim(),
      to: process.env.ENQUIRY_TO_EMAIL!.trim(),
      from: process.env.ENQUIRY_FROM_EMAIL!.trim(),
    },
  };
}

/** Optional: send the customer an acknowledgement. Off unless explicitly on. */
export function autoReplyEnabled(): boolean {
  return process.env.ENQUIRY_AUTOREPLY === "true";
}
