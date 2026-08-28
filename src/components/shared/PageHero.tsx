import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  crumb,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  crumb: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0">
        <img src={image} alt="" className="h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/60" />
      </div>
      <div className="container-page relative py-20 sm:py-28">
        <nav className="mb-6 flex items-center gap-1.5 text-xs font-medium text-white/50">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white/80">{crumb}</span>
        </nav>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow text-gold-300">{eyebrow}</span>
          <h1 className="mt-3 max-w-2xl text-balance font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">{description}</p>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
