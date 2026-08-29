import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/content/SectionHeading";
import { Button } from "@/components/ui/Button";

type CTAAction = { label: string; href: string };

type CTASectionProps = {
  eyebrow?: string;
  title: string;
  lede?: string;
  primary: CTAAction;
  secondary?: CTAAction;
  /**
   * A third, quieter action for bands that carry an off-site route alongside
   * the on-site one. Optional on purpose: most CTA bands are a two-button
   * decision, and a third button is only worth its weight where the extra
   * route is genuinely different in kind — not merely a second way to reach
   * the same page.
   */
  tertiary?: CTAAction;
};

export function CTASection({
  eyebrow,
  title,
  lede,
  primary,
  secondary,
  tertiary,
}: CTASectionProps) {
  return (
    <Section tone="dark" size="lg">
      <Container>
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            lede={lede}
            tone="dark"
          />

          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Button
              href={primary.href}
              size="lg"
              className="w-full sm:w-auto"
            >
              {primary.label}
            </Button>
            {secondary && (
              <Button
                href={secondary.href}
                variant="inverse"
                size="lg"
                className="w-full sm:w-auto"
              >
                {secondary.label}
              </Button>
            )}
            {tertiary && (
              <Button
                href={tertiary.href}
                variant="inverse"
                size="lg"
                className="w-full sm:w-auto"
              >
                {tertiary.label}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
