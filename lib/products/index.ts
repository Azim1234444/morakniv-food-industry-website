import { categories, categoryBySlug } from "@/lib/products/categories";
import { boningKnives } from "@/lib/products/data/boning-knives";
import { butcherKnives } from "@/lib/products/data/butcher-knives";
import { chefsKnives } from "@/lib/products/data/chefs-knives";
import { classic1891 } from "@/lib/products/data/classic-1891";
import { filletingKnives } from "@/lib/products/data/filleting-knives";
import { sharpeners } from "@/lib/products/data/sharpeners";
import { specialKnives } from "@/lib/products/data/special-knives";
import { trimmingKnives } from "@/lib/products/data/trimming-knives";
import type {
  BladeStiffness,
  CategorySlug,
  Facet,
  HandleColor,
  HandleType,
  Product,
  ProductCategory,
  ProductFacets,
} from "@/lib/products/types";

export * from "@/lib/products/types";
export { categories, categoryBySlug };

const allProducts: Product[] = [
  ...boningKnives,
  ...butcherKnives,
  ...filletingKnives,
  ...trimmingKnives,
  ...chefsKnives,
  ...sharpeners,
  ...specialKnives,
  ...classic1891,
];

const bySlug = new Map(allProducts.map((product) => [product.slug, product]));

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

/** Verified records only — the sole set allowed to expose specifications. */
export function getVerifiedProducts(products = allProducts): Product[] {
  return products.filter((product) => product.dataStatus === "verified");
}

export type CatalogueCounts = {
  total: number;
  verified: number;
  needsVerification: number;
};

export function getCounts(products = allProducts): CatalogueCounts {
  const verified = products.filter(
    (product) => product.dataStatus === "verified",
  ).length;

  return {
    total: products.length,
    verified,
    needsVerification: products.length - verified,
  };
}

/**
 * Related products: same category, excluding the current record.
 * Deliberately not "similar specification" — there are no verified
 * specifications to compare yet.
 */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return allProducts
    .filter(
      (candidate) =>
        candidate.category === product.category &&
        candidate.slug !== product.slug,
    )
    .slice(0, limit);
}

/* -------------------------------------------------------------------------
   Facets
   -------------------------------------------------------------------------
   Built ONLY from verified records. While nothing is verified, every facet
   list comes back empty and the filter UI renders nothing rather than
   offering options that cannot be honoured.
   ------------------------------------------------------------------------- */

const HANDLE_LABELS: Record<HandleType, string> = {
  "ergo-grip": "Ergo-Grip",
  "g-grip": "G-Grip",
  "uni-grip": "Uni-Grip",
  "pro-grip": "Pro-Grip",
  "p-grip": "P-Grip",
  "ps-grip": "PS-Grip",
  "pm-grip": "PM-Grip",
  "pq-grip": "PQ-Grip",
  "rmh-grip": "RMH-Grip",
  "am-grip": "AM-Grip",
  "1025-grip": "1025-Grip",
  "511-grip": "511-Grip",
  "g143-grip": "G143-Grip",
  sheath: "Sheath",
};

const COLOR_LABELS: Record<HandleColor, string> = {
  black: "Black",
  blue: "Blue",
  green: "Green",
  red: "Red",
  yellow: "Yellow",
  white: "White",
};

const STIFFNESS_LABELS: Record<BladeStiffness, string> = {
  stiff: "Stiff",
  "medium-flex": "Medium Flex",
  flex: "Flex",
  "extra-flex": "Extra Flex",
  "ball-point": "Ball Point",
  "belly-opener": "Belly Opener",
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
  const verified = getVerifiedProducts(products);

  const lengths = verified
    .map((product) => product.blade?.lengthMm)
    .filter((value): value is number => typeof value === "number");

  return {
    handle: tally(
      verified.map((product) => product.handle),
      HANDLE_LABELS,
    ),
    color: tally(
      verified.map((product) => product.color),
      COLOR_LABELS,
    ),
    stiffness: tally(
      verified.map((product) => product.blade?.stiffness),
      STIFFNESS_LABELS,
    ),
    lengthMm: lengths.length
      ? { min: Math.min(...lengths), max: Math.max(...lengths) }
      : null,
    nsfApproved: verified.filter((product) => product.nsfApproved === true)
      .length,
  };
}

/** True when at least one facet has options worth rendering. */
export function hasAnyFacets(facets: ProductFacets): boolean {
  return (
    facets.handle.length > 0 ||
    facets.color.length > 0 ||
    facets.stiffness.length > 0 ||
    facets.lengthMm !== null ||
    facets.nsfApproved > 0
  );
}

export { HANDLE_LABELS, COLOR_LABELS, STIFFNESS_LABELS };
