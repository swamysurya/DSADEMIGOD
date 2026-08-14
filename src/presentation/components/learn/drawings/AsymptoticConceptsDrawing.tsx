"use client";

import React from "react";

export default function AsymptoticConceptsDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-xl border border-[#DDD7CC] bg-[#FCFBF8] p-4 rounded-sm space-y-4 font-sans text-xs">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#DDD7CC]/40 pb-2">
          <span className="font-mono font-black text-foreground uppercase tracking-wider">
            Quick Math Check: n² + 5 vs 2n²
          </span>
          <span className="text-[11px] text-[#3F51B5] font-bold" style={{ fontFamily: "'Caveat', cursive" }}>
            Threshold n₀ = 3
          </span>
        </div>

        {/* Dynamic Comparison Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          {/* Left Side: Simplified Definitions & Table */}
          <div className="space-y-3 font-mono">
            <div className="space-y-1">
              <div><span className="text-muted-foreground font-bold">f(n) (Actual steps):</span> <span className="text-foreground font-black font-mono">n² + 5</span></div>
              <div><span className="text-muted-foreground font-bold">g(n) (Benchmark):</span> <span className="text-foreground font-black font-mono">n²</span></div>
              <div><span className="text-muted-foreground font-bold">c·g(n) (Limit ceiling):</span> <span className="text-[#3F51B5] font-black font-mono">2n²</span></div>
            </div>

            <div className="border-t border-[#DDD7CC]/50 pt-2 space-y-1">
              <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider pb-1">Value comparison:</div>
              <div className="grid grid-cols-3 text-center border-b border-[#DDD7CC]/30 pb-0.5 text-muted-foreground text-[10px]">
                <div>n</div>
                <div>n² + 5</div>
                <div>2n²</div>
              </div>
              <div className="grid grid-cols-3 text-center py-0.5 text-[#C0392B] font-bold">
                <div>1</div>
                <div>6</div>
                <div>2 (6 &gt; 2)</div>
              </div>
              <div className="grid grid-cols-3 text-center py-0.5 text-[#C0392B] font-bold">
                <div>2</div>
                <div>9</div>
                <div>8 (9 &gt; 8)</div>
              </div>
              <div className="grid grid-cols-3 text-center py-0.5 bg-[#2E7D32]/5 text-[#2E7D32] font-bold rounded-sm">
                <div>3 (n₀)</div>
                <div>14</div>
                <div>18 (14 ≤ 18)</div>
              </div>
            </div>
          </div>

          {/* Right Side: Simple visual sketch */}
          <div className="flex justify-center border-l sm:border-l border-[#DDD7CC]/40 pl-0 sm:pl-4">
            <svg viewBox="0 0 200 120" className="w-full max-w-[180px] h-auto overflow-visible">
              {/* Axes */}
              <line x1="20" y1="100" x2="185" y2="100" stroke="#666" strokeWidth="1.2" />
              <line x1="20" y1="100" x2="20" y2="10" stroke="#666" strokeWidth="1.2" />
              <text x="180" y="110" fill="#666" fontSize="8" fontWeight="bold">n</text>
              <text x="10" y="8" fill="#666" fontSize="8" fontWeight="bold">Steps</text>

              {/* Ceiling line 2n^2 */}
              <path d="M 20 90 Q 70 65, 120 40 T 170 15" fill="none" stroke="#3F51B5" strokeWidth="2" />
              <text x="135" y="12" fill="#3F51B5" fontSize="12" style={{ fontFamily: "'Caveat', cursive", fontWeight: "bold" }}>Limit: 2n²</text>

              {/* Actual steps n^2 + 5 */}
              <path d="M 20 80 Q 70 70, 120 55 T 175 40" fill="none" stroke="#232323" strokeWidth="1.2" strokeDasharray="1.5,1.5" />
              <text x="140" y="48" fill="#232323" fontSize="12" style={{ fontFamily: "'Caveat', cursive", fontWeight: "bold" }}>Actual: n² + 5</text>

              {/* Crossover line */}
              <line x1="120" y1="100" x2="120" y2="40" stroke="#C0392B" strokeWidth="0.8" strokeDasharray="2,2" />
              <circle cx="120" cy="40" r="3" fill="#C0392B" />
              <text x="110" y="110" fill="#C0392B" fontSize="8" fontWeight="bold">n₀=3</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
