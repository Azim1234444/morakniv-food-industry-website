import type { MetadataRoute } from "next";

import { builtRoutes } from "@/lib/navigation";
import { getAllProducts, getCategories } from "@/lib/products";
import { siteUrl } from "@/lib/site";

/**
 * Only routes that actually exist are advertised. Content routes come from the
 * `built` flags in `lib/navigation.ts`; product routes are derived from the
 * product data itself, so the sitemap cannot drift from what is generated.
 *
 * Every `<loc>` in a sitemap must be an absolute URL, so the file can only be
 * populated once NEXT_PUBLIC_SITE_URL names the real domain. Until then the
 * sitemap builds empty rather than publishing URLs on a guessed origin — a
 * preview or localhost origin here would invite the wrong host into the index.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) {
    console.warn(
      "[sitemap] NEXT_PUBLIC_SITE_URL is unset or not a valid absolute URL — " +
        "emitting an empty sitemap.",
    );
    return [];
  }

  const lastModified = new Date();

  const contentRoutes = builtRoutes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.7,
  }));

  const categoryRoutes = getCategories().map((category) => ({
    url: new URL(`/products/${category.slug}`, siteUrl).toString(),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const productRoutes = getAllProducts().map((product) => ({
    url: new URL(
      `/products/${product.category}/${product.slug}`,
      siteUrl,
    ).toString(),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...contentRoutes, ...categoryRoutes, ...productRoutes];
}
