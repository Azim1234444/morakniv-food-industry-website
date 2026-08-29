/**
 * News items.
 *
 * DATE HANDLING: the supplied press release PDF carries no printed publication
 * date. Only the year (2025, from the document itself) and the effective date
 * of the rebrand (29 September 2025, stated in the catalogue p.6) are verified.
 * `year` is therefore used rather than a fabricated full date.
 */

export type NewsItem = {
  slug: string;
  title: string;
  /**
   * Short label for the News submenu. Headlines run long; the navigation
   * needs a few words. Falls back to `title` when absent.
   */
  navLabel?: string;
  summary: string;
  /** Verified publication year. No precise date is stated on the source. */
  year: string;
  /** Optional verified date of the event the item describes. */
  effectiveDate?: string;
  source: string;
  href: string;
};

export const newsItems: NewsItem[] = [
  {
    slug: "frosts-becomes-morakniv",
    title:
      "Frosts becomes Morakniv and strengthens its position in the food industry",
    navLabel: "Frosts becomes Morakniv",
    summary:
      "After 134 years, the Frosts brand is consolidating under the Morakniv name. The change involves no organisational changes and does not affect the product range or production — from 29 September 2025 the knives carry the Morakniv logo.",
    year: "2025",
    effectiveDate: "29 September 2025",
    source: "Morakniv AB",
    href: "/news/frosts-becomes-morakniv",
  },
];

export function getNewsItem(slug: string): NewsItem | undefined {
  return newsItems.find((item) => item.slug === slug);
}
