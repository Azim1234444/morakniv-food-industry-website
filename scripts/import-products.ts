/**
 * Gung "Product Data Excel" importer — SCAFFOLD, NOT YET RUNNABLE.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS EXISTS
 * ---------------------------------------------------------------------------
 * Every product record in `lib/products/data/` currently carries only an
 * article number and a name, marked `needs-verification`. The 2026 PDF
 * catalogue lays its assortment tables out visually and the attribute columns
 * desynchronise on pp.27, 29, 31, 33, 35 and 38, so specifications cannot be
 * read back from it safely.
 *
 * The authoritative source is the Gung B2B portal's bulk export, documented in
 * `Morakniv_User Manual_B2B portal Gung_ENG.pdf`:
 *
 *   Portal → Export Products → "Product Data Excel"
 *   (English; delivered as a download link by email)
 *
 * ---------------------------------------------------------------------------
 * WHAT IS DELIBERATELY MISSING
 * ---------------------------------------------------------------------------
 * No sample spreadsheet ships with this repo, and none has been fabricated.
 * The real column headings are unknown until the export is obtained, so
 * `COLUMN_MAP` below is a placeholder that MUST be reconciled against the
 * actual file before the first run. Nothing here should be taken as a
 * description of the export's true shape.
 *
 * ---------------------------------------------------------------------------
 * TO ACTIVATE
 * ---------------------------------------------------------------------------
 *  1. Obtain the export and save it to `data/gung-product-data.xlsx`
 *     (git-ignored — it contains customer-specific pricing).
 *  2. `npm i -D xlsx tsx`
 *  3. Open the file, list the real headings, and correct `COLUMN_MAP`.
 *  4. Uncomment the `readWorkbook` implementation.
 *  5. `npx tsx scripts/import-products.ts --dry-run`
 *     Review the diff report before writing anything.
 *  6. `npx tsx scripts/import-products.ts --write`
 *
 * The importer matches on ARTICLE NUMBER only. Names are never used for
 * matching — the catalogue renders the same article number with two different
 * names in at least one case (129-3795).
 */

import type {
  BladeStiffness,
  HandleColor,
  HandleType,
  Product,
} from "@/lib/products/types";

/* -------------------------------------------------------------------------
   Column mapping — PLACEHOLDER. Reconcile against the real export first.
   ------------------------------------------------------------------------- */
const COLUMN_MAP = {
  articleNo: "Article No.",
  name: "Product Name",
  handle: "Handle",
  color: "Color",
  dimension: "Dimension",
  stiffness: "Blade Stiffness",
  nsf: "NSF Approved",
} as const;

/* -------------------------------------------------------------------------
   Value normalisation
   ------------------------------------------------------------------------- */

const HANDLE_LOOKUP: Record<string, HandleType> = {
  "ergo-grip": "ergo-grip",
  ergogrip: "ergo-grip",
  "g-grip": "g-grip",
  "uni-grip": "uni-grip",
  unigrip: "uni-grip",
  "pro-grip": "pro-grip",
  progrip: "pro-grip",
  "p-grip": "p-grip",
  "ps-grip": "ps-grip",
  "pm-grip": "pm-grip",
  "pq-grip": "pq-grip",
  "rmh-grip": "rmh-grip",
  "am-grip": "am-grip",
  "1025-grip": "1025-grip",
  "511-grip": "511-grip",
  "g143-grip": "g143-grip",
  sheath: "sheath",
};

const COLOR_LOOKUP: Record<string, HandleColor> = {
  black: "black",
  blue: "blue",
  green: "green",
  red: "red",
  yellow: "yellow",
  white: "white",
};

const STIFFNESS_LOOKUP: Record<string, BladeStiffness> = {
  stiff: "stiff",
  "medium-flex": "medium-flex",
  "medium flex": "medium-flex",
  mediumflex: "medium-flex",
  flex: "flex",
  "extra-flex": "extra-flex",
  "extra flex": "extra-flex",
  extraflex: "extra-flex",
  "ball point": "ball-point",
  "belly opener": "belly-opener",
};

function normaliseKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function parseHandle(raw: unknown): HandleType | undefined {
  if (typeof raw !== "string") return undefined;
  return HANDLE_LOOKUP[normaliseKey(raw)];
}

export function parseColor(raw: unknown): HandleColor | undefined {
  if (typeof raw !== "string") return undefined;
  return COLOR_LOOKUP[normaliseKey(raw)];
}

export function parseStiffness(raw: unknown): BladeStiffness | undefined {
  if (typeof raw !== "string") return undefined;
  return STIFFNESS_LOOKUP[normaliseKey(raw)];
}

/**
 * Splits the catalogue's combined dimension cell, e.g.
 *   `5"/132 mm`  ->  { lengthInch: '5"', lengthMm: 132 }
 *   `6½"/158mm`  ->  { lengthInch: '6½"', lengthMm: 158 }
 *   `118mm`      ->  { lengthMm: 118 }
 *
 * The inch value is kept as a display string because the source mixes plain,
 * fraction-glyph and mixed-number forms that do not round-trip through a float.
 */
