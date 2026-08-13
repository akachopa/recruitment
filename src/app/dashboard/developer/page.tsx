"use client";

import {
  ActionTile,
  DashboardShell,
  StatTile,
} from "@/components/DashboardShell";
import { useAuthUser } from "@/lib/use-auth-user";
import type { DeveloperProfile } from "@/lib/types";

export default function DeveloperDashboardPage() {
  const user = useAuthUser();
  const profile =
    user?.role === "developer" ? (user.profile as DeveloperProfile) : null;

  return (
    <DashboardShell expectedRole="developer" title="Developer console siap">
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <StatTile label="Environment" value="Test" hint="Sandbox aktif" />
        <StatTile
          label="Stack"
          value={String(profile?.stack?.length || 0)}
          hint={profile?.stack?.slice(0, 2).join(", ") || "Belum dipilih"}
        />
        <StatTile
          label="Webhook"
          value={profile?.webhookUrl ? "On" : "Off"}
          hint={profile?.webhookUrl || "Belum dikonfigurasi"}
        />
      </div>

      <div className="rounded-2xl border border-[var(--line)] bg-white p-5 sm:p-6 mb-6">
        <p className="text-sm text-[var(--muted)] mb-2">Sandbox API key</p>
        <code className="block break-all text-sm font-semibold text-[var(--ink)]">
          {profile?.sandboxKey || "hl_sk_test_••••••••"}
        </code>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ActionTile
          href="/onboarding/developer"
          title="Ulangi onboarding"
          description="Perbarui stack, minat API, atau webhook."
        />
        <ActionTile
          href="/daftar"
          title="Buat akun peran lain"
          description="Coba alur perusahaan atau pelamar."
        />
      </div>
    </DashboardShell>
  );
}
