import { useCountUp } from "@/hooks/useCountUp";
import { RevealItem, RevealStagger } from "@/components/shared/Reveal";

const numericStats = [
  { target: 4, suffix: "+", label: "Technical Programs" },
  { target: 70, suffix: "%", label: "Practical Learning" },
];

const qualitativeStats = [
  { label: "Industry-Focused Training" },
  { label: "Career-Oriented Education" },
];

function NumberStat({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const { ref, value } = useCountUp(target);
  return (
    <RevealItem className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-soft" >
      <div ref={ref}>
        <p className="font-display text-3xl font-extrabold text-navy-900">
          {value}
          {suffix}
        </p>
        <p className="text-sm font-medium text-navy-700/70">{label}</p>
      </div>
    </RevealItem>
  );
}

export function StatsSection() {
  return (
    <section className="relative z-10 -mt-14 sm:-mt-16">
      <div className="container-page">
        <RevealStagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {numericStats.map((stat) => (
            <NumberStat key={stat.label} {...stat} />
          ))}
          {qualitativeStats.map((stat) => (
            <RevealItem
              key={stat.label}
              className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-soft"
            >
              <p className="font-display text-base font-bold text-navy-900">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
