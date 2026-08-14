"use client";

import React from "react";

export default function HashingTechniquesDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-3xl border border-border bg-card p-5 rounded-sm space-y-4">
        <div>
          <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wide">
            Common Hashing Techniques
          </h4>
          <p className="text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Three different mathematical ways to turn a key into an index."
          </p>
        </div>

        {/* 3 Columns for Hashing Techniques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border border-dashed border-border/80 bg-secondary/5">
          
          {/* Division Method */}
          <div className="flex flex-col justify-between p-4 border border-border bg-card rounded-sm space-y-4">
            <div>
              <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider">1. Division Method</span>
              <p className="text-[9px] text-secondary-foreground mt-1">
                Divide the key by table size $m$, take the remainder.
              </p>
            </div>
            
            <div className="p-3 border border-dashed border-border bg-secondary/20 rounded-sm font-mono text-[10px] text-center">
              <span className="text-secondary-foreground">Formula:</span>
              <div className="text-xs font-black text-foreground my-1">H(k) = k % m</div>
              <div className="text-[9px] text-secondary-foreground/60">
                m = 11 (Prime size)<br/>
                H(25) = 25 % 11 = <span className="text-primary font-bold">3</span>
              </div>
            </div>

            <span className="text-[10px] text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px" }}>
              "Choosing prime sizes prevents pattern clusters!"
            </span>
          </div>

          {/* Mid-Square Method */}
          <div className="flex flex-col justify-between p-4 border border-border bg-card rounded-sm space-y-4">
            <div>
              <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider">2. Mid-Square Method</span>
              <p className="text-[9px] text-secondary-foreground mt-1">
                Square the key, and extract the middle digits.
              </p>
            </div>

            <div className="p-3 border border-dashed border-border bg-secondary/20 rounded-sm font-mono text-[9px] space-y-1">
              <div>Key: <span className="font-bold text-foreground">60</span></div>
              <div>Square: 60 × 60 = <span className="font-bold text-foreground">3<span className="text-primary font-black underline">60</span>0</span></div>
              <div>Middle Digits: <span className="text-primary font-black">60</span></div>
              <div className="text-center font-bold border-t border-border mt-1 pt-1 text-[10px]">
                Index = 60
              </div>
            </div>

            <span className="text-[10px] text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px" }}>
              "Changes in any digit ripple to the middle digits!"
            </span>
          </div>

          {/* Folding Method */}
          <div className="flex flex-col justify-between p-4 border border-border bg-card rounded-sm space-y-4">
            <div>
              <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider">3. Folding Method</span>
              <p className="text-[9px] text-secondary-foreground mt-1">
                Slice the key into equal parts, add them, and modulo.
              </p>
            </div>

            <div className="p-3 border border-dashed border-border bg-secondary/20 rounded-sm font-mono text-[9px] space-y-1">
              <div>Key: <span className="font-bold text-foreground">123456</span></div>
              <div>Slice: <span className="text-primary font-bold">12</span> | <span className="text-primary font-bold">34</span> | <span className="text-primary font-bold">56</span></div>
              <div>Sum: 12 + 34 + 56 = <span className="font-bold text-foreground">102</span></div>
              <div className="text-center font-bold border-t border-border mt-1 pt-1 text-[10px]">
                102 % 100 = <span className="text-primary font-black">2</span>
              </div>
            </div>

            <span className="text-[10px] text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px" }}>
              "Perfect for hashing long social security or ID numbers."
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
