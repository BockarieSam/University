import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProgramGrid } from "@/components/programs/ProgramGrid";

export function ProgramsSection() {
  return (
    <section className="bg-[#fbfaf7] py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Technical & Vocational Programs"
          title="Choose a Skill. Start a Career."
          description="Explore the college's core training areas and see what each program offers."
        />
        <ProgramGrid />
      </div>
    </section>
  );
}
