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
 * Optional acknowledgement sent back to the person who submitted the form.
 *
 * WORDING RULE — do not relax this.
 * The copy confirms receipt and nothing else. It must not state or imply a
 * response time, a quotation turnaround, a delivery lead time, pricing, or
 * stock availability. None of those are established by any supplied client
 * material, and an automated email is the easiest place in a business to
 * accidentally create a commitment nobody agreed to.
 */

export type AcknowledgementEmail = {
  subject: string;
  html: string;
  text: string;
};

export function buildEnquiryAcknowledgement(
  fields: EnquiryFields,
  submittedAt: Date,
): AcknowledgementEmail {
  const typeLabel = enquiryTypeLabel(fields.enquiryType);
  const timestamp = formatTimestamp(submittedAt);

  const subject = "We have received your enquiry — Morakniv Food Industry";

  const rows = [
    detailRow("Enquiry type", typeLabel),
    detailRow("Company", fields.company),
    fields.articleNo ? detailRow("Article number", fields.articleNo) : "",
    fields.quantity ? detailRow("Quantity", fields.quantity) : "",
    detailRow("Submitted", timestamp),
  ]
    .filter(Boolean)
    .join("\n");

  const body = `
<p style="margin:0 0 18px 0;">Dear ${escapeHtml(fields.name)},</p>

<p style="margin:0 0 18px 0;">Thank you for contacting Morakniv Food Industry Malaysia. This message confirms that your enquiry has reached us and has been passed to our team for review.</p>

<p style="margin:0 0 24px 0;">A copy of your submission is included below for your records.</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
${rows}
</table>

<p style="margin:28px 0 10px 0;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${INK_SUBTLE};">Your message</p>
<div style="padding:16px 18px;background-color:${SURFACE_ALT};border-left:2px solid ${BRAND};font-size:15px;line-height:1.65;color:${INK};">${escapeMultiline(
    fields.message,
  )}</div>

<p style="margin:28px 0 0 0;">If any detail above is incorrect, simply reply to this email with the correction.</p>`.trim();

  const footer = `
<p style="margin:0 0 8px 0;">This is an automated acknowledgement of receipt. It is not a quotation, an order confirmation, or a confirmation of product availability.</p>
<p style="margin:0;">Your details are used to respond to this enquiry. Morakniv is a registered trademark of Morakniv AB, Mora, Sweden.</p>`.trim();

  const html = layout({
    eyebrow: "Enquiry received",
    title: "Thank you for your enquiry.",
    body,
    footer,
  });

  const text = [
    `Dear ${fields.name},`,
    "",
    "Thank you for contacting Morakniv Food Industry Malaysia. This message",
    "confirms that your enquiry has reached us and has been passed to our team",
    "for review.",
    "",
    "A copy of your submission is included below for your records.",
    "",
    `Enquiry type:  ${typeLabel}`,
    `Company:       ${fields.company}`,
    fields.articleNo ? `Article no:    ${fields.articleNo}` : null,
    fields.quantity ? `Quantity:      ${fields.quantity}` : null,
    `Submitted:     ${timestamp}`,
    "",
    "Your message:",
    fields.message,
    "",
    "If any detail above is incorrect, simply reply to this email with the",
    "correction.",
    "",
    "---",
    "This is an automated acknowledgement of receipt. It is not a quotation, an",
    "order confirmation, or a confirmation of product availability.",
    "Your details are used to respond to this enquiry.",
    "Morakniv is a registered trademark of Morakniv AB, Mora, Sweden.",
  ]
    .filter((line) => line !== null)
    .join("\n");

  return { subject, html, text };
}
