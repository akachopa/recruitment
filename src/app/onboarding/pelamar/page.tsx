"use client";

import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { Button } from "@/components/ui/Button";
import { ChipSelect, ChoiceGrid } from "@/components/ui/ChoiceGrid";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { saveUser } from "@/lib/auth-store";
import {
  EDUCATION_LEVELS,
  EXPERIENCE_YEARS,
  SKILL_SUGGESTIONS,
  WORKPLACE_PREFERENCES,
} from "@/lib/constants";
import type { AuthUser, PelamarProfile } from "@/lib/types";
import { useAuthUser } from "@/lib/use-auth-user";
import { FileUp, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const STEPS = [
  { id: "basic", title: "Dasar" },
  { id: "education", title: "Pendidikan" },
  { id: "experience", title: "Pengalaman" },
  { id: "prefs", title: "Preferensi" },
  { id: "cv", title: "CV" },
];

function PelamarOnboardingForm({ user }: { user: AuthUser }) {
  const router = useRouter();
  const profile = user.profile as PelamarProfile;
  const [step, setStep] = useState(0);
  const [headline, setHeadline] = useState(profile.headline || "");
  const [city, setCity] = useState(profile.city || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [educationLevel, setEducationLevel] = useState(profile.educationLevel || "");
  const [major, setMajor] = useState(profile.major || "");
  const [institution, setInstitution] = useState(profile.institution || "");
  const [graduationYear, setGraduationYear] = useState(profile.graduationYear || "");
  const [experienceYears, setExperienceYears] = useState(profile.experienceYears || "");
  const [currentRole, setCurrentRole] = useState(profile.currentRole || "");
  const [currentCompany, setCurrentCompany] = useState(profile.currentCompany || "");
  const [skills, setSkills] = useState(profile.skills || []);
  const [workplacePreference, setWorkplacePreference] = useState(
    profile.workplacePreference || "",
  );
  const [expectedSalary, setExpectedSalary] = useState(profile.expectedSalary || "");
  const [cvFileName, setCvFileName] = useState(profile.cvFileName || "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function persist(partial: Partial<PelamarProfile>, complete = false) {
    const next: AuthUser = {
      ...user,
      onboardingComplete: complete || user.onboardingComplete,
      profile: {
        ...(user.profile as PelamarProfile),
        ...partial,
      },
    };
    saveUser(next);
  }

  async function finish() {
    setLoading(true);
    persist(
      {
        headline,
        city,
        bio,
        educationLevel,
        major,
        institution,
        graduationYear,
        experienceYears,
        currentRole,
        currentCompany,
        skills,
        workplacePreference,
        expectedSalary,
        cvFileName,
      },
      true,
    );
    await new Promise((r) => setTimeout(r, 400));
    router.push("/dashboard/pelamar");
  }

  return (
    <OnboardingShell
      roleLabel="Pelamar"
      steps={STEPS}
      current={step}
      title={
        [
          "Ceritakan siapa Anda",
          "Riwayat pendidikan",
          "Pengalaman & skill",
          "Preferensi kerja",
          "Unggah CV Anda",
        ][step]
      }
      description={
        [
          "Headline singkat membantu recruiter memahami fokus karier Anda.",
          "Isi pendidikan tertinggi yang relevan dengan target peran.",
          "Tambahkan pengalaman dan skill yang ingin ditonjolkan.",
          "Preferensi membantu mencocokkan lowongan yang lebih relevan.",
          "PDF atau DOCX hingga 5MB. Anda bisa memperbarui nanti.",
        ][step]
      }
    >
      {step === 0 && (
        <div className="space-y-4">
          <Field label="Headline profesional" error={errors.headline}>
            <Input
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Contoh: Junior Accountant | Excel & Coretax"
              error={!!errors.headline}
            />
          </Field>
          <Field label="Kota / domisili" error={errors.city}>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Bengkulu"
              error={!!errors.city}
            />
          </Field>
          <Field label="Ringkasan singkat (opsional)">
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Ceritakan pengalaman atau minat karier Anda..."
            />
          </Field>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                const nextErr: Record<string, string> = {};
                if (headline.trim().length < 8) nextErr.headline = "Minimal 8 karakter";
                if (!city.trim()) nextErr.city = "Kota wajib";
                setErrors(nextErr);
                if (Object.keys(nextErr).length) return;
                persist({ headline, city, bio });
                setStep(1);
              }}
            >
              Lanjut
            </Button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Jenjang pendidikan" error={errors.educationLevel}>
              <Select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                error={!!errors.educationLevel}
              >
                <option value="">Pilih jenjang</option>
                {EDUCATION_LEVELS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Tahun lulus">
              <Input
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                placeholder="2024"
                inputMode="numeric"
              />
            </Field>
          </div>
          <Field label="Jurusan" error={errors.major}>
            <Input
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="Akuntansi"
              error={!!errors.major}
            />
          </Field>
          <Field label="Institusi" error={errors.institution}>
            <Input
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="Nama universitas / sekolah"
              error={!!errors.institution}
            />
          </Field>
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
            <Button variant="outline" onClick={() => setStep(0)}>
              Kembali
            </Button>
            <Button
              onClick={() => {
                const nextErr: Record<string, string> = {};
                if (!educationLevel) nextErr.educationLevel = "Wajib dipilih";
                if (!major.trim()) nextErr.major = "Jurusan wajib";
                if (!institution.trim()) nextErr.institution = "Institusi wajib";
                setErrors(nextErr);
                if (Object.keys(nextErr).length) return;
                persist({ educationLevel, major, institution, graduationYear });
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
          <Field label="Total pengalaman" error={errors.experienceYears}>
            <Select
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
              error={!!errors.experienceYears}
            >
              <option value="">Pilih pengalaman</option>
              {EXPERIENCE_YEARS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Posisi saat ini / terakhir">
              <Input
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                placeholder="Staff Accounting"
              />
            </Field>
            <Field label="Perusahaan saat ini / terakhir">
              <Input
                value={currentCompany}
                onChange={(e) => setCurrentCompany(e.target.value)}
                placeholder="Nama perusahaan"
              />
            </Field>
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--ink)] mb-2">Skill utama</p>
            <ChipSelect options={SKILL_SUGGESTIONS} value={skills} onChange={setSkills} />
            {errors.skills ? (
              <p className="mt-2 text-xs text-rose-600">{errors.skills}</p>
            ) : null}
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              Kembali
            </Button>
            <Button
              onClick={() => {
                const nextErr: Record<string, string> = {};
                if (!experienceYears) nextErr.experienceYears = "Wajib dipilih";
                if (skills.length < 2) nextErr.skills = "Pilih minimal 2 skill";
                setErrors(nextErr);
                if (Object.keys(nextErr).length) return;
                persist({
                  experienceYears,
                  currentRole,
                  currentCompany,
                  skills,
                });
                setStep(3);
              }}
            >
              Lanjut
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <div>
            <p className="text-sm font-medium text-[var(--ink)] mb-3">Preferensi tempat kerja</p>
            <ChoiceGrid
              value={workplacePreference}
              onChange={(v) => setWorkplacePreference(String(v))}
              options={WORKPLACE_PREFERENCES.map((item) => ({
                value: item,
                label: item,
              }))}
            />
            {errors.workplacePreference ? (
              <p className="mt-2 text-xs text-rose-600">{errors.workplacePreference}</p>
            ) : null}
          </div>
          <Field label="Ekspektasi gaji (opsional)" hint="Contoh: Rp6–7 juta">
            <Input
              value={expectedSalary}
              onChange={(e) => setExpectedSalary(e.target.value)}
              placeholder="Rentang ekspektasi"
            />
          </Field>
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>
              Kembali
            </Button>
            <Button
              onClick={() => {
                if (!workplacePreference) {
                  setErrors({ workplacePreference: "Pilih salah satu" });
                  return;
                }
                setErrors({});
                persist({ workplacePreference, expectedSalary });
                setStep(4);
              }}
            >
              Lanjut
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-5">
          <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[var(--line)] bg-[var(--canvas)] px-6 py-10 text-center transition hover:border-[var(--brand)]">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-[var(--line)] text-[var(--brand)]">
              <FileUp className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-[var(--ink)]">
                {cvFileName ? "Ganti file CV" : "Pilih file CV"}
              </p>
              <p className="text-sm text-[var(--muted)] mt-1">PDF atau DOCX, maks. 5MB</p>
            </div>
            <input
              type="file"
              accept=".pdf,.doc,.docx,application/pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setCvFileName(file.name);
                setErrors({});
              }}
            />
          </label>
          {cvFileName ? (
            <div className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm">
              <span className="truncate pr-3">{cvFileName}</span>
              <button
                type="button"
                onClick={() => setCvFileName("")}
                className="text-[var(--muted)] hover:text-rose-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ) : null}
          {errors.cv ? <p className="text-xs text-rose-600">{errors.cv}</p> : null}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
            <Button variant="outline" onClick={() => setStep(3)}>
              Kembali
            </Button>
            <Button
              onClick={() => {
                if (!cvFileName) {
                  setErrors({ cv: "Unggah CV untuk menyelesaikan onboarding" });
                  return;
                }
                finish();
              }}
              loading={loading}
            >
              Selesai & buka dashboard
            </Button>
          </div>
        </div>
      )}
    </OnboardingShell>
  );
}

export default function PelamarOnboardingPage() {
  const router = useRouter();
  const user = useAuthUser();

  useEffect(() => {
    if (!user || user.role !== "pelamar") {
      router.replace("/daftar/pelamar");
    }
  }, [router, user]);

  if (!user || user.role !== "pelamar") {
    return <div className="min-h-screen bg-[var(--canvas)]" />;
  }

  return <PelamarOnboardingForm key={user.id} user={user} />;
}
