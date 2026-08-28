import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
  {
    variants: {
      variant: {
        navy: "bg-navy-900/8 text-navy-800",
        emerald: "bg-emerald-600/10 text-emerald-700",
        gold: "bg-gold-500/15 text-gold-600",
        outline: "border border-white/40 text-white bg-white/5",
      },
    },
    defaultVariants: {
      variant: "navy",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
