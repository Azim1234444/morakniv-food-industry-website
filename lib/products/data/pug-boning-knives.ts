import type { Product } from "@/lib/products/types";

/**
 * PUG range — boning knives.
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
export const pugBoningKnives: Product[] = [
  {
    modelCode: "CB5S-PUG",
    slug: "cb5s-pug",
    name: "Boning Knife Curved",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '5" / 133 mm', inch: '5"', mm: 133 },
    blade: { stiffness: "stiff" },
    variants: [
      { articleNo: "14872", color: "black" },
      { articleNo: "14961", color: "yellow" },
      { articleNo: "14962", color: "red" },
      { articleNo: "14963", color: "green" },
      { articleNo: "14964", color: "metal-detectable-blue" },
    ],
    images: [],
    source: { catalogue: "pug", page: 8 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "CB5MF-PUG",
    slug: "cb5mf-pug",
    name: "Boning Knife Curved",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '5" / 133 mm', inch: '5"', mm: 133 },
    blade: { stiffness: "medium-flex" },
    variants: [
      { articleNo: "14873", color: "black" },
      { articleNo: "14952", color: "yellow" },
      { articleNo: "14953", color: "red" },
      { articleNo: "14954", color: "green" },
      { articleNo: "14955", color: "metal-detectable-blue" },
    ],
    images: [],
    source: { catalogue: "pug", page: 8 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "CB5F-PUG",
    slug: "cb5f-pug",
    name: "Boning Knife Curved",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '5" / 133 mm', inch: '5"', mm: 133 },
    blade: { stiffness: "flex" },
    variants: [
      { articleNo: "14874", color: "black" },
    ],
    images: [],
    source: { catalogue: "pug", page: 8 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "NCB5MF-PUG",
    slug: "ncb5mf-pug",
    name: "Boning Knife Narrow Curved",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '5" / 133 mm', inch: '5"', mm: 133 },
    blade: { stiffness: "medium-flex" },
    variants: [
      { articleNo: "14875", color: "black" },
      { articleNo: "14965", color: "yellow" },
      { articleNo: "14966", color: "red" },
      { articleNo: "14967", color: "green" },
      { articleNo: "14968", color: "metal-detectable-blue" },
    ],
    images: [],
    source: { catalogue: "pug", page: 9 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "UCB5MFSC-PUG",
    slug: "ucb5mfsc-pug",
    name: "Boning Knife Upper Curved With Scallop Grind",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '5" / 137 mm', inch: '5"', mm: 137 },
    blade: { stiffness: "medium-flex" },
    variants: [
      { articleNo: "14877", color: "black" },
    ],
    images: [],
    source: { catalogue: "pug", page: 10 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "CB6S-PUG",
    slug: "cb6s-pug",
    name: "Boning Knife Curved",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '6" / 158 mm', inch: '6"', mm: 158 },
    blade: { stiffness: "stiff" },
    variants: [
      { articleNo: "14878", color: "black" },
      { articleNo: "14969", color: "yellow" },
      { articleNo: "14970", color: "red" },
      { articleNo: "14971", color: "green" },
      { articleNo: "14972", color: "metal-detectable-blue" },
    ],
    images: [],
    source: { catalogue: "pug", page: 11 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "CB6F-PUG",
    slug: "cb6f-pug",
    name: "Boning Knife Curved",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '6" / 158 mm', inch: '6"', mm: 158 },
    blade: { stiffness: "flex" },
    variants: [
      { articleNo: "14879", color: "black" },
      { articleNo: "14956", color: "yellow" },
      { articleNo: "14957", color: "red" },
      { articleNo: "14958", color: "green" },
      { articleNo: "14959", color: "metal-detectable-blue" },
    ],
    images: [],
    source: { catalogue: "pug", page: 11 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "CB6XF-PUG",
    slug: "cb6xf-pug",
    name: "Boning Knife Curved",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '6" / 158 mm', inch: '6"', mm: 158 },
    blade: { stiffness: "extra-flex" },
    variants: [
      { articleNo: "14880", color: "black" },
      { articleNo: "15041", color: "yellow" },
      { articleNo: "15042", color: "red" },
      { articleNo: "15043", color: "green" },
      { articleNo: "15044", color: "metal-detectable-blue" },
    ],
    images: [],
    source: { catalogue: "pug", page: 11 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "WCB6MFSC-PUG",
    slug: "wcb6mfsc-pug",
    name: "Boning Knife Curved With Scallop Grind",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '6" / 159 mm', inch: '6"', mm: 159 },
    blade: { stiffness: "medium-flex" },
    variants: [
      { articleNo: "14884", color: "black" },
    ],
    images: [],
    source: { catalogue: "pug", page: 12 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "WCB6S-PUG",
    slug: "wcb6s-pug",
    name: "Boning Knife Wide Curved",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '6" / 159 mm', inch: '6"', mm: 159 },
    blade: { stiffness: "stiff" },
    variants: [
      { articleNo: "14882", color: "black" },
    ],
    images: [],
    source: { catalogue: "pug", page: 13 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "WCB6MF-PUG",
    slug: "wcb6mf-pug",
    name: "Boning Knife Wide Curved",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '6" / 159 mm', inch: '6"', mm: 159 },
    blade: { stiffness: "medium-flex" },
    variants: [
      { articleNo: "14883", color: "black" },
    ],
    images: [],
    source: { catalogue: "pug", page: 13 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "SB4MF-PUG",
    slug: "sb4mf-pug",
    name: "Boning Knife Straight",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '4" / 101 mm', inch: '4"', mm: 101 },
    blade: { stiffness: "medium-flex" },
    variants: [
      { articleNo: "14885", color: "black" },
    ],
    images: [],
    source: { catalogue: "pug", page: 14 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "SB5S-PUG",
    slug: "sb5s-pug",
    name: "Boning Knife Straight",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '5" / 135 mm', inch: '5"', mm: 135 },
    blade: { stiffness: "stiff" },
    variants: [
      { articleNo: "14886", color: "black" },
      { articleNo: "14973", color: "yellow" },
      { articleNo: "14974", color: "green" },
    ],
    images: [],
    source: { catalogue: "pug", page: 15 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "SB5MF-PUG",
    slug: "sb5mf-pug",
    name: "Boning Knife Straight",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '5" / 135 mm', inch: '5"', mm: 135 },
    blade: { stiffness: "medium-flex" },
    variants: [
      { articleNo: "14887", color: "black" },
      { articleNo: "14975", color: "yellow" },
      { articleNo: "14976", color: "green" },
    ],
    images: [],
    source: { catalogue: "pug", page: 15 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "SB5F-PUG",
    slug: "sb5f-pug",
    name: "Boning Knife Straight",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '5" / 135 mm', inch: '5"', mm: 135 },
    blade: { stiffness: "flex" },
    variants: [
      { articleNo: "14888", color: "black" },
      { articleNo: "15019", color: "yellow" },
      { articleNo: "15020", color: "green" },
    ],
    images: [],
    source: { catalogue: "pug", page: 15 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "SB6S-PUG",
    slug: "sb6s-pug",
    name: "Boning Knife Straight",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '6" / 160 mm', inch: '6"', mm: 160 },
    blade: { stiffness: "stiff" },
    variants: [
      { articleNo: "14889", color: "black" },
      { articleNo: "15021", color: "yellow" },
      { articleNo: "15024", color: "green" },
    ],
    images: [],
    source: { catalogue: "pug", page: 16 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "SB6MF-PUG",
    slug: "sb6mf-pug",
    name: "Boning Knife Straight",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '6" / 160 mm', inch: '6"', mm: 160 },
    blade: { stiffness: "medium-flex" },
    variants: [
      { articleNo: "14890", color: "black" },
      { articleNo: "15025", color: "yellow" },
      { articleNo: "15026", color: "green" },
    ],
    images: [],
    source: { catalogue: "pug", page: 16 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "SB6F-PUG",
    slug: "sb6f-pug",
    name: "Boning Knife Straight",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '6" / 160 mm', inch: '6"', mm: 160 },
    blade: { stiffness: "flex" },
    variants: [
      { articleNo: "14894", color: "black" },
      { articleNo: "15027", color: "yellow" },
      { articleNo: "15028", color: "green" },
    ],
    images: [],
    source: { catalogue: "pug", page: 16 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "WSB6S-PUG",
    slug: "wsb6s-pug",
    name: "Boning Knife Wide Straight",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '6" / 151 mm', inch: '6"', mm: 151 },
    blade: { stiffness: "stiff" },
    variants: [
      { articleNo: "14895", color: "black" },
      { articleNo: "14938", color: "yellow" },
      { articleNo: "14942", color: "red" },
      { articleNo: "14943", color: "green" },
      { articleNo: "14944", color: "metal-detectable-blue" },
    ],
    images: [],
    source: { catalogue: "pug", page: 17 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "WSB7S-PUG",
    slug: "wsb7s-pug",
    name: "Boning Knife Wide Straight",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '7" / 180 mm', inch: '7"', mm: 180 },
    blade: { stiffness: "stiff" },
    variants: [
      { articleNo: "14896", color: "black" },
      { articleNo: "14945", color: "yellow" },
      { articleNo: "14947", color: "red" },
      { articleNo: "14948", color: "green" },
      { articleNo: "14949", color: "metal-detectable-blue" },
    ],
    images: [],
    source: { catalogue: "pug", page: 18 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "WB5S-PUG",
    slug: "wb5s-pug",
    name: "Boning Knife Wide",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '5" / 136 mm', inch: '5"', mm: 136 },
    blade: { stiffness: "stiff" },
    variants: [
      { articleNo: "14897", color: "black" },
    ],
    images: [],
    source: { catalogue: "pug", page: 19 },
    dataStatus: "catalogue-verified",
  },
  {
    modelCode: "WB6S-PUG",
    slug: "wb6s-pug",
    name: "Boning Knife Wide",
    category: "boning-knives",
    handle: "pug",
    dimension: { printed: '6" / 156 mm', inch: '6"', mm: 156 },
    blade: { stiffness: "stiff" },
    variants: [
      { articleNo: "14898", color: "black" },
    ],
    images: [],
    source: { catalogue: "pug", page: 20 },
    dataStatus: "catalogue-verified",
  },
];
