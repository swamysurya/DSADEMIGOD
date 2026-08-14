"use client";

import React from "react";

export default function CollisionConceptDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-border bg-card p-5 rounded-sm space-y-4">
        <div>
          <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wide">
            Visualizing a Collision
          </h4>
          <p className="text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "When two different keys fight for the exact same slot in memory."
          </p>
        </div>

        {/* Drawing Layout */}
        <div className="flex flex-col md:flex-row items-center justify-around gap-6 p-6 border border-dashed border-border/80 bg-secondary/5">
          
          {/* Keys Space */}
          <div className="flex flex-col gap-4">
            <div className="p-3 border-2 border-primary bg-card rounded-sm text-center shadow-sm w-24">
              <span className="text-[10px] text-secondary-foreground">Key A</span>
              <div className="text-sm font-black text-foreground">25</div>
            </div>

            <div className="p-3 border-2 border-primary bg-card rounded-sm text-center shadow-sm w-24">
              <span className="text-[10px] text-secondary-foreground">Key B</span>
              <div className="text-sm font-black text-foreground">35</div>
            </div>
          </div>

          {/* Mapping Arrows and Hash Function Funnel */}
          <div className="flex flex-col items-center gap-1">
            <div className="p-4 border border-foreground bg-foreground text-background text-center rounded-sm max-w-[150px] shadow-md">
              <span className="text-[9px] uppercase font-bold tracking-wide">Hash Function</span>
              <div className="text-xs font-mono font-bold mt-1">H(x) = x % 10</div>
            </div>
            <div className="text-[11px] text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
              25 % 10 = 5 <br />
              35 % 10 = 5
            </div>
          </div>

          {/* Hash Table Grid */}
          <div className="flex flex-col items-center border border-border bg-card p-3 rounded-sm min-w-[160px]">
            <span className="text-[9px] uppercase font-bold tracking-wider text-secondary-foreground mb-2">Hash Table (Size 10)</span>
            
            <div className="w-full flex flex-col gap-0.5 font-mono text-xs">
              <div className="flex border border-border/40 p-1 bg-secondary/10">
                <span className="w-8 text-[9px] text-secondary-foreground/60">[0]</span>
                <span className="text-[9px] italic text-secondary-foreground/30">empty</span>
              </div>
              <div className="flex border border-border/40 p-1 bg-secondary/10">
                <span className="w-8 text-[9px] text-secondary-foreground/60">...</span>
                <span className="text-[9px] italic text-secondary-foreground/30">empty</span>
              </div>
              <div className="flex border-2 border-rose-500 bg-rose-500/10 p-1 font-bold animate-pulse">
                <span className="w-8 text-[9px] text-rose-700 font-bold">[5]</span>
                <div className="flex flex-col gap-0.5 text-[9px] text-rose-800">
                  <span className="line-through text-rose-800/40">25 (already here)</span>
                  <span className="text-rose-950 font-black">🔥 35 (wants this slot!)</span>
                </div>
              </div>
              <div className="flex border border-border/40 p-1 bg-secondary/10">
                <span className="w-8 text-[9px] text-secondary-foreground/60">...</span>
                <span className="text-[9px] italic text-secondary-foreground/30">empty</span>
              </div>
            </div>

            <div className="mt-3 text-center text-xs text-rose-700 font-bold" style={{ fontFamily: "'Caveat', cursive", fontSize: "15px" }}>
              "Collision! Multiple values want index 5!"
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
