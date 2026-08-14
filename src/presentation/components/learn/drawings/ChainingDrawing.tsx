"use client";

import React from "react";

export default function ChainingDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-4 shadow-sm">
        <div>
          <h4 className="text-xs font-extrabold text-[#232323] uppercase tracking-wide">
            Open Hashing: Separate Chaining Example
          </h4>
          <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Colliding elements are chained together outside the table in linked lists."
          </p>
        </div>

        {/* SVG Chaining Diagram */}
        <div className="w-full p-4 border border-dashed border-[#DDD7CC] bg-[#F4F1EA]/30 rounded-sm flex justify-center">
          <svg className="w-full max-w-[440px] h-auto" viewBox="0 0 440 120" fill="none">
            <defs>
              <marker
                id="arrow-chain"
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

            {/* Row 1: Slot 0 */}
            <g className="font-mono text-[9px]">
              <text x="15" y="27" fill="#666666" className="font-bold">Slot [0]:</text>
              <rect x="75" y="15" width="40" height="18" rx="2" fill="#F4F1EA" stroke="#DDD7CC" strokeWidth="0.5" />
              <text x="95" y="27" textAnchor="middle" fill="#666666" className="italic opacity-60">null</text>
            </g>

            {/* Row 2: Slot 5 */}
            <g className="font-mono text-[9px]">
              <text x="15" y="57" fill="#666666" className="font-bold">Slot [5]:</text>
              
              {/* Node 15 */}
              <rect x="75" y="45" width="35" height="18" rx="2" fill="#FCFBF8" stroke="#2E7D32" strokeWidth="1" />
              <text x="92.5" y="57" textAnchor="middle" fill="#2E7D32" className="font-black">15</text>
              
              {/* Arrow */}
              <path d="M 110 54 L 134 54" stroke="#3F51B5" strokeWidth="1.2" markerEnd="url(#arrow-chain)" />

              {/* Node 25 */}
              <rect x="140" y="45" width="35" height="18" rx="2" fill="#FCFBF8" stroke="#2E7D32" strokeWidth="1" />
              <text x="157.5" y="57" textAnchor="middle" fill="#2E7D32" className="font-black">25</text>

              {/* Arrow */}
              <path d="M 175 54 L 199 54" stroke="#3F51B5" strokeWidth="1.2" markerEnd="url(#arrow-chain)" />

              {/* null */}
              <rect x="205" y="45" width="40" height="18" rx="2" fill="#F4F1EA" stroke="#DDD7CC" strokeWidth="0.5" />
              <text x="225" y="57" textAnchor="middle" fill="#666666" className="italic opacity-60">null</text>
            </g>

            {/* Row 3: Slot 8 */}
            <g className="font-mono text-[9px]">
              <text x="15" y="87" fill="#666666" className="font-bold">Slot [8]:</text>
              
              {/* Node 38 */}
              <rect x="75" y="75" width="35" height="18" rx="2" fill="#FCFBF8" stroke="#2E7D32" strokeWidth="1" />
              <text x="92.5" y="87" textAnchor="middle" fill="#2E7D32" className="font-black">38</text>
              
              {/* Arrow */}
              <path d="M 110 84 L 134 84" stroke="#3F51B5" strokeWidth="1.2" markerEnd="url(#arrow-chain)" />

              {/* null */}
              <rect x="140" y="75" width="40" height="18" rx="2" fill="#F4F1EA" stroke="#DDD7CC" strokeWidth="0.5" />
              <text x="160" y="87" textAnchor="middle" fill="#666666" className="italic opacity-60">null</text>
            </g>

            {/* Teacher explanation pointer */}
            <text x="265" y="65" fill="#666666" className="text-[12px] font-sans" style={{ fontFamily: "'Caveat', cursive" }}>
              "15 and 25 collide at index 5. We store them sequentially."
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
