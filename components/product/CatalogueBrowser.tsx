"use client";

/**
 * Client component: owns the search query and active filter state.
 *
 * FILTER POLICY
 * Facets are computed from verified records only (see `getFacets`). While no
 * record is verified, every facet list is empty and the filter panel is not
 * rendered at all — the UI must never offer a filter it cannot honour. The
 * full filtering pipeline below is live and will begin working the moment
 * verified data lands; nothing here needs rewiring.
 */

import { useId, useMemo, useState } from "react";

import { ProductCard } from "@/components/product/ProductCard";
import type {
  BladeStiffness,
  HandleColor,
  HandleType,
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
  handle: Set<HandleType>;
  color: Set<HandleColor>;
  stiffness: Set<BladeStiffness>;
  nsfOnly: boolean;
};

const emptyFilters = (): ActiveFilters => ({
  handle: new Set(),
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

  const hasFacets =
    facets.handle.length > 0 ||
    facets.color.length > 0 ||
    facets.stiffness.length > 0 ||
    facets.nsfApproved > 0;

  const activeCount =
    filters.handle.size +
    filters.color.size +
    filters.stiffness.size +
    (filters.nsfOnly ? 1 : 0);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return products.filter((product) => {
      if (needle) {
        const haystack = [
          product.articleNo ?? "",
          product.name,
          product.category.replace(/-/g, " "),
        ]
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(needle)) return false;
      }

      /* Attribute filters apply to verified records only — an unverified
         record has no attributes to match, so any active filter excludes it. */
      if (filters.handle.size > 0) {
        if (!product.handle || !filters.handle.has(product.handle)) return false;
      }
      if (filters.color.size > 0) {
        if (!product.color || !filters.color.has(product.color)) return false;
      }
      if (filters.stiffness.size > 0) {
        const stiffness = product.blade?.stiffness;
        if (!stiffness || !filters.stiffness.has(stiffness)) return false;
      }
      if (filters.nsfOnly && product.nsfApproved !== true) return false;

      return true;
    });
  }, [products, query, filters]);

  function toggle<T extends string>(key: keyof ActiveFilters, value: T) {
    setFilters((current) => {
      const next = { ...current };
      const set = new Set(current[key] as Set<string>);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      // @ts-expect-error — narrowed by the caller; sets are homogeneous per key
      next[key] = set;
      return next;
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
            placeholder="Search by article number or name"
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

      {/* ---------- Filter panel (only when verified facets exist) ---------- */}
      {hasFacets && panelOpen && (
        <div className="mt-4 border border-line bg-surface-alt p-5 md:p-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {facets.handle.length > 0 && (
              <fieldset>
                <legend className="label-eyebrow text-ink-subtle">
                  Handle
                </legend>
                <div className="mt-3 flex flex-col gap-2">
                  {facets.handle.map((facet) => (
                    <label
                      key={facet.value}
                      className="flex items-center gap-2.5 text-sm text-ink-muted"
                    >
                      <input
                        type="checkbox"
                        checked={filters.handle.has(facet.value)}
                        onChange={() => toggle("handle", facet.value)}
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

            {facets.color.length > 0 && (
              <fieldset>
                <legend className="label-eyebrow text-ink-subtle">
                  Colour
                </legend>
                <div className="mt-3 flex flex-col gap-2">
                  {facets.color.map((facet) => (
                    <label
                      key={facet.value}
                      className="flex items-center gap-2.5 text-sm text-ink-muted"
                    >
                      <input
                        type="checkbox"
                        checked={filters.color.has(facet.value)}
                        onChange={() => toggle("color", facet.value)}
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

            {facets.stiffness.length > 0 && (
              <fieldset>
                <legend className="label-eyebrow text-ink-subtle">
                  Blade stiffness
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
                        onChange={() => toggle("stiffness", facet.value)}
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
        {results.length === 1 ? "product" : "products"}
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
          {results.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              showCategory={showCategory}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 border border-line bg-surface-alt p-10 text-center">
          <p className="text-base font-medium text-ink">No matches</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
            Nothing in this list matches that search. Try an article number
            without punctuation, or part of a product name.
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
