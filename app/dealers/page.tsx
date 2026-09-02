import type { Metadata } from "next";

import { PageHeader } from "@/components/content/PageHeader";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { getDealers, phoneHref } from "@/lib/dealers";

export const metadata: Metadata = {
  title: "Find a dealer",
  description:
    "Find Morakniv Food Industry dealers in Malaysia and contact them directly.",
  alternates: { canonical: "/dealers" },
  openGraph: {
    title: "Find a dealer — Morakniv Food Industry",
    description:
      "Find Morakniv Food Industry dealers in Malaysia and contact them directly.",
    url: "/dealers",
  },
};

export const dynamic = "force-dynamic";

export default async function DealersPage() {
  const result = await getDealers();

  return (
    <>
      <PageHeader
        eyebrow="Malaysia dealer network"
        title="Find a dealer"
        lede="Find Morakniv Food Industry dealers in Malaysia. Contact a dealer directly using the details below."
        crumbs={[{ label: "Home", href: "/" }, { label: "Dealers" }]}
      />

      <Section>
        <Container>
          {!result.ok ? (
            <div className="max-w-3xl border-l-2 border-brand bg-brand-tint px-5 py-5">
              <h2 className="text-lg font-medium text-ink">
                Dealer information is temporarily unavailable
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Please contact Akmal Station for help finding a dealer.
              </p>
              <Button href="/contact" variant="secondary" className="mt-5">
                Contact Akmal Station
              </Button>
            </div>
          ) : result.dealers.length === 0 ? (
            <div className="max-w-3xl border border-line bg-surface-alt px-6 py-10 sm:px-8">
              <h2 className="text-xl font-medium text-ink">Dealer assistance</h2>
              <p className="mt-3 leading-relaxed text-ink-muted">
                No dealers are currently listed. Please contact Akmal Station
                for assistance.
              </p>
              <Button href="/contact" className="mt-6">
                Contact Akmal Station
              </Button>
            </div>
          ) : (
            <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {result.dealers.map((dealer) => (
                <li key={dealer.id} className="border border-line bg-surface p-6 sm:p-7">
                  <article className="flex h-full flex-col">
                    <h2 className="text-xl leading-snug font-medium text-ink">
                      {dealer.company_name}
                    </h2>
                    <address className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink-muted not-italic">
                      {dealer.address}
                    </address>
                    <p className="mt-6 border-t border-line pt-5">
                      <a
                        href={phoneHref(dealer.phone_number)}
                        className="inline-flex min-h-11 items-center text-base font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                      >
                        <span className="sr-only">Call {dealer.company_name} at </span>
                        {dealer.phone_number}
                      </a>
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>

      <Section tone="alt" size="sm" divided>
        <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-medium text-ink">Need assistance?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
              Akmal Station can help with product selection, availability and
              dealer enquiries.
            </p>
          </div>
          <Button href="/contact" variant="secondary" className="w-full shrink-0 sm:w-auto">
            Contact us
          </Button>
        </Container>
      </Section>
    </>
  );
}
