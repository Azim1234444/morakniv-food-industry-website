import type { StaticImageData } from "next/image";

import type { CategorySlug } from "@/lib/products/types";

import boningBladeTypes from "@/public/images/catalogue/boning-knives-blade-types.webp";
import boningHero from "@/public/images/catalogue/boning-knives-hero.webp";
import butcherBladeTypes from "@/public/images/catalogue/butcher-knives-blade-types.webp";
import butcherHero from "@/public/images/catalogue/butcher-knives-hero.webp";
import chefsBladeTypes from "@/public/images/catalogue/chefs-knives-blade-types.webp";
import filletingBladeTypes from "@/public/images/catalogue/filleting-knives-blade-types.webp";

/**
 * CATEGORY-LEVEL IMAGERY
 *
 * SCOPE RULE — read before adding anything here.
 * These are CATEGORY visuals, not product photographs. Nothing here carries an
 * article number, so nothing here may be attached to a `Product` record or
 * routed into `ProductImageFrame`. Model photography lives in
 * `lib/images/pug-models.ts` and is keyed by model code; the two must not be
 * mixed. Alt text and captions describe what a visual shows, never which SKU
 * it is.
 *
 * WHAT WAS REMOVED WHEN THE RANGE MOVED TO PUG, AND WHY.
 * This file previously held twenty-two crops. Each was reviewed against the
 * current range rather than judged by filename, and fifteen were withdrawn:
 *
 *   - Every "handle types" figure. They are labelled grids of Uni-Grip,
 *     Pro-Grip, G-Grip, RMH-Grip, Ergo-Grip, P-Grip, PS-Grip and AM-Grip —
 *     handle families no current article uses.
 *   - Every "knife features" anatomy diagram. Their callouts describe the
 *     older handle: "soft feel", "multi performance handle". The PUG handle is
 *     hard glass-fibre reinforced polypropylene, so those callouts would be
 *     false claims about the current range, not merely dated ones.
 *   - The trimming blade profile and the special-knives visuals, which show
 *     plain blue and mixed handle colours. The current range has no plain
 *     blue; its blue is metal-detectable and a different thing.
 *   - The sharpener and Classic 1891 visuals, whose categories are not part of
 *     the current range.
 *
 * What remains is generic and still factually applicable: two photographs of
 * work in a processing plant, which assert nothing about a product, and four
 * blade-profile figures, which show blade geometry the PUG range still offers.
 *
 * The PUG catalogue itself supplies no category-level imagery to replace these
 * with — it is model page after model page, with no section openers — so none
 * was invented. `page` refers to the source catalogue page for each crop.
 *
 * `fit` distinguishes the two kinds of source material: `cover` for the
 * photographs, which are meant to fill their frame, and `contain` for the
 * line-art and product figures, which sit on white and must not be cropped.
 */
export type CatalogueVisual = {
  image: StaticImageData;
  /** Short heading shown above the figure. */
  label: string;
  /** One line describing what the visual shows. */
  caption: string;
  alt: string;
  /** Page in the source catalogue the crop was taken from. */
  page: number;
  fit: "cover" | "contain";
};

export type CategoryVisuals = {
  /** Optional: only two categories still have a usable lead photograph. */
  hero?: CatalogueVisual;
  figures: CatalogueVisual[];
};

const categoryVisuals: Partial<Record<CategorySlug, CategoryVisuals>> = {
  "boning-knives": {
    hero: {
      image: boningHero,
      label: "In the plant",
      caption: "Boning work in a meat processing plant.",
      alt: "A worker in protective apron, hairnet and chain-mail glove boning meat beside a carcass in a processing plant.",
      page: 25,
      fit: "cover",
    },
    figures: [
      {
        image: boningBladeTypes,
        label: "Blade types",
        caption:
          "Eight boning blade profiles, from curved wide through to straight narrow.",
        alt: "Eight boning knife blade profiles side by side, labelled curved wide, straight, wide, curved, straight wide, straight narrow and curved narrow boning knife.",
        page: 24,
        fit: "contain",
      },
    ],
  },

  "butcher-knives": {
    hero: {
      image: butcherHero,
      label: "In the plant",
      caption: "Work in a meat processing plant.",
      alt: "A smiling worker in a hard hat and ear defenders at work in a meat processing plant, photographed in black and white.",
      page: 29,
      fit: "cover",
    },
    figures: [
      {
        image: butcherBladeTypes,
        label: "Blade profile",
        caption: "The butcher blade profile.",
        alt: "A wide, straight-backed butcher knife blade with a curved edge, shown in profile.",
        page: 28,
        fit: "contain",
      },
    ],
  },

  "filleting-knives": {
    figures: [
      {
        image: filletingBladeTypes,
        label: "Blade profile",
        caption: "The filleting blade profile.",
        alt: "A long, narrow filleting knife blade curving to a fine point, shown in profile.",
        page: 30,
        fit: "contain",
      },
    ],
  },

  "chefs-knives": {
    figures: [
      {
        image: chefsBladeTypes,
        label: "Blade profile",
        caption: "The chef's knife blade profile.",
        alt: "A broad chef's knife blade tapering to a point, shown in profile.",
        page: 34,
        fit: "contain",
      },
    ],
  },
};

export function getCategoryVisuals(slug: string): CategoryVisuals | undefined {
  return categoryVisuals[slug as CategorySlug];
}
