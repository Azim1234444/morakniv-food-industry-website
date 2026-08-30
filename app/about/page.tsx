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
import { distributor, manufacturer } from "@/lib/site";

import factoryImage from "@/public/images/factory-aerial-mora.jpg";
/*
 * IMAGE RIGHTS — see the note in app/page.tsx, which applies here too.
 * `food-industry-worker-mono.webp` shows an identifiable person. It came from
 * the client's CorporateWebsite delivery (source `DSC_5942 SV.jpg.jpeg`) with
 * no model release, licence or usage grant attached. Commercial use on a
 * public website must be confirmed in writing with the copyright holder — and
 * with the subject — before this site goes live. The surrounding section is
 * written to stand on its own copy if the image has to be pulled.
 *
 * The caption deliberately describes the WORK, not the person: no name, no
 * role, no employer is claimed, because none was supplied.
 */
import workerMonoImage from "@/public/images/food-industry-worker-mono.webp";

export const metadata: Metadata = {
  title: "About",
  description:
    "Morakniv has made knives in Mora, Sweden since 1891 — the history of Frosts, the merger with Morakniv AB, and manufacturing in Östnor. In Malaysia, Morakniv Food Industry products are distributed and imported by Akmal Station.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Morakniv Food Industry",
    description:
      "Knife-making in Mora, Sweden since 1891, and the Malaysian business behind this site: Akmal Station, distributor and importer of Morakniv Food Industry products.",
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

              {/* Lazy by default — this sits below the fold at 390px. */}
              <figure className="mt-10 m-0">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-sunk">
                  <Image
                    src={workerMonoImage}
                    alt="Food industry worker in a manufacturing environment"
                    fill
                    placeholder="blur"
                    quality={85}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: "50% 32%" }}
                  />
                </div>
                <figcaption className="mt-4 text-sm leading-relaxed text-ink-subtle">
                  Knife-making in Mora, Sweden.
                </figcaption>
              </figure>
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
          Manufacturer — Sweden, kept separate from the Malaysian business
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
                </dl>

                <p className="mt-6 border-t border-line pt-6 text-xs leading-relaxed text-ink-subtle">
                  Source: <em>Morakniv Professional Food Industry Knives 2026</em>,
                  p.43.
                </p>
              </div>

              {/*
                The manufacturer's ordering address is deliberately absent from
                the details above. Ordering in Malaysia runs through Akmal
                Station; publishing an order route to Sweden sends a buyer away
                from the business whose site this is. Do not re-add it, and do
                not add the manufacturer's trade portal.
              */}
              <SourceNote className="mt-6">
                Morakniv AB is a Swedish company and is not the operator of this
                website. Orders and quotations in Malaysia are handled by{" "}
                {distributor.legalName}, set out below.
              </SourceNote>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          The Malaysian business — a separate company from Morakniv AB.

          Wording is fixed: "distributor and importer". Do not upgrade it to
          "official", "authorised", "exclusive" or "sole" without written
          confirmation from the client. See lib/site.ts.
          --------------------------------------------------------------- */}
      <Section divided>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="In Malaysia"
                title="Akmal Station."
                lede="Distributor &amp; importer of Morakniv Food Industry products in Malaysia."
              />
            </div>

            <div className="lg:col-span-7">
              <div className="border border-line bg-surface p-6 md:p-8">
                <h3 className="label-eyebrow text-ink-subtle">
                  Company details
                </h3>

                <address className="mt-4 text-base leading-relaxed text-ink not-italic">
                  <strong className="font-medium">
                    {distributor.legalName}
                  </strong>
                  <br />
                  {distributor.address.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </address>

                <dl className="mt-6 grid gap-4 border-t border-line pt-6 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-ink-subtle">Registration no.</dt>
                    <dd className="mt-1 text-ink-muted">
                      {distributor.registrationNumber}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-subtle">Enquiries</dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${distributor.enquiryEmail}`}
                        className="text-ink-muted underline-offset-4 hover:text-brand hover:underline"
                      >
                        {distributor.enquiryEmail}
                      </a>
                    </dd>
                  </div>
                </dl>

                <p className="mt-6 border-t border-line pt-6 text-sm leading-relaxed text-ink-muted">
                  Akmal Station distributes and imports Morakniv Food Industry
                  products in Malaysia, and operates this website. It is a
                  separate company from {manufacturer.legalName}: the knives
                  themselves are designed and manufactured in Mora, Sweden, and
                  the Morakniv brand belongs to the manufacturer.
                </p>
              </div>

              <div className="mt-9">
                <Button href="/contact" variant="secondary">
                  Contact the Malaysian office
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
