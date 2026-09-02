import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export default function DealersLoading() {
  return (
    <Section>
      <Container>
        <p role="status" className="text-sm text-ink-muted">
          Loading dealer information…
        </p>
      </Container>
    </Section>
  );
}
