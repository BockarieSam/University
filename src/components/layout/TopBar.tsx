import { MapPin, Phone, Mail } from "lucide-react";
import { useContent } from "@/store/ContentContext";

export function TopBar() {
  const { settings } = useContent();
  const telHref = `tel:${settings.phonePrimary.replace(/[^\d+]/g, "")}`;

  return (
    <div className="hidden bg-navy-950 text-white sm:block">
      <div className="container-page flex h-9 items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-white/80">
          <MapPin className="h-3.5 w-3.5 text-gold-400" />
          {settings.address}
        </span>
        <div className="flex items-center gap-5 text-white/80">
          <a href={telHref} className="flex items-center gap-1.5 hover:text-white">
            <Phone className="h-3.5 w-3.5 text-gold-400" />
            {settings.phonePrimary}
          </a>
          <a
            href={`mailto:${settings.email}`}
            className="hidden items-center gap-1.5 hover:text-white md:flex"
          >
            <Mail className="h-3.5 w-3.5 text-gold-400" />
            {settings.email}
          </a>
        </div>
      </div>
    </div>
  );
}
