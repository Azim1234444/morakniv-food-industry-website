"use client";

/**
 * Client component: owns the search query and active filter state.
 *
 * RESULTS ARE ALWAYS MODELS.
 * A filter may be evaluated against variant data, but it never returns
 * variants. Returning article numbers would put the same knife on screen five
 * times, which is exactly what the model-level architecture exists to prevent.
 *
 * FILTER POLICY
 * Facets are computed only from records that may publish specifications —
 * `verified` and `catalogue-verified` (see `getFacets`). Records still awaiting
 * verification contribute no facet values and are filtered out whenever any
 * attribute filter is active, so the UI never offers a filter it cannot honour.
 * A facet with a single option is hidden by `isUsefulFacet`: every current
 * model uses the PUG handle, so ticking it would return the whole list.
 */

import { useId, useMemo, useState } from "react";

import { ProductCard } from "@/components/product/ProductCard";
import { ColorSwatch } from "@/components/product/ColorSwatch";
import { isUsefulFacet } from "@/lib/products";
import type {
  BladeStiffness,
  HandleColor,
  Product,
  ProductFacets,
} from "@/lib/products/types";

type CatalogueBrowserProps = {
  products: Product[];
  facets: ProductFacets;
  /** Category name shown on cards when the list spans categories. */
  showCategory?: boolean;
  searchLabel?: string;
};

type ActiveFilters = {
  color: Set<HandleColor>;
  stiffness: Set<BladeStiffness>;
  nsfOnly: boolean;
};

const emptyFilters = (): ActiveFilters => ({
  color: new Set(),
  stiffness: new Set(),
  nsfOnly: false,
});

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 text-ink-subtle"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="9" cy="9" r="6" />
      <path d="m13.5 13.5 3.5 3.5" strokeLinecap="round" />
    </svg>
  );
}

type Result = {
  product: Product;
  /** Set when the query matched one of this model's article numbers. */
  matchedArticleNo?: string;
};

