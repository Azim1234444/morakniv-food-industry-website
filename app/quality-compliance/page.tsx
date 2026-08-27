import type { Metadata } from "next";

import { DefinitionGrid } from "@/components/content/DefinitionGrid";
import { DownloadCard } from "@/components/content/DownloadCard";
import { PageHeader } from "@/components/content/PageHeader";
import { Prose } from "@/components/content/Prose";
import { SectionHeading } from "@/components/content/SectionHeading";
import { SourceNote } from "@/components/content/SourceNote";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { complianceDocuments } from "@/lib/documents";

export const metadata: Metadata = {
  title: "Quality & Compliance",
  description:
    "Declarations of compliance for food contact materials issued by Morakniv AB, covering Regulation (EC) No. 1935/2004, Regulation (EU) No. 10/2011 and GMP Regulation (EC) No. 2023/2006.",
  alternates: { canonical: "/quality-compliance" },
  openGraph: {
    title: "Quality & Compliance — Morakniv Food Industry",
    description:
      "Food contact material declarations issued by Morakniv AB, available to download.",
    url: "/quality-compliance",
  },
};

/* Every regulation below is named on the declarations we hold. */
const regulations = [
  {
    term: "Regulation (EC) No. 1935/2004",
    meta: "Food contact",
    description:
      "Of the European Parliament and of the Council of 27 October 2004, on materials and articles intended to come into contact with food. Cited on both declarations, which also confirm that traceability is ensured according to this regulation.",
  },
  {
    term: "Regulation (EU) No. 10/2011",
    meta: "Plastics",
    description:
      "Commission Regulation of 14 January 2011 on plastic materials and articles intended to come into contact with food, as amended. Cited on the declaration covering knife handle materials.",
  },
  {
    term: "Regulation (EC) No. 2023/2006",
    meta: "GMP",
    description:
      "Commission Regulation on good manufacturing practice for materials and articles intended to come into contact with food. Both declarations state that manufacture is carried out in accordance with its relevant requirements.",
  },
  {
    term: "Metals and alloys in food contact materials",
    meta: "Council of Europe",
    description:
      "1st edition, issued by the European Directorate for the Quality of Medicines and Healthcare. Cited on the declaration covering food industry knives with stainless steel blades.",
  },
];

export default function QualityCompliancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Quality & Compliance"
        title="Documented at the source."
        lede="Morakniv AB issues declarations of compliance for the materials in its knives that come into contact with food. What is published below is reproduced exactly as supplied by the manufacturer."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Quality & Compliance" },
        ]}
      />

      {/* ---------------------------------------------------------------
          What the declarations cover
          --------------------------------------------------------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Food contact materials"
                title="What is declared, and by whom."
              />
            </div>

            <div className="lg:col-span-7">
              <Prose size="lg">
                <p>
                  The declarations are issued by Morakniv AB, Bjäkenbacken 4,
                  SE-792 95 Mora, Sweden, as manufacturer.
                </p>
                <p>
                  For the food industry knives, the declaration states that the
                  food contact material is the stainless steel blade, and that
                  the type of food to come into contact with the material is all
                  food types. The knives are described as having stainless steel
                  blades with handles in polypropylene, polyamides and
                  thermoplastic elastomers.
                </p>
                <p>
                  A separate declaration covers the knife handle materials
                  themselves, listing the specific polypropylene and compound
                  grades used.
                </p>
              </Prose>

              <SourceNote className="mt-8">
                Sources: Declaration of Compliance &mdash; Food contact material
                (19 February 2025) and Declaration of Compliance for materials
                and articles intended to come into contact with food (6 May
                2025), both issued by Morakniv AB.
              </SourceNote>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          Regulations cited
          --------------------------------------------------------------- */}
      <Section tone="alt" divided>
        <Container>
          <SectionHeading
            eyebrow="Regulations cited"
            title="The standards named on the declarations."
          />

          <DefinitionGrid items={regulations} className="mt-12" />

          <SourceNote className="mt-8">
            Each declaration notes that it is valid for the product delivered as
            specified, and that because underlying legislation and products can
            change, customers are recommended to verify the regulatory status
            periodically.
          </SourceNote>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          NSF — attributed, not asserted
          --------------------------------------------------------------- */}
      <Section divided>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="NSF"
                title="A manufacturer statement, not a certificate we hold."
              />
            </div>

            <div className="lg:col-span-7">
              <div className="border border-line bg-surface-alt p-6 md:p-8">
                <h3 className="label-eyebrow text-ink-subtle">
                  As stated by Morakniv AB
                </h3>

                <blockquote className="mt-4 border-l-2 border-brand pl-5 text-base leading-relaxed text-ink-muted lg:text-lg">
                  <p>
                    &ldquo;Our food industry knives are NSF certified products.
                    The NSF mark is your assurance that the product has been
                    tested by one of the most respected independent
                    certification organizations in existence today.&rdquo;
                  </p>
                  <footer className="mt-4 text-sm text-ink-subtle not-italic">
                    &mdash; <em>Morakniv Professional Food Industry Knives
                    2026</em>, p.5. The catalogue also marks NSF approval
                    per article number in its product tables.
                  </footer>
                </blockquote>
              </div>

              <SourceNote variant="caution" className="mt-6">
                <strong className="font-medium text-ink">
                  No NSF certificate has been supplied to us.
                </strong>{" "}
                The statement above is reproduced as the manufacturer&rsquo;s
                own claim and is not presented here as independently verified.
                Certification numbers and certificate documents are not
                published on this site. Buyers requiring evidence of NSF
                certification should request it directly, and we will pass such
                requests to the manufacturer.
              </SourceNote>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          Downloads
          --------------------------------------------------------------- */}
      <Section tone="sunk" divided>
        <Container>
          <SectionHeading
            eyebrow="Documents"
            title="Declaration of compliance."
            lede="Covers the food industry range and is available as PDF."
          />

          {/*
            One card at present. The grid still splits into two columns from
            `md` up so a second declaration slots in without a layout change,
            but a lone card is capped rather than stretched to full width,
            which would leave it looking like an empty banner.
          */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {complianceDocuments.map((document) => (
              <DownloadCard key={document.id} document={document} />
            ))}
          </div>

          {/*
            A further declaration supplied with the client materials covers the
            Ashwood Outdoor collection. It is not part of the food industry
            range, and this page has no "other product lines" context to hold
            it, so it is not published here — it is available from us on
            request instead.
          */}
          <SourceNote variant="caution" className="mt-8">
            A further declaration supplied with the client materials covers the
            Ashwood Outdoor collection — outdoor knives with coated stainless
            blades. It is <strong className="font-medium text-ink">not</strong>{" "}
            part of the food industry range and is therefore not published on
            this site. Contact us if you need it.
          </SourceNote>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/how-to-order" className="w-full sm:w-auto">
              How to order
            </Button>
            <Button
              href="/technology/safety"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Safety &amp; traceability
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
