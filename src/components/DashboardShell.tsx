"use client";

import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/Button";
import { clearUser, roleLabel } from "@/lib/auth-store";
import { useAuthUser } from "@/lib/use-auth-user";
import type { UserRole } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export function DashboardShell({
  expectedRole,
  title,
  children,
}: {
  expectedRole: UserRole;
  title: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const user = useAuthUser();

  useEffect(() => {
    if (!user) {
      router.replace(`/daftar/${expectedRole}`);
      return;
    }
    if (user.role !== expectedRole) {
      router.replace(`/dashboard/${user.role}`);
      return;
    }
    if (!user.emailVerified) {
      router.replace("/verifikasi-email");
      return;
    }
    if (!user.onboardingComplete) {
      router.replace(`/onboarding/${user.role}`);
    }
  }, [expectedRole, router, user]);

  function logout() {
    clearUser();
    router.push("/");
  }

  if (
    !user ||
    user.role !== expectedRole ||
    !user.emailVerified ||
    !user.onboardingComplete
  ) {
    return <div className="min-h-screen bg-[var(--canvas)]" />;
  }

  return (
    <div className="min-h-screen bg-[var(--canvas)]">
      <header className="border-b border-[var(--line)] bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between gap-4">
          <BrandMark />
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-[var(--ink)]">{user.name}</p>
              <p className="text-xs text-[var(--muted)]">
                {roleLabel(user.role)}
                {user.emailVerified ? " · Email terverifikasi" : ""}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              Keluar
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8 sm:py-10">
        <div className="mb-8 animate-rise">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)] mb-2">
            Dashboard {roleLabel(user.role)}
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl tracking-tight text-[var(--ink)]">
            {title}
          </h1>
          <p className="mt-2 text-[var(--muted)]">
            Halo, {user.name}. Onboarding selesai—Anda siap mulai.
          </p>
        </div>
        {children}
        <div className="mt-10 text-sm text-[var(--muted)]">
          <Link href="/" className="font-semibold text-[var(--brand)]">
            Kembali ke beranda
          </Link>
        </div>
      </main>
    </div>
  );
}

export function StatTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--ink)]">
        {value}
      </p>
      {hint ? <p className="mt-2 text-xs text-[var(--muted)]">{hint}</p> : null}
    </div>
  );
}

export function ActionTile({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-[var(--line)] bg-white p-5 transition hover:border-[var(--brand)] hover:-translate-y-0.5"
    >
      <p className="font-semibold text-[var(--ink)]">{title}</p>
      <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>
    </Link>
  );
}
