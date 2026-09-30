import { Clock, FolderOpen, Sparkles, Wallet } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ProjectCard } from "@/components/ProjectCard";
import { StatCard } from "@/components/StatCard";
import { ButtonLink } from "@/components/ui/Button";
import { PageTransition } from "@/components/ui/PageTransition";
import { projects } from "@/data/mock";

export function DashboardScreen() {
  return (
    <AppShell>
      <PageTransition>
        <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Добрый день
              </h1>
              <p className="mt-3 text-sm text-muted sm:text-base">
                Рабочее пространство обновлено: 3 задачи завершены, 1 выполняется.
              </p>
            </div>
            <ButtonLink href="/generator" size="lg" className="shrink-0">
              <Sparkles className="h-4.5 w-4.5" />
              Новая генерация
            </ButtonLink>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Генераций сегодня"
              value="12"
              hint="+4 к вчерашнему дню"
              icon={Sparkles}
            />
            <StatCard
              label="Проектов"
              value="6"
              hint="2 активных в работе"
              icon={FolderOpen}
            />
            <StatCard
              label="Использовано"
              value="128"
              hint="из 200 кредитов"
              icon={Wallet}
            />
            <StatCard
              label="В очереди"
              value="1"
              hint="Среднее время: 2 минуты"
              icon={Clock}
            />
          </div>

          <section className="mt-12">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold sm:text-2xl">Последние проекты</h2>
              <ButtonLink href="/projects" variant="ghost" size="sm">
                Все проекты
              </ButtonLink>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {projects.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        </div>
      </PageTransition>
    </AppShell>
  );
}
