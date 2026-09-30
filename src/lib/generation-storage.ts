import type { GenerationRecord } from "@/lib/types";

const STORAGE_KEY = "nexa-flow:generation-records";

function readRecords(): GenerationRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as GenerationRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveGenerationRecord(record: GenerationRecord): void {
  if (typeof window === "undefined") return;

  const records = readRecords().filter((item) => item.id !== record.id);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...records].slice(0, 50)));
}

export function getGenerationRecord(id: string): GenerationRecord | null {
  return readRecords().find((record) => record.id === id) ?? null;
}

export function getStoredGenerationRecords(): GenerationRecord[] {
  return readRecords();
}
