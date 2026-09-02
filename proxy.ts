import { type NextRequest, NextResponse } from "next/server";

import { refreshSupabaseSession } from "@/lib/supabase/proxy";

function redirectWithCookies(destination: URL, source: NextResponse) {
  const redirectResponse = NextResponse.redirect(destination);
  source.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie);
  });
  return redirectResponse;
}

export async function proxy(request: NextRequest) {
  const { response, isAuthenticated } =
    await refreshSupabaseSession(request);
  const isLogin = request.nextUrl.pathname === "/admin/login";

  if (isLogin && isAuthenticated) {
    return redirectWithCookies(
      new URL("/admin/dealers", request.url),
      response,
    );
  }

  if (!isLogin && !isAuthenticated) {
    return redirectWithCookies(new URL("/admin/login", request.url), response);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
