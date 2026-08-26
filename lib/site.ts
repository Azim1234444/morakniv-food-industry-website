/**
 * Site-wide constants.
 *
 * SOURCING RULE
 * Every factual value below is taken from the client-supplied materials in
 * `public/documents/`. Nothing here is inferred or invented.
 *
 * The Malaysian operating entity is NOT described in any supplied document —
 * no legal name, registration number, address, phone or email appears in the
 * catalogue, the B2B portal manual, the press release or the three compliance
 * declarations. Those fields are therefore marked `PENDING_CLIENT` rather than
 * filled with plausible-looking placeholders. Grep for `PENDING_CLIENT` to find
 * everything still awaiting confirmation.
 *
 * No distributor, dealer or "authorised" status is asserted anywhere on this
 * site, because no supplied document establishes one.
 */

export const PENDING_CLIENT = null;

/** Public base URL. Set NEXT_PUBLIC_SITE_URL once the domain is confirmed. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "Morakniv Food Industry Malaysia",
  shortName: "Morakniv Food Industry",
  /* Catalogue cover title, p.1 */
  tagline: "Professional Food Industry Knives",
  description:
    "Professional food industry knives made in Mora, Sweden since 1891. Boning, butcher, filleting, trimming and chef's knives in Swedish stainless steel, with food contact material declarations from Morakniv AB, for meat processors, slaughterhouses and professional kitchens.",
  locale: "en_MY",
  lang: "en",
} as const;

/**
 * Manufacturer details — catalogue p.43 and the compliance declarations.
 * These describe Morakniv AB in Sweden, not the Malaysian operation.
 */
export const manufacturer = {
  legalName: "Morakniv AB",
  postalAddress: ["Box 407", "SE-792 27 Mora", "Sweden"],
  visitingAddress: ["Bjäkenbacken 4", "SE-792 95 Mora", "Sweden"],
  telephone: "+46 250-59 50 00",
  email: "info@morakniv.se",
  orderEmail: "order@morakniv.se",
  website: "https://www.morakniv.se",
  b2bPortal: "https://morakniv.gung.io",
} as const;

/**
 * Malaysian operating entity — awaiting client confirmation.
 * Do not populate these from assumption; see the sourcing rule above.
 */
export const localEntity = {
  legalName: PENDING_CLIENT,
  registrationNumber: PENDING_CLIENT,
  address: PENDING_CLIENT,
  telephone: PENDING_CLIENT,
  email: PENDING_CLIENT,
  businessHours: PENDING_CLIENT,
  /** Relationship to Morakniv AB is undocumented — see project analysis §16.2 */
  relationshipToManufacturer: PENDING_CLIENT,
} as const;

/** Heritage facts — press release and catalogue pp.6–7. */
export const heritage = {
  foundedYear: 1891,
  founder: "Frost-Erik Erson",
  origin: "Mora, Sweden",
  rebrandDate: "29 September 2025",
} as const;
