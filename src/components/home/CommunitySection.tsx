import { Reveal } from "@/components/shared/Reveal";
import group from "@/assets/images/campus/group.jpg";

const items = [
  {
    title: "Local Partnerships",
    description: "Working with community stakeholders to support practical education.",
  },
  {
    title: "Practical Skills",
    description: "Connecting learning to real technical and vocational activities.",
  },
  {
    title: "Future Opportunities",
    description: "Preparing learners for work, entrepreneurship, and continued growth.",
  },
];

export function CommunitySection() {
  return (
    <section className="bg-[#fbfaf7] py-24">
      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <Reveal className="overflow-hidden rounded-3xl shadow-lift">
          <img
            src={group}
            alt="SSCTVET community and partners"
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <span className="eyebrow">Community &amp; Partners</span>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Education Connected to the Community
          </h2>
          <p className="mt-5 text-base leading-relaxed text-navy-700/80">
            We pride ourselves on a collaborative ecosystem. The college works directly with
            local leaders, parents, and industry experts to ensure students receive relevant,
            practical education.
          </p>
          <div className="mt-8 space-y-5">
            {items.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div>
                  <h4 className="font-display text-sm font-bold text-navy-900">{item.title}</h4>
                  <p className="mt-1 text-sm text-navy-700/75">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
