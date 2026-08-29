import { allProducts } from "@/lib/products/all";
import { categories, categoryBySlug } from "@/lib/products/categories";
import type {
  BladeStiffness,
  CatalogueSource,
  CategorySlug,
  Facet,
  HandleColor,
  HandleType,
  Product,
  ProductCategory,
  ProductFacets,
  ProductVariant,
} from "@/lib/products/types";

export * from "@/lib/products/types";
export { categories, categoryBySlug };

const bySlug = new Map(allProducts.map((product) => [product.slug, product]));

/**
 * Article number → its model and variant.
 *
 * Article numbers no longer have routes of their own, so this is what lets a
 * search for `14953` resolve to `/products/boning-knives/cb5mf-pug?article=14953`.
 * Built once at module load; the catalogue guarantees the key is unique.
 */
const byArticleNo = new Map<string, { product: Product; variant: ProductVariant }>();
for (const product of allProducts) {
  for (const variant of product.variants) {
    byArticleNo.set(variant.articleNo, { product, variant });
  }
}

export function getAllProducts(): Product[] {
  return allProducts;
}

export function getCategories(): ProductCategory[] {
  return categories;
}

export function getCategory(slug: string): ProductCategory | undefined {
  return categoryBySlug.get(slug as CategorySlug);
}

export function getProductsByCategory(slug: CategorySlug): Product[] {
  return allProducts.filter((product) => product.category === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return bySlug.get(slug);
}

/** Resolve an article number to the model that carries it. */
export function getProductByArticleNo(
  articleNo: string,
): { product: Product; variant: ProductVariant } | undefined {
  return byArticleNo.get(articleNo);
}

/** Every article number in the range, for validation and lookup. */
export function getAllArticleNumbers(): string[] {
  return [...byArticleNo.keys()];
}

/**
 * Sibling models from the same catalogue page — the same knife in another flex
 * grade.
 *
 * A page carries one product name and one printed dimension, so anything
 * sharing `source.page` differs only in flex. Six of the 35 pages carry more
 * than one model; for the other 29 this returns an empty array and the caller
 * renders nothing. These are LINKS to other product pages, never options on
 * this one: each sibling has its own model code, its own flex grade and its
 * own blade etching.
 */
export function getFamilySiblings(product: Product): Product[] {
  const page = product.source?.page;
  if (typeof page !== "number") return [];

  return allProducts.filter(
    (candidate) =>
      candidate.source?.page === page && candidate.slug !== product.slug,
  );
}

/** Reconciled against the Gung product-data export. */
export function getVerifiedProducts(products = allProducts): Product[] {
  return products.filter((product) => product.dataStatus === "verified");
}

/**
 * Records allowed to expose the specification fields they carry, and the only
 * set that contributes facet values.
 *
 * This deliberately includes `catalogue-verified` and deliberately excludes
 * `needs-verification`. Every current record is catalogue-verified; the gate
 * stays in place so that anything added later without catalogue support
 * cannot silently reach the filter UI.
 */
export function getSpecPublishableProducts(products = allProducts): Product[] {
  return products.filter(
    (product) =>
      product.dataStatus === "verified" ||
      product.dataStatus === "catalogue-verified",
  );
}

export function getProductsFromCatalogue(
  catalogue: CatalogueSource,
  products = allProducts,
): Product[] {
  return products.filter((product) => product.source?.catalogue === catalogue);
}

export type CatalogueCounts = {
  /** Models — the number of product pages. */
  total: number;
  /** Article numbers across those models. */
  articles: number;
  verified: number;
  catalogueVerified: number;
  /** Verified plus catalogue-verified: everything that can show specs. */
  specPublishable: number;
  needsVerification: number;
};

export function getCounts(products = allProducts): CatalogueCounts {
  const verified = products.filter(
    (product) => product.dataStatus === "verified",
  ).length;
  const catalogueVerified = products.filter(
    (product) => product.dataStatus === "catalogue-verified",
  ).length;

  return {
    total: products.length,
    articles: products.reduce(
      (sum, product) => sum + product.variants.length,
      0,
    ),
    verified,
    catalogueVerified,
    specPublishable: verified + catalogueVerified,
    needsVerification: products.length - verified - catalogueVerified,
  };
}

/**
 * Related models: siblings from the same catalogue page first — the same knife
 * in another flex grade, which is the most useful thing to offer — then other
 * models from the same category to fill the row.
 */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const siblings = getFamilySiblings(product);
  const seen = new Set([product.slug, ...siblings.map((item) => item.slug)]);

  const rest = allProducts.filter(
    (candidate) =>
      candidate.category === product.category && !seen.has(candidate.slug),
  );

  return [...siblings, ...rest].slice(0, limit);
}

