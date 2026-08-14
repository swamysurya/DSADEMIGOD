"use client";

import React, { useState } from "react";

export default function CPPHistoryUsage() {
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="flex flex-col md:flex-row gap-6 w-full items-stretch justify-center max-w-2xl px-2">

        {/* Left Side: Bjarne Stroustrup (Postage Stamp plaque) */}
        <div className="flex-1 border border-border bg-card p-5 flex flex-col justify-between items-center text-center relative min-h-[220px]">
          <div className="space-y-1 w-full">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-foreground">The Creator</h4>
            <div className="h-px bg-border/40 w-1/3 mx-auto my-2" />
          </div>

          {/* Large direct portrait occupying the full width of the outer card content area */}
          <div className="w-full space-y-2 flex flex-col items-center my-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/da/BjarneStroustrup.jpg"
              alt="Bjarne Stroustrup"
              className="w-full h-36 object-cover border border-border filter grayscale contrast-125 brightness-95"
            />
            <div className="text-center">
              <span className="text-xs font-bold block text-foreground leading-none">Bjarne Stroustrup</span>
              <span className="text-[10px] text-secondary-foreground block mt-1 leading-none" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
                Bell Labs, 1979
              </span>
            </div>
          </div>

          <p className="text-[11px] text-secondary-foreground font-serif leading-relaxed mt-3">
            Stroustrup added Object features to C, creating C++ to let developers build massive systems without losing execution speeds.
          </p>
        </div>

        {/* Right Side: Language Contest Usage (Pie Chart) */}
        <div className="flex-1 border border-border bg-card p-5 flex flex-col justify-between space-y-4 min-h-[220px]">
          <div className="space-y-1">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-foreground">Usage in Contests</h4>
            <p className="text-[12px] font-sans text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "15px" }}>
              "C++ dominates coding contests due to speed."
            </p>
          </div>

          {/* SVG Pie Chart */}
          <div className="h-32 w-full flex items-center justify-center gap-4 relative">
            <svg className="w-24 h-24 transform -rotate-90 text-foreground" viewBox="0 0 42 42">
              {/* Slice 1: C++ (80%) */}
              <circle
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="transparent"
                stroke="hsl(var(--accent))"
                strokeWidth="6"
                strokeDasharray="80 20"
                strokeDashoffset="0"
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredSlice("cpp")}
                onMouseLeave={() => setHoveredSlice(null)}
                style={{ opacity: hoveredSlice === "cpp" || !hoveredSlice ? 1 : 0.6 }}
              />
              {/* Slice 2: Python (15%) */}
              <circle
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="6"
                strokeDasharray="15 85"
                strokeDashoffset="-80"
                className="transition-all duration-300 cursor-pointer text-foreground/40"
                onMouseEnter={() => setHoveredSlice("python")}
                onMouseLeave={() => setHoveredSlice(null)}
                style={{ opacity: hoveredSlice === "python" || !hoveredSlice ? 1 : 0.6 }}
              />
              {/* Slice 3: Java/Others (5%) */}
              <circle
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="6"
                strokeDasharray="5 95"
                strokeDashoffset="-95"
                className="transition-all duration-300 cursor-pointer text-foreground/15"
                onMouseEnter={() => setHoveredSlice("others")}
                onMouseLeave={() => setHoveredSlice(null)}
                style={{ opacity: hoveredSlice === "others" || !hoveredSlice ? 1 : 0.6 }}
              />
            </svg>

            {/* Chart Legend */}
            <div className="flex flex-col gap-1 text-[10px] justify-center">
              <div
                className="flex items-center gap-1.5 cursor-pointer"
                onMouseEnter={() => setHoveredSlice("cpp")}
                onMouseLeave={() => setHoveredSlice(null)}
              >
                <div className="w-2.5 h-2.5 bg-accent" />
                <span className={`font-bold ${hoveredSlice === "cpp" ? "text-accent font-extrabold" : ""}`}>C++ (80%)</span>
              </div>
              <div
                className="flex items-center gap-1.5 cursor-pointer"
                onMouseEnter={() => setHoveredSlice("python")}
                onMouseLeave={() => setHoveredSlice(null)}
              >
                <div className="w-2.5 h-2.5 bg-foreground/40" />
                <span className={`font-serif ${hoveredSlice === "python" ? "text-foreground font-bold" : "text-secondary-foreground"}`}>Python (15%)</span>
              </div>
              <div
                className="flex items-center gap-1.5 cursor-pointer"
                onMouseEnter={() => setHoveredSlice("others")}
                onMouseLeave={() => setHoveredSlice(null)}
              >
                <div className="w-2.5 h-2.5 bg-foreground/15" />
                <span className={`font-serif ${hoveredSlice === "others" ? "text-foreground font-bold" : "text-secondary-foreground"}`}>Others (5%)</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border/40 text-[10px] text-secondary-foreground font-serif leading-relaxed">
            * Stats from major platform submissions showing language ratios chosen for solving problems.
          </div>
        </div>

      </div>
    </div>
  );
}
