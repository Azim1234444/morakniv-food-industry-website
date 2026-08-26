import type { MetadataRoute } from "next";

import { builtRoutes } from "@/lib/navigation";
import { getAllProducts, getCategories } from "@/lib/products";
import { siteUrl } from "@/lib/site";

/**
 * Only routes that actually exist are advertised. Content routes come from the
 * `built` flags in `lib/navigation.ts`; product routes are derived from the
 * product data itself, so the sitemap cannot drift from what is generated.
 */
export default function sitemap(): MetadataRoute.Sitemap {
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
