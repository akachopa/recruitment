"use client";

import {
  ActionTile,
  DashboardShell,
  StatTile,
} from "@/components/DashboardShell";
import { useAuthUser } from "@/lib/use-auth-user";
import type { PelamarProfile } from "@/lib/types";

export default function PelamarDashboardPage() {
  const user = useAuthUser();
  const profile = user?.role === "pelamar" ? (user.profile as PelamarProfile) : null;

  return (
    <DashboardShell expectedRole="pelamar" title="Profil kandidat siap">
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <StatTile
          label="Pengalaman"
          value={profile?.experienceYears?.split(" ")[0] || "—"}
          hint={profile?.experienceYears || "Belum diisi"}
        />
        <StatTile
          label="Skill"
          value={String(profile?.skills?.length || 0)}
          hint={profile?.skills?.slice(0, 3).join(", ") || "Belum dipilih"}
        />
        <StatTile
          label="CV"
          value={profile?.cvFileName ? "Ada" : "Belum"}
          hint={profile?.cvFileName || "Unggah dari onboarding"}
        />
      </div>

      <div className="rounded-2xl border border-[var(--line)] bg-white p-5 sm:p-6 mb-6">
        <p className="text-sm text-[var(--muted)]">Headline</p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
          {profile?.headline || "Profil pelamar"}
        </p>
        <p className="mt-3 text-sm text-[var(--muted)]">
          {profile?.city} · {profile?.educationLevel} {profile?.major} ·{" "}
          {profile?.workplacePreference}
        </p>
        {profile?.expectedSalary ? (
          <p className="mt-2 text-sm text-[var(--ink)]">
            Ekspektasi: {profile.expectedSalary}
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ActionTile
          href="/onboarding/pelamar"
          title="Perbarui profil"
          description="Ubah pendidikan, skill, preferensi, atau CV."
        />
        <ActionTile
          href="/"
          title="Jelajahi lowongan"
          description="Halaman karier publik akan tersedia di modul berikutnya."
        />
      </div>
    </DashboardShell>
  );
}