export function parseDimension(raw: unknown): {
  lengthInch?: string;
  lengthMm?: number;
} {
  if (typeof raw !== "string") return {};

  const value = raw.trim();
  const mmMatch = value.match(/(\d{2,3})\s*mm/i);
  const inchMatch = value.match(/([\d\s./¼½¾⅓⅔⅛⅜⅝⅞]+)"/);

  return {
    lengthInch: inchMatch ? `${inchMatch[1].trim()}"` : undefined,
    lengthMm: mmMatch ? Number(mmMatch[1]) : undefined,
  };
}

export function parseNsf(raw: unknown): boolean | undefined {
  if (typeof raw !== "string") return undefined;
  const value = normaliseKey(raw);
  if (value === "" || value === "-") return undefined;
  if (value === "nsf" || value === "yes" || value === "x") return true;
  if (value === "no") return false;
  return undefined;
}

/* -------------------------------------------------------------------------
   Row -> partial Product
   ------------------------------------------------------------------------- */

export type SourceRow = Record<string, unknown>;

export type ImportResult = {
  articleNo: string;
  patch: Partial<Product>;
  /** Fields present in the export and successfully parsed. */
  resolved: string[];
  /** Fields present but not recognised — these need a lookup-table entry. */
  unresolved: string[];
};

export function mapRow(row: SourceRow): ImportResult | null {
  const articleNo = String(row[COLUMN_MAP.articleNo] ?? "").trim();
  if (!articleNo) return null;

  const resolved: string[] = [];
  const unresolved: string[] = [];

  const handle = parseHandle(row[COLUMN_MAP.handle]);
  if (handle) resolved.push("handle");
  else if (row[COLUMN_MAP.handle]) unresolved.push("handle");

  const color = parseColor(row[COLUMN_MAP.color]);
  if (color) resolved.push("color");
  else if (row[COLUMN_MAP.color]) unresolved.push("color");

  const stiffness = parseStiffness(row[COLUMN_MAP.stiffness]);
  if (stiffness) resolved.push("stiffness");
  else if (row[COLUMN_MAP.stiffness]) unresolved.push("stiffness");

  const { lengthInch, lengthMm } = parseDimension(row[COLUMN_MAP.dimension]);
  if (lengthInch || lengthMm) resolved.push("dimension");
  else if (row[COLUMN_MAP.dimension]) unresolved.push("dimension");

  const nsfApproved = parseNsf(row[COLUMN_MAP.nsf]);
  if (nsfApproved !== undefined) resolved.push("nsf");

  const patch: Partial<Product> = {
    handle,
    color,
    nsfApproved,
    blade: { lengthInch, lengthMm, stiffness },
    /*
     * A record is only promoted to "verified" when the export actually
     * supplied the core attributes. A row that arrives half-empty stays
     * unverified rather than publishing a partial specification.
     */
    dataStatus:
      handle && stiffness && (lengthInch || lengthMm)
        ? "verified"
        : "needs-verification",
  };

  return { articleNo, patch, resolved, unresolved };
}

/* -------------------------------------------------------------------------
   Entry point
   ------------------------------------------------------------------------- */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function readWorkbook(_path: string): Promise<SourceRow[]> {
  /*
   * Intentionally not implemented. Uncomment once `xlsx` is installed AND the
   * real column headings have been confirmed:
   *
   *   const XLSX = await import("xlsx");
   *   const book = XLSX.readFile(_path);
   *   const sheet = book.Sheets[book.SheetNames[0]];
   *   return XLSX.utils.sheet_to_json<SourceRow>(sheet, { defval: "" });
   */
  throw new Error(
    "readWorkbook is not implemented. Obtain the Gung Product Data Excel " +
      "export, confirm its column headings against COLUMN_MAP, install `xlsx`, " +
      "then enable the implementation in scripts/import-products.ts.",
  );
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const write = args.has("--write");

  console.log(
    write
      ? "Importing Gung product data (WRITE mode)…"
      : "Importing Gung product data (dry run)…",
  );

  const rows = await readWorkbook("data/gung-product-data.xlsx");
  const results = rows.map(mapRow).filter((r): r is ImportResult => r !== null);

  const verified = results.filter(
    (r) => r.patch.dataStatus === "verified",
  ).length;

  console.log(`  rows read     : ${rows.length}`);
  console.log(`  mapped        : ${results.length}`);
  console.log(`  would verify  : ${verified}`);

  const unresolved = results.flatMap((r) =>
    r.unresolved.map((field) => `${r.articleNo}: ${field}`),
  );

  if (unresolved.length > 0) {
    console.warn(
      `\n  ${unresolved.length} unrecognised values — add lookup entries before writing:`,
    );
    for (const line of unresolved.slice(0, 20)) console.warn(`    ${line}`);
  }

  if (!write) {
    console.log("\nDry run complete. Re-run with --write to apply.");
    return;
  }

  throw new Error(
    "Write mode is not implemented yet. Emit updated files into " +
      "lib/products/data/ only after a dry run has been reviewed.",
  );
}

if (require.main === module) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
