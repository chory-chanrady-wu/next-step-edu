// No change yet, just viewing api.ts to investigate 401

import { useAllProfiles } from "@/hooks/use-queries-hook";
import { format, subMonths, isSameMonth, isSameYear, parseISO } from "date-fns";
import { useState } from 'react';
import { Users } from "lucide-react";

export function UserChart() {
    const { data: profiles = [] } = useAllProfiles();

    // Generate data for the last 7 months including current month
    const DATA = Array.from({ length: 7 }).map((_, i) => {
        const date = subMonths(new Date(), 6 - i);
        const count = profiles.filter(user => {
            const dateStr = user.createdAt || (user as any).created_at || (user as any).createdDate;
            if (!dateStr) return false;

            try {
                const userDate = typeof dateStr === 'string' ? parseISO(dateStr) : new Date(dateStr);
                return isSameMonth(userDate, date) && isSameYear(userDate, date);
            } catch (e) {
                return false;
            }
        }).length;

        return {
            day: format(date, "MMM"),
            value: count
        };
    }).reverse();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    console.log("UserChart Profiles:", profiles);
    console.log("UserChart DATA:", DATA);

    const max = Math.max(...DATA.map(d => d.value)) > 0 ? Math.max(...DATA.map(d => d.value)) + 2 : 10;
    const height = 200;
    const width = 400;
    const padding = 40;
    const barWidth = 30;

    // Create 5 dynamic grid lines and deduplicate to avoid key collisions
    const rawGridLines = Array.from({ length: 5 }).map((_, i) => Math.round((max / 4) * i));
    const gridLines = Array.from(new Set(rawGridLines)).sort((a, b) => a - b);

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex-1 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Monthly Registered Users</h3>
                    <p className="text-sm text-gray-500">Users per month</p>
                </div>
                <div className="text-blue-500 transition-transform group-hover:scale-110">
                    <Users className="w-5 h-5" />
                </div>
            </div>

            <div className="relative h-[250px] w-full">
                <svg
                    viewBox={`0 0 ${width} ${height}`}
                    className="w-full h-full overflow-visible"
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {/* Grid lines */}
                    {gridLines.map((v) => {
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

                    {/* Bars */}
                    {DATA.map((d, i) => {
                        const x = (i * (width - padding * 2)) / (DATA.length - 1) + padding - barWidth / 2;
                        const barHeight = (d.value / max) * (height - padding * 2);
                        const y = height - barHeight - padding;

                        return (
                            <g
                                key={i}
                                onMouseEnter={() => setHoveredIndex(i)}
                                className="cursor-pointer"
                            >
                                <rect
                                    x={x}
                                    y={y}
                                    width={barWidth}
                                    height={barHeight}
                                    rx="4"
                                    className={`transition-all duration-300 ${hoveredIndex === i ? 'fill-blue-600' : 'fill-blue-500'
                                        }`}
                                />
                                <text
                                    x={x + barWidth / 2}
                                    y={height - 5}
                                    textAnchor="middle"
                                    className={`text-[10px] transition-colors duration-200 ${hoveredIndex === i ? 'fill-blue-600 font-bold' : 'fill-gray-400'
                                        }`}
                                >
                                    {d.day}
                                </text>
                            </g>
                        );
                    })}

                    {/* Dynamic Tooltip */}
                    {hoveredIndex !== null && (
                        <g
                            transform={`translate(${(hoveredIndex * (width - padding * 2)) / (DATA.length - 1) + padding - 50
                                }, ${height - (DATA[hoveredIndex].value / max) * (height - padding * 2) - padding - 55
                                })`}
                            className="pointer-events-none transition-all duration-200 animate-in fade-in zoom-in-95 duration-200"
                        >
                            <rect width="100" height="45" rx="8" className="fill-white shadow-2xl filter drop-shadow-xl" />
                            <rect width="100" height="45" rx="8" className="fill-white border border-gray-100" />
                            <text x="12" y="18" className="text-[11px] font-bold fill-gray-900">{DATA[hoveredIndex].day}</text>
                            <text x="12" y="35" className="text-[12px] font-bold fill-blue-500">Users : {DATA[hoveredIndex].value}</text>
                        </g>
                    )}
                </svg>
            </div>
        </div>
    );
}
