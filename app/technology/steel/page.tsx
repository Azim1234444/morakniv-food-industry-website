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
  title: "The Steel",
  description:
    "Alleima® 10C28Mo2 Swedish stainless steel, used across the PUG range and hardened to 57 HRC for consistent cutting performance and long edge retention.",
  alternates: { canonical: "/technology/steel" },
  openGraph: {
    title: "The Steel — Morakniv Food Industry",
    description:
      "Alleima® 10C28Mo2 Swedish stainless steel, hardened to 57 HRC across the PUG range.",
    url: "/technology/steel",
  },
};

const processSteps = [
  {
    term: "Alleima® 10C28Mo2",
    meta: "57 HRC",
    description:
      "All blades in the PUG range are manufactured from Swedish stainless steel Alleima® 10C28Mo2, used across the entire range and hardened to 57 HRC.",
  },
  {
    term: "Fine microstructure",
    description:
      "The steel combines high corrosion resistance with a fine microstructure, delivering consistent cutting performance, long edge retention and reduced risk of chipping or blade breakage.",
  },
  {
    term: "Optimised for resharpening",
    description:
      "The steel is optimised for frequent resharpening, ensuring consistent performance in demanding professional food-processing environments.",
  },
  {
    term: "Computer-controlled grinding",
    description:
      "The blade receives its final shape through computer-controlled spine, side and edge grinding, ensuring optimal geometry and consistent performance.",
  },
  {
    term: "Robotic sharpening",
    description:
      "Each blade is robotically sharpened for precision, then tested and documented to guarantee uniform sharpness and maximum efficiency.",
  },
  {
    term: "Mirror-polished finish",
    description:
      "A mirror-polished finish reduces friction, improves glide, simplifies cleaning and minimises bacterial buildup — described in the catalogue as essential for hygienic handling.",
  },
  {
    term: "Corrosion resistance",
    description:
      "Despite the name, stainless steel is not fully resistant to corrosion; a more accurate term would be rust-resistant steel. The blades are made to offer strength, durability and better rust resistance in wet or moist environments.",
  },
];

export default function SteelPage() {
  return (
    <>
      <PageHeader
        eyebrow="Technology"
        title="The Steel"
        lede="All blades in the range are manufactured from Swedish stainless steel Alleima® 10C28Mo2, hardened to 57 HRC."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "The Steel" },
        ]}
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="The alloy"
                title="Alleima® 10C28Mo2."
              />
            </div>

            <div className="lg:col-span-7">
              <Prose size="lg">
                <p>
                  All blades are manufactured from Swedish stainless steel
                  Alleima&reg; 10C28Mo2, now used across the entire range and
                  hardened to 57&nbsp;HRC.
                </p>
                <p>
                  The steel combines high corrosion resistance with a fine
                  microstructure, delivering consistent cutting performance,
                  long edge retention and reduced risk of chipping or blade
                  breakage. It is optimised for frequent resharpening, ensuring
                  consistent performance in demanding professional
                  food-processing environments.
                </p>
              </Prose>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="alt" divided>
        <Container>
          <SectionHeading
            eyebrow="From billet to edge"
            title="How the blade is made."
          />

          <DefinitionGrid items={processSteps} className="mt-12" />

          <SourceNote className="mt-8">
            Steel grade and hardness: <em>Morakniv Professional Food Industry
            Knives &mdash; PUG</em>, p.7.
          </SourceNote>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              href="/technology/blades"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Blades and flex grades
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
