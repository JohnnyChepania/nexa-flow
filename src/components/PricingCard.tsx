"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  onSelect: () => void;
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  highlighted = false,
  onSelect
}: PricingCardProps) {
  return (
    <article
      className={[
        "panel relative flex flex-col p-6 sm:p-7",
        highlighted ? "border-aura-400/35 bg-graphite-800/95 shadow-glow" : ""
      ].join(" ")}
    >
      {highlighted ? (
        <span className="absolute right-6 top-6 rounded-full border border-aura-400/30 bg-aura-500/10 px-3 py-1 text-xs text-aura-200">
          Популярный
        </span>
      ) : null}
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="mt-3 flex items-baseline gap-2">
        <span className="text-4xl font-semibold tracking-tight">{price}</span>
        <span className="text-sm text-white/40">{period}</span>
      </p>
      <p className="mt-4 text-sm text-muted">{description}</p>
      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-white/72">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint-400" />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        type="button"
        variant={highlighted ? "primary" : "secondary"}
        className="mt-8 w-full"
        onClick={onSelect}
      >
        Выбрать тариф
      </Button>
    </article>
  );
}
