"use client";

import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { ArrowUp, ArrowDown } from "lucide-react";

// Generate realistic 24-hour tide data for Maldives
function generateTideData() {
  const data = [];
  // Maldives has semi-diurnal tides (2 highs and 2 lows per day)
  // Approximate tide pattern with sinusoidal combination
  for (let hour = 0; hour <= 24; hour += 0.5) {
    // Two tidal components
    const primary = 0.6 * Math.sin((2 * Math.PI * (hour - 2)) / 12.4);
    const secondary = 0.15 * Math.sin((2 * Math.PI * (hour - 5)) / 6.2);
    const height = +(1.2 + primary + secondary).toFixed(2);

    const label =
      hour === Math.floor(hour)
        ? `${String(Math.floor(hour)).padStart(2, "0")}:00`
        : undefined;

    data.push({
      time: `${String(Math.floor(hour)).padStart(2, "0")}:${hour % 1 === 0 ? "00" : "30"}`,
      height,
      label,
    });
  }
  return data;
}

const tideData = generateTideData();

// Find high and low tides
const tideExtremes = tideData
  .filter((_, i) => {
    if (i === 0 || i === tideData.length - 1) return false;
    const prev = tideData[i - 1].height;
    const curr = tideData[i].height;
    const next = tideData[i + 1].height;
    return (curr > prev && curr > next) || (curr < prev && curr < next);
  })
  .slice(0, 4);

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl bg-ocean-deep/95 border border-white/10 px-3 py-2 shadow-glass text-xs">
      <p className="text-pearl/60 mb-1">{label}</p>
      <p className="text-pearl font-semibold">{payload[0].value.toFixed(2)}m</p>
    </div>
  );
}

export function TideChart() {
  const currentHour = new Date().getHours();
  const currentTime = `${String(currentHour).padStart(2, "0")}:00`;

  return (
    <div>
      {/* High/Low summary */}
      <div className="flex gap-4 mb-6">
        {tideExtremes.map((tide, i) => {
          const isHigh = tide.height > 1.2;
          return (
            <div key={i} className="flex items-center gap-2">
              {isHigh ? (
                <ArrowUp className="h-3.5 w-3.5 text-ocean-turquoise" />
              ) : (
                <ArrowDown className="h-3.5 w-3.5 text-coral" />
              )}
              <div>
                <p className="text-xs text-pearl/40">{isHigh ? "High" : "Low"}</p>
                <p className="text-sm font-bold text-pearl">{tide.height.toFixed(2)}m</p>
                <p className="text-xs text-pearl/40">{tide.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={tideData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
          <defs>
            <linearGradient id="tideGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0891B2" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#0891B2" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="time"
            tick={{ fill: "rgba(248,250,252,0.3)", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            interval={5}
          />
          <YAxis
            tick={{ fill: "rgba(248,250,252,0.3)", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            domain={[0, 2]}
            tickCount={5}
            unit="m"
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            x={currentTime}
            stroke="#22D3EE"
            strokeDasharray="4 2"
            strokeWidth={1.5}
            label={{ value: "Now", fill: "#22D3EE", fontSize: 10, position: "top" }}
          />
          <Line
            type="monotone"
            dataKey="height"
            stroke="#0891B2"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: "#22D3EE", stroke: "#0A1628", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-xs text-pearl/20 text-center mt-2">
        Tide data for Malé, Maldives (approximate)
      </p>
    </div>
  );
}
