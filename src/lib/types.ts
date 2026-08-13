export type UserRole = "developer" | "perusahaan" | "pelamar";

export type AuthUser = {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  onboardingComplete: boolean;
  emailVerified: boolean;
  acceptedTermsAt?: string;
  profile: DeveloperProfile | PerusahaanProfile | PelamarProfile;
};

export type StoredAccount = AuthUser & {
  password: string;
};

export type DeveloperProfile = {
  organization?: string;
  useCase?: string;
  stack?: string[];
  webhookUrl?: string;
  sandboxKey?: string;
  interestAreas?: string[];
};

export type PerusahaanProfile = {
  companyName: string;
  industry?: string;
  companySize?: string;
  website?: string;
  city?: string;
  address?: string;
  description?: string;
  brandColor?: string;
  teamInvites?: string[];
  firstVacancyTitle?: string;
  plan?: string;
};

export type PelamarProfile = {
  headline?: string;
  city?: string;
  educationLevel?: string;
  major?: string;
  institution?: string;
  graduationYear?: string;
  experienceYears?: string;
  currentRole?: string;
  currentCompany?: string;
  skills?: string[];
  workplacePreference?: string;
  expectedSalary?: string;
  cvFileName?: string;
  bio?: string;
  marketingConsent?: boolean;
};

export type RegistrationDraft = {
  role: UserRole;
  name: string;
  email: string;
  password: string;
  phone?: string;
  companyName?: string;
  industry?: string;
  companySize?: string;
  organization?: string;
  useCase?: string;
};
