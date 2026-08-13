"use client";

import Link from "next/link";
import { useState } from "react";

export function ConsentCheckbox({
  checked,
  onChange,
  error,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-start gap-3 text-sm text-[var(--muted)] cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-[var(--line)] text-[var(--brand)] accent-[var(--brand)]"
        />
        <span>
          Saya menyetujui{" "}
          <Link href="/legal/syarat" className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline">
            Syarat Layanan
          </Link>{" "}
          dan{" "}
          <Link href="/legal/privasi" className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline">
            Kebijakan Privasi
          </Link>{" "}
          Hireloop.
        </span>
      </label>
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}

export function useConsentState() {
  const [accepted, setAccepted] = useState(false);
  return { accepted, setAccepted };
}
