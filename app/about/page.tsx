import type { Metadata } from "next";
import Image from "next/image";

import { Milestones, type Milestone } from "@/components/content/Milestones";
import { PageHeader } from "@/components/content/PageHeader";
import { Prose } from "@/components/content/Prose";
import { SectionHeading } from "@/components/content/SectionHeading";
import { SourceNote } from "@/components/content/SourceNote";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { manufacturer } from "@/lib/site";

import factoryImage from "@/public/images/factory-aerial-mora.jpg";

export const metadata: Metadata = {
  title: "About",
  description:
    "Morakniv has made knives in Mora, Sweden since 1891. The history of Frosts, the merger with Morakniv AB, and manufacturing in Östnor.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Morakniv Food Industry",
    description:
      "Knife-making in Mora, Sweden since 1891 — the history of Frosts and its consolidation under the Morakniv brand.",
    url: "/about",
  },
};

/* Every milestone below is stated in the press release and catalogue pp.6–7. */
const milestones: Milestone[] = [
  {
    year: "1891",
    title: "Frosts is founded in Mora",
    description:
      "Frost-Erik Erson founds Frosts in Mora, Sweden. The sledge factory starts producing knives for internal use and quickly grows into a worldwide-exporting knife manufacturer.",
  },
  {
    year: "1988",
    title: "KJ Eriksson becomes a minority shareholder",
    description:
      "KJ Eriksson AB — now Morakniv AB — becomes a minority shareholder in Frosts, and the two companies begin the process of merging.",
  },
  {
    year: "2005",
    title: "The merger is finalised",
    description:
      "Frosts Knivfabrik becomes a wholly owned subsidiary of Morakniv AB.",
  },
  {
    year: "2011",
    title: "Production moves under one roof",
    description:
      "All production begins taking place in shared facilities in Mora.",
  },
  {
    year: "2025",
    title: "Frosts becomes Morakniv",
    description:
      "From 29 September 2025 the food industry knives carry the Morakniv logo, consolidating the assortment under a single brand. The change involves no organisational changes and does not affect the product range or production.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Knife-making in Mora, Sweden since 1891."
        lede="Morakniv manufactures and sells a wide range of high-quality knives for the professional food industry. Each model is developed for specific tasks in slaughterhouses, restaurant kitchens and charcuteries."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* ---------------------------------------------------------------
          Manufacturing background
          --------------------------------------------------------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Made in Mora, Sweden"
                title="A tradition passed between generations."
              />
            </div>

            <div className="lg:col-span-7">
              <Prose size="lg">
                <p>
                  For more than a hundred years, knives have been crafted in
                  Östnor — a tradition that started in local homes, with skills
                  passed down from one generation to another.
                </p>
                <p>
                  The knives are produced in the factory in Mora, Sweden, using
                  carefully selected Swedish stainless steel. Designed with
                  safety, hygiene and performance in mind, every detail is
                  considered — from the ergonomic handle that provides a secure
                  grip, to the flexible blade that reaches every part of the
                  meat.
                </p>
                <p>
                  A key part of the company&rsquo;s success lies in working
                  closely with professionals. By listening to their needs and
                  insights, Morakniv gains new ideas that are transformed into
                  market-leading knives.
                </p>
              </Prose>

              <SourceNote className="mt-8">
                Source: <em>Morakniv Professional Food Industry Knives 2026</em>,
                pp.8&ndash;10.
              </SourceNote>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          Factory
          --------------------------------------------------------------- */}
      <Section tone="alt" size="sm" divided>
        <Container>
          <figure className="m-0">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-sunk lg:aspect-[21/9]">
              <Image
                src={factoryImage}
                alt="Aerial view of the Morakniv manufacturing site in Mora, Sweden, surrounded by forest."
                fill
                placeholder="blur"
                quality={85}
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="mt-4 text-sm text-ink-subtle">
              The Morakniv production site in Mora, Sweden. Since 2011 all
              production has taken place in shared facilities.
            </figcaption>
          </figure>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          History
          --------------------------------------------------------------- */}
      <Section divided>
        <Container>
          <SectionHeading
            eyebrow="History"
            title="How Frosts became part of Morakniv."
            lede="Frosts was a trusted name in knife manufacturing for the food industry for 134 years. In 2025 the brand was consolidated under the Morakniv name."
          />

          <div className="mt-12">
            <Milestones items={milestones} />
          </div>

          <SourceNote className="mt-8">
            Sources: <em>Frosts Becomes Morakniv</em> press release (Morakniv AB,
            2025) and <em>Morakniv Professional Food Industry Knives 2026</em>,
            pp.6&ndash;7.
          </SourceNote>

          <div className="mt-9">
            <Button href="/news/frosts-becomes-morakniv" variant="secondary">
              Read the full press release
            </Button>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          Manufacturer — clearly separated from the Malaysian operation
          --------------------------------------------------------------- */}
      <Section tone="sunk" divided>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="The manufacturer"
                title="Morakniv AB, Mora, Sweden."
                lede="The knives described across this site are designed and manufactured by Morakniv AB in Sweden."
              />
            </div>

            <div className="lg:col-span-7">
              <div className="border border-line bg-surface p-6 md:p-8">
                <h3 className="label-eyebrow text-ink-subtle">
                  Manufacturer details
                </h3>
                <address className="mt-4 text-base leading-relaxed text-ink not-italic">
                  <strong className="font-medium">
                    {manufacturer.legalName}
                  </strong>
                  <br />
                  {manufacturer.postalAddress.join(", ")}
                </address>

                <dl className="mt-6 grid gap-4 border-t border-line pt-6 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-ink-subtle">Visiting address</dt>
                    <dd className="mt-1 text-ink-muted">
                      {manufacturer.visitingAddress.join(", ")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-subtle">Telephone</dt>
                    <dd className="mt-1">
                      <a
                        href={`tel:${manufacturer.telephone.replace(/[\s-]/g, "")}`}
                        className="text-ink-muted underline-offset-4 hover:text-brand hover:underline"
                      >
                        {manufacturer.telephone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-subtle">General enquiries</dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${manufacturer.email}`}
                        className="text-ink-muted underline-offset-4 hover:text-brand hover:underline"
                      >
                        {manufacturer.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-subtle">Orders</dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${manufacturer.orderEmail}`}
                        className="text-ink-muted underline-offset-4 hover:text-brand hover:underline"
                      >
                        {manufacturer.orderEmail}
                      </a>
                    </dd>
                  </div>
                </dl>

                <p className="mt-6 border-t border-line pt-6 text-xs leading-relaxed text-ink-subtle">
                  Source: <em>Morakniv Professional Food Industry Knives 2026</em>,
                  p.43.
                </p>
              </div>

              <SourceNote variant="caution" className="mt-6">
                Details for the Malaysian business — company name, registration,
                address and local contacts — are not published on this site yet
                and are pending confirmation. Nothing on this page should be
                read as describing a Malaysian entity or its relationship to
                Morakniv AB.
              </SourceNote>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
