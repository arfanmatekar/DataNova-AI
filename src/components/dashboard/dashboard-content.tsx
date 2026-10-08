"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BarChart3, Bell, BriefcaseBusiness, CheckCircle2, FolderKanban, LogOut, Plus, Search, Sparkles, Target, UploadCloud } from "lucide-react";
import type { AppProject, SessionUser } from "@/lib/auth";

type DashboardContentProps = {
  user: SessionUser;
  projects: AppProject[];
};

const statusColors: Record<AppProject["status"], string> = {
  Planning: "bg-violet-500/10 text-violet-200 border-violet-500/20",
  Active: "bg-emerald-500/10 text-emerald-200 border-emerald-500/20",
  Completed: "bg-blue-500/10 text-blue-200 border-blue-500/20",
};

export function DashboardContent({ user, projects }: DashboardContentProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<AppProject["status"]>("Planning");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const [projectList, setProjectList] = useState(projects);

  async function handleCreateProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsCreating(true);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, status }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error ?? "Could not create project.");
      }

      setProjectList((current) => [result.project, ...current]);
      setName("");
      setDescription("");
      setStatus("Planning");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Could not create project.");
    } finally {
      setIsCreating(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  async function handleDeleteProject(projectId: string) {
    const response = await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
    if (!response.ok) {
      setError("Could not delete the project.");
      return;
    }

    setProjectList((current) => current.filter((project) => project.id !== projectId));
  }

  const totalProjects = projectList.length;
  const activeProjects = projectList.filter((project) => project.status === "Active").length;
  const completedProjects = projectList.filter((project) => project.status === "Completed").length;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-[28px] border border-slate-800 bg-slate-900/75 p-4 shadow-2xl shadow-black/20 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 font-bold">D</div>
            <div>
              <p className="font-bold">DataNova AI</p>
              <p className="text-xs text-slate-400">Professional workspace</p>
            </div>
          </div>

          <nav className="flex items-center gap-2 overflow-x-auto text-sm text-slate-300">
            <a className="rounded-xl bg-violet-500/10 px-3 py-2 text-violet-200" href="#overview">Overview</a>
            <a className="rounded-xl px-3 py-2 hover:bg-slate-800" href="#projects">Projects</a>
            <a className="rounded-xl px-3 py-2 hover:bg-slate-800" href="#create-project">New project</a>
          </nav>

          <div className="flex items-center gap-3">
            <button aria-label="Notifications" className="relative grid h-11 w-11 place-items-center rounded-2xl border border-slate-700 bg-slate-950"><Bell size={18} /><span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-emerald-400" /></button>
            <div className="hidden items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950 px-2 py-1.5 sm:flex">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold">{user.name.charAt(0)}</div>
              <div className="pr-1 text-left">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-[10px] text-slate-400">{user.email}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm hover:border-red-500/40 hover:text-red-300"><LogOut size={16} /> Sign out</button>
          </div>
        </header>

        <main className="pt-7">
          <section id="overview" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Total projects", value: totalProjects, icon: FolderKanban, accent: "from-violet-600 to-purple-600" },
              { label: "Active projects", value: activeProjects, icon: BriefcaseBusiness, accent: "from-emerald-600 to-teal-600" },
              { label: "Completed", value: completedProjects, icon: CheckCircle2, accent: "from-blue-600 to-cyan-600" },
              { label: "Learning score", value: "86%", icon: Target, accent: "from-amber-500 to-orange-500" },
            ].map(({ label, value, icon: Icon, accent }) => (
              <div key={label} className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-5">
                <div className={`mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-r ${accent}`}><Icon size={20} /></div>
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-3 text-3xl font-bold">{value}</p>
              </div>
            ))}
          </section>

          <section className="mt-7 grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Workspace</p>
                  <h2 className="mt-2 text-2xl font-bold">Welcome, {user.name.split(" ")[0]}</h2>
                </div>
                <Sparkles className="text-violet-300" />
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-400">Your professional learning workspace is ready. Create a new project, upload your work, and keep every initiative organized in one place.</p>
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-violet-100">Next milestone</p>
                <p className="mt-2 text-xl font-bold">Complete one portfolio-ready project</p>
                <p className="mt-2 text-sm text-violet-100">Ship a measurable result and add it to your professional profile.</p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 font-semibold text-slate-950"><UploadCloud size={17} /> Upload file</button>
                <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 font-semibold"><BarChart3 size={17} /> View analytics</button>
              </div>
            </div>

            <form id="create-project" onSubmit={handleCreateProject} className="rounded-3xl border border-slate-800 bg-slate-900/75 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-violet-300">New project</p>
                  <h2 className="mt-2 text-2xl font-bold">Create a project</h2>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-violet-500/10 text-violet-200"><Plus size={18} /></div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm text-slate-400">Project name</span>
                  <input value={name} onChange={(event) => setName(event.target.value)} required className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-violet-500" placeholder="Customer churn analysis" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm text-slate-400">Description</span>
                  <textarea value={description} onChange={(event) => setDescription(event.target.value)} required rows={3} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-violet-500" placeholder="Describe the business problem, data, and outcome you want to achieve." />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-slate-400">Status</span>
                  <select value={status} onChange={(event) => setStatus(event.target.value as AppProject["status"])} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-violet-500">
                    <option>Planning</option>
                    <option>Active</option>
                    <option>Completed</option>
                  </select>
                </label>
                <div className="flex items-end">
                  <button disabled={isCreating} className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-60">{isCreating ? "Creating..." : "Create project"}</button>
                </div>
              </div>
              {error ? <p className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">{error}</p> : null}
            </form>
          </section>

          <section id="projects" className="mt-7">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Your projects</p>
                <h2 className="mt-2 text-3xl font-bold">Multiple project workspace</h2>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-400">
                <Search size={16} />
                <span>Search projects</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {projectList.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/40 p-10 text-center md:col-span-2 xl:col-span-3">
                  <FolderKanban className="mx-auto text-slate-500" size={34} />
                  <p className="mt-4 font-semibold">No projects yet</p>
                  <p className="mt-2 text-sm text-slate-400">Create your first project to start organizing your work.</p>
                </div>
              ) : projectList.map((project) => (
                <article key={project.id} className="group rounded-3xl border border-slate-800 bg-slate-900/75 p-5 transition hover:-translate-y-1 hover:border-violet-500/30">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-xl font-bold">{project.name}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{project.description}</p>
                    </div>
                    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusColors[project.status]}`}>{project.status}</span>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-500">
                    <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
                    <button onClick={() => handleDeleteProject(project.id)} className="rounded-full bg-red-500/10 px-2.5 py-1.5 font-semibold text-red-300 hover:bg-red-500/20">Delete</button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
