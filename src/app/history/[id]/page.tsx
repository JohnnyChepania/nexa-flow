import type { Metadata } from "next";
import { ResultDetailRoute } from "@/features/result/ResultDetailRoute";
import { history } from "@/data/mock";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return history.map((record) => ({ id: record.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const record = history.find((item) => item.id === id);

  return {
    title: record?.title ?? "Результат генерации",
    description:
      record?.description ??
      "Demo-результат генерации NEXA FLOW.",
    alternates: {
      canonical: "/history/" + id
    }
  };
}

export default async function ResultDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <ResultDetailRoute id={id} />;
}
