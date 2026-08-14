"use client";

import React from "react";

export default function DirectAddressTableDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-border bg-card p-5 rounded-sm space-y-4">
        <div>
          <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wide">
            Direct Address Table (DAT) Memory Layout
          </h4>
          <p className="text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Using the value directly as the index leads to massive memory gaps."
          </p>
        </div>

        {/* Memory Grid */}
        <div className="flex flex-col gap-3 p-4 border border-dashed border-border/80 bg-secondary/5 font-mono text-xs">
          
          {/* Top row: Array cells */}
          <div className="flex items-stretch justify-center gap-1.5 w-full">
            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] text-secondary-foreground/60">idx 0</span>
              <div className="w-full h-10 border border-border bg-card flex items-center justify-center text-[10px] text-secondary-foreground/40 italic">empty</div>
            </div>
            
            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] text-secondary-foreground/60">...</span>
              <div className="w-full h-10 border border-border bg-card flex items-center justify-center text-[10px] text-secondary-foreground/40 italic">empty</div>
            </div>

            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] text-secondary-foreground/60">idx 5</span>
              <div className="w-full h-10 border border-primary bg-accent/10 flex items-center justify-center text-xs font-bold text-foreground">5</div>
            </div>

            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] text-secondary-foreground/60">...</span>
              <div className="w-full h-10 border border-border bg-card flex items-center justify-center text-[10px] text-secondary-foreground/40 italic">empty</div>
            </div>

            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] text-secondary-foreground/60">idx 12</span>
              <div className="w-full h-10 border border-primary bg-accent/10 flex items-center justify-center text-xs font-bold text-foreground">12</div>
            </div>

            {/* Giant Broken Link Gap */}
            <div className="flex-[3] flex flex-col items-center gap-1">
              <span className="text-[9px] text-rose-600 font-bold">idx 13 to 9,999,999</span>
              <div className="w-full h-10 border border-dashed border-rose-300 bg-rose-500/5 flex items-center justify-center text-[9px] text-rose-700 font-bold text-center">
                ─── ( 9,999,987 Empty Wasted Slots ) ───
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] text-secondary-foreground/60">idx 10M</span>
              <div className="w-full h-10 border border-primary bg-accent/10 flex items-center justify-center text-xs font-bold text-foreground">10M</div>
            </div>
          </div>

          {/* Cursive Annotations */}
          <div className="mt-2 text-center text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "15px" }}>
            "We only stored three numbers (5, 12, 10,000,000) but we allocated a 10-million box array!"
          </div>
        </div>
      </div>
    </div>
  );
}
