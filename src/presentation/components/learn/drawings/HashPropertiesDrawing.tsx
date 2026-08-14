"use client";

import React from "react";
import { Zap, GitMerge, Grid, ShieldAlert } from "lucide-react";

export default function HashPropertiesDrawing() {
  const properties = [
    {
      title: "1. Deterministic",
      subtitle: "Absolute Consistency",
      icon: <GitMerge className="w-5 h-5 text-[#3F51B5]" />,
      math: "Alice ➔ Hash(Alice) ➔ Index 3",
      explanation: "The same input key must ALWAYS produce the exact same slot index. If Alice hashes to 3 today, it must hash to 3 tomorrow—otherwise, we'd lose Alice's data forever!",
      accentColor: "#3F51B5"
    },
    {
      title: "2. Efficient",
      subtitle: "O(1) Constant Speed",
      icon: <Zap className="w-5 h-5 text-[#D97706]" />,
      math: "H(k) = Simple Math (no loops)",
      explanation: "The hash calculation must be lightning fast. If calculating the hash takes too long, we lose the benefit of instant, constant-time lookups.",
      accentColor: "#D97706"
    },
    {
      title: "3. Uniformly Distributed",
      subtitle: "Even Distribution",
      icon: <Grid className="w-5 h-5 text-[#2E7D32]" />,
      math: "Keys spread out: [0][1][2][3][4]",
      explanation: "Keys should be distributed evenly across the table. If a postmaster throws every letter into box 5, it overflows (high collisions) while other boxes sit empty.",
      accentColor: "#2E7D32"
    },
    {
      title: "4. Minimizes Collisions",
      subtitle: "Collision Prevention",
      icon: <ShieldAlert className="w-5 h-5 text-[#C0392B]" />,
      math: "Collisions ➔ Kept to a minimum",
      explanation: "While collisions are mathematically inevitable because our array is small, a good hash function avoids grouping patterns to keep collisions as rare as possible.",
      accentColor: "#C0392B"
    }
  ];

  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-3xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-4 shadow-sm">
        <div>
          <h4 className="text-xs font-extrabold text-[#232323] uppercase tracking-wide">
            Key Properties of a Great Hash Function
          </h4>
          <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Four essential guidelines that keep hash tables running in O(1) time."
          </p>
        </div>

        {/* 2x2 grid of cards representing the properties */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {properties.map((prop, idx) => (
            <div 
              key={idx} 
              className="border border-[#DDD7CC] bg-[#FCFBF8] p-4 rounded-sm space-y-3 flex flex-col justify-between hover:shadow-sm transition-all"
            >
              <div className="space-y-1.5">
                {/* Header Row */}
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-[#F4F1EA] rounded-full">
                    {prop.icon}
                  </div>
                  <div>
                    <h5 className="text-xs font-extrabold text-[#232323] uppercase tracking-wide">
                      {prop.title}
                    </h5>
                    <p className="text-[9px] text-[#666666] uppercase tracking-wider font-mono">
                      {prop.subtitle}
                    </p>
                  </div>
                </div>

                {/* Math representation box */}
                <div className="p-1.5 border border-dashed border-[#DDD7CC] bg-[#F4F1EA]/20 rounded-sm font-mono text-[9px] text-center text-[#232323]">
                  {prop.math}
                </div>

                {/* Detailed Explanation */}
                <p className="text-[11px] text-[#666666] leading-relaxed font-sans">
                  {prop.explanation}
                </p>
              </div>

              {/* Whiteboard sketch subtext */}
              <span className="text-[11px] text-[#666666] italic" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px", color: prop.accentColor }}>
                {idx === 0 && "\"Deterministic means matching input ➔ exact same slot, always!\""}
                {idx === 1 && "\"Instant formula, never scan the array to find the starting index!\""}
                {idx === 2 && "\"Like spreading butter evenly on toast—no clumps allowed!\""}
                {idx === 3 && "\"We can't avoid collisions entirely, but we must make them rare!\""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
