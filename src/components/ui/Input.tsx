import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
}

export function Input({ label, icon, className = "", ...props }: InputProps) {
  return (
    <label className="block">
      {label ? (
        <span className="mb-2 block text-sm font-medium text-white/70">
          {label}
        </span>
      ) : null}
      <span className="relative flex">
        {icon ? (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35">
            {icon}
          </span>
        ) : null}
        <input
          className={[
            "h-11 w-full rounded-xl border border-white/10 bg-graphite-800 px-4 text-sm text-white placeholder:text-white/30 transition focus:border-aura-400/50 focus-ring",
            icon ? "pl-11" : "",
            className
          ].join(" ")}
          {...props}
        />
      </span>
    </label>
  );
}
