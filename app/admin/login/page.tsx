import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/LoginForm";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { hasAuthenticatedAdmin } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await hasAuthenticatedAdmin()) redirect("/admin/dealers");

  return (
    <Section tone="alt">
      <Container width="narrow">
        <div className="mx-auto max-w-md border border-line bg-surface p-6 shadow-sm sm:p-8">
          <p className="label-eyebrow text-ink-subtle">Akmal Station</p>
          <h1 className="mt-4 text-3xl font-medium tracking-tight text-ink">
            Admin sign in
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Sign in to manage the public dealer list.
          </p>
          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
