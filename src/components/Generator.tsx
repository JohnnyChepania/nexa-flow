"use client";

import { Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { UploadZone } from "@/components/UploadZone";
import { PreviewPanel } from "@/components/PreviewPanel";
import type {
  GenerationParams,
  GenerationRecord,
  GenerationStatus,
  ProcessingType,
  UploadFileMeta
} from "@/lib/types";
import { requestGeneration } from "@/lib/generation-api";

const typeOptions: Array<{ value: ProcessingType; label: string; hint: string }> = [
  { value: "image", label: "Изображение", hint: "Визуалы, обложки, адаптации" },
  { value: "text", label: "Текст", hint: "Тексты, сценарии, описания" },
  { value: "automation", label: "Автоматизация", hint: "Пайплайны и правила" }
];

const styleOptions: Record<ProcessingType, string[]> = {
  image: ["Кинематографичный", "Минимализм", "Редакционный", "Продуктовый"],
  text: ["Экспертный", "Дружелюбный", "Рекламный", "Технический"],
  automation: ["Пошаговый", "Событийный", "Пакетный", "Расписание"]
};

export function Generator() {
  const [file, setFile] = useState<UploadFileMeta | null>(null);
  const [type, setType] = useState<ProcessingType>("image");
  const [params, setParams] = useState<GenerationParams>({
    style: "Кинематографичный",
    format: "PNG",
    quality: "Высокое",
    count: 4
  });
  const [status, setStatus] = useState<GenerationStatus | "idle">("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<GenerationRecord | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formatOptions =
    type === "image"
      ? ["PNG", "JPG", "WEBP"]
      : type === "text"
        ? ["Markdown", "DOCX", "PDF"]
        : ["JSON", "YAML", "PDF"];

  const start = async () => {
    if (!file) {
      setError("Сначала загрузите файл.");
      setStatus("error");
      return;
    }

    setStatus("queued");
    setProgress(0);
    setResult(null);
    setError(null);

    await new Promise((resolve) => setTimeout(resolve, 500));
    setStatus("processing");

    const interval = setInterval(() => {
      setProgress((current) => Math.min(94, current + Math.random() * 11));
    }, 220);

    try {
      const response = await requestGeneration({ file, type, params });
      clearInterval(interval);
      setProgress(100);
      setResult(response.record);
      setStatus("completed");
    } catch {
      clearInterval(interval);
      setProgress(0);
      setError("Сервис временно недоступен. Повторите попытку.");
      setStatus("error");
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,440px)_minmax(0,1fr)]">
      <div className="space-y-6">
        <UploadZone file={file} onSelect={setFile} onError={setError} />

        <section className="panel p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Тип обработки</h2>
          <p className="mt-1 text-sm text-muted">Направление генерации и формат результата</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {typeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setType(option.value);
                  setParams((current) => ({
                    ...current,
                    style: styleOptions[option.value][0],
                    format:
                      option.value === "image"
                        ? "PNG"
                        : option.value === "text"
                          ? "Markdown"
                          : "JSON"
                  }));
                }}
                className={[
                  "rounded-2xl border p-4 text-left transition focus-ring",
                  type === option.value
                    ? "border-aura-400/40 bg-aura-500/10"
                    : "border-white/8 bg-white/3 hover:border-white/18 hover:bg-white/7"
                ].join(" ")}
              >
                <span className="block text-sm font-medium">{option.label}</span>
                <span className="mt-1 block text-xs text-white/40">{option.hint}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="panel p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/5 text-aura-200">
              <Wand2 className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-lg font-semibold">Параметры</h2>
              <p className="text-sm text-muted">Настройки текущей задачи</p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <Select
              label="Стиль"
              value={params.style}
              onChange={(event) =>
                setParams((current) => ({ ...current, style: event.target.value }))
              }
              options={styleOptions[type].map((style) => ({ value: style, label: style }))}
            />
            <Select
              label="Формат"
              value={params.format}
              onChange={(event) =>
                setParams((current) => ({ ...current, format: event.target.value }))
              }
              options={formatOptions.map((format) => ({ value: format, label: format }))}
            />
            <Select
              label="Качество"
              value={params.quality}
              onChange={(event) =>
                setParams((current) => ({ ...current, quality: event.target.value }))
              }
              options={[
                { value: "Стандарт", label: "Стандарт" },
                { value: "Высокое", label: "Высокое" },
                { value: "Максимум", label: "Максимум" }
              ]}
            />
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/70">
                Количество результатов: {params.count}
              </span>
              <input
                type="range"
                min={1}
                max={8}
                value={params.count}
                onChange={(event) =>
                  setParams((current) => ({
                    ...current,
                    count: Number(event.target.value)
                  }))
                }
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-aura-500"
              />
            </label>
          </div>

          <Button
            type="button"
            onClick={start}
            disabled={status === "processing" || status === "queued"}
            className="mt-7 w-full"
            size="lg"
          >
            <Sparkles className="h-4.5 w-4.5" />
            {status === "processing" || status === "queued"
              ? "Генерация выполняется"
              : "Запустить генерацию"}
          </Button>
          {error && status !== "error" ? (
            <p className="mt-3 text-xs text-red-200">{error}</p>
          ) : null}
        </section>
      </div>

      <PreviewPanel
        status={status}
        progress={progress}
        result={result}
        errorMessage={error}
      />
    </div>
  );
}
