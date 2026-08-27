/**
 * The client-supplied PDFs, as copied into `public/documents/`.
 *
 * `bytes` is the real on-disk size, so download links can state the weight
 * honestly — users on metered connections deserve the warning.
 *
 * There is no downloads or resources page. Every document below is published
 * by exactly one page, the one whose subject it belongs to:
 *
 *   - `complianceDocuments` -> /quality-compliance
 *   - `b2bManual`           -> /how-to-order
 *   - `pressRelease`        -> /news/frosts-becomes-morakniv
 *
 * Nothing here may be collected into a general-purpose download index. If a
 * document has no page that it belongs to, it does not get published.
 *
 * The 2026 product catalogue is deliberately not published. It is still cited
 * in prose across the site as the source of article numbers and technical
 * claims, but the file is not offered for download and must not be re-added
 * without the client asking for it.
 *
 * The Ashwood Outdoor declaration that shipped with the client materials has
 * been removed from `public/documents/` altogether. It covers a different
 * product line, and once the downloads page was retired there was no context
 * left on the site that made its scope unambiguous. `/quality-compliance`
 * tells readers it exists and to ask us for it; do not re-add the file.
 *
 * The Frosts food-contact-material declaration has likewise been withdrawn, at
 * the client's request: it describes the older Frosts/PUG context rather than
 * the current range. Its PDF has been moved out of `public/` to
 * `documents-unpublished/` so it stays with the project without being served.
 * It is not to be replaced by another declaration, and no PUG or handle
 * information is to be written from it — the client has not yet supplied the
 * updated catalogue those changes depend on.
 *
 * `scope` separates food-industry documents from corporate ones.
 */

export type DocumentScope = "food-industry" | "corporate";

export type ClientDocument = {
  id: string;
  title: string;
  description: string;
  href: string;
  bytes: number;
  /** Date printed on the document itself, where one is stated. */
  issued?: string;
  scope: DocumentScope;
};

export function formatBytes(bytes: number): string {
  if (bytes >= 1_048_576) {
    return `${(bytes / 1_048_576).toFixed(1)} MB`;
  }
  return `${Math.round(bytes / 1024)} KB`;
}

export const b2bManual: ClientDocument = {
  id: "b2b-manual",
  title: "Gung B2B Portal — User Manual (English)",
  description:
    "Step-by-step guide to the manufacturer's ordering portal: logging in, finding products, importing orders from Excel, checkout, and downloading product data.",
  href: "/documents/morakniv-b2b-portal-user-manual-en.pdf",
  bytes: 1_383_724,
  scope: "corporate",
};

export const pressRelease: ClientDocument = {
  id: "press-release-2025",
  title: "Press release — Frosts becomes Morakniv",
  description:
    "Morakniv AB's announcement that the Frosts brand is consolidating under the Morakniv name, and that food-industry sales support is being expanded.",
  href: "/documents/press-release-frosts-becomes-morakniv-2025.pdf",
  bytes: 112_207,
  scope: "corporate",
};

export const docHandleMaterials: ClientDocument = {
  id: "doc-handle-materials",
  title: "Declaration of Compliance — Knife handle materials",
  description:
    "Covers the polypropylene and compound materials used in knife handles, declared against the EU plastics regulation.",
  href: "/documents/declaration-of-compliance-food-pp.pdf",
  bytes: 37_776,
  issued: "6 May 2025",
  scope: "food-industry",
};

/**
 * Food-industry compliance documents — safe for /quality-compliance.
 *
 * The array is the single source of truth for that page, so adding or removing
 * an entry is all that publishing or withdrawing a declaration requires.
 */
export const complianceDocuments: ClientDocument[] = [docHandleMaterials];
