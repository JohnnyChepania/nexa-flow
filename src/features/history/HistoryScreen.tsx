"use client";

import { ArrowDownUp, Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { HistoryTable } from "@/components/HistoryTable";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { PageTransition } from "@/components/ui/PageTransition";
import { history } from "@/data/mock";

type StatusFilter = "all" | "completed" | "processing" | "error";
type TypeFilter = "all" | "image" | "text" | "automation";
type Sort = "date-desc" | "date-asc" | "project";

export function HistoryScreen() {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [type, setType] = useState<TypeFilter>("all");
  const [sort, setSort] = useState<Sort>("date-desc");
  const [query, setQuery] = useState("");

  const records = useMemo(() => {
    const visible = history.filter((record) => {
      const matchesStatus = status === "all" || record.status === status;
      const matchesType = type === "all" || record.type === type;
      const search = query.trim().toLowerCase();
      const matchesQuery =
        !search ||
        record.title.toLowerCase().includes(search) ||
        record.projectName.toLowerCase().includes(search) ||
        record.result.toLowerCase().includes(search);

      return matchesStatus && matchesType && matchesQuery;
    });

    return [...visible].sort((a, b) => {
      if (sort === "date-asc") return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sort === "project") return a.projectName.localeCompare(b.projectName, "ru");
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [query, sort, status, type]);

  return (
    <AppShell>
      <PageTransition>
        <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">История</h1>
            <p className="mt-3 text-sm text-muted sm:text-base">
              {records.length} операций в текущем представлении
            </p>
          </div>

          <div className="panel mt-8 grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_200px_200px_220px]">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              icon={<Search className="h-4 w-4" />}
              placeholder="Поиск по операциям"
              aria-label="Поиск по операциям"
            />
            <Select
              label="Статус"
              value={status}
              onChange={(event) => setStatus(event.target.value as StatusFilter)}
              options={[
                { value: "all", label: "Все статусы" },
                { value: "completed", label: "Готово" },
                { value: "processing", label: "В процессе" },
                { value: "error", label: "Ошибка" }
              ]}
            />
            <Select
              label="Тип"
              value={type}
              onChange={(event) => setType(event.target.value as TypeFilter)}
              options={[
                { value: "all", label: "Все типы" },
                { value: "image", label: "Изображение" },
                { value: "text", label: "Текст" },
                { value: "automation", label: "Автоматизация" }
              ]}
            />
            <Select
              label="Сортировка"
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
              options={[
                { value: "date-desc", label: "Сначала новые" },
                { value: "date-asc", label: "Сначала старые" },
                { value: "project", label: "По проекту" }
              ]}
            />
          </div>

          {records.length === 0 ? (
            <div className="panel mt-6 flex flex-col items-center justify-center px-6 py-16 text-center">
              <Filter className="h-8 w-8 text-white/25" />
              <p className="mt-4 text-base font-medium">Операции не найдены</p>
              <p className="mt-2 max-w-sm text-sm text-muted">
                Измените фильтры или очистите поиск.
              </p>
            </div>
          ) : (
            <div className="mt-6">
              <HistoryTable records={records} />
            </div>
          )}

          <p className="mt-4 flex items-center gap-2 text-xs text-white/35">
            <ArrowDownUp className="h-3.5 w-3.5" />
            Сортировка применяется после фильтрации и поиска.
          </p>
        </div>
      </PageTransition>
    </AppShell>
  );
}
