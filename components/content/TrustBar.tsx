/**
 * Four figures, each a concrete fact from the supplied PUG catalogue — the
 * current source of truth for the range. Deliberately excluded:
 *
 *  - "NSF certified" — the catalogue asserts it (p.5, and per-SKU in every
 *    product table) but NO NSF certificate was supplied. A certification claim
 *    must not sit in a headline stat position on the strength of marketing copy
 *    alone. It is stated further down the page, explicitly attributed to the
 *    manufacturer, until documentation arrives.
 *
 *  - "100% green electricity" (p.8) — a manufacturer sustainability claim with
 *    no supporting document. Kept out of the headline figures.
 *
 *  - Any "90% recycled" figure. The catalogue contradicts itself: p.8 says
 *    "a recycled ratio exceeding 90%", p.12 says "80–90% recycled Swedish
 *    stainless steel". The conservative, more specific p.12 range is used and
 *    must not be rounded up.
 */

const items = [
  {
    value: "1891",
    label: "Knife-making in Mora, Sweden",
  },
  {
    value: "57 HRC",
    label: "Alleima® 10C28Mo2 blade steel",
  },
  {
    value: "5",
    label: "Handle colours, including metal-detectable blue",
  },
  {
    value: "4",
    label: "Blade flex grades, stiff to extra flex",
  },
] as const;

export function TrustBar() {
  return (
    <div>
      <dl className="grid grid-cols-2 border-t border-l border-line lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.value}
            className="border-r border-b border-line px-5 py-7 md:px-7 md:py-8"
          >
            <dt className="text-2xl leading-none font-medium tracking-tight text-brand tabular-nums md:text-[1.75rem]">
              {item.value}
            </dt>
            <dd className="mt-3 text-sm leading-snug text-ink-muted">
              {item.label}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-xs leading-relaxed text-ink-subtle">
        Source: <em>Morakniv Professional Food Industry Knives &mdash; PUG</em>.
      </p>
    </div>
  );
}
