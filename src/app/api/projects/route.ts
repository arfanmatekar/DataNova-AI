import { NextResponse } from "next/server";
import { createProject, getSessionUser, getUserProjects } from "@/lib/auth";

export async function GET(request: Request) {
  const sessionUser = await getSessionUser(request as unknown as { cookies: { get(name: string): { value?: string } | undefined } });
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ projects: await getUserProjects(sessionUser.email) });
}

export async function POST(request: Request) {
  const sessionUser = await getSessionUser(request as unknown as { cookies: { get(name: string): { value?: string } | undefined } });
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const project = await createProject(sessionUser.email, {
      name: String(body.name ?? ""),
      description: String(body.description ?? ""),
      status: String(body.status ?? "Planning") as "Planning" | "Active" | "Completed",
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Project creation failed." }, { status: 400 });
  }
}
