import { BrandMark } from "@/components/BrandMark";
import Link from "next/link";
import type { ReactNode } from "react";

export function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--canvas)]">
      <header className="border-b border-[var(--line)] bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-3xl px-5 py-4 flex items-center justify-between">
          <BrandMark />
          <Link href="/daftar" className="text-sm font-semibold text-[var(--brand)]">
            Kembali daftar
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
        <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl tracking-tight text-[var(--ink)]">
          {title}
        </h1>
        <div className="mt-8 space-y-5 text-sm sm:text-base leading-relaxed text-[var(--muted)]">
          {children}
        </div>
      </main>
    </div>
  );
}
