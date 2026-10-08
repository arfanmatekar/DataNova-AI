"use client";

import { useState } from "react";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  ChartColumn,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  Clock3,
  Download,
  FileCheck,
  Filter,
  GitBranch,
  GraduationCap,
  Mic,
  MoreHorizontal,
  Play,
  Search,
  Send,
  Sparkles,
  Star,
  Target,
  Trophy,
  Upload,
  Wand2,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GlassCard } from "@/components/ui/glass-card";
import { PageShell } from "@/components/ui/page-shell";
import { ScoreRing } from "@/components/ui/score-ring";
import { SectionHeading } from "@/components/ui/section-heading";
import { aiMessages, datasets, interviewQuestions, learningPaths, learningStats, projects, resumeInsights } from "@/data/platform";
import { analyzeUploadedFile, type FileAnalysis } from "@/lib/file-analysis";

const chartData = [
  { name: "Jan", score: 58, completion: 41 },
  { name: "Feb", score: 64, completion: 48 },
  { name: "Mar", score: 71, completion: 55 },
  { name: "Apr", score: 76, completion: 63 },
  { name: "May", score: 82, completion: 68 },
  { name: "Jun", score: 89, completion: 74 },
];

const skillBreakdown = [
  { name: "Python", value: 92, color: "#7c3aed" },
  { name: "ML", value: 88, color: "#2563eb" },
  { name: "SQL", value: 81, color: "#14b8a6" },
  { name: "Power BI", value: 76, color: "#f59e0b" },
];

const activityData = [
  { name: "Mon", value: 18 },
  { name: "Tue", value: 26 },
  { name: "Wed", value: 21 },
  { name: "Thu", value: 32 },
  { name: "Fri", value: 29 },
  { name: "Sat", value: 41 },
  { name: "Sun", value: 26 },
];

const pieData = [
  { name: "Learning", value: 42 },
  { name: "Projects", value: 31 },
  { name: "Practice", value: 17 },
  { name: "AI Support", value: 10 },
];

function StatCard({ label, value, detail, change }: { label: string; value: string; detail: string; change: string }) {
  return (
    <GlassCard className="p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_80px_rgba(76,29,149,0.18)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</p>
        </div>
        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">{change}</span>
      </div>
      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">{detail}</p>
    </GlassCard>
  );
}

function CourseCard({ course }: { course: (typeof learningPaths)[number] }) {
  return (
    <GlassCard className="p-4">
      <div className={`mb-4 h-28 rounded-2xl bg-gradient-to-br ${course.accent}`} />
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">{course.category}</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">{course.level}</span>
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">{course.title}</h3>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>{course.lessons} lessons</span>
        <span>{course.duration}</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div className={`h-full rounded-full bg-gradient-to-r ${course.accent}`} style={{ width: `${course.progress}%` }} />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
        <span>{course.progress}% complete</span>
        <button aria-label={`Continue ${course.title}`} className="rounded-full bg-slate-100 p-2 dark:bg-slate-800"><Play size={13} className="fill-current" /></button>
      </div>
    </GlassCard>
  );
}

