"use client";

import React from "react";

export default function MonotonicStackDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-border bg-card p-5 rounded-sm space-y-4">
        <div>
          <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wide">
            Monotonic Increasing Stack
          </h4>
          <p className="text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Elements in the stack must be in strictly increasing order from bottom to top."
          </p>
        </div>

        {/* Comparison columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-dashed border-border/80 bg-secondary/5 font-mono text-xs">
          
          {/* State A */}
          <div className="p-3 border border-border bg-card flex flex-col justify-between space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-foreground/80">1. Current Valid State</span>
            <div className="flex flex-col items-center gap-1">
              <div className="w-24 border-b-2 border-x-2 border-foreground flex flex-col-reverse p-1 gap-1 bg-card min-h-[90px]">
                <div className="h-6 border border-border bg-secondary/20 flex items-center justify-center font-bold">10</div>
                <div className="h-6 border border-border bg-secondary/20 flex items-center justify-center font-bold">15</div>
                <div className="h-6 border border-primary bg-accent/10 flex items-center justify-center font-bold text-primary">25 (Top)</div>
              </div>
              <span className="text-[9px] text-emerald-600 font-bold mt-1">10 &lt; 15 &lt; 25 (Increasing!)</span>
            </div>
          </div>

          {/* State B */}
          <div className="p-3 border border-border bg-card flex flex-col justify-between space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700">2. Pushing a Smaller Element: 12</span>
            <div className="flex flex-col items-center gap-1">
              <div className="w-24 border-b-2 border-x-2 border-foreground flex flex-col-reverse p-1 gap-1 bg-card min-h-[90px]">
                <div className="h-6 border border-border bg-secondary/20 flex items-center justify-center font-bold">10</div>
                <div className="h-6 border border-primary bg-accent/10 flex items-center justify-center font-bold text-primary">12 (Top)</div>
                <div className="h-6 border border-dashed border-rose-300 bg-rose-500/5 text-rose-500 line-through flex items-center justify-center text-[9px]">15 (popped)</div>
                <div className="h-6 border border-dashed border-rose-300 bg-rose-500/5 text-rose-500 line-through flex items-center justify-center text-[9px]">25 (popped)</div>
              </div>
              <span className="text-[9px] text-rose-600 font-bold mt-1 text-center">
                "12 kicks out 25 and 15 because they violate the increasing order!"
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
