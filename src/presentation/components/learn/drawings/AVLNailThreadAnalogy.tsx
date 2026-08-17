"use client";

import React from "react";

export default function AVLNailThreadAnalogy() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-3xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-4 shadow-sm font-serif">
        <h5 className="text-xs font-extrabold text-[#232323] uppercase tracking-wider">
          The Nail, Thread, and Gravity Analogy
        </h5>
        <p className="text-[13px] text-secondary-foreground leading-relaxed">
          Think of tree nodes as **weighted beads** connected by a **flexible thread**. When a tree is skewed, it is like holding one end of the thread (Node 30) while the other beads pull it down under gravity. To balance it, we pull the string around the center bead (Node 20), making it hang directly from the nail:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FCFBF8] p-5 border border-[#DDD7CC] rounded-sm shadow-sm">
          {/* Left Side: Unbalanced */}
          <div className="flex flex-col items-center border border-[#DDD7CC]/50 rounded p-4 bg-[#F4F1EA]/10">
            <span className="text-[11px] uppercase font-extrabold text-[#C0392B] tracking-wider mb-3">
              Unbalanced state: Heavy Left (LL)
            </span>
            <svg width="280" height="200" className="overflow-visible font-mono text-[10px] font-bold">
              <line x1="0" y1="40" x2="280" y2="40" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="0" y1="100" x2="280" y2="100" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="0" y1="160" x2="280" y2="160" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
              <path d="M 140,30 L 90,90 L 40,150" stroke="#3F51B5" strokeWidth="2.5" strokeDasharray="4,3" fill="none" />
              <g>
                <line x1="140" y1="10" x2="140" y2="30" stroke="#DDD7CC" strokeWidth="4" />
                <line x1="140" y1="10" x2="140" y2="30" stroke="#4A5568" strokeWidth="3" />
                <circle cx="140" cy="10" r="5" fill="#2D3748" />
                <circle cx="138" cy="8" r="1.5" fill="#718096" />
              </g>
              <circle cx="140" cy="30" r="14" fill="#C0392B" stroke="#C0392B" strokeWidth="1.5" />
              <text x="140" y="34" textAnchor="middle" fill="#FFFFFF" className="font-mono font-bold text-[10px]">30</text>
              <circle cx="90" cy="90" r="14" fill="#3F51B5" stroke="#3F51B5" strokeWidth="1.5" />
              <text x="90" y="94" textAnchor="middle" fill="#FFFFFF" className="font-mono font-bold text-[10px]">20</text>
              <circle cx="40" cy="150" r="14" fill="#3F51B5" stroke="#3F51B5" strokeWidth="1.5" />
              <text x="40" y="154" textAnchor="middle" fill="#FFFFFF" className="font-mono font-bold text-[10px]">10</text>
              <path d="M 40,170 L 40,185" stroke="#C0392B" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
              <path d="M 90,110 L 90,125" stroke="#C0392B" strokeWidth="1" strokeDasharray="2,2" fill="none" markerEnd="url(#arrow)" />
              <text x="155" y="34" style={{ fontFamily: "'Caveat', cursive", fontSize: "12px", fill: "#C0392B", fontWeight: "bold" }}>Pivot nail at 30</text>
              <text x="50" y="182" style={{ fontFamily: "'Caveat', cursive", fontSize: "11px", fill: "#C0392B" }}>Gravity pulls Left!</text>
              <path d="M 120,60 Q 110,80 110,90" stroke="#D97706" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />
              <text x="118" y="75" style={{ fontFamily: "'Caveat', cursive", fontSize: "11px", fill: "#D97706" }}>Pull 20 to the top</text>
            </svg>
          </div>

          {/* Right Side: Balanced */}
          <div className="flex flex-col items-center border border-[#DDD7CC]/50 rounded p-4 bg-[#F4F1EA]/10">
            <span className="text-[11px] uppercase font-extrabold text-[#2E7D32] tracking-wider mb-3">
              Balanced state (After rotation)
            </span>
            <svg width="280" height="200" className="overflow-visible font-mono text-[10px] font-bold">
              <line x1="0" y1="40" x2="280" y2="40" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="0" y1="100" x2="280" y2="100" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="0" y1="160" x2="280" y2="160" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
              <path d="M 80,90 L 140,30 L 200,90" stroke="#3F51B5" strokeWidth="2.5" fill="none" />
              <g>
                <line x1="140" y1="10" x2="140" y2="30" stroke="#DDD7CC" strokeWidth="4" />
                <line x1="140" y1="10" x2="140" y2="30" stroke="#4A5568" strokeWidth="3" />
                <circle cx="140" cy="10" r="5" fill="#2D3748" />
                <circle cx="138" cy="8" r="1.5" fill="#718096" />
              </g>
              <circle cx="140" cy="30" r="14" fill="#2E7D32" stroke="#2E7D32" strokeWidth="1.5" />
              <text x="140" y="34" textAnchor="middle" fill="#FFFFFF" className="font-mono font-bold text-[10px]">20</text>
              <circle cx="80" cy="90" r="14" fill="#3F51B5" stroke="#3F51B5" strokeWidth="1.5" />
              <text x="80" y="94" textAnchor="middle" fill="#FFFFFF" className="font-mono font-bold text-[10px]">10</text>
              <circle cx="200" cy="90" r="14" fill="#3F51B5" stroke="#3F51B5" strokeWidth="1.5" />
              <text x="200" y="94" textAnchor="middle" fill="#FFFFFF" className="font-mono font-bold text-[10px]">30</text>
              <path d="M 80,110 L 80,125" stroke="#666666" strokeWidth="1" fill="none" markerEnd="url(#arrow)" />
              <path d="M 200,110 L 200,125" stroke="#666666" strokeWidth="1" fill="none" markerEnd="url(#arrow)" />
              <text x="155" y="34" style={{ fontFamily: "'Caveat', cursive", fontSize: "12px", fill: "#2E7D32", fontWeight: "bold" }}>Nail pivot is now 20!</text>
              <text x="95" y="125" style={{ fontFamily: "'Caveat', cursive", fontSize: "11px", fill: "#666666" }}>Weights are equal</text>
              <text x="95" y="140" style={{ fontFamily: "'Caveat', cursive", fontSize: "11px", fill: "#2E7D32", fontWeight: "bold" }}>Tree is perfectly balanced!</text>
            </svg>
          </div>
        </div>
      </div>
      {/* SVG Marker Definitions */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#D97706" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