function Tag({ children }: { children: string }) {
  return <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[10px] font-medium text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-200">{children}</span>;
}

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeTab, setActiveTab] = useState("Python");
  const [activeProject, setActiveProject] = useState("Beginner");
  const [query, setQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<FileAnalysis | null>(null);
  const [error, setError] = useState("");

  const filteredCourses = learningPaths.filter((course) => activeTab === "All" || course.category === activeTab);
  const visibleProjects = projects.filter((project) => activeProject === "All" || project.level === activeProject);

  const handleFileChange = async (file: File | undefined) => {
    if (!file) {
      return;
    }

    setIsAnalyzing(true);
    setError("");
    setAnalysis(null);

    try {
      const result = await analyzeUploadedFile(file);
      setAnalysis(result);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "The file could not be analyzed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <PageShell onToggleTheme={() => setTheme((current) => (current === "light" ? "dark" : "light"))}>
      <div className={`${theme === "dark" ? "dark" : ""}`}>
        <section className="mb-7 grid gap-4 xl:grid-cols-[1.4fr_0.6fr]">
          <GlassCard className="overflow-hidden p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-violet-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">Data science growth platform</span>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">+18.6% learning velocity</span>
            </div>
            <div className="mt-7 grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
              <div>
                <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-[-0.05em] text-slate-950 dark:text-white sm:text-6xl">Turn data curiosity into career momentum.</h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">Master Python, machine learning, analytics, and AI with guided projects, personalized feedback, and an intelligent mentor that adapts to your goals.</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-500/25 transition hover:-translate-y-0.5">Start learning <ArrowRight size={18} /></button>
                  <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-5 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">Explore roadmap</button>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-sm">
                <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-violet-500/20 to-blue-500/20 blur-2xl" />
                <div className="relative rounded-[32px] border border-white/60 bg-slate-950 p-5 shadow-2xl dark:border-slate-700">
                  <div className="mb-5 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400"><span>Career trajectory</span><span>Q3</span></div>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                    <div className="rounded-2xl bg-white/6 p-4">
                      <div className="flex items-center justify-between"><span className="text-slate-400">Skill score</span><Target size={16} className="text-violet-400" /></div>
                      <p className="mt-4 text-4xl font-bold text-white">86<span className="text-lg text-violet-400">%</span></p>
                      <p className="mt-2 text-xs text-emerald-400">+6 pts this month</p>
                    </div>
                    <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 p-4 text-white">
                      <p className="text-xs uppercase tracking-[0.18em] text-violet-100">Recommended next</p>
                      <p className="mt-3 text-xl font-bold">Deployable ML project</p>
                      <div className="mt-4 flex items-center justify-between text-xs text-violet-100"><span>7-day sprint</span><ChevronRight size={16} /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Weekly focus</p>
              <button className="rounded-full bg-slate-100 p-2 text-slate-500 dark:bg-slate-800 dark:text-slate-300"><MoreHorizontal size={16} /></button>
            </div>
            <ScoreRing value={86} label="skill" />
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-violet-50 p-3 dark:bg-violet-500/10"><p className="text-[10px] uppercase tracking-[0.18em] text-violet-600 dark:text-violet-200">Goal</p><p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">90%</p></div>
              <div className="rounded-2xl bg-blue-50 p-3 dark:bg-blue-500/10"><p className="text-[10px] uppercase tracking-[0.18em] text-blue-600 dark:text-blue-200">Streak</p><p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">18d</p></div>
            </div>
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
              <div className="flex items-center gap-2 font-semibold"><CheckCircle2 size={16} /> Completed milestone</div>
              <p className="mt-2 leading-6">Python for Data Science: 82% complete. Resume project is ready for polish.</p>
            </div>
          </GlassCard>
        </section>

        <section id="overview" className="mb-8 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          {learningStats.map((stat) => <StatCard key={stat.label} {...stat} />)}
        </section>

        <section className="mb-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <GlassCard className="p-5 sm:p-6">
            <SectionHeading eyebrow="Learning dashboard" title="Progress overview" description="Your strongest tracks, momentum, and projected completion trend." action={<button className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">This semester</button>} />
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ left: -16, right: 10, top: 10 }}>
                  <defs>
                    <linearGradient id="gradient-score" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7c3aed" stopOpacity={0.45} /><stop offset="95%" stopColor="#7c3aed" stopOpacity={0.02} /></linearGradient>
                    <linearGradient id="gradient-completion" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563eb" stopOpacity={0.45} /><stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#94a3b8" strokeOpacity={0.15} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="score" stroke="#7c3aed" strokeWidth={3} fill="url(#gradient-score)" />
                  <Area type="monotone" dataKey="completion" stroke="#2563eb" strokeWidth={3} fill="url(#gradient-completion)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6">
            <SectionHeading eyebrow="Skill map" title="Core strengths" description="Current capability distribution across your primary data science skills." />
            <div className="space-y-5">
              {skillBreakdown.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-2 flex items-center justify-between text-sm"><span className="font-medium text-slate-700 dark:text-slate-200">{skill.name}</span><span className="text-slate-500 dark:text-slate-400">{skill.value}%</span></div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"><div className="h-full rounded-full" style={{ width: `${skill.value}%`, background: skill.color }} /></div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-slate-950 p-4 text-white">
              <div className="flex items-center justify-between"><span className="text-xs uppercase tracking-[0.2em] text-slate-400">Recommended</span><Star size={14} className="text-yellow-400" /></div>
              <p className="mt-3 text-lg font-bold">Practice model interpretability</p>
              <p className="mt-1 text-sm text-slate-400">Complete SHAP lesson and submit a comparison notebook.</p>
            </div>
          </GlassCard>
        </section>

        <section id="learning-hub" className="mb-8">
          <SectionHeading eyebrow="Learning hub" title="Data science paths" description="Structured tracks designed to move from fundamentals to production-ready projects." action={<div className="flex flex-wrap gap-2">{["All", "Python", "Statistics", "Machine Learning", "Deep Learning", "Data Analytics", "SQL", "Power BI"].map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-full px-3 py-2 text-xs font-semibold transition ${activeTab === tab ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>{tab}</button>)}</div>} />
          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {filteredCourses.map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
        </section>

        <section id="ai-assistant" className="mb-8 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <GlassCard className="p-5 sm:p-6">
            <SectionHeading eyebrow="AI mentor" title="Ask DataNova" description="Get guidance on concepts, code, experiments, and project decisions." />
            <div className="space-y-3">
              {aiMessages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`max-w-[85%] rounded-2xl p-3 text-sm leading-6 ${message.role === "assistant" ? "bg-violet-50 text-slate-700 dark:bg-violet-500/10 dark:text-violet-100" : "ml-auto bg-slate-950 text-white dark:bg-white dark:text-slate-950"}`}>
                  {message.text}
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900">
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ask about your next model..." className="w-full bg-transparent px-2 py-2 text-sm outline-none placeholder:text-slate-400" />
              <button className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white"><Send size={16} /></button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {[
                "Explain XGBoost", "Generate notebook", "Project roadmap", "Model evaluation"
              ].map((prompt) => <button key={prompt} className="rounded-full border border-slate-200 px-2.5 py-1.5 text-slate-600 hover:border-violet-300 hover:text-violet-700 dark:border-slate-700 dark:text-slate-300">{prompt}</button>)}
            </div>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6">
            <SectionHeading eyebrow="AI-powered workflow" title="Your next best action" description="A guided plan based on your current progress and learning goals." />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: BrainCircuit, title: "Concept review", detail: "SHAP feature explainability", accent: "from-violet-500/15 to-purple-100" },
                { icon: Wand2, title: "Code generation", detail: "Pipeline notebook template", accent: "from-blue-500/15 to-cyan-100" },
                { icon: ChartColumn, title: "Experimentation", detail: "A/B validation plan", accent: "from-emerald-500/15 to-teal-100" },
                { icon: GraduationCap, title: "Portfolio story", detail: "Positioning and outcomes", accent: "from-amber-500/15 to-orange-100" },
              ].map(({ icon: Icon, title, detail, accent }) => (
                <div key={title} className={`rounded-2xl border border-white/40 bg-gradient-to-br ${accent} p-4 dark:border-slate-700`}>
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-white text-violet-600 shadow-sm dark:bg-slate-900"><Icon size={20} /></div>
                  <p className="mt-4 font-semibold text-slate-900 dark:text-white">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-3xl bg-gradient-to-r from-slate-950 via-violet-950 to-blue-950 p-5 text-white">
              <div className="flex items-start justify-between gap-3"><div><p className="text-xs uppercase tracking-[0.18em] text-violet-200">AI coach</p><p className="mt-2 text-xl font-bold">Build a production-ready churn model</p></div><Bot size={26} className="text-violet-300" /></div>
              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-300">Your next session should combine preprocessing, class balancing, baseline selection, explainability, and a deployment checklist.</p>
              <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950"><Sparkles size={16} /> Generate plan</button>
            </div>
          </GlassCard>
        </section>

        <section id="datasets" className="mb-8 grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
          <GlassCard className="p-5 sm:p-6">
            <SectionHeading eyebrow="Dataset library" title="Find a dataset" description="Explore curated, high-quality sources for experiments and portfolio work." />
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input placeholder="Search datasets" className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900" />
            </div>
            <div className="mt-5 space-y-3">
              {[
                ["Popular", "Synthetic data"], ["Healthcare", "Clinical"], ["Finance", "Risk"], ["Retail", "Forecasting"], ["Vision", "Computer vision"]
              ].map(([category, count]) => <button key={category} className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-700"><span>{category}</span><span className="rounded-full bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800">{count}</span></button>)}
            </div>
          </GlassCard>

          <div className="space-y-4">
            {datasets.map((dataset) => (
              <GlassCard key={dataset.title} className="p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">{dataset.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}<span className="text-xs text-slate-500 dark:text-slate-400">{dataset.category}</span></div>
                    <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{dataset.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-5 text-xs text-slate-500 dark:text-slate-400">
                      <span>{dataset.rows} rows</span><span>{dataset.size}</span><span>Updated {dataset.updated}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">{dataset.quality}</span>
                    <button className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"><Download size={16} /></button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section id="visual-studio" className="mb-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <GlassCard className="p-5 sm:p-6">
            <SectionHeading eyebrow="Data visualization" title="Interactive analytics" description="Track performance, engagement patterns, and business outcomes through visual stories." action={<button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"><Filter size={15} /> Filter</button>} />
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData} margin={{ left: -15, right: 8 }}>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#94a3b8" strokeOpacity={0.15} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6">
            <SectionHeading eyebrow="Dashboard builder" title="Portfolio mix" description="How your current learning time is distributed." />
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={52} outerRadius={80} paddingAngle={4}>
                    {pieData.map((entry, index) => <Cell key={entry.name} fill={["#7c3aed", "#2563eb", "#14b8a6", "#f59e0b"][index]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </section>

        <section id="projects" className="mb-8">
          <SectionHeading eyebrow="Project studio" title="Build real world experience" description="Practice with guided, progressively challenging projects connected to your career goals." action={<div className="flex flex-wrap gap-2">{["All", "Beginner", "Intermediate", "Advanced"].map((level) => <button key={level} onClick={() => setActiveProject(level)} className={`rounded-full px-3 py-2 text-xs font-semibold ${activeProject === level ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>{level}</button>)}</div>} />
          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {visibleProjects.map((project) => (
              <GlassCard key={project.title} className="group p-5 transition hover:-translate-y-1 hover:border-violet-200 dark:hover:border-violet-500/30">
                <div className="flex items-center justify-between"><span className="rounded-full bg-violet-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-700 dark:bg-violet-500/10 dark:text-violet-200">{project.level}</span><span className="text-xs text-slate-500 dark:text-slate-400">{project.category}</span></div>
                <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">{project.tools.map((tool) => <Tag key={tool}>{tool}</Tag>)}</div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {project.metrics.map((metric) => <div key={metric.label} className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900"><p className="text-[10px] uppercase tracking-[0.15em] text-slate-400">{metric.label}</p><p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{metric.value}</p></div>)}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-700"><span className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Clock3 size={14} /> {project.duration}</span><button className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-2 text-xs font-semibold text-white dark:bg-white dark:text-slate-950">Open project <ArrowRight size={14} /></button></div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section id="interviews" className="mb-8 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <GlassCard className="p-5 sm:p-6">
            <SectionHeading eyebrow="Interview prep" title="Practice smarter" description="Target the questions most likely to appear in data science interviews." />
            <div className="space-y-3">
              {[
                "MCQs", "Coding questions", "ML concepts", "Mock interviews"
              ].map((item) => <button key={item} className="flex w-full items-center justify-between rounded-2xl border border-slate-200 p-4 text-left text-sm font-medium dark:border-slate-700"><span>{item}</span><ChevronRight size={16} /></button>)}
            </div>
            <div className="mt-5 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 p-4 text-white"><div className="flex items-center justify-between"><p className="font-semibold">Interview readiness</p><Trophy size={18} /></div><p className="mt-3 text-3xl font-bold">78%</p><p className="mt-1 text-xs text-violet-100">6 sessions left to reach target</p></div>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6">
            <div className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-[0.2em] text-violet-500 dark:text-violet-300">Today&apos;s challenge</p><h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Interview drill</h3></div><button className="rounded-full bg-violet-50 p-2 text-violet-700 dark:bg-violet-500/10 dark:text-violet-200"><Mic size={17} /></button></div>
            <div className="mt-6 space-y-4">
              {interviewQuestions.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-slate-950 text-xs font-bold text-white dark:bg-white dark:text-slate-950">{item.type}</div>
                  <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{item.question}</p><div className="mt-2 flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400"><span>{item.difficulty}</span><CircleDashed size={12} /><span>{item.duration}</span></div></div>
                  <button className="rounded-full bg-slate-100 p-2 text-slate-600 dark:bg-slate-800 dark:text-slate-300"><Play size={14} /></button>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        <section id="resume-coach" className="mb-8 grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
          <GlassCard className="p-5 sm:p-6">
            <SectionHeading eyebrow="File workspace" title="Upload and inspect files" description="Analyze supported documents and datasets directly in your browser." />
            <label className="mt-3 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-violet-300 bg-violet-50 px-5 text-center transition hover:border-violet-500 hover:bg-violet-100 dark:border-violet-500/30 dark:bg-violet-500/10 dark:hover:bg-violet-500/15">
              <input
                type="file"
                accept=".pdf,.docx,.txt,.csv,.json"
                className="hidden"
                onChange={(event) => handleFileChange(event.target.files?.[0])}
              />
              <Upload className="text-violet-600 dark:text-violet-200" size={28} />
              <span className="mt-3 font-semibold text-slate-800 dark:text-slate-100">Drop a file here or browse</span>
              <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">CSV, JSON, TXT, PDF, or DOCX — up to 5 MB</span>
            </label>
            <button
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950"
              onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
              disabled={isAnalyzing}
            >
              <FileCheck size={16} />
              {isAnalyzing ? "Analyzing file..." : "Choose file"}
            </button>

            {error ? (
              <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
                {error}
              </div>
            ) : null}

            {analysis ? (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-violet-500 dark:text-violet-300">Analysis result</p>
                    <h4 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{analysis.name}</h4>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold uppercase text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">{analysis.type}</span>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{analysis.summary}</p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-white p-3 dark:bg-slate-950"><span className="text-slate-500 dark:text-slate-400">Size</span><p className="mt-1 font-semibold">{(analysis.size / 1024 / 1024).toFixed(2)} MB</p></div>
                  <div className="rounded-xl bg-white p-3 dark:bg-slate-950"><span className="text-slate-500 dark:text-slate-400">Records</span><p className="mt-1 font-semibold">{analysis.recordCount}</p></div>
                </div>
                {analysis.columns.length > 0 ? (
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Columns</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {analysis.columns.map((column) => <span key={column} className="rounded-full bg-violet-100 px-2.5 py-1 text-xs text-violet-700 dark:bg-violet-500/10 dark:text-violet-200">{column}</span>)}
                    </div>
                  </div>
                ) : null}
                {analysis.preview.length > 0 ? (
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Preview</p>
                    <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950 p-3 text-xs leading-6 text-slate-200">{analysis.preview.join("\n")}</pre>
                  </div>
                ) : null}
              </div>
            ) : null}
          </GlassCard>

          <GlassCard className="p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="text-xs uppercase tracking-[0.2em] text-violet-500 dark:text-violet-300">Tailored insights</p><h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Strong match</h3></div>
              <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"><GitBranch size={15} /> View detailed report</button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {resumeInsights.map((insight) => (
                <div key={insight.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
                  <div className="flex items-center justify-between"><p className="text-sm font-semibold text-slate-900 dark:text-white">{insight.title}</p><span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${insight.priority === "High" ? "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200" : insight.priority === "Medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200"}`}>{insight.priority}</span></div>
                  <div className="mt-4 flex items-end justify-between"><p className="text-3xl font-bold text-slate-900 dark:text-white">{insight.score}</p><span className="text-[10px] uppercase tracking-[0.15em] text-slate-400">/100</span></div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-500" style={{ width: `${insight.score}%` }} /></div>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{insight.detail}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        <section className="pb-4">
          <GlassCard className="p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="text-xs uppercase tracking-[0.2em] text-violet-500 dark:text-violet-300">Weekly momentum</p><h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Stay consistent, keep shipping.</h2></div>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Clock3 size={16} /> 4h 32m this week</div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-violet-50 p-5 dark:bg-violet-500/10"><p className="text-sm text-violet-700 dark:text-violet-200">Learning time</p><p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">2.8h</p><p className="mt-1 text-xs text-emerald-600 dark:text-emerald-300">+31% vs. last week</p></div>
              <div className="rounded-2xl bg-blue-50 p-5 dark:bg-blue-500/10"><p className="text-sm text-blue-700 dark:text-blue-200">Practice sessions</p><p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">5</p><p className="mt-1 text-xs text-emerald-600 dark:text-emerald-300">2 completed</p></div>
              <div className="rounded-2xl bg-emerald-50 p-5 dark:bg-emerald-500/10"><p className="text-sm text-emerald-700 dark:text-emerald-200">Projects shipped</p><p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">2</p><p className="mt-1 text-xs text-emerald-600 dark:text-emerald-300">Ready for portfolio</p></div>
            </div>
          </GlassCard>
        </section>
      </div>
    </PageShell>
  );
}
