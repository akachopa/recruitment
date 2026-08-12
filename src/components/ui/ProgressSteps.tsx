import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type Step = {
  id: string;
  title: string;
};

type Props = {
  steps: Step[];
  current: number;
  className?: string;
};

export function ProgressSteps({ steps, current, className }: Props) {
  return (
    <ol className={cn("flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2", className)}>
      {steps.map((step, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <li key={step.id} className="flex items-center gap-3 sm:flex-1">
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300",
                  done && "bg-[var(--brand)] text-white",
                  active && "bg-[var(--ink)] text-white scale-110",
                  !done && !active && "bg-white border border-[var(--line)] text-[var(--muted)]",
                )}
              >
                {done ? <Check className="h-4 w-4" /> : index + 1}
              </span>
              <span
                className={cn(
                  "text-sm font-medium truncate",
                  active ? "text-[var(--ink)]" : "text-[var(--muted)]",
                )}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <div
                className={cn(
                  "hidden sm:block h-px flex-1 mx-2 transition-colors",
                  done ? "bg-[var(--brand)]" : "bg-[var(--line)]",
                )}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
