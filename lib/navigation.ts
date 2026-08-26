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

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/", built: true },
  { label: "Products", href: "/products", built: true },
  { label: "Technology", href: "/technology", built: true },
  { label: "About", href: "/about", built: true },
  { label: "Quality & Compliance", href: "/quality-compliance", built: true },
  /* "Resources" is the nav label; /downloads is the canonical route. */
  { label: "Resources", href: "/downloads", built: true },
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
  { label: "How to order", href: "/how-to-order", built: true },
  { label: "News", href: "/news", built: true },
  {
    label: "Frosts becomes Morakniv",
    href: "/news/frosts-becomes-morakniv",
    built: true,
  },
];

/** Routes that actually exist — the sitemap must only advertise these. */
export const builtRoutes = [...primaryNav, ...secondaryRoutes]
  .filter((item) => item.built)
  .map((item) => item.href);

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

/** Client documents copied into `public/documents/`. */
export const documents = {
  catalogue: "/documents/morakniv-food-industry-catalogue-2026.pdf",
  b2bManual: "/documents/morakniv-b2b-portal-user-manual-en.pdf",
  pressRelease: "/documents/press-release-frosts-becomes-morakniv-2025.pdf",
  docFrosts: "/documents/doc-food-contact-material-frosts.pdf",
  docFoodPp: "/documents/declaration-of-compliance-food-pp.pdf",
} as const;
