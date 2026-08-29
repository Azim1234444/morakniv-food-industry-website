import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/content/PageHeader";
import { SourceNote } from "@/components/content/SourceNote";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { technologySections } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Swedish stainless steel, four blade flexibility grades, Alleima® 10C28Mo2 hardened to 57 HRC, handle variants and traceability — the engineering behind Morakniv food industry knives.",
  alternates: { canonical: "/technology" },
  openGraph: {
    title: "Technology — Morakniv Food Industry",
    description:
      "Steel, blades, handles and traceability behind Morakniv professional food industry knives.",
    url: "/technology",
  },
};

/* Catalogue p.5 states these four as the product pillars. */
const pillars = [
  "Made in Mora, Sweden since 1891",
  "Exceptional quality vs. price ratio",
  "Full traceability & European sourced materials",
  "Fossil free energy in production",
];

export default function TechnologyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Technology"
        title="Advanced metallurgy and precision engineering."
        lede="Morakniv's industrial food knives combine advanced metallurgy and precision engineering to ensure durability, versatility, sustainable cost-efficiency and compliance with food safety standards."
        crumbs={[{ label: "Home", href: "/" }, { label: "Technology" }]}
      />

      <Section>
        <Container>
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <li
                key={pillar}
                className="bg-surface p-6 text-sm leading-relaxed text-ink-muted"
              >
                <span
                  aria-hidden="true"
                  className="mb-4 block h-px w-6 bg-brand"
                />
                {pillar}
              </li>
            ))}
          </ul>

          <SourceNote className="mt-6">
            Source: <em>Morakniv Professional Food Industry Knives 2026</em>,
            p.5.
          </SourceNote>

          <div className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2">
            {technologySections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group flex flex-col bg-surface p-7 transition-colors duration-150 hover:bg-surface-alt md:p-8"
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="text-xl leading-snug font-medium text-ink">
                    {section.label}
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="mt-1.5 h-3.5 w-3.5 shrink-0 text-line-strong transition-colors group-hover:text-brand"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <path d="M3 13 13 3M6 3h7v7" strokeLinecap="square" />
                  </svg>
                </span>

                <span className="mt-4 text-sm leading-relaxed text-ink-muted">
                  {section.summary}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
