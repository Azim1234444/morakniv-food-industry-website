import { Resend } from "resend";

/**
 * Thin transport wrapper around Resend.
 *
 * The API key is read from the environment by the caller and passed in — it is
 * never read here, never defaulted, and never written to a log. The client is
 * cached per key so repeated submissions in one warm instance do not rebuild
 * it, while a key rotation still takes effect without a redeploy.
 *
 * This module is server-only. It must never be imported from a Client
 * Component; doing so would attempt to bundle the key into the browser.
 */

import "server-only";

export type SendMailInput = {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export type SendMailResult =
  | { ok: true; id: string | null }
  | { ok: false; error: string };

let cachedKey: string | null = null;
let cachedClient: Resend | null = null;

function clientFor(apiKey: string): Resend {
  if (cachedClient && cachedKey === apiKey) return cachedClient;
  cachedClient = new Resend(apiKey);
  cachedKey = apiKey;
  return cachedClient;
}

export async function sendMail({
  apiKey,
  from,
  to,
  subject,
  html,
  text,
  replyTo,
}: SendMailInput): Promise<SendMailResult> {
  try {
    const { data, error } = await clientFor(apiKey).emails.send({
      from,
      to,
      subject,
      html,
      text,
      ...(replyTo ? { replyTo } : {}),
    });

    if (error) {
      /*
       * Resend's error carries the provider's own message (bad key, unverified
       * sending domain, invalid recipient) and no submission content, so it is
       * safe to surface into the server log.
       */
      return { ok: false, error: `${error.name}: ${error.message}` };
    }

    return { ok: true, id: data?.id ?? null };
  } catch (cause) {
    /* Network or SDK failure. Message only — never the request body. */
    const message = cause instanceof Error ? cause.message : "Unknown error";
    return { ok: false, error: message };
  }
}
