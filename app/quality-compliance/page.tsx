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

/* Every regulation below is named on the declaration published on this page. */
const regulations = [
  {
    term: "Regulation (EC) No. 1935/2004",
    meta: "Food contact",
    description:
      "Of the European Parliament and of the Council of 27 October 2004, on materials and articles intended to come into contact with food. The declaration also confirms that traceability is ensured according to this regulation.",
  },
  {
    term: "Regulation (EU) No. 10/2011",
    meta: "Plastics",
    description:
      "Commission Regulation of 14 January 2011 on plastic materials and articles intended to come into contact with food, as amended.",
  },
  {
    term: "Regulation (EC) No. 2023/2006",
    meta: "GMP",
    description:
      "Commission Regulation on good manufacturing practice for materials and articles intended to come into contact with food. The declaration states that manufacture is carried out in accordance with its relevant requirements.",
  },
];

export default function QualityCompliancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Quality & Compliance"
        title="Documented at the source."
        lede="Morakniv AB issues declarations of compliance for the materials in its knives that come into contact with food. The declaration published here is available to download in full."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Quality & Compliance" },
        ]}
      />

      {/* ---------------------------------------------------------------
          What the published declaration covers.

          Only the declaration in `complianceDocuments` may be described here.
          The Frosts food-contact declaration was withdrawn at the client's
          request; no copy on this page may be written from it, and it must not
          be cited by date as though a reader could obtain it.
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
                  The declaration is issued by Morakniv AB, Bjäkenbacken 4,
                  SE-792 95 Mora, Sweden, as manufacturer.
                </p>
                <p>
                  It covers the materials used in the knife handles, listing the
                  specific polypropylene and compound grades, and declares them
                  against the European regulations for materials intended to
                  come into contact with food.
                </p>
              </Prose>

              <SourceNote className="mt-8">
                Source: Declaration of Compliance for materials and articles
                intended to come into contact with food (6 May 2025), issued by
                Morakniv AB.
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
            title="The standards named on the declaration."
          />

          <DefinitionGrid items={regulations} className="mt-12" />

          <SourceNote className="mt-8">
            The declaration notes that it is valid for the product delivered as
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
                title="What Morakniv AB states about NSF."
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
                    2026</em>, p.5.
                  </footer>
                </blockquote>
              </div>
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
            lede="Covers the polypropylene and compound materials used in the knife handles. Available as PDF."
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
            Declarations covering other Morakniv product lines are deliberately
            not described here. They are outside the food industry range, this
            page has no context that makes their scope unambiguous, and naming
            an unrelated collection on a compliance page only raises a question
            a food-industry buyer did not ask. Do not re-add that note.
          */}

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
