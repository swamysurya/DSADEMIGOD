"use client";

import React from "react";

export default function StackPlatesDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-xl border border-border bg-card p-5 rounded-sm space-y-4">
        <div>
          <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wide">
            Stack: LIFO (Last In, First Out)
          </h4>
          <p className="text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Like a stack of plates: you can only add or remove from the very top!"
          </p>
        </div>

        {/* Stack Box Drawing */}
        <div className="flex items-center justify-center gap-8 p-4 border border-dashed border-border/80 bg-secondary/5 font-mono text-xs">
          
          {/* Operations indicators */}
          <div className="flex flex-col gap-3 font-bold text-[10px]">
            <div className="flex items-center gap-2 text-primary">
              <span>Push (Add):</span>
              <span className="px-1 border border-primary/30 bg-card">Enter from TOP ↴</span>
            </div>
            <div className="flex items-center gap-2 text-rose-700">
              <span>Pop (Remove):</span>
              <span className="px-1 border border-rose-500/30 bg-card">Leave from TOP ⬈</span>
            </div>
            <div className="flex items-center gap-2 text-amber-700">
              <span>Peek (Look):</span>
              <span className="px-1 border border-amber-500/30 bg-card">Inspect TOP element 👁</span>
            </div>
          </div>

          {/* The Stack structure */}
          <div className="flex flex-col items-center">
            {/* Top indicator */}
            <span className="text-[9px] text-primary font-bold mb-1">← TOP (Access point)</span>
            
            {/* The Bucket */}
            <div className="w-32 border-b-2 border-x-2 border-foreground flex flex-col-reverse p-1 gap-1 bg-card min-h-[120px]">
              <div className="h-6 border border-border bg-secondary/20 flex items-center justify-center font-bold">Plate 1 (Bottom)</div>
              <div className="h-6 border border-border bg-secondary/20 flex items-center justify-center font-bold">Plate 2</div>
              <div className="h-6 border border-primary bg-accent/10 flex items-center justify-center font-black text-primary">Plate 3 (Top)</div>
            </div>
            
            <span className="text-[9px] text-secondary-foreground/60 mt-1 font-bold">Bottom is closed</span>
          </div>

        </div>
      </div>
    </div>
  );
}
