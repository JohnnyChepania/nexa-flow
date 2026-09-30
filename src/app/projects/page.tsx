import type { Metadata } from "next";
import { ProjectsScreen } from "@/features/projects/ProjectsScreen";

export const metadata: Metadata = {
  title: "Проекты",
  description: "Список проектов NEXA FLOW с фильтрацией, поиском и сортировкой.",
  alternates: {
    canonical: "/projects"
  }
};

export default function ProjectsPage() {
  return <ProjectsScreen />;
}
