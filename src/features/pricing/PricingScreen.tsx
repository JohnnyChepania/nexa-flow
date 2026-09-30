"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PricingCard } from "@/components/PricingCard";
import { Reveal } from "@/components/ui/Reveal";

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "FREE",
    price: "0 ₽",
    period: "навсегда",
    description: "Для знакомства с платформой и первых задач.",
    features: [
      "200 кредитов в месяц",
      "3 проекта",
      "Базовые типы генерации",
      "История операций"
    ]
  },
  {
    id: "start",
    name: "START",
    price: "990 ₽",
    period: "/ месяц",
    description: "Для регулярной работы с контентом.",
    features: [
      "1 000 кредитов в месяц",
      "20 проектов",
      "Приоритетная очередь",
      "Экспорт результатов"
    ],
    highlighted: true
  },
  {
    id: "pro",
    name: "PRO",
    price: "1 990 ₽",
    period: "/ месяц",
    description: "Для команд и интенсивных рабочих процессов.",
    features: [
      "5 000 кредитов в месяц",
      "Без лимита проектов",
      "Расширенная автоматизация",
      "Приоритетная поддержка"
    ]
  }
];

export function PricingScreen() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  return (
    <div className="min-h-screen bg-graphite-950">
      <main className="mx-auto w-full max-w-[1280px] px-4 py-14 sm:px-6 sm:py-20">
        <Reveal className="text-center">
          <p className="text-xs tracking-[0.18em] text-aura-200">ТАРИФЫ</p>
          <h1 className="mx-auto mt-4 max-w-2xl font-semibold tracking-tight [font-size:clamp(2.5rem,5vw,3.25rem)]">
            Планы под ваш темп работы
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted">
            Платежи не подключены: выбор тарифа открывает demo-окно подтверждения.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 0.07}>
              <PricingCard
                name={plan.name}
                price={plan.price}
                period={plan.period}
                description={plan.description}
                features={plan.features}
                highlighted={plan.highlighted}
                onSelect={() => setSelectedPlan(plan)}
              />
            </Reveal>
          ))}
        </div>

        <div className="panel mt-8 flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">
              Попробуйте новый способ работать с AI.
            </h2>
            <p className="mt-2 text-sm text-muted">
              Начните с бесплатного тарифа и обновитесь, когда задач станет больше.
            </p>
          </div>
          <ButtonLink href="/generator" size="lg" className="shrink-0">
            Начать работу
          </ButtonLink>
        </div>
      </main>

      <Modal
        open={selectedPlan !== null}
        title={selectedPlan ? "Тариф " + selectedPlan.name : ""}
        description="Платежи в demo-версии не подключены."
        onClose={() => setSelectedPlan(null)}
        footer={
          <button
            type="button"
            onClick={() => setSelectedPlan(null)}
            className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/70 transition hover:bg-white/10"
          >
            Закрыть
          </button>
        }
      >
        <div className="panel-muted p-5">
          <p className="text-2xl font-semibold">
            {selectedPlan?.price}
            <span className="ml-2 text-sm font-normal text-white/40">
              {selectedPlan?.period}
            </span>
          </p>
          <ul className="mt-5 space-y-3">
            {selectedPlan?.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-sm text-white/70">
                <Check className="h-4 w-4 text-mint-400" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </div>
  );
}
