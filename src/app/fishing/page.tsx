"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Fish, Anchor, Calendar, Moon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";
import { TideChart } from "@/components/features/TideChart";
import { MoonPhase } from "@/components/features/MoonPhase";
import Link from "next/link";

const charters = [
  { id: "1", name: "Maldives Big Game", boatName: "Blue Marlin", captain: "Ahmed Rasheed", island: "Malé", capacity: 8, pricePerDay: 650, tripTypes: ["Big Game", "Jigging", "Popping"], image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80", rating: 4.9 },
  { id: "2", name: "Reef Runner Charters", boatName: "Island Pride", captain: "Mohamed Ali", island: "Maafushi", capacity: 6, pricePerDay: 450, tripTypes: ["Reef Fishing", "Night Fishing"], image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=80", rating: 4.7 },
  { id: "3", name: "Offshore Adventures", boatName: "Sea Falcon", captain: "Hassan Ibrahim", island: "Hulhumalé", capacity: 10, pricePerDay: 800, tripTypes: ["Big Game", "Trolling", "Popping"], image: "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=400&q=80", rating: 4.8 },
];

const tripTypes = [
  { name: "Big Game Fishing", emoji: "🎣", description: "Target Yellowfin Tuna, Dogtooth, and Marlin offshore.", price: "From $650/day" },
  { name: "Night Fishing", emoji: "🌙", description: "Traditional Maldivian hand-line fishing under the stars.", price: "From $80/person" },
  { name: "Reef Fishing", emoji: "🐠", description: "Light tackle fishing over coral reefs for Snapper and Grouper.", price: "From $120/person" },
  { name: "Jigging", emoji: "⚓", description: "Vertical jigging for Amberjack, Trevally, and Dogtooth Tuna.", price: "From $150/person" },
  { name: "Popping", emoji: "🌊", description: "Surface lure fishing for Giant Trevally over shallow reefs.", price: "From $180/person" },
];

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function FishingPage() {
  return (
    <div className="min-h-screen bg-ocean-deep pt-16">
      {/* Hero */}
      <div className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/60 to-ocean-deep" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <Fish className="h-12 w-12 text-gold mx-auto mb-4" />
            <h1 className="font-serif text-5xl font-bold text-pearl mb-4">Fishing in the Maldives</h1>
            <p className="text-pearl/60 text-lg mb-8">World-class sport fishing with experienced local captains. Big game, reef, and night fishing available.</p>
            <Button variant="gold" size="xl" asChild><Link href="#charters">Find Your Charter</Link></Button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">
        {/* Marine conditions */}
        <section className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-pearl mb-6">Tide Chart Today</h2>
            <GlassCard className="p-6">
              <TideChart />
            </GlassCard>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-pearl mb-6">Moon Phase</h2>
            <GlassCard className="p-6">
              <MoonPhase />
              <p className="text-sm text-pearl/50 mt-4 text-center">
                Fishing is excellent during new and full moon phases when tidal movement is strongest.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Trip types */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-pearl mb-6">Fishing Styles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {tripTypes.map((trip, i) => (
              <motion.div key={trip.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <GlassCard hover className="p-5 text-center h-full flex flex-col">
                  <div className="text-3xl mb-3">{trip.emoji}</div>
                  <h3 className="font-semibold text-pearl text-sm mb-2">{trip.name}</h3>
                  <p className="text-xs text-pearl/50 mb-3 flex-1">{trip.description}</p>
                  <span className="text-xs text-gold font-medium">{trip.price}</span>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Charters */}
        <section id="charters">
          <h2 className="font-serif text-2xl font-bold text-pearl mb-6">Available Charters</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {charters.map((charter) => (
              <GlassCard key={charter.id} hover className="overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  <img src={charter.image} alt={charter.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-ocean-deep/80 to-transparent">
                    <p className="text-sm font-semibold text-pearl">{charter.boatName}</p>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-pearl mb-1">{charter.name}</h3>
                  <p className="text-sm text-pearl/50 mb-1">Capt. {charter.captain} · {charter.island}</p>
                  <p className="text-sm text-pearl/50 mb-3">Up to {charter.capacity} anglers</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {charter.tripTypes.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/30">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-pearl">${charter.pricePerDay}</span>
                      <span className="text-xs text-pearl/40">/day</span>
                    </div>
                    <Button variant="gold" size="sm">Book Charter</Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Catch Gallery */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-pearl mb-6">Recent Catches</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { fish: "Yellowfin Tuna", weight: "32kg", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&q=80" },
              { fish: "Giant Trevally", weight: "18kg", image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=300&q=80" },
              { fish: "Dogtooth Tuna", weight: "25kg", image: "https://images.unsplash.com/photo-1603289847962-b39f7ef7e08a?w=300&q=80" },
              { fish: "Wahoo", weight: "14kg", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=300&q=80" },
            ].map((catch_) => (
              <div key={catch_.fish} className="relative aspect-square rounded-xl overflow-hidden group">
                <img src={catch_.image} alt={catch_.fish} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-xs font-semibold text-pearl">{catch_.fish}</p>
                  <p className="text-xs text-gold">{catch_.weight}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
