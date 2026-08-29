import { COLOR_LABELS } from "@/lib/products";
import type { HandleColor } from "@/lib/products/types";

/**
 * The five PUG handle colours as they are printed in the catalogue's COLOR
 * column: a filled circle per article.
 *
 * Metal-detectable blue is drawn in the catalogue's own cyan rather than a
 * generic blue, because it is a distinct food-safety product and must not read
 * as "the blue one". Black gets the same hairline ring as every other swatch so
 * it stays visible against a dark surface.
 *
 * A swatch is always decorative here — `aria-hidden` — because every caller
 * puts the colour name in text beside it. Colour is never the only channel.
 */
const SWATCH_CLASS: Record<HandleColor, string> = {
  black: "bg-[#1a1a1a]",
  yellow: "bg-[#f2d024]",
  red: "bg-[#c81e1e]",
  green: "bg-[#3fa83f]",
  "metal-detectable-blue": "bg-[#22b8d0]",
};

type ColorSwatchProps = {
  color: HandleColor;
  size?: "sm" | "md";
  className?: string;
};

export function ColorSwatch({
  color,
  size = "sm",
  className = "",
}: ColorSwatchProps) {
  return (
    <span
      aria-hidden="true"
      title={COLOR_LABELS[color]}
      className={`inline-block shrink-0 rounded-full ring-1 ring-line-strong ring-inset ${
        size === "sm" ? "h-2.5 w-2.5" : "h-3.5 w-3.5"
      } ${SWATCH_CLASS[color]} ${className}`}
    />
  );
}
