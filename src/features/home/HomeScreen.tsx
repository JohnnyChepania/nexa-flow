"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  FileUp,
  FolderOpen,
  Layers,
  Lock,
  Menu,
  Settings2,
  Sparkles,
  Zap
} from "lucide-react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { FAQ } from "@/components/FAQ";
import { footerNavigation, navigation } from "@/data/mock";

const productCards = [
  {
    title: "Студия генерации",
    description:
      "Загрузка файлов, выбор типа обработки и параметры результата в одном рабочем окне.",
    icon: Sparkles
  },
  {
    title: "Проекты и история",
    description:
      "Все задачи, статусы и результаты в понятной структуре с фильтрацией и сортировкой.",
    icon: FolderOpen
  },
  {
    title: "Автоматизация",
    description:
      "Сценарии для повторяющихся задач: от обработки материалов до подготовки отчётов.",
    icon: Layers
  }
];

const features = [
  {
    title: "Загрузка материалов",
    description: "Drag & drop, файловый диалог и проверка размера файла.",
    icon: FileUp
  },
  {
    title: "Прозрачный процесс",
    description: "Очередь, прогресс, успешное завершение и понятные ошибки.",
    icon: Clock
  },
  {
    title: "Единое пространство",
    description: "Dashboard, проекты, история и настройки без переключения сервисов.",
    icon: Layers
  },
  {
    title: "Тонкая настройка",
    description: "Стиль, формат, качество и количество результатов.",
    icon: Settings2
  },
  {
    title: "Готовность к API",
    description:
      "Слой генерации изолирован, поэтому реальный сервис подключается без редизайна.",
    icon: Zap
  },
  {
    title: "Приватность по умолчанию",
    description: "Demo-режим не отправляет файлы: всё состояние остаётся в браузере.",
    icon: Lock
  }
];

const sectionHeading =
  "mt-4 max-w-2xl font-semibold tracking-tight [font-size:clamp(2.5rem,5vw,3.25rem)]";

