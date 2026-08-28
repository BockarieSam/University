import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealItem, RevealStagger } from "@/components/shared/Reveal";

const reasons = [
  {
    title: "Practical Training",
    description: "Learning built around real, hands-on technical work rather than theory alone.",
  },
  {
    title: "Industry-Relevant Skills",
    description: "Programs designed to match what employers and enterprises actually need.",
  },
  {
    title: "Experienced Instructors",
    description: "Training guided by qualified, technical professionals in each field.",
  },
  {
    title: "Career Development",
    description: "A pathway toward employment, self-employment, and entrepreneurship.",
  },
  {
    title: "Hands-On Learning",
    description: "Workshops, labs, and processing facilities used for real, applied practice.",
  },
  {
    title: "Community Impact",
    description: "Education connected to the needs of Pujehun and the surrounding community.",
  },
];

export function WhyChooseSection() {
  return (
    <section className="bg-white py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why SSCTVET"
          title="Why Choose SSCTVET?"
          description="A practical, career-focused approach to technical and vocational education."
        />
        <RevealStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <RevealItem
              key={reason.title}
              className="group rounded-2xl border border-navy-900/8 p-7 transition-colors duration-300 hover:border-emerald-600/30 hover:bg-emerald-50/40"
            >
              <h3 className="font-display text-base font-bold text-navy-900">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/75">{reason.description}</p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
