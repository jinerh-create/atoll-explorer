import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, isValid } from "date-fns";

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price in MVR (Maldivian Rufiyaa) or USD
 */
export function formatPrice(
  amount: number,
  currency: "MVR" | "USD" = "USD",
  compact = false
): string {
  if (currency === "MVR") {
    const formatter = new Intl.NumberFormat("en-MV", {
      style: "currency",
      currency: "MVR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: compact ? "compact" : "standard",
    });
    return formatter.format(amount);
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    notation: compact ? "compact" : "standard",
  });
  return formatter.format(amount);
}

/**
 * Format a date string or Date object
 */
export function formatDate(
  date: string | Date | null | undefined,
  formatStr = "MMM dd, yyyy"
): string {
  if (!date) return "";

  const dateObj = typeof date === "string" ? parseISO(date) : date;

  if (!isValid(dateObj)) return "";

  return format(dateObj, formatStr);
}

/**
 * Truncate text to a given length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Convert a string to a URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Get initials from a name (up to 2 characters)
 */
export function getInitials(name: string | null | undefined): string {
  if (!name) return "?";

  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].charAt(0).toUpperCase();

  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

/**
 * Generate a star rating array for display
 * Returns array of 'full' | 'half' | 'empty' strings
 */
export function generateStarRating(
  rating: number,
  maxStars = 5
): Array<"full" | "half" | "empty"> {
  const stars: Array<"full" | "half" | "empty"> = [];
  const clamped = Math.max(0, Math.min(maxStars, rating));

  for (let i = 1; i <= maxStars; i++) {
    if (i <= Math.floor(clamped)) {
      stars.push("full");
    } else if (i - clamped < 1 && clamped % 1 >= 0.5) {
      stars.push("half");
    } else {
      stars.push("empty");
    }
  }

  return stars;
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Format duration in minutes to human-readable string
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Delay function for async operations
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
