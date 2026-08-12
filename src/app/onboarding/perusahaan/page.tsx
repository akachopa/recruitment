"use client";

import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { Button } from "@/components/ui/Button";
import { ChoiceGrid } from "@/components/ui/ChoiceGrid";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { saveUser } from "@/lib/auth-store";
import { PLANS } from "@/lib/constants";
import type { AuthUser, PerusahaanProfile } from "@/lib/types";
import { useAuthUser } from "@/lib/use-auth-user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const STEPS = [
  { id: "profile", title: "Profil" },
  { id: "team", title: "Tim" },
  { id: "vacancy", title: "Lowongan" },
  { id: "plan", title: "Paket" },
];

function PerusahaanOnboardingForm({ user }: { user: AuthUser }) {
  const router = useRouter();
  const profile = user.profile as PerusahaanProfile;
  const [step, setStep] = useState(0);
  const [website, setWebsite] = useState(profile.website || "");
  const [city, setCity] = useState(profile.city || "");
  const [address, setAddress] = useState(profile.address || "");
  const [description, setDescription] = useState(profile.description || "");
  const [brandColor, setBrandColor] = useState(profile.brandColor || "#0F766E");
  const [inviteInput, setInviteInput] = useState("");
  const [teamInvites, setTeamInvites] = useState(profile.teamInvites || []);
  const [firstVacancyTitle, setFirstVacancyTitle] = useState(
    profile.firstVacancyTitle || "",
  );
  const [plan, setPlan] = useState(profile.plan || "trial");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function persist(partial: Partial<PerusahaanProfile>, complete = false) {
    const next: AuthUser = {
      ...user,
      onboardingComplete: complete || user.onboardingComplete,
      profile: {
        ...(user.profile as PerusahaanProfile),
        ...partial,
      },
    };
    saveUser(next);
  }

  function addInvite() {
    const email = inviteInput.trim().toLowerCase();
    if (!email.includes("@")) {
      setErrors({ invite: "Email tidak valid" });
      return;
    }
    if (teamInvites.includes(email)) {
      setErrors({ invite: "Email sudah ditambahkan" });
      return;
    }
    setTeamInvites([...teamInvites, email]);
    setInviteInput("");
    setErrors({});
  }

  async function finish() {
    setLoading(true);
    persist(
      {
        website: website || undefined,
        city,
        address: address || undefined,
        description,
        brandColor,
        teamInvites,
        firstVacancyTitle: firstVacancyTitle || undefined,
        plan,
      },
      true,
    );
    await new Promise((r) => setTimeout(r, 400));
    router.push("/dashboard/perusahaan");
  }

  const companyName = profile.companyName;

  return (
    <OnboardingShell
      roleLabel="Perusahaan"
      steps={STEPS}
      current={step}
      title={
        [
          `Lengkapi profil ${companyName}`,
          "Undang anggota tim",
          "Siapkan lowongan pertama",
          "Pilih paket untuk mulai",
        ][step]
      }
      description={
        [
          "Profil ini muncul di career page dan halaman lowongan publik.",
          "Recruiter, hiring manager, atau interviewer bisa diundang sekarang atau nanti.",
          "Opsional—draft lowongan membantu Anda langsung mencoba pipeline.",
          "Semua paket bisa diubah kemudian. Mulai dengan trial tanpa kartu kredit.",
        ][step]
      }
    >
      {step === 0 && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Website">
              <Input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://perusahaan.com"
              />
            </Field>
            <Field label="Kota" error={errors.city}>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Jakarta"
                error={!!errors.city}
              />
            </Field>
          </div>
          <Field label="Alamat (opsional)">
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Alamat kantor / cabang utama"
            />
          </Field>
          <Field label="Deskripsi singkat" error={errors.description}>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ceritakan singkat tentang perusahaan dan budaya kerja..."
              error={!!errors.description}
            />
          </Field>
          <Field label="Warna brand career page">
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
                className="h-12 w-16 rounded-xl border border-[var(--line)] bg-white p-1"
              />
              <Input value={brandColor} onChange={(e) => setBrandColor(e.target.value)} />
            </div>
          </Field>
          <div className="flex justify-end pt-2">
            <Button
              onClick={() => {
                const nextErr: Record<string, string> = {};
                if (!city.trim()) nextErr.city = "Kota wajib diisi";
                if (description.trim().length < 20)
                  nextErr.description = "Minimal 20 karakter";
                setErrors(nextErr);
                if (Object.keys(nextErr).length) return;
                persist({ website, city, address, description, brandColor });
                setStep(1);
              }}
            >
              Lanjut
            </Button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <Field label="Undang via email" error={errors.invite}>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                value={inviteInput}
                onChange={(e) => setInviteInput(e.target.value)}
                placeholder="recruiter@perusahaan.com"
                error={!!errors.invite}
              />
              <Button type="button" variant="outline" onClick={addInvite}>
                Tambah
              </Button>
            </div>
          </Field>
          {teamInvites.length > 0 ? (
            <ul className="space-y-2">
              {teamInvites.map((email) => (
                <li
                  key={email}
                  className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm"
                >
                  <span>{email}</span>
                  <button
                    type="button"
                    className="text-[var(--muted)] hover:text-rose-600"
                    onClick={() => setTeamInvites(teamInvites.filter((e) => e !== email))}
                  >
                    Hapus
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--muted)]">
              Belum ada undangan. Anda bisa melewati langkah ini.
            </p>
          )}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
            <Button variant="outline" onClick={() => setStep(0)}>
              Kembali
            </Button>
            <Button
              onClick={() => {
                persist({ teamInvites });
                setStep(2);
              }}
            >
              Lanjut
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <Field label="Judul lowongan pertama (opsional)">
            <Input
              value={firstVacancyTitle}
              onChange={(e) => setFirstVacancyTitle(e.target.value)}
              placeholder="Contoh: Junior Accounting Staff"
            />
          </Field>
          <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--canvas)] p-5 text-sm text-[var(--muted)]">
            Draft lowongan akan memakai pipeline default: New Application → Screening →
            Interview → Offer → Hired.
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              Kembali
            </Button>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setFirstVacancyTitle("");
                  persist({ firstVacancyTitle: undefined });
                  setStep(3);
                }}
              >
                Lewati
              </Button>
              <Button
                onClick={() => {
                  persist({ firstVacancyTitle: firstVacancyTitle || undefined });
                  setStep(3);
                }}
              >
                Lanjut
              </Button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <ChoiceGrid
            value={plan}
            onChange={(v) => setPlan(String(v))}
            options={PLANS.map((p) => ({
              value: p.id,
              label: p.name,
              description: p.detail,
            }))}
            className="sm:grid-cols-3"
          />
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

export default function PerusahaanOnboardingPage() {
  const router = useRouter();
  const user = useAuthUser();

  useEffect(() => {
    if (!user || user.role !== "perusahaan") {
      router.replace("/daftar/perusahaan");
    }
  }, [router, user]);

  if (!user || user.role !== "perusahaan") {
    return <div className="min-h-screen bg-[var(--canvas)]" />;
  }

  return <PerusahaanOnboardingForm key={user.id} user={user} />;
}
