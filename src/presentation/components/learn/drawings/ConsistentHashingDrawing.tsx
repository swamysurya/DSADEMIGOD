"use client";

import React from "react";

export default function ConsistentHashingDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-border bg-card p-5 rounded-sm space-y-4">
        <div>
          <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wide">
            Consistent Hashing: The Circular Hash Ring
          </h4>
          <p className="text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Keys travel clockwise on the ring to find the nearest server."
          </p>
        </div>

        {/* Ring layout with SVG and Labels */}
        <div className="flex flex-col md:flex-row items-center justify-around gap-6 p-6 border border-dashed border-border/80 bg-secondary/5">
          
          {/* SVG Hash Ring */}
          <div className="relative w-[260px] h-[260px] flex items-center justify-center bg-card rounded-full border border-border shadow-inner">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              {/* The Ring Circle */}
              <circle cx="100" cy="100" r="70" fill="none" stroke="var(--border)" strokeWidth="2" strokeDasharray="4 4" />
              
              {/* Clockwise Flow Arrow */}
              <path d="M 170 100 A 70 70 0 0 1 149 149" fill="none" stroke="var(--primary)" strokeWidth="1.5" markerEnd="url(#arrow)" />
              
              {/* Server A (at 80 deg / ~top right) */}
              <circle cx="150" cy="50" r="10" fill="var(--primary)" />
              <text x="150" y="35" textAnchor="middle" className="text-[8px] font-mono font-bold fill-foreground">Server A (80°)</text>
              
              {/* Server B (at 260 deg / ~bottom left) */}
              <circle cx="45" cy="140" r="10" fill="var(--primary)" />
              <text x="45" y="160" textAnchor="middle" className="text-[8px] font-mono font-bold fill-foreground">Server B (260°)</text>

              {/* Key 1 (at 45 deg) */}
              <circle cx="165" cy="80" r="5" fill="#C0392B" />
              <text x="175" y="83" className="text-[7px] font-sans fill-foreground font-bold">Key 1 (45°)</text>
              {/* Arrow Key 1 -> Server A */}
              <path d="M 160 80 Q 158 68 153 58" fill="none" stroke="#C0392B" strokeWidth="1" strokeDasharray="2 2" />

              {/* Key 2 (at 300 deg) */}
              <circle cx="65" cy="55" r="5" fill="#D97706" />
              <text x="50" y="50" className="text-[7px] font-sans fill-foreground font-bold">Key 2 (300°)</text>
              {/* Routing Arrow Key 2 -> Server A (clockwise through 0 deg at top) */}
              <path d="M 70 52 Q 100 35 140 45" fill="none" stroke="#D97706" strokeWidth="1" strokeDasharray="2 2" />
            </svg>

            {/* Center Ring Label */}
            <div className="absolute text-center">
              <span className="text-[10px] font-sans text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive', sans-serif", fontSize: "14px" }}>
                "Clockwise Search"
              </span>
            </div>
          </div>

          {/* Explanation Text */}
          <div className="flex-1 space-y-4 font-mono text-[11px] leading-relaxed">
            <div className="p-3 border border-border bg-card rounded-sm space-y-2">
              <div className="text-rose-700 font-extrabold uppercase text-[9px]">Routing Trace:</div>
              <div>
                * <strong className="font-bold text-foreground">Key 1 (45°)</strong> travels clockwise and hits <strong className="font-bold text-foreground">Server A (80°)</strong>. Stored on Server A.
              </div>
              <div className="border-t border-border/40 my-1"></div>
              <div>
                * <strong className="font-bold text-foreground">Key 2 (300°)</strong> travels clockwise, wraps past 0°, and hits <strong className="font-bold text-foreground">Server A (80°)</strong>. Stored on Server A.
              </div>
            </div>

            <div className="p-3 border border-border bg-card rounded-sm space-y-1">
              <div className="text-primary font-bold text-[9px] uppercase">Why it is consistent:</div>
              <p className="text-[10px] text-secondary-foreground">
                If we add <strong className="font-bold text-foreground">Server C (180°)</strong>, only Key 1 relocates to it. Key 2 remains on Server A! No complete re-mapping storm occurs.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
