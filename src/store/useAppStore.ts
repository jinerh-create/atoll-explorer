"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  UserWithRole,
  MapLayer,
  MapLayerType,
  SearchFilters,
} from "@/types";

interface WishlistItem {
  id: string;
  targetType: string;
  targetId: string;
  createdAt: Date;
}

interface AppState {
  // User
  user: UserWithRole | null;
  setUser: (user: UserWithRole | null) => void;

  // Theme
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
  toggleTheme: () => void;

  // Map layers
  mapLayers: MapLayer[];
  toggleMapLayer: (layerId: MapLayerType) => void;
  setMapLayerVisible: (layerId: MapLayerType, visible: boolean) => void;

  // Search filters
  searchFilters: SearchFilters;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  resetSearchFilters: () => void;

  // Wishlist
  wishlist: WishlistItem[];
  addToWishlist: (item: Omit<WishlistItem, "id" | "createdAt">) => void;
  removeFromWishlist: (targetType: string, targetId: string) => void;
  isInWishlist: (targetType: string, targetId: string) => boolean;

  // Active tab (for various tabbed pages)
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Mobile nav
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const defaultMapLayers: MapLayer[] = [
  {
    id: "accommodations",
    name: "Accommodations",
    color: "#0891B2",
    icon: "hotel",
    visible: true,
  },
  {
    id: "diveSites",
    name: "Dive Sites",
    color: "#06B6D4",
    icon: "waves",
    visible: true,
  },
  {
    id: "surfSpots",
    name: "Surf Spots",
    color: "#F97316",
    icon: "wind",
    visible: false,
  },
  {
    id: "fishingCharters",
    name: "Fishing Charters",
    color: "#D4AF37",
    icon: "anchor",
    visible: false,
  },
  {
    id: "marineLocations",
    name: "Marine Locations",
    color: "#22D3EE",
    icon: "map-pin",
    visible: false,
  },
  {
    id: "navigation",
    name: "Navigation",
    color: "#1E40AF",
    icon: "navigation",
    visible: false,
  },
];

const defaultSearchFilters: SearchFilters = {
  query: "",
  atoll: "",
  islandType: "",
  accommodationType: "",
  priceMin: 0,
  priceMax: 10000,
  rating: 0,
  amenities: [],
  diveDifficulty: "",
  diveSiteType: "",
  surfDifficulty: "",
  checkIn: "",
  checkOut: "",
  guests: 2,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User
      user: null,
      setUser: (user) => set({ user }),

      // Theme
      theme: "dark",
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),

      // Map layers
      mapLayers: defaultMapLayers,
      toggleMapLayer: (layerId) =>
        set((state) => ({
          mapLayers: state.mapLayers.map((layer) =>
            layer.id === layerId
              ? { ...layer, visible: !layer.visible }
              : layer
          ),
        })),
      setMapLayerVisible: (layerId, visible) =>
        set((state) => ({
          mapLayers: state.mapLayers.map((layer) =>
            layer.id === layerId ? { ...layer, visible } : layer
          ),
        })),

      // Search filters
      searchFilters: defaultSearchFilters,
      setSearchFilters: (filters) =>
        set((state) => ({
          searchFilters: { ...state.searchFilters, ...filters },
        })),
      resetSearchFilters: () => set({ searchFilters: defaultSearchFilters }),

      // Wishlist
      wishlist: [],
      addToWishlist: (item) => {
        const exists = get().isInWishlist(item.targetType, item.targetId);
        if (!exists) {
          set((state) => ({
            wishlist: [
              ...state.wishlist,
              { ...item, id: crypto.randomUUID(), createdAt: new Date() },
            ],
          }));
        }
      },
      removeFromWishlist: (targetType, targetId) =>
        set((state) => ({
          wishlist: state.wishlist.filter(
            (item) =>
              !(item.targetType === targetType && item.targetId === targetId)
          ),
        })),
      isInWishlist: (targetType, targetId) =>
        get().wishlist.some(
          (item) =>
            item.targetType === targetType && item.targetId === targetId
        ),

      // Active tab
      activeTab: "overview",
      setActiveTab: (tab) => set({ activeTab: tab }),

      // Mobile nav
      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
    }),
    {
      name: "atoll-explorer-store",
      partialize: (state) => ({
        theme: state.theme,
        mapLayers: state.mapLayers,
        wishlist: state.wishlist,
        searchFilters: state.searchFilters,
      }),
    }
  )
);
