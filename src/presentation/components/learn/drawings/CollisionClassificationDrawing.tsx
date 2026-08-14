"use client";

import React from "react";

export default function CollisionClassificationDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-4 shadow-sm">
        <div>
          <h4 className="text-xs font-extrabold text-[#232323] uppercase tracking-wide">
            Collision Resolution Tree
          </h4>
          <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "The two primary branches of storing colliding elements."
          </p>
        </div>

        {/* SVG Classification Tree */}
        <div className="w-full p-4 border border-dashed border-[#DDD7CC] bg-[#F4F1EA]/30 rounded-sm flex justify-center">
          <svg className="w-full max-w-[500px] h-auto" viewBox="0 0 500 190" fill="none">
            
            {/* Tree Connectors (Lines) */}
            <g stroke="#3F51B5" strokeWidth="1.5">
              {/* Root to Left/Right Branches */}
              <line x1="250" y1="40" x2="120" y2="70" />
              <line x1="250" y1="40" x2="375" y2="70" />

              {/* Left Branch to Chaining */}
              <line x1="120" y1="100" x2="120" y2="130" />

              {/* Right Branch to Probing methods */}
              <line x1="375" y1="100" x2="280" y2="130" />
              <line x1="375" y1="100" x2="375" y2="130" />
              <line x1="375" y1="100" x2="470" y2="130" />
            </g>

            {/* Tree Nodes */}
            
            {/* Level 1: Root */}
            <g>
              <rect x="175" y="10" width="150" height="30" rx="3" fill="#3F51B5" stroke="#3F51B5" strokeWidth="1" />
              <text x="250" y="28" textAnchor="middle" fill="#FFFFFF" className="font-sans font-bold text-[10px] uppercase tracking-wider">Collision Resolution</text>
            </g>

            {/* Level 2: Branches */}
            {/* Left Branch */}
            <g>
              <rect x="45" y="70" width="150" height="30" rx="3" fill="#FCFBF8" stroke="#DDD7CC" strokeWidth="1" />
              <text x="120" y="88" textAnchor="middle" fill="#232323" className="font-sans font-bold text-[9px] uppercase tracking-wide">Open Hashing</text>
            </g>

            {/* Right Branch */}
            <g>
              <rect x="270" y="70" width="210" height="30" rx="3" fill="#FCFBF8" stroke="#DDD7CC" strokeWidth="1" />
              <text x="375" y="88" textAnchor="middle" fill="#232323" className="font-sans font-bold text-[9px] uppercase tracking-wide">Closed Hashing (Open Addressing)</text>
            </g>

            {/* Level 3: Leaves */}
            {/* Separate Chaining */}
            <g>
              <rect x="45" y="130" width="150" height="30" rx="2" fill="#FCFBF8" stroke="#2E7D32" strokeWidth="1" />
              <text x="120" y="148" textAnchor="middle" fill="#2E7D32" className="font-sans font-extrabold text-[9px] uppercase tracking-wide">Separate Chaining</text>
            </g>

            {/* Linear Probing */}
            <g>
              <rect x="240" y="130" width="80" height="30" rx="2" fill="#FCFBF8" stroke="#3F51B5" strokeWidth="1" />
              <text x="280" y="148" textAnchor="middle" fill="#3F51B5" className="font-sans font-bold text-[8px] uppercase tracking-wide">Linear</text>
            </g>

            {/* Quadratic Probing */}
            <g>
              <rect x="335" y="130" width="80" height="30" rx="2" fill="#FCFBF8" stroke="#3F51B5" strokeWidth="1" />
              <text x="375" y="148" textAnchor="middle" fill="#3F51B5" className="font-sans font-bold text-[8px] uppercase tracking-wide">Quadratic</text>
            </g>

            {/* Double Hashing */}
            <g>
              <rect x="430" y="130" width="80" height="30" rx="2" fill="#FCFBF8" stroke="#3F51B5" strokeWidth="1" />
              <text x="470" y="148" textAnchor="middle" fill="#3F51B5" className="font-sans font-bold text-[8px] uppercase tracking-wide">Double Hash</text>
            </g>

          </svg>
        </div>
      </div>
    </div>
  );
}
