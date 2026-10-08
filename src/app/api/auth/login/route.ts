import { NextResponse } from "next/server";
import { loginUser, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session = await loginUser(String(body.email ?? ""), String(body.password ?? ""));
    const response = await setSessionCookie(session.user);
    return NextResponse.json({ user: session.user }, { status: 200, headers: response.headers });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Login failed." }, { status: 401 });
  }
}
