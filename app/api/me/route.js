import { NextResponse } from "next/server";

export async function GET(req) {
  const authCookie = req.cookies.get("auth");
  const isLoggedIn = Boolean(authCookie);

  return NextResponse.json({ isLoggedIn });
}
