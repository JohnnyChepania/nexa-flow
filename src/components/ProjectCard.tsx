import Link from "next/link";
import { ArrowUpRight, ImageIcon, Layers, Sparkles } from "lucide-react";
import type { Project } from "@/lib/types";
import { formatDate } from "@/lib/format";

export function ProjectCard({ project }: { project: Project }) {
  const Icon =
    project.type === "image" ? ImageIcon : project.type === "text" ? Sparkles : Layers;

  return (
    <article className="panel group flex flex-col overflow-hidden p-0">
      <div className="relative flex h-40 items-center justify-center border-b border-white/6 bg-gradient-to-br from-graphite-800 via-graphite-850 to-graphite-900">
        <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_30%_25%,rgba(75,140,248,0.32),transparent_55%),radial-gradient(circle_at_70%_75%,rgba(40,201,165,0.18),transparent_45%)]" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-graphite-950/70 text-aura-200">
          <Icon className="h-6 w-6" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{project.preview}</p>
        <div className="mt-5 flex items-center justify-between gap-3 text-xs text-white/38">
          <span>{formatDate(project.updatedAt)}</span>
          <span>{project.generations} генераций</span>
        </div>
        <Link
          href="/history"
          className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium transition hover:border-white/25 hover:bg-white/10 focus-ring"
        >
          Открыть
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
