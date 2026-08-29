"use client";

import { useSelectedVariant } from "@/components/product/useSelectedVariant";
import { COLOR_LABELS } from "@/lib/products";
import type { Product } from "@/lib/products/types";

type ModelImageNoteProps = {
  product: Product;
  /** False when the model has no photograph yet. */
  hasModelImage: boolean;
};

/**
 * The line under the product photograph.
 *
 * Every catalogue photograph shows one physical knife with a BLACK handle, and
 * one photograph covers all of a model's colours. When the visitor has selected
 * another colour the page has to say so outright — otherwise the image reads as
 * a picture of that colour, which would be a false claim about a product.
 *
 * It reads the selection from the URL rather than from shared state, which is
 * how it stays in step with the variant table in the other column.
 *
 * Kept deliberately quiet: small, muted, directly under the frame. It is a
 * clarification, not a warning.
 */
export function ModelImageNote({ product, hasModelImage }: ModelImageNoteProps) {
  const selected = useSelectedVariant(product);

  if (!hasModelImage) {
    return (
      <p className="mt-3 text-xs leading-relaxed text-ink-subtle">
        Photography for this model has not been supplied yet.
      </p>
    );
  }

  return (
    <p className="mt-3 text-xs leading-relaxed text-ink-subtle">
      Representative image of model{" "}
      <span className="font-mono">{product.modelCode}</span>.
      {selected.color === "black" ? (
        " Shown with the black handle."
      ) : (
        <>
          {" "}
          Model image shown with black handle; article {selected.articleNo} is
          supplied in {COLOR_LABELS[selected.color].toLowerCase()}.
        </>
      )}
    </p>
  );
}
