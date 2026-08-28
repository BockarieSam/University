import { useContent } from "@/store/ContentContext";
import { ProgramCard } from "./ProgramCard";
import { RevealStagger } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

export function ProgramGrid({ className }: { className?: string }) {
  const { programs } = useContent();
  return (
    <RevealStagger
      className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4", className)}
    >
      {programs.map((program, i) => (
        <ProgramCard key={program.id} program={program} index={i} />
      ))}
    </RevealStagger>
  );
}
