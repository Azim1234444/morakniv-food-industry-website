import type { Product } from "@/lib/products/types";

/**
 * PUG range — chef's knives.
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
export const pugChefsKnives: Product[] = [
  {
    modelCode: "BR9-PUG",
    slug: "br9-pug",
    name: "Bread Knife",
    category: "chefs-knives",
    handle: "pug",
    dimension: { printed: '9" / 253 mm', inch: '9"', mm: 253 },
    variants: [
      { articleNo: "14923", color: "black" },
    ],
    images: [],
    source: { catalogue: "pug", page: 37 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "SL12-PUG",
    slug: "sl12-pug",
    name: "Slicing Knife",
    category: "chefs-knives",
    handle: "pug",
    dimension: { printed: '12" / 299 mm', inch: '12"', mm: 299 },
    variants: [
      { articleNo: "14924", color: "black" },
    ],
    images: [],
    source: { catalogue: "pug", page: 38 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "CH5-PUG",
    slug: "ch5-pug",
    name: "Chef Knife",
    category: "chefs-knives",
    handle: "pug",
    dimension: { printed: '5" / 128 mm', inch: '5"', mm: 128 },
    variants: [
      { articleNo: "14925", color: "black" },
    ],
    images: [],
    source: { catalogue: "pug", page: 39 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "CH7-PUG",
    slug: "ch7-pug",
    name: "Chef Knife",
    category: "chefs-knives",
    handle: "pug",
    dimension: { printed: '7" / 176 mm', inch: '7"', mm: 176 },
    variants: [
      { articleNo: "14926", color: "black" },
    ],
    images: [],
    source: { catalogue: "pug", page: 40 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "CH8-PUG",
    slug: "ch8-pug",
    name: "Chef Knife",
    category: "chefs-knives",
    handle: "pug",
    dimension: { printed: '8" / 208 mm', inch: '8"', mm: 208 },
    variants: [
      { articleNo: "14927", color: "black" },
    ],
    images: [],
    source: { catalogue: "pug", page: 41 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "CH10-PUG",
    slug: "ch10-pug",
    name: "Chef Knife",
    category: "chefs-knives",
    handle: "pug",
    dimension: { printed: '10" / 257 mm', inch: '10"', mm: 257 },
    variants: [
      { articleNo: "14928", color: "black" },
    ],
    images: [],
    source: { catalogue: "pug", page: 42 },
    dataStatus: "catalogue-verified",
  },
];
