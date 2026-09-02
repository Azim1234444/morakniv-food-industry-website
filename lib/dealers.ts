import "server-only";

import { createClient, SupabaseConfigurationError } from "@/lib/supabase/server";

export type Dealer = {
  id: string;
  company_name: string;
  address: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
};

export type DealerListResult =
  | { ok: true; dealers: Dealer[] }
  | { ok: false; reason: "not-configured" | "unavailable"; dealers: [] };

export function phoneHref(phoneNumber: string): string {
  const trimmed = phoneNumber.trim();
  const digits = trimmed.replace(/\D/g, "");
  return `tel:${trimmed.startsWith("+") ? "+" : ""}${digits}`;
}

export async function getDealers(): Promise<DealerListResult> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("dealers")
      .select(
        "id, company_name, address, phone_number, created_at, updated_at",
      )
      .order("company_name", { ascending: true });

    if (error) {
      console.error("[dealers] fetch failed");
      return { ok: false, reason: "unavailable", dealers: [] };
    }

    return { ok: true, dealers: (data ?? []) as Dealer[] };
  } catch (error) {
    if (error instanceof SupabaseConfigurationError) {
      return { ok: false, reason: "not-configured", dealers: [] };
    }

    console.error("[dealers] fetch failed");
    return { ok: false, reason: "unavailable", dealers: [] };
  }
}
