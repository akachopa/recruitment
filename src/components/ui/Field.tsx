import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

export function Field({ label, hint, error, children, className }: FieldProps) {
  return (
    <label className={cn("block space-y-2", className)}>
      <span className="text-sm font-medium text-[var(--ink)]">{label}</span>
      {children}
      {hint && !error ? (
        <span className="block text-xs text-[var(--muted)]">{hint}</span>
      ) : null}
      {error ? (
        <span className="block text-xs text-rose-600">{error}</span>
      ) : null}
    </label>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full h-12 rounded-xl border bg-white px-4 text-sm text-[var(--ink)] outline-none transition placeholder:text-slate-400 focus:border-[var(--brand)] focus:ring-4 focus:ring-[var(--brand-soft)]",
        error ? "border-rose-400" : "border-[var(--line)]",
        className,
      )}
      {...props}
    />
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
};

export function Textarea({ className, error, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full min-h-28 rounded-xl border bg-white px-4 py-3 text-sm text-[var(--ink)] outline-none transition placeholder:text-slate-400 focus:border-[var(--brand)] focus:ring-4 focus:ring-[var(--brand-soft)]",
        error ? "border-rose-400" : "border-[var(--line)]",
        className,
      )}
      {...props}
    />
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
};

export function Select({ className, error, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full h-12 rounded-xl border bg-white px-4 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--brand)] focus:ring-4 focus:ring-[var(--brand-soft)]",
        error ? "border-rose-400" : "border-[var(--line)]",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
