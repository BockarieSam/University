import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/images/logo/logo.jpg";
import { useContent } from "@/store/ContentContext";

const quickLinks = [
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/admissions", label: "Admissions" },
  { to: "/campus", label: "Campus" },
  { to: "/news", label: "News & Events" },
  { to: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const { programs, settings } = useContent();

  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="container-page grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="mb-4 flex items-center gap-2.5">
            <img src={logo} alt="SSCTVET Logo" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-display text-sm font-extrabold text-white">SSC for TVET</span>
          </Link>
          <p className="mb-1 font-display text-base font-bold text-white">
            Stein &amp; Steinmetz College for TVET
          </p>
          <p className="text-sm leading-relaxed text-white/60">
            Practical technical and vocational education in Pujehun. &ldquo;The Future is
            Here.&rdquo;
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-white">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="link-underline hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-white">
            Programs
          </h4>
          <ul className="space-y-2.5 text-sm">
            {programs.map((p) => (
              <li key={p.id}>
                <Link
                  to={`/programs/${p.slug}`}
                  className="link-underline hover:text-white"
                >
                  {p.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-white">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-gold-400" />
              {settings.address}
            </li>
            <li className="flex gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-gold-400" />
              <span>
                {settings.phonePrimary}
                <br />
                {settings.phoneSecondary}
              </span>
            </li>
            <li className="flex gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-gold-400" />
              {settings.email}
            </li>
          </ul>
          <Link
            to="/contact"
            className="mt-4 inline-block text-sm font-bold text-gold-400 hover:text-gold-300"
          >
            Send an Inquiry &rarr;
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/40 sm:flex-row">
          <span>&copy; {year} Stein &amp; Steinmetz College for TVET. All Rights Reserved.</span>
          <span className="flex items-center gap-4">
            Mando Farm Off Gbondapi Road, Pujehun, Sierra Leone
            <Link to="/admin" className="text-white/30 hover:text-white/60">
              Staff Login
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
