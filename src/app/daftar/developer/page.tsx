"use client";

import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordStrength } from "@/components/auth/PasswordStrength";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import { createUserFromDraft, saveDraft, saveUser } from "@/lib/auth-store";
import { isValidEmail } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function DeveloperRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [useCase, setUseCase] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Nama minimal 2 karakter";
    if (!isValidEmail(email)) next.email = "Email tidak valid";
    if (password.length < 8) next.password = "Sandi minimal 8 karakter";
    if (!useCase) next.useCase = "Pilih use case";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const draft = {
      role: "developer" as const,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      organization: organization.trim() || undefined,
      useCase,
    };
    saveDraft(draft);
    const user = createUserFromDraft(draft);
    saveUser(user);
    await new Promise((r) => setTimeout(r, 450));
    router.push("/onboarding/developer");
  }

  return (
    <AuthShell
      title="Daftar sebagai Developer"
      subtitle="Dapatkan sandbox key dan mulai integrasi hiring API dalam hitungan menit."
      asideTitle="Bangun di atas Hireloop"
      asideBody="Webhook event, career page widget, dan ATS API siap untuk product engineer dan partner."
      asidePoints={["Sandbox gratis", "Event hiring real-time", "Dokumentasi lengkap"]}
      footerNote={
        <>
          Bukan developer?{" "}
          <Link href="/daftar" className="font-semibold text-[var(--brand)]">
            Pilih peran lain
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Nama lengkap" error={errors.name}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Budi Santoso"
            error={!!errors.name}
            autoComplete="name"
          />
        </Field>
        <Field label="Email kerja" error={errors.email}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="anda@perusahaan.com"
            error={!!errors.email}
            autoComplete="email"
          />
        </Field>
        <Field label="Kata sandi" error={errors.password} hint="Minimal 8 karakter">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Buat sandi yang kuat"
            error={!!errors.password}
            autoComplete="new-password"
          />
        </Field>
        <PasswordStrength password={password} />
        <Field label="Organisasi / tim (opsional)">
          <Input
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="Nama perusahaan atau produk"
          />
        </Field>
        <Field label="Use case utama" error={errors.useCase}>
          <Select
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            error={!!errors.useCase}
          >
            <option value="">Pilih use case</option>
            <option value="ats-api">Integrasi ATS API</option>
            <option value="webhook">Webhook & otomasi</option>
            <option value="career-widget">Career page widget</option>
            <option value="partner">Partner / agency</option>
          </Select>
        </Field>
        <Button type="submit" size="lg" className="w-full mt-2" loading={loading}>
          Lanjut ke onboarding
        </Button>
        <p className="text-xs text-center text-[var(--muted)]">
          Dengan mendaftar, Anda menyetujui syarat layanan dan kebijakan privasi Hireloop.
        </p>
      </form>
    </AuthShell>
  );
}
