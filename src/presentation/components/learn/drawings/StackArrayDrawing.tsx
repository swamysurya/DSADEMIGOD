"use client";

import React from "react";

export default function StackArrayDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-border bg-card p-5 rounded-sm space-y-4">
        <div>
          <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wide">
            Stack Array Implementation
          </h4>
          <p className="text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Using a fixed-size array where the 'top' variable tracks the index of the highest item."
          </p>
        </div>

        {/* Array Structure */}
        <div className="flex flex-col gap-4 p-4 border border-dashed border-border/80 bg-secondary/5 font-mono text-xs">
          
          {/* Top Indicator */}
          <div className="flex items-center justify-between border-b border-border/30 pb-2">
            <div>
              <span className="text-[10px] font-bold text-foreground">Top Pointer: </span>
              <span className="px-2 py-0.5 border border-primary/40 bg-accent/10 rounded-sm font-bold text-primary">top = 2</span>
            </div>
            <div>
              <span className="text-[9px] text-rose-600 font-bold">Max Size = 5 (indices 0 to 4)</span>
            </div>
          </div>

          {/* Array Cells */}
          <div className="flex gap-1.5 w-full justify-center">
            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] text-secondary-foreground/60">idx 0</span>
              <div className="w-full h-10 border border-border bg-card flex items-center justify-center font-bold">10</div>
            </div>

            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] text-secondary-foreground/60">idx 1</span>
              <div className="w-full h-10 border border-border bg-card flex items-center justify-center font-bold">20</div>
            </div>

            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] text-primary font-black">idx 2 (top)</span>
              <div className="w-full h-10 border-2 border-primary bg-accent/10 flex items-center justify-center font-black text-primary">30</div>
            </div>

            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] text-secondary-foreground/60">idx 3</span>
              <div className="w-full h-10 border border-dashed border-border/40 bg-card flex items-center justify-center text-secondary-foreground/30 italic">empty</div>
            </div>

            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] text-secondary-foreground/60">idx 4</span>
              <div className="w-full h-10 border border-dashed border-border/40 bg-card flex items-center justify-center text-secondary-foreground/30 italic">empty</div>
            </div>
          </div>

          {/* Limits Alert */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-[10px] text-secondary-foreground leading-relaxed">
            <div className="p-2 border border-rose-500/20 bg-rose-500/5 rounded-sm">
              <strong className="text-rose-700">⚠️ Overflow:</strong> Trying to push when `top == MaxSize - 1` (array is fully packed).
            </div>
            <div className="p-2 border border-amber-500/20 bg-amber-500/5 rounded-sm">
              <strong className="text-amber-700">⚠️ Underflow:</strong> Trying to pop when `top == -1` (stack is empty).
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
