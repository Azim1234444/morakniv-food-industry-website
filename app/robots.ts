import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const rules = {
    userAgent: "*",
    allow: "/",
  };

  /**
   * A `Sitemap:` line has to carry an absolute URL, so it can only be emitted
   * once NEXT_PUBLIC_SITE_URL is configured. Crawlers find `/sitemap.xml` at
   * its conventional location regardless; advertising a wrong origin would be
   * worse than leaving the line out.
   */
  if (!siteUrl) {
    console.warn(
      "[robots] NEXT_PUBLIC_SITE_URL is unset or not a valid absolute URL — " +
        "omitting the Sitemap line.",
    );
    return { rules };
  }

  return {
    rules,
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
