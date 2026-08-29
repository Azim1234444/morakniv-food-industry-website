import type { Product } from "@/lib/products/types";

/**
 * PUG range — special knives.
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
export const pugSpecialKnives: Product[] = [
  {
    modelCode: "LS5-PUG",
    slug: "ls5-pug",
    name: "Skinning Knife Lamb",
    category: "special-knives",
    handle: "pug",
    dimension: { printed: '5" / 139 mm', inch: '5"', mm: 139 },
    variants: [
      { articleNo: "14899", color: "black" },
    ],
    images: [],
    source: { catalogue: "pug", page: 21 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "LS5BT-PUG",
    slug: "ls5bt-pug",
    name: "Skinning Knife Lamb Blunt Tip",
    category: "special-knives",
    handle: "pug",
    dimension: { printed: '5" / 138 mm', inch: '5"', mm: 138 },
    variants: [
      { articleNo: "14904", color: "black" },
    ],
    images: [],
    source: { catalogue: "pug", page: 22 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "CS5-PUG",
    slug: "cs5-pug",
    name: "Skinning Knife Curved",
    category: "special-knives",
    handle: "pug",
    dimension: { printed: '5" / 145 mm', inch: '5"', mm: 145 },
    variants: [
      { articleNo: "14905", color: "black" },
    ],
    images: [],
    source: { catalogue: "pug", page: 23 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "CS6-PUG",
    slug: "cs6-pug",
    name: "Skinning Knife Curved",
    category: "special-knives",
    handle: "pug",
    dimension: { printed: '6" / 169 mm', inch: '6"', mm: 169 },
    variants: [
      { articleNo: "14906", color: "black" },
      { articleNo: "15029", color: "yellow" },
      { articleNo: "15030", color: "green" },
    ],
    images: [],
    source: { catalogue: "pug", page: 24 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "FL6-PUG",
    slug: "fl6-pug",
    name: "Universal/Flank Knife",
    category: "special-knives",
    handle: "pug",
    dimension: { printed: '6" / 161 mm', inch: '6"', mm: 161 },
    variants: [
      { articleNo: "14913", color: "black" },
    ],
    images: [],
    source: { catalogue: "pug", page: 30 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "FL8-PUG",
    slug: "fl8-pug",
    name: "Flank Knife",
    category: "special-knives",
    handle: "pug",
    dimension: { printed: '8" / 210 mm', inch: '8"', mm: 210 },
    variants: [
      { articleNo: "14914", color: "black" },
      { articleNo: "15037", color: "yellow" },
      { articleNo: "15038", color: "red" },
      { articleNo: "15039", color: "green" },
      { articleNo: "15040", color: "metal-detectable-blue" },
    ],
    images: [],
    source: { catalogue: "pug", page: 31 },
    dataStatus: "catalogue-verified",
  },
];
