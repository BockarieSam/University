import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  side?: "right" | "left";
  children: React.ReactNode;
  className?: string;
}

export function Sheet({ open, onClose, side = "right", children, className }: SheetProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] bg-navy-950/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className={cn(
              "fixed top-0 z-[100] flex h-dvh w-[86%] max-w-sm flex-col bg-white shadow-2xl",
              side === "right" ? "right-0" : "left-0",
              className
            )}
          >
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-navy-900/5 text-navy-900 hover:bg-navy-900/10"
            >
              <X className="h-5 w-5" />
            </button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
