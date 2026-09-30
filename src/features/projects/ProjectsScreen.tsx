"use client";

import { Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ProjectCard } from "@/components/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { PageTransition } from "@/components/ui/PageTransition";
import { projects } from "@/data/mock";

type Filter = "all" | "image" | "text" | "automation";
type Sort = "updated" | "generations" | "name";

const filters: Array<{ value: Filter; label: string }> = [
  { value: "all", label: "Все" },
  { value: "image", label: "Изображения" },
  { value: "text", label: "Текст" },
  { value: "automation", label: "Другое" }
];

export function ProjectsScreen() {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("updated");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const visible = projects.filter((project) => {
      const matchesFilter = filter === "all" || project.type === filter;
      const search = query.trim().toLowerCase();
      const matchesQuery =
        !search ||
        project.name.toLowerCase().includes(search) ||
        project.preview.toLowerCase().includes(search);

      return matchesFilter && matchesQuery;
    });

    return [...visible].sort((a, b) => {
      if (sort === "generations") return b.generations - a.generations;
      if (sort === "name") return a.name.localeCompare(b.name, "ru");
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [filter, query, sort]);

  return (
    <AppShell>
      <PageTransition>
        <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Проекты</h1>
              <p className="mt-3 text-sm text-muted sm:text-base">
                {filtered.length} проектов в текущем представлении
              </p>
            </div>
            <ButtonLink href="/generator" size="lg" className="shrink-0">
              Новый проект
            </ButtonLink>
          </div>

          <div className="panel mt-8 flex flex-col gap-5 p-5 lg:flex-row lg:items-end">
            <div className="min-w-0 flex-1">
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                icon={<Search className="h-4 w-4" />}
                placeholder="Поиск проекта"
                aria-label="Поиск проекта"
              />
            </div>
            <div className="grid gap-2 sm:grid-cols-4 lg:w-auto lg:grid-cols-none lg:flex-row">
              {filters.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFilter(item.value)}
                  className={[
                    "rounded-xl border px-4 py-2.5 text-sm transition focus-ring",
                    filter === item.value
                      ? "border-aura-400/35 bg-aura-500/12 text-white"
                      : "border-white/8 bg-white/3 text-white/60 hover:bg-white/8"
                  ].join(" ")}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="lg:w-56">
              <Select
                aria-label="Сортировка"
                value={sort}
                onChange={(event) => setSort(event.target.value as Sort)}
                options={[
                  { value: "updated", label: "По дате" },
                  { value: "generations", label: "По генерациям" },
                  { value: "name", label: "По названию" }
                ]}
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="panel mt-6 flex flex-col items-center justify-center px-6 py-16 text-center">
              <Filter className="h-8 w-8 text-white/25" />
              <p className="mt-4 text-base font-medium">Проекты не найдены</p>
              <p className="mt-2 max-w-sm text-sm text-muted">
                Измените фильтр или очистите поиск.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </PageTransition>
    </AppShell>
  );
}
