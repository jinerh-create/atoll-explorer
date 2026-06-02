"use client";

import * as React from "react";
import { MapPin, Wind, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";
import { DifficultyBadge, Badge } from "@/components/ui/Badge";
import type { SurfSpot } from "@/types";

const waveTypeColors: Record<string, string> = {
  "Left-hander": "lagoon",
  "Right-hander": "coral",
  "A-frame": "gold",
};

interface SurfSpotCardProps {
  surfSpot: SurfSpot;
  className?: string;
}

export function SurfSpotCard({ surfSpot, className }: SurfSpotCardProps) {
  const waveColor = waveTypeColors[surfSpot.waveType] ?? "default";

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <GlassCard className={`overflow-hidden h-full flex flex-col group ${className ?? ""}`}>
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-ocean-mid">
          {surfSpot.images[0] ? (
            <img
              src={surfSpot.images[0]}
              alt={surfSpot.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ocean-mid to-ocean-deep">
              <Wind className="h-12 w-12 text-ocean-teal/40" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/70 to-transparent" />

          <div className="absolute top-3 left-3 flex gap-2">
            <DifficultyBadge difficulty={surfSpot.difficulty} />
            <Badge variant={waveColor as any} size="sm">
              {surfSpot.waveType}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-serif text-xl font-bold text-pearl mb-1">{surfSpot.name}</h3>

          <div className="flex items-center gap-1 text-xs text-pearl/50 mb-3">
            <MapPin className="h-3 w-3" />
            {surfSpot.islandName}, {surfSpot.atollName}
          </div>

          <p className="text-sm text-pearl/50 leading-relaxed mb-4 flex-1 line-clamp-3">
            {surfSpot.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-xs text-pearl/40 mb-0.5">Best Season</p>
              <p className="text-sm font-medium text-pearl">{surfSpot.bestSeason}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-xs text-pearl/40 mb-0.5">Swell Dir.</p>
              <p className="text-sm font-medium text-pearl">{surfSpot.swellDirection}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-xs text-pearl/40 mb-0.5">Wind Dir.</p>
              <p className="text-sm font-medium text-pearl">{surfSpot.windDirection}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-xs text-pearl/40 mb-0.5">Level</p>
              <p className="text-sm font-medium text-pearl capitalize">{surfSpot.difficulty.toLowerCase()}</p>
            </div>
          </div>

          <Button variant="secondary" size="sm" className="w-full" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
            View Details
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  );
}
