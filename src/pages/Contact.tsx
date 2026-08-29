import { useSearchParams } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { Seo } from "@/components/shared/Seo";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { ApplicationForm } from "@/components/contact/ApplicationForm";
import { useContent } from "@/store/ContentContext";
import staff from "@/assets/images/campus/staff.jpg";

export default function Contact() {
  const [params] = useSearchParams();
  const presetCourse = params.get("program") ?? undefined;
  const { settings } = useContent();

  return (
    <>
      <Seo
        title="Contact & Admissions"
        description="Contact Stein & Steinmetz College for TVET in Pujehun, Sierra Leone, or start your application/inquiry for a technical and vocational program."
      />
      <PageHero
        eyebrow="Admissions & Contact"
        title="Start Your Application"
        description="Tell us about yourself and the program you are interested in. The college will contact you with further information."
        image={staff}
        crumb="Contact"
      />

      <section className="bg-white py-20">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <Card className="p-2 sm:p-4">
              <CardContent className="pt-6">
                <h3 className="font-display text-xl font-bold text-navy-900">
                  Application / Inquiry Form
                </h3>
                <p className="mb-6 mt-1 text-sm text-navy-700/70">
                  Complete the form below. Fields marked with * are required.
                </p>
                <ApplicationForm presetCourse={presetCourse} />
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.1} className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-display text-lg font-bold text-navy-900">
                  Contact SSC for TVET
                </h3>
                <p className="mt-1 text-sm text-navy-700/70">
                  Reach the college directly or use the map to find the Pujehun campus.
                </p>
                <ul className="mt-6 space-y-5">
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <div>
                      <p className="text-sm font-bold text-navy-900">Address</p>
                      <p className="text-sm text-navy-700/75">{settings.address}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <div>
                      <p className="text-sm font-bold text-navy-900">Phone</p>
                      <p className="text-sm text-navy-700/75">
                        {settings.phonePrimary}
                        <br />
                        {settings.phoneSecondary}
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <div>
                      <p className="text-sm font-bold text-navy-900">Email</p>
                      <p className="text-sm text-navy-700/75">{settings.email}</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="overflow-hidden rounded-2xl border border-navy-900/8 shadow-soft">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.603472096546!2d-11.719932725266687!3d7.354467289873873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf08c80f5a4d0b7d%3A0x8d033f8f5a73ed2f!2sMando%20Farm!5e0!3m2!1sen!2sus!4v1740000000000!5m2!1sen!2sus"
                className="h-72 w-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map showing Stein & Steinmetz College for TVET at Mando Farm off Gbondapi Road, Pujehun, Sierra Leone"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
