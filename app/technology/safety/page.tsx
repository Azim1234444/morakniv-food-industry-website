import type { Metadata } from "next";

import { DefinitionGrid } from "@/components/content/DefinitionGrid";
import { PageHeader } from "@/components/content/PageHeader";
import { Prose } from "@/components/content/Prose";
import { SectionHeading } from "@/components/content/SectionHeading";
import { SourceNote } from "@/components/content/SourceNote";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Safety & Traceability",
  description:
    "Blunt tip options, per-knife QR-code traceability, ergonomic handling and hygienic mirror-polished finishes on Morakniv food industry knives.",
  alternates: { canonical: "/technology/safety" },
  openGraph: {
    title: "Safety & Traceability — Morakniv Food Industry",
    description:
      "Blunt tip options, QR-code traceability and the ergonomics behind fatigue-free handling.",
    url: "/technology/safety",
  },
};

const safetyFeatures = [
  {
    term: "Blunt tip",
    description:
      "Selected knives are offered with a blunt tip that provides additional protection during the workday. The blunt tip will not penetrate metal mesh gloves, reduces the risk of puncturing the meat, and minimises the risk of stab wounds.",
  },
  {
    term: "QR-code traceability",
    description:
      "An individual, ready-to-use QR code links data to one specific knife. The catalogue describes this as allowing usage to be analysed over time, alongside employee performance, with possible malfunctions detected immediately.",
  },
  {
    term: "Ergonomic handling",
    description:
      "Handles are ergonomically shaped to allow strong, precise and controlled movements, helping reduce the risk of repetitive strain injuries during repetitive tasks.",
  },
  {
    term: "Slip resistance",
    description:
      "Microblasted and etched surfaces provide a slip-resistant structure that the catalogue describes as unaffected by fats or humidity, preventing the hand from sliding onto the blade even in wet conditions.",
  },
  {
    term: "Hygienic finish",
    description:
      "The mirror-polished finish reduces friction, prevents food particles from sticking, simplifies cleaning and minimises bacterial buildup.",
  },
  {
    term: "Metal detectability",
    description:
      "The catalogue states that mirror-polished stainless steel blades are compatible with metal detection systems, to help prevent contamination.",
  },
];

export default function SafetyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Technology"
        title="Safety & Traceability"
        lede="Features developed around the realities of a working production floor — protection during the shift, and the ability to trace an individual knife through its service life."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "Safety & Traceability" },
        ]}
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Safety features"
            title="Designed for the working day."
          />

          <DefinitionGrid items={safetyFeatures} className="mt-12" />

          <SourceNote className="mt-8">
            Sources: <em>Morakniv Professional Food Industry Knives 2026</em>,
            pp.12&ndash;19 and 24.
          </SourceNote>
        </Container>
      </Section>

      <Section tone="alt" divided>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Traceability"
                title="From material to finished knife."
              />
            </div>

            <div className="lg:col-span-7">
              <Prose size="lg">
                <p>
                  Traceability of the product is ensured according to Regulation
                  (EC) No. 1935/2004, as stated in the declarations of
                  compliance issued by Morakniv AB.
                </p>
                <p>
                  The catalogue lists full traceability and European sourced
                  materials among the product pillars, alongside manufacturing
                  in Mora and fossil free energy in production.
                </p>
              </Prose>

              <SourceNote className="mt-8">
                Sources: Declaration of Compliance &mdash; Food contact material
                (Morakniv AB, 19 February 2025) and{" "}
                <em>Morakniv Professional Food Industry Knives 2026</em>, pp.5
                and 13.
              </SourceNote>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  href="/quality-compliance"
                  className="w-full sm:w-auto"
                >
                  Quality &amp; compliance
                </Button>
                <Button
                  href="/technology/steel"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  The steel
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
