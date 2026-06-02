"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-teal focus-visible:ring-offset-2 focus-visible:ring-offset-ocean-deep disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-ocean-teal to-ocean-turquoise text-white shadow-ocean hover:shadow-ocean-lg hover:from-ocean-turquoise hover:to-lagoon",
        secondary:
          "bg-ocean-mid text-pearl border border-ocean-teal/30 hover:bg-ocean-teal/20 hover:border-ocean-teal",
        outline:
          "border-2 border-ocean-teal text-ocean-teal bg-transparent hover:bg-ocean-teal hover:text-white",
        ghost:
          "text-pearl/80 hover:text-pearl hover:bg-white/10",
        danger:
          "bg-red-600 text-white hover:bg-red-700 shadow-md",
        gold:
          "bg-gradient-to-r from-gold to-yellow-400 text-ocean-deep font-semibold shadow-gold hover:shadow-lg",
        coral:
          "bg-coral text-white hover:bg-orange-600 shadow-coral",
      },
      size: {
        sm: "h-8 px-3 text-sm rounded-lg",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // When asChild is true, Slot expects a single React element child
    // so we can't add wrapper elements alongside children
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={disabled || loading}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
