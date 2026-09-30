import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResultDetailScreen } from "@/features/result/ResultDetailScreen";
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

  if (!record) {
    return {
      title: "Результат не найден"
    };
  }

  return {
    title: record.title,
    description: record.description,
    alternates: {
      canonical: "/history/" + record.id
    }
  };
}

export default async function ResultDetailPage({ params }: PageProps) {
  const { id } = await params;
  const record = history.find((item) => item.id === id);

  if (!record) {
    notFound();
  }

  return <ResultDetailScreen record={record} />;
}
