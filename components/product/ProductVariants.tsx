"use client";

import { useId } from "react";

import { ColorSwatch } from "@/components/product/ColorSwatch";
import {
  selectVariantInUrl,
  useSelectedVariant,
} from "@/components/product/useSelectedVariant";
import { Button } from "@/components/ui/Button";
import { COLOR_LABELS } from "@/lib/products";
import { getDefaultVariant } from "@/lib/products/types";
import type { Product } from "@/lib/products/types";

type ProductVariantsProps = {
  product: Product;
};

function enquiryHref(articleNo: string) {
  return `/contact?product=${encodeURIComponent(articleNo)}`;
}

/**
 * Colour / article-number selector, and the enquiry call to action that
 * follows it.
 *
 * WHY THESE TWO THINGS ARE ONE COMPONENT.
 * The button quotes the selected article number, so it has to move with the
 * selection. Everything else on the page — name, dimension, model code, flex
 * grade, handle — is model-level and deliberately stays outside this island, so
 * it cannot change when a colour is picked.
 *
 * WHY NATIVE RADIOS.
 * Real `input[type=radio]` elements give arrow-key navigation, roving focus and
 * form semantics for nothing. Each label names the colour and its article
 * number in text, so the selection never depends on seeing a swatch; the
 * swatch is `aria-hidden` decoration beside the words.
 *
 * The list is the model's own variants, so no colour that the catalogue does
 * not print for this model can be reached.
 */
export function ProductVariants({ product }: ProductVariantsProps) {
  const selected = useSelectedVariant(product);
  const groupName = useId();

  const single = product.variants.length === 1;

  return (
    <div>
      <h2 className="label-eyebrow text-ink-subtle">
        {single ? "Article number" : "Colour and article number"}
      </h2>

      {single ? (
        <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border border-line bg-surface-alt px-5 py-4">
          <ColorSwatch color={selected.color} size="md" />
          <span className="text-sm text-ink-muted">
            {COLOR_LABELS[selected.color]}
          </span>
          <span className="ml-auto shrink-0 font-mono text-base font-medium text-ink tabular-nums">
            {selected.articleNo}
          </span>
        </p>
      ) : (
        <fieldset className="mt-5">
          <legend className="sr-only">
            Select a colour for {product.name} {product.modelCode}
          </legend>

          <div className="flex flex-col gap-2">
            {product.variants.map((variant) => {
              const isSelected = variant.articleNo === selected.articleNo;

              return (
                <label
                  key={variant.articleNo}
                  className={`flex cursor-pointer flex-wrap items-center gap-x-3 gap-y-1 border px-4 py-3 transition-colors duration-150 focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-2 ${
                    isSelected
                      ? "border-brand bg-surface-alt"
                      : "border-line bg-surface hover:border-ink-subtle"
                  }`}
                >
                  <input
                    type="radio"
                    name={groupName}
                    value={variant.articleNo}
                    checked={isSelected}
                    onChange={() => selectVariantInUrl(variant.articleNo)}
                    aria-label={`${COLOR_LABELS[variant.color]} — Article Number ${variant.articleNo}`}
                    className="sr-only"
                  />

                  <ColorSwatch color={variant.color} size="md" />

                  <span
                    className={`min-w-0 text-sm ${isSelected ? "font-medium text-ink" : "text-ink-muted"}`}
                  >
                    {COLOR_LABELS[variant.color]}
                  </span>

                  {/* Text, not just the border colour, carries the selected
                      state — colour alone must never be the signal. */}
                  {isSelected && (
                    <span className="label-eyebrow text-[0.625rem] text-brand">
                      Selected
                    </span>
                  )}

                  <span className="ml-auto shrink-0 font-mono text-sm font-medium text-ink tabular-nums">
                    {variant.articleNo}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <EnquiryCta articleNo={selected.articleNo} category={product.category} />
    </div>
  );
}

/**
 * The enquiry block, shared by the live selector and its prerender fallback.
 *
 * Sharing it matters: the fallback is what ships in the static HTML, so if only
 * the client component rendered the button, a visitor without JavaScript — and
 * every crawler — would see a product page with no way to enquire.
 */
function EnquiryCta({
  articleNo,
  category,
}: {
  articleNo: string;
  category: string;
}) {
  return (
    <div className="mt-8 border-t border-line pt-8">
      <h2 className="text-lg font-medium text-ink">
        Enquire about this knife
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
        Send us the article number with your volumes and intended tasks, and we
        will come back with a recommendation. Pricing, stock and lead times are
        not published on this site.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button href={enquiryHref(articleNo)} className="w-full sm:w-auto">
          Enquire about {articleNo}
        </Button>
        <Button
          href={`/products/${category}`}
          variant="secondary"
          className="w-full sm:w-auto"
        >
          Back to category
        </Button>
      </div>
    </div>
  );
}

/**
 * Server-rendered stand-in shown while the selector hydrates.
 *
 * It renders the default variant, which is what an unparameterised URL
 * resolves to anyway, so the prerendered HTML and the first client render
 * agree for every visitor who did not arrive with `?article=`.
 */
export function ProductVariantsFallback({ product }: ProductVariantsProps) {
  const fallback = getDefaultVariant(product);

  return (
    <div>
      <h2 className="label-eyebrow text-ink-subtle">
        {product.variants.length === 1
          ? "Article number"
          : "Colour and article number"}
      </h2>
      <div className="mt-5 flex flex-col gap-2">
        {product.variants.map((variant) => (
          <p
            key={variant.articleNo}
            className={`flex flex-wrap items-center gap-x-3 gap-y-1 border px-4 py-3 ${
              variant.articleNo === fallback.articleNo
                ? "border-brand bg-surface-alt"
                : "border-line bg-surface"
            }`}
          >
            <ColorSwatch color={variant.color} size="md" />
            <span className="min-w-0 text-sm text-ink-muted">
              {COLOR_LABELS[variant.color]}
            </span>
            <span className="ml-auto shrink-0 font-mono text-sm font-medium text-ink tabular-nums">
              {variant.articleNo}
            </span>
          </p>
        ))}
      </div>

      <EnquiryCta
        articleNo={fallback.articleNo}
        category={product.category}
      />
    </div>
  );
}
