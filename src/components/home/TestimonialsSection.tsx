import { Quote } from "lucide-react";
import { useContent } from "@/store/ContentContext";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealItem, RevealStagger } from "@/components/shared/Reveal";

export function TestimonialsSection() {
  const { testimonials } = useContent();
  return (
    <section className="bg-[#fbfaf7] py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Student Success"
          title="Success Stories"
          description="Examples of how practical training can translate into career and entrepreneurship opportunities."
        />
        <RevealStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <RevealItem
              key={t.id}
              className="relative flex flex-col rounded-2xl bg-white p-7 shadow-soft"
            >
              <Quote className="mb-3 h-7 w-7 text-gold-400" />
              <p className="flex-1 text-sm leading-relaxed text-navy-800">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3 border-t border-navy-900/8 pt-5">
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="font-display text-sm font-bold text-navy-900">{t.name}</p>
                  <p className="text-xs text-emerald-700">{t.program}</p>
                  <p className="text-xs text-navy-700/60">{t.role}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
