import type { Metadata } from "next";
import { DashboardScreen } from "@/features/dashboard/DashboardScreen";

export const metadata: Metadata = {
  title: "Обзор",
  description: "Dashboard NEXA FLOW: статистика генераций, проекты и текущие задачи.",
  alternates: {
    canonical: "/dashboard"
  }
};

export default function DashboardPage() {
  return <DashboardScreen />;
}
