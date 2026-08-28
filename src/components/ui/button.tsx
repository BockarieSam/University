import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Minimal "asChild" implementation: when true, clones the single child
 * element and merges the button's className/props onto it instead of
 * rendering a <button>. This lets Button wrap a react-router <Link>.
 */

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-navy-900 text-white shadow-soft hover:bg-navy-800 hover:-translate-y-0.5 hover:shadow-lift",
        gold: "bg-gold-500 text-navy-950 shadow-soft hover:bg-gold-400 hover:-translate-y-0.5 hover:shadow-lift",
        outline:
          "border border-navy-900/20 text-navy-900 hover:bg-navy-900/5",
        outlineLight:
          "border border-white/50 text-white hover:bg-white/10",
        ghost: "text-navy-900 hover:bg-navy-900/5",
        link: "text-emerald-700 underline-offset-4 hover:underline p-0",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      return React.cloneElement(child, {
        className: cn(buttonVariants({ variant, size, className }), child.props.className),
        ref,
        ...props,
      });
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