export function CatalogueBrowser({
  products,
  facets,
  showCategory = false,
  searchLabel = "Search this category",
}: CatalogueBrowserProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<ActiveFilters>(emptyFilters);
  const [panelOpen, setPanelOpen] = useState(false);
  const searchId = useId();

  const showColor = isUsefulFacet(facets.color);
  const showStiffness = isUsefulFacet(facets.stiffness);
  const hasFacets = showColor || showStiffness || facets.nsfApproved > 0;

  const activeCount =
    filters.color.size + filters.stiffness.size + (filters.nsfOnly ? 1 : 0);

  const results = useMemo<Result[]>(() => {
    const needle = query.trim().toLowerCase();

    /* A complete model code resolves to that one model.
       Without this, searching the exact code "CB5MF-PUG" would also return
       NCB5MF-PUG, which contains it as a substring. Partial codes still match
       broadly, so "CB5" continues to return every 5" curved boning model. */
    const exactModel = needle
      ? products.some((product) => product.modelCode.toLowerCase() === needle)
      : false;

    return products.flatMap((product) => {
      let matchedArticleNo: string | undefined;

      if (needle) {
        /* Article numbers match exactly, never as substrings: a search for
           "1495" must not return five unrelated knives. */
        const exact = product.variants.find(
          (variant) => variant.articleNo.toLowerCase() === needle,
        );

        if (exact) {
          matchedArticleNo = exact.articleNo;
        } else if (exactModel) {
          if (product.modelCode.toLowerCase() !== needle) return [];
        } else {
          const haystack = [
            product.name,
            product.modelCode,
            product.dimension?.printed ?? "",
            product.category.replace(/-/g, " "),
          ]
            .join(" ")
            .toLowerCase();

          if (!haystack.includes(needle)) return [];
        }
      }

      /* Attribute filters apply to records carrying attributes — one still
         awaiting verification has none to match, so any active filter
         excludes it. */
      if (filters.color.size > 0) {
        const offers = product.variants.some((variant) =>
          filters.color.has(variant.color),
        );
        if (!offers) return [];
      }
      if (filters.stiffness.size > 0) {
        const stiffness = product.blade?.stiffness;
        if (!stiffness || !filters.stiffness.has(stiffness)) return [];
      }
      if (filters.nsfOnly && product.nsfApproved !== true) return [];

      return [{ product, matchedArticleNo }];
    });
  }, [products, query, filters]);

  const articleTotal = useMemo(
    () =>
      results.reduce((sum, result) => sum + result.product.variants.length, 0),
    [results],
  );

  function toggleColor(value: HandleColor) {
    setFilters((current) => {
      const next = new Set(current.color);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return { ...current, color: next };
    });
  }

  function toggleStiffness(value: BladeStiffness) {
    setFilters((current) => {
      const next = new Set(current.stiffness);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return { ...current, stiffness: next };
    });
  }

  return (
    <div>
      {/* ---------- Search + filter trigger ---------- */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <label htmlFor={searchId} className="sr-only">
            {searchLabel}
          </label>
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
            <SearchIcon />
          </span>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by model code, article number or name"
            className="h-12 w-full border border-line bg-surface pr-4 pl-11 text-[0.9375rem] text-ink placeholder:text-ink-subtle focus:border-ink focus:outline-none"
          />
        </div>

        {hasFacets && (
          <button
            type="button"
            onClick={() => setPanelOpen((open) => !open)}
            aria-expanded={panelOpen}
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 border border-line-strong px-5 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-surface-alt sm:w-auto"
          >
            Filters
            {activeCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center bg-brand px-1.5 text-xs text-white tabular-nums">
                {activeCount}
              </span>
            )}
          </button>
        )}
      </div>

      {/* ---------- Filter panel ---------- */}
      {hasFacets && panelOpen && (
        <div className="mt-4 border border-line bg-surface-alt p-5 md:p-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {showColor && (
              <fieldset>
                <legend className="label-eyebrow text-ink-subtle">
                  Colour
                </legend>
                {/* Counts are model counts, because the filter returns models. */}
                <div className="mt-3 flex flex-col gap-2">
                  {facets.color.map((facet) => (
                    <label
                      key={facet.value}
                      className="flex items-center gap-2.5 text-sm text-ink-muted"
                    >
                      <input
                        type="checkbox"
                        checked={filters.color.has(facet.value)}
                        onChange={() => toggleColor(facet.value)}
                        className="h-4 w-4 accent-[var(--color-brand)]"
                      />
                      <ColorSwatch color={facet.value} />
                      {facet.label}
                      <span className="text-xs text-ink-subtle tabular-nums">
                        {facet.count}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {showStiffness && (
              <fieldset>
                <legend className="label-eyebrow text-ink-subtle">
                  Flex grade
                </legend>
                <div className="mt-3 flex flex-col gap-2">
                  {facets.stiffness.map((facet) => (
                    <label
                      key={facet.value}
                      className="flex items-center gap-2.5 text-sm text-ink-muted"
                    >
                      <input
                        type="checkbox"
                        checked={filters.stiffness.has(facet.value)}
                        onChange={() => toggleStiffness(facet.value)}
                        className="h-4 w-4 accent-[var(--color-brand)]"
                      />
                      {facet.label}
                      <span className="text-xs text-ink-subtle tabular-nums">
                        {facet.count}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {facets.nsfApproved > 0 && (
              <fieldset>
                <legend className="label-eyebrow text-ink-subtle">
                  Certification
                </legend>
                <div className="mt-3">
                  <label className="flex items-center gap-2.5 text-sm text-ink-muted">
                    <input
                      type="checkbox"
                      checked={filters.nsfOnly}
                      onChange={() =>
                        setFilters((current) => ({
                          ...current,
                          nsfOnly: !current.nsfOnly,
                        }))
                      }
                      className="h-4 w-4 accent-[var(--color-brand)]"
                    />
                    NSF approved
                    <span className="text-xs text-ink-subtle tabular-nums">
                      {facets.nsfApproved}
                    </span>
                  </label>
                </div>
              </fieldset>
            )}
          </div>

          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => setFilters(emptyFilters())}
              className="mt-6 text-sm font-medium text-ink underline underline-offset-4 hover:text-brand"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* ---------- Result count ---------- */}
      <p className="mt-6 text-sm text-ink-subtle" role="status">
        <span className="tabular-nums">{results.length}</span>{" "}
        {results.length === 1 ? "model" : "models"}
        <span className="text-ink-subtle">
          {" · "}
          <span className="tabular-nums">{articleTotal}</span> article{" "}
          {articleTotal === 1 ? "number" : "numbers"}
        </span>
        {query.trim() && (
          <>
            {" "}
            matching &ldquo;
            <span className="text-ink">{query.trim()}</span>&rdquo;
          </>
        )}
      </p>

      {/* ---------- Grid ---------- */}
      {results.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map(({ product, matchedArticleNo }) => (
            <ProductCard
              key={product.slug}
              product={product}
              showCategory={showCategory}
              matchedArticleNo={matchedArticleNo}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 border border-line bg-surface-alt p-10 text-center">
          <p className="text-base font-medium text-ink">No matches</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
            Nothing in this list matches that search. Try a full article number,
            a model code such as CB5MF-PUG, or part of a product name.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilters(emptyFilters());
            }}
            className="mt-5 text-sm font-medium text-ink underline underline-offset-4 hover:text-brand"
          >
            Reset search
          </button>
        </div>
      )}
    </div>
  );
}
