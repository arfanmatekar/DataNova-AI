import type { ReactNode } from "react";
import { Bell, Menu, Search, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export function PageShell({ children, onToggleTheme }: { children: ReactNode; onToggleTheme: () => void }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.18),transparent_35%),radial-gradient(circle_at_80%_15%,_rgba(59,130,246,0.12),transparent_30%),#f4f7ff] text-slate-900 transition-colors duration-300 dark:bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.24),transparent_30%),radial-gradient(circle_at_80%_15%,_rgba(59,130,246,0.18),transparent_32%),#020817] dark:text-white">
      <div className="mx-auto flex max-w-[1600px] gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <aside className="hidden w-72 shrink-0 lg:block">
          <GlassCard className="sticky top-5 flex h-[calc(100vh-2.5rem)] flex-col p-5">
            <div className="mb-10 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-lg shadow-violet-500/30">
                <Sparkles size={22} />
              </div>
              <div>
                <p className="text-lg font-bold">DataNova AI</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Learning intelligence</p>
              </div>
            </div>

            <nav className="space-y-2 text-sm font-medium">
              {[
                ["Overview", "Dashboard"],
                ["Learning Hub", "BookOpen"],
                ["AI Assistant", "Bot"],
                ["Datasets", "Database"],
                ["Visual Studio", "ChartNoAxesCombined"],
                ["Projects", "FolderKanban"],
                ["Interviews", "BriefcaseBusiness"],
                ["Resume Coach", "FileCheck"],
              ].map(([label, icon]) => (
                <a key={label} href={`#${label.toLowerCase().replace(/\s+/g, "-")}`} className="group flex items-center justify-between rounded-2xl border border-transparent px-3 py-2.5 transition hover:border-violet-500/20 hover:bg-violet-50 dark:hover:bg-violet-500/10">
                  <span className="flex items-center gap-3"><span className="text-lg">•</span>{label}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] text-slate-500 dark:bg-slate-800 dark:text-slate-300">{icon}</span>
                </a>
              ))}
            </nav>

            <div className="mt-auto rounded-3xl bg-gradient-to-br from-violet-600 to-blue-600 p-4 text-white shadow-2xl shadow-violet-500/20">
              <p className="text-xs uppercase tracking-[0.2em] text-violet-100">AI roadmap</p>
              <p className="mt-3 text-xl font-bold">Next milestone</p>
              <p className="mt-1 text-sm text-violet-100">Deploy production ML case study</p>
              <button className="mt-5 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold backdrop-blur">View path</button>
            </div>
          </GlassCard>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="mb-6 flex items-center justify-between gap-4 rounded-[28px] border border-white/40 bg-white/70 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/60">
            <div className="flex items-center gap-3 lg:hidden">
              <button className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 dark:bg-slate-800" aria-label="Open menu"><Menu size={18} /></button>
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 text-sm font-bold text-white">D</div>
            </div>
            <div className="hidden flex-1 items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-900/80 md:flex">
              <Search size={17} className="text-slate-400" />
              <input aria-label="Search" placeholder="Search courses, datasets, or projects" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onToggleTheme} className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700" aria-label="Toggle theme">
                <Sparkles size={18} />
              </button>
              <button className="relative grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200" aria-label="Notifications">
                <Bell size={18} />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-emerald-500" />
              </button>
              <div className="hidden items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 px-2 py-1.5 sm:flex dark:border-slate-800 dark:bg-slate-900/80">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold text-white">A</div>
                <div className="pr-1">
                  <p className="text-sm font-semibold">Aria</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Data Scientist</p>
                </div>
              </div>
            </div>
          </header>

          {children}
        </main>
      </div>
    </div>
  );
}
