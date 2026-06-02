"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Star, Waves, Wind, Hotel, Image as ImageIcon, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import Link from "next/link";

const tabs = [
  { id: "overview", label: "Overview", icon: Info },
  { id: "resorts", label: "Resorts", icon: Hotel },
  { id: "activities", label: "Activities", icon: Waves },
  { id: "map", label: "Map", icon: MapPin },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
];

const mockDestination = {
  name: "Veligandu Island",
  atoll: "North Malé Atoll",
  type: "RESORT",
  rating: 4.9,
  reviews: 342,
  description: "Veligandu Island is a breathtaking resort island located in the North Malé Atoll. Surrounded by pristine crystal-clear lagoons, the island boasts stunning white sand beaches and vibrant coral reefs. The resort is renowned for its over-water bungalows, world-class dining experiences, and exceptional marine activities. Whether you seek romance, adventure, or pure relaxation, Veligandu Island delivers an unforgettable Maldivian experience.",
  images: [
    "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80",
    "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80",
    "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=600&q=80",
    "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600&q=80",
  ],
  weather: { temp: 30, condition: "Sunny", humidity: 78, wind: 15 },
  accommodations: [
    { name: "Beach Villa", price: 450, rating: 4.9, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80" },
    { name: "Water Bungalow", price: 780, rating: 5.0, image: "https://images.unsplash.com/photo-1603289847962-b39f7ef7e08a?w=400&q=80" },
  ],
  activities: [
    { name: "Manta Ray Snorkel", type: "SNORKEL", price: 85, duration: 120 },
    { name: "Dolphin Cruise", type: "DOLPHIN", price: 65, duration: 90 },
    { name: "Sandbank Picnic", type: "SANDBANK", price: 120, duration: 180 },
  ],
};

export default function DestinationPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = React.useState("overview");

  return (
    <div className="min-h-screen bg-ocean-deep pt-16">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={mockDestination.images[0]}
          alt={mockDestination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/40 via-transparent to-ocean-deep" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-ocean-turquoise" />
                <span className="text-ocean-turquoise text-sm">{mockDestination.atoll}</span>
                <Badge variant="resort" size="sm">{mockDestination.type}</Badge>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-pearl mb-2">
                {mockDestination.name}
              </h1>
              <StarRating rating={mockDestination.rating} size="md" showValue showCount count={mockDestination.reviews} />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Tab navigation */}
        <div className="flex gap-1 py-4 overflow-x-auto scrollbar-hide border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-ocean-teal/20 text-ocean-turquoise"
                  : "text-pearl/50 hover:text-pearl hover:bg-white/5"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-10">
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="font-serif text-2xl font-bold text-pearl mb-4">About this Destination</h2>
                <p className="text-pearl/60 leading-relaxed mb-8">{mockDestination.description}</p>

                <h3 className="font-serif text-xl font-bold text-pearl mb-4">Image Gallery</h3>
                <div className="grid grid-cols-3 gap-3">
                  {mockDestination.images.slice(1).map((img, i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden">
                      <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {/* Weather */}
                <GlassCard className="p-6">
                  <h3 className="font-semibold text-pearl mb-4">Current Weather</h3>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">☀️</div>
                    <div>
                      <div className="text-3xl font-bold text-pearl">{mockDestination.weather.temp}°C</div>
                      <div className="text-pearl/50 text-sm">{mockDestination.weather.condition}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10">
                    <div>
                      <p className="text-xs text-pearl/40">Humidity</p>
                      <p className="text-pearl font-medium">{mockDestination.weather.humidity}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-pearl/40">Wind</p>
                      <p className="text-pearl font-medium">{mockDestination.weather.wind} km/h</p>
                    </div>
                  </div>
                </GlassCard>

                {/* Quick facts */}
                <GlassCard className="p-6">
                  <h3 className="font-semibold text-pearl mb-4">Quick Facts</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Atoll", value: mockDestination.atoll },
                      { label: "Type", value: mockDestination.type },
                      { label: "Best Season", value: "Nov – Apr" },
                      { label: "Transfer", value: "Speedboat 45 min" },
                    ].map((fact) => (
                      <div key={fact.label} className="flex justify-between text-sm">
                        <span className="text-pearl/40">{fact.label}</span>
                        <span className="text-pearl font-medium">{fact.value}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <Button variant="primary" size="lg" className="w-full" asChild>
                  <Link href="/booking">Book Your Stay</Link>
                </Button>
              </div>
            </div>
          )}

          {activeTab === "resorts" && (
            <div className="grid sm:grid-cols-2 gap-6">
              {mockDestination.accommodations.map((acc) => (
                <GlassCard key={acc.name} hover className="overflow-hidden">
                  <img src={acc.image} alt={acc.name} className="w-full aspect-video object-cover" />
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-semibold text-pearl mb-2">{acc.name}</h3>
                    <StarRating rating={acc.rating} size="sm" showValue />
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <span className="text-xs text-pearl/40">From</span>
                        <span className="text-xl font-bold text-pearl ml-1">${acc.price}</span>
                        <span className="text-xs text-pearl/40">/night</span>
                      </div>
                      <Button variant="primary" size="sm" asChild>
                        <Link href="/booking">Book Now</Link>
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}

          {activeTab === "activities" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDestination.activities.map((act) => (
                <GlassCard key={act.name} hover className="p-6">
                  <div className="text-3xl mb-3">
                    {act.type === "SNORKEL" ? "🤿" : act.type === "DOLPHIN" ? "🐬" : "🏖️"}
                  </div>
                  <h3 className="font-semibold text-pearl mb-1">{act.name}</h3>
                  <p className="text-sm text-pearl/40 mb-4">{act.duration} minutes</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-pearl">${act.price}/person</span>
                    <Button variant="secondary" size="sm">Book</Button>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}

          {activeTab === "map" && (
            <GlassCard className="h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-ocean-teal mx-auto mb-4" />
                <p className="text-pearl font-medium">Interactive Map</p>
                <p className="text-pearl/50 text-sm mb-4">View on full map for all features</p>
                <Button variant="primary" asChild>
                  <Link href="/map">Open Full Map</Link>
                </Button>
              </div>
            </GlassCard>
          )}

          {activeTab === "gallery" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...mockDestination.images, ...mockDestination.images].map((img, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden">
                  <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
