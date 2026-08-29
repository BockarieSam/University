import { Link } from "react-router-dom";
import { CalendarDays, ArrowRight } from "lucide-react";
import type { NewsItem } from "@/types";
import { RevealItem } from "@/components/shared/Reveal";

const categoryColors: Record<string, string> = {
  Admission: "bg-emerald-600/10 text-emerald-700",
  Graduation: "bg-gold-500/15 text-gold-600",
  Workshop: "bg-navy-900/8 text-navy-800",
};

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <RevealItem>
      <Link
        to={`/news/${item.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-900/8 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
      >
        <div className="h-2 w-full bg-gradient-to-r from-navy-900 via-emerald-600 to-gold-500" />
        <div className="flex flex-1 flex-col p-6">
          <span
            className={`mb-3 w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
              categoryColors[item.category] ?? "bg-navy-900/8 text-navy-800"
            }`}
          >
            {item.category}
          </span>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-navy-700/60">
            <CalendarDays className="h-3.5 w-3.5" />
            {item.date}
          </p>
          <h3 className="font-display text-lg font-bold text-navy-900">{item.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-700/75">{item.excerpt}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700">
            Read More
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </RevealItem>
  );
}
