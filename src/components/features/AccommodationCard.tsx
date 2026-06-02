"use client";

import * as React from "react";
import Link from "next/link";
import { MapPin, Wifi, Waves, Palmtree, Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";
import { Badge, AccommodationTypeBadge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { useAppStore } from "@/store/useAppStore";
import { formatPrice } from "@/lib/utils";
import type { AccommodationWithDetails } from "@/types";

const amenityIcons: Record<string, React.ElementType> = {
  wifi: Wifi,
  pool: Waves,
  spa: Star,
  dive_center: Waves,
  restaurant: Palmtree,
};

interface AccommodationCardProps {
  accommodation: AccommodationWithDetails;
  className?: string;
}

export function AccommodationCard({ accommodation, className }: AccommodationCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useAppStore();
  const { data: session } = useSession();
  const wishlisted = isInWishlist("accommodation", accommodation.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session?.user) return;

    if (wishlisted) {
      removeFromWishlist("accommodation", accommodation.id);
    } else {
      addToWishlist({ targetType: "accommodation", targetId: accommodation.id });
    }
  };

  const topAmenities = Object.entries(accommodation.amenities)
    .filter(([, val]) => val === true)
    .slice(0, 3)
    .map(([key]) => key);

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <GlassCard className={`overflow-hidden h-full flex flex-col group ${className ?? ""}`}>
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-ocean-mid">
          {accommodation.images[0] ? (
            <img
              src={accommodation.images[0]}
              alt={accommodation.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">🏨</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/60 to-transparent" />

          {/* Featured badge */}
          {accommodation.featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="gold" size="sm">⭐ Featured</Badge>
            </div>
          )}

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-ocean-deep/60 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${wishlisted ? "fill-coral text-coral" : "text-pearl/70"}`}
            />
          </button>

          {/* Type badge */}
          <div className="absolute bottom-3 left-3">
            <AccommodationTypeBadge type={accommodation.type} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-serif text-lg font-semibold text-pearl leading-tight mb-1">
            {accommodation.name}
          </h3>

          <div className="flex items-center gap-1 text-xs text-pearl/50 mb-3">
            <MapPin className="h-3 w-3" />
            {accommodation.islandName}, {accommodation.atollName}
          </div>

          <div className="flex items-center gap-3 mb-3">
            <StarRating rating={accommodation.rating} size="sm" showValue />
            {accommodation.reviewCount > 0 && (
              <span className="text-xs text-pearl/40">({accommodation.reviewCount} reviews)</span>
            )}
          </div>

          {/* Amenities */}
          {topAmenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {topAmenities.map((amenity) => (
                <span
                  key={amenity}
                  className="text-xs px-2 py-0.5 rounded-full bg-ocean-teal/10 text-ocean-turquoise border border-ocean-teal/20"
                >
                  {amenity.replace("_", " ").charAt(0).toUpperCase() + amenity.replace("_", " ").slice(1)}
                </span>
              ))}
            </div>
          )}

          {/* Price & CTA */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
            <div>
              <span className="text-xs text-pearl/40">From</span>
              <span className="text-xl font-bold text-pearl ml-1">
                {formatPrice(accommodation.priceFrom)}
              </span>
              <span className="text-xs text-pearl/40">/night</span>
            </div>
            <Button variant="primary" size="sm" asChild>
              <Link href={`/booking/${accommodation.id}`}>Book Now</Link>
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
