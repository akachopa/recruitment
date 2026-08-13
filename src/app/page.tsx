import { BrandMark } from "@/components/BrandMark";
import { RoleCard } from "@/components/auth/RoleCard";
import { Button } from "@/components/ui/Button";
import { Building2, Code2, UserRound } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <BrandMark light />
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/masuk"
              className="hidden sm:inline-flex text-sm font-semibold text-white/90 hover:text-white px-3 py-2"
            >
              Masuk
            </Link>
            <Link href="/daftar">
              <Button size="sm" className="bg-white text-[var(--ink)] hover:bg-teal-50 shadow-none">
                Daftar gratis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative min-h-[100svh] hero-plane text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -right-10 top-24 h-[28rem] w-[28rem] rounded-full border border-white/10 animate-float" />
          <div className="absolute right-16 top-40 h-64 w-64 rounded-[2rem] bg-gradient-to-br from-orange-400/30 to-transparent blur-2xl animate-shimmer" />
          <div className="absolute left-10 bottom-24 h-40 w-40 rounded-full bg-cyan-300/20 blur-2xl animate-float-delayed" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end sm:justify-center px-5 pb-16 pt-28 sm:pb-24">
          <div className="max-w-2xl animate-rise">
            <p className="mb-5 text-sm uppercase tracking-[0.22em] text-teal-100/90">
              Hireloop
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight">
              Rekrutmen yang lebih jelas dari hari pertama.
            </h1>
            <p className="mt-5 max-w-xl text-base sm:text-lg text-teal-50/90 leading-relaxed">
              Satu platform untuk perusahaan merekrut, pelamar melamar, dan developer
              mengintegrasikan alur hiring.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/daftar" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-[var(--ink)] hover:bg-teal-50 shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
                >
                  Mulai registrasi
                </Button>
              </Link>
              <Link href="#peran" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white/30 bg-white/10 text-white hover:bg-white/15 hover:border-white/50"
                >
                  Pilih peran Anda
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="peran" className="relative bg-[var(--canvas)] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl mb-10 sm:mb-14">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl tracking-tight text-[var(--ink)]">
              Daftar sesuai cara Anda memakai Hireloop
            </h2>
            <p className="mt-3 text-[var(--muted)]">
              Tiga jalur registrasi, masing-masing dengan onboarding yang relevan hingga siap dipakai.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            <RoleCard
              href="/daftar/developer"
              title="Developer"
              description="Bangun integrasi API, webhook, dan widget career page dengan sandbox key."
              icon={Code2}
              accent="slate"
              delay="0ms"
            />
            <RoleCard
              href="/daftar/perusahaan"
              title="Perusahaan"
              description="Buat organisasi, atur profil perusahaan, undang tim, dan siapkan lowongan pertama."
              icon={Building2}
              accent="teal"
              delay="80ms"
            />
            <RoleCard
              href="/daftar/pelamar"
              title="Pelamar"
              description="Lengkapi profil karier, unggah CV, dan temukan peluang yang cocok lebih cepat."
              icon={UserRound}
              accent="orange"
              delay="160ms"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] bg-white/70">
        <div className="mx-auto max-w-6xl px-5 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-[var(--muted)]">
          <BrandMark />
          <p>© {new Date().getFullYear()} Hireloop. Rekrutmen berbasis bukti.</p>
        </div>
      </footer>
    </div>
  );
}
