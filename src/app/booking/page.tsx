"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Filter, SlidersHorizontal, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";
import { AccommodationCard } from "@/components/features/AccommodationCard";

const accommodations = [
  { id: "1", name: "Four Seasons Kuda Huraa", type: "RESORT" as const, islandId: "1", islandName: "North Malé", atollName: "North Malé Atoll", ownerId: "1", description: "Ultra-luxury over-water resort with world-class spa and marine sanctuary.", images: ["https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80"], priceFrom: 1200, rating: 5.0, reviewCount: 423, amenities: { pool: true, spa: true, wifi: true, restaurant: true, dive_center: true }, lat: 4.22, lng: 73.54, featured: true, active: true },
  { id: "2", name: "Soneva Fushi", type: "RESORT" as const, islandId: "2", islandName: "Baa Atoll", atollName: "Baa Atoll", ownerId: "2", description: "Award-winning eco-luxury resort on a lush tropical island. Private pool villas.", images: ["https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=80"], priceFrom: 2500, rating: 4.9, reviewCount: 318, amenities: { pool: true, spa: true, wifi: true, restaurant: true, yoga: true }, lat: 5.05, lng: 73.0, featured: true, active: true },
  { id: "3", name: "Maafushi Inn", type: "GUESTHOUSE" as const, islandId: "3", islandName: "Maafushi", atollName: "South Malé Atoll", ownerId: "3", description: "Popular budget guesthouse on Maafushi island. Great diving access and local culture.", images: ["https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=400&q=80"], priceFrom: 120, rating: 4.5, reviewCount: 892, amenities: { wifi: true, restaurant: true, dive_shop: true }, lat: 3.94, lng: 73.53, featured: false, active: true },
  { id: "4", name: "Veligandu Island Resort", type: "RESORT" as const, islandId: "4", islandName: "Ari Atoll", atollName: "Ari Atoll", ownerId: "4", description: "Iconic Maldives resort with stunning over-water bungalows and house reef.", images: ["https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&q=80"], priceFrom: 680, rating: 4.8, reviewCount: 567, amenities: { pool: true, spa: true, wifi: true, restaurant: true, water_sports: true }, lat: 3.9, lng: 72.77, featured: true, active: true },
  { id: "5", name: "Thulusdhoo Surf Inn", type: "GUESTHOUSE" as const, islandId: "5", islandName: "Thulusdhoo", atollName: "North Malé Atoll", ownerId: "5", description: "Surf-focused guesthouse right next to the famous Cokes break. Board rental available.", images: ["https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80"], priceFrom: 95, rating: 4.6, reviewCount: 234, amenities: { wifi: true, surf_guide: true, board_rental: true }, lat: 4.29, lng: 73.65, featured: false, active: true },
  { id: "6", name: "Anantara Dhigu", type: "RESORT" as const, islandId: "6", islandName: "South Malé Atoll", atollName: "South Malé Atoll", ownerId: "6", description: "Sophisticated resort with overwater suites, multiple restaurants, and a stunning infinity pool.", images: ["https://images.unsplash.com/photo-1603289847962-b39f7ef7e08a?w=400&q=80"], priceFrom: 850, rating: 4.8, reviewCount: 445, amenities: { pool: true, spa: true, wifi: true, restaurant: true, gym: true }, lat: 3.92, lng: 73.46, featured: true, active: true },
];

const amenityFilters = ["Pool", "Spa", "Dive Center", "WiFi", "Water Sports", "Gym", "Restaurant"];

