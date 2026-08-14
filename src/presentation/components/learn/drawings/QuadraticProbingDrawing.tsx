"use client";

import React from "react";

export default function QuadraticProbingDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-4 shadow-sm">
        <div>
          <h4 className="text-xs font-extrabold text-[#232323] uppercase tracking-wide">
            Open Addressing: Quadratic Probing Example
          </h4>
          <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "If slot is full, check slot + 1², slot + 2², slot + 3²... to jump clusters!"
          </p>
        </div>

        {/* SVG Quadratic Probing Diagram */}
        <div className="w-full p-4 border border-dashed border-[#DDD7CC] bg-[#F4F1EA]/30 rounded-sm flex justify-center">
          <svg className="w-full max-w-[460px] h-auto" viewBox="0 0 460 120" fill="none">
            
            {/* Headers */}
            <g className="font-sans font-bold text-[9px] fill-[#666666] uppercase">
              <text x="15" y="20">Probing Step</text>
              <text x="145" y="20">Calculated Slot</text>
              <text x="255" y="20">Status</text>
            </g>

            {/* Divider line */}
            <line x1="15" y1="26" x2="350" y2="26" stroke="#DDD7CC" strokeWidth="0.8" />

            {/* Table Rows */}
            <g className="font-mono text-[9px]">
              {/* Row 1 */}
              <text x="15" y="45" fill="#666666">i = 0 (Home slot)</text>
              <text x="145" y="45" fill="#232323" className="font-bold">5</text>
              <text x="255" y="45" fill="#C0392B" className="font-bold">Occupied by 25</text>

              {/* Row 2 */}
              <text x="15" y="70" fill="#666666">i = 1 (+ 1² = +1)</text>
              <text x="145" y="70" fill="#232323" className="font-bold">6</text>
              <text x="255" y="70" fill="#C0392B" className="font-bold">Occupied by 35</text>

              {/* Row 3 */}
              <text x="15" y="95" fill="#666666">i = 2 (+ 2² = +4)</text>
              <text x="145" y="95" fill="#232323" className="font-bold">9</text>
              <text x="255" y="95" fill="#2E7D32" className="font-black">Empty! Key stored</text>
            </g>

            {/* Right annotation */}
            <text x="365" y="65" fill="#666666" className="text-[12px] font-sans" style={{ fontFamily: "'Caveat', cursive" }}>
              "Quadratic jumps<br />skip clusters!"
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
