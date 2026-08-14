"use client";

import React from "react";

export default function UnbalancedThreeNodesDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-xl border border-[#DDD7CC] bg-[#FCFBF8] p-6 rounded-sm flex flex-col items-center shadow-sm">
        <span className="text-[10px] uppercase font-bold text-[#232323] tracking-wider mb-4">
          Visual Preview: Balancing via Rotation
        </span>
        
        <svg width="380" height="170" className="overflow-visible font-mono text-[10px] font-bold">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#3F51B5" />
            </marker>
          </defs>

          {/* Left Tree: Unbalanced */}
          <g>
            {/* Lines */}
            <line x1="70" y1="35" x2="45" y2="80" stroke="#DDD7CC" strokeWidth="2" />
            <line x1="45" y1="80" x2="20" y2="125" stroke="#DDD7CC" strokeWidth="2" />
            
            {/* Nodes */}
            <circle cx="70" cy="35" r="14" style={{ fill: "#C0392B", stroke: "#C0392B" }} strokeWidth="1.5" />
            <text x="70" y="39" textAnchor="middle" style={{ fill: "#FFFFFF", fontSize: "10px" }}>30</text>
            
            <circle cx="45" cy="80" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} strokeWidth="1.5" />
            <text x="45" y="84" textAnchor="middle" style={{ fill: "#FFFFFF", fontSize: "10px" }}>20</text>

            <circle cx="20" cy="125" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} strokeWidth="1.5" />
            <text x="20" y="129" textAnchor="middle" style={{ fill: "#FFFFFF", fontSize: "10px" }}>10</text>

            {/* Labels */}
            <text x="70" y="16" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px", fill: "#C0392B", fontWeight: "bold" }}>
              BF = 2 (Unbalanced)
            </text>
            <text x="5" y="148" style={{ fontFamily: "'Caveat', cursive", fontSize: "11px", fill: "#666666" }}>
              Leans too left
            </text>
          </g>

          {/* Transition Arrow in Middle */}
          <g>
            <path d="M 105,80 L 155,80" stroke="#3F51B5" strokeWidth="2.5" fill="none" markerEnd="url(#arrow)" />
            
            {/* Cursive Annotations */}
            <text x="130" y="55" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px", fill: "#3F51B5", fontWeight: "bold" }}>
              Rotation
            </text>
            <text x="130" y="105" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "11px", fill: "#666666" }}>
              We will make it balance
            </text>
            <text x="130" y="120" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "11px", fill: "#666666" }}>
              by doing rotation!
            </text>
            <text x="130" y="140" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "10px", fill: "#2E7D32", fontWeight: "bold" }}>
              (Learn in next chapter)
            </text>
          </g>

          {/* Right Tree: Balanced */}
          <g>
            {/* Lines */}
            <line x1="240" y1="50" x2="205" y2="95" stroke="#DDD7CC" strokeWidth="2" />
            <line x1="240" y1="50" x2="275" y2="95" stroke="#DDD7CC" strokeWidth="2" />
            
            {/* Nodes */}
            <circle cx="240" cy="50" r="14" style={{ fill: "#2E7D32", stroke: "#2E7D32" }} strokeWidth="1.5" />
            <text x="240" y="54" textAnchor="middle" style={{ fill: "#FFFFFF", fontSize: "10px" }}>20</text>
            
            <circle cx="205" cy="95" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} strokeWidth="1.5" />
            <text x="205" y="99" textAnchor="middle" style={{ fill: "#FFFFFF", fontSize: "10px" }}>10</text>

            <circle cx="275" cy="95" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} strokeWidth="1.5" />
            <text x="275" y="99" textAnchor="middle" style={{ fill: "#FFFFFF", fontSize: "10px" }}>30</text>

            {/* Labels */}
            <text x="240" y="31" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px", fill: "#2E7D32", fontWeight: "bold" }}>
              BF = 0 (Balanced)
            </text>
            <text x="205" y="120" style={{ fontFamily: "'Caveat', cursive", fontSize: "11px", fill: "#666666" }}>
              Perfect Balance
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
