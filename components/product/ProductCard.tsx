import Link from "next/link";

import { ProductImageFrame } from "@/components/product/ProductImageFrame";
import { categoryBySlug } from "@/lib/products/categories";
import type { Product } from "@/lib/products/types";

type ProductCardProps = {
  product: Product;
  /** Show the category name — useful on mixed listings such as search. */
  showCategory?: boolean;
};

export function ProductCard({
  product,
  showCategory = false,
}: ProductCardProps) {
  const category = categoryBySlug.get(product.category);
  const href = `/products/${product.category}/${product.slug}`;

  return (
    <article className="group relative flex h-full flex-col border border-line bg-surface transition-colors duration-150 hover:border-ink-subtle focus-within:border-ink">
      <ProductImageFrame
        images={product.images}
        productName={product.name}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
      />

      <div className="flex flex-1 flex-col p-5">
        {product.articleNo ? (
          <p className="font-mono text-xs tracking-wide text-brand tabular-nums">
            {product.articleNo}
          </p>
        ) : (
          <p className="text-xs text-ink-subtle">Article no. pending</p>
        )}

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
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-muted">
              {product.blade?.lengthInch && (
                <span className="tabular-nums">{product.blade.lengthInch}</span>
              )}
              {product.nsfApproved && (
                <span className="text-brand">NSF</span>
              )}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
