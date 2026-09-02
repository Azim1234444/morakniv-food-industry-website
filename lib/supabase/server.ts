import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { getSupabaseConfig } from "@/lib/supabase/config";

export class SupabaseConfigurationError extends Error {
  constructor() {
    super("Supabase is not configured.");
    this.name = "SupabaseConfigurationError";
  }
}

export async function createClient() {
  const config = getSupabaseConfig();
  if (!config) throw new SupabaseConfigurationError();

  const cookieStore = await cookies();

  return createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Server Components cannot write cookies. The proxy refreshes them.
        }
      },
    },
  });
}
