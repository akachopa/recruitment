import Link from "next/link";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

type Props = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: "teal" | "orange" | "slate";
  delay?: string;
};

const accents = {
  teal: "from-teal-500/15 to-cyan-400/5 hover:border-teal-500/40",
  orange: "from-orange-500/15 to-amber-400/5 hover:border-orange-500/40",
  slate: "from-slate-500/15 to-slate-300/5 hover:border-slate-500/40",
};

export function RoleCard({
  href,
  title,
  description,
  icon: Icon,
  accent,
  delay = "0ms",
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)] animate-rise",
        accents[accent],
      )}
      style={{ animationDelay: delay }}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-[var(--ink)] border border-white">
          <Icon className="h-5 w-5" />
        </span>
        <ArrowRight className="h-5 w-5 text-[var(--muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--ink)]" />
      </div>
      <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] tracking-tight">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{description}</p>
    </Link>
  );
}
