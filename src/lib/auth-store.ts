import type { AuthUser, RegistrationDraft, UserRole } from "./types";

const AUTH_KEY = "hireloop_auth_user";
const DRAFT_KEY = "hireloop_registration_draft";

let cachedRaw: string | null | undefined;
let cachedUser: AuthUser | null = null;

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function emitAuthChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("hireloop-auth"));
}

export function saveDraft(draft: RegistrationDraft) {
  if (typeof window === "undefined") return;
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function getDraft(): RegistrationDraft | null {
  if (typeof window === "undefined") return null;
  return safeParse<RegistrationDraft>(localStorage.getItem(DRAFT_KEY));
}

export function clearDraft() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(DRAFT_KEY);
}

export function saveUser(user: AuthUser) {
  if (typeof window === "undefined") return;
  const raw = JSON.stringify(user);
  localStorage.setItem(AUTH_KEY, raw);
  cachedRaw = raw;
  cachedUser = user;
  emitAuthChange();
}

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(AUTH_KEY);
  if (raw === cachedRaw) return cachedUser;
  cachedRaw = raw;
  cachedUser = safeParse<AuthUser>(raw);
  return cachedUser;
}

export function clearUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
  cachedRaw = null;
  cachedUser = null;
  emitAuthChange();
}

export function createUserFromDraft(
  draft: RegistrationDraft,
  extras: Partial<AuthUser["profile"]> = {},
): AuthUser {
  const base = {
    id: crypto.randomUUID(),
    role: draft.role,
    name: draft.name,
    email: draft.email,
    phone: draft.phone,
    createdAt: new Date().toISOString(),
    onboardingComplete: false,
  };

  if (draft.role === "developer") {
    return {
      ...base,
      profile: {
        organization: draft.organization,
        useCase: draft.useCase,
        ...extras,
      },
    };
  }

  if (draft.role === "perusahaan") {
    return {
      ...base,
      profile: {
        companyName: draft.companyName || "",
        industry: draft.industry,
        companySize: draft.companySize,
        ...extras,
      },
    };
  }

  return {
    ...base,
    profile: {
      ...extras,
    },
  };
}

export function roleLabel(role: UserRole) {
  switch (role) {
    case "developer":
      return "Developer";
    case "perusahaan":
      return "Perusahaan";
    case "pelamar":
      return "Pelamar";
  }
}

export function dashboardPath(role: UserRole) {
  return `/dashboard/${role}`;
}

export function onboardingPath(role: UserRole) {
  return `/onboarding/${role}`;
}

export function registerPath(role: UserRole) {
  return `/daftar/${role}`;
}
