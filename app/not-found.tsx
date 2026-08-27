import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { productCategories } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Section size="lg">
      <Container width="narrow">
        <p className="label-eyebrow flex items-center gap-3 text-ink-subtle">
          <span aria-hidden="true" className="inline-block h-px w-6 bg-brand" />
          Error 404
        </p>

        <h1 className="mt-5 text-3xl leading-tight font-medium text-ink md:text-4xl">
          This page isn&rsquo;t available.
        </h1>

        <p className="mt-5 text-base leading-relaxed text-ink-muted md:text-lg">
          The address may be mistyped, or the section may not be published yet
          — this site is being rolled out in stages.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/">Return home</Button>
          <Button href="/products" variant="secondary">
            Browse the range
          </Button>
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <h2 className="label-eyebrow text-ink-subtle">Product categories</h2>
          <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {productCategories.map((category) => (
              <li key={category.href}>
                <Link
                  href={category.href}
                  className="text-sm text-ink-muted underline-offset-4 transition-colors hover:text-brand hover:underline"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
