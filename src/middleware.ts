import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookieName, readSessionCookie } from "@/lib/session";

const publicRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicRoutes.includes(pathname)) {
    const session = await readSessionCookie(request.cookies.get(getSessionCookieName())?.value);
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (pathname === "/api/auth/login" || pathname === "/api/auth/register" || pathname === "/api/auth/logout") {
    return NextResponse.next();
  }

  const session = await readSessionCookie(request.cookies.get(getSessionCookieName())?.value);
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", session.id);
  requestHeaders.set("x-user-email", session.email);
  requestHeaders.set("x-user-role", session.role);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
