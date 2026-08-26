import type { EnquiryFields } from "@/lib/validation/enquiry";
import { enquiryTypeLabel } from "@/lib/validation/enquiry";

import {
  BRAND,
  INK,
  INK_SUBTLE,
  SURFACE_ALT,
  detailRow,
  escapeHtml,
  escapeMultiline,
  formatTimestamp,
  layout,
} from "./shared";

/**
 * Internal notification sent to the enquiry inbox.
 *
 * Everything the sender typed is reproduced verbatim (escaped, never
 * interpreted). The article number is presented as *what the customer entered*
 * rather than as a resolved catalogue product — the form does not validate it
 * against the catalogue, and this email must not imply that it did.
 */

export type NotificationEmail = {
  subject: string;
  html: string;
  text: string;
  /** Set as Reply-To so the desk can answer the customer directly. */
  replyTo: string;
};

export function buildEnquiryNotification(
  fields: EnquiryFields,
  submittedAt: Date,
): NotificationEmail {
  const typeLabel = enquiryTypeLabel(fields.enquiryType);
  const timestamp = formatTimestamp(submittedAt);

  /*
   * The subject carries the two facts a busy inbox sorts on. Both values have
   * already had control characters stripped by the schema's `singleLine`
   * transform, so no newline can reach a header here.
   */
  const subject = fields.articleNo
    ? `${typeLabel} — ${fields.company} (article ${fields.articleNo})`
    : `${typeLabel} — ${fields.company}`;

  const rows = [
    detailRow("Enquiry type", typeLabel),
    detailRow("Name", fields.name),
    detailRow("Company", fields.company),
    detailRow("Email", fields.email),
    fields.phone ? detailRow("Phone", fields.phone) : "",
    detailRow("Country", fields.country),
    fields.articleNo ? detailRow("Article number", fields.articleNo) : "",
    fields.quantity ? detailRow("Quantity", fields.quantity) : "",
    detailRow("Received", timestamp),
  ]
    .filter(Boolean)
    .join("\n");

  const body = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
${rows}
</table>

<p style="margin:28px 0 10px 0;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${INK_SUBTLE};">Message</p>
<div style="padding:16px 18px;background-color:${SURFACE_ALT};border-left:2px solid ${BRAND};font-size:15px;line-height:1.65;color:${INK};">${escapeMultiline(
    fields.message,
  )}</div>

<p style="margin:28px 0 0 0;font-size:14px;line-height:1.6;">
Reply directly to this email to reach <a href="mailto:${escapeHtml(
    fields.email,
  )}" style="color:${BRAND};">${escapeHtml(fields.email)}</a>.
</p>`.trim();

  const footer = `
<p style="margin:0 0 8px 0;">Sent from the enquiry form on the Morakniv Food Industry Malaysia website.</p>
<p style="margin:0;">The article number above is the value typed by the sender. It has not been validated against the product catalogue and should be confirmed before quoting.</p>`.trim();

  const html = layout({
    eyebrow: "New enquiry",
    title: `${typeLabel} from ${fields.company}`,
    body,
    footer,
  });

  const text = [
    `NEW ENQUIRY — ${typeLabel}`,
    "",
    `Name:        ${fields.name}`,
    `Company:     ${fields.company}`,
    `Email:       ${fields.email}`,
    fields.phone ? `Phone:       ${fields.phone}` : null,
    `Country:     ${fields.country}`,
    fields.articleNo ? `Article no:  ${fields.articleNo}` : null,
    fields.quantity ? `Quantity:    ${fields.quantity}` : null,
    `Received:    ${timestamp}`,
    "",
    "Message:",
    fields.message,
    "",
    "---",
    "Sent from the enquiry form on the Morakniv Food Industry Malaysia website.",
    "The article number is as typed by the sender and has not been validated",
    "against the product catalogue.",
  ]
    .filter((line) => line !== null)
    .join("\n");

  return { subject, html, text, replyTo: fields.email };
}
