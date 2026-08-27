import Image from "next/image";

import { CTASection } from "@/components/content/CTASection";
import { CategoryCard } from "@/components/content/CategoryCard";
import { SectionHeading } from "@/components/content/SectionHeading";
import { SplitFeature } from "@/components/content/SplitFeature";
import { TrustBar } from "@/components/content/TrustBar";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { documents, productCategories } from "@/lib/navigation";
import { distributor, manufacturer } from "@/lib/site";

import factoryImage from "@/public/images/factory-aerial-mora.jpg";

/*
 * IMAGE RIGHTS — ACTION REQUIRED BEFORE PRODUCTION LAUNCH
 * ------------------------------------------------------
 * `food-industry-worker.jpg` (supplied as DSC_6159.jpg) shows an identifiable
 * person. No model release, licence or usage grant was included with the client
 * materials. Commercial use on a public website must be confirmed in writing
 * with the copyright holder — and with the subject — before this site goes
 * live. If confirmation cannot be obtained, replace the image; the surrounding
 * section is written to stand on its own copy.
 *
 * The same check is outstanding for `factory-aerial-mora.jpg` (usage rights
 * only — no identifiable individuals).
 */
import workerImage from "@/public/images/food-industry-worker.jpg";

/**
 * Phase 0 home page.
 *
 * SOURCING RULE
 * Product, manufacturing and compliance claims trace to the supplied 2026
 * catalogue, the press release or the three compliance declarations.
 *
 * The Malaysian business — Akmal Station, distributor and importer of Morakniv
 * Food Industry products here — is named from the client's own business
 * details. It is presented as a separate company from Morakniv AB, and no
 * "official", "authorised", "exclusive" or "sole" status is asserted, because
 * none has been confirmed.
 *
 * Certification claims are attributed to the manufacturer rather than stated as
 * verified fact — see the Quality & Compliance section and `TrustBar`.
 */
