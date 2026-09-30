"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

const items = [
  {
    question: "Что входит в NEXA FLOW?",
    answer:
      "Рабочее пространство для загрузки файлов, настройки генераций, просмотра результатов, проектов и истории операций. Интерфейс работает на demo-данных и готов к подключению реального AI API."
  },
  {
    question: "Как работают генерации?",
    answer:
      "Вы загружаете файл, выбираете тип обработки и параметры, затем запускаете задачу. Приложение показывает очередь, обработку, прогресс и финальный результат с метаданными."
  },
  {
    question: "Можно ли загружать свои файлы?",
    answer:
      "Да. Поддерживается загрузка через drag & drop и файловый диалог. Файл остаётся в браузере и используется только для демонстрации интерфейса."
  },
  {
    question: "Какие форматы поддерживаются?",
    answer:
      "PNG, JPG, SVG, PDF, TXT, MD, DOCX и JSON. Ограничение на размер одного файла — 12 МБ."
  },
  {
    question: "Есть ли бесплатный тариф?",
    answer:
      "Да, тариф FREE доступен без оплаты. START и PRO расширяют лимиты и открывают дополнительные возможности для команд."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const open = openIndex === index;

        return (
          <div
            key={item.question}
            className={[
              "panel overflow-hidden transition",
              open ? "border-white/18 bg-graphite-800/90" : ""
            ].join(" ")}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-center justify-between gap-6 p-5 text-left focus-ring"
              aria-expanded={open}
            >
              <span className="text-base font-medium sm:text-lg">{item.question}</span>
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5"
              >
                <Plus className="h-4 w-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
