"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { ResultDetailScreen } from "@/features/result/ResultDetailScreen";
import { history } from "@/data/mock";
import { getGenerationRecord } from "@/lib/generation-storage";
import type { GenerationRecord } from "@/lib/types";

export function ResultDetailRoute({ id }: { id: string }) {
  const [record, setRecord] = useState<GenerationRecord | null | undefined>(undefined);

  useEffect(() => {
    const stored = getGenerationRecord(id);
    setRecord(stored ?? history.find((item) => item.id === id) ?? null);
  }, [id]);

  if (record === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-graphite-950 px-6 text-sm text-muted">
        Загружаем результат…
      </div>
    );
  }

  if (!record) {
    notFound();
  }

  return <ResultDetailScreen record={record} />;
}
