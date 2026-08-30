import type { StaticImageData } from "next/image";

import {
  getFamilyImageDonor,
  getModelImage,
} from "@/lib/images/pug-models";
import { STIFFNESS_LABELS, getProductBySlug } from "@/lib/products";
import type { Product } from "@/lib/products/types";

/**
 * WHICH PHOTOGRAPH REPRESENTS A MODEL, AND WHAT THE PAGE MUST SAY ABOUT IT.
 *
 * Two levels, in order of precedence:
 *   1. The model's own catalogue photograph — the knife whose blade is etched
 *      with this model code. Thirty-five of the forty-five models.
 *   2. The photograph printed above the model's shared family table, borrowed
 *      from the sibling it shows. Ten models, six families, no new files.
 *
 * A borrowed photograph always arrives with a `family` attribution, and the UI
 * contract is that the attribution is rendered wherever the image is. The
 * photograph is a true picture of the family — same name, same printed
 * dimension, same blade geometry — and differs from the current model in flex
 * grade alone, which is exactly what the attribution states. Dropping it would
 * turn a correct family image into a false claim about a specific blade.
 *
 * Colour is a separate caveat and is handled separately: every photograph in
 * the range shows the black handle, whoever it belongs to, so the note under
 * the image names the selected article's colour when it is not black. Neither
 * caveat is ever collapsed into the other.
 */

/** Everything a borrowed photograph has to disclose. */
export type FamilyImageAttribution = {
  /** Product name shared by the family — the catalogue's page heading. */
  familyName: string;
  /** Printed dimension shared by the family, verbatim: `5" / 133 mm`. */
  dimension: string;
  /** The model the photograph actually shows. */
  photographedModelCode: string;
  /** Its flex grade, labelled: `Stiff`. */
  photographedFlex?: string;
  /** The model whose page is being rendered. */
  currentModelCode: string;
  /** Its flex grade, labelled: `Flex`. */
  currentFlex?: string;
};

export type ResolvedModelImage = {
  image: StaticImageData;
  alt: string;
  /** Page of the PUG catalogue the photograph was taken from. */
  page: number;
  /** The model the photograph shows — the current model, unless borrowed. */
  photographedModelCode: string;
  /** Present only on a borrowed family photograph. */
  family?: FamilyImageAttribution;
};

function flexLabel(product: Product | undefined): string | undefined {
  const stiffness = product?.blade?.stiffness;
  return stiffness ? STIFFNESS_LABELS[stiffness] : undefined;
}

/** The model record for a model code. Slugs are the lowercased code. */
function productForModelCode(modelCode: string): Product | undefined {
  return getProductBySlug(modelCode.toLowerCase());
}

/**
 * Alt text for a borrowed photograph.
 *
 * Describes the knife in the frame first, because that is what the image
 * shows, then says which model the page is about. A screen-reader user gets
 * the same disclosure the sighted caption carries, from the image itself.
 */
function familyAlt(
  donorProduct: Product | undefined,
  attribution: FamilyImageAttribution,
): string {
  const donorName = donorProduct?.name ?? attribution.familyName;
  const pictured = attribution.photographedFlex
    ? `${attribution.photographedModelCode} (${attribution.photographedFlex})`
    : attribution.photographedModelCode;
  const current = attribution.currentFlex
    ? `${attribution.currentModelCode} (${attribution.currentFlex})`
    : attribution.currentModelCode;

  return `Catalogue photograph of ${donorName} ${pictured}, a Morakniv food industry knife with a black PUG handle, photographed against a plain background. Shown for ${current}, the same blade geometry in a different flex grade.`;
}

/**
 * The photograph to show for a model, with the attribution its use requires.
 *
 * `undefined` only if a model has neither its own photograph nor a family
 * donor — which no current PUG model is. The callers keep their pending state
 * for that case rather than assuming coverage is total.
 */
export function resolveModelImage(
  product: Product,
): ResolvedModelImage | undefined {
  const direct = getModelImage(product.modelCode);

  if (direct) {
    return {
      image: direct.image,
      alt: direct.alt,
      page: direct.page,
      photographedModelCode: product.modelCode,
    };
  }

  const donorCode = getFamilyImageDonor(product.modelCode);
  if (!donorCode) return undefined;

  const donorImage = getModelImage(donorCode);
  if (!donorImage) return undefined;

  const donorProduct = productForModelCode(donorCode);

  const attribution: FamilyImageAttribution = {
    familyName: product.name,
    dimension: product.dimension?.printed ?? "",
    photographedModelCode: donorCode,
    photographedFlex: flexLabel(donorProduct),
    currentModelCode: product.modelCode,
    currentFlex: flexLabel(product),
  };

  return {
    image: donorImage.image,
    alt: familyAlt(donorProduct, attribution),
    page: donorImage.page,
    photographedModelCode: donorCode,
    family: attribution,
  };
}
