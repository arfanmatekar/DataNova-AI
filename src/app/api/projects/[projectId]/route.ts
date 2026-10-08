import { NextResponse } from "next/server";
import { deleteProject, getSessionUser } from "@/lib/auth";

export async function DELETE(request: Request, { params }: { params: Promise<{ projectId: string }> }) {
  const sessionUser = await getSessionUser(request as unknown as { cookies: { get(name: string): { value?: string } | undefined } });
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { projectId } = await params;
    await deleteProject(sessionUser.email, projectId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Project deletion failed." }, { status: 400 });
  }
}
