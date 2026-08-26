import "server-only";

import { autoReplyEnabled, getEmailConfig } from "@/lib/email/config";
import { sendMail } from "@/lib/email/resend";
import { buildEnquiryAcknowledgement } from "@/lib/email/templates/enquiry-acknowledgement";
import { buildEnquiryNotification } from "@/lib/email/templates/enquiry-notification";
import type { EnquiryFields } from "@/lib/validation/enquiry";

/**
 * Enquiry delivery.
 *
 * The single rule this module exists to enforce: never report success that did
 * not happen. If the environment is not configured, or the provider rejects
 * the send, the caller is told so explicitly and shows the customer a fallback
 * route rather than a cheerful "thank you" for a message that went nowhere.
 */

export type DeliveryResult =
  | { delivered: true; acknowledged: boolean }
  | { delivered: false; reason: "not-configured"; missing: string[] }
  | { delivered: false; reason: "send-failed"; error: string };

export async function sendEnquiry(
  fields: EnquiryFields,
  submittedAt: Date,
): Promise<DeliveryResult> {
  const configResult = getEmailConfig();

  if (!configResult.ok) {
    return {
      delivered: false,
      reason: "not-configured",
      missing: configResult.missing,
    };
  }

  const { apiKey, to, from } = configResult.config;
  const notification = buildEnquiryNotification(fields, submittedAt);

  const sent = await sendMail({
    apiKey,
    from,
    to,
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
    /* Lets the desk reply straight to the customer from their mail client. */
    replyTo: notification.replyTo,
  });

  if (!sent.ok) {
    return { delivered: false, reason: "send-failed", error: sent.error };
  }

  /*
   * The acknowledgement is best-effort and deliberately non-fatal. The enquiry
   * has already reached the inbox at this point; failing the whole submission
   * because a courtesy copy bounced would make the customer send it twice.
   */
  let acknowledged = false;

  if (autoReplyEnabled()) {
    const acknowledgement = buildEnquiryAcknowledgement(fields, submittedAt);

    const ack = await sendMail({
      apiKey,
      from,
      to: fields.email,
      subject: acknowledgement.subject,
      html: acknowledgement.html,
      text: acknowledgement.text,
      /* A customer replying to the acknowledgement should reach the desk. */
      replyTo: to,
    });

    acknowledged = ack.ok;

    if (!ack.ok) {
      console.warn("[enquiry] acknowledgement not sent:", ack.error);
    }
  }

  return { delivered: true, acknowledged };
}
