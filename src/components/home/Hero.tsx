import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/store/ContentContext";
import gate from "@/assets/images/campus/gate.jpg";

export function Hero() {
  const { settings } = useContent();
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0">
        <img
          src={gate}
          alt="Stein & Steinmetz College for TVET campus entrance in Pujehun"
          className="h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />
      </div>

      <div className="container-page relative flex min-h-[640px] flex-col justify-center py-28 sm:min-h-[700px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-gold-300 backdrop-blur-sm"
        >
          <GraduationCap className="h-3.5 w-3.5" />
          {settings.heroEyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl text-balance font-display text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl"
        >
          {settings.heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
        >
          {settings.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Button asChild variant="gold" size="lg">
            <Link to="/programs">
              Explore Programs <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outlineLight" size="lg">
            <Link to="/admissions">Apply Now</Link>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 text-xs font-bold uppercase tracking-[0.2em] text-white/45"
        >
          Practical &nbsp;•&nbsp; Technical &nbsp;•&nbsp; Career-Focused
        </motion.p>
      </div>
    </section>
  );
}
