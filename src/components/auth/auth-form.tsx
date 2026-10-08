"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Lock, Mail, UserRound } from "lucide-react";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const body = mode === "login" ? { email, password } : { name, email, password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error ?? "Authentication failed.");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Authentication failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-screen bg-slate-950 lg:grid-cols-2">
      <div className="hidden flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.28),transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.22),transparent_30%),#09090b] p-10 lg:flex">
        <div className="flex items-center gap-3 text-white">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 font-bold shadow-2xl shadow-violet-500/30">D</div>
          <div>
            <p className="text-xl font-bold">DataNova AI</p>
            <p className="text-sm text-slate-400">Professional learning workspace</p>
          </div>
        </div>

        <div className="max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-300">Built for growth</p>
          <h1 className="mt-6 text-5xl font-black tracking-tight text-white">One workspace for every idea, project, and learner.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">Organize your data science journey, manage multiple projects, and track progress from one secure dashboard.</p>
          <div className="mt-10 grid grid-cols-3 gap-3 text-sm text-slate-200">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="font-bold">Multi-project</p><p className="mt-2 text-xs text-slate-400">Unlimited workspaces</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="font-bold">Secure</p><p className="mt-2 text-xs text-slate-400">Private sessions</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="font-bold">Organized</p><p className="mt-2 text-xs text-slate-400">Clear progress</p></div>
          </div>
        </div>

        <p className="text-sm text-slate-500">© 2026 DataNova AI. Professional platform for data learners.</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md rounded-[28px] border border-slate-800 bg-slate-900/80 p-7 shadow-2xl shadow-black/30 backdrop-blur xl:p-9">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">{mode === "login" ? "Welcome back" : "Create account"}</p>
            <h2 className="mt-3 text-3xl font-bold text-white">{mode === "login" ? "Sign in to your workspace" : "Get started today"}</h2>
            <p className="mt-2 text-sm text-slate-400">{mode === "login" ? "Continue managing your learning projects." : "Create your account in less than a minute."}</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {mode === "register" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">Full name</span>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 focus-within:border-violet-500">
                  <UserRound size={18} className="text-slate-500" />
                  <input value={name} onChange={(event) => setName(event.target.value)} required className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500" placeholder="Aisha Khan" />
                </div>
              </label>
            ) : null}

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">Email address</span>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 focus-within:border-violet-500">
                <Mail size={18} className="text-slate-500" />
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500" placeholder="you@example.com" />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">Password</span>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 focus-within:border-violet-500">
                <Lock size={18} className="text-slate-500" />
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500" placeholder="At least 8 characters" />
              </div>
            </label>

            {error ? <p className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">{error}</p> : null}

            <button disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3.5 font-semibold text-white shadow-xl shadow-violet-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-400">
            {mode === "login" ? "New to DataNova AI?" : "Already have an account?"} {" "}
            <Link href={mode === "login" ? "/register" : "/login"} className="font-semibold text-violet-300 hover:text-violet-200">{mode === "login" ? "Create an account" : "Sign in"}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
