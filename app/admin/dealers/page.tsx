import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { DealerManager } from "@/components/admin/DealerManager";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { PageHeader } from "@/components/content/PageHeader";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { signOut } from "@/lib/actions/dealers";
import { getDealers } from "@/lib/dealers";
import { hasAuthenticatedAdmin } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Dealer Management",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDealersPage() {
  if (!(await hasAuthenticatedAdmin())) redirect("/admin/login");

  const result = await getDealers();

  return (
    <>
      <PageHeader
        eyebrow="Akmal Station admin"
        title="Dealer Management"
        lede="Manage the company name, address and phone number published for each dealer."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Dealer Management" },
        ]}
      >
        <form action={signOut}>
          <LogoutButton />
        </form>
      </PageHeader>

      <Section>
        <Container>
          <DealerManager
            dealers={result.dealers}
            loadError={
              result.ok
                ? undefined
                : "The dealer list could not be loaded. Please try again."
            }
          />
        </Container>
      </Section>
    </>
  );
}