export function HomeScreen() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] opacity-70 [background:radial-gradient(circle_at_18%_18%,rgba(75,140,248,0.18),transparent_45%),radial-gradient(circle_at_85%_12%,rgba(40,201,165,0.12),transparent_40%)]" />

      <header className="sticky top-0 z-80 border-b border-white/6 bg-graphite-950/82 backdrop-blur-xl">
        <div className="mx-auto flex h-18 w-full max-w-[1280px] items-center justify-between gap-6 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-aura-500/18 text-aura-200">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="text-base font-semibold tracking-tight">NEXA FLOW</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Верхняя навигация">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-white/60 transition hover:bg-white/8 hover:text-white focus-ring"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ButtonLink href="/dashboard" variant="ghost">
              Войти
            </ButtonLink>
            <ButtonLink href="/generator">Попробовать бесплатно</ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/65 hover:bg-white/8 focus-ring md:hidden"
            aria-label="Меню"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {mobileMenuOpen ? (
          <div className="border-t border-white/6 bg-graphite-900/98 px-4 py-4 md:hidden">
            <nav className="grid gap-2" aria-label="Мобильная навигация">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl border border-white/8 px-4 py-3 text-sm text-white/70"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 grid gap-3">
              <ButtonLink href="/dashboard" variant="secondary" className="w-full">
                Войти
              </ButtonLink>
              <ButtonLink href="/generator" className="w-full">
                Попробовать бесплатно
              </ButtonLink>
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section className="mx-auto grid w-full max-w-[1280px] items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:pb-28 lg:pt-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.18em] text-aura-200"
            >
              AI WORKSPACE
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-6 font-semibold leading-[1.06] tracking-tight [font-size:clamp(3.5rem,8vw,4.5rem)]"
            >
              Создавайте больше.
              <br />
              Делайте быстрее.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              Единое пространство для работы с AI-контентом, файлами и автоматизацией задач.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <ButtonLink href="/generator" size="lg">
                Начать работу
                <ArrowUpRight className="h-4.5 w-4.5" />
              </ButtonLink>
              <ButtonLink href="#features" variant="secondary" size="lg">
                Посмотреть возможности
              </ButtonLink>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="panel relative overflow-hidden p-5"
          >
            <div className="flex items-center justify-between border-b border-white/6 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-mint-400/70" />
              </div>
              <span className="text-xs text-white/35">NEXA FLOW · Generator</span>
            </div>
            <div className="grid gap-4 pt-5 md:grid-cols-[1fr_1.1fr]">
              <div className="space-y-3">
                <div className="rounded-2xl border border-dashed border-white/12 bg-white/3 p-4">
                  <FileUp className="h-5 w-5 text-aura-200" />
                  <p className="mt-3 text-sm font-medium">cover.png</p>
                  <p className="mt-1 text-xs text-white/35">2.4 МБ · PNG</p>
                </div>
                <div className="panel-muted p-4">
                  <p className="text-xs text-white/35">Тип</p>
                  <p className="mt-1 text-sm">Изображение</p>
                </div>
                <div className="panel-muted p-4">
                  <p className="text-xs text-white/35">Параметры</p>
                  <p className="mt-1 text-sm">Минимализм · PNG · 4</p>
                </div>
                <div className="rounded-xl bg-aura-500/18 px-4 py-3 text-sm text-aura-100">
                  Запустить генерацию
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative min-h-52 rounded-2xl border border-white/8 bg-gradient-to-br from-graphite-800 via-graphite-850 to-graphite-900">
                  <div className="absolute inset-0 rounded-2xl opacity-40 [background:radial-gradient(circle_at_25%_20%,rgba(75,140,248,0.36),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(40,201,165,0.22),transparent_45%)]" />
                  <div className="absolute inset-x-5 bottom-5 space-y-2">
                    <div className="h-2.5 rounded-full bg-white/14" />
                    <div className="h-2.5 w-4/5 rounded-full bg-white/8" />
                    <div className="h-2.5 w-3/5 rounded-full bg-white/5" />
                  </div>
                </div>
                <div className="panel-muted flex items-center justify-between p-4">
                  <span className="text-sm text-muted">Обработка</span>
                  <span className="text-xs text-aura-200">72%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="products" className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6">
          <Reveal>
            <p className="text-xs tracking-[0.18em] text-aura-200">ПРОДУКТ</p>
            <h2 className={sectionHeading}>Пространство, где контент не теряется</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {productCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.08}>
                <article className="panel h-full p-6 transition hover:border-white/18 hover:bg-graphite-800/90">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/8 bg-white/5 text-aura-200">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{card.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="features" className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6">
          <Reveal>
            <p className="text-xs tracking-[0.18em] text-aura-200">ВОЗМОЖНОСТИ</p>
            <h2 className={sectionHeading}>Всё необходимое для рабочего цикла</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.05}>
                <article className="panel-muted h-full p-5">
                  <feature.icon className="h-5 w-5 text-mint-400" />
                  <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted">{feature.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="support" className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6">
          <Reveal>
            <div className="panel flex flex-col items-start gap-6 p-8 sm:p-12">
              <div>
                <h2 className="font-semibold tracking-tight [font-size:clamp(2.5rem,5vw,3.25rem)]">
                  Попробуйте новый способ работать с AI.
                </h2>
                <p className="mt-4 max-w-xl text-base text-muted">
                  Откройте рабочее пространство, загрузите первый файл и посмотрите, как выглядит полный цикл генерации.
                </p>
              </div>
              <ButtonLink href="/generator" size="lg">
                Начать работу
              </ButtonLink>
            </div>
          </Reveal>
        </section>

        <section id="faq" className="mx-auto w-full max-w-[900px] px-4 py-16 sm:px-6">
          <Reveal>
            <p className="text-xs tracking-[0.18em] text-aura-200">FAQ</p>
            <h2 className="mt-4 font-semibold tracking-tight [font-size:clamp(2.5rem,5vw,3.25rem)]">
              Частые вопросы
            </h2>
          </Reveal>
          <div className="mt-10">
            <FAQ />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/6 bg-graphite-900/60">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold tracking-tight">NEXA FLOW</p>
            <p className="mt-2 text-sm text-white/40">© 2026 NEXA FLOW</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Нижняя навигация">
            {footerNavigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-white/55 transition hover:text-white focus-ring"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
