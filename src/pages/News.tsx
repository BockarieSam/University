import { Seo } from "@/components/shared/Seo";
import { PageHero } from "@/components/shared/PageHero";
import { NewsCard } from "@/components/home/NewsCard";
import { RevealStagger } from "@/components/shared/Reveal";
import { useContent } from "@/store/ContentContext";
import banner from "@/assets/images/campus/banner.jpg";

export default function News() {
  const { news } = useContent();
  return (
    <>
      <Seo
        title="News & Events"
        description="Latest news, admissions announcements, and events from Stein & Steinmetz College for TVET, Pujehun."
      />
      <PageHero
        eyebrow="Latest Updates"
        title="News & Events"
        description="Important announcements and activities for students, applicants, and families."
        image={banner}
        crumb="News"
      />
      <section className="bg-white py-24">
        <div className="container-page">
          <RevealStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </RevealStagger>
        </div>
      </section>
    </>
  );
}
