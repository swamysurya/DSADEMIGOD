"use client";

import React from "react";

export default function WhyHashingDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-4 shadow-sm">
        <div>
          <h4 className="text-xs font-extrabold text-[#232323] uppercase tracking-wide">
            The Concept of Hashing
          </h4>
          <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Mapping keys from a huge input space into a tiny index in memory."
          </p>
        </div>

        {/* SVG Whiteboard diagram */}
        <div className="w-full p-2 border border-dashed border-[#DDD7CC] bg-[#F4F1EA]/30 rounded-sm flex justify-center">
          <svg className="w-full max-w-[520px] h-auto" viewBox="0 0 520 280" fill="none">
            <defs>
              <marker
                id="arrow"
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

            {/* 1. Key Space Container */}
            <rect x="10" y="10" width="130" height="260" rx="3" stroke="#DDD7CC" strokeWidth="1" strokeDasharray="3 3" />
            <text x="75" y="25" textAnchor="middle" fill="#232323" className="font-sans font-bold text-[10px] uppercase">1. Key Space</text>
            <text x="75" y="38" textAnchor="middle" fill="#666666" className="text-[9px]" style={{ fontFamily: "'Caveat', cursive" }}>"All potential keys"</text>

            {/* Key boxes */}
            <g className="font-mono text-[9px]">
              {/* Key 1 */}
              <rect x="25" y="48" width="100" height="22" rx="2" fill="#FCFBF8" stroke="#DDD7CC" strokeWidth="1" />
              <text x="75" y="62" textAnchor="middle" fill="#232323" className="font-bold">10,000,000</text>

              {/* Key 2 */}
              <rect x="25" y="80" width="100" height="22" rx="2" fill="#FCFBF8" stroke="#DDD7CC" strokeWidth="1" />
              <text x="75" y="94" textAnchor="middle" fill="#232323" className="font-bold">12</text>

              {/* Key 3 */}
              <rect x="25" y="112" width="100" height="22" rx="2" fill="#FCFBF8" stroke="#DDD7CC" strokeWidth="1" />
              <text x="75" y="126" textAnchor="middle" fill="#232323" className="font-bold">93</text>

              {/* Key 4 */}
              <rect x="25" y="144" width="100" height="22" rx="2" fill="#FCFBF8" stroke="#DDD7CC" strokeWidth="1" />
              <text x="75" y="158" textAnchor="middle" fill="#232323" className="font-bold">104</text>

              {/* Key 5 */}
              <rect x="25" y="176" width="100" height="22" rx="2" fill="#FCFBF8" stroke="#DDD7CC" strokeWidth="1" />
              <text x="75" y="190" textAnchor="middle" fill="#232323" className="font-bold">5</text>

              {/* Key 6 */}
              <rect x="25" y="208" width="100" height="22" rx="2" fill="#FCFBF8" stroke="#DDD7CC" strokeWidth="1" />
              <text x="75" y="222" textAnchor="middle" fill="#232323" className="font-bold">87</text>
            </g>

            {/* 2. Mapping Rule Funnel (Center) */}
            <rect x="180" y="105" width="130" height="55" rx="3" fill="#3F51B5" />
            <text x="245" y="123" textAnchor="middle" fill="#FFFFFF" className="font-sans font-bold text-[8px] uppercase tracking-wider">Our Rule</text>
            <text x="245" y="141" textAnchor="middle" fill="#FFFFFF" className="font-mono font-black text-[11px]">x % 10</text>
            <text x="245" y="180" textAnchor="middle" fill="#3F51B5" className="text-[12px]" style={{ fontFamily: "'Caveat', cursive" }}>"Computes index instantly"</text>

            {/* Input lines pointing to Hash Function */}
            <path d="M 125 59 L 180 120" stroke="#DDD7CC" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M 125 91 L 180 125" stroke="#DDD7CC" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M 125 123 L 180 132" stroke="#DDD7CC" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M 125 155 L 180 138" stroke="#DDD7CC" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M 125 187 L 180 143" stroke="#DDD7CC" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M 125 219 L 180 148" stroke="#DDD7CC" strokeWidth="1" strokeDasharray="2 2" />

            {/* Output arrows from Hash Function to Hash Table */}
            {/* to Slot 0 */}
            <path d="M 310 120 L 354 58" stroke="#3F51B5" strokeWidth="1.2" markerEnd="url(#arrow)" />
            {/* to Slot 2 */}
            <path d="M 310 126 L 354 96" stroke="#3F51B5" strokeWidth="1.2" markerEnd="url(#arrow)" />
            {/* to Slot 3 */}
            <path d="M 310 132 L 354 116" stroke="#3F51B5" strokeWidth="1.2" markerEnd="url(#arrow)" />
            {/* to Slot 4 */}
            <path d="M 310 136 L 354 135" stroke="#3F51B5" strokeWidth="1.2" markerEnd="url(#arrow)" />
            {/* to Slot 5 */}
            <path d="M 310 140 L 354 153" stroke="#3F51B5" strokeWidth="1.2" markerEnd="url(#arrow)" />
            {/* to Slot 7 */}
            <path d="M 310 146 L 354 191" stroke="#3F51B5" strokeWidth="1.2" markerEnd="url(#arrow)" />

            {/* 3. Hash Table Container */}
            <rect x="360" y="10" width="150" height="260" rx="3" stroke="#DDD7CC" strokeWidth="1" strokeDasharray="3 3" />
            <text x="435" y="25" textAnchor="middle" fill="#232323" className="font-sans font-bold text-[10px] uppercase">2. Hash Table</text>
            <text x="435" y="38" textAnchor="middle" fill="#2E7D32" className="text-[9px]" style={{ fontFamily: "'Caveat', cursive" }}>"Small array in memory"</text>

            {/* Hash Table Slots */}
            <g className="font-mono text-[8px]">
              {/* Slot 0 */}
              <rect x="370" y="48" width="130" height="17" fill="#FCFBF8" stroke="#2E7D32" strokeWidth="0.8" />
              <text x="375" y="60" fill="#2E7D32" className="font-bold">[0]</text>
              <text x="495" y="60" textAnchor="end" fill="#232323" className="font-black">10,000,000</text>

              {/* Slot 1 */}
              <rect x="370" y="67" width="130" height="17" fill="#F4F1EA" stroke="#DDD7CC" strokeWidth="0.5" opacity="0.6" />
              <text x="375" y="79" fill="#666666" className="opacity-60">[1]</text>
              <text x="495" y="79" textAnchor="end" fill="#666666" className="opacity-40 italic">empty</text>

              {/* Slot 2 */}
              <rect x="370" y="86" width="130" height="17" fill="#FCFBF8" stroke="#2E7D32" strokeWidth="0.8" />
              <text x="375" y="98" fill="#2E7D32" className="font-bold">[2]</text>
              <text x="495" y="98" textAnchor="end" fill="#232323" className="font-black">12</text>

              {/* Slot 3 */}
              <rect x="370" y="105" width="130" height="17" fill="#FCFBF8" stroke="#2E7D32" strokeWidth="0.8" />
              <text x="375" y="117" fill="#2E7D32" className="font-bold">[3]</text>
              <text x="495" y="117" textAnchor="end" fill="#232323" className="font-black">93</text>

              {/* Slot 4 */}
              <rect x="370" y="124" width="130" height="17" fill="#FCFBF8" stroke="#2E7D32" strokeWidth="0.8" />
              <text x="375" y="136" fill="#2E7D32" className="font-bold">[4]</text>
              <text x="495" y="136" textAnchor="end" fill="#232323" className="font-black">104</text>

              {/* Slot 5 */}
              <rect x="370" y="143" width="130" height="17" fill="#FCFBF8" stroke="#2E7D32" strokeWidth="0.8" />
              <text x="375" y="155" fill="#2E7D32" className="font-bold">[5]</text>
              <text x="495" y="155" textAnchor="end" fill="#232323" className="font-black">5</text>

              {/* Slot 6 */}
              <rect x="370" y="162" width="130" height="17" fill="#F4F1EA" stroke="#DDD7CC" strokeWidth="0.5" opacity="0.6" />
              <text x="375" y="174" fill="#666666" className="opacity-60">[6]</text>
              <text x="495" y="174" textAnchor="end" fill="#666666" className="opacity-40 italic">empty</text>

              {/* Slot 7 */}
              <rect x="370" y="181" width="130" height="17" fill="#FCFBF8" stroke="#2E7D32" strokeWidth="0.8" />
              <text x="375" y="193" fill="#2E7D32" className="font-bold">[7]</text>
              <text x="495" y="193" textAnchor="end" fill="#232323" className="font-black">87</text>

              {/* Slot 8 */}
              <rect x="370" y="200" width="130" height="17" fill="#F4F1EA" stroke="#DDD7CC" strokeWidth="0.5" opacity="0.6" />
              <text x="375" y="212" fill="#666666" className="opacity-60">[8]</text>
              <text x="495" y="212" textAnchor="end" fill="#666666" className="opacity-40 italic">empty</text>

              {/* Slot 9 */}
              <rect x="370" y="219" width="130" height="17" fill="#F4F1EA" stroke="#DDD7CC" strokeWidth="0.5" opacity="0.6" />
              <text x="375" y="231" fill="#666666" className="opacity-60">[9]</text>
              <text x="495" y="231" textAnchor="end" fill="#666666" className="opacity-40 italic">empty</text>

              {/* Dots at bottom */}
              <text x="435" y="255" textAnchor="middle" fill="#666666" className="font-bold font-sans text-xs">...</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
