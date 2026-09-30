import type { Metadata } from "next";
import { PricingScreen } from "@/features/pricing/PricingScreen";

export const metadata: Metadata = {
  title: "Тарифы",
  description:
    "Тарифы NEXA FLOW: FREE, START и PRO. Оплата не подключена, выбор тарифа открывает demo-окно.",
  alternates: {
    canonical: "/pricing"
  }
};

export default function PricingPage() {
  return <PricingScreen />;
}
