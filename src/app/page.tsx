import type { Metadata } from "next";
import { HomeScreen } from "@/features/home/HomeScreen";

export const metadata: Metadata = {
  alternates: {
    canonical: "/"
  }
};

export default function HomePage() {
  return <HomeScreen />;
}
