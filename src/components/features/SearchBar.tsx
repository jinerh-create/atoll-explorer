"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Users, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const POPULAR_DESTINATIONS = [
  "North Malé Atoll",
  "South Malé Atoll",
  "Baa Atoll",
  "Ari Atoll",
  "Maafushi",
  "Thulusdhoo",
  "Veligandu",
  "Hanifaru Bay",
];

interface SearchBarProps {
  className?: string;
  variant?: "hero" | "compact";
}

export function SearchBar({ className, variant = "hero" }: SearchBarProps) {
  const router = useRouter();
  const [destination, setDestination] = React.useState("");
  const [checkIn, setCheckIn] = React.useState("");
  const [checkOut, setCheckOut] = React.useState("");
  const [guests, setGuests] = React.useState(2);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const destinationRef = React.useRef<HTMLDivElement>(null);

  const filteredSuggestions = POPULAR_DESTINATIONS.filter((d) =>
    d.toLowerCase().includes(destination.toLowerCase())
  );

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests) params.set("guests", String(guests));
    router.push(`/booking?${params.toString()}`);
  };

  // Close suggestions on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (destinationRef.current && !destinationRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={cn("glass-dark rounded-2xl p-3", className)}>
      <div className={cn(
        "grid gap-2",
        variant === "hero"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          : "grid-cols-1 sm:grid-cols-3 lg:grid-cols-4"
      )}>
        {/* Destination */}
        <div className="relative sm:col-span-2 lg:col-span-1" ref={destinationRef}>
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
            <MapPin className="h-4 w-4 text-ocean-teal shrink-0" />
            <input
              type="text"
              placeholder="Where to? (Atoll or Island)"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="bg-transparent text-sm text-pearl placeholder:text-pearl/30 focus:outline-none w-full"
            />
          </div>

          <AnimatePresence>
            {showSuggestions && filteredSuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute top-full left-0 right-0 mt-1 rounded-xl bg-ocean-mid/95 backdrop-blur-xl border border-white/10 shadow-glass-lg z-50 overflow-hidden"
              >
                {filteredSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setDestination(suggestion);
                      setShowSuggestions(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-pearl/70 hover:text-pearl hover:bg-white/10 transition-colors text-left"
                  >
                    <MapPin className="h-3 w-3 text-ocean-teal shrink-0" />
                    {suggestion}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Check-in */}
        <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
          <Calendar className="h-4 w-4 text-ocean-teal shrink-0" />
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="bg-transparent text-sm text-pearl/70 focus:outline-none w-full"
          />
        </div>

        {/* Check-out */}
        <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
          <Calendar className="h-4 w-4 text-ocean-teal shrink-0" />
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn || new Date().toISOString().split("T")[0]}
            className="bg-transparent text-sm text-pearl/70 focus:outline-none w-full"
          />
        </div>

        {/* Guests */}
        <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
          <Users className="h-4 w-4 text-ocean-teal shrink-0" />
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="bg-transparent text-sm text-pearl focus:outline-none w-full appearance-none"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n} className="bg-ocean-deep">
                {n} {n === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3">
        <Button
          variant="primary"
          size="lg"
          onClick={handleSearch}
          leftIcon={<Search className="h-4 w-4" />}
          className="flex-1 sm:flex-none sm:px-10"
        >
          Search Paradise
        </Button>
        <div className="hidden sm:flex items-center gap-2 text-xs text-pearl/30">
          {[
            "Free cancellation",
            "Best price guarantee",
          ].map((tag) => (
            <span key={tag} className="flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-ocean-teal" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
