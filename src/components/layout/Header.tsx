import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import logo from "@/assets/images/logo/logo.jpg";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/admissions", label: "Admissions" },
  { to: "/campus", label: "Campus" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-navy-900/8 bg-white/85 backdrop-blur-md shadow-soft"
          : "border-transparent bg-white/95"
      )}
    >
      <div
        className={cn(
          "container-page flex items-center justify-between transition-all duration-300",
          scrolled ? "h-16" : "h-20"
        )}
      >
        <Link to="/" className="flex items-center gap-2.5" aria-label="SSCTVET Home">
          <img
            src={logo}
            alt="SSCTVET Logo"
            className={cn(
              "rounded-full object-cover transition-all duration-300",
              scrolled ? "h-9 w-9" : "h-11 w-11"
            )}
          />
          <span className="font-display text-sm font-extrabold leading-tight text-navy-900 sm:text-base">
            Stein &amp; Steinmetz
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-emerald-600">
              College for TVET
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "text-emerald-700"
                    : "text-navy-700 hover:text-emerald-700"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex" variant="gold">
            <Link to="/admissions">Apply Now</Link>
          </Button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-navy-900 hover:bg-navy-900/5 lg:hidden"
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <Sheet open={menuOpen} onClose={() => setMenuOpen(false)}>
        <div className="flex items-center gap-2.5 border-b border-navy-900/8 px-6 py-6">
          <img src={logo} alt="SSCTVET Logo" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-display text-sm font-extrabold text-navy-900">
            SSC for TVET
          </span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-auto px-4 py-6">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                  isActive
                    ? "bg-emerald-600/10 text-emerald-700"
                    : "text-navy-800 hover:bg-navy-900/5"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-navy-900/8 p-4">
          <Button asChild variant="gold" className="w-full" onClick={() => setMenuOpen(false)}>
            <Link to="/admissions">Apply Now</Link>
          </Button>
        </div>
      </Sheet>
    </header>
  );
}
