import { Link } from "react-router-dom";
import { GraduationCap, Newspaper, MessageSquareQuote, HelpCircle, ArrowRight, ExternalLink } from "lucide-react";
import { Seo } from "@/components/shared/Seo";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { useContent } from "@/store/ContentContext";

export default function AdminDashboard() {
  const { programs, news, testimonials, faqs } = useContent();

  const cards = [
    {
      to: "/admin/programs",
      icon: GraduationCap,
      label: "Programs",
      count: programs.length,
      color: "bg-emerald-600/10 text-emerald-700",
    },
    {
      to: "/admin/news",
      icon: Newspaper,
      label: "News & Events",
      count: news.length,
      color: "bg-gold-500/15 text-gold-600",
    },
    {
      to: "/admin/testimonials",
      icon: MessageSquareQuote,
      label: "Testimonials",
      count: testimonials.length,
      color: "bg-navy-900/8 text-navy-800",
    },
    {
      to: "/admin/faq",
      icon: HelpCircle,
      label: "FAQ Entries",
      count: faqs.length,
      color: "bg-emerald-600/10 text-emerald-700",
    },
  ];

  return (
    <>
      <Seo title="Admin Dashboard" description="SSCTVET content dashboard." />
      <AdminPageHeader
        title="Dashboard"
        description="Manage the content shown on the public SSCTVET website."
        actions={
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800"
          >
            View Live Site <ExternalLink className="h-4 w-4" />
          </a>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.to} to={card.to}>
            <Card className="transition-shadow hover:shadow-lift">
              <CardContent className="flex items-center gap-4 pt-6">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.color}`}>
                  <card.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-display text-2xl font-extrabold text-navy-900">{card.count}</p>
                  <p className="text-sm font-medium text-navy-700/70">{card.label}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-display text-base font-bold text-navy-900">Quick Actions</h3>
            <div className="mt-4 space-y-2">
              <Link
                to="/admin/programs/new"
                className="flex items-center justify-between rounded-lg border border-navy-900/8 px-4 py-3 text-sm font-semibold text-navy-800 hover:bg-navy-900/5"
              >
                Add a New Program <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/admin/news/new"
                className="flex items-center justify-between rounded-lg border border-navy-900/8 px-4 py-3 text-sm font-semibold text-navy-800 hover:bg-navy-900/5"
              >
                Post a News Update <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/admin/settings"
                className="flex items-center justify-between rounded-lg border border-navy-900/8 px-4 py-3 text-sm font-semibold text-navy-800 hover:bg-navy-900/5"
              >
                Update Contact Info <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-display text-base font-bold text-navy-900">How This Works</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-navy-700/75">
              <li>• Changes here update the live public website immediately.</li>
              <li>• Content is stored on the server and shared across every device and browser.</li>
              <li>• Deleted items can't be recovered unless you have an exported backup.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
