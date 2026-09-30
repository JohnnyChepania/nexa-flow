"use client";

import Link from "next/link";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import type { GenerationRecord } from "@/lib/types";
import { formatDateTime, processingTypeLabels, statusLabels } from "@/lib/format";

interface HistoryTableProps {
  records: GenerationRecord[];
}

export function HistoryTable({ records }: HistoryTableProps) {
  if (records.length === 0) {
    return (
      <div className="panel flex flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-base font-medium">Ничего не найдено</p>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Измените фильтры или запустите новую генерацию.
        </p>
      </div>
    );
  }

  return (
    <div className="panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[840px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-white/3">
              <th className="px-5 py-4 font-medium text-white/45">Дата</th>
              <th className="px-5 py-4 font-medium text-white/45">Тип</th>
              <th className="px-5 py-4 font-medium text-white/45">Проект</th>
              <th className="px-5 py-4 font-medium text-white/45">Статус</th>
              <th className="px-5 py-4 font-medium text-white/45">Результат</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr
                key={record.id}
                className="border-b border-white/5 transition last:border-0 hover:bg-white/4"
              >
                <td className="px-5 py-4 whitespace-nowrap text-white/65">
                  {formatDateTime(record.date)}
                </td>
                <td className="px-5 py-4">{processingTypeLabels[record.type]}</td>
                <td className="px-5 py-4">{record.projectName}</td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-2 whitespace-nowrap">
                    {record.status === "completed" ? (
                      <CheckCircle2 className="h-4 w-4 text-mint-400" />
                    ) : record.status === "processing" ? (
                      <Loader2 className="h-4 w-4 animate-spin text-aura-200" />
                    ) : record.status === "error" ? (
                      <AlertCircle className="h-4 w-4 text-red-300" />
                    ) : null}
                    {statusLabels[record.status]}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <Link
                    href={"/history/" + record.id}
                    className="inline-flex max-w-[240px] items-center gap-2 truncate rounded-lg px-2 py-1 font-medium text-aura-200 hover:bg-aura-500/10 focus-ring"
                  >
                    {record.result}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
