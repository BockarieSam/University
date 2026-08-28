import { useContent } from "@/store/ContentContext";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { NewsCard } from "./NewsCard";
import { RevealStagger } from "@/components/shared/Reveal";

export function NewsPreviewSection() {
  const { news } = useContent();
  return (
    <section className="bg-white py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Latest Updates"
          title="News & Events"
          description="Important announcements and activities for students, applicants, and families."
        />
        <RevealStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
