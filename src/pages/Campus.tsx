import { Seo } from "@/components/shared/Seo";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CampusGallery } from "@/components/campus/CampusGallery";
import { AdmissionsCTA } from "@/components/home/AdmissionsCTA";

import building from "@/assets/images/campus/building.jpg";
import staff from "@/assets/images/campus/staff.jpg";
import grad from "@/assets/images/campus/grad.jpg";
import group from "@/assets/images/campus/group.jpg";
import handsOn from "@/assets/images/campus/hands-on.jpg";
import gate from "@/assets/images/campus/gate.jpg";

const galleryImages = [
  {
    src: gate,
    alt: "SSCTVET campus gate",
    caption: "College Entrance, Mando Farm",
    span: "row-span-2" as const,
  },
  { src: building, alt: "Dr. Andreas Kraemer Building", caption: "Dr. Andreas Kraemer Hall" },
  { src: staff, alt: "College staff", caption: "Our Staff" },
  { src: grad, alt: "Graduation ceremony", caption: "Graduation & Student Success" },
  { src: group, alt: "SSCTVET community and partners", caption: "Community & Partners" },
  { src: handsOn, alt: "Hands-on practical training", caption: "Hands-On Training" },
];

export default function Campus() {
  return (
    <>
      <Seo
        title="Campus & Facilities"
        description="Explore the Stein & Steinmetz College for TVET campus in Pujehun — the Dr. Andreas Kraemer Hall, staff, workshops, and student community."
      />
      <PageHero
        eyebrow="Campus & Facilities"
        title="See Where Skills Become Practical"
        description="Explore selected views of the college, staff, and graduation activities at Mando Farm, Pujehun."
        image={building}
        crumb="Campus"
      />

      <section className="bg-white py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Photo Gallery"
            title="Life at SSCTVET"
            description="Click any photo for a closer look."
          />
          <CampusGallery images={galleryImages} />
        </div>
      </section>

      <AdmissionsCTA compact />
    </>
  );
}
