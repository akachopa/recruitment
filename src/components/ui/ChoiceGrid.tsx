"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Option = {
  value: string;
  label: string;
  description?: string;
};

type Props = {
  options: Option[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  className?: string;
};

export function ChoiceGrid({
  options,
  value,
  onChange,
  multiple,
  className,
}: Props) {
  const selected = Array.isArray(value) ? value : value ? [value] : [];

  function toggle(next: string) {
    if (multiple) {
      const exists = selected.includes(next);
      onChange(exists ? selected.filter((v) => v !== next) : [...selected, next]);
      return;
    }
    onChange(next);
  }

  return (
    <div className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {options.map((option) => {
        const active = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => toggle(option.value)}
            className={cn(
              "text-left rounded-2xl border px-4 py-4 transition-all duration-200",
              active
                ? "border-[var(--brand)] bg-[var(--brand-soft)] shadow-[0_10px_30px_rgba(15,118,110,0.12)]"
                : "border-[var(--line)] bg-white/80 hover:border-[var(--brand)]/50",
            )}
          >
            <div className="font-semibold text-[var(--ink)]">{option.label}</div>
            {option.description ? (
              <p className="mt-1 text-sm text-[var(--muted)]">{option.description}</p>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

type ChipProps = {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
};

export function ChipSelect({ options, value, onChange, className }: ChipProps) {
  function toggle(item: string) {
    onChange(
      value.includes(item) ? value.filter((v) => v !== item) : [...value, item],
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const active = value.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            className={cn(
              "px-3.5 py-2 rounded-xl text-sm font-medium border transition-all",
              active
                ? "bg-[var(--ink)] text-white border-[var(--ink)]"
                : "bg-white text-[var(--ink)] border-[var(--line)] hover:border-[var(--brand)]",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export function SectionIntro({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="space-y-2 mb-6">
      <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl tracking-tight text-[var(--ink)]">
        {title}
      </h2>
      <p className="text-[var(--muted)] text-sm sm:text-base max-w-xl">{description}</p>
      {children}
    </div>
  );
}
