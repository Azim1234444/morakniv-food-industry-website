/**
 * The client-supplied PDFs, as copied into `public/documents/`.
 *
 * `bytes` is the real on-disk size, so download links can state the weight
 * honestly — the catalogue is 21.9 MB and users on metered connections
 * deserve the warning.
 *
 * `scope` separates food-industry documents from the one declaration that
 * covers a different product line entirely (see `ashWoodOutdoor`).
 */

export type DocumentScope = "food-industry" | "outdoor" | "corporate";

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

export const catalogue: ClientDocument = {
  id: "catalogue-2026",
  title: "Professional Food Industry Knives 2026",
  description:
    "The full 44-page product catalogue: technical background on steel, blades and handles, plus the complete assortment across all eight categories.",
  href: "/documents/morakniv-food-industry-catalogue-2026.pdf",
  bytes: 22_999_164,
  scope: "food-industry",
};

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

export const docFoodContact: ClientDocument = {
  id: "doc-food-contact",
  title: "Declaration of Compliance — Food contact material",
  description:
    "Covers FROSTS®/Morakniv food industry knives with stainless steel blades and handles in polypropylene, polyamides and thermoplastic elastomers.",
  href: "/documents/doc-food-contact-material-frosts.pdf",
  bytes: 71_968,
  issued: "19 February 2025",
  scope: "food-industry",
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
 * NOT a food-industry document.
 *
 * This declaration covers the Ashwood Outdoor collection — coated stainless
 * blades on outdoor knives — and cites FDA 21 CFR 170.39 alongside the EU
 * regulations. It is deliberately kept off `/quality-compliance`, which deals
 * only with the food-industry range, and is published on `/downloads` under an
 * explicit heading so nobody mistakes its scope.
 */
export const ashWoodOutdoor: ClientDocument = {
  id: "doc-ash-wood-outdoor",
  title: "Declaration of Compliance — Ashwood Outdoor collection",
  description:
    "Covers outdoor knives with coated stainless steel blades. Supplied with the client materials but outside the food-industry range.",
  href: "/documents/doc-food-contact-material-ash-wood.pdf",
  bytes: 73_388,
  issued: "19 February 2025",
  scope: "outdoor",
};

/** Food-industry compliance documents — safe for /quality-compliance. */
export const complianceDocuments: ClientDocument[] = [
  docFoodContact,
  docHandleMaterials,
];

export const allDocuments: ClientDocument[] = [
  catalogue,
  docFoodContact,
  docHandleMaterials,
  b2bManual,
  pressRelease,
];
