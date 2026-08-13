"use client";

import { BrandMark } from "@/components/BrandMark";
import { ProgressSteps } from "@/components/ui/ProgressSteps";
import Link from "next/link";
import type { ReactNode } from "react";

type Step = { id: string; title: string };

type Props = {
  roleLabel: string;
  steps: Step[];
  current: number;
  children: ReactNode;
  title: string;
  description: string;
};

export function OnboardingShell({
  roleLabel,
  steps,
  current,
  children,
  title,
  description,
}: Props) {
  return (
    <div className="min-h-screen bg-[var(--canvas)] relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 onboarding-mesh opacity-70" />
      <div className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-teal-300/20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-orange-300/15 blur-3xl animate-float-delayed" />

      <header className="relative z-10 border-b border-[var(--line)]/70 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-5xl px-5 py-4 flex items-center justify-between gap-4">
          <BrandMark />
          <div className="text-sm text-[var(--muted)]">
            Onboarding · <span className="font-semibold text-[var(--ink)]">{roleLabel}</span>
          </div>
          <Link href="/" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)]">
            Keluar
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-5 py-8 sm:py-12">
        <ProgressSteps steps={steps} current={current} className="mb-10" />

        <div className="rounded-[1.75rem] border border-white/80 bg-white/85 backdrop-blur-sm p-5 sm:p-8 shadow-[0_24px_60px_rgba(15,23,42,0.06)] animate-rise">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)] mb-3">
              Langkah {current + 1} dari {steps.length}
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl tracking-tight text-[var(--ink)]">
              {title}
            </h1>
            <p className="mt-3 text-[var(--muted)]">{description}</p>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
