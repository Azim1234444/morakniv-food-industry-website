/**
 * Shared helpers for the transactional email templates.
 *
 * Emails are built as strings, so every interpolated value is user input until
 * proven otherwise. `escapeHtml` is applied at every interpolation point
 * without exception — there is no "this field is safe" shortcut, because the
 * next person to add a field will copy whichever line they read first.
 *
 * Layout is deliberately table-and-inline-style: email clients remain the last
 * place on the web where a flexbox layout cannot be relied on.
 */

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]!);
}

/** Escapes, then turns newlines into <br> for multi-line fields. */
export function escapeMultiline(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

/* Palette mirrors the site tokens in app/globals.css. */
export const BRAND = "#b72d25";
export const INK = "#17181a";
export const INK_MUTED = "#4c5157";
export const INK_SUBTLE = "#71767d";
export const LINE = "#e4e4e2";
export const SURFACE_ALT = "#f7f7f6";

const FONT_STACK =
  "'Helvetica Neue', Helvetica, Arial, system-ui, sans-serif";

type LayoutOptions = {
  /** Small uppercase label above the title. */
  eyebrow: string;
  title: string;
  /** Pre-rendered, already-escaped HTML. */
  body: string;
  /** Pre-rendered, already-escaped HTML for the footer note. */
  footer: string;
};

/**
 * Outer shell shared by both emails: a plain white card on a light ground,
 * a red rule, and a footnote. No images — nothing to block, nothing to load.
 */
export function layout({ eyebrow, title, body, footer }: LayoutOptions): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:${SURFACE_ALT};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${SURFACE_ALT};">
<tr>
<td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;background-color:#ffffff;border:1px solid ${LINE};">
<tr>
<td style="height:3px;background-color:${BRAND};font-size:0;line-height:0;">&nbsp;</td>
</tr>
<tr>
<td style="padding:36px 36px 8px 36px;font-family:${FONT_STACK};">
<p style="margin:0 0 14px 0;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:${INK_SUBTLE};">${escapeHtml(eyebrow)}</p>
<h1 style="margin:0;font-size:22px;line-height:1.25;font-weight:600;color:${INK};">${escapeHtml(title)}</h1>
</td>
</tr>
<tr>
<td style="padding:24px 36px 36px 36px;font-family:${FONT_STACK};font-size:15px;line-height:1.6;color:${INK_MUTED};">
${body}
</td>
</tr>
<tr>
<td style="padding:20px 36px 28px 36px;border-top:1px solid ${LINE};font-family:${FONT_STACK};font-size:12px;line-height:1.6;color:${INK_SUBTLE};">
${footer}
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`;
}

/** One label/value row of the details table. Both sides are escaped here. */
export function detailRow(label: string, value: string): string {
  return `<tr>
<td style="padding:10px 16px 10px 0;border-bottom:1px solid ${LINE};font-family:${FONT_STACK};font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${INK_SUBTLE};white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
<td style="padding:10px 0;border-bottom:1px solid ${LINE};font-family:${FONT_STACK};font-size:15px;line-height:1.5;color:${INK};vertical-align:top;">${escapeMultiline(value)}</td>
</tr>`;
}

/**
 * Timestamp shown in Malaysian time with the UTC equivalent alongside.
 * Two zones, because an order desk and a server log should never disagree
 * about when something arrived.
 */
export function formatTimestamp(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const myt = new Intl.DateTimeFormat("en-GB", {
    ...options,
    timeZone: "Asia/Kuala_Lumpur",
  }).format(date);

  const utc = new Intl.DateTimeFormat("en-GB", {
    ...options,
    timeZone: "UTC",
  }).format(date);

  return `${myt} (MYT) — ${utc} (UTC)`;
}
