"use client";

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Search, MapPin, Calendar, Users, ArrowRight, Waves, Wind, Fish,
  Map, Hotel, Ship, Compass, Star, ChevronLeft, ChevronRight,
  Thermometer, Eye, Navigation, Sun,
} from "lucide-react";

const MiniMap = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-surface-2 flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  ),
});

const previewLayers = [
  { id: "accommodations" as const, name: "Accommodations", color: "#0AC4A0", icon: "hotel", visible: true },
  { id: "diveSites" as const, name: "Dive Sites", color: "#0891b2", icon: "waves", visible: true },
  { id: "surfSpots" as const, name: "Surf Spots", color: "#F97316", icon: "wind", visible: true },
  { id: "fishingCharters" as const, name: "Fishing", color: "#D4AF37", icon: "anchor", visible: false },
  { id: "marineLocations" as const, name: "Marine", color: "#22D3EE", icon: "map-pin", visible: false },
  { id: "navigation" as const, name: "Navigation", color: "#1E40AF", icon: "navigation", visible: false },
];

const atolls = [
  { name: "North Malé", code: "NAL", islands: 50, image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80", tag: "Most Popular" },
  { name: "South Malé", code: "SAL", islands: 33, image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=80", tag: "Surf Capital" },
  { name: "Baa Atoll", code: "BAA", islands: 75, image: "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=400&q=80", tag: "UNESCO Reserve" },
  { name: "Ari Atoll", code: "ARI", islands: 105, image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&q=80", tag: "Whale Sharks" },
  { name: "Addu Atoll", code: "ADU", islands: 20, image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=400&q=80", tag: "Southernmost" },
];

const categories = [
  { icon: Hotel, label: "Resorts", href: "/booking", count: "500+" },
  { icon: Waves, label: "Diving", href: "/diving", count: "150+" },
  { icon: Wind, label: "Surfing", href: "/surfing", count: "80+" },
  { icon: Fish, label: "Fishing", href: "/fishing", count: "200+" },
  { icon: Ship, label: "Liveaboards", href: "/liveaboards", count: "50+" },
  { icon: Compass, label: "Excursions", href: "/excursions", count: "100+" },
  { icon: Map, label: "Islands", href: "/destinations", count: "1,200+" },
];

const quickActions = [
  { icon: Thermometer, label: "Weather", href: "/marine", color: "#0AC4A0" },
  { icon: Map, label: "Map", href: "/map", color: "#0891b2" },
  { icon: Waves, label: "Dive", href: "/diving", color: "#06b6d4" },
  { icon: Hotel, label: "Stay", href: "/booking", color: "#F97316" },
  { icon: Eye, label: "Marine", href: "/marine", color: "#8b5cf6" },
  { icon: Navigation, label: "Routes", href: "/map", color: "#d4af37" },
  { icon: Sun, label: "Forecast", href: "/marine", color: "#f59e0b" },
];

const featuredPlaces = [
  { name: "Maafushi Island", type: "Local Island", image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=500&q=80", rating: 4.8 },
  { name: "Hanifaru Bay", type: "Marine Reserve", image: "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=500&q=80", rating: 4.9 },
  { name: "Manta Point", type: "Dive Site", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&q=80", rating: 5.0 },
  { name: "Cokes Surf Break", type: "Surf Spot", image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=500&q=80", rating: 4.7 },
  { name: "Soneva Fushi", type: "Luxury Resort", image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=500&q=80", rating: 4.9 },
  { name: "Fuvahmulah", type: "Diving Island", image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=500&q=80", rating: 4.8 },
];

const stats = [
  { value: "1,200+", label: "Islands" },
  { value: "26", label: "Atolls" },
  { value: "150+", label: "Dive Sites" },
  { value: "3M+", label: "Visitors/year" },
];

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

export default function HomePage() {
  const [destination, setDestination] = React.useState("");
  const [checkIn, setCheckIn] = React.useState("");
  const [checkOut, setCheckOut] = React.useState("");
  const [guests, setGuests] = React.useState(2);
  const [activeCategory, setActiveCategory] = React.useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col justify-end overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1920&q=85"
            alt="Maldives"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-28">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="text-white/80 text-sm font-semibold tracking-widest uppercase mb-3">
              Welcome to Paradise
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 max-w-3xl">
              Discover the<br />
              <span style={{ color: "#0AC4A0" }}>Maldives</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 text-lg max-w-xl mb-10">
              1,200 islands · 150+ dive sites · world-class surf · luxury resorts
            </motion.p>

            {/* Search card */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-4 shadow-lg max-w-4xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                <div className="flex items-center gap-3 bg-surface-2 rounded-2xl px-4 py-3 sm:col-span-2 lg:col-span-1">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <input
                    type="text"
                    placeholder="Where to? Atoll or island…"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="bg-transparent text-sm text-text-base placeholder:text-text-light focus:outline-none w-full"
                  />
                </div>
                <div className="flex items-center gap-3 bg-surface-2 rounded-2xl px-4 py-3">
                  <Calendar className="h-4 w-4 text-primary shrink-0" />
                  <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
                    className="bg-transparent text-sm text-text-muted focus:outline-none w-full" />
                </div>
                <div className="flex items-center gap-3 bg-surface-2 rounded-2xl px-4 py-3">
                  <Calendar className="h-4 w-4 text-primary shrink-0" />
                  <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
                    className="bg-transparent text-sm text-text-muted focus:outline-none w-full" />
                </div>
                <div className="flex items-center gap-3 bg-surface-2 rounded-2xl px-4 py-3">
                  <Users className="h-4 w-4 text-primary shrink-0" />
                  <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}
                    className="bg-transparent text-sm text-text-base focus:outline-none w-full appearance-none">
                    {[1,2,3,4,5,6,7,8].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Link
                href={`/booking?destination=${destination}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto sm:px-10"
              >
                <Search className="h-4 w-4" /> Search Paradise
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="relative z-10">
          <svg viewBox="0 0 1440 80" className="w-full block" preserveAspectRatio="none" style={{ display: "block", marginBottom: -2 }}>
            <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,10 1440,40 L1440,80 L0,80 Z" fill="#F5F9F8" />
          </svg>
        </div>
      </section>

      {/* ── QUICK ACTIONS ────────────────────────────────────────────────── */}
      <section className="py-6 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href}
                className="flex flex-col items-center gap-2 min-w-[72px] group">
                <div className="h-14 w-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-card"
                  style={{ background: action.color + "18", border: `1.5px solid ${action.color}30` }}>
                  <action.icon className="h-6 w-6" style={{ color: action.color }} />
                </div>
                <span className="text-[11px] font-semibold text-text-muted whitespace-nowrap">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="py-8 px-4 gradient-primary">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl lg:text-4xl font-bold text-white font-serif">{s.value}</div>
                <div className="text-sm text-white/70 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave after stats */}
      <div style={{ background: "#F5F9F8", marginTop: -2 }}>
        <svg viewBox="0 0 1440 60" className="w-full block" preserveAspectRatio="none" style={{ display: "block" }}>
          <path d="M0,0 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#089E83" />
        </svg>
      </div>

      {/* ── 5 ATOLLS DESTINATION GRID (Outre-mer style) ──────────────────── */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <p className="section-label mb-2">Explore Atolls</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-base">Discover the Territory</h2>
              <p className="text-text-muted mt-2 max-w-lg mx-auto">Each atoll is a world of its own — dive into the one that calls you.</p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {atolls.map((atoll, i) => (
                <motion.div key={atoll.code} variants={fadeUp} transition={{ delay: i * 0.07 }}>
                  <Link href={`/destinations/${atoll.code.toLowerCase()}`} className="group block">
                    <div className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-card card-hover">
                      <img src={atoll.image} alt={atoll.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white gradient-primary shadow-sm">
                          {atoll.tag}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-xs text-white/70">{atoll.islands} islands</p>
                      </div>
                    </div>
                    <div className="mt-2.5 px-1">
                      <p className="font-semibold text-primary text-sm">{atoll.name}</p>
                      <p className="text-xs text-text-muted">{atoll.code} Atoll</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="text-center mt-8">
              <Link href="/destinations" className="btn-outline inline-flex items-center gap-2">
                View All Destinations <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Wave divider */}
      <svg viewBox="0 0 1440 70" className="w-full block" preserveAspectRatio="none" style={{ background: "#F5F9F8" }}>
        <path d="M0,35 C480,70 960,0 1440,35 L1440,70 L0,70 Z" fill="white" />
      </svg>

      {/* ── CATEGORIES (GoTour pill style) ───────────────────────────────── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="section-label mb-1">What Will You Do?</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-base">Explore Experiences</h2>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {categories.map((cat, i) => (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(i)}
                  className={`pill ${activeCategory === i ? "pill-active" : "pill-inactive"}`}
                >
                  <cat.icon className="h-3.5 w-3.5" />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category detail card */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="card p-6 flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="h-20 w-20 rounded-3xl gradient-primary flex items-center justify-center shrink-0 shadow-primary">
              {React.createElement(categories[activeCategory].icon, { className: "h-10 w-10 text-white" })}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-serif text-xl font-bold text-text-base mb-1">{categories[activeCategory].label}</h3>
              <p className="text-text-muted text-sm mb-3">{categories[activeCategory].count} options available across the Maldives atolls</p>
              <Link href={categories[activeCategory].href} className="btn-primary text-sm px-6 py-2.5 inline-flex items-center gap-2">
                Explore {categories[activeCategory].label} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wave divider */}
      <svg viewBox="0 0 1440 70" className="w-full block" preserveAspectRatio="none" style={{ background: "white" }}>
        <path d="M0,20 C360,70 1080,10 1440,50 L1440,70 L0,70 Z" fill="#F5F9F8" />
      </svg>

      {/* ── POPULAR PLACES CAROUSEL (Korean site style) ──────────────────── */}
      <section className="py-14 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="section-label mb-1">Must-Visit</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-base">Popular Places</h2>
            </div>
            <div className="flex gap-2">
              <button onClick={() => scroll("left")} className="h-10 w-10 rounded-2xl border border-border bg-white hover:border-primary hover:text-primary transition-colors flex items-center justify-center text-text-muted shadow-card">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={() => scroll("right")} className="h-10 w-10 rounded-2xl gradient-primary text-white flex items-center justify-center shadow-primary hover:opacity-90 transition-opacity">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div ref={carouselRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {featuredPlaces.map((place) => (
              <div key={place.name} className="shrink-0 w-60 card card-hover overflow-hidden cursor-pointer group">
                <div className="relative h-40 overflow-hidden">
                  <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 rounded-full px-2 py-0.5 text-xs font-bold text-text-base shadow-sm">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {place.rating}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-primary font-semibold mb-0.5">{place.type}</p>
                  <h3 className="font-semibold text-text-base text-sm">{place.name}</h3>
                  <div className="flex items-center gap-1 mt-2 text-xs text-text-muted">
                    <MapPin className="h-3 w-3 text-primary" /> Maldives
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE MAP (French community site style) ─────────────────── */}
      <section className="py-14 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="section-label mb-2">Interactive Map</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-base mb-4">
                Discover the Territory
              </h2>
              <p className="text-text-muted mb-5 leading-relaxed">
                Navigate 1,200+ islands across 26 atolls. Toggle layers for dive sites, surf spots, resorts, fishing charters, and marine life locations.
              </p>
              <ul className="space-y-3 mb-7">
                {["Accommodation, diving & surf layers", "Real-time marine location data", "Plan routes between islands", "Save spots to your wishlist"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-text-muted">
                    <div className="h-5 w-5 rounded-full gradient-primary flex items-center justify-center shrink-0">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/map" className="btn-primary inline-flex items-center gap-2">
                <Map className="h-4 w-4" /> Open Full Map
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="rounded-3xl overflow-hidden shadow-lg" style={{ height: 420, position: "relative" }}>
                <MiniMap layers={previewLayers} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(10,196,160,0.9) 0%, transparent 100%)", padding: "1.25rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", pointerEvents: "none", zIndex: 20 }}>
                  <div>
                    <p className="text-white font-semibold text-sm">Live Interactive Map</p>
                    <p className="text-white/70 text-xs mt-0.5">Dive sites, resorts, surf spots & more</p>
                  </div>
                  <div style={{ pointerEvents: "auto" }}>
                    <Link href="/map" className="text-xs text-white font-semibold hover:text-white/80 transition-colors flex items-center gap-1">
                      Full map <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wave before split section */}
      <svg viewBox="0 0 1440 60" className="w-full block" preserveAspectRatio="none" style={{ background: "#F5F9F8" }}>
        <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="white" />
      </svg>

      {/* ── SPLIT SECTION (Outre-mer style) ─────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo collage */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="grid grid-cols-2 gap-3">
              <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80" alt="" className="rounded-3xl w-full h-52 object-cover col-span-2" />
              <img src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=80" alt="" className="rounded-3xl w-full h-36 object-cover" />
              <img src="https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=400&q=80" alt="" className="rounded-3xl w-full h-36 object-cover" />
              <div className="col-span-2 gradient-primary rounded-3xl p-5 flex items-center gap-4">
                <div className="text-4xl font-bold text-white font-serif">+3M</div>
                <div className="text-white/80 text-sm">tourists visit the Maldives every year</div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="section-label mb-2">MTH Platform</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-base mb-4">
                Plan Your Perfect Maldives Holiday
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                MTH is the Maldives&apos; most complete travel platform. From budget guesthouses on local islands to ultra-luxury private-island resorts — we connect you to authentic Maldivian experiences.
              </p>
              <ul className="space-y-3 mb-7">
                {[
                  "500+ curated accommodations across all atolls",
                  "150+ mapped dive sites with depth & difficulty",
                  "80+ surf breaks with swell & season data",
                  "AI travel planner for personalised itineraries",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text-muted">
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                <Link href="/destinations" className="btn-primary inline-flex items-center gap-2">
                  Start Exploring <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/about" className="btn-outline inline-flex items-center gap-2">
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH TEAL CTA (Outre-mer style) ────────────────────────── */}
      <section className="relative overflow-hidden mt-16">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1920&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,196,160,0.92) 0%, rgba(8,158,131,0.95) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-white/70 text-sm font-semibold tracking-widest uppercase mb-3">For Property Owners</p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
                LIST YOUR<br />PROPERTY
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Reach 3M+ annual Maldives visitors. List your resort, guesthouse, dive centre, or charter boat on MTH and grow your bookings.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/register" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-7 py-4 rounded-full hover:bg-white/90 transition-colors shadow-lg">
                  List My Establishment <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/about" className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-semibold px-7 py-4 rounded-full hover:bg-white/10 transition-colors">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-end">
              <div className="grid grid-cols-2 gap-3 max-w-xs">
                {["500+ Partners", "3M+ Visitors", "26 Atolls", "5★ Support"].map((stat) => (
                  <div key={stat} className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl p-4 text-center">
                    <p className="text-white font-bold text-sm">{stat}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
