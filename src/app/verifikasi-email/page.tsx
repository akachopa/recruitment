"use client";

import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { nextAuthPath, verifyCurrentEmail } from "@/lib/auth-store";
import { useAuthUser } from "@/lib/use-auth-user";
import { MailCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function VerifikasiEmailPage() {
  const router = useRouter();
  const user = useAuthUser();
  const [code, setCode] = useState("");
  const [resent, setResent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.replace("/masuk");
      return;
    }
    if (user.emailVerified) {
      router.replace(nextAuthPath({ ...user, emailVerified: true }));
    }
  }, [router, user]);

  async function onVerify(e: FormEvent) {
    e.preventDefault();
    if (code.trim().length < 4) {
      setError("Masukkan kode 6 digit dari email (demo: 123456)");
      return;
    }
    if (code.trim() !== "123456") {
      setError("Kode tidak valid. Gunakan 123456 untuk demo.");
      return;
    }
    setLoading(true);
    const next = verifyCurrentEmail();
    await new Promise((r) => setTimeout(r, 350));
    if (next) router.push(nextAuthPath(next));
    setLoading(false);
  }

  if (!user || user.emailVerified) {
    return <div className="min-h-screen bg-[var(--canvas)]" />;
  }

  return (
    <AuthShell
      title="Verifikasi email Anda"
      subtitle={`Kami mengirim kode ke ${user.email}. Untuk demo, gunakan kode 123456.`}
      asideTitle="Amankan akun Anda"
      asideBody="Verifikasi email memastikan notifikasi lowongan, assessment, dan offer sampai ke alamat yang benar."
      asidePoints={["Lindungi akun", "Aktifkan notifikasi", "Lanjut ke onboarding"]}
      footerNote={
        <>
          Salah email?{" "}
          <Link href={`/daftar/${user.role}`} className="font-semibold text-[var(--brand)]">
            Daftar ulang
          </Link>
        </>
      }
    >
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-white px-4 py-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-soft)] text-[var(--brand)]">
          <MailCheck className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-[var(--ink)]">{user.email}</p>
          <p className="text-xs text-[var(--muted)]">Belum terverifikasi</p>
        </div>
      </div>

      <form onSubmit={onVerify} className="space-y-4">
        <Field label="Kode verifikasi" error={error} hint="Demo: 123456">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123456"
            inputMode="numeric"
            error={!!error}
            autoComplete="one-time-code"
          />
        </Field>
        <Button type="submit" size="lg" className="w-full" loading={loading}>
          Verifikasi & lanjut
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {
            setResent(true);
            setTimeout(() => setResent(false), 2500);
          }}
        >
          {resent ? "Kode dikirim ulang" : "Kirim ulang kode"}
        </Button>
      </form>
    </AuthShell>
  );
}
