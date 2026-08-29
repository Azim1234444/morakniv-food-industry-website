import type { Metadata } from "next";

import { DefinitionGrid } from "@/components/content/DefinitionGrid";
import { PageHeader } from "@/components/content/PageHeader";
import { Prose } from "@/components/content/Prose";
import { SectionHeading } from "@/components/content/SectionHeading";
import { SourceNote } from "@/components/content/SourceNote";
import {
  StiffnessGrades,
  type StiffnessGrade,
} from "@/components/content/StiffnessGrades";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Blades",
  description:
    "Four blade flexibility grades — stiff, medium flex, flex and extra flex — plus the blade shapes developed for boning, butchering, filleting and trimming.",
  alternates: { canonical: "/technology/blades" },
  openGraph: {
    title: "Blades — Morakniv Food Industry",
    description:
      "Four flexibility grades and the blade shapes behind each task in the fabrication process.",
    url: "/technology/blades",
  },
};

/*
 * Catalogue p.18 — the four grades, described in the catalogue's own terms.
 * `key` pulls the manufacturer's published mark for each grade from
 * lib/images/technology.ts. The marks illustrate the grades for the range as
 * a whole; they are not attached to any article number.
 */
const flexGrades: StiffnessGrade[] = [
  {
    key: "stiff",
    term: "Stiff",
    description:
      "A strong blade for maximum control and durability. Excels in heavy-duty applications such as bone-in meat processing or slicing dense vegetables, offering precision and maximum durability.",
  },
  {
    key: "medium-flex",
    term: "Medium Flex",
    description:
      "Versatile and suitable for a wide range of tasks, with good control and adaptability to various cutting needs.",
  },
  {
    key: "flex",
    term: "Flex",
    description:
      "For precise tasks — well suited to filleting or precise deboning, with enhanced manoeuvrability that makes it easy to cut around bones and joints.",
  },
  {
    key: "extra-flex",
    term: "Extra Flex",
    description:
      "The highest level of flexibility, for fine filleting and maximum manoeuvrability. Designed to move smoothly around bones without damaging the meat, ensuring clean cuts and minimising waste.",
  },
];

/* Catalogue pp.20–21 — blade shapes and what each is for. */
const bladeShapes = [
  {
    term: "Wide butcher blade",
    description:
      "Designed for effortless, heavy-duty cutting. Offers maximum stability and control, reduces repetitive strain during bulk processing, and minimises bone splintering to improve yield and safety.",
  },
  {
    term: "Scandinavian trimming & butcher blade",
    description:
      "Thin, lightweight design for precise trimming of fat, sinew and silverskin. Enhances meat consistency and presentation, and is suited to precise cutting with minimal waste.",
  },
  {
    term: "Chef's blade",
    description:
      "A versatile blade for slicing, dicing and chopping vegetables, boneless meats and herbs. The edge design enables a rocking motion for speed and efficiency in high-volume kitchens.",
  },
  {
    term: "Trimming blade",
    description:
      "Excellent control for portioning and trimming. Maximises yield, reduces waste, and its ergonomic motion reduces hand strain in large-scale trimming operations.",
  },
  {
    term: "Curved blade",
    description:
      "Supports a natural slicing motion for clean, even cuts. The curvature follows bone contours for effective deboning and reduces tearing to maximise yield.",
  },
  {
    term: "Wide boning blade",
    description:
      "A rigid edge for heavy-duty boning. Provides leverage for separating thick muscle from bone, preserves the structural integrity of large cuts and speeds up processing of dense meats.",
  },
  {
    term: "Narrow blade",
    description:
      "An agile, pointed tip navigates joints and tight spaces. A slim profile enables ergonomic, wrist-friendly work and the most precise cutting, while reducing the risk of blade slippage.",
  },
];

export default function BladesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Technology"
        title="Blades"
        lede="Blades are available in four flexibility grades, allowing them to adapt to a wide range of cutting tasks. This adaptability reduces the need for multiple specialised knives."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "Blades" },
        ]}
      />

      {/* Flex grades */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Flexibility grades"
            title="Four grades, one for every application."
            lede="Stiffer blades excel in heavy-duty applications; flexible blades are ideal for delicate work where manoeuvrability around bones and joints is critical."
          />

          <StiffnessGrades grades={flexGrades} className="mt-12" />

          <SourceNote className="mt-8">
            The four grades are the manufacturer&rsquo;s own, supplied as
            artwork with the range and reproduced here at page contrast.
          </SourceNote>

          <SourceNote className="mt-6">
            Flex grade is published per article number. Where the catalogue
            prints a grade against an article it appears on that
            product&rsquo;s page and in the blade stiffness filter; where it
            prints none, none is shown.
          </SourceNote>
        </Container>
      </Section>

      {/* Blade shapes */}
      <Section tone="alt" divided>
        <Container>
          <SectionHeading
            eyebrow="Blade shapes"
            title="Each shape optimised for a specific task."
            lede="Together, the shapes cover the entire fabrication process — from primal breakdown to final trimming, slicing and dicing."
          />

          <DefinitionGrid items={bladeShapes} className="mt-12" />

          <SourceNote className="mt-8">
            Blade shape descriptions are published by the manufacturer for the
            range as a whole, not per article number.
          </SourceNote>
        </Container>
      </Section>

      {/* Maintaining the edge */}
      <Section divided>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Maintenance"
                title="Using the sharpening steel."
              />
            </div>

            <div className="lg:col-span-7">
              <Prose>
                <p>
                  When a knife loses its sharpness, what usually happens is that
                  rather than chipping, the top of the edge bends to one side.
                  The sharpening steel works by aligning the edge back into a
                  central position.
                </p>
                <p>
                  To sharpen the knife, pull the knife&rsquo;s edge a few times
                  lightly against a sharpening steel at a 15&ndash;20 degree
                  angle, switching between both sides of the knife. The knife
                  should be placed against the steel at the same angle as the
                  cutting edge, and that angle must be maintained while drawing
                  the knife from the back to the tip. The last draw should be
                  very light.
                </p>
                <p>
                  Steels are available in different models, from coarser to
                  finer. A smooth polishing steel gives the knife edge maximum
                  sharpness by aligning the edge. Some steels also have a
                  coarser side used for grinding when the edge is worn down —
                  always finish sharpening with the polished surface.
                </p>
              </Prose>

              <SourceNote className="mt-8">
                General maintenance guidance from the manufacturer. Sharpening
                steels are not part of the current range.
              </SourceNote>

              <div className="mt-9">
                <Button href="/technology/handles" variant="secondary">
                  Handles and grip variants
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
