"use client";

import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import { loginAccount, nextAuthPath } from "@/lib/auth-store";
import type { UserRole } from "@/lib/types";
import { isValidEmail } from "@/lib/utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

function MasukForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetOk = searchParams.get("reset") === "1";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("perusahaan");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!isValidEmail(email)) next.email = "Email tidak valid";
    if (password.length < 8) next.password = "Sandi minimal 8 karakter";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    const result = loginAccount(email.trim().toLowerCase(), password, role);
    await new Promise((r) => setTimeout(r, 350));
    if (!result.ok) {
      setErrors({ password: result.error });
      setLoading(false);
      return;
    }
    router.push(nextAuthPath(result.user));
  }

  return (
    <AuthShell
      title="Masuk ke Hireloop"
      subtitle="Gunakan email dan sandi akun yang sudah Anda daftarkan."
      footerNote={
        <>
          Belum punya akun?{" "}
          <Link href="/daftar" className="font-semibold text-[var(--brand)]">
            Daftar sekarang
          </Link>
        </>
      }
    >
      {resetOk ? (
        <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Kata sandi berhasil diubah. Silakan masuk.
        </div>
      ) : null}
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Masuk sebagai">
          <Select value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
            <option value="developer">Developer</option>
            <option value="perusahaan">Perusahaan</option>
            <option value="pelamar">Pelamar</option>
          </Select>
        </Field>
        <Field label="Email" error={errors.email}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            error={!!errors.email}
            autoComplete="email"
          />
        </Field>
        <Field label="Kata sandi" error={errors.password}>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan sandi"
            error={!!errors.password}
            autoComplete="current-password"
          />
        </Field>
        <div className="flex justify-end">
          <Link href="/lupa-sandi" className="text-sm font-semibold text-[var(--brand)]">
            Lupa sandi?
          </Link>
        </div>
        <Button type="submit" size="lg" className="w-full" loading={loading}>
          Masuk
        </Button>
      </form>
    </AuthShell>
  );
}

export default function MasukPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--canvas)]" />}>
      <MasukForm />
    </Suspense>
  );
}
