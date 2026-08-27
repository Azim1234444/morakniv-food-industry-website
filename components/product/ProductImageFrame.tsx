import Image from "next/image";

import type { ProductImage } from "@/lib/products/types";

type ProductImageFrameProps = {
  images: ProductImage[];
  productName: string;
  sizes: string;
  priority?: boolean;
  /** Larger placeholder treatment for the detail page. */
  size?: "card" | "detail";
};

/**
 * Renders real product imagery when it exists, and an honest placeholder when
 * it does not. No per-SKU product photography has been supplied, so the
 * placeholder states plainly that imagery is pending rather than showing a
 * generic stock knife.
 *
 * The catalogue visuals in `lib/images/catalogue.ts` do NOT qualify. They are
 * section-level figures — one representative knife, a grid of blade or handle
 * types — carrying no article number, so they cannot be mapped to a specific
 * SKU and must stay on the category pages. Nothing may be routed from there
 * into this component; the pending state is the correct answer until real
 * per-article photography arrives.
 */
export function ProductImageFrame({
  images,
  productName,
  sizes,
  priority = false,
  size = "card",
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
