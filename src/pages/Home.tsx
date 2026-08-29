import { Seo } from "@/components/shared/Seo";
import { Hero } from "@/components/home/Hero";
import { StatsSection } from "@/components/home/StatsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { CommunitySection } from "@/components/home/CommunitySection";
import { NewsPreviewSection } from "@/components/home/NewsPreviewSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { AdmissionsCTA } from "@/components/home/AdmissionsCTA";

export default function Home() {
  return (
    <>
      <Seo
        title="Stein & Steinmetz College for TVET | Pujehun"
        description="Stein & Steinmetz College for TVET - Pujehun. Practical technical and vocational education and training in IT, Construction & Carpentry, Mechanical & Auto, and Agro-Processing."
      />
      <Hero />
      <StatsSection />
      <AboutSection />
      <ProgramsSection />
      <WhyChooseSection />
      <AdmissionsCTA />
      <CommunitySection />
      <TestimonialsSection />
      <NewsPreviewSection />
    </>
  );
}
