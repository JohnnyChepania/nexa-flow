"use client";

import { Bell, LogOut, Menu, Search, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const notifications = [
  {
    id: "1",
    title: "Генерация завершена",
    description: "Визуал для главной страницы готов",
    time: "5 минут назад"
  },
  {
    id: "2",
    title: "Пайплайн выполняется",
    description: "Автоматизация публикаций на шаге 4 из 6",
    time: "22 минуты назад"
  }
];

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [query, setQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-70 border-b border-white/6 bg-graphite-950/88 backdrop-blur-xl">
      <div className="flex min-h-18 items-center gap-3 px-4 py-3 sm:gap-5 sm:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Открыть меню"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/65 hover:bg-white/8 hover:text-white focus-ring lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1 max-w-xl">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            icon={<Search className="h-4 w-4" />}
            placeholder="Поиск по проектам и генерациям"
            aria-label="Поиск"
            type="search"
            className="sm:h-11"
          />
        </div>

        <div className="relative ml-auto flex items-center gap-2 sm:gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowNotifications((value) => !value)}
            aria-label="Уведомления"
            aria-expanded={showNotifications}
            className="h-10 w-10 rounded-xl border border-white/10 px-0"
          >
            <span className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-mint-400" />
            </span>
          </Button>

          <ButtonLink href="/generator" variant="primary" size="sm" className="hidden sm:inline-flex">
            <Sparkles className="h-4 w-4" />
            Генерация
          </ButtonLink>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/65 hover:bg-white/8 hover:text-white focus-ring"
            aria-label="Профиль"
          >
            <User className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/65 hover:bg-white/8 hover:text-white focus-ring xl:flex"
            aria-label="Выйти"
          >
            <LogOut className="h-5 w-5" />
          </button>

          {showNotifications ? (
            <div className="panel absolute right-2 top-16 w-[min(360px,calc(100vw-2rem))] bg-graphite-900 p-3">
              <p className="px-3 py-2 text-sm font-semibold">Уведомления</p>
              {notifications.map((notification) => (
                <div key={notification.id} className="panel-muted mt-2 p-3">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="mt-1 text-xs text-muted">{notification.description}</p>
                  <p className="mt-2 text-xs text-white/30">{notification.time}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
