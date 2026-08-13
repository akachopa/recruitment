"use client";

import { AuthShell } from "@/components/auth/AuthShell";
import { ConsentCheckbox } from "@/components/auth/ConsentCheckbox";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PasswordStrength } from "@/components/auth/PasswordStrength";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { nextAuthPath, registerAccount } from "@/lib/auth-store";
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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Nama minimal 2 karakter";
    if (!isValidEmail(email)) next.email = "Email tidak valid";
    if (phone.trim().length < 10) next.phone = "Nomor WhatsApp/telepon wajib";
    if (password.length < 8) next.password = "Sandi minimal 8 karakter";
    if (password !== confirmPassword) next.confirmPassword = "Konfirmasi sandi tidak cocok";
    if (!accepted) next.accepted = "Anda harus menyetujui syarat & privasi";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const result = registerAccount(
      {
        role: "pelamar",
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        phone: phone.trim(),
      },
      { marketingConsent: marketing },
    );
    if (!result.ok) {
      setErrors({ email: result.error });
      setLoading(false);
      return;
    }
    await new Promise((r) => setTimeout(r, 350));
    router.push(nextAuthPath(result.user));
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
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 8 karakter"
            error={!!errors.password}
            autoComplete="new-password"
          />
        </Field>
        <PasswordStrength password={password} />
        <Field label="Konfirmasi kata sandi" error={errors.confirmPassword}>
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Ulangi sandi"
            error={!!errors.confirmPassword}
            autoComplete="new-password"
          />
        </Field>
        <ConsentCheckbox
          checked={accepted}
          onChange={setAccepted}
          error={errors.accepted}
        />
        <label className="flex items-start gap-3 text-sm text-[var(--muted)] cursor-pointer">
          <input
            type="checkbox"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-[var(--line)] accent-[var(--brand)]"
          />
          <span>Saya bersedia menerima info lowongan yang relevan (opsional).</span>
        </label>
        <Button type="submit" size="lg" className="w-full mt-2" loading={loading}>
          Lanjut verifikasi email
        </Button>
      </form>
    </AuthShell>
  );
}