export default function Home() {
  return (
    <>
      {/* ===============================================================
          Hero — split composition, factory aerial holding the right side
          =============================================================== */}
      <section className="border-b border-line bg-surface">
        <Container>
          <div className="grid items-stretch gap-10 py-16 md:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
            <div className="flex flex-col justify-center lg:col-span-6 xl:col-span-7 xl:pr-10">
              <div>
                <Badge variant="brand">Frosts is now Morakniv</Badge>
              </div>

              <h1 className="mt-7 text-[2.5rem] leading-[1.03] font-medium tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
                Professional knives for the food industry.
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted xl:text-xl">
                Developed for specific tasks in slaughterhouses, restaurant
                kitchens and charcuteries — produced in Mora, Sweden from
                carefully selected Swedish stainless steel.
              </p>

              {/* Buttons go full-width while stacked, so the edges stay flush. */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  href="/products"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Browse the range
                </Button>
                <Button
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Request a quotation
                </Button>
              </div>


              {/* Who is who, said once and plainly: Morakniv is the brand and
                  the maker; Akmal Station is the Malaysian business that
                  brings it in. Kept subordinate to the headline on purpose. */}
              <div className="mt-9 border-t border-line pt-6">
                <p className="text-base font-medium text-ink">
                  Morakniv Food Industry products for Malaysia
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  Distributed &amp; imported by {distributor.legalName} —
                  manufactured by {manufacturer.legalName} in Mora, Sweden.
                </p>
              </div>
            </div>

            <figure className="relative m-0 lg:col-span-6 xl:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-sunk sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
                <Image
                  src={factoryImage}
                  alt="Aerial view of the Morakniv manufacturing site in Mora, Sweden, surrounded by forest."
                  fill
                  priority
                  placeholder="blur"
                  quality={85}
                  sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 46vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </figure>
          </div>
        </Container>
      </section>

      {/* ===============================================================
          Key figures
          =============================================================== */}
      <Section tone="alt" size="sm">
        <Container>
          <TrustBar />
        </Container>
      </Section>

      {/* ===============================================================
          Made in Mora
          =============================================================== */}
      <Section divided>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Made in Mora, Sweden"
                title="A century of knife-making in one place."
              />
            </div>

            <div className="space-y-5 text-base leading-relaxed text-ink-muted lg:col-span-7 lg:text-lg">
              <p>
                Morakniv manufactures and sells a wide range of high-quality
                knives for the professional food industry. Each model is
                developed for a specific task, ensuring high quality in every
                cut.
              </p>
              <p>
                For more than a hundred years, knives have been crafted in
                Östnor — a tradition that started in local homes, with skills
                passed down from one generation to another. Since 2011 all
                production has taken place in shared facilities in Mora.
              </p>
              <p className="border-t border-line pt-5 text-sm text-ink-subtle">
                Source: <em>Morakniv Professional Food Industry Knives 2026</em>,
                pp.7–10.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ===============================================================
          Designed around the work — editorial split
          =============================================================== */}
      <Section tone="alt" divided>
        <Container>
          <SplitFeature
            image={workerImage}
            alt="A food industry worker in protective whites, hairnet and apron in a chilled processing room."
            ratio="portrait"
            focus="50% 35%"
            reverse
          >
            <SectionHeading
              eyebrow="Built around the work"
              title="Designed with the people who use them."
              lede={
                <>
                  <p>
                    A key part of our success lies in working closely with
                    professionals. By listening to their needs and insights, we
                    gain new ideas that we transform into market-leading knives.
                  </p>
                  <p className="mt-4">
                    Handle families including Ergo-Grip, G-Grip, Uni-Grip and
                    Pro-Grip are each developed for a specific area of use, with
                    materials and colours to suit the varied demands of the
                    workplace.
                  </p>
                </>
              }
            />

            <div className="mt-9">
              <Button href="/technology" variant="secondary">
                Steel, blades and handles
              </Button>
            </div>
          </SplitFeature>
        </Container>
      </Section>

      {/* ===============================================================
          Product categories
          =============================================================== */}
      <Section divided>
        <Container>
          <SectionHeading
            eyebrow="The range"
            title="Eight categories, covering the fabrication process."
            lede="From primal breakdown through to final trimming, slicing and dicing."
          />

          <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {productCategories.map((category) => (
              <CategoryCard
                key={category.href}
                label={category.label}
                href={category.href}
                count={category.count}
              />
            ))}
          </div>

          <div className="mt-8 border-t border-line pt-5">
            <p className="max-w-3xl text-sm leading-relaxed text-ink-subtle">
              Article-number counts are taken from the 2026 catalogue. Detailed
              specifications for each knife — handle type, colour, blade length
              and flex grade — are currently being verified against the
              manufacturer&rsquo;s product data and will be published once that
              check is complete.
            </p>
          </div>
        </Container>
      </Section>

      {/* ===============================================================
          Quality & compliance
          =============================================================== */}
      <Section tone="sunk" divided>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Quality &amp; compliance"
                title="Documented at the source."
                lede="Morakniv AB issues declarations of compliance for the materials that come into contact with food. The declarations below are published as supplied by the manufacturer."
              />

              <div className="mt-9">
                <Button href="/quality-compliance">View compliance</Button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <dl className="grid gap-px border border-line bg-line sm:grid-cols-2">
                <div className="bg-surface p-6">
                  <dt className="text-sm font-medium text-ink">
                    Food contact materials
                  </dt>
                  <dd className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                    Declared against Regulation (EC) No. 1935/2004 and
                    Commission Regulation (EC) No. 2023/2006 on good
                    manufacturing practice.
                  </dd>
                </div>

                <div className="bg-surface p-6">
                  <dt className="text-sm font-medium text-ink">
                    Handle materials
                  </dt>
                  <dd className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                    Declared against Commission Regulation (EU) No. 10/2011 on
                    plastic materials intended to come into contact with food.
                  </dd>
                </div>

                <div className="bg-surface p-6">
                  <dt className="text-sm font-medium text-ink">Traceability</dt>
                  <dd className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                    Ensured according to Regulation (EC) No. 1935/2004.
                    Individual QR-code traceability is described in the 2026
                    catalogue.
                  </dd>
                </div>

                <div className="bg-surface p-6">
                  <dt className="text-sm font-medium text-ink">
                    NSF certification
                  </dt>
                  <dd className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                    Stated by Morakniv AB in the 2026 catalogue for its food
                    industry knives. Certification documents are not published
                    here.
                  </dd>
                </div>
              </dl>

              <p className="mt-5 text-sm text-ink-subtle">
                Declaration available as PDF:{" "}
                <a
                  href={documents.docFoodPp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink underline underline-offset-4 transition-colors hover:text-brand"
                >
                  handle materials
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ===============================================================
          Enquiry CTA
          =============================================================== */}
      <CTASection
        eyebrow="Get in touch"
        title="Tell us what you cut, and we'll point you to the right knife."
        lede="Send us your requirements — volumes, tasks and handle preferences — and we will come back with a recommendation."
        primary={{ label: "Make an enquiry", href: "/contact" }}
        secondary={{ label: "Browse the range", href: "/products" }}
      />
    </>
  );
}
