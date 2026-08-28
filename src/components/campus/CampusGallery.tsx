import { useState } from "react";
import { Expand } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { RevealItem, RevealStagger } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  span?: "row-span-2" | "col-span-2";
}

export function CampusGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<GalleryImage | null>(null);

  return (
    <>
      <RevealStagger className="grid auto-rows-[220px] grid-cols-2 gap-4 sm:auto-rows-[240px] lg:grid-cols-4">
        {images.map((img) => (
          <RevealItem
            key={img.src}
            className={cn("group relative overflow-hidden rounded-2xl", img.span)}
          >
            <button
              onClick={() => setActive(img)}
              className="h-full w-full text-left"
              aria-label={`View larger image: ${img.caption}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                <Expand className="h-4 w-4" />
              </div>
              <span className="absolute bottom-3 left-4 right-4 text-sm font-semibold text-white">
                {img.caption}
              </span>
            </button>
          </RevealItem>
        ))}
      </RevealStagger>

      <Dialog open={!!active} onClose={() => setActive(null)} labelledBy="gallery-caption">
        {active && (
          <div>
            <img src={active.src} alt={active.alt} className="max-h-[75vh] w-full object-contain bg-navy-950" />
            <p id="gallery-caption" className="p-5 text-sm font-semibold text-navy-900">
              {active.caption}
            </p>
          </div>
        )}
      </Dialog>
    </>
  );
}
