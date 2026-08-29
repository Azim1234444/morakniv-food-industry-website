import type { Product } from "@/lib/products/types";

/**
 * PUG range — butcher knives.
 *
 * Source: Morakniv Professional Food Industry Knives — PUG. One record per
 * MODEL CODE, which is the product identity the catalogue prints in the NAME
 * column of each assortment table. Article numbers are colour variants of a
 * model and are listed under `variants`.
 *
 * WHY THE MODEL CODE IS THE PRODUCT, NOT THE ARTICLE NUMBER.
 * On each assortment page the flex grade is drawn as a single artwork block
 * spanning a whole group of rows, while the colour is drawn as one filled
 * circle per row. The catalogue is therefore stating that flex belongs to the
 * model code and colour belongs to the article number. Rows within a group sit
 * 12 pt apart and groups are separated by 24 pt, which is what fixes the
 * grouping. Sibling model codes sharing a page — CB5S / CB5MF / CB5F — are
 * separate products, not options on one product: each has its own model code,
 * its own flex artwork, and its own blade etching.
 *
 * Colour was read from the PDF's content streams rather than its text layer
 * (the COLOR column contains no text) and cross-checked against the model
 * code. Hence `dataStatus: "catalogue-verified"` — supported by the supplied
 * catalogue, but not yet reconciled against the Gung B2B product data export,
 * which remains the authority and is what `"verified"` means.
 *
 * FIELDS DELIBERATELY ABSENT.
 *   - `blade.lengthMm` / `blade.lengthInch`: the catalogue prints a
 *     dimension beside each model but never says whether it is blade length or
 *     overall length. The value is recorded verbatim in `dimension` instead.
 *   - `nsfApproved`: the PUG catalogue has no NSF column. Undefined means
 *     unknown, never "not approved".
 *   - `blade.shape`: not printed as a discrete value.
 *   - `images`: per-article photography does not exist. Model photography is
 *     keyed by model code in `lib/images/pug-models.ts`.
 *
 * Records appear in catalogue print order. Variants are in the catalogue's own
 * swatch order: black, yellow, red, green, metal-detectable blue.
 */
export const pugButcherKnives: Product[] = [
  {
    modelCode: "SBK5-PUG",
    slug: "sbk5-pug",
    name: "Butcher Knife Scandinavian",
    category: "butcher-knives",
    handle: "pug",
    dimension: { printed: '5" / 136 mm', inch: '5"', mm: 136 },
    variants: [
      { articleNo: "14907", color: "black" },
    ],
    images: [],
    source: { catalogue: "pug", page: 25 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "SBK6-PUG",
    slug: "sbk6-pug",
    name: "Butcher Knife Scandinavian",
    category: "butcher-knives",
    handle: "pug",
    dimension: { printed: '6" / 164 mm', inch: '6"', mm: 164 },
    variants: [
      { articleNo: "14908", color: "black" },
    ],
    images: [],
    source: { catalogue: "pug", page: 26 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "SH8-PUG",
    slug: "sh8-pug",
    name: "Header Knife Straight",
    category: "butcher-knives",
    handle: "pug",
    dimension: { printed: '8" / 206 mm', inch: '8"', mm: 206 },
    variants: [
      { articleNo: "14912", color: "black" },
    ],
    images: [],
    source: { catalogue: "pug", page: 29 },
    dataStatus: "catalogue-verified",
  },
];
