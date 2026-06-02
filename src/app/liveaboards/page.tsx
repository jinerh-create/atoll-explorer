"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Ship, Search, Calendar, Users, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";
import { LiveaboardCard } from "@/components/features/LiveaboardCard";

const liveaboards = [
  { id: "1", name: "Serenity Explorer", ownerId: "1", ownerName: "Blue Horizon Liveaboards", description: "A premium diving safari vessel exploring the best reefs of the Maldives. Features 12 en-suite cabins, a spacious dive deck, and gourmet dining.", capacity: 24, cabins: 12, images: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80"], priceFrom: 350, routes: ["North Malé → Baa Atoll", "Ari Atoll Circuit", "South Malé → Vaavu"], amenities: { wifi: true, aircon: true, nitrox: true, camera_room: true }, boatType: "Motor Yacht", length: 35 },
  { id: "2", name: "Blue Horizon II", ownerId: "2", ownerName: "Maldives Safari Co.", description: "Photography-focused expedition vessel with underwater camera systems, dedicated editing suite, and an expert photography guide.", capacity: 16, cabins: 8, images: ["https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80"], priceFrom: 420, routes: ["Baa Atoll → Raa Atoll", "Ari Atoll Deep Dive"], amenities: { wifi: true, aircon: true, photo_studio: true, nitrox: true }, boatType: "Expedition Catamaran", length: 28 },
  { id: "3", name: "Maldives Dream", ownerId: "3", ownerName: "Island Surf Safaris", description: "Dedicated surf safari vessel following the season's best breaks. On-board surf guide, board repair workshop, and easy water access.", capacity: 20, cabins: 10, images: ["https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80"], priceFrom: 280, routes: ["North Malé Surf Circuit", "South Malé Breaks"], amenities: { wifi: true, aircon: true, surf_guide: true, board_room: true }, boatType: "Traditional Dhoni", length: 32 },
  { id: "4", name: "Ocean Wanderer", ownerId: "4", ownerName: "Luxury Maldives Yachts", description: "The pinnacle of liveaboard luxury. Private 16-cabin super yacht with a personal chef, jacuzzi, and helicopter pad.", capacity: 16, cabins: 8, images: ["https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600&q=80"], priceFrom: 1200, routes: ["Full Maldives Circuit", "Remote Southern Atolls"], amenities: { wifi: true, aircon: true, jacuzzi: true, chef: true, helicopter_pad: true }, boatType: "Super Yacht", length: 52 },
  { id: "5", name: "Reef Ranger", ownerId: "5", ownerName: "Eco Dive Maldives", description: "Eco-certified diving vessel committed to reef conservation. Partners with local marine biologists for special dive briefings.", capacity: 20, cabins: 10, images: ["https://images.unsplash.com/photo-1603289847962-b39f7ef7e08a?w=600&q=80"], priceFrom: 310, routes: ["Baa UNESCO Circuit", "Ari Atoll Eco Tour"], amenities: { wifi: true, aircon: true, nitrox: true, marine_biologist: true }, boatType: "Motor Catamaran", length: 30 },
  { id: "6", name: "Sultan's Pride", ownerId: "6", ownerName: "Maldives Big Game Fishing", description: "Premium fishing liveaboard with state-of-the-art sport fishing equipment. Professional captain and deck crew.", capacity: 12, cabins: 6, images: ["https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80"], priceFrom: 480, routes: ["South Atolls Fishing", "Offshore Grounds"], amenities: { wifi: true, aircon: true, fish_hold: true, tackle_room: true }, boatType: "Sport Fisher", length: 24 },
];

const categories = ["All", "Diving", "Fishing", "Surf", "Luxury", "Photography", "Eco"];
const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function LiveaboardsPage() {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("All");

  const filtered = liveaboards.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-ocean-deep pt-16">
      {/* Hero */}
      <div className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/60 to-ocean-deep" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <Ship className="h-12 w-12 text-ocean-turquoise mx-auto mb-4" />
            <h1 className="font-serif text-5xl font-bold text-pearl mb-4">Liveaboard Safaris</h1>
            <p className="text-pearl/60 text-lg mb-8">Sleep under the stars in the middle of the Indian Ocean. Explore remote atolls inaccessible by land.</p>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-pearl/40" />
                <input type="text" placeholder="Search liveaboards..." value={search} onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl bg-white/10 border border-white/20 pl-10 pr-4 py-3 text-pearl placeholder:text-pearl/30 focus:border-ocean-teal focus:outline-none backdrop-blur-sm" />
              </div>
              <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-3">
                <Calendar className="h-4 w-4 text-pearl/40" />
                <input type="date" className="bg-transparent text-pearl/70 focus:outline-none text-sm" />
              </div>
              <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-3">
                <Users className="h-4 w-4 text-pearl/40" />
                <select className="bg-transparent text-pearl/70 focus:outline-none text-sm appearance-none">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n} className="bg-ocean-deep">{n} guests</option>)}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        {/* Category filters */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                category === cat ? "bg-ocean-teal text-white" : "border border-white/10 bg-white/5 text-pearl/60 hover:text-pearl hover:border-ocean-teal/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-pearl/40 text-sm">{filtered.length} vessels available</p>

        {/* Liveaboard grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((lb, i) => (
            <motion.div key={lb.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <LiveaboardCard liveaboard={lb} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
