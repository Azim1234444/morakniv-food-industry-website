import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/content/PageHeader";
import { SourceNote } from "@/components/content/SourceNote";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { newsItems } from "@/lib/news";

export const metadata: Metadata = {
  title: "News",
  description:
    "Announcements and press materials from Morakniv AB relating to the professional food industry range.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "News — Morakniv Food Industry",
    description:
      "Announcements and press materials from Morakniv AB relating to the food industry range.",
    url: "/news",
  },
};

export default function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="News"
        title="Announcements"
        lede="Press materials issued by Morakniv AB. Items are reproduced from the manufacturer's own releases."
        crumbs={[{ label: "Home", href: "/" }, { label: "News" }]}
      />

      <Section>
        <Container>
          <ul className="border-t border-line">
            {newsItems.map((item) => (
              <li key={item.slug} className="border-b border-line">
                <article className="grid gap-4 py-8 sm:grid-cols-12 sm:gap-8 md:py-10">
                  <div className="sm:col-span-3 lg:col-span-2">
                    <p className="label-eyebrow text-ink-subtle">
                      <time dateTime={item.year}>{item.year}</time>
                    </p>
                    <p className="mt-2 text-xs text-ink-subtle">
                      {item.source}
                    </p>
                  </div>

                  <div className="sm:col-span-9 lg:col-span-10">
                    <h2 className="max-w-3xl text-xl leading-snug font-medium text-ink lg:text-2xl">
                      <Link
                        href={item.href}
                        className="underline-offset-4 transition-colors hover:text-brand hover:underline"
                      >
                        {item.title}
                      </Link>
                    </h2>

                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
                      {item.summary}
                    </p>

                    <p className="mt-5">
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-2 text-sm font-medium text-ink underline underline-offset-4 transition-colors hover:text-brand"
                      >
                        Read the release
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 8 12"
                          className="h-2.5 w-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M1.5 1 6.5 6l-5 5" strokeLinecap="square" />
                        </svg>
                      </Link>
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <SourceNote className="mt-10">
            Where a release states the date a change takes effect, that date
            appears in the item itself.
          </SourceNote>
        </Container>
      </Section>
    </>
  );
}
