"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-ocean-teal/20 text-ocean-turquoise border border-ocean-teal/30",
        secondary: "bg-white/10 text-pearl/80 border border-white/20",
        success: "bg-green-500/20 text-green-400 border border-green-500/30",
        warning: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
        danger: "bg-red-500/20 text-red-400 border border-red-500/30",
        coral: "bg-coral/20 text-coral border border-coral/30",
        gold: "bg-gold/20 text-gold border border-gold/30",
        lagoon: "bg-lagoon/20 text-lagoon border border-lagoon/30",
        // Difficulty variants
        beginner: "bg-green-500/20 text-green-400 border border-green-500/30",
        intermediate: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
        advanced: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
        expert: "bg-red-500/20 text-red-400 border border-red-500/30",
        // Status variants
        pending: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
        confirmed: "bg-green-500/20 text-green-400 border border-green-500/30",
        cancelled: "bg-red-500/20 text-red-400 border border-red-500/30",
        completed: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
        // Accommodation types
        resort: "bg-gold/20 text-gold border border-gold/30",
        guesthouse: "bg-ocean-teal/20 text-ocean-turquoise border border-ocean-teal/30",
        hotel: "bg-maldives-blue/20 text-blue-300 border border-maldives-blue/30",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-xs px-2.5 py-1",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, size, dot = false, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            variant === "success" || variant === "confirmed" || variant === "beginner"
              ? "bg-green-400"
              : variant === "danger" || variant === "cancelled" || variant === "expert"
              ? "bg-red-400"
              : variant === "warning" || variant === "pending" || variant === "intermediate"
              ? "bg-yellow-400"
              : variant === "advanced"
              ? "bg-orange-400"
              : "bg-current"
          )}
        />
      )}
      {children}
    </span>
  );
}

// Specific badge components for common use cases
function DifficultyBadge({
  difficulty,
  className,
}: {
  difficulty: string;
  className?: string;
}) {
  const variant = difficulty.toLowerCase() as
    | "beginner"
    | "intermediate"
    | "advanced"
    | "expert";

  return (
    <Badge variant={variant} dot className={className}>
      {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
    </Badge>
  );
}

function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const variant = status.toLowerCase() as
    | "pending"
    | "confirmed"
    | "cancelled"
    | "completed";

  return (
    <Badge variant={variant} dot className={className}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </Badge>
  );
}

function AccommodationTypeBadge({
  type,
  className,
}: {
  type: string;
  className?: string;
}) {
  const variant = type.toLowerCase() as "resort" | "guesthouse" | "hotel";

  return (
    <Badge variant={variant} className={className}>
      {type.charAt(0) + type.slice(1).toLowerCase()}
    </Badge>
  );
}

export { Badge, badgeVariants, DifficultyBadge, StatusBadge, AccommodationTypeBadge };
