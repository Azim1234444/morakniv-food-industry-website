import type { StaticImageData } from "next/image";

import imgBR9 from "@/public/images/products/pug/br9-pug.webp";
import imgCB5S from "@/public/images/products/pug/cb5s-pug.webp";
import imgCB6S from "@/public/images/products/pug/cb6s-pug.webp";
import imgCF7F from "@/public/images/products/pug/cf7f-pug.webp";
import imgCH10 from "@/public/images/products/pug/ch10-pug.webp";
import imgCH5 from "@/public/images/products/pug/ch5-pug.webp";
import imgCH7 from "@/public/images/products/pug/ch7-pug.webp";
import imgCH8 from "@/public/images/products/pug/ch8-pug.webp";
import imgCS5 from "@/public/images/products/pug/cs5-pug.webp";
import imgCS6 from "@/public/images/products/pug/cs6-pug.webp";
import imgCT10 from "@/public/images/products/pug/ct10-pug.webp";
import imgCT8 from "@/public/images/products/pug/ct8-pug.webp";
import imgFL6 from "@/public/images/products/pug/fl6-pug.webp";
import imgFL8 from "@/public/images/products/pug/fl8-pug.webp";
import imgLS5 from "@/public/images/products/pug/ls5-pug.webp";
import imgLS5BT from "@/public/images/products/pug/ls5bt-pug.webp";
import imgNCB5MF from "@/public/images/products/pug/ncb5mf-pug.webp";
import imgSB4MF from "@/public/images/products/pug/sb4mf-pug.webp";
import imgSB5S from "@/public/images/products/pug/sb5s-pug.webp";
import imgSB6F from "@/public/images/products/pug/sb6f-pug.webp";
import imgSBK5 from "@/public/images/products/pug/sbk5-pug.webp";
import imgSBK6 from "@/public/images/products/pug/sbk6-pug.webp";
import imgSF7F from "@/public/images/products/pug/sf7f-pug.webp";
import imgSF8F from "@/public/images/products/pug/sf8f-pug.webp";
import imgSFN6F from "@/public/images/products/pug/sfn6f-pug.webp";
import imgSH8 from "@/public/images/products/pug/sh8-pug.webp";
import imgSL12 from "@/public/images/products/pug/sl12-pug.webp";
import imgUCB5MFSC from "@/public/images/products/pug/ucb5mfsc-pug.webp";
import imgWB5S from "@/public/images/products/pug/wb5s-pug.webp";
import imgWB6S from "@/public/images/products/pug/wb6s-pug.webp";
import imgWCB6MF from "@/public/images/products/pug/wcb6mf-pug.webp";
import imgWCB6MFSC from "@/public/images/products/pug/wcb6mfsc-pug.webp";
import imgWSB6S from "@/public/images/products/pug/wsb6s-pug.webp";
import imgWSB7S from "@/public/images/products/pug/wsb7s-pug.webp";
import imgWSF8MF from "@/public/images/products/pug/wsf8mf-pug.webp";

/**
 * MODEL-LEVEL PRODUCT IMAGERY — PUG range.
 *
 * Each image is the product photograph printed beside a model in the PUG
 * catalogue, extracted at source resolution, trimmed of its transparent
 * margin and re-encoded as WebP. `page` is the catalogue page the photograph
 * was taken from.
 *
 * ATTRIBUTION IS BY BLADE ETCHING, NOT BY PAGE.
 * Six catalogue pages carry more than one model — a single blade geometry
 * offered in two or three flex grades. Each photograph on those pages shows
 * one physical knife, and that knife's blade is etched with its dimension,
 * its flex grade and its model code, legible at source resolution: page 8
 * reads `5"/133mm STIFF CB5S-PUG`, page 16 reads `6"/160mm FLEX SB6F-PUG`.
 * The photograph is therefore registered against the etched model only.
 * Attaching it to a sibling model would put a blade reading `STIFF` on a Flex
 * product, which is a false specification rather than a representative image.
 * Those siblings keep the pending-image state until their own photography is
 * supplied — ten models and thirty article numbers.
 *
 * WHAT THESE IMAGES ARE NOT.
 *   - They are not per-article photography. One model image covers every
 *     article number of that model, which is up to five colour variants.
 *   - They are not colour-specific. Every photograph shows the black handle,
 *     so the UI must say so wherever the article is supplied in another
 *     colour. Never present one of these as a picture of the yellow, red,
 *     green or metal-detectable blue variant.
 *   - The serial etched on each blade reads `123456-26A`, a sample
 *     placeholder rather than a real serial number, and is never surfaced.
 *
 * The NSF mark visible on some blades is deliberately NOT read as data. The
 * PUG catalogue prints no NSF column, and a mark in a photograph is not a
 * specification the client has stated.
 */
export type ModelImage = {
  image: StaticImageData;
  /** Page in the PUG catalogue the photograph was taken from. */
  page: number;
  alt: string;
};

