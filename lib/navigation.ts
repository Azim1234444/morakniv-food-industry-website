import { categories } from "@/lib/products/categories";

/**
 * Primary navigation.
 *
 * `built` marks whether the destination route exists yet. Only built routes
 * are advertised in `sitemap.ts`, alongside the product routes derived from
 * data.
 *
 * `/legal/privacy-policy` is deliberately absent from both lists. It exists
 * and is linked from the enquiry form, but it carries `robots: noindex` until
 * its wording has been through legal review, so it must not appear in the
 * sitemap.
 */

export type NavItem = {
  label: string;
  href: string;
  built: boolean;
};

/**
 * Corporate/product-focused primary navigation.
 *
 * There is no "Resources" entry and no download centre. The client documents
 * live with the content they belong to instead: compliance declarations on
 * `/quality-compliance`, the B2B portal manual on `/how-to-order`, and the
 * press release on the news item it accompanies. Adding a catch-all downloads
 * route would undo that.
 */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/", built: true },
  { label: "About", href: "/about", built: true },
  { label: "Products", href: "/products", built: true },
  { label: "Technology", href: "/technology", built: true },
  { label: "Quality & Compliance", href: "/quality-compliance", built: true },
  { label: "How to Order", href: "/how-to-order", built: true },
  { label: "News", href: "/news", built: true },
  { label: "Contact", href: "/contact", built: true },
];

/** Routes not in the primary nav but live and worth indexing. */
export const secondaryRoutes: NavItem[] = [
  { label: "Technology — Steel", href: "/technology/steel", built: true },
  { label: "Technology — Blades", href: "/technology/blades", built: true },
  { label: "Technology — Handles", href: "/technology/handles", built: true },
  {
    label: "Technology — Safety & traceability",
    href: "/technology/safety",
    built: true,
  },
  {
    label: "Frosts becomes Morakniv",
    href: "/news/frosts-becomes-morakniv",
    built: true,
  },
];

/**
 * Routes that actually exist — the sitemap must only advertise these.
 * De-duplicated, so promoting a route into `primaryNav` can never emit the
 * same `<loc>` twice.
 */
export const builtRoutes = [
  ...new Set(
    [...primaryNav, ...secondaryRoutes]
      .filter((item) => item.built)
      .map((item) => item.href),
  ),
];

/** The four technology sub-pages, used by the hub and cross-links. */
export const technologySections = [
  {
    label: "The Steel",
    href: "/technology/steel",
    summary:
      "Swedish stainless from Alleima in Sandviken, micro grain structure and cryogenic hardening to 58 HRC.",
  },
  {
    label: "Blades",
    href: "/technology/blades",
    summary:
      "Four flexibility grades, computer-controlled grinding, mirror polishing and the blade shapes behind each task.",
  },
  {
    label: "Handles",
    href: "/technology/handles",
    summary:
      "Handle designs and grip variants developed for specific areas of use, materials and workplace conditions.",
  },
  {
    label: "Safety & traceability",
    href: "/technology/safety",
    summary:
      "Blunt tip options, per-knife QR-code traceability and the ergonomics behind fatigue-free handling.",
  },
] as const;

/**
 * Product categories are defined once in `lib/products/categories.ts`.
 * Re-exported here in the shape the layout components expect, so the
 * article counts can never drift between the nav and the catalogue.
 */
export const productCategories = categories.map((category) => ({
  label: category.name,
  href: `/products/${category.slug}`,
  count: category.articleCount,
}));

/**
 * Compliance PDFs linked directly from the homepage.
 *
 * Only the two food-industry declarations belong here. Documents that are
 * presented as cards with a title, size and issue date — the B2B portal manual
 * and the press release — are described in `lib/documents.ts` and imported by
 * the one page each belongs to. The 2026 catalogue PDF is not published at all.
 */
export const documents = {
  docFrosts: "/documents/doc-food-contact-material-frosts.pdf",
  docFoodPp: "/documents/declaration-of-compliance-food-pp.pdf",
} as const;
