import { pugBoningKnives } from "@/lib/products/data/pug-boning-knives";
import { pugButcherKnives } from "@/lib/products/data/pug-butcher-knives";
import { pugChefsKnives } from "@/lib/products/data/pug-chefs-knives";
import { pugFilletingKnives } from "@/lib/products/data/pug-filleting-knives";
import { pugSpecialKnives } from "@/lib/products/data/pug-special-knives";
import { pugTrimmingKnives } from "@/lib/products/data/pug-trimming-knives";
import type { CategorySlug, Product } from "@/lib/products/types";

/**
 * The current product catalogue: the PUG range, 45 models carrying 99 article
 * numbers.
 *
 * One record per model code. Article numbers are colour variants inside a
 * record, not records of their own — see `lib/products/types.ts` for why the
 * catalogue's own layout settles that.
 *
 * This module exists so `categories.ts` can derive its counts and page
 * references from the data without importing `index.ts`, which imports
 * `categories.ts` in turn.
 */
export const allProducts: Product[] = [
  ...pugBoningKnives,
  ...pugButcherKnives,
  ...pugFilletingKnives,
  ...pugTrimmingKnives,
  ...pugChefsKnives,
  ...pugSpecialKnives,
];

/** Model codes — the number of product pages the site publishes. */
export const modelCount = allProducts.length;

/** Distinct article numbers across every model. */
export const articleCount = allProducts.reduce(
  (total, product) => total + product.variants.length,
  0,
);

/**
 * Models per category. This is what category cards and headers count, because
 * a category card links to a list of product pages and there is one page per
 * model.
 */
export const modelCountByCategory = allProducts.reduce<Record<string, number>>(
  (counts, product) => {
    counts[product.category] = (counts[product.category] ?? 0) + 1;
    return counts;
  },
  {},
);

/** Article numbers per category, shown only where it is labelled as such. */
export const articleCountByCategory = allProducts.reduce<
  Record<string, number>
>((counts, product) => {
  counts[product.category] =
    (counts[product.category] ?? 0) + product.variants.length;
  return counts;
}, {});

export function modelsForCategory(slug: CategorySlug): number {
  return modelCountByCategory[slug] ?? 0;
}

export function articlesForCategory(slug: CategorySlug): number {
  return articleCountByCategory[slug] ?? 0;
}

/**
 * The catalogue pages a category's models are printed on, formatted the way
 * the category header shows them: `pp.8–20`, or `p.29` for a single page.
 * Derived, so it cannot drift as records move between categories.
 */
export function cataloguePagesForCategory(slug: CategorySlug): string {
  const pages = allProducts
    .filter((product) => product.category === slug)
    .map((product) => product.source?.page)
    .filter((page): page is number => typeof page === "number");

  if (pages.length === 0) return "";

  const min = Math.min(...pages);
  const max = Math.max(...pages);
  return min === max ? `p.${min}` : `pp.${min}–${max}`;
}
