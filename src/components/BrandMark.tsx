import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  href = "/",
  light,
}: {
  className?: string;
  href?: string;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2.5 font-[family-name:var(--font-display)] text-xl tracking-tight",
        light ? "text-white" : "text-[var(--ink)]",
        className,
      )}
    >
      <span
        className={cn(
          "relative flex h-9 w-9 items-center justify-center rounded-xl",
          light ? "bg-white/15" : "bg-[var(--brand)]",
        )}
      >
        <span className="absolute inset-1.5 rounded-lg border border-white/40" />
        <span className="h-2 w-2 rounded-sm bg-white" />
      </span>
      Hireloop
    </Link>
  );
}
