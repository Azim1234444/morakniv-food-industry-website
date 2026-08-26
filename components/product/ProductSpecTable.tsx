import {
  COLOR_LABELS,
  HANDLE_LABELS,
  STIFFNESS_LABELS,
} from "@/lib/products";
import type { Product } from "@/lib/products/types";

type ProductSpecTableProps = {
  product: Product;
};

/**
 * Specification table.
 *
 * Renders rows ONLY for a verified record. For anything still marked
 * `needs-verification` the caller shows the pending notice instead — this
 * component deliberately has no fallback that guesses or part-fills values.
 */
export function ProductSpecTable({ product }: ProductSpecTableProps) {
  if (product.dataStatus !== "verified") return null;

  const rows: { label: string; value: string }[] = [];

  if (product.articleNo) {
    rows.push({ label: "Article number", value: product.articleNo });
  }
  if (product.modelCode) {
    rows.push({ label: "Model code", value: product.modelCode });
  }
  if (product.handle) {
    rows.push({ label: "Handle", value: HANDLE_LABELS[product.handle] });
  }
  if (product.color) {
    rows.push({ label: "Colour", value: COLOR_LABELS[product.color] });
  }
  if (product.blade?.lengthInch || product.blade?.lengthMm) {
    const parts = [
      product.blade.lengthInch,
      product.blade.lengthMm ? `${product.blade.lengthMm} mm` : undefined,
    ].filter(Boolean);
    rows.push({ label: "Blade length", value: parts.join(" / ") });
  }
  if (product.blade?.stiffness) {
    rows.push({
      label: "Blade stiffness",
      value: STIFFNESS_LABELS[product.blade.stiffness],
    });
  }
  if (product.nsfApproved === true) {
    rows.push({ label: "NSF approved", value: "Yes" });
  }

  if (rows.length === 0) return null;

  return (
    <div className="overflow-x-auto border border-line">
      <table className="w-full text-sm">
        <caption className="sr-only">
          Specifications for {product.name}
        </caption>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-line last:border-0">
              <th
                scope="row"
                className="w-1/2 bg-surface-alt px-5 py-3.5 text-left font-normal text-ink-subtle"
              >
                {row.label}
              </th>
              <td className="px-5 py-3.5 font-medium text-ink tabular-nums">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
