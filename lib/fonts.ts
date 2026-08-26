import localFont from "next/font/local";

/**
 * Brandon Grotesque — HVD Fonts.
 *
 * Supplied by the client as a webfont kit. Only the `.woff2` files are wired
 * up: the kit's `.woff` and `.eot` files are redundant against Next.js 16's
 * browser baseline (Chrome/Edge/Firefox 111+, Safari 16.4+).
 *
 * All six weights ship with a matching italic, so the family is declared as a
 * single `font-family` with real weight/style descriptors rather than the
 * twelve separate families the vendor specimens use.
 */
export const brandonGrotesque = localFont({
  src: [
    { path: "../public/fonts/brandon-grotesque-thin.woff2", weight: "100", style: "normal" },
    { path: "../public/fonts/brandon-grotesque-thin-italic.woff2", weight: "100", style: "italic" },
    { path: "../public/fonts/brandon-grotesque-light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/brandon-grotesque-light-italic.woff2", weight: "300", style: "italic" },
    { path: "../public/fonts/brandon-grotesque-regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/brandon-grotesque-regular-italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/brandon-grotesque-medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/brandon-grotesque-medium-italic.woff2", weight: "500", style: "italic" },
    { path: "../public/fonts/brandon-grotesque-bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/brandon-grotesque-bold-italic.woff2", weight: "700", style: "italic" },
    { path: "../public/fonts/brandon-grotesque-black.woff2", weight: "900", style: "normal" },
    { path: "../public/fonts/brandon-grotesque-black-italic.woff2", weight: "900", style: "italic" },
  ],
  variable: "--font-brandon",
  display: "swap",
  /**
   * Deliberately off. `preload: true` emits a <link rel="preload"> for every
   * face in the array — all twelve, ~876 KB — on first paint, which wrecks
   * LCP for the sake of weights the page may never render. With this off the
   * @font-face rules are still emitted and the browser fetches only the cuts
   * actually used, while `display: swap` keeps text visible meanwhile.
   */
  preload: false,
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "system-ui", "sans-serif"],
});
