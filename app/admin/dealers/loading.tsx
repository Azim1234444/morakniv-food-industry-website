import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export default function AdminDealersLoading() {
  return (
    <Section>
      <Container>
        <p role="status" className="text-sm text-ink-muted">
          Loading dealer management…
        </p>
      </Container>
    </Section>
  );
}
