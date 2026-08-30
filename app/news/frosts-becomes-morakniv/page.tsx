import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/content/PageHeader";
import { SourceNote } from "@/components/content/SourceNote";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { pressRelease } from "@/lib/documents";
import { getNewsItem } from "@/lib/news";

const item = getNewsItem("frosts-becomes-morakniv");

export const metadata: Metadata = {
  title: "Frosts becomes Morakniv",
  description:
    "Morakniv AB press release: after 134 years the Frosts brand consolidates under the Morakniv name. From 29 September 2025 the food industry knives carry the Morakniv logo.",
  alternates: { canonical: "/news/frosts-becomes-morakniv" },
  openGraph: {
    type: "article",
    title: "Frosts becomes Morakniv — press release",
    description:
      "After 134 years the Frosts brand consolidates under the Morakniv name. No organisational changes, no change to the product range or production.",
    url: "/news/frosts-becomes-morakniv",
  },
};

export default function FrostsBecomesMoraknivPage() {
  if (!item) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`Press release · ${item.year}`}
        title="Frosts becomes Morakniv and strengthens its position in the food industry"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
          { label: "Frosts becomes Morakniv" },
        ]}
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            {/* Meta rail */}
            <aside className="lg:col-span-3">
              <dl className="space-y-5 border-t border-line pt-6 text-sm lg:sticky lg:top-24">
                <div>
                  <dt className="label-eyebrow text-ink-subtle">Issued by</dt>
                  <dd className="mt-1.5 text-ink">{item.source}</dd>
                </div>
                <div>
                  <dt className="label-eyebrow text-ink-subtle">Year</dt>
                  <dd className="mt-1.5 text-ink tabular-nums">
                    <time dateTime={item.year}>{item.year}</time>
                  </dd>
                </div>
                {item.effectiveDate && (
                  <div>
                    <dt className="label-eyebrow text-ink-subtle">
                      Takes effect
                    </dt>
                    <dd className="mt-1.5 text-ink">{item.effectiveDate}</dd>
                  </div>
                )}
                <div className="pt-2">
                  <Button
                    href={pressRelease.href}
                    variant="secondary"
                    size="sm"
                  >
                    Original PDF
                  </Button>
                </div>
              </dl>
            </aside>

            {/* Release body — reproduced from the supplied PDF */}
            <article className="lg:col-span-9">
              <div className="max-w-2xl space-y-6 text-base leading-relaxed text-ink-muted lg:text-lg">
                <p className="text-lg text-ink lg:text-xl">
                  For 134 years, Frosts — a brand owned by Morakniv — has been a
                  trusted name in knife manufacturing for the food industry.
                  Now, Frosts is changing its name to Morakniv — a step that
                  unifies the knife assortment under one strong and consistent
                  brand.
                </p>

                <p>
                  The name change involves no organizational changes and does
                  not affect the product range or production. The only visible
                  difference is that, starting from 29th of September, the
                  knives will carry the Morakniv logo. The decision to merge the
                  brands reflects an increased focus on brand building, sales
                  and communication:
                </p>

                <blockquote className="border-l-2 border-brand pl-5 text-ink">
                  <p>
                    &ldquo;In recent years, the Frosts brand has been used
                    exclusively for our food industry products, while Morakniv
                    has been actively marketed across all other categories. For
                    a company of our size, it&rsquo;s challenging to manage two
                    separate brands in terms of marketing and communication. We
                    are confident that consolidating everything under the
                    Morakniv name will make our brand even stronger,&rdquo;
                  </p>
                  <footer className="mt-3 text-sm text-ink-subtle">
                    says Richard Jägrud, CEO of Morakniv.
                  </footer>
                </blockquote>

                <h2 className="pt-6 text-xl leading-snug font-medium text-ink lg:text-2xl">
                  A knife-making legacy since 1891 — how Frosts became part of
                  Morakniv
                </h2>

                <p>
                  Frosts was founded in 1891 by Frost-Erik Erson in Mora,
                  Sweden. The sledge factory started producing knives for
                  internal use and quickly grew into a worldwide-exporting knife
                  manufacturer. Over time, Frosts became a well-established name
                  in both the crafts and the food industry, and their knives are
                  known for their sharpness and durability.
                </p>

                <p>
                  After KJ Eriksson AB — now Morakniv AB — became a minority
                  shareholder in 1988, the companies began the process of
                  merging. The merger was finalized in 2005 when Frosts
                  Knivfabrik became a wholly owned subsidiary. Since 2011, all
                  production has taken place in shared facilities in Mora. The
                  knives will continue to serve butchers, meat processors, and
                  other workplaces with high demands on material and performance
                  — now under the Morakniv brand.
                </p>

                <h2 className="pt-6 text-xl leading-snug font-medium text-ink lg:text-2xl">
                  Strengthens the team with sales support for the food industry
                </h2>

                <p>
                  As part of the transition, Morakniv is reinforcing its focus
                  on the food industry by bringing in expertise and sales
                  support from Thomas Wehner.
                </p>

                <p>
                  Thomas brings over 20 years of experience in sales within the
                  meat industry, both nationally in Germany, where he is based,
                  and internationally. He has also worked as a production
                  manager, consultant, and trainer in the food industry. Most
                  recently, he worked with process optimization for the food
                  industry.
                </p>

                <blockquote className="border-l-2 border-brand pl-5 text-ink">
                  <p>
                    &ldquo;Thomas combines deep technical expertise with a
                    genuine commitment to the industry. With him on the team,
                    we&rsquo;re strengthening our presence in an important
                    market,&rdquo;
                  </p>
                  <footer className="mt-3 text-sm text-ink-subtle">
                    says Richard Jägrud.
                  </footer>
                </blockquote>

                <p className="border-t border-line pt-6">
                  For more information, please contact Richard Jägrud at{" "}
                  <a
                    href="mailto:richard.jagrud@morakniv.se"
                    className="font-medium text-ink underline underline-offset-4 transition-colors hover:text-brand"
                  >
                    richard.jagrud@morakniv.se
                  </a>
                  .
                </p>
              </div>

              <SourceNote variant="attribution" className="mt-10 max-w-2xl">
                This release was issued by Morakniv AB and is reproduced here in
                full. The change took effect on 29 September 2025.
              </SourceNote>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="/about" className="w-full sm:w-auto">
                  About Morakniv
                </Button>
                <Button
                  href="/news"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  All news
                </Button>
              </div>
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}
