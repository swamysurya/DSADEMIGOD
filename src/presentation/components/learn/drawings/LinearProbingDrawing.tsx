"use client";

import React from "react";

export default function LinearProbingDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-4 shadow-sm">
        <div>
          <h4 className="text-xs font-extrabold text-[#232323] uppercase tracking-wide">
            Open Addressing: Linear Probing Example
          </h4>
          <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "If slot is full, check slot + 1, slot + 2, slot + 3... in a straight line."
          </p>
        </div>

        {/* SVG Linear Probing Diagram */}
        <div className="w-full p-4 border border-dashed border-[#DDD7CC] bg-[#F4F1EA]/30 rounded-sm flex justify-center">
          <svg className="w-full max-w-[440px] h-auto" viewBox="0 0 440 120" fill="none">
            
            {/* Row 1: Slot 5 */}
            <g className="font-mono text-[9px]">
              <text x="15" y="28" fill="#666666" className="font-bold">[5]</text>
              <rect x="50" y="15" width="40" height="20" rx="2" fill="#FCFBF8" stroke="#2E7D32" strokeWidth="1" />
              <text x="70" y="28" textAnchor="middle" fill="#2E7D32" className="font-black">25</text>
              
              <text x="110" y="28" fill="#666666" className="text-[12px] font-sans" style={{ fontFamily: "'Caveat', cursive" }}>
                "Home slot (No collision)"
              </text>
            </g>

            {/* Row 2: Slot 6 */}
            <g className="font-mono text-[9px]">
              <text x="15" y="58" fill="#666666" className="font-bold">[6]</text>
              <rect x="50" y="45" width="40" height="20" rx="2" fill="#FCFBF8" stroke="#2E7D32" strokeWidth="1" />
              <text x="70" y="58" textAnchor="middle" fill="#2E7D32" className="font-black">35</text>
              
              <text x="110" y="58" fill="#C0392B" className="text-[11px] font-sans font-bold" style={{ fontFamily: "'Caveat', cursive" }}>
                "Collision at [5] ──▶ Stored at [6]"
              </text>
            </g>

            {/* Row 3: Slot 7 */}
            <g className="font-mono text-[9px]">
              <text x="15" y="88" fill="#666666" className="font-bold">[7]</text>
              <rect x="50" y="75" width="40" height="20" rx="2" fill="#FCFBF8" stroke="#2E7D32" strokeWidth="1" />
              <text x="70" y="88" textAnchor="middle" fill="#2E7D32" className="font-black">45</text>
              
              <text x="110" y="88" fill="#C0392B" className="text-[11px] font-sans font-bold" style={{ fontFamily: "'Caveat', cursive" }}>
                "Collision at [5], [6] ──▶ Stored at [7]"
              </text>
            </g>

          </svg>
        </div>
      </div>
    </div>
  );
}
