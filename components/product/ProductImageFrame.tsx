import Image from "next/image";

import type { ResolvedModelImage } from "@/lib/images/model-image";
import type { ProductImage } from "@/lib/products/types";

type ProductImageFrameProps = {
  images: ProductImage[];
  productName: string;
  sizes: string;
  priority?: boolean;
  /** Larger placeholder treatment for the detail page. */
  size?: "card" | "detail";
  /**
   * The catalogue photograph representing this model — its own, or the one
   * printed above its family's table. Used only when the article has no
   * photography of its own. Already carries the alt text its provenance
   * requires; see `lib/images/model-image.ts`.
   */
  modelImage?: ResolvedModelImage;
};

/**
 * Renders product imagery when it exists, and an honest placeholder when it
 * does not.
 *
 * THREE LEVELS, IN ORDER OF PRECEDENCE.
 *   1. `images` — photography of this exact article. None has been supplied.
 *   2. `modelImage` — the catalogue photograph representing the model, which
 *      is either its own or the one printed above its family's shared table.
 *      One model spans up to five colour variants and every catalogue
 *      photograph shows the black handle, so this is never described as a
 *      picture of a specific colour; a borrowed family photograph additionally
 *      names the model it shows. Both disclosures ride in the alt text and are
 *      printed by the caller — this component only draws the frame.
 *   3. The pending state. Every current PUG model resolves at level 2, so
 *      nothing reaches it today; it stays because coverage is a fact about
 *      the data, not a guarantee of the component.
 *
 * The category visuals in `lib/images/catalogue.ts` do NOT qualify at any
 * level. They are section-level figures carrying no model code and no article
 * number, and must stay on the category pages.
 */
export function ProductImageFrame({
  images,
  productName,
  sizes,
  priority = false,
  size = "card",
  modelImage,
}: ProductImageFrameProps) {
  const primary = images.find((image) => image.isPrimary) ?? images[0];

  if (primary) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt">
        <Image
          src={primary.src}
          alt={primary.alt}
          fill
          priority={priority}
          quality={85}
          sizes={sizes}
          className="object-contain"
        />
      </div>
    );
  }

  if (modelImage) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt">
        <Image
          src={modelImage.image}
          alt={modelImage.alt}
          fill
          priority={priority}
          quality={85}
          placeholder="blur"
          sizes={sizes}
          className="object-contain p-3"
        />
      </div>
    );
  }

  return (
    <div
      className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-surface-alt"
      role="img"
      aria-label={`No product photograph available for ${productName}. Imagery is pending.`}
    >
      {/* Quiet diagonal hatch — a texture, not a fake product. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--color-line) 0 1px, transparent 1px 11px)",
        }}
      />

      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={`${size === "detail" ? "h-7 w-7" : "h-5 w-5"} text-line-strong`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          <rect x="3" y="5" width="18" height="14" strokeLinejoin="round" />
          <path d="m3 16 5-4 4 3 3-2 6 4" strokeLinejoin="round" />
        </svg>
        <span
          className={`label-eyebrow text-ink-subtle ${
            size === "detail" ? "" : "text-[0.625rem]"
          }`}
        >
          Image pending
        </span>
      </div>
    </div>
  );
}
