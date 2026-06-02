"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Waves, Wind, Thermometer, Eye, Sunrise, Sunset, Droplets, Cloud } from "lucide-react";
import { GlassCard } from "@/components/ui/Card";
import { WeatherWidget } from "@/components/features/WeatherWidget";
import { TideChart } from "@/components/features/TideChart";
import { MoonPhase } from "@/components/features/MoonPhase";

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const forecastDays = [
  { day: "Today", icon: "☀️", high: 31, low: 28, condition: "Sunny" },
  { day: "Tue", icon: "⛅", high: 30, low: 27, condition: "Partly Cloudy" },
  { day: "Wed", icon: "🌧️", high: 28, low: 26, condition: "Light Rain" },
  { day: "Thu", icon: "☀️", high: 31, low: 28, condition: "Sunny" },
  { day: "Fri", icon: "⛅", high: 30, low: 27, condition: "Partly Cloudy" },
  { day: "Sat", icon: "☀️", high: 32, low: 29, condition: "Sunny" },
  { day: "Sun", icon: "☀️", high: 32, low: 28, condition: "Sunny" },
];

const waveData = [
  { period: "00:00–06:00", height: "0.8m", direction: "SW", period_s: "8s" },
  { period: "06:00–12:00", height: "1.2m", direction: "SW", period_s: "10s" },
  { period: "12:00–18:00", height: "1.5m", direction: "SSW", period_s: "12s" },
  { period: "18:00–24:00", height: "1.1m", direction: "SW", period_s: "10s" },
];

export default function MarinePage() {
  return (
    <div className="min-h-screen bg-ocean-deep pt-16">
      {/* Hero */}
      <div className="relative py-16 px-4 bg-gradient-to-b from-ocean-mid to-ocean-deep border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <Waves className="h-10 w-10 text-ocean-turquoise mx-auto mb-3" />
            <h1 className="font-serif text-4xl font-bold text-pearl mb-2">Marine Dashboard</h1>
            <p className="text-pearl/50">Real-time weather, tides, and ocean conditions for Malé, Maldives</p>
            <p className="text-xs text-pearl/30 mt-2">Updated: {new Date().toLocaleString()}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        {/* Primary widgets */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h2 className="font-serif text-xl font-bold text-pearl mb-4">Current Weather</h2>
            <WeatherWidget />
          </div>

          <div className="lg:col-span-1">
            <h2 className="font-serif text-xl font-bold text-pearl mb-4">Moon Phase</h2>
            <GlassCard className="p-6 h-full">
              <MoonPhase />
            </GlassCard>
          </div>

          <div className="lg:col-span-1">
            <h2 className="font-serif text-xl font-bold text-pearl mb-4">Key Conditions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Thermometer, label: "Water Temp", value: "29°C", color: "coral" },
                { icon: Eye, label: "Visibility", value: "25m", color: "ocean-teal" },
                { icon: Wind, label: "Wind Speed", value: "18 km/h", color: "ocean-turquoise" },
                { icon: Waves, label: "Wave Height", value: "1.2m", color: "lagoon" },
                { icon: Droplets, label: "Humidity", value: "78%", color: "ocean-mid" },
                { icon: Cloud, label: "UV Index", value: "9 (High)", color: "gold" },
              ].map((item) => (
                <GlassCard key={item.label} className="p-4 flex flex-col gap-2">
                  <item.icon className="h-4 w-4 text-pearl/40" />
                  <div className="text-lg font-bold text-pearl">{item.value}</div>
                  <div className="text-xs text-pearl/40">{item.label}</div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* Tide Chart */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-pearl mb-4">Tide Chart</h2>
          <GlassCard className="p-6">
            <TideChart />
          </GlassCard>
        </section>

        {/* 7-Day Forecast */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-pearl mb-4">7-Day Forecast</h2>
          <div className="grid grid-cols-7 gap-2">
            {forecastDays.map((day) => (
              <GlassCard key={day.day} className="p-4 text-center">
                <p className="text-xs text-pearl/40 mb-2">{day.day}</p>
                <div className="text-2xl mb-2">{day.icon}</div>
                <p className="text-sm font-bold text-pearl">{day.high}°</p>
                <p className="text-xs text-pearl/40">{day.low}°</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Sunrise/Sunset */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-pearl mb-4">Sun & Daylight</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <GlassCard className="p-6 flex items-center gap-6">
              <div className="h-14 w-14 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                <Sunrise className="h-7 w-7 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-pearl/40">Sunrise</p>
                <p className="text-3xl font-bold text-pearl">06:03</p>
                <p className="text-sm text-pearl/40">Malé, Maldives</p>
              </div>
            </GlassCard>
            <GlassCard className="p-6 flex items-center gap-6">
              <div className="h-14 w-14 rounded-full bg-coral/20 border border-coral/30 flex items-center justify-center">
                <Sunset className="h-7 w-7 text-coral" />
              </div>
              <div>
                <p className="text-sm text-pearl/40">Sunset</p>
                <p className="text-3xl font-bold text-pearl">18:12</p>
                <p className="text-sm text-pearl/40">Daylight: 12h 9m</p>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Wave forecast */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-pearl mb-4">Wave Forecast</h2>
          <GlassCard className="overflow-hidden">
            <div className="divide-y divide-white/10">
              {waveData.map((row) => (
                <div key={row.period} className="flex items-center justify-between px-6 py-4">
                  <span className="text-sm text-pearl/60 w-36">{row.period}</span>
                  <div className="flex items-center gap-2">
                    <Waves className="h-4 w-4 text-ocean-teal" />
                    <span className="text-sm font-medium text-pearl">{row.height}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-pearl/40" />
                    <span className="text-sm text-pearl/60">{row.direction}</span>
                  </div>
                  <span className="text-sm text-pearl/60">Period: {row.period_s}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  );
}