/* -------------------------------------------------------------------------
   Facets
   -------------------------------------------------------------------------
   Built ONLY from records that may publish specifications — `verified` and
   `catalogue-verified`. A `needs-verification` record has no attributes to
   offer, so it contributes nothing and is excluded from every count below.
   Labels cover exactly the values the current range uses; there is no entry
   for a grip, colour or grade the catalogue does not print.

   Counts are MODEL counts throughout, including for colour. The filters
   return models, so a count that described article numbers would promise a
   different number of results than the filter delivers.
   ------------------------------------------------------------------------- */

const HANDLE_LABELS: Record<HandleType, string> = {
  pug: "PUG",
};

const COLOR_LABELS: Record<HandleColor, string> = {
  black: "Black",
  red: "Red",
  green: "Green",
  yellow: "Yellow",
  "metal-detectable-blue": "Metal-detectable Blue",
};

const STIFFNESS_LABELS: Record<BladeStiffness, string> = {
  stiff: "Stiff",
  "medium-flex": "Medium Flex",
  flex: "Flex",
  "extra-flex": "Extra Flex",
};

function tally<T extends string>(
  values: (T | undefined)[],
  labels: Record<T, string>,
): Facet<T>[] {
  const counts = new Map<T, number>();

  for (const value of values) {
    if (!value) continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([value, count]) => ({ value, label: labels[value], count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function getFacets(products: Product[]): ProductFacets {
  const eligible = getSpecPublishableProducts(products);

  const lengths = eligible
    .map((product) => product.blade?.lengthMm)
    .filter((value): value is number => typeof value === "number");

  const dimensions = eligible
    .map((product) => product.dimension?.mm)
    .filter((value): value is number => typeof value === "number");

  /* One entry per model per colour it offers, deduplicated: a model with five
     articles in five colours contributes once to each, not five times to one. */
  const colourValues = eligible.flatMap((product) => [
    ...new Set(product.variants.map((variant) => variant.color)),
  ]);

  return {
    handle: tally(
      eligible.map((product) => product.handle),
      HANDLE_LABELS,
    ),
    color: tally(colourValues, COLOR_LABELS),
    stiffness: tally(
      eligible.map((product) => product.blade?.stiffness),
      STIFFNESS_LABELS,
    ),
    lengthMm: lengths.length
      ? { min: Math.min(...lengths), max: Math.max(...lengths) }
      : null,
    dimensionMm: dimensions.length
      ? { min: Math.min(...dimensions), max: Math.max(...dimensions) }
      : null,
    nsfApproved: eligible.filter((product) => product.nsfApproved === true)
      .length,
  };
}

/**
 * True when a facet can actually narrow the list.
 *
 * A single-option facet cannot: ticking it returns everything that was already
 * shown. Every current model uses the PUG handle, so the handle facet has one
 * option and is hidden by this rule rather than by a hard-coded exception —
 * it will reappear on its own if a second handle family is ever added.
 */
export function isUsefulFacet<T extends string>(facet: Facet<T>[]): boolean {
  return facet.length > 1;
}

/** True when at least one facet has options worth rendering. */
export function hasAnyFacets(facets: ProductFacets): boolean {
  return (
    isUsefulFacet(facets.handle) ||
    isUsefulFacet(facets.color) ||
    isUsefulFacet(facets.stiffness) ||
    facets.nsfApproved > 0
  );
}

export { HANDLE_LABELS, COLOR_LABELS, STIFFNESS_LABELS };
