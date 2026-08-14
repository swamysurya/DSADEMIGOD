"use client";

import React from "react";

export default function HashingMappingDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-4 shadow-sm">
        <div>
          <h4 className="text-xs font-extrabold text-[#232323] uppercase tracking-wide">
            How Modulo Storing Works
          </h4>
          <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Using remainder calculation to find the exact array slot."
          </p>
        </div>

        {/* SVG Diagram showing direct curved mappings */}
        <div className="w-full p-2 border border-dashed border-[#DDD7CC] bg-[#F4F1EA]/30 rounded-sm flex justify-center">
          <svg className="w-full max-w-[540px] h-auto" viewBox="0 0 540 210" fill="none">
            <defs>
              <marker
                id="arrow-blue"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3F51B5" />
              </marker>
            </defs>

            {/* Left Header */}
            <text x="75" y="20" textAnchor="middle" fill="#232323" className="font-sans font-bold text-[10px] uppercase">Keys</text>
            
            {/* Keys Column */}
            <g className="font-mono text-[10px]">
              {/* Key 1 */}
              <rect x="25" y="30" width="100" height="24" rx="2" fill="#FCFBF8" stroke="#DDD7CC" strokeWidth="1" />
              <text x="75" y="45" textAnchor="middle" fill="#232323" className="font-bold">10,000,000</text>

              {/* Key 2 */}
              <rect x="25" y="90" width="100" height="24" rx="2" fill="#FCFBF8" stroke="#DDD7CC" strokeWidth="1" />
              <text x="75" y="105" textAnchor="middle" fill="#232323" className="font-bold">12</text>

              {/* Key 3 */}
              <rect x="25" y="150" width="100" height="24" rx="2" fill="#FCFBF8" stroke="#DDD7CC" strokeWidth="1" />
              <text x="75" y="165" textAnchor="middle" fill="#232323" className="font-bold">5</text>
            </g>

            {/* Right Header */}
            <text x="445" y="20" textAnchor="middle" fill="#232323" className="font-sans font-bold text-[10px] uppercase">Table slots</text>

            {/* Table Slots Column */}
            <g className="font-mono text-[9px]">
              {/* Slot 0 */}
              <rect x="380" y="30" width="130" height="22" rx="2" fill="#FCFBF8" stroke="#2E7D32" strokeWidth="1" />
              <text x="388" y="44" fill="#2E7D32" className="font-bold">[0]</text>
              <text x="502" y="44" textAnchor="end" fill="#232323" className="font-black">10,000,000</text>

              {/* Slot 1 */}
              <rect x="380" y="58" width="130" height="22" rx="2" fill="#F4F1EA" stroke="#DDD7CC" strokeWidth="0.5" opacity="0.6" />
              <text x="388" y="72" fill="#666666" className="opacity-60">[1]</text>
              <text x="502" y="72" textAnchor="end" fill="#666666" className="opacity-40 italic">empty</text>

              {/* Slot 2 */}
              <rect x="380" y="86" width="130" height="22" rx="2" fill="#FCFBF8" stroke="#2E7D32" strokeWidth="1" />
              <text x="388" y="100" fill="#2E7D32" className="font-bold">[2]</text>
              <text x="502" y="100" textAnchor="end" fill="#232323" className="font-black">12</text>

              {/* Slots 3-4 */}
              <rect x="380" y="114" width="130" height="22" rx="2" fill="#F4F1EA" stroke="#DDD7CC" strokeWidth="0.5" opacity="0.4" />
              <text x="445" y="128" textAnchor="middle" fill="#666666" className="opacity-40 font-bold">...</text>

              {/* Slot 5 */}
              <rect x="380" y="142" width="130" height="22" rx="2" fill="#FCFBF8" stroke="#2E7D32" strokeWidth="1" />
              <text x="388" y="156" fill="#2E7D32" className="font-bold">[5]</text>
              <text x="502" y="156" textAnchor="end" fill="#232323" className="font-black">5</text>

              {/* Slots 6-9 */}
              <rect x="380" y="170" width="130" height="22" rx="2" fill="#F4F1EA" stroke="#DDD7CC" strokeWidth="0.5" opacity="0.4" />
              <text x="445" y="184" textAnchor="middle" fill="#666666" className="opacity-40 font-bold">...</text>
            </g>

            {/* Mappings and Equations */}
            {/* Key 1 to Slot 0 */}
            <path d="M 125 42 Q 250 42 374 41" stroke="#3F51B5" strokeWidth="1.5" markerEnd="url(#arrow-blue)" />
            <text x="245" y="37" textAnchor="middle" fill="#3F51B5" className="text-[12px] font-bold" style={{ fontFamily: "'Caveat', cursive" }}>
              10,000,000 % 10 = 0
            </text>

            {/* Key 2 to Slot 2 */}
            <path d="M 125 102 Q 250 102 374 97" stroke="#3F51B5" strokeWidth="1.5" markerEnd="url(#arrow-blue)" />
            <text x="245" y="97" textAnchor="middle" fill="#3F51B5" className="text-[12px] font-bold" style={{ fontFamily: "'Caveat', cursive" }}>
              12 % 10 = 2
            </text>

            {/* Key 3 to Slot 5 */}
            <path d="M 125 162 Q 250 162 374 153" stroke="#3F51B5" strokeWidth="1.5" markerEnd="url(#arrow-blue)" />
            <text x="245" y="157" textAnchor="middle" fill="#3F51B5" className="text-[12px] font-bold" style={{ fontFamily: "'Caveat', cursive" }}>
              5 % 10 = 5
            </text>

          </svg>
        </div>
      </div>
    </div>
  );
}
