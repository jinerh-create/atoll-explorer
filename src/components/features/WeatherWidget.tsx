"use client";

import * as React from "react";
import { Wind, Droplets, Eye, Thermometer, RefreshCw } from "lucide-react";
import { GlassCard } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface WeatherData {
  temperature: number;
  feelsLike: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  visibility: number;
  weatherCode: number;
  condition: string;
  isDay: boolean;
}

function getWeatherCondition(code: number, isDay: boolean): { label: string; emoji: string } {
  if (code === 0) return { label: "Clear Sky", emoji: isDay ? "☀️" : "🌙" };
  if (code <= 2) return { label: "Partly Cloudy", emoji: isDay ? "⛅" : "🌤️" };
  if (code === 3) return { label: "Overcast", emoji: "☁️" };
  if (code <= 48) return { label: "Foggy", emoji: "🌫️" };
  if (code <= 57) return { label: "Drizzle", emoji: "🌦️" };
  if (code <= 67) return { label: "Rainy", emoji: "🌧️" };
  if (code <= 77) return { label: "Snowy", emoji: "❄️" };
  if (code <= 82) return { label: "Rain Showers", emoji: "🌦️" };
  if (code <= 99) return { label: "Thunderstorm", emoji: "⛈️" };
  return { label: "Unknown", emoji: "🌡️" };
}

function getWindDirection(degrees: number): string {
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

// Malé, Maldives coordinates
const MALE_LAT = 4.1755;
const MALE_LNG = 73.5093;

export function WeatherWidget({ className }: { className?: string }) {
  const [weather, setWeather] = React.useState<WeatherData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = React.useState<Date | null>(null);

  const fetchWeather = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${MALE_LAT}&longitude=${MALE_LNG}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code,is_day,visibility&wind_speed_unit=kmh&timezone=Indian%2FMaldives`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Weather API error");

      const data = await res.json();
      const current = data.current;

      const weatherCondition = getWeatherCondition(current.weather_code, current.is_day === 1);

      setWeather({
        temperature: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
        windSpeed: Math.round(current.wind_speed_10m),
        windDirection: current.wind_direction_10m,
        humidity: current.relative_humidity_2m,
        visibility: Math.round((current.visibility ?? 10000) / 1000),
        weatherCode: current.weather_code,
        condition: weatherCondition.label,
        isDay: current.is_day === 1,
      });
      setLastUpdated(new Date());
    } catch {
      setError("Unable to fetch weather data");
      // Fallback mock data
      setWeather({
        temperature: 30,
        feelsLike: 34,
        windSpeed: 18,
        windDirection: 45,
        humidity: 76,
        visibility: 25,
        weatherCode: 1,
        condition: "Partly Cloudy",
        isDay: true,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  if (loading) {
    return (
      <GlassCard className={cn("p-6", className)}>
        <div className="animate-pulse space-y-3">
          <div className="h-8 w-24 bg-white/10 rounded" />
          <div className="h-16 w-32 bg-white/10 rounded" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => <div key={i} className="h-12 bg-white/10 rounded" />)}
          </div>
        </div>
      </GlassCard>
    );
  }

  if (!weather) return null;

  const { label: condLabel, emoji } = getWeatherCondition(weather.weatherCode, weather.isDay);

  return (
    <GlassCard className={cn("p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-pearl/40 uppercase tracking-wider">Malé, Maldives</p>
          <p className="text-sm text-pearl/60">{condLabel}</p>
        </div>
        <button
          onClick={fetchWeather}
          className="p-1.5 rounded-lg hover:bg-white/10 text-pearl/40 hover:text-pearl transition-colors"
          title="Refresh weather"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="text-5xl">{emoji}</div>
        <div>
          <div className="text-5xl font-bold text-pearl">{weather.temperature}°C</div>
          <div className="text-sm text-pearl/40">Feels like {weather.feelsLike}°C</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-3">
          <Wind className="h-4 w-4 text-ocean-teal shrink-0" />
          <div>
            <p className="text-xs text-pearl/40">Wind</p>
            <p className="text-sm font-medium text-pearl">{weather.windSpeed} km/h {getWindDirection(weather.windDirection)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-3">
          <Droplets className="h-4 w-4 text-ocean-teal shrink-0" />
          <div>
            <p className="text-xs text-pearl/40">Humidity</p>
            <p className="text-sm font-medium text-pearl">{weather.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-3">
          <Eye className="h-4 w-4 text-ocean-teal shrink-0" />
          <div>
            <p className="text-xs text-pearl/40">Visibility</p>
            <p className="text-sm font-medium text-pearl">{weather.visibility} km</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-3">
          <Thermometer className="h-4 w-4 text-coral shrink-0" />
          <div>
            <p className="text-xs text-pearl/40">Water Temp</p>
            <p className="text-sm font-medium text-pearl">29°C</p>
          </div>
        </div>
      </div>

      {lastUpdated && (
        <p className="text-xs text-pearl/20 mt-3 text-center">
          Updated: {lastUpdated.toLocaleTimeString()}
          {error && " (offline data)"}
        </p>
      )}
    </GlassCard>
  );
}
