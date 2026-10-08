import type { ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/15 bg-white/8 text-slate-900 shadow-[0_20px_70px_rgba(15,23,42,0.18)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/55 dark:text-white ${className}`}
    >
      {children}
    </div>
  );
}
