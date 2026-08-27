import type { StaticImageData } from "next/image";

import type { CategorySlug } from "@/lib/products/types";

import boningAnatomy from "@/public/images/catalogue/boning-knives-anatomy.webp";
import boningBladeTypes from "@/public/images/catalogue/boning-knives-blade-types.webp";
import boningHandleTypes from "@/public/images/catalogue/boning-knives-handle-types.webp";
import boningHero from "@/public/images/catalogue/boning-knives-hero.webp";
import butcherAnatomy from "@/public/images/catalogue/butcher-knives-anatomy.webp";
import butcherBladeTypes from "@/public/images/catalogue/butcher-knives-blade-types.webp";
import butcherHandleTypes from "@/public/images/catalogue/butcher-knives-handle-types.webp";
import butcherHero from "@/public/images/catalogue/butcher-knives-hero.webp";
import chefsAnatomy from "@/public/images/catalogue/chefs-knives-anatomy.webp";
import chefsBladeTypes from "@/public/images/catalogue/chefs-knives-blade-types.webp";
import chefsHandleTypes from "@/public/images/catalogue/chefs-knives-handle-types.webp";
import classicRange from "@/public/images/catalogue/classic-1891-range.webp";
import filletingAnatomy from "@/public/images/catalogue/filleting-knives-anatomy.webp";
import filletingBladeTypes from "@/public/images/catalogue/filleting-knives-blade-types.webp";
import filletingHandleTypes from "@/public/images/catalogue/filleting-knives-handle-types.webp";
import sharpenersSteel from "@/public/images/catalogue/sharpeners-steel.webp";
import sharpenersTechnique from "@/public/images/catalogue/sharpeners-technique.webp";
import specialDetail from "@/public/images/catalogue/special-knives-detail.webp";
import specialHero from "@/public/images/catalogue/special-knives-hero.webp";
import trimmingAnatomy from "@/public/images/catalogue/trimming-knives-anatomy.webp";
import trimmingBladeTypes from "@/public/images/catalogue/trimming-knives-blade-types.webp";
import trimmingHandleTypes from "@/public/images/catalogue/trimming-knives-handle-types.webp";

/**
 * CATEGORY-LEVEL CATALOGUE IMAGERY
 *
 * Every image below is a crop of a page in the supplied 2026 catalogue,
 * rendered at 300 dpi, trimmed of surrounding white space and re-encoded as
 * WebP. `page` is the printed page number the crop was taken from, so any
 * visual on the site can be checked against the PDF in `public/documents/`.
 *
 * SCOPE RULE — read before adding anything here.
 * These are CATEGORY visuals, not product photographs. The catalogue's images
 * are not reliably mapped one-to-one to article numbers: a section opens with
 * one representative knife and a grid of blade or handle types, none of which
 * carry an article number. Nothing in this file may therefore be attached to a
 * `Product` record or used to satisfy `ProductImageFrame`, which continues to
 * show its "image pending" state until per-SKU photography is supplied. Alt
 * text and captions describe what a visual shows, never which SKU it is.
 *
 * `fit` distinguishes the two kinds of source material: `cover` for the
 * photographs, which are meant to fill their frame, and `contain` for the
 * line-art and product figures, which sit on white and must not be cropped.
 */
export type CatalogueVisual = {
  image: StaticImageData;
  /** Rendered with the figure, above the caption. */
  label: string;
  /** Sentence describing what the visual shows. Not a SKU claim. */
  caption: string;
  alt: string;
  /** Printed page in the 2026 catalogue. */
  page: number;
  fit: "cover" | "contain";
};

export type CategoryVisuals = {
  /** Large visual under the page header. */
  hero: CatalogueVisual;
  /** Supporting figures — blade types, handle types, feature callouts. */
  figures: CatalogueVisual[];
};

const CATALOGUE = "Morakniv Professional Food Industry Knives 2026";

/** Full source line for a visual, e.g. for a figure caption. */
export function visualSource(visual: CatalogueVisual) {
  return `${CATALOGUE}, p.${visual.page}`;
}

