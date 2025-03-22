import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware = async (request: Readonly<NextRequest>) => {
  const origin = request.nextUrl.origin;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  requestHeaders.set("x-origin", origin);

  const response = NextResponse.next({
    request: {
      ...request,
      headers: requestHeaders,
    },
  });

  if (request.nextUrl.pathname === "/") {
    const cookie = request.cookies.get("meal");
    if (cookie?.value) {
      return NextResponse.redirect(
        new URL(`/${cookie?.value}`, origin),
      );
    }
  }
  
  return response;
};

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|public|cron|manifest.json).*)",
};