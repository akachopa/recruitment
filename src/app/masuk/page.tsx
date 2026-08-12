"use client";

import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import { createUserFromDraft, saveUser } from "@/lib/auth-store";
import type { UserRole } from "@/lib/types";
import { isValidEmail } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function MasukPage() {
  const router = useRouter();
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
    const draft = {
      role,
      name: email.split("@")[0].replace(/[._]/g, " "),
      email: email.trim().toLowerCase(),
      password,
      companyName: role === "perusahaan" ? "Perusahaan Demo" : undefined,
      industry: role === "perusahaan" ? "Teknologi" : undefined,
      companySize: role === "perusahaan" ? "11–50 karyawan" : undefined,
      organization: role === "developer" ? "Tim Demo" : undefined,
      useCase: role === "developer" ? "ats-api" : undefined,
      phone: role === "pelamar" ? "081234567890" : undefined,
    };
    const user = createUserFromDraft(draft, {
      ...(role === "developer"
        ? { sandboxKey: "hl_sk_test_demo1234", stack: ["JavaScript / TypeScript"] }
        : {}),
      ...(role === "perusahaan"
        ? { city: "Jakarta", description: "Perusahaan demo Hireloop", plan: "trial" }
        : {}),
      ...(role === "pelamar"
        ? {
            headline: "Kandidat Demo",
            city: "Jakarta",
            skills: ["Komunikasi", "Excel"],
            educationLevel: "S1",
          }
        : {}),
    });
    user.onboardingComplete = true;
    saveUser(user);
    await new Promise((r) => setTimeout(r, 400));
    router.push(`/dashboard/${role}`);
  }

  return (
    <AuthShell
      title="Masuk ke Hireloop"
      subtitle="Gunakan email dan sandi akun Anda. Demo login tersedia tanpa backend."
      footerNote={
        <>
          Belum punya akun?{" "}
          <Link href="/daftar" className="font-semibold text-[var(--brand)]">
            Daftar sekarang
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
        <Field label="Kata sandi" error={errors.password}>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 8 karakter"
            error={!!errors.password}
            autoComplete="current-password"
          />
        </Field>
        <Button type="submit" size="lg" className="w-full" loading={loading}>
          Masuk
        </Button>
      </form>
    </AuthShell>
  );
}
