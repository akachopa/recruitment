import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  loading?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  loading,
  disabled,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
        size === "sm" && "h-10 px-4 text-sm rounded-xl",
        size === "md" && "h-12 px-5 text-sm rounded-xl",
        size === "lg" && "h-14 px-6 text-base rounded-2xl",
        variant === "primary" &&
          "bg-[var(--brand)] text-white hover:bg-[var(--brand-deep)] shadow-[0_8px_24px_rgba(15,118,110,0.25)]",
        variant === "secondary" &&
          "bg-[var(--ink)] text-white hover:bg-slate-800",
        variant === "outline" &&
          "border border-[var(--line)] bg-white/80 text-[var(--ink)] hover:bg-white hover:border-[var(--brand)]",
        variant === "ghost" && "text-[var(--ink)] hover:bg-black/5",
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      ) : null}
      {children}
    </button>
  );
}
