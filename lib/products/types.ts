/**
 * Product type system.
 *
 * DATA PROVENANCE — read before adding or editing records.
 *
 * The current range is the PUG range, and the PUG catalogue is its source.
 * That document prints 35 assortment pages carrying 45 model codes and 99
 * article numbers. Colour and flex grade are drawn as vector marks rather than
 * text, and were read from the PDF's content streams rather than its text
 * layer. Records carrying those values are marked `catalogue-verified`.
 *
 * `catalogue-verified` is not `verified`. It means every published field is
 * explicitly supported by the supplied catalogue, not that the record has been
 * reconciled against the manufacturer's own product-data export. That export
 * remains the authority, and `scripts/import-products.ts` is ready to ingest
 * it and promote records to `verified`.
 *
 * THE THREE LEVELS THE CATALOGUE PRINTS, AND WHICH ONE IS THE PRODUCT.
 *   1. Page heading — product name and printed dimension, once per page. 35 of
 *      them. Not modelled as an entity: 29 of the 35 carry a single model code,
 *      so a heading-level record would duplicate the model. Siblings are
 *      recovered from `source.page`, which is the heading's identity.
 *   2. Model code — flex grade and blade geometry. 45 of them. THIS IS THE
 *      PRODUCT: one `Product`, one route, one card, one photograph.
 *   3. Article number — colour. 99 of them. A `ProductVariant` under its model.
 *
 * The evidence for that split is positional. In the FLEX GRADE column the
 * catalogue draws one artwork block per model code, spanning that model's rows;
 * in the COLOR column it draws one filled circle per row. Flex is therefore an
 * attribute of the model and colour an attribute of the article number.
 *
 * Only what the catalogue prints is populated. Two absences are deliberate:
 *   - `nsfApproved` stays `undefined`. The PUG catalogue has no NSF column,
 *     and recording `false` would assert that a knife is NOT approved, which
 *     is itself an unverified claim.
 *   - `blade.lengthMm` stays unset. See `ProductDimension`.
 */
export type CategorySlug =
  | "boning-knives"
  | "butcher-knives"
  | "filleting-knives"
  | "trimming-knives"
  | "chefs-knives"
  | "special-knives";

/**
 * Handle families in the current range.
 *
 * The PUG catalogue names the handle "PUG — Performance Universal Grip" and
 * uses the bare initialism in its model codes, so the value and its label are
 * both plain "PUG"; no "-Grip" suffix is invented for it. Earlier grip
 * families are not represented here because no current article uses one.
 */
export type HandleType = "pug";

/**
 * The five colours the PUG range is offered in.
 *
 * `metal-detectable-blue` is a distinct value, not a shade of blue: the
 * catalogue presents it as a food-safety feature supporting HACCP
 * traceability, so a filter on it must never return a knife that is merely
 * blue. No model is offered in every colour, and only three palettes occur
 * across the range — black alone (28 models), black/yellow/green (7) and all
 * five (10).
 */
export type HandleColor =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "metal-detectable-blue";

/** The four flex grades printed in the PUG catalogue. */
export type BladeStiffness =
  | "stiff"
  | "medium-flex"
  | "flex"
  | "extra-flex";

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
 * `catalogue-verified` — every published field is explicitly supported by a
 *               supplied client catalogue, but the record has not yet been
 *               reconciled against the Gung export. May display the fields it
 *               carries, and may populate facets.
 * `needs-verification` — model code and name only; no specs may be shown.
 *
 * The split exists because provenance and displayability are two questions,
 * not one. A record can be safe to publish because the client printed it,
 * while still awaiting the authoritative source. `isVerified` keeps its
 * original, stricter meaning; use `canPublishSpecs` for the display gate.
 */
export type DataStatus =
  | "verified"
  | "catalogue-verified"
  | "needs-verification";

/** Which supplied catalogue a record's data was read from. */
export type CatalogueSource = "pug";

export type ProductSource = {
  catalogue: CatalogueSource;
  /**
   * Page in that catalogue carrying the record's assortment table.
   *
   * Doubles as the family key. One page carries exactly one product name and
   * one printed dimension, so two models sharing a page are the same knife in
   * different flex grades — which is what `getFamilySiblings` returns.
   */
  page: number;
};

/**
 * The dimension printed beside a model in the catalogue.
 *
 * Deliberately NOT `blade.lengthMm`. The PUG catalogue labels this only as the
 * knife's dimension and never states whether it measures the blade or the
 * whole knife, so it is stored under a name that claims neither.
 */
export type ProductDimension = {
  /** Verbatim, as printed: `5" / 133 mm`. */
  printed: string;
  /** Imperial portion as printed: `5"`. */
  inch: string;
  /** Metric portion as printed, in millimetres. */
  mm: number;
};

/**
 * One orderable article of a model: a colour, and the article number to quote
 * for it.
 *
 * A variant carries nothing else. Name, dimension, flex grade, handle and
 * category are all model-level, which is the structural guarantee that no
 * colour/flex combination absent from the catalogue can ever be constructed —
 * the only combinations that exist are the ones listed here.
 */
