import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
}

export function StatCard({ label, value, hint, icon: Icon }: StatCardProps) {
  return (
    <article className="panel group p-5 transition duration-300 hover:border-white/20 hover:bg-graphite-800/90">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-muted">{label}</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/5 text-aura-200 transition group-hover:text-aura-400">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-5 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-2 text-xs text-white/38">{hint}</p>
    </article>
  );
}
