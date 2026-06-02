"use client";

import * as React from "react";
import { Waves, ArrowDown, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";
import { DifficultyBadge, Badge } from "@/components/ui/Badge";
import type { DiveSite } from "@/types";

const siteTypeColors: Record<string, string> = {
  REEF: "default",
  WRECK: "secondary",
  CHANNEL: "coral",
  DRIFT: "warning",
  WALL: "lagoon",
};

const siteTypeEmojis: Record<string, string> = {
  REEF: "🪸",
  WRECK: "⚓",
  CHANNEL: "🌊",
  DRIFT: "💫",
  WALL: "🏔️",
};

interface DiveSiteCardProps {
  diveSite: DiveSite;
  onBook?: (diveSite: DiveSite) => void;
  className?: string;
}

export function DiveSiteCard({ diveSite, onBook, className }: DiveSiteCardProps) {
  const typeEmoji = siteTypeEmojis[diveSite.type] ?? "🌊";
  const typeColor = siteTypeColors[diveSite.type] ?? "default";

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <GlassCard className={`overflow-hidden h-full flex flex-col group ${className ?? ""}`}>
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-ocean-mid">
          {diveSite.images[0] ? (
            <img
              src={diveSite.images[0]}
              alt={diveSite.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ocean-mid to-ocean-deep">
              <Waves className="h-12 w-12 text-ocean-teal/40" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/70 to-transparent" />

          <div className="absolute top-3 left-3 flex gap-2">
            <DifficultyBadge difficulty={diveSite.difficulty} />
            <Badge variant={typeColor as any} size="sm">
              {typeEmoji} {diveSite.type.charAt(0) + diveSite.type.slice(1).toLowerCase()}
            </Badge>
          </div>

          {/* Depth badge */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-ocean-deep/80 backdrop-blur-sm text-pearl/80 border border-white/10">
              <ArrowDown className="h-3 w-3" />
              {diveSite.depth}m
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-serif text-lg font-semibold text-pearl mb-1 leading-tight">
            {diveSite.name}
          </h3>

          <div className="flex items-center gap-1 text-xs text-pearl/50 mb-3">
            <MapPin className="h-3 w-3" />
            {diveSite.islandName}, {diveSite.atollName}
          </div>

          <p className="text-sm text-pearl/50 leading-relaxed mb-4 flex-1 line-clamp-2">
            {diveSite.description}
          </p>

          {/* Marine life tags */}
          {diveSite.marineLife.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {diveSite.marineLife.slice(0, 3).map((creature) => (
                <span
                  key={creature}
                  className="text-xs px-2 py-0.5 rounded-full bg-ocean-turquoise/10 text-ocean-turquoise border border-ocean-turquoise/20"
                >
                  {creature}
                </span>
              ))}
              {diveSite.marineLife.length > 3 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-pearl/40 border border-white/10">
                  +{diveSite.marineLife.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Visibility & current */}
          <div className="flex items-center gap-4 text-xs text-pearl/40 mb-4">
            {diveSite.visibility && (
              <span>👁 {diveSite.visibility}m visibility</span>
            )}
            {diveSite.currentStrength && (
              <span>🌊 {diveSite.currentStrength} current</span>
            )}
          </div>

          <div className="pt-4 border-t border-white/10">
            <Button
              variant="primary"
              size="sm"
              className="w-full"
              onClick={() => onBook?.(diveSite)}
            >
              <Waves className="h-3.5 w-3.5" />
              Book Dive
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
