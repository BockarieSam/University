import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";
import logo from "@/assets/images/logo/logo.jpg";
import building from "@/assets/images/campus/building.jpg";

export function AboutSection() {
  return (
    <section className="section-alt bg-white py-24">
      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="overflow-hidden rounded-3xl shadow-lift">
            <img
              src={building}
              alt="Dr. Andreas Kraemer Hall at SSCTVET campus"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 flex max-w-[220px] items-center gap-3 rounded-2xl bg-navy-900 p-4 text-white shadow-lift sm:-right-8">
            <img src={logo} alt="SSCTVET" className="h-11 w-11 rounded-full object-cover" />
            <div>
              <p className="text-xs font-bold text-gold-300">&ldquo;The Future is Here&rdquo;</p>
              <p className="text-[11px] text-white/70">SSC for TVET</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="eyebrow">About Our College</span>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Empowering the Future Through Practical Skills
          </h2>
          <p className="mt-5 text-base leading-relaxed text-navy-700/80">
            Located at Mando Farm off Gbondapi Road, Pujehun, our college is dedicated to
            providing high-quality technical and vocational skills to the youth. With expert
            staff and facilities including the Dr. Andreas Kraemer Hall, we aim to bridge the
            gap between education and practical industrial needs.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-navy-900/8 p-4">
              <div>
                <p className="font-display text-sm font-bold text-navy-900">Our Mission</p>
                <p className="mt-1 text-xs leading-relaxed text-navy-700/70">
                  Equip youth with practical, career-ready technical skills.
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-navy-900/8 p-4">
              <div>
                <p className="font-display text-sm font-bold text-navy-900">Our Vision</p>
                <p className="mt-1 text-xs leading-relaxed text-navy-700/70">
                  A Pujehun where practical education drives opportunity.
                </p>
              </div>
            </div>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {[
              "Qualified Technical Instructors",
              "Hands-on Practical Training",
              "Strong Community Partnership",
              "Career and Entrepreneurship Skills",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-navy-800">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600/15 text-[10px] font-black text-emerald-700">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <Button asChild className="mt-8">
            <Link to="/admissions">
              Learn About Admissions <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
