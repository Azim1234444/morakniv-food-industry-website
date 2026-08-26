import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  lede?: ReactNode;
  crumbs: Crumb[];
  /** Optional actions rendered under the lede. */
  children?: ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  lede,
  crumbs,
  children,
}: PageHeaderProps) {
  return (
    <div className="border-b border-line bg-surface-alt">
      <Container>
        <div className="py-10 md:py-14">
          <Breadcrumbs items={crumbs} />

          <div className="mt-8 max-w-3xl">
            {eyebrow && (
              <p className="label-eyebrow mb-5 flex items-center gap-3 text-ink-subtle">
                <span
                  aria-hidden="true"
                  className="inline-block h-px w-6 bg-brand"
                />
                {eyebrow}
              </p>
            )}

            <h1 className="text-[2.125rem] leading-[1.08] font-medium tracking-tight text-ink sm:text-[2.5rem] lg:text-[3rem]">
              {title}
            </h1>

            {lede && (
              <div className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted lg:text-lg">
                {lede}
              </div>
            )}

            {children && <div className="mt-8">{children}</div>}
          </div>
        </div>
      </Container>
    </div>
  );
}
