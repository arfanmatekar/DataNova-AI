import { NextResponse } from "next/server";
import { clearSessionCookie, getSessionUser } from "@/lib/auth";

export async function POST(request: Request) {
  const sessionUser = await getSessionUser(request as unknown as { cookies: { get(name: string): { value?: string } | undefined } });
  if (!sessionUser) {
    return NextResponse.json({ success: true });
  }

  return clearSessionCookie();
}
