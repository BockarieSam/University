import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Reveal, RevealItem, RevealStagger } from "@/components/shared/Reveal";

const steps = [
  {
    number: "01",
    title: "Choose a Program",
    description: "Select the TVET area you want to study.",
  },
  {
    number: "02",
    title: "Complete the Form",
    description: "Provide your personal and academic details.",
  },
  {
    number: "03",
    title: "Submit",
    description: "Send your application to the college.",
  },
  {
    number: "04",
    title: "Follow Up",
    description: "The admissions team can contact you for next steps.",
  },
];

export function AdmissionsCTA({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "py-20" : "py-24"}>
      <div className="container-page">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-emerald-900 p-8 text-white sm:p-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <span className="eyebrow text-gold-300">Admissions 2026/2027</span>
              <h2 className="mt-3 text-balance font-display text-3xl font-extrabold sm:text-4xl">
                Ready to Start Your Technical Career?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Follow the simple application process and choose the program that matches your
                goals.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild variant="gold" size="lg">
                  <Link to="/contact">Start Application &rarr;</Link>
                </Button>
                <Button asChild variant="outlineLight" size="lg">
                  <Link to="/admissions#faq">Entry Questions</Link>
                </Button>
              </div>
            </Reveal>

            <RevealStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {steps.map((step) => (
                <RevealItem
                  key={step.number}
                  className="flex gap-4 rounded-2xl bg-white/5 p-5 backdrop-blur-sm"
                >
                  <span className="font-display text-2xl font-black text-gold-400">
                    {step.number}
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-white">{step.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/65">
                      {step.description}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </div>
    </section>
  );
}
