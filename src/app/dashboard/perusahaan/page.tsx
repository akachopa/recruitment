"use client";

import {
  ActionTile,
  DashboardShell,
  StatTile,
} from "@/components/DashboardShell";
import { useAuthUser } from "@/lib/use-auth-user";
import type { PerusahaanProfile } from "@/lib/types";

export default function PerusahaanDashboardPage() {
  const user = useAuthUser();
  const profile =
    user?.role === "perusahaan" ? (user.profile as PerusahaanProfile) : null;

  return (
    <DashboardShell
      expectedRole="perusahaan"
      title={`${profile?.companyName || "Perusahaan"} siap merekrut`}
    >
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <StatTile label="Paket" value={profile?.plan || "trial"} hint="Bisa diubah kapan saja" />
        <StatTile
          label="Undangan tim"
          value={String(profile?.teamInvites?.length || 0)}
          hint="Menunggu penerimaan"
        />
        <StatTile
          label="Draft lowongan"
          value={profile?.firstVacancyTitle ? "1" : "0"}
          hint={profile?.firstVacancyTitle || "Belum ada draft"}
        />
      </div>

      <div className="rounded-2xl border border-[var(--line)] bg-white p-5 sm:p-6 mb-6">
        <p className="text-sm text-[var(--muted)]">Profil organisasi</p>
        <p className="mt-2 font-semibold text-[var(--ink)]">
          {profile?.companyName} · {profile?.industry} · {profile?.city}
        </p>
        <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
          {profile?.description}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ActionTile
          href="/onboarding/perusahaan"
          title="Edit onboarding"
          description="Perbarui profil, tim, atau paket."
        />
        <ActionTile
          href="/daftar/pelamar"
          title="Lihat alur pelamar"
          description="Simulasikan pengalaman kandidat."
        />
        <ActionTile
          href="/"
          title="Career page preview"
          description="Landing publik perusahaan (placeholder)."
        />
      </div>
    </DashboardShell>
  );
}
