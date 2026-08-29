import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Seo } from "@/components/shared/Seo";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { AdmissionsCTA } from "@/components/home/AdmissionsCTA";
import { useContent } from "@/store/ContentContext";
import grad from "@/assets/images/campus/grad.jpg";

export default function Admissions() {
  const { faqs, programs } = useContent();
  return (
    <>
      <Seo
        title="Admissions"
        description="Admissions information for Stein & Steinmetz College for TVET, Pujehun. Learn how to apply for Information Technology, Construction & Carpentry, Mechanical & Auto, and Agro-Processing programs."
      />
      <PageHero
        eyebrow="Admissions 2026/2027"
        title="Start Your Technical Career Today"
        description="Follow a simple application process and choose the program that matches your goals."
        image={grad}
        crumb="Admissions"
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <Button asChild variant="gold" size="lg">
            <Link to="/contact">
              Start Application <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </PageHero>

      <AdmissionsCTA compact />

      <section className="bg-white py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Program Options"
            title="Choose Your Program of Interest"
            description="All programs run as 2 Years Diploma & 3 Years Higher Diploma tracks, with a practical, hands-on focus."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((p) => (
              <Link
                key={p.id}
                to={`/programs/${p.slug}`}
                className="group rounded-2xl border border-navy-900/8 p-5 text-center shadow-soft transition-shadow hover:shadow-lift"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="mx-auto mb-4 h-16 w-16 rounded-full object-cover"
                  loading="lazy"
                />
                <p className="font-display text-sm font-bold text-navy-900">{p.shortTitle}</p>
                <p className="mt-1 text-xs text-navy-700/60">{p.duration}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 bg-[#fbfaf7] py-24">
        <div className="container-page max-w-3xl">
          <SectionHeading
            eyebrow="Need Help?"
            title="Frequently Asked Questions"
            description="Quick answers to common questions. Contact the college if you need more information."
          />
          <Accordion className="rounded-2xl border border-navy-900/8 bg-white px-6" type="single">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
