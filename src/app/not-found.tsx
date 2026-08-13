import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--canvas)] flex flex-col">
      <header className="px-5 py-5">
        <BrandMark />
      </header>
      <main className="flex-1 flex items-center justify-center px-5 pb-16">
        <div className="max-w-md text-center animate-rise">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)] mb-3">
            404
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] tracking-tight">
            Halaman tidak ditemukan
          </h1>
          <p className="mt-3 text-[var(--muted)]">
            Tautan mungkin salah atau halaman sudah dipindahkan.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button className="w-full sm:w-auto">Ke beranda</Button>
            </Link>
            <Link href="/daftar">
              <Button variant="outline" className="w-full sm:w-auto">
                Registrasi
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
