"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Wind, Search, Compass, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";
import { DifficultyBadge } from "@/components/ui/Badge";
import { SurfSpotCard } from "@/components/features/SurfSpotCard";
import Link from "next/link";

const surfSpots = [
  { id: "1", name: "Chickens", islandId: "1", islandName: "Thulusdhoo", atollName: "North Malé Atoll", lat: 4.29, lng: 73.66, difficulty: "INTERMEDIATE" as const, waveType: "Left-hander", bestSeason: "Mar–Oct", swellDirection: "SW", windDirection: "NE", description: "Consistent left-hander breaking over a shallow reef. Works best on a mid tide with SW swell.", images: ["https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80"] },
  { id: "2", name: "Cokes", islandId: "1", islandName: "Thulusdhoo", atollName: "North Malé Atoll", lat: 4.292, lng: 73.663, difficulty: "ADVANCED" as const, waveType: "Right-hander", bestSeason: "Jun–Sep", swellDirection: "SW", windDirection: "NE", description: "Heavy, hollow right-hander. One of the best waves in the Indian Ocean. Not for beginners.", images: ["https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=400&q=80"] },
  { id: "3", name: "Sultans", islandId: "2", islandName: "North Malé Atoll", atollName: "North Malé Atoll", lat: 4.168, lng: 73.502, difficulty: "INTERMEDIATE" as const, waveType: "Right-hander", bestSeason: "Apr–Oct", swellDirection: "SW", windDirection: "N", description: "Long, workable right-hander. Great for intermediate surfers and longboarders.", images: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80"] },
  { id: "4", name: "Jailbreaks", islandId: "2", islandName: "North Malé Atoll", atollName: "North Malé Atoll", lat: 4.164, lng: 73.499, difficulty: "BEGINNER" as const, waveType: "Left-hander", bestSeason: "Apr–Oct", swellDirection: "SW", windDirection: "N", description: "Long, peeling left that's perfect for beginners and intermediate surfers.", images: ["https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&q=80"] },
  { id: "5", name: "Yin Yang", islandId: "3", islandName: "South Malé Atoll", atollName: "South Malé Atoll", lat: 3.940, lng: 73.540, difficulty: "INTERMEDIATE" as const, waveType: "A-frame", bestSeason: "May–Sep", swellDirection: "SW", windDirection: "NE", description: "Fun A-frame peak offering both lefts and rights. Great for teams.", images: ["https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=80"] },
  { id: "6", name: "Pasta Point", islandId: "4", islandName: "Dhidhoofinolhu", atollName: "North Malé Atoll", lat: 4.18, lng: 73.49, difficulty: "ADVANCED" as const, waveType: "Left-hander", bestSeason: "May–Oct", swellDirection: "SW", windDirection: "E", description: "Exclusive wave accessible only to Pasta Point Resort guests. World-class lefts.", images: ["https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80"] },
];

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function SurfingPage() {
  const [search, setSearch] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("all");

  const filtered = surfSpots.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchDiff = difficulty === "all" || s.difficulty === difficulty.toUpperCase();
    return matchSearch && matchDiff;
  });

  return (
    <div className="min-h-screen bg-ocean-deep pt-16">
      {/* Hero */}
      <div className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/60 to-ocean-deep" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <Wind className="h-12 w-12 text-ocean-turquoise mx-auto mb-4" />
            <h1 className="font-serif text-5xl font-bold text-pearl mb-4">Surf the Maldives</h1>
            <p className="text-pearl/60 text-lg mb-8">80+ world-class breaks across the atolls. Consistent swells from March to October.</p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-pearl/40" />
                <input type="text" placeholder="Search surf spots..." value={search} onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl bg-white/10 border border-white/20 pl-10 pr-4 py-3 text-pearl placeholder:text-pearl/30 focus:border-ocean-teal focus:outline-none backdrop-blur-sm" />
              </div>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}
                className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-pearl focus:border-ocean-teal focus:outline-none backdrop-blur-sm appearance-none">
                <option value="all" className="bg-ocean-deep">All Levels</option>
                <option value="beginner" className="bg-ocean-deep">Beginner</option>
                <option value="intermediate" className="bg-ocean-deep">Intermediate</option>
                <option value="advanced" className="bg-ocean-deep">Advanced</option>
              </select>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">
        {/* Wave forecast widget */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-pearl mb-6">Current Conditions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Wave Height", value: "1.2–1.8m", icon: "🌊", color: "ocean-teal" },
              { label: "Swell Period", value: "12s", icon: "⏱️", color: "lagoon" },
              { label: "Wind Speed", value: "18 km/h NE", icon: "💨", color: "ocean-turquoise" },
              { label: "Water Temp", value: "29°C", icon: "🌡️", color: "coral" },
            ].map((stat) => (
              <GlassCard key={stat.label} className="p-5 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-xl font-bold text-pearl">{stat.value}</div>
                <div className="text-xs text-pearl/40 mt-1">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Surf spots grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-bold text-pearl">Surf Spots</h2>
            <span className="text-sm text-pearl/40">{filtered.length} spots</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((spot, i) => (
              <motion.div key={spot.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <SurfSpotCard surfSpot={spot} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Surf guide CTA */}
        <section>
          <GlassCard className="p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-coral/10 to-orange-500/10" />
            <div className="relative z-10">
              <Compass className="h-10 w-10 text-coral mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-bold text-pearl mb-2">Book a Surf Guide</h2>
              <p className="text-pearl/50 max-w-md mx-auto mb-6">Local surf guides know exactly which breaks are firing. Get personalized coaching and insider tips.</p>
              <Button variant="coral" size="lg" asChild><Link href="/excursions">Find Surf Guides</Link></Button>
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  );
}
