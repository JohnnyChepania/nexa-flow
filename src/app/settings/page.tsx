import type { Metadata } from "next";
import { SettingsScreen } from "@/features/settings/SettingsScreen";

export const metadata: Metadata = {
  title: "Настройки",
  description: "Настройки профиля, уведомлений, интерфейса и безопасности NEXA FLOW.",
  alternates: {
    canonical: "/settings"
  }
};

export default function SettingsPage() {
  return <SettingsScreen />;
}
