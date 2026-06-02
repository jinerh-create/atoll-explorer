"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateStarRating } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRate?: (rating: number) => void;
  showValue?: boolean;
  showCount?: boolean;
  count?: number;
  className?: string;
}

const sizeClasses = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

const textSizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function StarRating({
  rating,
  maxStars = 5,
  size = "md",
  interactive = false,
  onRate,
  showValue = false,
  showCount = false,
  count,
  className,
}: StarRatingProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const stars = generateStarRating(hovered ?? rating, maxStars);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div
        className="flex items-center gap-0.5"
        onMouseLeave={() => interactive && setHovered(null)}
      >
        {stars.map((type, index) => (
          <button
            key={index}
            type={interactive ? "button" : undefined}
            className={cn(
              "relative",
              interactive
                ? "cursor-pointer hover:scale-110 transition-transform"
                : "cursor-default"
            )}
            onClick={
              interactive ? () => onRate && onRate(index + 1) : undefined
            }
            onMouseEnter={() => interactive && setHovered(index + 1)}
            aria-label={interactive ? `Rate ${index + 1} stars` : undefined}
            disabled={!interactive}
          >
            {type === "full" && (
              <Star
                className={cn(
                  sizeClasses[size],
                  "fill-gold text-gold"
                )}
              />
            )}
            {type === "half" && (
              <span className="relative inline-block">
                <Star
                  className={cn(sizeClasses[size], "text-pearl/20")}
                />
                <span className="absolute inset-0 overflow-hidden w-1/2">
                  <Star
                    className={cn(
                      sizeClasses[size],
                      "fill-gold text-gold"
                    )}
                  />
                </span>
              </span>
            )}
            {type === "empty" && (
              <Star
                className={cn(
                  sizeClasses[size],
                  interactive && hovered && hovered > index
                    ? "fill-gold/40 text-gold/40"
                    : "text-pearl/20"
                )}
              />
            )}
          </button>
        ))}
      </div>

      {showValue && (
        <span className={cn("font-semibold text-pearl ml-1", textSizeClasses[size])}>
          {rating.toFixed(1)}
        </span>
      )}

      {showCount && count !== undefined && (
        <span className={cn("text-pearl/50", textSizeClasses[size])}>
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}
