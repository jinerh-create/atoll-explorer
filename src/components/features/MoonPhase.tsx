"use client";

import * as React from "react";
import type { MoonPhase as MoonPhaseType } from "@/types";

function calculateMoonPhase(date: Date): MoonPhaseType {
  // Known new moon: January 11, 2024 (Julian Day)
  const knownNewMoon = new Date("2024-01-11T11:57:00Z");
  const synodicMonth = 29.530588853; // days

  const daysSinceNew = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const phase = ((daysSinceNew % synodicMonth) + synodicMonth) % synodicMonth;
  const illumination = Math.round((1 - Math.cos((2 * Math.PI * phase) / synodicMonth)) / 2 * 100);
  const age = Math.round(phase);

  let name: string;
  let emoji: string;

  if (phase < 1.85) {
    name = "New Moon";
    emoji = "🌑";
  } else if (phase < 7.38) {
    name = "Waxing Crescent";
    emoji = "🌒";
  } else if (phase < 9.22) {
    name = "First Quarter";
    emoji = "🌓";
  } else if (phase < 14.77) {
    name = "Waxing Gibbous";
    emoji = "🌔";
  } else if (phase < 16.61) {
    name = "Full Moon";
    emoji = "🌕";
  } else if (phase < 22.15) {
    name = "Waning Gibbous";
    emoji = "🌖";
  } else if (phase < 23.99) {
    name = "Last Quarter";
    emoji = "🌗";
  } else if (phase < 29.53) {
    name = "Waning Crescent";
    emoji = "🌘";
  } else {
    name = "New Moon";
    emoji = "🌑";
  }

  return { phase, name, emoji, illumination, age };
}

// SVG Moon renderer
function MoonSVG({ phase, illumination }: { phase: number; illumination: number }) {
  const isWaxing = phase < 14.77;
  const isNew = phase < 1.85 || phase > 28;
  const isFull = phase >= 14.77 && phase <= 16.61;

  // Calculate the ellipse for the shadow
  const semiMinor = Math.abs(Math.cos((2 * Math.PI * phase) / 29.53));

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-24 h-24 mx-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Moon background */}
      <circle cx="50" cy="50" r="45" fill="#1a2a4a" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

      {/* Illuminated portion */}
      {!isNew && (
        <>
          {isFull ? (
            <circle cx="50" cy="50" r="45" fill="#d4af37" opacity="0.7" />
          ) : (
            <clipPath id="moon-clip">
              <rect x={isWaxing ? "50" : "5"} y="5" width="45" height="90" />
            </clipPath>
          )}

          {!isFull && (
            <>
              <circle cx="50" cy="50" r="45" fill="#d4af37" opacity="0.6" clipPath="url(#moon-clip)" />
              <ellipse
                cx="50"
                cy="50"
                rx={45 * semiMinor}
                ry="45"
                fill={isWaxing ? "#1a2a4a" : "#d4af37"}
                opacity={isWaxing ? "1" : "0.6"}
              />
            </>
          )}
        </>
      )}

      {/* Craters for full moon */}
      {(isFull || illumination > 70) && (
        <>
          <circle cx="38" cy="38" r="5" fill="rgba(0,0,0,0.1)" />
          <circle cx="62" cy="55" r="3" fill="rgba(0,0,0,0.08)" />
          <circle cx="45" cy="62" r="4" fill="rgba(0,0,0,0.06)" />
        </>
      )}
    </svg>
  );
}

interface MoonPhaseProps {
  className?: string;
}

export function MoonPhase({ className }: MoonPhaseProps) {
  const moonData = React.useMemo(
    () => calculateMoonPhase(new Date()),
    []
  );

  const fishingTip = moonData.name === "Full Moon" || moonData.name === "New Moon"
    ? "Excellent fishing conditions — strong tidal movement"
    : moonData.illumination > 70
    ? "Good fishing — above average tidal activity"
    : "Average conditions";

  return (
    <div className={className}>
      <div className="text-center">
        <MoonSVG phase={moonData.phase} illumination={moonData.illumination} />

        <div className="mt-4">
          <p className="text-xl font-semibold text-pearl">{moonData.name}</p>
          <p className="text-sm text-pearl/50 mt-1">
            {moonData.illumination}% illuminated · Day {moonData.age}
          </p>
        </div>

        {/* Phase indicator bar */}
        <div className="mt-4 mx-auto max-w-xs">
          <div className="flex justify-between text-xs text-pearl/30 mb-1">
            <span>🌑 New</span>
            <span>🌓 First Qtr</span>
            <span>🌕 Full</span>
            <span>🌗 Last Qtr</span>
            <span>🌑 New</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pearl/20 via-gold to-pearl/20"
              style={{ width: `${(moonData.phase / 29.53) * 100}%` }}
            />
          </div>
        </div>

        {/* Fishing tip */}
        <div className="mt-4 p-3 rounded-xl bg-ocean-teal/10 border border-ocean-teal/20">
          <p className="text-xs text-ocean-turquoise">🎣 {fishingTip}</p>
        </div>
      </div>
    </div>
  );
}
