import type {
  AuthUser,
  RegistrationDraft,
  StoredAccount,
  UserRole,
} from "./types";

const AUTH_KEY = "hireloop_auth_user";
const DRAFT_KEY = "hireloop_registration_draft";
const ACCOUNTS_KEY = "hireloop_accounts";

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

function toPublicUser(account: StoredAccount): AuthUser {
  const { password: _password, ...user } = account;
  void _password;
  return user;
}

export function getAccounts(): StoredAccount[] {
  if (typeof window === "undefined") return [];
  return safeParse<StoredAccount[]>(localStorage.getItem(ACCOUNTS_KEY)) || [];
}

function saveAccounts(accounts: StoredAccount[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function findAccount(email: string, role?: UserRole) {
  const normalized = email.trim().toLowerCase();
  return getAccounts().find(
    (account) =>
      account.email === normalized && (role ? account.role === role : true),
  );
}

export function upsertAccount(account: StoredAccount) {
  const accounts = getAccounts().filter(
    (item) => !(item.email === account.email && item.role === account.role),
  );
  accounts.push(account);
  saveAccounts(accounts);
}

export function updateAccount(
  email: string,
  role: UserRole,
  updater: (account: StoredAccount) => StoredAccount,
) {
  const accounts = getAccounts();
  const index = accounts.findIndex(
    (item) => item.email === email && item.role === role,
  );
  if (index < 0) return null;
  accounts[index] = updater(accounts[index]);
  saveAccounts(accounts);
  return accounts[index];
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

  const existing = findAccount(user.email, user.role);
  if (existing) {
    upsertAccount({ ...existing, ...user, password: existing.password });
  }

  emitAuthChange();
}

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(AUTH_KEY);
  if (raw === cachedRaw) return cachedUser;
  cachedRaw = raw;
  const parsed = safeParse<AuthUser>(raw);
  if (!parsed) {
    cachedUser = null;
    return null;
  }
  cachedUser = {
    ...parsed,
    emailVerified:
      typeof parsed.emailVerified === "boolean"
        ? parsed.emailVerified
        : Boolean(parsed.onboardingComplete),
  };
  return cachedUser;
}

export function clearUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
  cachedRaw = null;
  cachedUser = null;
  emitAuthChange();
}

export function registerAccount(
  draft: RegistrationDraft,
  extras: Partial<AuthUser["profile"]> = {},
): { ok: true; user: AuthUser } | { ok: false; error: string } {
  if (findAccount(draft.email, draft.role)) {
    return { ok: false, error: "Email sudah terdaftar untuk peran ini" };
  }

  const user = createUserFromDraft(draft, extras);
  const account: StoredAccount = {
    ...user,
    password: draft.password,
  };
  upsertAccount(account);
  saveDraft(draft);
  saveUser(user);
  return { ok: true, user };
}

export function loginAccount(
  email: string,
  password: string,
  role: UserRole,
): { ok: true; user: AuthUser } | { ok: false; error: string } {
  const account = findAccount(email, role);
  if (!account) {
    return { ok: false, error: "Akun tidak ditemukan untuk peran ini" };
  }
  if (account.password !== password) {
    return { ok: false, error: "Email atau kata sandi salah" };
  }
  const user = toPublicUser(account);
  saveUser(user);
  return { ok: true, user };
}

export function verifyCurrentEmail() {
  const user = getUser();
  if (!user) return null;
  const next = { ...user, emailVerified: true };
  saveUser(next);
  return next;
}

export function resetPassword(email: string, role: UserRole, password: string) {
  const updated = updateAccount(email, role, (account) => ({
    ...account,
    password,
  }));
  if (!updated) return { ok: false as const, error: "Akun tidak ditemukan" };
  return { ok: true as const };
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
    emailVerified: false,
    acceptedTermsAt: new Date().toISOString(),
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

export function nextAuthPath(user: AuthUser) {
  if (!user.emailVerified) return "/verifikasi-email";
  if (!user.onboardingComplete) return `/onboarding/${user.role}`;
  return `/dashboard/${user.role}`;
}
