import { redirect } from "next/navigation";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { getSessionUser, getUserProjects } from "@/lib/auth";

export const metadata = {
  title: "Dashboard | DataNova AI",
  description: "Your DataNova AI professional workspace.",
};

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  const projects = await getUserProjects(user.email);
  return <DashboardContent user={user} projects={projects} />;
}
