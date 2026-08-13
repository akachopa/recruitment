"use client";

import { passwordStrength } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const { score, label } = passwordStrength(password);
  const widths = ["w-1/5", "w-2/5", "w-3/5", "w-4/5", "w-full"];
  const colors = [
    "bg-rose-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-teal-500",
    "bg-emerald-600",
  ];

  return (
    <div className="space-y-1.5">
      <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            widths[score],
            colors[score],
          )}
        />
      </div>
      <p className="text-xs text-[var(--muted)]">Kekuatan sandi: {label}</p>
    </div>
  );
}
