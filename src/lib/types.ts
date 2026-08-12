export type UserRole = "developer" | "perusahaan" | "pelamar";

export type AuthUser = {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  onboardingComplete: boolean;
  profile: DeveloperProfile | PerusahaanProfile | PelamarProfile;
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
};

export type RegistrationDraft = {
  role: UserRole;
  name: string;
  email: string;
  password: string;
  phone?: string;
  // company-specific at register
  companyName?: string;
  industry?: string;
  companySize?: string;
  // developer-specific
  organization?: string;
  useCase?: string;
};
