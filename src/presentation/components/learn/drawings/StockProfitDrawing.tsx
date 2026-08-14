"use client";

import React from "react";

export default function StockProfitDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-border bg-card p-5 rounded-sm space-y-4">
        <div>
          <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wide">
            Prefix Minimum & Profit Check (prices = [7, 1, 5, 3, 6, 4])
          </h4>
          <p className="text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "We remember the lowest price seen so far, and check if selling today yields a better profit!"
          </p>
        </div>

        {/* Tracing Timeline */}
        <div className="flex flex-col gap-4 p-4 border border-dashed border-border/80 bg-secondary/5 font-mono text-xs">
          
          {/* Day Columns */}
          <div className="flex items-end justify-center gap-3 h-32 border-b border-foreground/60 pb-1 px-2">
            
            {/* Day 1: 7 */}
            <div className="flex flex-col items-center w-14 gap-1">
              <span className="text-[9px] text-secondary-foreground/60">Price: 7</span>
              <div className="w-full h-24 border border-border bg-secondary/20 flex items-center justify-center font-bold">7</div>
              <span className="text-[8px] text-secondary-foreground">Day 1</span>
            </div>

            {/* Day 2: 1 */}
            <div className="flex flex-col items-center w-14 gap-1">
              <span className="text-[9px] text-rose-700 font-bold">Price: 1</span>
              <div className="w-full h-4 border-2 border-rose-500 bg-rose-500/20 flex flex-col items-center justify-center font-black text-rose-700 rounded-sm">
                <span>1</span>
              </div>
              <span className="text-[8px] text-rose-700 font-extrabold" style={{ fontFamily: "'Caveat', cursive", fontSize: "12px" }}>★ BUY</span>
            </div>

            {/* Day 3: 5 */}
            <div className="flex flex-col items-center w-14 gap-1">
              <span className="text-[9px] text-secondary-foreground/60">Price: 5</span>
              <div className="w-full h-16 border border-border bg-secondary/20 flex items-center justify-center font-bold">5</div>
              <span className="text-[8px] text-secondary-foreground">Day 3</span>
            </div>

            {/* Day 4: 3 */}
            <div className="flex flex-col items-center w-14 gap-1">
              <span className="text-[9px] text-secondary-foreground/60">Price: 3</span>
              <div className="w-full h-10 border border-border bg-secondary/20 flex items-center justify-center font-bold">3</div>
              <span className="text-[8px] text-secondary-foreground">Day 4</span>
            </div>

            {/* Day 5: 6 */}
            <div className="flex flex-col items-center w-14 gap-1">
              <span className="text-[9px] text-emerald-800 font-bold">Price: 6</span>
              <div className="w-full h-20 border-2 border-emerald-600 bg-emerald-500/20 flex flex-col items-center justify-center font-black text-emerald-800 rounded-sm">
                <span>6</span>
              </div>
              <span className="text-[8px] text-emerald-800 font-extrabold" style={{ fontFamily: "'Caveat', cursive", fontSize: "12px" }}>★ SELL</span>
            </div>

            {/* Day 6: 4 */}
            <div className="flex flex-col items-center w-14 gap-1">
              <span className="text-[9px] text-secondary-foreground/60">Price: 4</span>
              <div className="w-full h-12 border border-border bg-secondary/20 flex items-center justify-center font-bold">4</div>
              <span className="text-[8px] text-secondary-foreground">Day 6</span>
            </div>

          </div>

          {/* Profit Calculation Result */}
          <div className="p-2 border border-emerald-600/30 bg-emerald-500/5 text-emerald-800 text-[10px] rounded-sm text-center leading-relaxed">
            <strong>Max Profit Calculation:</strong>
            <br />
            <code>Selling Price (Day 5) - Buying Price (Day 2) = 6 - 1 = 5 units</code>
          </div>

        </div>
      </div>
    </div>
  );
}
