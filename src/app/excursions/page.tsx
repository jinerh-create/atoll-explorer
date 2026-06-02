"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Compass, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";
import { ActivityCard } from "@/components/features/ActivityCard";

const excursionTypes = [
  { type: "SANDBANK", name: "Sandbank Picnic", emoji: "🏖️", count: 18, color: "from-sand/30 to-yellow-500/20" },
  { type: "DOLPHIN", name: "Dolphin Cruise", emoji: "🐬", count: 24, color: "from-ocean-teal/30 to-lagoon/20" },
  { type: "SUNSET", name: "Sunset Cruise", emoji: "🌅", count: 31, color: "from-coral/30 to-orange-500/20" },
  { type: "SNORKEL", name: "Snorkeling Trip", emoji: "🤿", count: 42, color: "from-ocean-turquoise/30 to-cyan-500/20" },
  { type: "WATERSPORT", name: "Water Sports", emoji: "🏄", count: 15, color: "from-maldives-blue/30 to-blue-500/20" },
  { type: "ISLAND_HOP", name: "Island Hopping", emoji: "🗺️", count: 27, color: "from-purple-600/30 to-purple-400/20" },
  { type: "FISHING", name: "Fishing Trip", emoji: "🎣", count: 19, color: "from-gold/30 to-yellow-400/20" },
];

const excursions = [
  { id: "1", name: "Sandbank Picnic & Snorkel", islandId: "1", islandName: "Malé", type: "SANDBANK" as const, description: "Take a speedboat to a remote sandbank, enjoy a gourmet picnic, and snorkel over crystal clear waters.", duration: 240, pricePerPerson: 120, images: ["https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80"], maxGuests: 12, rating: 4.9 },
  { id: "2", name: "Dolphin Watching Sunset Cruise", islandId: "1", islandName: "Malé", type: "DOLPHIN" as const, description: "Chase the famous spinner dolphins at sunset. One of the most magical experiences in the Maldives.", duration: 120, pricePerPerson: 65, images: ["https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=80"], maxGuests: 20, rating: 4.8 },
  { id: "3", name: "Local Island Discovery", islandId: "2", islandName: "Maafushi", type: "ISLAND_HOP" as const, description: "Visit an authentic Maldivian fishing village. Explore local markets, mosques, and meet friendly locals.", duration: 300, pricePerPerson: 85, images: ["https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=400&q=80"], maxGuests: 15, rating: 4.7 },
  { id: "4", name: "Manta Ray Snorkel Tour", islandId: "3", islandName: "Baa Atoll", type: "SNORKEL" as const, description: "Snorkel alongside giant manta rays in Hanifaru Bay, a UNESCO World Heritage site.", duration: 180, pricePerPerson: 95, images: ["https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&q=80"], maxGuests: 10, rating: 5.0 },
  { id: "5", name: "Sunset Romantic Cruise", islandId: "1", islandName: "Malé", type: "SUNSET" as const, description: "Private dhoni sunset cruise with champagne, canapés, and a traditional Maldivian BBQ dinner.", duration: 180, pricePerPerson: 150, images: ["https://images.unsplash.com/photo-1603289847962-b39f7ef7e08a?w=400&q=80"], maxGuests: 8, rating: 4.9 },
  { id: "6", name: "Water Sports Adventure", islandId: "1", islandName: "Malé", type: "WATERSPORT" as const, description: "Full day of jet skiing, banana boat rides, parasailing, and wakeboarding at the resort's water sports centre.", duration: 360, pricePerPerson: 200, images: ["https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80"], maxGuests: 20, rating: 4.6 },
];

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function ExcursionsPage() {
  const [search, setSearch] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("all");

  const filtered = excursions.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchType = selectedType === "all" || e.type === selectedType;
    return matchSearch && matchType;
  });

  return (
    <div className="min-h-screen bg-ocean-deep pt-16">
      {/* Hero */}
      <div className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/60 to-ocean-deep" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <Compass className="h-12 w-12 text-ocean-turquoise mx-auto mb-4" />
            <h1 className="font-serif text-5xl font-bold text-pearl mb-4">Excursions & Activities</h1>
            <p className="text-pearl/60 text-lg mb-8">Sandbank picnics, dolphin cruises, island hopping, and everything in between.</p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-pearl/40" />
                <input type="text" placeholder="Search excursions..." value={search} onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl bg-white/10 border border-white/20 pl-10 pr-4 py-3 text-pearl placeholder:text-pearl/30 focus:border-ocean-teal focus:outline-none backdrop-blur-sm" />
              </div>
              <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-3">
                <Calendar className="h-4 w-4 text-pearl/40" />
                <input type="date" className="bg-transparent text-pearl/70 focus:outline-none text-sm" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        {/* Activity type grid */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-pearl mb-6">Browse by Activity</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            <button
              onClick={() => setSelectedType("all")}
              className={`p-4 rounded-xl text-center transition-all ${selectedType === "all" ? "bg-ocean-teal/30 border border-ocean-teal" : "bg-white/5 border border-white/10 hover:border-ocean-teal/40"}`}
            >
              <div className="text-2xl mb-1">🌊</div>
              <p className="text-xs text-pearl font-medium">All</p>
            </button>
            {excursionTypes.map((et) => (
              <button
                key={et.type}
                onClick={() => setSelectedType(et.type)}
                className={`p-4 rounded-xl text-center transition-all ${selectedType === et.type ? "bg-ocean-teal/30 border border-ocean-teal" : "bg-white/5 border border-white/10 hover:border-ocean-teal/40"}`}
              >
                <div className="text-2xl mb-1">{et.emoji}</div>
                <p className="text-xs text-pearl font-medium">{et.name}</p>
                <p className="text-xs text-pearl/40">{et.count}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Activity cards */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-pearl">Available Excursions</h2>
            <span className="text-sm text-pearl/40">{filtered.length} activities</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((excursion, i) => (
              <motion.div key={excursion.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <ActivityCard excursion={excursion} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
