"use client";

import React from "react";

export default function HistogramStackDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-border bg-card p-5 rounded-sm space-y-4">
        <div>
          <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wide">
            Largest Rectangle in Histogram
          </h4>
          <p className="text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Using a stack to find the left and right boundary of the largest area for each bar."
          </p>
        </div>

        {/* Histogram visual representation */}
        <div className="flex flex-col gap-4 p-4 border border-dashed border-border/80 bg-secondary/5 font-mono text-xs">
          
          {/* Histogram bar charts */}
          <div className="flex items-end justify-center gap-2 h-40 border-b border-foreground/60 px-4 w-full">
            {/* Bar 0: height 2 */}
            <div className="flex flex-col items-center w-12 gap-1">
              <span className="text-[9px] text-secondary-foreground/60">h:2</span>
              <div className="w-full h-8 border border-foreground/80 bg-secondary/20 flex items-center justify-center font-bold">2</div>
              <span className="text-[8px] text-secondary-foreground">idx 0</span>
            </div>

            {/* Bar 1: height 1 */}
            <div className="flex flex-col items-center w-12 gap-1">
              <span className="text-[9px] text-secondary-foreground/60">h:1</span>
              <div className="w-full h-4 border border-foreground/80 bg-secondary/20 flex items-center justify-center font-bold">1</div>
              <span className="text-[8px] text-secondary-foreground">idx 1</span>
            </div>

            {/* Bar 2: height 5 */}
            <div className="flex flex-col items-center w-12 gap-1">
              <span className="text-[9px] text-primary font-bold">h:5</span>
              <div className="w-full h-20 border-2 border-primary bg-accent/20 flex items-center justify-center font-black text-primary">5</div>
              <span className="text-[8px] text-primary font-bold">idx 2</span>
            </div>

            {/* Bar 3: height 6 */}
            <div className="flex flex-col items-center w-12 gap-1">
              <span className="text-[9px] text-primary font-bold">h:6</span>
              <div className="w-full h-24 border-2 border-primary bg-accent/20 flex items-center justify-center font-black text-primary">6</div>
              <span className="text-[8px] text-primary font-bold">idx 3</span>
            </div>

            {/* Bar 4: height 2 */}
            <div className="flex flex-col items-center w-12 gap-1">
              <span className="text-[9px] text-secondary-foreground/60">h:2</span>
              <div className="w-full h-8 border border-foreground/80 bg-secondary/20 flex items-center justify-center font-bold">2</div>
              <span className="text-[8px] text-secondary-foreground">idx 4</span>
            </div>

            {/* Bar 5: height 3 */}
            <div className="flex flex-col items-center w-12 gap-1">
              <span className="text-[9px] text-secondary-foreground/60">h:3</span>
              <div className="w-full h-12 border border-foreground/80 bg-secondary/20 flex items-center justify-center font-bold">3</div>
              <span className="text-[8px] text-secondary-foreground">idx 5</span>
            </div>
          </div>

          {/* Area outline */}
          <div className="p-2 border border-emerald-600/30 bg-emerald-500/5 text-emerald-800 text-[10px] rounded-sm text-center leading-relaxed">
            <strong>💡 Maximum Rectangle Area:</strong> Formed by indices `2` and `3` with a height of `5` and width of `2`.
            <br/>
            <strong>Area = 5 * 2 = 10 units²</strong>
          </div>

        </div>
      </div>
    </div>
  );
}
