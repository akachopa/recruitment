"use client";

import { BrandMark } from "@/components/BrandMark";
import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
  asideTitle?: string;
  asideBody?: string;
  asidePoints?: string[];
  footerNote?: ReactNode;
};

export function AuthShell({
  title,
  subtitle,
  children,
  asideTitle = "Rekrutmen yang lebih jelas",
  asideBody = "Dari lowongan hingga keputusan hire—satu alur yang terdokumentasi untuk perusahaan, pelamar, dan developer.",
  asidePoints = [
    "Multi-tenant & aman",
    "Pipeline yang bisa dikustom",
    "AI sebagai asisten, bukan hakim",
  ],
  footerNote,
}: Props) {
  return (
    <div className="min-h-screen grid lg:grid-cols-[1.05fr_0.95fr]">
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden p-10 text-white auth-aside">
        <div className="absolute inset-0 auth-aside-pattern opacity-40" />
        <div className="absolute -right-20 top-24 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl animate-float" />
        <div className="absolute -left-16 bottom-10 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl animate-float-delayed" />

        <div className="relative z-10">
          <BrandMark light />
        </div>

        <div className="relative z-10 max-w-md space-y-6 animate-rise">
          <p className="text-sm uppercase tracking-[0.2em] text-teal-100/80">
            Platform rekrutmen
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl xl:text-5xl leading-[1.05] tracking-tight">
            {asideTitle}
          </h1>
          <p className="text-teal-50/90 text-base leading-relaxed">{asideBody}</p>
          <ul className="space-y-3 pt-2">
            {asidePoints.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm text-teal-50">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-300" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-sm text-teal-100/70">
          Sudah punya akun?{" "}
          <Link href="/masuk" className="text-white underline underline-offset-4">
            Masuk
          </Link>
        </p>
      </aside>

      <main className="relative flex flex-col bg-[var(--canvas)]">
        <div className="flex items-center justify-between px-5 py-4 lg:hidden border-b border-[var(--line)] bg-white/70 backdrop-blur">
          <BrandMark />
          <Link href="/masuk" className="text-sm font-semibold text-[var(--brand)]">
            Masuk
          </Link>
        </div>

        <div className="flex flex-1 items-start sm:items-center justify-center px-5 py-8 sm:py-12">
          <div className="w-full max-w-lg animate-rise">
            <div className="mb-8">
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl tracking-tight text-[var(--ink)]">
                {title}
              </h2>
              <p className="mt-2 text-[var(--muted)]">{subtitle}</p>
            </div>
            {children}
            {footerNote ? (
              <div className="mt-8 text-sm text-[var(--muted)]">{footerNote}</div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
