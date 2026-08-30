import Link from "next/link";

import { ColorSwatch } from "@/components/product/ColorSwatch";
import { ProductImageFrame } from "@/components/product/ProductImageFrame";
import { resolveModelImage } from "@/lib/images/model-image";
import { STIFFNESS_LABELS } from "@/lib/products";
import { categoryBySlug } from "@/lib/products/categories";
import type { Product } from "@/lib/products/types";

type ProductCardProps = {
  product: Product;
  /** Show the category name — useful on mixed listings such as search. */
  showCategory?: boolean;
  /**
   * Article number the visitor's search matched.
   *
   * Cards never list article numbers: five per card turns a 22-model category
   * into a wall of digits, and the swatch row carries the same information. The
   * single exception is a search that matched one — then the card has to say
   * which, or the result looks arbitrary. The link carries it too, so the model
   * page opens with that variant already selected.
   */
  matchedArticleNo?: string;
};

export function ProductCard({
  product,
  showCategory = false,
  matchedArticleNo,
}: ProductCardProps) {
  const category = categoryBySlug.get(product.category);
  const modelImage = resolveModelImage(product);
  const colors = [...new Set(product.variants.map((variant) => variant.color))];

  const href = matchedArticleNo
    ? `/products/${product.category}/${product.slug}?article=${encodeURIComponent(matchedArticleNo)}`
    : `/products/${product.category}/${product.slug}`;

  return (
    <article className="group relative flex h-full flex-col border border-line bg-surface transition-colors duration-150 hover:border-ink-subtle focus-within:border-ink">
      <div className="relative">
        <ProductImageFrame
          images={product.images}
          productName={product.name}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          modelImage={modelImage}
        />
        {/* Ten models show the photograph printed above their family's
            catalogue table rather than one of their own. The badge flags those
            and nothing else: a model photographed in its own right needs no
            label, and a badge on every card was noise rather than information.

            A card has no room for the full attribution, so this is a flag —
            the alt text carries the detail here, and the model page prints the
            short caption under the frame. */}
        {modelImage?.family && product.images.length === 0 && (
          <span className="absolute top-2 left-2 bg-surface/90 px-2 py-1 text-[0.625rem] tracking-wide text-ink-subtle uppercase">
            Representative image
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-xs tracking-wide text-brand tabular-nums">
          {product.modelCode}
        </p>

        <h3 className="mt-2 text-[0.9375rem] leading-snug font-medium text-ink">
          <Link href={href} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>

        {showCategory && category && (
          <p className="mt-1.5 text-xs text-ink-subtle">{category.name}</p>
        )}

        <div className="mt-auto pt-5">
          {product.dataStatus === "needs-verification" ? (
            <p className="flex items-center gap-2 text-xs text-ink-subtle">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-line-strong"
              />
              Specifications pending
            </p>
          ) : (
            <>
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-muted">
                {product.dimension && (
                  <span className="tabular-nums">
                    {product.dimension.printed}
                  </span>
                )}
                {product.blade?.stiffness && (
                  <span>{STIFFNESS_LABELS[product.blade.stiffness]}</span>
                )}
                {product.nsfApproved && <span className="text-brand">NSF</span>}
              </p>

              {/* Swatches plus a count, never the article numbers themselves.
                  The count is the text channel for the swatch row, so colour
                  is not carrying the information on its own. */}
              <p className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1.5">
                <span aria-hidden="true" className="flex items-center gap-1">
                  {colors.map((color) => (
                    <ColorSwatch key={color} color={color} />
                  ))}
                </span>
                <span className="text-xs text-ink-subtle">
                  {colors.length === 1
                    ? "1 colour"
                    : `${colors.length} colours`}
                </span>
              </p>

              {matchedArticleNo && (
                <p className="mt-2 text-xs text-ink-muted">
                  Matched article{" "}
                  <span className="font-mono text-ink tabular-nums">
                    {matchedArticleNo}
                  </span>
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
}
