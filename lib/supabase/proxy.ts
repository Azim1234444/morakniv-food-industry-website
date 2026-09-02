import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

import { getSupabaseConfig } from "@/lib/supabase/config";

export async function refreshSupabaseSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const config = getSupabaseConfig();

  if (!config) {
    return { response, isAuthenticated: false };
  }

  const supabase = createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  try {
    const { data, error } = await supabase.auth.getClaims();
    return {
      response,
      isAuthenticated: !error && Boolean(data?.claims?.sub),
    };
  } catch {
    return { response, isAuthenticated: false };
  }
}