const modelImages: Record<string, ModelImage> = {
  "BR9-PUG": {
    image: imgBR9,
    page: 37,
    alt: "Bread Knife BR9-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "CB5S-PUG": {
    image: imgCB5S,
    page: 8,
    alt: "Boning Knife Curved CB5S-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "CB6S-PUG": {
    image: imgCB6S,
    page: 11,
    alt: "Boning Knife Curved CB6S-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "CF7F-PUG": {
    image: imgCF7F,
    page: 33,
    alt: "Fillet Knife Curved CF7F-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "CH10-PUG": {
    image: imgCH10,
    page: 42,
    alt: "Chef Knife CH10-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "CH5-PUG": {
    image: imgCH5,
    page: 39,
    alt: "Chef Knife CH5-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "CH7-PUG": {
    image: imgCH7,
    page: 40,
    alt: "Chef Knife CH7-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "CH8-PUG": {
    image: imgCH8,
    page: 41,
    alt: "Chef Knife CH8-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "CS5-PUG": {
    image: imgCS5,
    page: 23,
    alt: "Skinning Knife Curved CS5-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "CS6-PUG": {
    image: imgCS6,
    page: 24,
    alt: "Skinning Knife Curved CS6-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "CT10-PUG": {
    image: imgCT10,
    page: 28,
    alt: "Trimming Knife Curved CT10-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "CT8-PUG": {
    image: imgCT8,
    page: 27,
    alt: "Trimming Knife Curved CT8-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "FL6-PUG": {
    image: imgFL6,
    page: 30,
    alt: "Universal/flank Knife FL6-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "FL8-PUG": {
    image: imgFL8,
    page: 31,
    alt: "Flank Knife FL8-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "LS5-PUG": {
    image: imgLS5,
    page: 21,
    alt: "Skinning Knife Lamb LS5-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "LS5BT-PUG": {
    image: imgLS5BT,
    page: 22,
    alt: "Skinning Knife Lamb Blunt Tip LS5BT-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "NCB5MF-PUG": {
    image: imgNCB5MF,
    page: 9,
    alt: "Boning Knife Narrow Curved NCB5MF-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "SB4MF-PUG": {
    image: imgSB4MF,
    page: 14,
    alt: "Boning Knife Straight SB4MF-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "SB5S-PUG": {
    image: imgSB5S,
    page: 15,
    alt: "Boning Knife Straight SB5S-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "SB6F-PUG": {
    image: imgSB6F,
    page: 16,
    alt: "Boning Knife Straight SB6F-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "SBK5-PUG": {
    image: imgSBK5,
    page: 25,
    alt: "Butcher Knife Scandinavian SBK5-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "SBK6-PUG": {
    image: imgSBK6,
    page: 26,
    alt: "Butcher Knife Scandinavian SBK6-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "SF7F-PUG": {
    image: imgSF7F,
    page: 34,
    alt: "Fillet Knife Straight SF7F-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "SF8F-PUG": {
    image: imgSF8F,
    page: 35,
    alt: "Fillet Knife Straight SF8F-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "SFN6F-PUG": {
    image: imgSFN6F,
    page: 32,
    alt: "Fillet Knife Narrow Curved SFN6F-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "SH8-PUG": {
    image: imgSH8,
    page: 29,
    alt: "Header Knife Straight SH8-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "SL12-PUG": {
    image: imgSL12,
    page: 38,
    alt: "Slicing Knife SL12-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "UCB5MFSC-PUG": {
    image: imgUCB5MFSC,
    page: 10,
    alt: "Boning Knife Upper Curved With Scallop Grind UCB5MFSC-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "WB5S-PUG": {
    image: imgWB5S,
    page: 19,
    alt: "Boning Knife Wide WB5S-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "WB6S-PUG": {
    image: imgWB6S,
    page: 20,
    alt: "Boning Knife Wide WB6S-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "WCB6MF-PUG": {
    image: imgWCB6MF,
    page: 13,
    alt: "Boning Knife Wide Curved WCB6MF-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "WCB6MFSC-PUG": {
    image: imgWCB6MFSC,
    page: 12,
    alt: "Boning Knife Curved With Scallop Grind WCB6MFSC-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "WSB6S-PUG": {
    image: imgWSB6S,
    page: 17,
    alt: "Boning Knife Wide Straight WSB6S-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "WSB7S-PUG": {
    image: imgWSB7S,
    page: 18,
    alt: "Boning Knife Wide Straight WSB7S-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
  "WSF8MF-PUG": {
    image: imgWSF8MF,
    page: 36,
    alt: "Fillet Knife Wide Straight WSF8MF-PUG, a Morakniv food industry knife with a black PUG handle, photographed against a plain background.",
  },
};

/** The model photograph for a model code, when the catalogue supplies one. */
export function getModelImage(modelCode: string | undefined): ModelImage | undefined {
  return modelCode ? modelImages[modelCode] : undefined;
}

/** Model codes that have a photograph. Used by counts and tests. */
export const modelsWithImagery = Object.keys(modelImages);
