"use client";

import React from "react";

export default function UnbalancedThreeNodesDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-3xl border border-[#DDD7CC] bg-[#FCFBF8] p-6 rounded-sm flex flex-col items-center shadow-sm">
        <span className="text-[10px] uppercase font-bold text-[#232323] tracking-wider mb-4">
          Visual Preview: Balancing a Larger Tree via Rotation
        </span>
        
        <svg width="500" height="230" className="overflow-visible font-mono text-[10px] font-bold">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#3F51B5" />
            </marker>
          </defs>

          {/* Left Tree: Unbalanced */}
          <g>
            {/* Lines */}
            <line x1="110" y1="35" x2="70" y2="80" stroke="#DDD7CC" strokeWidth="1.5" />
            <line x1="110" y1="35" x2="150" y2="80" stroke="#DDD7CC" strokeWidth="1.5" />
            <line x1="70" y1="80" x2="40" y2="125" stroke="#DDD7CC" strokeWidth="1.5" />
            <line x1="70" y1="80" x2="95" y2="125" stroke="#DDD7CC" strokeWidth="1.5" />
            <line x1="40" y1="125" x2="20" y2="170" stroke="#DDD7CC" strokeWidth="1.5" />
            
            {/* Nodes */}
            {/* Node 30 - Unbalanced */}
            <circle cx="110" cy="35" r="14" style={{ fill: "#C0392B", stroke: "#C0392B" }} strokeWidth="1.5" />
            <text x="110" y="39" textAnchor="middle" style={{ fill: "#FFFFFF", fontSize: "10px" }}>30</text>
            
            {/* Node 20 */}
            <circle cx="70" cy="80" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} strokeWidth="1.5" />
            <text x="70" y="84" textAnchor="middle" style={{ fill: "#FFFFFF", fontSize: "10px" }}>20</text>

            {/* Node 40 */}
            <circle cx="150" cy="80" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} strokeWidth="1.5" />
            <text x="150" y="84" textAnchor="middle" style={{ fill: "#FFFFFF", fontSize: "10px" }}>40</text>

            {/* Node 10 */}
            <circle cx="40" cy="125" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} strokeWidth="1.5" />
            <text x="40" y="129" textAnchor="middle" style={{ fill: "#FFFFFF", fontSize: "10px" }}>10</text>

            {/* Node 25 */}
            <circle cx="95" cy="125" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} strokeWidth="1.5" />
            <text x="95" y="129" textAnchor="middle" style={{ fill: "#FFFFFF", fontSize: "10px" }}>25</text>

            {/* Node 5 */}
            <circle cx="20" cy="170" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} strokeWidth="1.5" />
            <text x="20" y="174" textAnchor="middle" style={{ fill: "#FFFFFF", fontSize: "10px" }}>5</text>

            {/* Labels & Heights */}
            <text x="110" y="16" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px", fill: "#C0392B", fontWeight: "bold" }}>
              BF = 3 - 1 = 2 (Unbalanced!)
            </text>
            <text x="20" y="198" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "11px", fill: "#666666" }}>
              Newly inserted 5
            </text>
          </g>

          {/* Transition Arrow in Middle */}
          <g>
            <path d="M 195,100 L 290,100" stroke="#3F51B5" strokeWidth="2.5" fill="none" markerEnd="url(#arrow)" />
            
            {/* Cursive Annotations */}
            <text x="242" y="75" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px", fill: "#3F51B5", fontWeight: "bold" }}>
              Right Rotation
            </text>
            <text x="242" y="90" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "11px", fill: "#3F51B5" }}>
              at Node 30
            </text>
            <text x="242" y="125" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "11px", fill: "#666666" }}>
              Pull 20 up,
            </text>
            <text x="242" y="140" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "11px", fill: "#666666" }}>
              push 30 down
            </text>
            <text x="242" y="165" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "10px", fill: "#2E7D32", fontWeight: "bold" }}>
              (Balanced!)
            </text>
          </g>

          {/* Right Tree: Balanced */}
          <g>
            {/* Lines */}
            <line x1="410" y1="35" x2="370" y2="80" stroke="#DDD7CC" strokeWidth="1.5" />
            <line x1="410" y1="35" x2="450" y2="80" stroke="#DDD7CC" strokeWidth="1.5" />
            <line x1="370" y1="80" x2="340" y2="125" stroke="#DDD7CC" strokeWidth="1.5" />
            <line x1="450" y1="80" x2="425" y2="125" stroke="#DDD7CC" strokeWidth="1.5" />
            <line x1="450" y1="80" x2="475" y2="125" stroke="#DDD7CC" strokeWidth="1.5" />
            
            {/* Nodes */}
            {/* Node 20 - Balanced Root */}
            <circle cx="410" cy="35" r="14" style={{ fill: "#2E7D32", stroke: "#2E7D32" }} strokeWidth="1.5" />
            <text x="410" y="39" textAnchor="middle" style={{ fill: "#FFFFFF", fontSize: "10px" }}>20</text>
            
            {/* Node 10 */}
            <circle cx="370" cy="80" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} strokeWidth="1.5" />
            <text x="370" y="84" textAnchor="middle" style={{ fill: "#FFFFFF", fontSize: "10px" }}>10</text>

            {/* Node 30 */}
            <circle cx="450" cy="80" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} strokeWidth="1.5" />
            <text x="450" y="84" textAnchor="middle" style={{ fill: "#FFFFFF", fontSize: "10px" }}>30</text>

            {/* Node 5 */}
            <circle cx="340" cy="125" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} strokeWidth="1.5" />
            <text x="340" y="129" textAnchor="middle" style={{ fill: "#FFFFFF", fontSize: "10px" }}>5</text>

            {/* Node 25 */}
            <circle cx="425" cy="125" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} strokeWidth="1.5" />
            <text x="425" y="129" textAnchor="middle" style={{ fill: "#FFFFFF", fontSize: "10px" }}>25</text>

            {/* Node 40 */}
            <circle cx="475" cy="125" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} strokeWidth="1.5" />
            <text x="475" y="129" textAnchor="middle" style={{ fill: "#FFFFFF", fontSize: "10px" }}>40</text>

            {/* Labels */}
            <text x="410" y="16" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px", fill: "#2E7D32", fontWeight: "bold" }}>
              BF = 2 - 2 = 0 (Balanced)
            </text>
            <text x="410" y="198" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "11px", fill: "#666666" }}>
              Every node's BF is now -1, 0, or +1
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
