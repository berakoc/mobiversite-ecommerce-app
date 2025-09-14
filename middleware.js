import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get("auth")?.value;

  const guestPaths = ["/login"];
  const protectedPaths = ["/profile", "/wishlist", "/api/orders"];

  if (guestPaths.includes(pathname) && authCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!authCookie && protectedPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/profile/:path*",
    "/wishlist/:path*",
    "/api/orders/:path*",
  ],
};
