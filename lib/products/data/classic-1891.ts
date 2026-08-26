import type { Product } from "@/lib/products/types";

/**
 * Source: Morakniv Professional Food Industry Knives 2026, pp.40–41.
 *
 * Unlike the other eight sections, the Classic 1891 pages present the range as
 * five named models with NO article numbers printed. `articleNo` is therefore
 * `null` on every record here — the identifiers have to come from the Gung
 * Product Data export along with the specifications.
 *
 * The catalogue describes the collection as having a barrel-shaped handle in
 * red-stained Swedish birch, inspired by the first Morakniv.
 */
export const classic1891: Product[] = [
  {
    articleNo: null,
    slug: "classic-1891-paring-knife",
    name: "Paring Knife",
    category: "classic-1891",
    images: [],
    dataStatus: "needs-verification",
  },
  {
    articleNo: null,
    slug: "classic-1891-utility-knife",
    name: "Utility Knife",
    category: "classic-1891",
    images: [],
    dataStatus: "needs-verification",
  },
  {
    articleNo: null,
    slug: "classic-1891-chefs-knife",
    name: "Chef's Knife",
    category: "classic-1891",
    images: [],
    dataStatus: "needs-verification",
  },
  {
    articleNo: null,
    slug: "classic-1891-filleting-knife",
    name: "Filleting Knife",
    category: "classic-1891",
    images: [],
    dataStatus: "needs-verification",
  },
  {
    articleNo: null,
    slug: "classic-1891-bread-knife",
    name: "Bread Knife",
    category: "classic-1891",
    images: [],
    dataStatus: "needs-verification",
  },
];

/* 5 records */
