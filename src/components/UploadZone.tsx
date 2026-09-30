"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FileText, ImageIcon, Trash2, UploadCloud } from "lucide-react";
import { useRef, type DragEvent } from "react";
import type { UploadFileMeta } from "@/lib/types";
import { formatFileSize } from "@/lib/format";

interface UploadZoneProps {
  file: UploadFileMeta | null;
  onSelect: (file: UploadFileMeta | null) => void;
  onError: (message: string | null) => void;
}

export function UploadZone({ file, onSelect, onError }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = (selected: File | undefined) => {
    if (!selected) return;

    if (selected.size > 12 * 1024 * 1024) {
      onError("Файл больше 12 МБ. Выберите другой файл.");
      return;
    }

    onError(null);
    const meta: UploadFileMeta = {
      name: selected.name,
      size: selected.size,
      type: selected.type,
      url: selected.type.startsWith("image/")
        ? URL.createObjectURL(selected)
        : undefined
    };

    onSelect(meta);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    processFile(event.dataTransfer.files?.[0]);
  };

  return (
    <section className="panel p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Файл для обработки</h2>
          <p className="mt-1 text-sm text-muted">
            Изображение, текстовый документ или данные для автоматизации.
          </p>
        </div>
      </div>

      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={onDrop}
        className="rounded-2xl border border-dashed border-white/12 bg-white/2 p-6 text-center transition hover:border-aura-400/40 hover:bg-aura-500/6"
      >
        <AnimatePresence mode="wait">
          {file ? (
            <motion.div
              key="selected"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-white/8 bg-graphite-800">
                {file.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={file.url} alt={file.name} className="h-full w-full object-cover" />
                ) : file.type.startsWith("text/") ? (
                  <FileText className="h-8 w-8 text-aura-200" />
                ) : (
                  <UploadCloud className="h-8 w-8 text-aura-200" />
                )}
              </div>
              <div>
                <p className="max-w-full truncate text-sm font-medium">{file.name}</p>
                <p className="mt-1 text-xs text-white/38">
                  {formatFileSize(file.size)} · {file.type || "неизвестный формат"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/72 hover:bg-white/10 focus-ring"
                >
                  Заменить
                </button>
                <button
                  type="button"
                  onClick={() => onSelect(null)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/72 hover:bg-red-500/10 hover:text-red-200 focus-ring"
                >
                  <Trash2 className="h-4 w-4" />
                  Удалить
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-4"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/8 bg-graphite-800 text-aura-200">
                <ImageIcon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-medium">Перетащите файл сюда</p>
                <p className="mt-1 text-xs text-white/38">
                  PNG, JPG, SVG, PDF, TXT, MD, DOCX, JSON · до 12 МБ
                </p>
              </div>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium hover:border-white/25 hover:bg-white/10 focus-ring"
              >
                Выбрать файл
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <input
          ref={inputRef}
          type="file"
          accept="image/*,.pdf,.txt,.md,.docx,.json"
          className="hidden"
          onChange={(event) => {
            processFile(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      </div>
    </section>
  );
}
