import type { Metadata } from "next";
import { HistoryScreen } from "@/features/history/HistoryScreen";

export const metadata: Metadata = {
  title: "История",
  description: "История генераций NEXA FLOW со статусами, фильтрацией и сортировкой.",
  alternates: {
    canonical: "/history"
  }
};

export default function HistoryPage() {
  return <HistoryScreen />;
}
