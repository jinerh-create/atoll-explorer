"use client";

import * as React from "react";
import { Ship, Users, Anchor, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import type { Liveaboard } from "@/types";

interface LiveaboardCardProps {
  liveaboard: Liveaboard;
  className?: string;
}

export function LiveaboardCard({ liveaboard, className }: LiveaboardCardProps) {
  const topAmenities = Object.entries(liveaboard.amenities)
    .filter(([, v]) => v === true)
    .slice(0, 3)
    .map(([k]) => k);

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <GlassCard className={`overflow-hidden h-full flex flex-col group ${className ?? ""}`}>
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-ocean-mid">
          {liveaboard.images[0] ? (
            <img
              src={liveaboard.images[0]}
              alt={liveaboard.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ocean-mid to-ocean-deep">
              <Ship className="h-12 w-12 text-ocean-teal/40" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/70 to-transparent" />

          {/* Boat type badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" size="sm">
              <Ship className="h-3 w-3" /> {liveaboard.boatType}
            </Badge>
          </div>

          {/* Capacity */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-ocean-deep/80 backdrop-blur-sm text-pearl/80 border border-white/10">
              <Users className="h-3 w-3" />
              {liveaboard.capacity} guests
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-serif text-xl font-bold text-pearl mb-1">{liveaboard.name}</h3>
          <p className="text-xs text-pearl/40 mb-3">by {liveaboard.ownerName}</p>

          <p className="text-sm text-pearl/50 leading-relaxed mb-4 flex-1 line-clamp-2">
            {liveaboard.description}
          </p>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center gap-2 text-xs text-pearl/50">
              <Anchor className="h-3.5 w-3.5 text-ocean-teal" />
              {liveaboard.cabins} cabins
            </div>
            <div className="flex items-center gap-2 text-xs text-pearl/50">
              <Ship className="h-3.5 w-3.5 text-ocean-teal" />
              {liveaboard.length}m vessel
            </div>
          </div>

          {/* Routes */}
          {liveaboard.routes.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-pearl/40 mb-1.5">Available Routes</p>
              <div className="flex flex-wrap gap-1.5">
                {liveaboard.routes.slice(0, 2).map((route) => (
                  <span
                    key={route}
                    className="text-xs flex items-center gap-1 px-2 py-0.5 rounded-full bg-ocean-teal/10 text-ocean-turquoise border border-ocean-teal/20"
                  >
                    <MapPin className="h-2.5 w-2.5" />
                    {route}
                  </span>
                ))}
                {liveaboard.routes.length > 2 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-pearl/40 border border-white/10">
                    +{liveaboard.routes.length - 2}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Amenities */}
          {topAmenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {topAmenities.map((am) => (
                <span key={am} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-pearl/50 border border-white/10 capitalize">
                  {am.replace("_", " ")}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
            <div>
              <span className="text-xs text-pearl/40">From</span>
              <span className="text-xl font-bold text-pearl ml-1">
                {formatPrice(liveaboard.priceFrom)}
              </span>
              <span className="text-xs text-pearl/40">/night</span>
            </div>
            <Button variant="primary" size="sm">
              Check Availability
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
