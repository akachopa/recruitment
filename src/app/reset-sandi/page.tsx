"use client";

import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PasswordStrength } from "@/components/auth/PasswordStrength";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { resetPassword } from "@/lib/auth-store";
import type { UserRole } from "@/lib/types";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

function ResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = (searchParams.get("email") || "").toLowerCase();
  const roleParam = searchParams.get("role") || "";
  const role =
    roleParam === "developer" ||
    roleParam === "perusahaan" ||
    roleParam === "pelamar"
      ? (roleParam as UserRole)
      : null;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  if (!email || !role) {
    return (
      <AuthShell title="Reset tidak valid" subtitle="Mulai ulang dari halaman lupa sandi.">
        <Link href="/lupa-sandi">
          <Button className="w-full">Ke lupa sandi</Button>
        </Link>
      </AuthShell>
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (password.length < 8) next.password = "Sandi minimal 8 karakter";
    if (password !== confirmPassword) next.confirmPassword = "Konfirmasi sandi tidak cocok";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    const result = resetPassword(email, role as UserRole, password);
    await new Promise((r) => setTimeout(r, 350));
    if (!result.ok) {
      setErrors({ password: result.error });
      setLoading(false);
      return;
    }
    router.push("/masuk?reset=1");
  }

  return (
    <AuthShell
      title="Buat kata sandi baru"
      subtitle={`Reset untuk ${email} (${role}).`}
      footerNote={
        <>
          Kembali ke{" "}
          <Link href="/masuk" className="font-semibold text-[var(--brand)]">
            halaman masuk
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Kata sandi baru" error={errors.password}>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 8 karakter"
            error={!!errors.password}
            autoComplete="new-password"
          />
        </Field>
        <PasswordStrength password={password} />
        <Field label="Konfirmasi sandi baru" error={errors.confirmPassword}>
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Ulangi sandi"
            error={!!errors.confirmPassword}
            autoComplete="new-password"
          />
        </Field>
        <Button type="submit" size="lg" className="w-full" loading={loading}>
          Simpan sandi baru
        </Button>
      </form>
    </AuthShell>
  );
}

export default function ResetSandiPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--canvas)]" />}>
      <ResetForm />
    </Suspense>
  );
}
