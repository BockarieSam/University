import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Program } from "@/types";
import { RevealItem } from "@/components/shared/Reveal";

export function ProgramCard({ program, index = 0 }: { program: Program; index?: number }) {
  return (
    <RevealItem>
      <Link
        to={`/programs/${program.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-900/8 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={program.image}
            alt={program.title}
            loading={index < 2 ? "eager" : "lazy"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-navy-800 backdrop-blur">
            {program.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-lg font-bold text-navy-900">{program.title}</h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-navy-700/75">
            {program.description}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-navy-900/8 pt-4 text-xs font-semibold text-navy-700/60">
            <span>{program.duration}</span>
          </div>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700">
            View Program
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </RevealItem>
  );
}
