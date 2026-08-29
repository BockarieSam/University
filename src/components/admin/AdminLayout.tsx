import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  Newspaper,
  MessageSquareQuote,
  HelpCircle,
  Settings as SettingsIcon,
  ExternalLink,
  LogOut,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { adminLogout } from "@/lib/adminAuth";
import logo from "@/assets/images/logo/logo.jpg";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/programs", label: "Programs", icon: GraduationCap },
  { to: "/admin/news", label: "News & Events", icon: Newspaper },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { to: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { to: "/admin/settings", label: "Site Settings", icon: SettingsIcon },
];

export function AdminLayout() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login", { replace: true });
  };

  const NavItems = (
    <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
      {NAV.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
              isActive
                ? "bg-emerald-600/10 text-emerald-700"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            )
          }
        >
          <item.icon className="h-4.5 w-4.5" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-dvh bg-[#f4f5f7] text-navy-900">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-navy-950 text-white lg:flex">
        <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-5">
          <img src={logo} alt="SSCTVET" className="h-9 w-9 rounded-full object-cover" />
          <div>
            <p className="text-xs font-bold text-white">SSCTVET Admin</p>
            <p className="text-[11px] text-white/50">Content Dashboard</p>
          </div>
        </div>
        {NavItems}
        <div className="space-y-1 border-t border-white/10 p-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white"
          >
            <ExternalLink className="h-4.5 w-4.5" />
            View Live Site
          </a>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4.5 w-4.5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-navy-950/60"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative flex w-64 flex-col bg-navy-950 text-white">
            <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-5">
              <img src={logo} alt="SSCTVET" className="h-9 w-9 rounded-full object-cover" />
              <p className="text-xs font-bold text-white">SSCTVET Admin</p>
            </div>
            {NavItems}
            <div className="space-y-1 border-t border-white/10 p-3">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white"
              >
                <LogOut className="h-4.5 w-4.5" />
                Log Out
              </button>
            </div>
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-navy-900/8 bg-white px-5">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-navy-900 hover:bg-navy-900/5 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <p className="hidden text-sm font-semibold text-navy-700/70 lg:block">
            Manage website content
          </p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 lg:hidden"
          >
            View Site <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </header>
        <main className="flex-1 p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
