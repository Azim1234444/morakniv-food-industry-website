import type { StaticImageData } from "next/image";

import handleBlack from "@/public/images/technology/handle-colour-black.webp";
import handleBlue from "@/public/images/technology/handle-colour-blue.webp";
import handleGreen from "@/public/images/technology/handle-colour-green.webp";
import handleRed from "@/public/images/technology/handle-colour-red.webp";
import handleYellow from "@/public/images/technology/handle-colour-yellow.webp";
import markExtraFlex from "@/public/images/technology/blade-stiffness-extra-flex.webp";
import markFlex from "@/public/images/technology/blade-stiffness-flex.webp";
import markMediumFlex from "@/public/images/technology/blade-stiffness-medium-flex.webp";
import markStiff from "@/public/images/technology/blade-stiffness-stiff.webp";

/**
 * TECHNOLOGY REFERENCE VISUALS
 *
 * Prepared from the client image delivery of 27 August 2026 (the
 * `CorporateWebsite` asset pack), not from the 2026 PDF catalogue. Catalogue
 * crops live in `lib/images/catalogue.ts` and are a separate set.
 *
 * SCOPE RULE — read before adding anything here.
 * Everything in this file is a REFERENCE visual: it illustrates a property
 * (a handle colour, a flex grade) that the manufacturer publishes for the
 * range as a whole. None of it is product photography.
 *
 *   - Nothing here may be attached to a `Product` record, and nothing here
 *     may be used to satisfy `ProductImageFrame`. That frame is fed only from
 *     `lib/images/model-image.ts`, which resolves a model to its own catalogue
 *     photograph or to the one printed above its family's table. A reference
 *     visual is neither: it pictures a property, not a knife.
 *   - No image in the delivery carries an article number in its filename or
 *     on the blade, so no image can be tied to a SKU. Alt text and captions
 *     therefore describe what a visual SHOWS, never which product it is.
 *   - The handle colours below are the ones the client supplied. They are not
 *     an availability matrix: the catalogue lists a single colour per article
 *     number, and most articles are black. Nothing here should be read as
 *     "this product comes in these colours".
 *
 * PREPARATION — what was done to each source file, so it can be checked.
 * Handle colours: cropped to the moulded handle only. Showing the whole knife
 * would invite the reading that that particular knife is sold in four colours;
 * the handle alone reads as what it is, a colour reference.
 * Black: no black swatch was supplied in the colour set, so the black
 * reference is the handle end of one of the supplied product photographs,
 * rotated upright. It is a lower-resolution source than the other four and is
 * a different grip shape — it is a colour reference, not a fifth variant of
 * the same knife.
 * Stiffness marks: supplied as #040404 artwork on a flat #242424 ground, a
 * contrast ratio of 1.29:1 that is illegible on any background. The flat
 * ground has been keyed out and the artwork kept verbatim, re-laid in the
 * site ink colour over transparency. The shapes and lettering are unaltered.
 * This deviation is flagged for the client to confirm.
 */

export type HandleColourReference = {
  /** Colour name as the client labelled the supplied reference. */
  name: string;
  /** Lowercase key matching the `HandleColor` union in lib/products/types. */
  key: "red" | "blue" | "green" | "yellow" | "black";
  image: StaticImageData;
  alt: string;
  /**
   * `reference` — from the supplied handle-colour set.
   * `photography` — cropped from a supplied product photograph.
   */
  origin: "reference" | "photography";
};

/**
 * Order follows the supplied set, with black last because it comes from a
 * different source and is the colour the catalogue lists for most articles.
 */
/*
 * NOT PUBLISHED. Retained, not deleted — these are client-supplied assets and
 * may well be the current range's colours.
 *
 * The range is offered in black, red, green, yellow and metal-detectable blue.
 * The supplied blue reference photographs as a slate blue (roughly
 * rgb(75,81,102) at its most saturated point), while the colour the catalogue
 * prints for metal-detectable blue is a bright cyan, rgb(0,185,242).
 * Photography under studio light darkens and shifts a colour, so the two are
 * not necessarily different handles — but they are not demonstrably the same
 * one either, and labelling this swatch "metal-detectable blue" would assert
 * a food-safety property from a photograph.
 *
 * The handles page therefore names the five colours in text, which the
 * catalogue supports outright, and shows no swatch. Publish this chart once
 * the client confirms which handle the blue reference is.
 */
export const handleColourReferences: HandleColourReference[] = [
  {
    name: "Red",
    key: "red",
    image: handleRed,
    alt: "A red moulded knife handle, photographed upright against black, with the Morakniv name embossed in the grip.",
    origin: "reference",
  },
  {
    name: "Blue",
    key: "blue",
    image: handleBlue,
    alt: "A slate blue moulded knife handle, photographed upright against black, with the Morakniv name embossed in the grip.",
    origin: "reference",
  },
  {
    name: "Green",
    key: "green",
    image: handleGreen,
    alt: "A green moulded knife handle, photographed upright against black, with the Morakniv name embossed in the grip.",
    origin: "reference",
  },
  {
    name: "Yellow",
    key: "yellow",
    image: handleYellow,
    alt: "A yellow moulded knife handle, photographed upright against black, with the Morakniv name embossed in the grip.",
    origin: "reference",
  },
  {
    name: "Black",
    key: "black",
    image: handleBlack,
    alt: "A black moulded knife handle with a textured surface, shown upright against black.",
    origin: "photography",
  },
];

export type StiffnessMark = {
  /** Slug matching the `BladeStiffness` union in lib/products/types. */
  key: "stiff" | "medium-flex" | "flex" | "extra-flex";
  /** The abbreviation printed on the mark itself. */
  code: string;
  image: StaticImageData;
  alt: string;
};

/** Ordered stiffest to most flexible, as the catalogue orders them. */
export const stiffnessMarks: StiffnessMark[] = [
  {
    key: "stiff",
    code: "S",
    image: markStiff,
    alt: "The manufacturer's stiff blade mark: the letter S above the word STIFF, beside a straight, tapering blade silhouette.",
  },
  {
    key: "medium-flex",
    code: "MF",
    image: markMediumFlex,
    alt: "The manufacturer's medium flex mark: the letters MF above the words MEDIUM FLEX, beside a slightly bowed blade silhouette.",
  },
  {
    key: "flex",
    code: "F",
    image: markFlex,
    alt: "The manufacturer's flex mark: the letter F above the word FLEX, beside a clearly curved blade silhouette.",
  },
  {
    key: "extra-flex",
    code: "XF",
    image: markExtraFlex,
    alt: "The manufacturer's extra flex mark: the letters XF above the words EXTRA FLEX, beside a strongly hooked blade silhouette.",
  },
];

/** Look up a mark by its grade key. */
export function getStiffnessMark(key: StiffnessMark["key"]) {
  return stiffnessMarks.find((mark) => mark.key === key);
}
