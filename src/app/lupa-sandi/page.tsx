"use client";

import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import { findAccount } from "@/lib/auth-store";
import type { UserRole } from "@/lib/types";
import { isValidEmail } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LupaSandiPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("perusahaan");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!isValidEmail(email)) next.email = "Email tidak valid";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    const normalized = email.trim().toLowerCase();
    const account = findAccount(normalized, role);
    await new Promise((r) => setTimeout(r, 350));
    if (!account) {
      setErrors({ email: "Akun tidak ditemukan" });
      setLoading(false);
      return;
    }
    router.push(
      `/reset-sandi?email=${encodeURIComponent(account.email)}&role=${account.role}`,
    );
  }

  return (
    <AuthShell
      title="Lupa kata sandi"
      subtitle="Masukkan email akun Anda. Kami akan mengarahkan ke halaman reset (simulasi MVP)."
      footerNote={
        <>
          Ingat sandi Anda?{" "}
          <Link href="/masuk" className="font-semibold text-[var(--brand)]">
            Masuk
          </Link>
        </>
      }
    >
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
        <Button type="submit" size="lg" className="w-full" loading={loading}>
          Lanjut reset sandi
        </Button>
      </form>
    </AuthShell>
  );
}
