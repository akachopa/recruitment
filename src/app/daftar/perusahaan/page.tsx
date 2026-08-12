"use client";

import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordStrength } from "@/components/auth/PasswordStrength";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import { createUserFromDraft, saveDraft, saveUser } from "@/lib/auth-store";
import { COMPANY_SIZES, INDUSTRIES } from "@/lib/constants";
import { isValidEmail } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function PerusahaanRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Nama minimal 2 karakter";
    if (!isValidEmail(email)) next.email = "Email tidak valid";
    if (password.length < 8) next.password = "Sandi minimal 8 karakter";
    if (companyName.trim().length < 2) next.companyName = "Nama perusahaan wajib";
    if (!industry) next.industry = "Pilih industri";
    if (!companySize) next.companySize = "Pilih ukuran perusahaan";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const draft = {
      role: "perusahaan" as const,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      phone: phone.trim() || undefined,
      companyName: companyName.trim(),
      industry,
      companySize,
    };
    saveDraft(draft);
    const user = createUserFromDraft(draft);
    saveUser(user);
    await new Promise((r) => setTimeout(r, 450));
    router.push("/onboarding/perusahaan");
  }

  return (
    <AuthShell
      title="Daftar sebagai Perusahaan"
      subtitle="Buat akun organisasi dan mulai kelola rekrutmen dalam satu tempat."
      asideTitle="ATS yang membantu keputusan"
      asideBody="Publikasi lowongan, screening berbasis bukti, interview guide, hingga offer—tanpa spreadsheet berceceran."
      asidePoints={["Trial 14 hari", "Pipeline kustom", "Audit trail lengkap"]}
      footerNote={
        <>
          Mencari kerja?{" "}
          <Link href="/daftar/pelamar" className="font-semibold text-[var(--brand)]">
            Daftar sebagai pelamar
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nama Anda" error={errors.name} className="sm:col-span-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama lengkap pemilik akun"
              error={!!errors.name}
            />
          </Field>
          <Field label="Email kerja" error={errors.email}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hr@perusahaan.com"
              error={!!errors.email}
            />
          </Field>
          <Field label="WhatsApp / telepon">
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08xxxxxxxxxx"
              inputMode="tel"
            />
          </Field>
        </div>
        <Field label="Kata sandi" error={errors.password}>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 8 karakter"
            error={!!errors.password}
            autoComplete="new-password"
          />
        </Field>
        <PasswordStrength password={password} />

        <div className="pt-2 border-t border-[var(--line)]">
          <p className="text-sm font-semibold text-[var(--ink)] mb-3 mt-4">Data organisasi</p>
          <div className="space-y-4">
            <Field label="Nama perusahaan" error={errors.companyName}>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="PT Contoh Maju"
                error={!!errors.companyName}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Industri" error={errors.industry}>
                <Select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  error={!!errors.industry}
                >
                  <option value="">Pilih industri</option>
                  {INDUSTRIES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Ukuran perusahaan" error={errors.companySize}>
                <Select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  error={!!errors.companySize}
                >
                  <option value="">Pilih ukuran</option>
                  {COMPANY_SIZES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full mt-2" loading={loading}>
          Buat akun & lanjut onboarding
        </Button>
      </form>
    </AuthShell>
  );
}
