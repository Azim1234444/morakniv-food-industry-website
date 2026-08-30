"use client";

import { useSelectedVariant } from "@/components/product/useSelectedVariant";
import type { FamilyImageAttribution } from "@/lib/images/model-image";
import { COLOR_LABELS } from "@/lib/products";
import { getDefaultVariant } from "@/lib/products/types";
import type { Product, ProductVariant } from "@/lib/products/types";

type ModelImageNoteProps = {
  product: Product;
  /** False when the model resolves to no photograph at all. */
  hasImage: boolean;
  /**
   * Set when the photograph is the one printed above this model's family
   * table and shows a sibling flex grade rather than this model.
   */
  family?: FamilyImageAttribution;
};

/**
 * The line under the product photograph.
 *
 * It carries up to two disclosures, and they are independent of each other:
 *
 *   WHICH KNIFE IS IN THE FRAME. Ten models borrow the photograph printed
 *   above their family's catalogue table, which shows a sibling in another
 *   flex grade. The caption then names both models and both grades outright.
 *   The two knives share a product name, a printed dimension and a blade
 *   geometry, so the photograph is a true picture of the family — but the
 *   blade in it is etched with the sibling's grade, and saying so is what
 *   keeps a correct family image from reading as a false spec.
 *
 *   WHICH COLOUR IT IS. Every catalogue photograph shows a BLACK handle, and
 *   one photograph covers all of a model's colours. When the visitor has
 *   selected another colour the page says so outright — otherwise the image
 *   reads as a picture of that colour, which would be a false claim about a
 *   product.
 *
 * It reads the selection from the URL rather than from shared state, which is
 * how it stays in step with the variant table in the other column.
 *
 * Kept deliberately quiet: small, muted, directly under the frame. These are
 * clarifications, not warnings.
 */
export function ModelImageNote({
  product,
  hasImage,
  family,
}: ModelImageNoteProps) {
  const selected = useSelectedVariant(product);

  return (
    <ImageNote
      product={product}
      hasImage={hasImage}
      family={family}
      selected={selected}
    />
  );
}

/**
 * The same note before the URL has been read, rendered against the model's
 * default variant — which is black, so the colour clause is absent and the
 * text does not jump when the client island takes over.
 */
export function ModelImageNoteFallback({
  product,
  hasImage,
  family,
}: ModelImageNoteProps) {
  return (
    <ImageNote
      product={product}
      hasImage={hasImage}
      family={family}
      selected={getDefaultVariant(product)}
    />
  );
}

function ImageNote({
  product,
  hasImage,
  family,
  selected,
}: ModelImageNoteProps & { selected: ProductVariant }) {
  if (!hasImage) {
    return (
      <p className="mt-3 text-xs leading-relaxed text-ink-subtle">
        Photography for this model has not been supplied yet.
      </p>
    );
  }

  return (
    <p className="mt-3 text-xs leading-relaxed text-ink-subtle">
      {family ? (
        <>
          Catalogue photograph for {family.familyName}
          {family.dimension ? ` ${family.dimension}` : ""}, shown with the black
          handle. The knife pictured is{" "}
          <Code>{family.photographedModelCode}</Code>
          {family.photographedFlex ? ` (${family.photographedFlex})` : ""}; this
          page is <Code>{family.currentModelCode}</Code>
          {family.currentFlex ? ` (${family.currentFlex})` : ""}. The two share
          the same blade geometry and differ in flex grade.
        </>
      ) : (
        <>
          Catalogue photograph of <Code>{product.modelCode}</Code>, shown with
          the black handle.
        </>
      )}
      {selected.color !== "black" && (
        <>
          {" "}
          Article{" "}
          <span className="font-mono tabular-nums">{selected.articleNo}</span> is
          supplied in {COLOR_LABELS[selected.color].toLowerCase()}.
        </>
      )}
    </p>
  );
}

/** Model codes are set in mono so they read as identifiers, not prose. */
function Code({ children }: { children: string }) {
  return <span className="font-mono">{children}</span>;
}
