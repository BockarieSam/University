import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextValue {
  openItems: Set<string>;
  toggle: (value: string) => void;
}
const AccordionContext = React.createContext<AccordionContextValue | null>(null);

export function Accordion({
  children,
  className,
  type = "single",
  defaultValue,
}: {
  children: React.ReactNode;
  className?: string;
  type?: "single" | "multiple";
  defaultValue?: string;
}) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(
    new Set(defaultValue ? [defaultValue] : [])
  );

  const toggle = (value: string) => {
    setOpenItems((prev) => {
      const next = new Set(type === "single" ? [] : prev);
      if (prev.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className={cn("divide-y divide-navy-900/8", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

const AccordionItemContext = React.createContext<string>("");

export function AccordionItem({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AccordionItemContext.Provider value={value}>
      <div className={cn("py-1", className)}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(AccordionContext)!;
  const value = React.useContext(AccordionItemContext);
  const isOpen = ctx.openItems.has(value);

  return (
    <button
      onClick={() => ctx.toggle(value)}
      aria-expanded={isOpen}
      className={cn(
        "flex w-full items-center justify-between gap-4 py-5 text-left font-display text-base font-semibold text-navy-900 transition-colors hover:text-emerald-700",
        className
      )}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          "h-5 w-5 shrink-0 text-emerald-600 transition-transform duration-300",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
}

export function AccordionContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(AccordionContext)!;
  const value = React.useContext(AccordionItemContext);
  const isOpen = ctx.openItems.has(value);

  return (
    <div
      className={cn(
        "grid overflow-hidden transition-all duration-300 ease-out",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}
    >
      <div className="overflow-hidden">
        <p className={cn("pb-5 text-sm leading-relaxed text-navy-700/80", className)}>
          {children}
        </p>
      </div>
    </div>
  );
}
