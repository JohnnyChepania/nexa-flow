import type { Metadata } from "next";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Ответы на частые вопросы о NEXA FLOW, генерациях и поддерживаемых форматах.",
  alternates: {
    canonical: "/faq"
  }
};

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-graphite-950">
      <div className="mx-auto w-full max-w-[900px] px-4 py-14 sm:px-6 sm:py-20">
        <Reveal>
          <p className="text-xs tracking-[0.18em] text-aura-200">FAQ</p>
          <h1 className="mt-4 font-semibold tracking-tight [font-size:clamp(2.5rem,5vw,3.25rem)]">
            Частые вопросы
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted">
            Как работает платформа, какие файлы можно загружать и что входит в бесплатный тариф.
          </p>
        </Reveal>
        <div className="mt-10">
          <FAQ />
        </div>
        <div className="panel mt-10 flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="text-sm text-muted">Готовы попробовать demo-генерацию?</p>
          <ButtonLink href="/generator" size="lg" className="shrink-0">
            Начать работу
          </ButtonLink>
        </div>
        <p className="mt-6 text-sm text-white/35">
          Остались вопросы?{" "}
          <Link href="/" className="text-aura-200 hover:text-aura-400">
            Поддержка
          </Link>
        </p>
      </div>
    </main>
  );
}
