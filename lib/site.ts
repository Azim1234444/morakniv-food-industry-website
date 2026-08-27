/**
 * Site-wide constants.
 *
 * TWO COMPANIES, DELIBERATELY KEPT APART
 * `manufacturer` describes Morakniv AB in Sweden — the company that designs,
 * makes and owns the Morakniv brand. `distributor` describes Akmal Station,
 * the Malaysian business that distributes and imports those products here.
 * They are separate legal entities. No copy on this site may merge them, and
 * nothing may imply that Akmal Station is Morakniv AB.
 *
 * WORDING RULE
 * Akmal Station is described as a "distributor and importer of Morakniv
 * products in Malaysia" — never "official", "authorised", "exclusive" or
 * "sole", none of which has been confirmed in writing. Do not add such wording
 * without a separate written confirmation from the client.
 *
 * SOURCING RULE
 * Morakniv AB values come from the client-supplied materials in
 * `public/documents/` (catalogue p.43 and the compliance declarations).
 * Akmal Station values come from the client's written business details.
 * Anything still unconfirmed stays `PENDING_CLIENT` rather than being filled
 * with plausible-looking placeholders — grep for it to find what is left.
 */

export const PENDING_CLIENT = null;

/**
 * Public base URL, read from NEXT_PUBLIC_SITE_URL.
 *
 * Resolves to `undefined` until a real domain is configured — the state of a
 * fresh Vercel project, where an unset variable arrives as `""` rather than as
 * `undefined`, so `??` never fires and `new URL("")` throws. That threw during
 * `next build`, taking down every route that reads this value.
 *
 * Localhost is deliberately not used as a fallback: a localhost base would put
 * development URLs into production canonicals, Open Graph and sitemap output,
 * which is worse than emitting nothing. Consumers treat the base as optional
 * and drop the affected field when it is absent.
 */
function resolveSiteUrl(): URL | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return undefined;

  try {
    const parsed = new URL(raw);
    /* Anything that is not web-addressable cannot act as a metadata base. */
    return parsed.protocol === "http:" || parsed.protocol === "https:"
      ? parsed
      : undefined;
  } catch {
    /* Malformed value, e.g. "morakniv.my" with no scheme. Treat as unset. */
    return undefined;
  }
}

export const siteUrl = resolveSiteUrl();

export const siteConfig = {
  name: "Morakniv Food Industry Malaysia",
  shortName: "Morakniv Food Industry",
  /* Catalogue cover title, p.1 */
  tagline: "Professional Food Industry Knives",
  description:
    "Morakniv Food Industry knives for Malaysia — boning, butcher, filleting, trimming and chef's knives made in Mora, Sweden since 1891, with food contact material declarations from Morakniv AB. Distributed and imported in Malaysia by Akmal Station.",
  locale: "en_MY",
  lang: "en",
} as const;

/**
 * Manufacturer details — catalogue p.43 and the compliance declarations.
 * These describe Morakniv AB in Sweden, not the Malaysian business.
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
 * Malaysian business — Akmal Station, the distributor and importer of
 * Morakniv Food Industry products in Malaysia. Supplied by the client.
 *
 * `enquiryEmail` is the single published enquiry address for the business.
 * It is display copy only: the contact form sends to `ENQUIRY_TO_EMAIL` from
 * the environment (see `lib/email/config.ts`) and no address is hardcoded
 * into that path.
 */
export const distributor = {
  legalName: "Akmal Station",
  registrationNumber: "201903353067 (NS0232489-U)",
  /** One line per printed address line, in postal order. */
  address: [
    "Jalan Impiana",
    "Impiana Residence",
    "Bandar Baru Nilai",
    "71800 Nilai",
    "Negeri Sembilan",
    "Malaysia",
  ],
  /** Condensed form for tight layouts such as the footer. */
  addressCompact: [
    "Jalan Impiana, Impiana Residence",
    "Bandar Baru Nilai",
    "71800 Nilai, Negeri Sembilan",
    "Malaysia",
  ],
  enquiryEmail: "sales@moraknivfoodindustry.my",
  /** Approved description of the relationship. Do not strengthen the wording. */
  role: "Distributor and importer of Morakniv Food Industry products in Malaysia.",
  /** Short attribution line used under the brand lockup. */
  attribution: "Distributed & imported by Akmal Station",
  /* Not supplied yet — see the sourcing rule above. */
  telephone: PENDING_CLIENT,
  businessHours: PENDING_CLIENT,
} as const;

/** Heritage facts — press release and catalogue pp.6–7. */
export const heritage = {
  foundedYear: 1891,
  founder: "Frost-Erik Erson",
  origin: "Mora, Sweden",
  rebrandDate: "29 September 2025",
} as const;
