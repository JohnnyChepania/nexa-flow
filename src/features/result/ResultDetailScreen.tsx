"use client";

import Link from "next/link";
import { ArrowLeft, Download, RefreshCw, Wand2 } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PageTransition } from "@/components/ui/PageTransition";
import { formatDate, processingTypeLabels } from "@/lib/format";

interface ResultDetailScreenProps {
  record: {
    id: string;
    title: string;
    type: "image" | "text" | "automation";
    date: string;
    description: string;
    preview: string;
  };
}

export function ResultDetailScreen({ record }: ResultDetailScreenProps) {
  const [action, setAction] = useState<"download" | "repeat" | "variation" | null>(null);

  return (
    <AppShell>
      <PageTransition>
        <div className="mx-auto w-full max-w-[1100px] px-4 py-8 sm:px-6 sm:py-10">
          <Link
            href="/history"
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white focus-ring"
          >
            <ArrowLeft className="h-4 w-4" />
            История генераций
          </Link>

          <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs tracking-[0.18em] text-aura-200">
                {processingTypeLabels[record.type]}
              </p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                {record.title}
              </h1>
              <p className="mt-3 text-sm text-muted sm:text-base">{formatDate(record.date)}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="secondary" onClick={() => setAction("download")}>
                <Download className="h-4.5 w-4.5" />
                Скачать
              </Button>
              <Button variant="secondary" onClick={() => setAction("repeat")}>
                <RefreshCw className="h-4.5 w-4.5" />
                Повторить
              </Button>
              <Button onClick={() => setAction("variation")}>
                <Wand2 className="h-4.5 w-4.5" />
                Создать вариацию
              </Button>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <section className="panel relative flex min-h-[420px] items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-graphite-800 via-graphite-850 to-graphite-900" />
              <div className="absolute inset-0 opacity-35 [background:radial-gradient(circle_at_25%_20%,rgba(75,140,248,0.38),transparent_52%),radial-gradient(circle_at_75%_75%,rgba(40,201,165,0.22),transparent_45%)]" />
              <div className="relative w-[min(82%,520px)] rounded-2xl border border-white/10 bg-graphite-950/70 p-7">
                <div className="h-40 rounded-xl border border-white/8 bg-white/3" />
                <div className="mt-6 space-y-3">
                  <div className="h-3 w-4/5 rounded-full bg-white/12" />
                  <div className="h-3 w-full rounded-full bg-white/8" />
                  <div className="h-3 w-3/5 rounded-full bg-white/5" />
                </div>
              </div>
            </section>

            <aside className="space-y-5">
              <div className="panel p-5">
                <h2 className="text-lg font-semibold">Описание</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {record.description}
                </p>
              </div>
              <div className="panel p-5">
                <h2 className="text-lg font-semibold">Метаданные</h2>
                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="text-xs text-white/35">Тип</dt>
                    <dd className="mt-1">{processingTypeLabels[record.type]}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-white/35">Дата</dt>
                    <dd className="mt-1">{formatDate(record.date)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-white/35">Результат</dt>
                    <dd className="mt-1">{record.preview}</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </PageTransition>

      <Modal
        open={action !== null}
        title={
          action === "download"
            ? "Скачивание результата"
            : action === "repeat"
              ? "Повтор генерации"
              : "Создание вариации"
        }
        description="Это demo-действие: платежи и внешние API не подключаются."
        onClose={() => setAction(null)}
        footer={
          <Button variant="secondary" onClick={() => setAction(null)}>
            Понятно
          </Button>
        }
      >
        <div className="panel-muted p-4 text-sm text-muted">
          {action === "download"
            ? "Файл будет доступен после подключения хранилища результатов."
            : action === "repeat"
              ? "Задача повторно отправит исходные параметры генерации."
              : "Вариация сохранит стиль и создаст альтернативные результаты."}
        </div>
      </Modal>
    </AppShell>
  );
}
