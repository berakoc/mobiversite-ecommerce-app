import { NextResponse } from "next/server";

export function middleware(request) {
  const authCookie = request.cookies.get("auth")?.value;

  if (!authCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/wishlist/:path*", "/api/orders/:path*"],
};
