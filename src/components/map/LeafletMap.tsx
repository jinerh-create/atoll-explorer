"use client";

import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { MapLayer } from "@/types";
import Link from "next/link";

type TileLayerType = "standard" | "satellite";

// Fix leaflet default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom marker icon factory
function createCustomIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: ${color};
        border: 2px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      ">
        <div style="
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

// Mock data for map markers
const mockMarkers = {
  accommodations: [
    { id: "a1", lat: 4.175, lng: 73.510, name: "Four Seasons Kuda Huraa", description: "Ultra-luxury over-water resort", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&q=60", link: "/booking" },
    { id: "a2", lat: 3.940, lng: 73.540, name: "Maafushi Guesthouse", description: "Popular budget-friendly island stay", image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=200&q=60", link: "/booking" },
    { id: "a3", lat: 4.680, lng: 73.750, name: "Soneva Fushi", description: "Award-winning eco-luxury resort in Baa Atoll", image: "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=200&q=60", link: "/booking" },
  ],
  diveSites: [
    { id: "d1", lat: 4.100, lng: 73.480, name: "Manta Point", description: "World-famous manta ray cleaning station", image: "", link: "/diving" },
    { id: "d2", lat: 3.700, lng: 73.580, name: "Miyaru Kandu", description: "Exhilarating shark channel dive", image: "", link: "/diving" },
    { id: "d3", lat: 4.830, lng: 73.120, name: "Hanifaru Bay", description: "UNESCO manta feeding ground", image: "", link: "/diving" },
  ],
  surfSpots: [
    { id: "s1", lat: 4.290, lng: 73.659, name: "Cokes", description: "Perfect right-hand reef break", image: "", link: "/surfing" },
    { id: "s2", lat: 3.968, lng: 73.533, name: "Chickens", description: "Consistent left-hander, all levels", image: "", link: "/surfing" },
    { id: "s3", lat: 4.167, lng: 73.502, name: "Sultans", description: "Classic Maldivian right-hander", image: "", link: "/surfing" },
  ],
  fishingCharters: [
    { id: "f1", lat: 4.175, lng: 73.520, name: "Blue Water Charter", description: "Big game fishing expeditions", image: "", link: "/fishing" },
    { id: "f2", lat: 3.940, lng: 73.545, name: "Reef Runner", description: "Reef fishing & jigging", image: "", link: "/fishing" },
  ],
  marineLocations: [
    { id: "m1", lat: 4.1748, lng: 73.5089, name: "Malé International Airport", description: "Main international gateway", image: "", link: "/marine" },
    { id: "m2", lat: 4.170, lng: 73.503, name: "Malé Port", description: "Main ferry terminal", image: "", link: "/marine" },
  ],
  navigation: [
    { id: "n1", lat: 4.167, lng: 73.500, name: "Malé Harbour", description: "Main harbor for male island", image: "", link: "/marine" },
  ],
};

// Map bounds controller
function MapController() {
  const map = useMap();

  React.useEffect(() => {
    map.setView([4.1755, 73.5093], 7);
  }, [map]);

  return null;
}

interface LeafletMapProps {
  layers: MapLayer[];
  onMarkerClick?: (marker: { id: string; name: string; type: string; description?: string; image?: string; link?: string }) => void;
}

export default function LeafletMap({ layers, onMarkerClick }: LeafletMapProps) {
  const [tileType, setTileType] = React.useState<TileLayerType>("standard");

  const layerColorMap: Record<string, string> = React.useMemo(() =>
    Object.fromEntries(layers.map((l) => [l.id, l.color])),
    [layers]
  );

  const visibleLayers = React.useMemo(() =>
    new Set(layers.filter((l) => l.visible).map((l) => l.id)),
    [layers]
  );

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      {/* Satellite / Standard toggle */}
      <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1000, display: "flex", gap: 4, background: "rgba(10,22,40,0.85)", backdropFilter: "blur(8px)", borderRadius: 10, padding: "4px", border: "1px solid rgba(255,255,255,0.1)" }}>
        {(["standard", "satellite"] as TileLayerType[]).map((t) => (
          <button
            key={t}
            onClick={() => setTileType(t)}
            style={{
              padding: "4px 10px",
              fontSize: "11px",
              fontWeight: 600,
              borderRadius: 7,
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s",
              background: tileType === t ? "#0891B2" : "transparent",
              color: tileType === t ? "#fff" : "rgba(255,255,255,0.5)",
            }}
          >
            {t === "standard" ? "Map" : "Satellite"}
          </button>
        ))}
      </div>

    <MapContainer
      center={[4.1755, 73.5093]}
      zoom={7}
      style={{ height: "100%", width: "100%" }}
      className="z-10"
      zoomControl={true}
    >
      <MapController />

      {tileType === "standard" ? (
        <TileLayer
          key="standard"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          className="brightness-75 contrast-125 saturate-50 hue-rotate-180"
        />
      ) : (
        <TileLayer
          key="satellite"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        />
      )}

      {/* Accommodations layer */}
      {visibleLayers.has("accommodations") && (
        <LayerGroup>
          {mockMarkers.accommodations.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              icon={createCustomIcon(layerColorMap.accommodations ?? "#0891B2")}
              eventHandlers={{
                click: () => onMarkerClick?.({ ...marker, type: "accommodation" }),
              }}
            >
              <Popup>
                <div className="min-w-[200px]">
                  {marker.image && (
                    <img src={marker.image} alt={marker.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                  )}
                  <h3 className="font-semibold text-pearl text-sm">{marker.name}</h3>
                  <p className="text-pearl/60 text-xs mt-1">{marker.description}</p>
                  <Link href={marker.link} className="mt-2 inline-block text-xs text-ocean-turquoise hover:underline">
                    View details →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </LayerGroup>
      )}

      {/* Dive sites layer */}
      {visibleLayers.has("diveSites") && (
        <LayerGroup>
          {mockMarkers.diveSites.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              icon={createCustomIcon(layerColorMap.diveSites ?? "#06B6D4")}
              eventHandlers={{
                click: () => onMarkerClick?.({ ...marker, type: "diveSite" }),
              }}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <h3 className="font-semibold text-pearl text-sm">{marker.name}</h3>
                  <p className="text-pearl/60 text-xs mt-1">{marker.description}</p>
                  <Link href={marker.link} className="mt-2 inline-block text-xs text-ocean-turquoise hover:underline">
                    View dive site →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </LayerGroup>
      )}

      {/* Surf spots layer */}
      {visibleLayers.has("surfSpots") && (
        <LayerGroup>
          {mockMarkers.surfSpots.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              icon={createCustomIcon(layerColorMap.surfSpots ?? "#F97316")}
              eventHandlers={{
                click: () => onMarkerClick?.({ ...marker, type: "surfSpot" }),
              }}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <h3 className="font-semibold text-pearl text-sm">{marker.name}</h3>
                  <p className="text-pearl/60 text-xs mt-1">{marker.description}</p>
                  <Link href={marker.link} className="mt-2 inline-block text-xs text-ocean-turquoise hover:underline">
                    View surf spot →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </LayerGroup>
      )}

      {/* Fishing charters layer */}
      {visibleLayers.has("fishingCharters") && (
        <LayerGroup>
          {mockMarkers.fishingCharters.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              icon={createCustomIcon(layerColorMap.fishingCharters ?? "#D4AF37")}
              eventHandlers={{
                click: () => onMarkerClick?.({ ...marker, type: "fishingCharter" }),
              }}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <h3 className="font-semibold text-pearl text-sm">{marker.name}</h3>
                  <p className="text-pearl/60 text-xs mt-1">{marker.description}</p>
                  <Link href={marker.link} className="mt-2 inline-block text-xs text-ocean-turquoise hover:underline">
                    Book charter →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </LayerGroup>
      )}

      {/* Marine locations layer */}
      {visibleLayers.has("marineLocations") && (
        <LayerGroup>
          {mockMarkers.marineLocations.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              icon={createCustomIcon(layerColorMap.marineLocations ?? "#22D3EE")}
              eventHandlers={{
                click: () => onMarkerClick?.({ ...marker, type: "marineLocation" }),
              }}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <h3 className="font-semibold text-pearl text-sm">{marker.name}</h3>
                  <p className="text-pearl/60 text-xs mt-1">{marker.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </LayerGroup>
      )}

      {/* Navigation layer */}
      {visibleLayers.has("navigation") && (
        <LayerGroup>
          {mockMarkers.navigation.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              icon={createCustomIcon(layerColorMap.navigation ?? "#1E40AF")}
              eventHandlers={{
                click: () => onMarkerClick?.({ ...marker, type: "navigation" }),
              }}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <h3 className="font-semibold text-pearl text-sm">{marker.name}</h3>
                  <p className="text-pearl/60 text-xs mt-1">{marker.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </LayerGroup>
      )}
    </MapContainer>
    </div>
  );
}
