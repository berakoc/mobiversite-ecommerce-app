import { NextResponse } from "next/server";

export async function POST(request) {
  const { username, password } = await request.json();

  if (username === "demo" && password === "password") {
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    response.cookies.set("auth", "valid-user-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60,
    });

    return response;
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}
