import type { GenerationStatus, ProcessingType } from "./types";

export const processingTypeLabels: Record<ProcessingType, string> = {
  image: "Изображение",
  text: "Текст",
  automation: "Автоматизация"
};

export const statusLabels: Record<GenerationStatus, string> = {
  queued: "В очереди",
  processing: "В процессе",
  completed: "Готово",
  error: "Ошибка"
};

export function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

export function formatDateTime(value: string): string {
  return new Date(value).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return bytes + " Б";
  }

  if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(1) + " КБ";
  }

  return (bytes / 1024 / 1024).toFixed(1) + " МБ";
}
