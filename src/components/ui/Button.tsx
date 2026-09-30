"use client";

import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-aura-500 text-white hover:bg-aura-400 shadow-[0_18px_45px_-25px_rgba(75,140,248,0.9)]",
  secondary:
    "border border-white/10 bg-white/5 text-white hover:border-white/25 hover:bg-white/10",
  ghost: "text-white/68 hover:bg-white/8 hover:text-white",
  danger: "border border-red-400/30 bg-red-500/10 text-red-200 hover:bg-red-500/18"
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base"
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition focus-ring disabled:cursor-not-allowed disabled:opacity-50";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: BaseProps & Omit<HTMLMotionProps<"button">, "children" | "className">) {
  return (
    <motion.button
      whileHover={{ y: props.disabled ? 0 : -1 }}
      whileTap={{ scale: props.disabled ? 1 : 0.98 }}
      className={[base, variants[variant], sizes[size], className].join(" ")}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function ButtonLink({
  children,
  href,
  variant = "primary",
  size = "md",
  className = ""
}: BaseProps & { href: string }) {
  return (
    <Link
      href={href}
      className={[base, variants[variant], sizes[size], className].join(" ")}
    >
      {children}
    </Link>
  );
}
