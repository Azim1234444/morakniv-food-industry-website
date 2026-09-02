import "server-only";

import { createClient } from "@/lib/supabase/server";

export async function hasAuthenticatedAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getClaims();
    return !error && Boolean(data?.claims?.sub);
  } catch {
    return false;
  }
}
