import { Link } from "react-router-dom";
import { Compass, ArrowLeft } from "lucide-react";
import { Seo } from "@/components/shared/Seo";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you're looking for could not be found on the SSCTVET website."
      />
      <section className="flex min-h-[70vh] items-center bg-[#fbfaf7] py-24">
        <div className="container-page text-center">
          <Reveal>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-navy-900/5 text-navy-900">
              <Compass className="h-10 w-10" />
            </div>
            <p className="font-display text-6xl font-black text-navy-900">404</p>
            <h1 className="mt-3 font-display text-2xl font-extrabold text-navy-900 sm:text-3xl">
              Page Not Found
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-navy-700/75">
              The page you're looking for doesn't exist or may have moved. Let's get you back on
              track.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4" /> Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/programs">Explore Programs</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
