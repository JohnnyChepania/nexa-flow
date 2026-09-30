"use client";

import { Bell, Palette, Shield, User } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { PageTransition } from "@/components/ui/PageTransition";

type Section = "profile" | "notifications" | "interface" | "security";

const sections: Array<{ id: Section; label: string; icon: typeof User }> = [
  { id: "profile", label: "Профиль", icon: User },
  { id: "notifications", label: "Уведомления", icon: Bell },
  { id: "interface", label: "Интерфейс", icon: Palette },
  { id: "security", label: "Безопасность", icon: Shield }
];

function Toggle({
  label,
  description,
  checked,
  onChange
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="panel-muted flex w-full items-center justify-between gap-5 p-5 text-left transition hover:border-white/18 focus-ring"
      role="switch"
      aria-checked={checked}
      aria-label={label}
    >
      <span>
        <span className="block text-sm font-medium">{label}</span>
        <span className="mt-1 block text-xs text-white/40">{description}</span>
      </span>
      <span
        className={[
          "relative h-7 w-12 shrink-0 rounded-full border transition",
          checked ? "border-aura-400/40 bg-aura-500/70" : "border-white/10 bg-white/8"
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-1 h-5 w-5 rounded-full bg-white transition-all",
            checked ? "left-6" : "left-1"
          ].join(" ")}
        />
      </span>
    </button>
  );
}

export function SettingsScreen() {
  const [section, setSection] = useState<Section>("profile");
  const [name, setName] = useState("Валерий");
  const [email, setEmail] = useState("valer@nexaflow.app");
  const [company, setCompany] = useState("NEXA FLOW");
  const [notifyCompleted, setNotifyCompleted] = useState(true);
  const [notifyErrors, setNotifyErrors] = useState(true);
  const [notifyMarketing, setNotifyMarketing] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [compact, setCompact] = useState(false);
  const [language, setLanguage] = useState("ru");
  const [theme, setTheme] = useState("dark");
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionAlerts, setSessionAlerts] = useState(true);

  return (
    <AppShell>
      <PageTransition>
        <div className="mx-auto w-full max-w-[1000px] px-4 py-8 sm:px-6 sm:py-10">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Настройки</h1>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Управление профилем, уведомлениями, интерфейсом и безопасностью.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
            <nav className="panel flex gap-2 overflow-x-auto p-3 lg:flex-col" aria-label="Разделы настроек">
              {sections.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSection(item.id)}
                  className={[
                    "flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm transition focus-ring",
                    section === item.id
                      ? "bg-aura-500/12 text-white"
                      : "text-white/55 hover:bg-white/8 hover:text-white"
                  ].join(" ")}
                >
                  <item.icon className="h-4.5 w-4.5" />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="panel p-5 sm:p-7">
              {section === "profile" ? (
                <div className="space-y-5">
                  <h2 className="text-xl font-semibold">Профиль</h2>
                  <Input label="Имя" value={name} onChange={(event) => setName(event.target.value)} />
                  <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <Input
                    label="Компания"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                  />
                  <Button type="button">Сохранить изменения</Button>
                </div>
              ) : null}

              {section === "notifications" ? (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Уведомления</h2>
                  <Toggle
                    label="Завершённые генерации"
                    description="Уведомлять, когда результат готов."
                    checked={notifyCompleted}
                    onChange={setNotifyCompleted}
                  />
                  <Toggle
                    label="Ошибки задач"
                    description="Сообщать о неудачных генерациях."
                    checked={notifyErrors}
                    onChange={setNotifyErrors}
                  />
                  <Toggle
                    label="Продуктовые новости"
                    description="Обновления NEXA FLOW и советы по работе."
                    checked={notifyMarketing}
                    onChange={setNotifyMarketing}
                  />
                </div>
              ) : null}

              {section === "interface" ? (
                <div className="space-y-5">
                  <h2 className="text-xl font-semibold">Интерфейс</h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Select
                      label="Язык"
                      value={language}
                      onChange={(event) => setLanguage(event.target.value)}
                      options={[
                        { value: "ru", label: "Русский" },
                        { value: "en", label: "English" }
                      ]}
                    />
                    <Select
                      label="Тема"
                      value={theme}
                      onChange={(event) => setTheme(event.target.value)}
                      options={[
                        { value: "dark", label: "Тёмная" },
                        { value: "system", label: "Системная" }
                      ]}
                    />
                  </div>
                  <Toggle
                    label="Компактный режим"
                    description="Уменьшить отступы в таблицах и карточках."
                    checked={compact}
                    onChange={setCompact}
                  />
                  <Toggle
                    label="Уменьшить анимации"
                    description="Меньше движения в интерфейсе."
                    checked={reduceMotion}
                    onChange={setReduceMotion}
                  />
                </div>
              ) : null}

              {section === "security" ? (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Безопасность</h2>
                  <Toggle
                    label="Двухфакторная аутентификация"
                    description="Подтверждение входа вторым фактором."
                    checked={twoFactor}
                    onChange={setTwoFactor}
                  />
                  <Toggle
                    label="Уведомления о входе"
                    description="Сообщать о новых устройствах."
                    checked={sessionAlerts}
                    onChange={setSessionAlerts}
                  />
                  <Button type="button" variant="secondary">
                    Изменить пароль
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </PageTransition>
    </AppShell>
  );
}
