export type ProcessingType = "image" | "text" | "automation";
export type GenerationStatus = "queued" | "processing" | "completed" | "error";

export interface Project {
  id: string;
  name: string;
  type: ProcessingType;
  updatedAt: string;
  generations: number;
  preview: string;
}

export interface GenerationRecord {
  id: string;
  date: string;
  type: ProcessingType;
  projectId: string;
  projectName: string;
  status: GenerationStatus;
  title: string;
  result: string;
  description: string;
  preview: string;
}

export const projects: Project[] = [
  {
    id: "brand-visuals",
    name: "Брендовые визуалы",
    type: "image",
    updatedAt: "2026-09-30",
    generations: 18,
    preview: "Серия визуалов для launch-кампании"
  },
  {
    id: "product-copy",
    name: "Тексты для продукта",
    type: "text",
    updatedAt: "2026-09-29",
    generations: 42,
    preview: "Описания, email и лендинг"
  },
  {
    id: "content-automation",
    name: "Автоматизация контента",
    type: "automation",
    updatedAt: "2026-09-28",
    generations: 9,
    preview: "Пайплайн обработки публикаций"
  },
  {
    id: "rebrand-research",
    name: "Ресёрч ребрендинга",
    type: "text",
    updatedAt: "2026-09-27",
    generations: 25,
    preview: "Позиционирование и структура"
  },
  {
    id: "market-imagery",
    name: "Маркетинговые образы",
    type: "image",
    updatedAt: "2026-09-26",
    generations: 31,
    preview: "Тесты визуальных направлений"
  },
  {
    id: "ops-handbook",
    name: "Операционный справочник",
    type: "automation",
    updatedAt: "2026-09-25",
    generations: 6,
    preview: "Инструкции и регламенты"
  }
];

export const history: GenerationRecord[] = [
  {
    id: "gen-104",
    date: "2026-09-30T14:20:00",
    type: "image",
    projectId: "brand-visuals",
    projectName: "Брендовые визуалы",
    status: "completed",
    title: "Визуал для главной страницы",
    result: "4 результата",
    description: "Графитовая база, мягкий синий акцент и композиция с тремя уровнями глубины.",
    preview: "Изображение · 1600 × 1200 · PNG"
  },
  {
    id: "gen-103",
    date: "2026-09-30T11:45:00",
    type: "text",
    projectId: "product-copy",
    projectName: "Тексты для продукта",
    status: "completed",
    title: "Серия welcome email",
    result: "3 варианта",
    description: "Три сценария welcome-письма с разным тоном: сдержанным, дружелюбным и экспертным.",
    preview: "Текст · 1 240 слов · MD"
  },
  {
    id: "gen-102",
    date: "2026-09-29T18:10:00",
    type: "automation",
    projectId: "content-automation",
    projectName: "Автоматизация контента",
    status: "processing",
    title: "Пайплайн публикаций",
    result: "Обработка",
    description: "Сценарий проверяет материалы, распределяет задачи и формирует ежедневный отчёт.",
    preview: "Автоматизация · 6 шагов · JSON"
  },
  {
    id: "gen-101",
    date: "2026-09-29T09:32:00",
    type: "image",
    projectId: "market-imagery",
    projectName: "Маркетинговые образы",
    status: "error",
    title: "Ретро-серия для соцсетей",
    result: "Ошибка",
    description: "Демо-сценарий ошибки: превышен лимит одновременных задач.",
    preview: "Изображение · отмена"
  },
  {
    id: "gen-100",
    date: "2026-09-28T16:00:00",
    type: "text",
    projectId: "rebrand-research",
    projectName: "Ресёрч ребрендинга",
    status: "completed",
    title: "Карта сообщений",
    result: "Документ",
    description: "Структура позиционирования, сегменты аудитории и ключевые сообщения для каждого этапа.",
    preview: "Текст · 8 900 слов · PDF"
  },
  {
    id: "gen-99",
    date: "2026-09-28T10:05:00",
    type: "automation",
    projectId: "ops-handbook",
    projectName: "Операционный справочник",
    status: "completed",
    title: "Регламент поддержки",
    result: "Инструкция",
    description: "Пошаговый регламент для команды поддержки с правилами эскалации и шаблонами ответов.",
    preview: "Автоматизация · 12 правил · PDF"
  }
];

export const navigation = [
  { label: "Продукты", href: "#products" },
  { label: "Возможности", href: "#features" },
  { label: "Тарифы", href: "/pricing" },
  { label: "Документация", href: "#faq" }
];

export const footerNavigation = [
  { label: "Продукт", href: "#products" },
  { label: "Возможности", href: "#features" },
  { label: "Тарифы", href: "/pricing" },
  { label: "Документация", href: "#faq" },
  { label: "Поддержка", href: "#support" }
];
