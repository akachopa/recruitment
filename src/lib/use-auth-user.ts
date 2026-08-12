"use client";

import { getUser } from "@/lib/auth-store";
import type { AuthUser } from "@/lib/types";
import { useSyncExternalStore } from "react";

function subscribe(listener: () => void) {
  const onChange = () => listener();
  window.addEventListener("hireloop-auth", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("hireloop-auth", onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): AuthUser | null {
  return getUser();
}

function getServerSnapshot(): AuthUser | null {
  return null;
}

export function useAuthUser() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
