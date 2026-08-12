"use client";

import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordStrength } from "@/components/auth/PasswordStrength";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { createUserFromDraft, saveDraft, saveUser } from "@/lib/auth-store";
import { isValidEmail } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function PelamarRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Nama minimal 2 karakter";
    if (!isValidEmail(email)) next.email = "Email tidak valid";
    if (phone.trim().length < 10) next.phone = "Nomor WhatsApp/telepon wajib";
    if (password.length < 8) next.password = "Sandi minimal 8 karakter";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const draft = {
      role: "pelamar" as const,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      phone: phone.trim(),
    };
    saveDraft(draft);
    const user = createUserFromDraft(draft);
    saveUser(user);
    await new Promise((r) => setTimeout(r, 450));
    router.push("/onboarding/pelamar");
  }

  return (
    <AuthShell
      title="Daftar sebagai Pelamar"
      subtitle="Buat profil sekali, lamar banyak lowongan dengan data yang sudah siap."
      asideTitle="Karier Anda, satu profil"
      asideBody="Unggah CV, lengkapi pengalaman, dan pantau status lamaran dari satu tempat."
      asidePoints={["Profil kandidat lengkap", "Lamar lebih cepat", "Notifikasi tahapan"]}
      footerNote={
        <>
          Merekrut untuk perusahaan?{" "}
          <Link href="/daftar/perusahaan" className="font-semibold text-[var(--brand)]">
            Daftar perusahaan
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Nama lengkap" error={errors.name}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Sesuai CV / identitas"
            error={!!errors.name}
            autoComplete="name"
          />
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
        <Field label="WhatsApp / telepon" error={errors.phone}>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="08xxxxxxxxxx"
            error={!!errors.phone}
            inputMode="tel"
            autoComplete="tel"
          />
        </Field>
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
        <Button type="submit" size="lg" className="w-full mt-2" loading={loading}>
          Lanjut lengkapi profil
        </Button>
        <p className="text-xs text-center text-[var(--muted)]">
          Data Anda dilindungi dan hanya dipakai untuk proses rekrutmen.
        </p>
      </form>
    </AuthShell>
  );
}
