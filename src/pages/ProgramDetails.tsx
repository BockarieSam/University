import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Layers, Briefcase } from "lucide-react";
import { Seo } from "@/components/shared/Seo";
import { Reveal, RevealItem, RevealStagger } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CampusGallery } from "@/components/campus/CampusGallery";
import { useContent } from "@/store/ContentContext";

export default function ProgramDetails() {
  const { slug } = useParams();
  const { programs: cmsPrograms } = useContent();
  const program = slug ? cmsPrograms.find((p) => p.slug === slug) : undefined;

  if (!program) {
    return <Navigate to="/404" replace />;
  }

  const otherPrograms = cmsPrograms.filter((p) => p.id !== program.id);

  return (
    <>
      <Seo title={program.title} description={program.description} />

      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0">
          <img src={program.image} alt="" className="h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/55" />
        </div>
        <div className="container-page relative py-20 sm:py-28">
          <Link
            to="/programs"
            className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Programs
          </Link>
          <Reveal>
            <Badge variant="outline" className="mb-4">
              {program.category}
            </Badge>
            <h1 className="max-w-2xl text-balance font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              {program.title}
            </h1>
            <p className="mt-3 font-display text-lg font-semibold text-gold-300">
              {program.tagline}
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
              {program.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur">
                <Clock className="h-3.5 w-3.5 text-gold-400" />
                {program.duration}
              </span>
              <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur">
                <Layers className="h-3.5 w-3.5 text-gold-400" />
                {program.format}
              </span>
            </div>

            <div className="mt-8">
              <Button asChild variant="gold" size="lg">
                <Link to="/contact">
                  Apply for this Program <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <span className="eyebrow">Overview</span>
              <h2 className="mt-3 font-display text-2xl font-extrabold text-navy-900 sm:text-3xl">
                {program.tagline}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy-700/80">
                {program.description}
              </p>
            </Reveal>

            <div className="mt-12">
              <Reveal>
                <span className="eyebrow">What Students Learn</span>
                <h3 className="mt-3 font-display text-xl font-bold text-navy-900">
                  Core Curriculum
                </h3>
              </Reveal>
              <RevealStagger className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {program.whatYouLearn.map((item) => (
                  <RevealItem
                    key={item}
                    className="flex items-start gap-2.5 rounded-xl border border-navy-900/8 p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span className="text-sm font-medium text-navy-800">{item}</span>
                  </RevealItem>
                ))}
              </RevealStagger>
            </div>

            <div className="mt-12">
              <Reveal>
                <span className="eyebrow">Practical Training</span>
                <h3 className="mt-3 font-display text-xl font-bold text-navy-900">
                  Hands-On Learning
                </h3>
                <p className="mt-4 rounded-2xl bg-emerald-600/5 p-6 text-sm leading-relaxed text-navy-800">
                  {program.practicalTraining}
                </p>
              </Reveal>
            </div>

            {program.gallery.length > 0 && (
              <div className="mt-12">
                <Reveal>
                  <span className="eyebrow">Program Gallery</span>
                  <h3 className="mt-3 mb-6 font-display text-xl font-bold text-navy-900">
                    See the Program in Action
                  </h3>
                </Reveal>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <CampusGallery
                    images={program.gallery.map((g) => ({
                      src: g.src,
                      alt: g.caption,
                      caption: g.caption,
                    }))}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Reveal className="rounded-2xl border border-navy-900/8 p-7 shadow-soft">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/15 text-gold-600">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-bold text-navy-900">
                Career Opportunities
              </h3>
              <ul className="mt-4 space-y-3">
                {program.careerPaths.map((role) => (
                  <li
                    key={role}
                    className="flex items-center gap-2.5 text-sm font-medium text-navy-800"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                    {role}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal
              delay={0.05}
              className="rounded-2xl bg-navy-950 p-7 text-white shadow-soft"
            >
              <h3 className="font-display text-base font-bold">Ready to Apply?</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Start your application for {program.title} today. The admissions team will
                follow up with next steps.
              </p>
              <Button asChild variant="gold" className="mt-5 w-full">
                <Link to="/contact">Apply for this Program</Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-navy-900/8 bg-[#fbfaf7] py-20">
        <div className="container-page">
          <span className="eyebrow">Explore More</span>
          <h2 className="mt-3 mb-8 font-display text-2xl font-extrabold text-navy-900 sm:text-3xl">
            Other Programs
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {otherPrograms.map((p) => (
              <Link
                key={p.id}
                to={`/programs/${p.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-navy-900/8 bg-white p-4 shadow-soft transition-shadow hover:shadow-lift"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-16 w-16 shrink-0 rounded-xl object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="font-display text-sm font-bold text-navy-900">{p.shortTitle}</p>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                    View Program{" "}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