export const categoryVisuals: Partial<Record<CategorySlug, CategoryVisuals>> = {
  "boning-knives": {
    hero: {
      image: boningHero,
      label: "In the plant",
      caption:
        "Boning work in a meat processing plant, photographed for the boning knife section of the catalogue.",
      alt: "A worker in protective apron, hairnet and chain-mail glove boning meat beside a carcass in a processing plant.",
      page: 25,
      fit: "cover",
    },
    figures: [
      {
        image: boningAnatomy,
        label: "Knife features",
        caption:
          "The features the manufacturer calls out on a boning knife: fingerguard, handle grip and the seamless blade-to-handle connection.",
        alt: "A curved boning knife with labelled callouts for the seamless blade and handle connection, slip-resistant microstructure, soft feel, safe defined fingerguard and multi performance handle.",
        page: 24,
        fit: "contain",
      },
      {
        image: boningBladeTypes,
        label: "Blade types",
        caption:
          "The eight boning blade profiles named in the catalogue, from curved wide through to straight narrow.",
        alt: "Eight boning knife blade profiles side by side, labelled curved wide, straight, wide, curved, straight wide, straight narrow and curved narrow boning knife.",
        page: 24,
        fit: "contain",
      },
      {
        image: boningHandleTypes,
        label: "Handle types",
        caption:
          "The six handle types offered across the boning range.",
        alt: "Six knife handle types labelled Uni-Grip, Pro-Grip, G-Grip, RMH-Grip, Ergo-Grip ER and Ergo-Grip E.",
        page: 25,
        fit: "contain",
      },
    ],
  },

  "butcher-knives": {
    hero: {
      image: butcherHero,
      label: "In the plant",
      caption:
        "Photographed for the butcher knife section of the catalogue.",
      alt: "A smiling worker in a hard hat and ear defenders at work in a meat processing plant, photographed in black and white.",
      page: 29,
      fit: "cover",
    },
    figures: [
      {
        image: butcherAnatomy,
        label: "Knife features",
        caption:
          "The features the manufacturer calls out on a butcher knife.",
        alt: "A wide butcher knife with labelled callouts for the seamless blade and handle connection, soft feel, slip-resistant microstructure, safe defined fingerguard and multi performance handle.",
        page: 28,
        fit: "contain",
      },
      {
        image: butcherBladeTypes,
        label: "Blade profile",
        caption:
          "The blade profile shown under the catalogue's blade types heading for this section.",
        alt: "A wide, straight-backed butcher knife blade with a curved edge, shown in profile.",
        page: 28,
        fit: "contain",
      },
      {
        image: butcherHandleTypes,
        label: "Handle types",
        caption: "The two handle types offered across the butcher range.",
        alt: "Two knife handle types labelled Uni-Grip and G-Grip.",
        page: 29,
        fit: "contain",
      },
    ],
  },

  "filleting-knives": {
    hero: {
      image: filletingAnatomy,
      label: "Knife features",
      caption:
        "The features the manufacturer calls out on a filleting knife.",
      alt: "A long, thin filleting knife with labelled callouts for the seamless blade and handle connection, soft feel, slip-resistant microstructure, safe defined fingerguard and multi performance handle.",
      page: 30,
      fit: "contain",
    },
    figures: [
      {
        image: filletingBladeTypes,
        label: "Blade profile",
        caption:
          "The blade profile shown under the catalogue's blade types heading for this section.",
        alt: "A long, narrow filleting knife blade curving to a fine point, shown in profile.",
        page: 30,
        fit: "contain",
      },
      {
        image: filletingHandleTypes,
        label: "Handle types",
        caption: "The three handle types offered across the filleting range.",
        alt: "Three knife handle types labelled Uni-Grip, Pro-Grip and P-Grip.",
        page: 31,
        fit: "contain",
      },
    ],
  },

  "trimming-knives": {
    hero: {
      image: trimmingAnatomy,
      label: "Knife features",
      caption: "The features the manufacturer calls out on a trimming knife.",
      alt: "A curved trimming knife with labelled callouts for the slip-resistant microstructure, seamless blade and handle connection, soft feel, safe defined fingerguard and multi performance handle.",
      page: 32,
      fit: "contain",
    },
    figures: [
      {
        image: trimmingBladeTypes,
        label: "Blade profile",
        caption:
          "The blade profile shown under the catalogue's blade types heading for this section.",
        alt: "A steeply curved trimming knife blade with a blue handle, shown in profile.",
        page: 32,
        fit: "contain",
      },
      {
        image: trimmingHandleTypes,
        label: "Handle types",
        caption: "The five handle types offered across the trimming range.",
        alt: "Five knife handle types labelled Uni-Grip, P-Grip, PS-Grip, RMH-Grip and Ergo-Grip.",
        page: 33,
        fit: "contain",
      },
    ],
  },

  "chefs-knives": {
    hero: {
      image: chefsAnatomy,
      label: "Knife features",
      caption: "The features the manufacturer calls out on a chef's knife.",
      alt: "A broad chef's knife with labelled callouts for the seamless blade and handle connection, slip-resistant microstructure, safe defined fingerguard, soft feel and multi performance handle.",
      page: 34,
      fit: "contain",
    },
    figures: [
      {
        image: chefsBladeTypes,
        label: "Blade profile",
        caption:
          "The blade profile shown under the catalogue's blade types heading for this section.",
        alt: "A broad chef's knife blade tapering to a point, shown in profile.",
        page: 34,
        fit: "contain",
      },
      {
        image: chefsHandleTypes,
        label: "Handle types",
        caption: "The three handle types offered across the chef's range.",
        alt: "Three knife handle types labelled Uni-Grip, P-Grip and AM-Grip.",
        page: 35,
        fit: "contain",
      },
    ],
  },

  sharpeners: {
    hero: {
      image: sharpenersSteel,
      label: "Sharpening steel",
      caption:
        "A sharpening steel with hanging ring, as shown at the head of the sharpener section.",
      alt: "A sharpening steel with a black handle, hanging ring and long round rod, shown horizontally.",
      page: 36,
      fit: "contain",
    },
    figures: [
      {
        image: sharpenersTechnique,
        label: "Using the steel",
        caption:
          "How the manufacturer describes edge alignment: a bent edge before, a centred edge after, and the 15–20° angle to hold against the steel.",
        alt: "Three diagrams: a knife edge bent to one side before sharpening, the same edge realigned centrally after sharpening, and a knife held against a sharpening steel at a 15 to 20 degree angle.",
        page: 37,
        fit: "contain",
      },
    ],
  },

  "special-knives": {
    hero: {
      image: specialHero,
      label: "The range",
      caption:
        "Blade shapes from across the special knife section, photographed for the catalogue.",
      alt: "Several knives with differing blade shapes and handle colours arranged on a dark grey surface.",
      page: 39,
      fit: "cover",
    },
    figures: [
      {
        image: specialDetail,
        label: "Knife and sheath",
        caption:
          "A knife and its matching belt sheath, shown at the head of the special knife section.",
        alt: "A knife with a blue moulded handle and angled blade, shown above a black belt sheath with a clip.",
        page: 38,
        fit: "contain",
      },
    ],
  },

  "classic-1891": {
    hero: {
      image: classicRange,
      label: "The collection",
      caption:
        "The five knife types in the Classic 1891 collection, each with the red-stained Swedish birch handle.",
      alt: "Five kitchen knives with red-stained birch handles, labelled paring knife, utility knife, chef's knife, filleting knife and bread knife.",
      page: 40,
      fit: "contain",
    },
    figures: [],
  },
};

/** Visuals for a category, or `undefined` where none have been extracted. */
export function getCategoryVisuals(slug: string): CategoryVisuals | undefined {
  return categoryVisuals[slug as CategorySlug];
}
