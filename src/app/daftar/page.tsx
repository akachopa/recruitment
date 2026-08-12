import { BrandMark } from "@/components/BrandMark";
import { RoleCard } from "@/components/auth/RoleCard";
import { Building2, Code2, UserRound } from "lucide-react";
import Link from "next/link";

export default function DaftarPage() {
  return (
    <div className="min-h-screen bg-[var(--canvas)] relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 onboarding-mesh" />
      <header className="relative z-10 mx-auto max-w-5xl px-5 py-5 flex items-center justify-between">
        <BrandMark />
        <Link href="/masuk" className="text-sm font-semibold text-[var(--brand)]">
          Masuk
        </Link>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-5 py-8 sm:py-16">
        <div className="max-w-2xl mb-10 animate-rise">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)] mb-3">
            Registrasi
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl tracking-tight text-[var(--ink)]">
            Siapa yang ingin Anda daftarkan?
          </h1>
          <p className="mt-4 text-[var(--muted)] text-base sm:text-lg">
            Pilih peran untuk memulai. Form dan onboarding disesuaikan agar Anda langsung siap memakai Hireloop.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <RoleCard
            href="/daftar/developer"
            title="Developer"
            description="Akses API, sandbox, dan dokumentasi integrasi hiring."
            icon={Code2}
            accent="slate"
          />
          <RoleCard
            href="/daftar/perusahaan"
            title="Perusahaan"
            description="Kelola lowongan, kandidat, pipeline, interview, dan offer."
            icon={Building2}
            accent="teal"
            delay="80ms"
          />
          <RoleCard
            href="/daftar/pelamar"
            title="Pelamar"
            description="Buat profil kandidat dan lamar pekerjaan dengan mudah."
            icon={UserRound}
            accent="orange"
            delay="160ms"
          />
        </div>
      </main>
    </div>
  );
}
