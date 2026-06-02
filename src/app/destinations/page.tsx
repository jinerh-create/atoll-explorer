"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Star, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GlassCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";

const atollFilters = ["All Atolls", "North Malé", "South Malé", "Baa", "Ari", "Raa", "Lhaviyani", "Addu"];
const typeFilters = ["All Types", "Resort Island", "Local Island", "Uninhabited"];

const destinations = [
  { id: "1", name: "Veligandu Island", atoll: "North Malé Atoll", type: "RESORT", rating: 4.9, reviews: 342, image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80", description: "A secluded paradise with pristine white beaches and crystal-clear lagoons. Famous for its over-water bungalows." },
  { id: "2", name: "Maafushi", atoll: "South Malé Atoll", type: "LOCAL", rating: 4.5, reviews: 891, image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80", description: "The most popular local island for budget travelers. Vibrant guesthouse scene and easy day trips." },
  { id: "3", name: "Hanifaru Bay", atoll: "Baa Atoll", type: "UNINHABITED", rating: 4.8, reviews: 156, image: "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=600&q=80", description: "UNESCO protected feeding ground for manta rays and whale sharks. A bucket-list snorkel destination." },
  { id: "4", name: "Rasdhoo", atoll: "Ari Atoll", type: "LOCAL", rating: 4.6, reviews: 445, image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600&q=80", description: "Small local island with big character. Famous for hammerhead shark dives at sunrise." },
  { id: "5", name: "Four Seasons Kuda Huraa", atoll: "North Malé Atoll", type: "RESORT", rating: 5.0, reviews: 234, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", description: "Ultra-luxury resort with water villas, world-class spa, and exclusive marine sanctuary." },
  { id: "6", name: "Thulusdhoo", atoll: "North Malé Atoll", type: "LOCAL", rating: 4.4, reviews: 567, image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=600&q=80", description: "Home to 'Cokes' surf break, one of the best right-handers in the Maldives." },
  { id: "7", name: "Filitheyo Island", atoll: "Faafu Atoll", type: "RESORT", rating: 4.7, reviews: 189, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80", description: "Remote eco-resort surrounded by pristine house reef. Perfect for serious divers." },
  { id: "8", name: "Fulidhoo", atoll: "Vaavu Atoll", type: "LOCAL", rating: 4.3, reviews: 312, image: "https://images.unsplash.com/photo-1603289847962-b39f7ef7e08a?w=600&q=80", description: "Charming fishing village with friendly locals. Great base for exploring Vaavu Atoll." },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function DestinationsPage() {
  const [search, setSearch] = React.useState("");
  const [selectedAtoll, setSelectedAtoll] = React.useState("All Atolls");
  const [selectedType, setSelectedType] = React.useState("All Types");
  const [showFilters, setShowFilters] = React.useState(false);

  const filtered = destinations.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.atoll.toLowerCase().includes(search.toLowerCase());
    const matchesAtoll =
      selectedAtoll === "All Atolls" ||
      d.atoll.toLowerCase().includes(selectedAtoll.toLowerCase().replace(" atoll", ""));
    const matchesType =
      selectedType === "All Types" ||
      d.type === selectedType.replace(" Island", "").toUpperCase().replace(" ", "_");
    return matchesSearch && matchesAtoll && matchesType;
  });

  return (
    <div className="min-h-screen bg-ocean-deep pt-16">
      {/* Hero */}
      <div className="relative py-20 px-4 bg-gradient-to-b from-ocean-mid to-ocean-deep">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <p className="text-ocean-turquoise text-sm font-medium tracking-widest uppercase mb-2">Explore</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-pearl mb-4">
              Discover Every Island
            </h1>
            <p className="text-pearl/50 text-lg mb-8">
              From luxury resort islands to authentic local atolls — find your perfect Maldives destination.
            </p>

            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-pearl/40" />
              <input
                type="text"
                placeholder="Search islands, atolls..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 py-4 text-pearl placeholder:text-pearl/30 focus:border-ocean-teal focus:outline-none focus:ring-2 focus:ring-ocean-teal/20 backdrop-blur-sm"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-pearl/70 hover:text-pearl hover:border-ocean-teal/40 transition-colors text-sm"
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className={`h-3 w-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>

          {atollFilters.map((atoll) => (
            <button
              key={atoll}
              onClick={() => setSelectedAtoll(atoll)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedAtoll === atoll
                  ? "bg-ocean-teal text-white"
                  : "border border-white/10 bg-white/5 text-pearl/60 hover:text-pearl hover:border-ocean-teal/40"
              }`}
            >
              {atoll}
            </button>
          ))}
        </div>

        {/* Type filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {typeFilters.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedType === type
                    ? "bg-coral text-white"
                    : "border border-white/10 bg-white/5 text-pearl/60 hover:text-pearl"
                }`}
              >
                {type}
              </button>
            ))}
          </motion.div>
        )}

        {/* Results count */}
        <p className="text-pearl/40 text-sm mb-6">
          Showing {filtered.length} destinations
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard hover className="overflow-hidden h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant={dest.type === "RESORT" ? "resort" : dest.type === "LOCAL" ? "default" : "secondary"}
                      size="sm"
                    >
                      {dest.type.charAt(0) + dest.type.slice(1).toLowerCase()}
                    </Badge>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif text-lg font-semibold text-pearl leading-tight">{dest.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-pearl/50 mb-3">
                    <MapPin className="h-3 w-3" />
                    {dest.atoll}
                  </div>
                  <p className="text-sm text-pearl/50 leading-relaxed mb-4 flex-1">{dest.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <StarRating rating={dest.rating} size="sm" showValue showCount count={dest.reviews} />
                    <Button variant="secondary" size="sm" asChild>
                      <Link href={`/destinations/${dest.id}`}>Explore</Link>
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-pearl/40 text-lg mb-4">No destinations found</p>
            <Button variant="outline" onClick={() => { setSearch(""); setSelectedAtoll("All Atolls"); setSelectedType("All Types"); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
