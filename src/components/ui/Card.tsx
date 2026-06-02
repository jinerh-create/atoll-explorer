"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  gradient?: boolean;
  variant?: "glass" | "glass-dark" | "solid" | "outline";
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      hover = false,
      gradient = false,
      variant = "glass-dark",
      children,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      glass: "glass",
      "glass-dark": "glass-dark",
      solid: "bg-ocean-mid border border-ocean-teal/20",
      outline: "bg-transparent border border-ocean-teal/40",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl overflow-hidden",
          variantClasses[variant],
          hover &&
            "transition-all duration-300 hover:-translate-y-1 hover:shadow-ocean-lg cursor-pointer",
          gradient && "border border-lagoon/20",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// Card sub-components
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pb-0", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-semibold text-xl leading-tight text-pearl",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-pearl/60 mt-1", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0 flex items-center", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// GlassCard - the primary luxury card component
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  gradient?: boolean;
  children: React.ReactNode;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hover = false, gradient = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl overflow-hidden",
        "bg-ocean-deep/60 backdrop-blur-xl border border-white/10",
        "shadow-glass",
        hover &&
          "transition-all duration-300 hover:-translate-y-2 hover:shadow-ocean-lg hover:border-ocean-teal/30",
        gradient && "bg-gradient-to-br from-ocean-mid/80 to-ocean-deep/80",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
GlassCard.displayName = "GlassCard";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  GlassCard,
};
