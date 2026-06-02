// ─── User Types ───────────────────────────────────────────────────────────────

export type UserRole =
  | "TOURIST"
  | "RESORT_OWNER"
  | "GUESTHOUSE_OWNER"
  | "AGENCY"
  | "DIVE_CENTER"
  | "CHARTER_OPERATOR"
  | "ADMIN";

export interface UserWithRole {
  id: string;
  name: string | null;
  email: string;
  avatar: string | null;
  role: UserRole;
  emailVerified: Date | null;
  createdAt: Date;
}

// ─── Accommodation Types ──────────────────────────────────────────────────────

export type AccommodationType = "RESORT" | "GUESTHOUSE" | "HOTEL";

export interface AccommodationWithDetails {
  id: string;
  name: string;
  type: AccommodationType;
  islandId: string;
  islandName: string;
  atollName: string;
  ownerId: string;
  description: string;
  images: string[];
  priceFrom: number;
  rating: number;
  reviewCount: number;
  amenities: Record<string, boolean | string | number | undefined>;
  lat: number | null;
  lng: number | null;
  featured: boolean;
  active: boolean;
}

// ─── Dive Types ───────────────────────────────────────────────────────────────

export type DiveDifficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
export type DiveSiteType = "REEF" | "WRECK" | "CHANNEL" | "DRIFT" | "WALL";

export interface DiveSite {
  id: string;
  name: string;
  islandId: string;
  islandName: string;
  atollName: string;
  lat: number;
  lng: number;
  depth: number;
  difficulty: DiveDifficulty;
  type: DiveSiteType;
  description: string;
  marineLife: string[];
  images: string[];
  visibility: number | null;
  currentStrength: string | null;
}

// ─── Surf Types ───────────────────────────────────────────────────────────────

export type SurfDifficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export interface SurfSpot {
  id: string;
  name: string;
  islandId: string;
  islandName: string;
  atollName: string;
  lat: number;
  lng: number;
  difficulty: SurfDifficulty;
  waveType: string;
  bestSeason: string;
  swellDirection: string;
  windDirection: string;
  description: string;
  images: string[];
}

// ─── Fishing Types ────────────────────────────────────────────────────────────

export interface FishingCharter {
  id: string;
  name: string;
  islandId: string;
  islandName: string;
  atollName: string;
  ownerId: string;
  description: string;
  boatName: string;
  capacity: number;
  images: string[];
  pricePerDay: number;
  tripTypes: string[];
  ownerName: string;
}

// ─── Liveaboard Types ─────────────────────────────────────────────────────────

export interface Liveaboard {
  id: string;
  name: string;
  ownerId: string;
  ownerName: string;
  description: string;
  capacity: number;
  cabins: number;
  images: string[];
  priceFrom: number;
  routes: string[];
  amenities: Record<string, boolean | string | undefined>;
  boatType: string;
  length: number;
}

// ─── Excursion Types ──────────────────────────────────────────────────────────

export type ExcursionType =
  | "SANDBANK"
  | "DOLPHIN"
  | "SUNSET"
  | "SNORKEL"
  | "WATERSPORT"
  | "ISLAND_HOP"
  | "FISHING";

export interface Excursion {
  id: string;
  name: string;
  islandId: string;
  islandName: string;
  type: ExcursionType;
  description: string;
  duration: number;
  pricePerPerson: number;
  images: string[];
  maxGuests: number;
  rating?: number;
}

// ─── Weather & Marine Types ───────────────────────────────────────────────────

export interface MarineWeather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  windDirectionLabel: string;
  waveHeight: number;
  wavePeriod: number;
  visibility: number;
  uvIndex: number;
  waterTemperature: number;
  condition: string;
  conditionCode: number;
  sunrise: string;
  sunset: string;
}

export interface TideData {
  time: string;
  height: number;
  type: "HIGH" | "LOW";
}

// ─── Reward Types ─────────────────────────────────────────────────────────────

export interface Reward {
  id: string;
  userId: string;
  type: string;
  points: number;
  badge: string | null;
  description: string;
  earnedAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredPoints: number;
  color: string;
}

// ─── Map Types ────────────────────────────────────────────────────────────────

export type MapLayerType =
  | "accommodations"
  | "diveSites"
  | "surfSpots"
  | "fishingCharters"
  | "marineLocations"
  | "navigation";

export interface MapLayer {
  id: MapLayerType;
  name: string;
  color: string;
  icon: string;
  visible: boolean;
}

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  type: MapLayerType;
  name: string;
  description?: string;
  image?: string;
  link?: string;
  data?: Record<string, unknown>;
}

export interface GeoJSONFeature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    id: string;
    name: string;
    type: MapLayerType;
    category: string;
    description?: string;
    image?: string;
    link?: string;
    [key: string]: unknown;
  };
}

// ─── Search & Filter Types ────────────────────────────────────────────────────

export interface SearchFilters {
  query: string;
  atoll: string;
  islandType: string;
  accommodationType: string;
  priceMin: number;
  priceMax: number;
  rating: number;
  amenities: string[];
  diveDifficulty: DiveDifficulty | "";
  diveSiteType: DiveSiteType | "";
  surfDifficulty: SurfDifficulty | "";
  checkIn: string;
  checkOut: string;
  guests: number;
}

// ─── Booking Types ────────────────────────────────────────────────────────────

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export interface BookingWithDetails {
  id: string;
  userId: string;
  roomId: string;
  roomName: string;
  accommodationName: string;
  islandName: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  paymentId: string | null;
  specialRequests: string | null;
  createdAt: Date;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Moon Phase ───────────────────────────────────────────────────────────────

export interface MoonPhase {
  phase: number;
  name: string;
  emoji: string;
  illumination: number;
  age: number;
}
