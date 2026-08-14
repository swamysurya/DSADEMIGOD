"use client";

import React from "react";

export default function RotateArrayReversalDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-border bg-card p-5 rounded-sm space-y-4">
        <div>
          <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wide">
            The Three-Reversal Method (k = 3)
          </h4>
          <p className="text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "A magic trick to rotate an array in-place without extra space!"
          </p>
        </div>

        {/* Tracing Grid */}
        <div className="flex flex-col gap-3.5 p-4 border border-dashed border-border/80 bg-secondary/5 font-mono text-xs">
          
          {/* Step 1 */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-secondary-foreground font-bold">1. Partition array at n - k (Index 4):</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-1 bg-primary/5 p-1 border border-primary/20 rounded-sm">
                <span className="w-6 h-6 border bg-card flex items-center justify-center font-bold">1</span>
                <span className="w-6 h-6 border bg-card flex items-center justify-center font-bold">2</span>
                <span className="w-6 h-6 border bg-card flex items-center justify-center font-bold">3</span>
                <span className="w-6 h-6 border bg-card flex items-center justify-center font-bold">4</span>
              </div>
              <span className="text-rose-600 font-extrabold font-serif">│</span>
              <div className="flex gap-1 bg-amber-500/5 p-1 border border-amber-500/20 rounded-sm">
                <span className="w-6 h-6 border bg-card flex items-center justify-center font-bold">5</span>
                <span className="w-6 h-6 border bg-card flex items-center justify-center font-bold">6</span>
                <span className="w-6 h-6 border bg-card flex items-center justify-center font-bold">7</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-secondary-foreground font-bold">2. Reverse the first part (1 to 4):</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-1 bg-primary/5 p-1 border border-primary/30 rounded-sm">
                <span className="w-6 h-6 border bg-accent/10 border-primary flex items-center justify-center font-black">4</span>
                <span className="w-6 h-6 border bg-accent/10 border-primary flex items-center justify-center font-black">3</span>
                <span className="w-6 h-6 border bg-accent/10 border-primary flex items-center justify-center font-black">2</span>
                <span className="w-6 h-6 border bg-accent/10 border-primary flex items-center justify-center font-black">1</span>
              </div>
              <span className="text-rose-600 font-extrabold font-serif">│</span>
              <div className="flex gap-1 bg-secondary/20 p-1 border border-border rounded-sm text-secondary-foreground/60">
                <span className="w-6 h-6 border bg-card flex items-center justify-center">5</span>
                <span className="w-6 h-6 border bg-card flex items-center justify-center">6</span>
                <span className="w-6 h-6 border bg-card flex items-center justify-center">7</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-secondary-foreground font-bold">3. Reverse the second part (5 to 7):</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-1 bg-secondary/20 p-1 border border-border rounded-sm text-secondary-foreground/60">
                <span className="w-6 h-6 border bg-card flex items-center justify-center">4</span>
                <span className="w-6 h-6 border bg-card flex items-center justify-center">3</span>
                <span className="w-6 h-6 border bg-card flex items-center justify-center">2</span>
                <span className="w-6 h-6 border bg-card flex items-center justify-center">1</span>
              </div>
              <span className="text-rose-600 font-extrabold font-serif">│</span>
              <div className="flex gap-1 bg-amber-500/5 p-1 border border-amber-500/30 rounded-sm">
                <span className="w-6 h-6 border bg-accent/10 border-amber-500 flex items-center justify-center font-black">7</span>
                <span className="w-6 h-6 border bg-accent/10 border-amber-500 flex items-center justify-center font-black">6</span>
                <span className="w-6 h-6 border bg-accent/10 border-amber-500 flex items-center justify-center font-black">5</span>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-emerald-700 font-bold">4. Reverse the entire array (indices 0 to 6):</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-1 bg-emerald-500/5 p-1 border border-emerald-500/30 rounded-sm">
                <span className="w-6 h-6 border bg-accent/10 border-emerald-600 flex items-center justify-center font-black text-emerald-800">5</span>
                <span className="w-6 h-6 border bg-accent/10 border-emerald-600 flex items-center justify-center font-black text-emerald-800">6</span>
                <span className="w-6 h-6 border bg-accent/10 border-emerald-600 flex items-center justify-center font-black text-emerald-800">7</span>
                <span className="w-6 h-6 border bg-accent/10 border-emerald-600 flex items-center justify-center font-black text-emerald-800">1</span>
                <span className="w-6 h-6 border bg-accent/10 border-emerald-600 flex items-center justify-center font-black text-emerald-800">2</span>
                <span className="w-6 h-6 border bg-accent/10 border-emerald-600 flex items-center justify-center font-black text-emerald-800">3</span>
                <span className="w-6 h-6 border bg-accent/10 border-emerald-600 flex items-center justify-center font-black text-emerald-800">4</span>
              </div>
            </div>
          </div>

          <div className="mt-2 text-center text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "15px" }}>
            "Result: The elements originally at the back [5, 6, 7] are now in front!"
          </div>
        </div>
      </div>
    </div>
  );
}
