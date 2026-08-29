import { Seo } from "@/components/shared/Seo";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, RevealItem, RevealStagger } from "@/components/shared/Reveal";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { AdmissionsCTA } from "@/components/home/AdmissionsCTA";
import staff from "@/assets/images/campus/staff.jpg";
import banner from "@/assets/images/campus/banner.jpg";

const values = [
  {
    title: "Our Mission",
    description:
      "To provide high-quality, practical technical and vocational skills that prepare youth in Pujehun for real career and entrepreneurship opportunities.",
  },
  {
    title: "Our Vision",
    description:
      "A Pujehun community where practical, technical education is a clear and trusted pathway to employment and enterprise.",
  },
  {
    title: "Our Approach",
    description:
      "Hands-on training led by qualified instructors, built around real tools, real workshops, and real community partnerships.",
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="About SSCTVET"
        description="Learn about Stein & Steinmetz College for TVET's mission, vision, and approach to practical technical and vocational education in Pujehun, Sierra Leone."
      />
      <PageHero
        eyebrow="About SSCTVET"
        title="Empowering the Future Through Practical Skills"
        description="Located at Mando Farm off Gbondapi Road, Pujehun, we are dedicated to providing high-quality technical and vocational skills to the youth."
        image={banner}
        crumb="About"
      />

      <section className="bg-white py-24">
        <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal className="overflow-hidden rounded-3xl shadow-lift">
            <img
              src={staff}
              alt="SSCTVET college staff"
              loading="lazy"
              className="aspect-[3/4] w-full object-cover"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Who We Are</span>
            <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">
              A Practical Institution Built for Pujehun
            </h2>
            <p className="mt-5 text-base leading-relaxed text-navy-700/80">
              Stein &amp; Steinmetz College for TVET is a technical and vocational institution
              located at Mando Farm off Gbondapi Road, Pujehun, Sierra Leone. With expert staff
              and facilities including the Dr. Andreas Kraemer Hall, the college aims to bridge
              the gap between education and practical industrial needs.
            </p>
            <p className="mt-4 text-base leading-relaxed text-navy-700/80">
              Students train across Information Technology, Construction &amp; Carpentry,
              Mechanical &amp; Auto Engineering, and Agro-Processing — with a consistent focus on
              hands-on, career-ready skills.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#fbfaf7] py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="What Drives Us"
            title="Mission, Vision & Values"
            description="The principles that guide every program and every classroom at SSCTVET."
          />
          <RevealStagger className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {values.map((v) => (
              <RevealItem
                key={v.title}
                className="rounded-2xl bg-white p-8 text-center shadow-soft"
              >
                <h3 className="font-display text-lg font-bold text-navy-900">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-700/75">{v.description}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <WhyChooseSection />
      <AdmissionsCTA compact />
    </>
  );
}