function BookingContent() {
  const searchParams = useSearchParams();
  const [priceMin, setPriceMin] = React.useState(0);
  const [priceMax, setPriceMax] = React.useState(5000);
  const [rating, setRating] = React.useState(0);
  const [type, setType] = React.useState("all");
  const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>([]);
  const [showFilters, setShowFilters] = React.useState(false);
  const [search, setSearch] = React.useState(searchParams.get("destination") ?? "");

  const filtered = accommodations.filter((a) => {
    const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.islandName.toLowerCase().includes(search.toLowerCase()) || a.atollName.toLowerCase().includes(search.toLowerCase());
    const matchType = type === "all" || a.type === type;
    const matchPrice = a.priceFrom >= priceMin && a.priceFrom <= priceMax;
    const matchRating = a.rating >= rating;
    return matchSearch && matchType && matchPrice && matchRating;
  });

  return (
    <div className="min-h-screen bg-ocean-deep pt-16">
      {/* Search bar */}
      <div className="sticky top-16 z-30 bg-ocean-deep/95 backdrop-blur-xl border-b border-white/10 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-pearl/40" />
            <input type="text" placeholder="Search destinations, resorts..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 py-3 text-pearl placeholder:text-pearl/30 focus:border-ocean-teal focus:outline-none" />
          </div>
          <Button
            variant={showFilters ? "primary" : "secondary"}
            leftIcon={<SlidersHorizontal className="h-4 w-4" />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Filter sidebar */}
        {showFilters && (
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-72 shrink-0"
          >
            <GlassCard className="p-6 sticky top-36 space-y-6">
              <h3 className="font-semibold text-pearl">Filters</h3>

              {/* Type */}
              <div>
                <p className="text-sm text-pearl/60 mb-3">Accommodation Type</p>
                <div className="space-y-2">
                  {["all", "RESORT", "GUESTHOUSE", "HOTEL"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`w-full flex items-center gap-2 text-left text-sm px-3 py-2 rounded-lg transition-colors ${type === t ? "bg-ocean-teal/20 text-ocean-turquoise" : "text-pearl/60 hover:text-pearl hover:bg-white/5"}`}
                    >
                      <div className={`h-3 w-3 rounded-full border-2 ${type === t ? "border-ocean-teal bg-ocean-teal" : "border-pearl/30"}`} />
                      {t === "all" ? "All Types" : t.charAt(0) + t.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <p className="text-sm text-pearl/60 mb-3">Price per Night</p>
                <div className="flex items-center gap-2">
                  <input type="number" value={priceMin} onChange={(e) => setPriceMin(Number(e.target.value))}
                    className="w-24 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-pearl focus:border-ocean-teal focus:outline-none" placeholder="Min" />
                  <span className="text-pearl/40">–</span>
                  <input type="number" value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-24 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-pearl focus:border-ocean-teal focus:outline-none" placeholder="Max" />
                </div>
              </div>

              {/* Rating */}
              <div>
                <p className="text-sm text-pearl/60 mb-3">Minimum Rating</p>
                <div className="flex gap-2">
                  {[0, 3, 4, 4.5].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRating(r)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-colors ${rating === r ? "bg-gold/20 text-gold border border-gold/30" : "bg-white/5 text-pearl/50 border border-white/10 hover:border-gold/30"}`}
                    >
                      <Star className="h-3 w-3" />
                      {r === 0 ? "Any" : r + "+"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <p className="text-sm text-pearl/60 mb-3">Amenities</p>
                <div className="space-y-2">
                  {amenityFilters.map((am) => (
                    <label key={am} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={selectedAmenities.includes(am)}
                        onChange={(e) => setSelectedAmenities(e.target.checked ? [...selectedAmenities, am] : selectedAmenities.filter((a) => a !== am))}
                        className="rounded border-white/20 bg-white/5 text-ocean-teal" />
                      <span className="text-sm text-pearl/60 group-hover:text-pearl transition-colors">{am}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full" onClick={() => { setPriceMin(0); setPriceMax(5000); setRating(0); setType("all"); setSelectedAmenities([]); }}>
                Reset Filters
              </Button>
            </GlassCard>
          </motion.aside>
        )}

        {/* Results */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-pearl/50 text-sm">{filtered.length} accommodations found</p>
            <select className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-pearl focus:border-ocean-teal focus:outline-none appearance-none">
              <option className="bg-ocean-deep">Sort: Recommended</option>
              <option className="bg-ocean-deep">Price: Low to High</option>
              <option className="bg-ocean-deep">Price: High to Low</option>
              <option className="bg-ocean-deep">Rating: Highest First</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((acc, i) => (
              <motion.div key={acc.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <AccommodationCard accommodation={acc} />
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-pearl/40 text-lg mb-4">No accommodations found</p>
              <Button variant="outline" onClick={() => { setSearch(""); setType("all"); setPriceMin(0); setPriceMax(5000); }}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-ocean-deep pt-16 flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-2 border-ocean-teal border-t-transparent animate-spin" />
      </div>
    }>
      <BookingContent />
    </React.Suspense>
  );
}