export type ProductVariant = {
  /** Commercial identifier. Unique across the whole catalogue. */
  articleNo: string;
  color: HandleColor;
};

export type Product = {
  /** Model code exactly as printed: `CB5MF-PUG`. The product's identity. */
  modelCode: string;
  /** Route key, the lowercased model code. Unique across the catalogue. */
  slug: string;
  /** Product name as printed in the catalogue's page heading. */
  name: string;
  category: CategorySlug;

  /* --- Specification fields: only on `verified` or `catalogue-verified` --- */
  handle?: HandleType;
  blade?: BladeSpec;
  /** Printed dimension of unstated basis. See `ProductDimension`. */
  dimension?: ProductDimension;
  /** `undefined` means unknown — never write `false` from an unverified source. */
  nsfApproved?: boolean;

  /**
   * The model's orderable articles, in the catalogue's own swatch order:
   * black, yellow, red, green, metal-detectable blue. Never empty, and always
   * contains exactly one black article — see `getDefaultVariant`.
   */
  variants: ProductVariant[];

  /**
   * Photography of this exact article. Empty for every current record: the
   * catalogue's photography is model-level, lives in `lib/images/pug-models.ts`
   * and is keyed by model code.
   */
  images: ProductImage[];
  /** Which catalogue the specification fields were read from. */
  source?: ProductSource;
  dataStatus: DataStatus;
};

export type ProductCategory = {
  slug: CategorySlug;
  name: string;
  /** Short line for cards and navigation. */
  tagline: string;
  /** Category description, drawn from the catalogue's own section intro. */
  description: string;
  /**
   * Model codes in this category — the number of product pages it holds, and
   * the figure category cards show. Derived from the product data rather than
   * typed in, so it cannot drift as records are added.
   */
  modelCount: number;
  /** Distinct article numbers across this category's models. Also derived. */
  articleCount: number;
  /** Pages of the PUG catalogue this category's models are printed on. */
  cataloguePages: string;
  seo: {
    title: string;
    description: string;
  };
};

/** Facet buckets built from records that may publish specifications. */
export type Facet<T extends string = string> = {
  value: T;
  label: string;
  count: number;
};

export type ProductFacets = {
  /**
   * Handle facet. Every current model is PUG, so this has a single option and
   * no discriminating power; the browser hides a facet with fewer than two
   * options rather than offering a filter that cannot narrow anything.
   */
  handle: Facet<HandleType>[];
  /**
   * Colour counts are MODEL counts, not article counts: a model contributes
   * once to a colour it offers, however many articles it has in it. The
   * filter returns models, so the count has to describe what the filter will
   * return.
   */
  color: Facet<HandleColor>[];
  stiffness: Facet<BladeStiffness>[];
  lengthMm: { min: number; max: number } | null;
  /** Range over `Product.dimension.mm`, kept separate from blade length. */
  dimensionMm: { min: number; max: number } | null;
  nsfApproved: number;
};

/** Reconciled against the authoritative Gung product-data export. */
export function isVerified(product: Product): boolean {
  return product.dataStatus === "verified";
}

/**
 * True when a record may expose the specification fields it carries, and may
 * contribute to facet values. Broader than `isVerified` by design: a
 * catalogue-verified record publishes what the client printed, and nothing
 * more.
 */
export function canPublishSpecs(product: Product): boolean {
  return (
    product.dataStatus === "verified" ||
    product.dataStatus === "catalogue-verified"
  );
}

/**
 * The variant selected when the URL names none, or names one this model does
 * not have.
 *
 * Black, and among black articles the lowest article number. Derived rather
 * than flagged in the data: every model in the range has exactly one black
 * article, and black is always its lowest number, so a stored `isDefault`
 * would be a second copy of a fact the variant list already carries. The
 * numeric comparison is there so the rule stays well-defined if a future
 * import ever supplies two black articles for one model.
 */
export function getDefaultVariant(product: Product): ProductVariant {
  const black = product.variants.filter((variant) => variant.color === "black");
  const pool = black.length > 0 ? black : product.variants;

  return pool.reduce((lowest, variant) =>
    Number(variant.articleNo) < Number(lowest.articleNo) ? variant : lowest,
  );
}

/** The variant with this article number, or `undefined` if the model has none. */
export function findVariant(
  product: Product,
  articleNo: string | null | undefined,
): ProductVariant | undefined {
  if (!articleNo) return undefined;
  return product.variants.find((variant) => variant.articleNo === articleNo);
}

/**
 * Resolve a URL's `?article=` to a variant of this model.
 *
 * An unknown or absent value falls back to the default rather than failing:
 * the model page is valid regardless of the query string, so a bad parameter
 * must never produce a 404.
 */
export function resolveVariant(
  product: Product,
  articleNo: string | null | undefined,
): ProductVariant {
  return findVariant(product, articleNo) ?? getDefaultVariant(product);
}
