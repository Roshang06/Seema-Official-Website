import { NextResponse } from "next/server";

export async function POST(req) {
  const { password } = await req.json();

  const correctPassword = process.env.ADMIN_PASSWORD;

  if (!correctPassword) {
    return NextResponse.json(
      { error: "Admin password not configured" },
      { status: 500 }
    );
  }

  if (password === correctPassword) {
    return NextResponse.json({
      token: "admin-token",
      message: "Login successful",
    });
  } else {
    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  }
}
