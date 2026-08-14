"use client";

import React from "react";

export default function StockProfitIIDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-border bg-card p-5 rounded-sm space-y-4">
        <div>
          <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wide">
            Accumulating Positive Slopes (prices = [7, 1, 5, 3, 6, 4])
          </h4>
          <p className="text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Whenever price goes up from yesterday, we grab the profit instantly!"
          </p>
        </div>

        {/* Tracing Timeline */}
        <div className="flex flex-col gap-4 p-4 border border-dashed border-border/80 bg-secondary/5 font-mono text-xs">
          
          {/* Day Columns */}
          <div className="flex items-end justify-center gap-3 h-32 border-b border-foreground/60 pb-1 px-2">
            
            {/* Day 1: 7 */}
            <div className="flex flex-col items-center w-14 gap-1">
              <span className="text-[9px] text-secondary-foreground/60">7</span>
              <div className="w-full h-24 border border-border bg-secondary/20 flex items-center justify-center font-bold">7</div>
              <span className="text-[8px] text-secondary-foreground">Day 1</span>
            </div>

            {/* Day 2: 1 */}
            <div className="flex flex-col items-center w-14 gap-1">
              <span className="text-[9px] text-secondary-foreground/60">1</span>
              <div className="w-full h-4 border border-border bg-secondary/20 flex items-center justify-center font-bold">1</div>
              <span className="text-[8px] text-secondary-foreground">Day 2</span>
            </div>

            {/* Slope 1 Arrow */}
            <div className="flex flex-col items-center justify-center shrink-0">
              <span className="text-emerald-600 font-extrabold text-xs">▲ +4</span>
              <span className="text-emerald-500 text-[10px]">──▶</span>
            </div>

            {/* Day 3: 5 */}
            <div className="flex flex-col items-center w-14 gap-1">
              <span className="text-[9px] text-emerald-800 font-bold">5</span>
              <div className="w-full h-16 border-2 border-emerald-500 bg-emerald-500/10 flex items-center justify-center font-bold">5</div>
              <span className="text-[8px] text-emerald-800">Day 3</span>
            </div>

            {/* Slope 2 Decline */}
            <div className="flex flex-col items-center justify-center shrink-0 text-rose-500/50">
              <span className="text-[8px]">▼ -2</span>
              <span>──▶</span>
            </div>

            {/* Day 4: 3 */}
            <div className="flex flex-col items-center w-14 gap-1">
              <span className="text-[9px] text-secondary-foreground/60">3</span>
              <div className="w-full h-10 border border-border bg-secondary/20 flex items-center justify-center font-bold">3</div>
              <span className="text-[8px] text-secondary-foreground">Day 4</span>
            </div>

            {/* Slope 3 Arrow */}
            <div className="flex flex-col items-center justify-center shrink-0">
              <span className="text-emerald-600 font-extrabold text-xs">▲ +3</span>
              <span className="text-emerald-500 text-[10px]">──▶</span>
            </div>

            {/* Day 5: 6 */}
            <div className="flex flex-col items-center w-14 gap-1">
              <span className="text-[9px] text-emerald-800 font-bold">6</span>
              <div className="w-full h-20 border-2 border-emerald-500 bg-emerald-500/10 flex items-center justify-center font-bold">6</div>
              <span className="text-[8px] text-emerald-800">Day 5</span>
            </div>

            {/* Slope 4 Decline */}
            <div className="flex flex-col items-center justify-center shrink-0 text-rose-500/50">
              <span className="text-[8px]">▼ -2</span>
              <span>──▶</span>
            </div>

            {/* Day 6: 4 */}
            <div className="flex flex-col items-center w-14 gap-1">
              <span className="text-[9px] text-secondary-foreground/60">4</span>
              <div className="w-full h-12 border border-border bg-secondary/20 flex items-center justify-center font-bold">4</div>
              <span className="text-[8px] text-secondary-foreground">Day 6</span>
            </div>

          </div>

          {/* Profit Calculation Result */}
          <div className="p-2 border border-emerald-600/30 bg-emerald-500/5 text-emerald-800 text-[10px] rounded-sm text-center leading-relaxed">
            <strong>Total Profit Calculation:</strong>
            <br />
            <code>Accumulate Positive Gains = (5 - 1) + (6 - 3) = 4 + 3 = 7 units</code>
          </div>

        </div>
      </div>
    </div>
  );
}
