import type { Metadata } from "next";
import { GeneratorScreen } from "@/features/generator/GeneratorScreen";

export const metadata: Metadata = {
  title: "Новая генерация",
  description: "Загрузите файл, настройте параметры и запустите генерацию в NEXA FLOW.",
  alternates: {
    canonical: "/generator"
  }
};

export default function GeneratorPage() {
  return <GeneratorScreen />;
}
