"use client";

import * as React from "react";
import { Clock, Users, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, formatDuration } from "@/lib/utils";
import type { Excursion, ExcursionType } from "@/types";

const excursionEmojis: Record<ExcursionType, string> = {
  SANDBANK: "🏖️",
  DOLPHIN: "🐬",
  SUNSET: "🌅",
  SNORKEL: "🤿",
  WATERSPORT: "🏄",
  ISLAND_HOP: "🗺️",
  FISHING: "🎣",
};

const excursionColors: Record<ExcursionType, string> = {
  SANDBANK: "sand",
  DOLPHIN: "lagoon",
  SUNSET: "coral",
  SNORKEL: "default",
  WATERSPORT: "default",
  ISLAND_HOP: "secondary",
  FISHING: "gold",
};

interface ActivityCardProps {
  excursion: Excursion;
  onBook?: (excursion: Excursion) => void;
  className?: string;
}

export function ActivityCard({ excursion, onBook, className }: ActivityCardProps) {
  const emoji = excursionEmojis[excursion.type] ?? "🌊";
  const colorVariant = excursionColors[excursion.type] ?? "default";

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <GlassCard className={`overflow-hidden h-full flex flex-col ${className ?? ""}`}>
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-ocean-mid">
          {excursion.images[0] ? (
            <img
              src={excursion.images[0]}
              alt={excursion.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">
              {emoji}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/60 to-transparent" />
          <div className="absolute top-3 left-3">
            <Badge variant={colorVariant as any} size="sm">
              {emoji} {excursion.type.replace("_", " ").charAt(0) + excursion.type.replace("_", " ").slice(1).toLowerCase()}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-serif text-lg font-semibold text-pearl mb-1 leading-tight">
            {excursion.name}
          </h3>
          <p className="text-sm text-pearl/50 mb-1">{excursion.islandName}</p>

          {excursion.rating && (
            <div className="flex items-center gap-1 mb-3">
              <Star className="h-3.5 w-3.5 text-gold fill-gold" />
              <span className="text-sm font-medium text-pearl">{excursion.rating.toFixed(1)}</span>
            </div>
          )}

          <p className="text-sm text-pearl/50 leading-relaxed mb-4 flex-1 line-clamp-2">
            {excursion.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-pearl/40 mb-4">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {formatDuration(excursion.duration)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              Max {excursion.maxGuests} guests
            </span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div>
              <span className="text-xs text-pearl/40">From</span>
              <span className="text-xl font-bold text-pearl ml-1">
                {formatPrice(excursion.pricePerPerson)}
              </span>
              <span className="text-xs text-pearl/40">/person</span>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onBook?.(excursion)}
            >
              Book Now
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
