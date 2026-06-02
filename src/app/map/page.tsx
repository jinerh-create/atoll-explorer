"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Search, Layers, X, Hotel, Waves, Wind, Fish, Anchor, Navigation, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/Card";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

const LeafletMap = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-ocean-mid flex items-center justify-center">
      <div className="text-center">
        <div className="h-12 w-12 rounded-full border-2 border-ocean-teal border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-pearl/60">Loading map...</p>
      </div>
    </div>
  ),
});

const layerIcons: Record<string, React.ElementType> = {
  accommodations: Hotel,
  diveSites: Waves,
  surfSpots: Wind,
  fishingCharters: Fish,
  marineLocations: Anchor,
  navigation: Navigation,
};

interface SelectedMarker {
  id: string;
  name: string;
  type: string;
  description?: string;
  image?: string;
  link?: string;
}

export default function MapPage() {
  const { mapLayers, toggleMapLayer } = useAppStore();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [selectedMarker, setSelectedMarker] = React.useState<SelectedMarker | null>(null);

  return (
    <div className="fixed inset-0 pt-16 bg-ocean-deep flex">
      {/* Layer Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-72 h-full bg-ocean-deep/95 backdrop-blur-xl border-r border-white/10 z-20 flex flex-col"
          >
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-semibold text-pearl">Map Explorer</h2>
                  <p className="text-xs text-pearl/40">Maldives Interactive Map</p>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-pearl/60 hover:text-pearl transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-pearl/40" />
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 py-2.5 text-sm text-pearl placeholder:text-pearl/30 focus:border-ocean-teal focus:outline-none"
                />
              </div>
            </div>

            <div className="p-4 flex-1 overflow-y-auto">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="h-4 w-4 text-ocean-teal" />
                <span className="text-sm font-medium text-pearl">Map Layers</span>
              </div>

              <div className="space-y-2">
                {mapLayers.map((layer) => {
                  const Icon = layerIcons[layer.id] ?? Anchor;
                  return (
                    <button
                      key={layer.id}
                      onClick={() => toggleMapLayer(layer.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
                        layer.visible
                          ? "bg-white/10 border border-white/20"
                          : "border border-transparent hover:bg-white/5"
                      )}
                    >
                      <div
                        className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: layer.visible ? layer.color + "30" : "transparent", border: `1px solid ${layer.color}40` }}
                      >
                        <Icon className="h-4 w-4" style={{ color: layer.visible ? layer.color : "#94a3b8" }} />
                      </div>
                      <div className="flex-1">
                        <p className={cn("text-sm font-medium", layer.visible ? "text-pearl" : "text-pearl/50")}>
                          {layer.name}
                        </p>
                      </div>
                      <div className={cn("h-4 w-8 rounded-full transition-colors relative", layer.visible ? "bg-ocean-teal" : "bg-white/20")}>
                        <div className={cn("absolute top-0.5 h-3 w-3 rounded-full bg-white transition-transform", layer.visible ? "translate-x-4" : "translate-x-0.5")} />
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs font-medium text-pearl/40 uppercase tracking-wider mb-3">Legend</p>
                <div className="space-y-2">
                  {mapLayers.filter((l) => l.visible).map((layer) => (
                    <div key={layer.id} className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: layer.color }} />
                      <span className="text-xs text-pearl/60">{layer.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-white/10 text-xs text-pearl/30">
              Tap markers to explore • Toggle layers above
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed sidebar toggle */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-12 w-8 bg-ocean-deep/95 border border-white/10 rounded-r-xl flex items-center justify-center text-pearl/60 hover:text-pearl transition-colors"
        >
          <ChevronLeft className="h-4 w-4 rotate-180" />
        </button>
      )}

      {/* Map */}
      <div className="flex-1 relative">
        <LeafletMap
          layers={mapLayers}
          onMarkerClick={(marker) => setSelectedMarker(marker)}
        />

        {/* Info panel */}
        <AnimatePresence>
          {selectedMarker && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-20"
            >
              <GlassCard className="p-4 relative">
                <button
                  onClick={() => setSelectedMarker(null)}
                  className="absolute top-3 right-3 p-1 rounded-lg hover:bg-white/10 text-pearl/60 hover:text-pearl transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex gap-4">
                  {selectedMarker.image && (
                    <div className="h-16 w-16 rounded-xl overflow-hidden shrink-0">
                      <img src={selectedMarker.image} alt={selectedMarker.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-ocean-turquoise font-medium capitalize">{selectedMarker.type.replace("_", " ")}</span>
                    </div>
                    <h3 className="font-semibold text-pearl">{selectedMarker.name}</h3>
                    {selectedMarker.description && (
                      <p className="text-sm text-pearl/50 mt-1 line-clamp-2">{selectedMarker.description}</p>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
