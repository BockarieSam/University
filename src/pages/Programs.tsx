import { Seo } from "@/components/shared/Seo";
import { PageHero } from "@/components/shared/PageHero";
import { ProgramGrid } from "@/components/programs/ProgramGrid";
import { AdmissionsCTA } from "@/components/home/AdmissionsCTA";
import gate from "@/assets/images/campus/gate.jpg";

export default function Programs() {
  return (
    <>
      <Seo
        title="Programs"
        description="Explore technical and vocational programs at SSCTVET: Information Technology, Construction & Carpentry, Mechanical & Auto Engineering, and Agro-Processing."
      />
      <PageHero
        eyebrow="Technical & Vocational Programs"
        title="Choose a Skill. Start a Career."
        description="Explore the college's core training areas and see what each program offers, from practical labs and workshops to career opportunities."
        image={gate}
        crumb="Programs"
      />
      <section className="bg-white py-24">
        <div className="container-page">
          <ProgramGrid />
        </div>
      </section>
      <AdmissionsCTA compact />
    </>
  );
}
