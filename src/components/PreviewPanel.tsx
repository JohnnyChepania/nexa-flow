"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, FileText, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import type { GenerationRecord, GenerationStatus } from "@/lib/types";
import { formatDateTime } from "@/lib/format";

interface PreviewPanelProps {
  status: GenerationStatus | "idle";
  progress: number;
  result: GenerationRecord | null;
  errorMessage: string | null;
}

const statusText: Record<GenerationStatus, string> = {
  queued: "В очереди",
  processing: "Обработка",
  completed: "Готово",
  error: "Ошибка"
};

export function PreviewPanel({
  status,
  progress,
  result,
  errorMessage
}: PreviewPanelProps) {
  return (
    <section className="panel flex min-h-[520px] flex-col p-5 sm:p-6 lg:sticky lg:top-24">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Результат</h2>
          <p className="mt-1 text-sm text-muted">Предпросмотр и метаданные генерации</p>
        </div>
        {status !== "idle" ? (
          <span
            className={[
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs",
              status === "completed"
                ? "border-mint-400/30 bg-mint-400/10 text-mint-400"
                : status === "error"
                  ? "border-red-400/30 bg-red-500/10 text-red-200"
                  : "border-aura-400/30 bg-aura-500/10 text-aura-200"
            ].join(" ")}
          >
            {status === "processing" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : status === "completed" ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : status === "error" ? (
              <AlertCircle className="h-3.5 w-3.5" />
            ) : (
              <Sparkles className="h-3.5 w-3.5" />
            )}
            {statusText[status]}
          </span>
        ) : null}
      </div>

      <div className="mt-6 flex flex-1 flex-col">
        {status === "idle" ? (
          <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2 p-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/8 bg-graphite-800 text-aura-200">
              <Sparkles className="h-7 w-7" />
            </span>
            <p className="mt-5 text-base font-medium">Здесь появится результат</p>
            <p className="mt-2 max-w-xs text-sm text-muted">
              Загрузите файл, выберите тип обработки и запустите генерацию.
            </p>
          </div>
        ) : null}

        {status === "processing" || status === "queued" ? (
          <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-white/8 bg-graphite-800/70 p-8 text-center">
            <motion.div
              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-aura-400/30 bg-aura-500/10 text-aura-200"
              animate={{ scale: [1, 1.05, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Loader2 className="h-7 w-7 animate-spin" />
            </motion.div>
            <p className="mt-6 text-base font-medium">
              {status === "queued" ? "Задача добавлена в очередь" : "Анализируем файл и параметры"}
            </p>
            <p className="mt-2 text-sm text-muted">
              Demo-режим: обработка занимает около двух секунд.
            </p>
            <div className="mt-7 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-aura-400 to-mint-400"
                animate={{ width: progress + "%" }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              />
            </div>
            <p className="mt-3 text-xs text-white/38">{progress}%</p>
          </div>
        ) : null}

        {status === "completed" && result ? (
          <div className="flex flex-1 flex-col">
            <div className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-graphite-800 via-graphite-850 to-graphite-900 p-6">
              <div className="absolute inset-0 opacity-35 [background:radial-gradient(circle_at_30%_20%,rgba(75,140,248,0.35),transparent_55%),radial-gradient(circle_at_75%_75%,rgba(40,201,165,0.2),transparent_45%)]" />
              <div className="relative flex w-full max-w-sm flex-col gap-3">
                <div className="flex h-24 items-center justify-center rounded-xl border border-white/10 bg-graphite-950/60 text-aura-200">
                  <FileText className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <div className="h-2.5 w-4/5 rounded-full bg-white/12" />
                  <div className="h-2.5 w-full rounded-full bg-white/8" />
                  <div className="h-2.5 w-3/5 rounded-full bg-white/6" />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold">{result.title}</h3>
              <p className="mt-2 text-sm text-muted">{result.description}</p>
              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                <div className="panel-muted p-3">
                  <dt className="text-xs text-white/35">Дата</dt>
                  <dd className="mt-1">{formatDateTime(result.date)}</dd>
                </div>
                <div className="panel-muted p-3">
                  <dt className="text-xs text-white/35">Формат</dt>
                  <dd className="mt-1">{result.preview}</dd>
                </div>
              </dl>
              <Link
                href={"/history/" + result.id}
                className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-aura-500 px-6 text-sm font-medium text-white transition hover:bg-aura-400 focus-ring"
              >
                Открыть результат
              </Link>
            </div>
          </div>
        ) : null}

        {status === "error" ? (
          <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/8 p-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/30 bg-red-500/10 text-red-200">
              <AlertCircle className="h-7 w-7" />
            </span>
            <p className="mt-5 text-base font-medium">Не удалось выполнить генерацию</p>
            <p className="mt-2 max-w-sm text-sm text-red-100/75">
              {errorMessage ?? "Произошла demo-ошибка. Попробуйте запустить задачу снова."}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
