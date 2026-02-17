"use client";

import {
  useAllScholarships,
  useAllUniversities,
} from "@/hooks/use-queries-hook";
import { format, subMonths, isSameMonth, isSameYear, parseISO } from "date-fns";
import { useState } from "react";
import { TrendingUp } from "lucide-react";

export function RevenueChart() {
  const { data: scholarships = { content: [] } } = useAllScholarships({
    size: 1000,
  }); // Get enough to count
  const { data: universities = [] } = useAllUniversities();

  // Generate data for the last 7 months including current month
  const DATA = Array.from({ length: 7 })
    .map((_, i) => {
      const date = subMonths(new Date(), 6 - i);

      const scholarshipCount = (scholarships.content || []).filter((item) => {
        if (!item.createdAt) return false;
        const itemDate =
          typeof item.createdAt === "string"
            ? parseISO(item.createdAt)
            : new Date(item.createdAt);
        return isSameMonth(itemDate, date) && isSameYear(itemDate, date);
      }).length;

      const universityCount = universities.filter((item) => {
        if (!item.createdAt) return false;
        const itemDate =
          typeof item.createdAt === "string"
            ? parseISO(item.createdAt)
            : new Date(item.createdAt);
        return isSameMonth(itemDate, date) && isSameYear(itemDate, date);
      }).length;

      return {
        day: format(date, "MMM"),
        value: universityCount, // Mapping universities to "value"
        scholarships: scholarshipCount,
      };
    })
    .reverse();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const max =
    Math.max(...DATA.map((d) => Math.max(d.value, d.scholarships))) + 5; // Dynamic max scale
  const height = 200;
  const width = 400;
  const padding = 40;

  const points = DATA.map((d, i) => {
    const x = (i * (width - padding * 2)) / (DATA.length - 1) + padding;
    const y = height - (d.value / max) * (height - padding * 2) - padding;
    return `${x},${y}`;
  }).join(" ");

  const areaPoints = `
    ${padding},${height - padding} 
    ${points} 
    ${width - padding},${height - padding}
  `;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex-1 relative overflow-hidden group">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Growth Trend</h3>
          <p className="text-sm text-gray-500">Last 7 months performance</p>
        </div>
        <div className="text-orange-500">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>

      <div className="relative h-[250px] w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Grid lines */}
          {[0, 2000, 4000, 6000, 8000].map((v) => {
            const y = height - (v / max) * (height - padding * 2) - padding;
            return (
              <g key={v}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  className="stroke-gray-100"
                  strokeDasharray="4 4"
                />
                <text x={0} y={y + 4} className="text-[10px] fill-gray-400">
                  {v}
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <polyline
            points={areaPoints}
            fill="url(#revenueGradient)"
            className="opacity-10"
          />
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fef3c7" />
            </linearGradient>
          </defs>

          {/* Vertical hover line */}
          {hoveredIndex !== null && (
            <line
              x1={
                (hoveredIndex * (width - padding * 2)) / (DATA.length - 1) +
                padding
              }
              y1={padding}
              x2={
                (hoveredIndex * (width - padding * 2)) / (DATA.length - 1) +
                padding
              }
              y2={height - padding}
              className="stroke-orange-200"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          )}

          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {DATA.map((d, i) => {
            const x = (i * (width - padding * 2)) / (DATA.length - 1) + padding;
            const y =
              height - (d.value / max) * (height - padding * 2) - padding;
            return (
              <g key={i} onMouseEnter={() => setHoveredIndex(i)}>
                <circle
                  cx={x}
                  cy={y}
                  r={hoveredIndex === i ? 6 : 4}
                  fill="white"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  className="transition-all duration-200 cursor-pointer"
                />
                <text
                  x={x}
                  y={height - 5}
                  textAnchor="middle"
                  className={`text-[10px] transition-colors duration-200 ${hoveredIndex === i ? "fill-orange-500 font-bold" : "fill-gray-400"}`}
                >
                  {d.day}
                </text>
                {/* Transparent capture area for easier hovering */}
                <rect
                  x={x - 20}
                  y={0}
                  width={40}
                  height={height}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(i)}
                />
              </g>
            );
          })}

          {/* Dynamic Tooltip */}
          {hoveredIndex !== null && (
            <g
              transform={`translate(${
                (hoveredIndex * (width - padding * 2)) / (DATA.length - 1) +
                padding -
                50
              }, ${
                height -
                (DATA[hoveredIndex].value / max) * (height - padding * 2) -
                padding -
                60
              })`}
              className="pointer-events-none transition-all duration-200"
            >
              <rect
                width="110"
                height="45"
                rx="8"
                className="fill-white shadow-2xl filter drop-shadow-xl"
              />
              <rect
                width="110"
                height="45"
                rx="8"
                className="fill-white border border-gray-100"
              />
              <text
                x="12"
                y="18"
                className="text-[11px] font-bold fill-gray-900"
              >
                {DATA[hoveredIndex].day}
              </text>
              <text
                x="12"
                y="35"
                className="text-[12px] font-bold fill-orange-500"
              >
                scholarship : {DATA[hoveredIndex].scholarships}
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
