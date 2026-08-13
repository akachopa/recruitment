"use client";

import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { Button } from "@/components/ui/Button";
import { ChipSelect } from "@/components/ui/ChoiceGrid";
import { Field, Input } from "@/components/ui/Field";
import { saveUser } from "@/lib/auth-store";
import { DEV_INTERESTS, DEV_STACKS } from "@/lib/constants";
import type { AuthUser, DeveloperProfile } from "@/lib/types";
import { useAuthUser } from "@/lib/use-auth-user";
import { Check, Copy, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const STEPS = [
  { id: "stack", title: "Stack" },
  { id: "interest", title: "Minat API" },
  { id: "webhook", title: "Webhook" },
  { id: "sandbox", title: "Sandbox" },
];

function createSandboxKey() {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().replace(/-/g, "")
      : `${Date.now()}`;
  return `hl_sk_test_${id.slice(0, 16)}`;
}

function DeveloperOnboardingForm({ user }: { user: AuthUser }) {
  const router = useRouter();
  const profile = user.profile as DeveloperProfile;
  const [step, setStep] = useState(0);
  const [stack, setStack] = useState(profile.stack || []);
  const [interests, setInterests] = useState(profile.interestAreas || []);
  const [webhookUrl, setWebhookUrl] = useState(profile.webhookUrl || "");
  const [sandboxKey] = useState(() => profile.sandboxKey || createSandboxKey());
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  function persist(partial: Partial<DeveloperProfile>, complete = false) {
    const next: AuthUser = {
      ...user,
      onboardingComplete: complete || user.onboardingComplete,
      profile: {
        ...(user.profile as DeveloperProfile),
        ...partial,
      },
    };
    saveUser(next);
  }

  async function finish() {
    setLoading(true);
    persist(
      {
        stack,
        interestAreas: interests,
        webhookUrl: webhookUrl || undefined,
        sandboxKey,
      },
      true,
    );
    await new Promise((r) => setTimeout(r, 400));
    router.push("/dashboard/developer");
  }

  async function copyKey() {
    await navigator.clipboard.writeText(sandboxKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <OnboardingShell
      roleLabel="Developer"
      steps={STEPS}
      current={step}
      title={
        [
          "Stack apa yang Anda pakai?",
          "Fitur API mana yang paling dibutuhkan?",
          "Siapkan endpoint webhook",
          "Sandbox key Anda siap",
        ][step]
      }
      description={
        [
          "Kami sesuaikan contoh kode dan SDK recommendation berdasarkan stack Anda.",
          "Pilih satu atau beberapa area agar dokumentasi onboarding lebih relevan.",
          "Opsional—bisa diisi nanti. Event hiring akan dikirim ke URL ini.",
          "Simpan key dengan aman. Anda bisa regenerate kapan saja dari dashboard.",
        ][step]
      }
    >
      {step === 0 && (
        <div className="space-y-6">
          <ChipSelect options={DEV_STACKS} value={stack} onChange={setStack} />
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <Button
              onClick={() => {
                persist({ stack });
                setStep(1);
              }}
              disabled={stack.length === 0}
            >
              Lanjut
            </Button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6">
          <ChipSelect options={DEV_INTERESTS} value={interests} onChange={setInterests} />
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
            <Button variant="outline" onClick={() => setStep(0)}>
              Kembali
            </Button>
            <Button
              onClick={() => {
                persist({ interestAreas: interests });
                setStep(2);
              }}
              disabled={interests.length === 0}
            >
              Lanjut
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <Field
            label="Webhook URL"
            hint="Contoh: https://api.produkanda.com/webhooks/hireloop"
          >
            <Input
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://"
              inputMode="url"
            />
          </Field>
          <p className="text-sm text-[var(--muted)] rounded-2xl border border-[var(--line)] bg-[var(--canvas)] px-4 py-3">
            Endpoint ini opsional. Anda bisa melewati langkah ini dan menambahkannya nanti
            dari dashboard developer.
          </p>
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              Kembali
            </Button>
            <Button
              onClick={() => {
                persist({ webhookUrl: webhookUrl || undefined });
                setStep(3);
              }}
            >
              Lanjut
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--canvas)] p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand)] text-white">
                <KeyRound className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-[var(--ink)]">Sandbox API key</p>
                <p className="text-sm text-[var(--muted)]">Environment: test</p>
              </div>
            </div>
            <code className="block break-all rounded-xl bg-white border border-[var(--line)] px-4 py-3 text-sm">
              {sandboxKey}
            </code>
            <Button variant="outline" className="mt-4" onClick={copyKey}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Tersalin" : "Salin key"}
            </Button>
          </div>

          <ul className="space-y-2 text-sm text-[var(--muted)]">
            <li>· Base URL: https://api.hireloop.app/v1</li>
            <li>· Header: Authorization: Bearer {"{sandbox_key}"}</li>
            <li>· Mulai dari GET /vacancies atau POST /webhooks/test</li>
          </ul>

          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>
              Kembali
            </Button>
            <Button onClick={finish} loading={loading}>
              Selesai & buka dashboard
            </Button>
          </div>
        </div>
      )}
    </OnboardingShell>
  );
}

export default function DeveloperOnboardingPage() {
  const router = useRouter();
  const user = useAuthUser();

  useEffect(() => {
    if (!user || user.role !== "developer") {
      router.replace("/daftar/developer");
      return;
    }
    if (!user.emailVerified) {
      router.replace("/verifikasi-email");
    }
  }, [router, user]);

  if (!user || user.role !== "developer" || !user.emailVerified) {
    return <div className="min-h-screen bg-[var(--canvas)]" />;
  }

  return <DeveloperOnboardingForm key={user.id} user={user} />;
}
