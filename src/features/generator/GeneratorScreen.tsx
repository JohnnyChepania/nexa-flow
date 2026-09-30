import { AppShell } from "@/components/AppShell";
import { Generator } from "@/components/Generator";
import { PageTransition } from "@/components/ui/PageTransition";

export function GeneratorScreen() {
  return (
    <AppShell>
      <PageTransition>
        <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Новая генерация
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-muted sm:text-base">
              Загрузите материал, выберите тип обработки и параметры. Demo-режим полностью
              повторяет логику будущего API.
            </p>
          </div>
          <Generator />
        </div>
      </PageTransition>
    </AppShell>
  );
}
