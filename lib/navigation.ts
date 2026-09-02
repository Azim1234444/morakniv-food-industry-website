import { newsItems } from "@/lib/news";
import { categories } from "@/lib/products/categories";

/**
 * Primary navigation — the single source of truth for the site hierarchy.
 *
 * Header (desktop + mobile), footer and `sitemap.ts` all read this file. The
 * shape is deliberately two levels deep: a top-level route, and the child
 * routes that belong under it. Nothing downstream keeps its own copy of the
 * hierarchy, so a route can never appear in one navigation and not the other.
 *
 * `built` marks whether the destination route exists yet. Only built routes
 * are advertised in `sitemap.ts`.
 *
 * `/legal/privacy-policy` is deliberately absent. It exists and is linked from
 * the enquiry form, but it carries `robots: noindex` until its wording has been
 * through legal review, so it must not appear in the sitemap.
 */

export type NavChild = {
  label: string;
  href: string;
  /**
   * Match the pathname exactly rather than by prefix. Set on the section index
   * entries ("All Products", "News") so that a deeper route does not light up
   * the landing page as well as the page actually being viewed.
   */
  exact?: boolean;
};

export type NavItem = NavChild & {
  built: boolean;
  /** Present only where meaningful child routes exist. */
  children?: NavChild[];
};

/** The four technology sub-pages, used by the hub, the nav and cross-links. */
export const technologySections = [
  {
    label: "The Steel",
    href: "/technology/steel",
    summary:
      "Alleima® 10C28Mo2 Swedish stainless steel, hardened to 57 HRC across the range.",
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
 * Re-exported here in the shape the layout components expect, so the model
 * and article counts can never drift between the nav and the catalogue.
 */
export const productCategories = categories.map((category) => ({
  label: category.name,
  href: `/products/${category.slug}`,
  modelCount: category.modelCount,
  articleCount: category.articleCount,
}));

/**
 * Child routes.
 *
 * Every list is derived from the data that owns it — categories from the
 * catalogue, technology pages from the section list, news from `lib/news.ts`
 * — so adding a category or an article puts it in the menus automatically.
 */
const productChildren: NavChild[] = [
  { label: "All Products", href: "/products", exact: true },
  ...productCategories.map(({ label, href }) => ({ label, href })),
];

const technologyChildren: NavChild[] = technologySections.map(
  ({ label, href }) => ({ label, href }),
);

/*
 * Only the most recent articles are exposed; the index carries the rest. One
 * article today, but the menu must not grow without limit as more are added.
 */
const newsChildren: NavChild[] = [
  { label: "News", href: "/news", exact: true },
  ...newsItems.slice(0, 4).map((item) => ({
    label: item.navLabel ?? item.title,
    href: item.href,
  })),
];

/**
 * Corporate/product-focused primary navigation.
 *
 * There is no "Resources" entry and no download centre. The client documents
 * live with the content they belong to instead: compliance declarations on
 * `/quality-compliance` and the press release on the news item it
 * accompanies. Adding a catch-all downloads route would undo that.
 *
 * About, Quality & Compliance, How to Order and Contact are single pages with
 * no child routes, so they carry no `children` and render as plain links.
 */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/", built: true, exact: true },
  { label: "About", href: "/about", built: true },
  {
    label: "Products",
    href: "/products",
    built: true,
    children: productChildren,
  },
  {
    label: "Technology",
    href: "/technology",
    built: true,
    children: technologyChildren,
  },
  { label: "Quality & Compliance", href: "/quality-compliance", built: true },
  {
    label: "How to Order",
    href: "/how-to-order",
    built: true,
    children: [
      { label: "How to Order", href: "/how-to-order", exact: true },
      { label: "Dealers", href: "/dealers" },
    ],
  },
  { label: "News", href: "/news", built: true, children: newsChildren },
  { label: "Contact", href: "/contact", built: true },
];

/**
 * Is `href` the page being viewed, or an ancestor of it?
 *
 * Shared by the desktop and mobile navigations so a child route can never
 * leave its parent looking inactive: `/products/boning-knives` keeps Products
 * lit, `/technology/handles` keeps Technology lit. Entries flagged `exact`
 * — Home, and the section index links inside a submenu — match only
 * themselves. The trailing slash matters: without it `/about` would also
 * match a future `/about-us`.
 */
export function isRouteActive(
  pathname: string,
  item: Pick<NavChild, "href" | "exact">,
): boolean {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

/**
 * Routes that actually exist — the sitemap must only advertise these.
 * Top-level routes plus their children, de-duplicated so a section index
 * appearing in both lists can never emit the same `<loc>` twice.
 */
export const builtRoutes = [
  ...new Set(
    primaryNav
      .filter((item) => item.built)
      .flatMap((item) => [
        item.href,
        ...(item.children ?? []).map((child) => child.href),
      ]),
  ),
];

/**
 * Compliance PDFs linked directly from the homepage.
 *
 * One declaration remains publishable. The Frosts food-contact-material
 * declaration was withdrawn at the client's request — see `lib/documents.ts`
 * for why, and do not re-add it here. Documents that are presented as cards
 * with a title, size and issue date — currently the press release — are
 * described in `lib/documents.ts` and imported by the one page each belongs
 * to. The 2026 catalogue PDF is not published at all.
 */
export const documents = {
  docFoodPp: "/documents/declaration-of-compliance-food-pp.pdf",
} as const;
