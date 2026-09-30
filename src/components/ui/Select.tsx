"use client";

import { ChevronDown } from "lucide-react";
import type { SelectHTMLAttributes } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
}

export function Select({ label, options, className = "", ...props }: SelectProps) {
  return (
    <label className="block">
      {label ? (
        <span className="mb-2 block text-sm font-medium text-white/70">
          {label}
        </span>
      ) : null}
      <span className="relative block">
        <select
          className={[
            "h-11 w-full appearance-none rounded-xl border border-white/10 bg-graphite-800 px-4 pr-11 text-sm text-white transition focus:border-aura-400/50 focus-ring",
            className
          ].join(" ")}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-graphite-800">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
      </span>
    </label>
  );
}
