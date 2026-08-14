"use client";

import React from "react";

export default function MajorityCancellationDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-border bg-card p-5 rounded-sm space-y-4">
        <div>
          <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wide">
            Boyer-Moore Pairwise Cancellation
          </h4>
          <p className="text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Since the majority element appears more than half the time, it survives all cancellations."
          </p>
        </div>

        {/* Pairwise Cancellation Grid */}
        <div className="flex flex-col gap-3 p-4 border border-dashed border-border/80 bg-secondary/5 font-mono text-xs">
          
          <div className="flex flex-col gap-2.5">
            {/* Row 1: Pair 1 */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-between w-24 p-2 border border-primary bg-accent/10 rounded-sm font-bold text-center">
                M (Val: 2)
              </div>
              <span className="text-rose-600 font-bold">cancels</span>
              <div className="flex items-center justify-between w-24 p-2 border border-border bg-card rounded-sm text-center text-secondary-foreground/60">
                X (Val: 1)
              </div>
              <span className="text-[10px] text-secondary-foreground italic" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
                "One M and one non-M cancel out"
              </span>
            </div>

            {/* Row 2: Pair 2 */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-between w-24 p-2 border border-primary bg-accent/10 rounded-sm font-bold text-center">
                M (Val: 2)
              </div>
              <span className="text-rose-600 font-bold">cancels</span>
              <div className="flex items-center justify-between w-24 p-2 border border-border bg-card rounded-sm text-center text-secondary-foreground/60">
                Y (Val: 3)
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border/50 my-1" />

            {/* Row 3: Survivors */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-emerald-700 font-bold">SURVIVORS (No elements left to cancel them):</span>
                <div className="flex gap-2">
                  <div className="w-24 p-2 border-2 border-emerald-600 bg-emerald-500/10 rounded-sm font-black text-center text-emerald-800">
                    M (Val: 2)
                  </div>
                  <div className="w-24 p-2 border-2 border-emerald-600 bg-emerald-500/10 rounded-sm font-black text-center text-emerald-800">
                    M (Val: 2)
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-2 text-center text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "15px" }}>
            "No matter how the elements are ordered, the majority element will always win the cancellation duel!"
          </div>
        </div>
      </div>
    </div>
  );
}
