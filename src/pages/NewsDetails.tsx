import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Seo } from "@/components/shared/Seo";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { useContent } from "@/store/ContentContext";

export default function NewsDetails() {
  const { slug } = useParams();
  const { news } = useContent();
  const item = news.find((n) => n.slug === slug);

  if (!item) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <Seo title={item.title} description={item.excerpt} />
      <section className="bg-[#fbfaf7] py-20">
        <div className="container-page max-w-2xl">
          <Link
            to="/news"
            className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-navy-700/60 hover:text-navy-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to News
          </Link>
          <Reveal>
            <span className="eyebrow">{item.category}</span>
            <h1 className="mt-3 text-balance font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">
              {item.title}
            </h1>
            <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-navy-700/60">
              <CalendarDays className="h-4 w-4" />
              {item.date}
            </p>
            <div className="mt-8 space-y-4">
              {item.body.map((para, i) => (
                <p key={i} className="text-base leading-relaxed text-navy-800">
                  {para}
                </p>
              ))}
            </div>
            <Button asChild className="mt-10">
              <Link to="/contact">Contact Admissions</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
