"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock,
  FolderOpen,
  LayoutDashboard,
  Settings,
  Sparkles,
  X
} from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

const items = [
  { href: "/dashboard", label: "Обзор", icon: LayoutDashboard },
  { href: "/generator", label: "Новая генерация", icon: Sparkles },
  { href: "/projects", label: "Проекты", icon: FolderOpen },
  { href: "/history", label: "История", icon: Clock },
  { href: "/settings", label: "Настройки", icon: Settings }
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  const navigation = (
    <nav aria-label="Основная навигация" className="flex flex-1 flex-col gap-2">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            aria-current={active ? "page" : undefined}
            className={[
              "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition",
              active
                ? "border border-aura-400/25 bg-aura-500/12 text-white"
                : "border border-transparent text-white/55 hover:border-white/10 hover:bg-white/6 hover:text-white"
            ].join(" ")}
          >
            <item.icon
              className={[
                "h-5 w-5 transition",
                active ? "text-aura-200" : "text-white/35 group-hover:text-white/70"
              ].join(" ")}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-white/6 bg-graphite-900/70 p-5 lg:flex lg:flex-col">
        <Link href="/" className="mb-8 flex items-center gap-3 px-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-aura-500/18 text-aura-200">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="font-semibold tracking-tight">NEXA FLOW</span>
        </Link>
        {navigation}
        <div className="panel-muted mt-auto p-4">
          <p className="text-sm font-medium">FREE-тариф</p>
          <p className="mt-1 text-xs text-white/38">Использовано 128 из 200 кредитов</p>
          <ButtonLink href="/pricing" size="sm" variant="secondary" className="mt-4 w-full">
            Улучшить
          </ButtonLink>
        </div>
      </aside>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              className="fixed inset-0 z-80 bg-graphite-950/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-90 flex w-[82vw] max-w-xs flex-col border-r border-white/8 bg-graphite-900 p-5 lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-aura-500/18 text-aura-200">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <span className="font-semibold tracking-tight">NEXA FLOW</span>
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Закрыть меню"
                  className="rounded-full border border-white/10 p-2 text-white/55 hover:bg-white/10 hover:text-white focus-ring"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {navigation}
              <div className="panel-muted mt-auto p-4">
                <p className="text-sm font-medium">FREE-тариф</p>
                <p className="mt-1 text-xs text-white/38">Использовано 128 из 200 кредитов</p>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
