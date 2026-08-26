/**
 * Product type system.
 *
 * DATA PROVENANCE — read before adding or editing records.
 *
 * The 2026 PDF catalogue lays its assortment tables out visually. Text
 * extraction keeps the left-hand block (article number + product name) intact,
 * but the attribute columns — handle, colour, dimension, stiffness, NSF — drift
 * out of alignment on pp.27, 29, 31, 33, 35 and 38: orphan attribute rows are
 * interleaved between article numbers, so the values sharing a line with a
 * given SKU may belong to a different one.
 *
 * Therefore every record currently carries ONLY `articleNo`, `name` and
 * `category`, and is marked `needs-verification`. No specification field is
 * populated from the PDF. The authoritative source is the Gung B2B portal's
 * "Product Data Excel" export; `scripts/import-products.ts` is ready to ingest
 * it.
 *
 * Note the deliberate use of `undefined` rather than `false` for
 * `nsfApproved`: recording `false` would assert that a knife is NOT NSF
 * approved, which is itself an unverified claim.
 */

export type CategorySlug =
  | "boning-knives"
  | "butcher-knives"
  | "filleting-knives"
  | "trimming-knives"
  | "chefs-knives"
  | "sharpeners"
  | "special-knives"
  | "classic-1891";

/** Grip codes observed in the catalogue. Not yet applied to any record. */
export type HandleType =
  | "ergo-grip"
  | "g-grip"
  | "uni-grip"
  | "pro-grip"
  | "p-grip"
  | "ps-grip"
  | "pm-grip"
  | "pq-grip"
  | "rmh-grip"
  | "am-grip"
  | "1025-grip"
  | "511-grip"
  | "g143-grip"
  | "sheath";

export type HandleColor =
  | "black"
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "white";

/**
 * Four flex grades (catalogue pp.13, 18) plus two edge cases that appear in the
 * Special Knives table only.
 */
export type BladeStiffness =
  | "stiff"
  | "medium-flex"
  | "flex"
  | "extra-flex"
  | "ball-point"
  | "belly-opener";

export type BladeShape =
  | "wide-butcher"
  | "butcher"
  | "scandinavian-trimming"
  | "chefs"
  | "curved"
  | "wide-boning"
  | "narrow"
  | "straight";

export type ProductImage = {
  /** Path under /public once real imagery is supplied. */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Primary image shown in cards and as the gallery lead. */
  isPrimary?: boolean;
};

export type BladeSpec = {
  /** Display string exactly as printed: '5"', '5½"', '8 1/3"'. */
  lengthInch?: string;
  /** Numeric millimetres, for sorting and range filtering. */
  lengthMm?: number;
  stiffness?: BladeStiffness;
  shape?: BladeShape;
};

/**
 * `verified`  — specifications confirmed against the Gung Product Data export.
 *               Only these may display specifications in the public UI.
 * `needs-verification` — article number and name only; no specs may be shown.
 */
export type DataStatus = "verified" | "needs-verification";

export type Product = {
  /**
   * Commercial identifier and primary key. `null` only for the Classic 1891
   * models, which the catalogue lists by name with no article numbers (p.40).
   */
  articleNo: string | null;
  /** Route key. Unique across the whole catalogue. */
  slug: string;
  /** Product name as printed in the catalogue. */
  name: string;
  category: CategorySlug;

  /* --- Specification fields: populated only when dataStatus === "verified" --- */
  modelCode?: string;
  handle?: HandleType;
  color?: HandleColor;
  blade?: BladeSpec;
  /** `undefined` means unknown — never write `false` from an unverified source. */
  nsfApproved?: boolean;

  images: ProductImage[];
  dataStatus: DataStatus;
};

export type ProductCategory = {
  slug: CategorySlug;
  name: string;
  /** Short line for cards and navigation. */
  tagline: string;
  /** Category description, drawn from the catalogue's own section intro. */
  description: string;
  /** Distinct article numbers counted in the catalogue for this section. */
  articleCount: number;
  /** Catalogue page range the description came from. */
  cataloguePages: string;
  seo: {
    title: string;
    description: string;
  };
};

/** Facet buckets built from verified records only. */
export type Facet<T extends string = string> = {
  value: T;
  label: string;
  count: number;
};

export type ProductFacets = {
  handle: Facet<HandleType>[];
  color: Facet<HandleColor>[];
  stiffness: Facet<BladeStiffness>[];
  lengthMm: { min: number; max: number } | null;
  nsfApproved: number;
};

/** True when a record may expose specification fields publicly. */
export function isVerified(product: Product): boolean {
  return product.dataStatus === "verified";
}
