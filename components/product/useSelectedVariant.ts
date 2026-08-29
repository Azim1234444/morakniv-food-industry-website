"use client";

import { useSearchParams } from "next/navigation";

import { resolveVariant } from "@/lib/products/types";
import type { Product, ProductVariant } from "@/lib/products/types";

/** The query key carrying the selected article number. */
export const ARTICLE_PARAM = "article";

/**
 * The variant the URL currently selects.
 *
 * The URL is the single source of truth for the selection, so the two client
 * islands on a model page — the image note and the variant table — stay in
 * step without sharing React state or a context. `window.history.replaceState`
 * integrates with the App Router and re-renders everything reading
 * `useSearchParams`, which is what makes that work without a navigation.
 *
 * An absent or unrecognised `?article=` resolves to the model's default
 * variant rather than failing: the model page is valid whatever the query
 * string says.
 */
export function useSelectedVariant(product: Product): ProductVariant {
  const searchParams = useSearchParams();
  return resolveVariant(product, searchParams.get(ARTICLE_PARAM));
}

/**
 * Write a variant into the URL without navigating.
 *
 * `replaceState`, not `pushState`: stepping back through five colours of the
 * same knife is not history a visitor wants, and the Back button should return
 * them to the listing they arrived from.
 */
export function selectVariantInUrl(articleNo: string): void {
  const params = new URLSearchParams(window.location.search);
  params.set(ARTICLE_PARAM, articleNo);
  window.history.replaceState(null, "", `?${params.toString()}`);
}
