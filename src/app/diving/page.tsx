"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, Filter, Waves, Fish, BookOpen, Award } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";
import { DifficultyBadge } from "@/components/ui/Badge";
import { DiveSiteCard } from "@/components/features/DiveSiteCard";

const diveSites = [
  { id: "1", name: "Manta Point", islandId: "1", islandName: "Maaya Thila", atollName: "Ari Atoll", lat: 3.9, lng: 72.7, depth: 30, difficulty: "INTERMEDIATE" as const, type: "REEF" as const, description: "World-famous cleaning station attracting mantas year-round.", marineLife: ["Manta Rays", "Napoleon Wrasse", "Reef Sharks"], images: ["https://images.unsplash.com/photo-1586508577428-130c6a3a4f8b?w=400&q=80"], visibility: 25, currentStrength: "Moderate" },
  { id: "2", name: "Banana Reef", islandId: "2", islandName: "MalÃ©", atollName: "North MalÃ© Atoll", lat: 4.2, lng: 73.5, depth: 20, difficulty: "BEGINNER" as const, type: "REEF" as const, description: "One of the first protected dive sites in the Maldives. Colorful coral gardens.", marineLife: ["Barracuda", "Reef Fish", "Turtles"], images: ["https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=400&q=80"], visibility: 30, currentStrength: "Light" },
  { id: "3", name: "Hammerhead Point", islandId: "3", islandName: "Rasdhoo", atollName: "Ari Atoll", lat: 4.25, lng: 72.87, depth: 35, difficulty: "ADVANCED" as const, type: "CHANNEL" as const, description: "Sunrise dive for hammerhead shark sightings. Requires certification.", marineLife: ["Hammerhead Sharks", "Eagle Rays", "Grey Reef Sharks"], images: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80"], visibility: 20, currentStrength: "Strong" },
  { id: "4", name: "Kuda Thila", islandId: "4", islandName: "Ari Atoll", atollName: "Ari Atoll", lat: 3.85, lng: 72.8, depth: 28, difficulty: "INTERMEDIATE" as const, type: "REEF" as const, description: "Pinnacle dive teeming with marine life. Protected marine area.", marineLife: ["Nurse Sharks", "Groupers", "Moray Eels"], images: ["https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=400&q=80"], visibility: 25, currentStrength: "Moderate" },
  { id: "5", name: "Broken Rock", islandId: "5", islandName: "Vaavu Atoll", atollName: "Vaavu Atoll", lat: 3.65, lng: 73.57, depth: 25, difficulty: "INTERMEDIATE" as const, type: "WALL" as const, description: "Dramatic wall dive with stunning coral formations and pelagic fish.", marineLife: ["Manta Rays", "Whale Sharks", "Tiger Sharks"], images: ["https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=80"], visibility: 28, currentStrength: "Moderate" },
  { id: "6", name: "Fuvahmulah Tiger Sharks", islandId: "6", islandName: "Fuvahmulah", atollName: "Fuvahmulah Atoll", lat: -0.29, lng: 73.42, depth: 18, difficulty: "EXPERT" as const, type: "REEF" as const, description: "One of the only places on earth to reliably encounter tiger sharks without a cage.", marineLife: ["Tiger Sharks", "Thresher Sharks", "Hammerheads"], images: ["https://images.unsplash.com/photo-1603289847962-b39f7ef7e08a?w=400&q=80"], visibility: 30, currentStrength: "Variable" },
];

const diveCenters = [
  { name: "Blue Ocean Divers", island: "MalÃ©", certifications: ["PADI", "SSI", "CMAS"], price: 85, rating: 4.9, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&q=80" },
  { name: "Ari Atoll Dive Centre", island: "Maafushi", certifications: ["PADI"], price: 75, rating: 4.7, image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=300&q=80" },
  { name: "ProDive Maldives", island: "HulhumalÃ©", certifications: ["PADI", "SSI"], price: 95, rating: 4.8, image: "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=300&q=80" },
];

const marineLife = [
  { name: "Whale Shark", emoji: "ðŸ¦ˆ", season: "Year-round (Ari Atoll)", difficulty: "All levels" },
  { name: "Manta Ray", emoji: "ðŸŸ", season: "Dec â€“ Apr (Baa Atoll)", difficulty: "All levels" },
  { name: "Hammerhead Shark", emoji: "ðŸ¦ˆ", season: "Jan â€“ Apr (Rasdhoo)", difficulty: "Advanced" },
  { name: "Tiger Shark", emoji: "ðŸ¦ˆ", season: "Year-round (Fuvahmulah)", difficulty: "Expert" },
];

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function DivingPage() {
  const [search, setSearch] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("all");

  const filtered = diveSites.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.atollName.toLowerCase().includes(search.toLowerCase());
    const matchDiff = difficulty === "all" || s.difficulty === difficulty.toUpperCase();
    return matchSearch && matchDiff;
  });

  return (
    <div className="min-h-screen bg-ocean-deep pt-16">
      {/* Hero */}
      <div className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586508577428-130c6a3a4f8b?w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/60 to-ocean-deep" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <Waves className="h-12 w-12 text-ocean-turquoise mx-auto mb-4" />
            <h1 className="font-serif text-5xl font-bold text-pearl mb-4">Dive the Maldives</h1>
            <p className="text-pearl/60 text-lg mb-8">150+ dive sites across 26 atolls. From beginner reefs to expert shark dives.</p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-pearl/40" />
                <input type="text" placeholder="Search dive sites..." value={search} onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl bg-white/10 border border-white/20 pl-10 pr-4 py-3 text-pearl placeholder:text-pearl/30 focus:border-ocean-teal focus:outline-none backdrop-blur-sm" />
              </div>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}
                className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-pearl focus:border-ocean-teal focus:outline-none backdrop-blur-sm appearance-none">
                <option value="all" className="bg-ocean-deep">All Levels</option>
                <option value="beginner" className="bg-ocean-deep">Beginner</option>
                <option value="intermediate" className="bg-ocean-deep">Intermediate</option>
                <option value="advanced" className="bg-ocean-deep">Advanced</option>
                <option value="expert" className="bg-ocean-deep">Expert</option>
              </select>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">
        {/* Dive Sites */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-bold text-pearl">Featured Dive Sites</h2>
            <span className="text-sm text-pearl/40">{filtered.length} sites</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((site, i) => (
              <motion.div key={site.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <DiveSiteCard diveSite={site} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Marine Life */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-pearl mb-6">Marine Life Database</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {marineLife.map((m) => (
              <GlassCard key={m.name} hover className="p-5 text-center">
                <div className="text-4xl mb-3">{m.emoji}</div>
                <h3 className="font-semibold text-pearl text-sm mb-2">{m.name}</h3>
                <p className="text-xs text-ocean-turquoise mb-1">{m.season}</p>
                <p className="text-xs text-pearl/40">{m.difficulty}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Dive Centers */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-pearl mb-6">Dive Centers</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {diveCenters.map((dc) => (
              <GlassCard key={dc.name} hover className="overflow-hidden">
                <img src={dc.image} alt={dc.name} className="w-full aspect-video object-cover" />
                <div className="p-5">
                  <h3 className="font-semibold text-pearl mb-1">{dc.name}</h3>
                  <p className="text-sm text-pearl/50 mb-3">{dc.island}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dc.certifications.map((cert) => (
                      <span key={cert} className="text-xs px-2 py-0.5 rounded-full bg-ocean-teal/20 text-ocean-turquoise border border-ocean-teal/30">{cert}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-pearl">${dc.price}<span className="text-xs text-pearl/40">/dive</span></span>
                    <Button variant="primary" size="sm">Book Dive</Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Dive Log CTA */}
        <section>
          <GlassCard className="p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-ocean-teal/10 to-lagoon/10" />
            <div className="relative z-10">
              <BookOpen className="h-10 w-10 text-ocean-turquoise mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-bold text-pearl mb-2">Your Digital Dive Log</h2>
              <p className="text-pearl/50 max-w-md mx-auto mb-6">Track your dives, earn badges, and share your underwater adventures with the MTH community.</p>
              <Button variant="primary" size="lg" asChild><Link href="/login">Start Your Dive Log</Link></Button>
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  );
}

