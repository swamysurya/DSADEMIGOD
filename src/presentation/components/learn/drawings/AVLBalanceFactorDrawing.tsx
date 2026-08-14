"use client";

import React, { useState } from "react";

interface NodeBFState {
  val: number;
  x: number;
  y: number;
  leftHeightText: string;
  rightHeightText: string;
  calculation: string;
  explanation: string;
  resultBF: number;
  resultHeight: number;
}

const NODES_DATA: NodeBFState[] = [
  {
    val: 50,
    x: 160,
    y: 40,
    leftHeightText: "Height of Left Subtree (Node 30) = 2",
    rightHeightText: "Height of Right Subtree (Node 70) = 0",
    calculation: "BF = Height(Left) - Height(Right)\nBF = 2 - 0 = 2",
    explanation: "Node 50's left subtree has height 2 and its right subtree has height 0. The difference is 2. Since 2 is outside the allowed range of [-1, 0, +1], Node 50 is UNBALANCED and needs to be balanced!",
    resultBF: 2,
    resultHeight: 3,
  },
  {
    val: 30,
    x: 100,
    y: 90,
    leftHeightText: "Height of Left Subtree (Node 20) = 1",
    rightHeightText: "Height of Right Subtree (Node 40) = 1",
    calculation: "BF = Height(Left) - Height(Right)\nBF = 1 - 1 = 0",
    explanation: "Node 30's left subtree has height 1 and its right subtree has height 1. The difference is 0. Since 0 is inside the allowed range, Node 30 is perfectly balanced.",
    resultBF: 0,
    resultHeight: 2,
  },
  {
    val: 70,
    x: 220,
    y: 90,
    leftHeightText: "Height of Left Subtree (nullptr) = -1",
    rightHeightText: "Height of Right Subtree (nullptr) = -1",
    calculation: "BF = Height(Left) - Height(Right)\nBF = -1 - (-1) = 0",
    explanation: "Node 70 is a leaf node. Both subtrees are empty (height -1). The difference is 0. Node 70 is perfectly balanced.",
    resultBF: 0,
    resultHeight: 0,
  },
  {
    val: 20,
    x: 60,
    y: 140,
    leftHeightText: "Height of Left Subtree (Node 10) = 0",
    rightHeightText: "Height of Right Subtree (nullptr) = -1",
    calculation: "BF = Height(Left) - Height(Right)\nBF = 0 - (-1) = 1",
    explanation: "Node 20 has a leaf node 10 on the left (height 0) and no child on the right (height -1). The difference is +1. Since 1 is inside the allowed range, Node 20 is balanced.",
    resultBF: 1,
    resultHeight: 1,
  },
  {
    val: 40,
    x: 140,
    y: 140,
    leftHeightText: "Height of Left Subtree (nullptr) = -1",
    rightHeightText: "Height of Right Subtree (Node 45) = 0",
    calculation: "BF = Height(Left) - Height(Right)\nBF = -1 - 0 = -1",
    explanation: "Node 40 has no child on the left (height -1) and a leaf node 45 on the right (height 0). The difference is -1. Since -1 is inside the allowed range, Node 40 is balanced.",
    resultBF: -1,
    resultHeight: 1,
  },
  {
    val: 10,
    x: 30,
    y: 190,
    leftHeightText: "Height of Left Subtree (nullptr) = -1",
    rightHeightText: "Height of Right Subtree (nullptr) = -1",
    calculation: "BF = Height(Left) - Height(Right)\nBF = -1 - (-1) = 0",
    explanation: "Node 10 is a leaf node. Both subtrees are empty (height -1). The difference is 0. Node 10 is perfectly balanced.",
    resultBF: 0,
    resultHeight: 0,
  },
  {
    val: 45,
    x: 170,
    y: 190,
    leftHeightText: "Height of Left Subtree (nullptr) = -1",
    rightHeightText: "Height of Right Subtree (nullptr) = -1",
    calculation: "BF = Height(Left) - Height(Right)\nBF = -1 - (-1) = 0",
    explanation: "Node 45 is a leaf node. Both subtrees are empty (height -1). The difference is 0. Node 45 is perfectly balanced.",
    resultBF: 0,
    resultHeight: 0,
  },
];

export default function AVLBalanceFactorDrawing() {
  const [selectedNodeVal, setSelectedNodeVal] = useState<number>(50);
  const [activeTab, setActiveTab] = useState<"left-heavy" | "balanced" | "right-heavy">("left-heavy");

  const activeNode = NODES_DATA.find((n) => n.val === selectedNodeVal) || NODES_DATA[0];

  return (
    <div className="w-full my-8 select-none flex flex-col items-center space-y-10">
      
      {/* 1. Calculator Card */}
      <div className="w-full max-w-3xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-5 shadow-sm">
        
        {/* Header */}
        <div>
          <h4 className="text-sm font-extrabold text-[#232323] uppercase tracking-wide">
            Interactive Balance Factor Calculator
          </h4>
          <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "15px" }}>
            "Click on any node in the tree below to inspect how we calculate its subtree heights and Balance Factor step-by-step."
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          
          {/* Left Column: Interactive Subtree SVG */}
          <div className="md:col-span-3 border border-[#DDD7CC]/60 rounded-sm bg-[#F4F1EA]/30 flex items-center justify-center p-4 min-h-[270px]">
            <svg width="340" height="250" className="overflow-visible font-mono text-[11px] font-bold">
              
              {/* Lines */}
              {/* 50 -> 30 */}
              <line x1="160" y1="40" x2="100" y2="90" stroke="#DDD7CC" strokeWidth="1.5" />
              {/* 50 -> 70 */}
              <line x1="160" y1="40" x2="220" y2="90" stroke="#DDD7CC" strokeWidth="1.5" />
              {/* 30 -> 20 */}
              <line x1="100" y1="90" x2="60" y2="140" stroke="#DDD7CC" strokeWidth="1.5" />
              {/* 30 -> 40 */}
              <line x1="100" y1="90" x2="140" y2="140" stroke="#DDD7CC" strokeWidth="1.5" />
              {/* 20 -> 10 */}
              <line x1="60" y1="140" x2="30" y2="190" stroke="#DDD7CC" strokeWidth="1.5" />
              {/* 40 -> 45 */}
              <line x1="140" y1="140" x2="170" y2="190" stroke="#DDD7CC" strokeWidth="1.5" />

              {/* Render Nodes */}
              {NODES_DATA.map((n) => {
                const isSelected = selectedNodeVal === n.val;
                const isUnbalanced = Math.abs(n.resultBF) > 1;
                
                let fill = "#3F51B5";
                let stroke = "#3F51B5";
                let textFill = "#FFFFFF";

                if (isSelected) {
                  fill = "#D97706"; // Warning orange highlight
                  stroke = "#D97706";
                } else if (isUnbalanced) {
                  fill = "#C0392B"; // Error red for unbalanced node (e.g. Node 50)
                  stroke = "#C0392B";
                } else {
                  fill = "#3F51B5"; // Classic Indigo
                  stroke = "#3F51B5";
                }

                return (
                  <g 
                    key={n.val} 
                    className="cursor-pointer group"
                    onClick={() => setSelectedNodeVal(n.val)}
                  >
                    {/* Hover glow */}
                    <circle 
                      cx={n.x} 
                      cy={n.y} 
                      r="19" 
                      style={{ fill: "transparent", stroke: isSelected ? "#D97706" : isUnbalanced ? "#C0392B" : "#3F51B5" }}
                      className="opacity-0 group-hover:opacity-40 transition-opacity" 
                      strokeWidth="2.5"
                    />
                    <circle 
                      cx={n.x} 
                      cy={n.y} 
                      r="14" 
                      style={{ fill: fill, stroke: stroke }} 
                      strokeWidth="1.5" 
                      className="transition-colors duration-200"
                    />
                    <text 
                      x={n.x} 
                      y={n.y + 4} 
                      textAnchor="middle" 
                      style={{ fill: textFill }} 
                      className="font-mono font-bold select-none"
                    >
                      {n.val}
                    </text>
                  </g>
                );
              })}

              {/* Handwritten annotations for Balance Factors (showing LH - RH = BF) */}
              {NODES_DATA.map((n) => {
                let equation = "";
                let labelY = n.y - 20;
                let labelX = n.x;
                let anchor: "start" | "end" | "middle" | "inherit" | undefined = "middle";

                if (n.val === 50) {
                  equation = "BF = 2 - 0 = 2 (Unbalanced!)";
                  labelY = n.y - 20;
                } else if (n.val === 30) {
                  equation = "BF = 1 - 1 = 0";
                  labelY = n.y - 18;
                } else if (n.val === 70) {
                  equation = "BF = -1 - (-1) = 0";
                  labelY = n.y - 18;
                } else if (n.val === 20) {
                  equation = "BF = 0 - (-1) = 1";
                  labelY = n.y - 18;
                } else if (n.val === 40) {
                  equation = "BF = -1 - 0 = -1";
                  labelY = n.y - 18;
                } else if (n.val === 10) {
                  equation = "BF = -1 - (-1) = 0";
                  labelY = n.y + 28;
                } else if (n.val === 45) {
                  equation = "BF = -1 - (-1) = 0";
                  labelY = n.y + 28;
                }

                const isUnbalanced = Math.abs(n.resultBF) > 1;

                return (
                  <text
                    key={`ann-${n.val}`}
                    x={labelX}
                    y={labelY}
                    textAnchor={anchor}
                    style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: n.val === 50 ? "13px" : "11px",
                      fill: isUnbalanced ? "#C0392B" : "#666666",
                      fontWeight: n.val === 50 ? "bold" : "normal"
                    }}
                    className="select-none"
                  >
                    {equation}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Right Column: Step-by-Step Subtree Calculation details */}
          <div className="md:col-span-2 space-y-4">
            {/* Active Node Detail Card */}
            <div className="border border-[#DDD7CC] bg-[#FCFBF8] p-4 rounded-sm space-y-3">
              <div>
                <span className="text-[9px] uppercase font-extrabold tracking-wider text-[#3F51B5] block">
                  Target Node
                </span>
                <h5 className="text-sm font-bold font-serif text-[#232323] flex items-baseline gap-2">
                  Node {activeNode.val}
                  <span className="text-xs font-mono text-[#666666] font-normal">
                    (Height = {activeNode.resultHeight})
                  </span>
                </h5>
              </div>

              {/* Subtree Heights */}
              <div className="space-y-1 text-xs text-[#666666] font-sans">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3F51B5]" />
                  <span>{activeNode.leftHeightText}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#666666]" />
                  <span>{activeNode.rightHeightText}</span>
                </div>
              </div>

              {/* Math Formula Centered block */}
              <div className="bg-secondary/5 border-y border-[#DDD7CC]/50 py-2 text-center select-all">
                <pre className="text-xs font-mono text-[#3F51B5] font-bold whitespace-pre-line leading-relaxed">
                  {activeNode.calculation}
                </pre>
              </div>

              {/* Teacher description */}
              <p className="text-[12px] text-secondary-foreground leading-relaxed font-serif pt-1">
                {activeNode.explanation}
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* 2. Visual Balance Factor Reference Guide (Restructured and Enlarged!) */}
      <div className="w-full max-w-3xl space-y-6 text-left">
        <div>
          <h4 className="text-sm font-extrabold text-[#232323] uppercase tracking-wide">
            Visual Balance Factor Guide
          </h4>
          <p className="text-xs text-[#666666] font-serif mt-1">
            Toggle between the three balanced states to see how the tree structure maps to its Balance Factor values:
          </p>
        </div>

        {/* Tab Selection Buttons */}
        <div className="flex border border-[#DDD7CC] rounded-sm bg-[#F4F1EA]/50 overflow-hidden select-none">
          <button
            onClick={() => setActiveTab("left-heavy")}
            className={`flex-1 py-2.5 px-4 text-center text-xs font-bold uppercase tracking-wider transition-colors outline-none cursor-pointer ${
              activeTab === "left-heavy"
                ? "bg-[#3F51B5] text-[#FCFBF8]"
                : "text-[#666666] hover:bg-[#F4F1EA] hover:text-[#232323]"
            }`}
          >
            Left-Heavy (BF = +1)
          </button>
          <button
            onClick={() => setActiveTab("balanced")}
            className={`flex-1 py-2.5 px-4 text-center text-xs font-bold uppercase tracking-wider transition-colors outline-none cursor-pointer ${
              activeTab === "balanced"
                ? "bg-[#3F51B5] text-[#FCFBF8]"
                : "text-[#666666] hover:bg-[#F4F1EA] hover:text-[#232323]"
            }`}
          >
            Perfect Balance (BF = 0)
          </button>
          <button
            onClick={() => setActiveTab("right-heavy")}
            className={`flex-1 py-2.5 px-4 text-center text-xs font-bold uppercase tracking-wider transition-colors outline-none cursor-pointer ${
              activeTab === "right-heavy"
                ? "bg-[#3F51B5] text-[#FCFBF8]"
                : "text-[#666666] hover:bg-[#F4F1EA] hover:text-[#232323]"
            }`}
          >
            Right-Heavy (BF = -1)
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
            
            {/* Left side: Large visual tree diagram */}
            <div className="md:col-span-3 border border-[#DDD7CC]/60 rounded-sm bg-[#F4F1EA]/20 flex items-center justify-center p-6 min-h-[200px]">
              {activeTab === "left-heavy" && (
                <svg width="260" height="170" className="overflow-visible font-mono text-[10px] font-bold">
                  {/* Lines */}
                  <line x1="130" y1="35" x2="70" y2="90" stroke="#DDD7CC" strokeWidth="2" />
                  <line x1="130" y1="35" x2="190" y2="90" stroke="#DDD7CC" strokeWidth="2" />
                  <line x1="70" y1="90" x2="30" y2="145" stroke="#DDD7CC" strokeWidth="2" />
                  
                  {/* Nodes */}
                  <circle cx="130" cy="35" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} />
                  <circle cx="70" cy="90" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} />
                  <circle cx="190" cy="90" r="14" style={{ fill: "#DDD7CC", stroke: "#DDD7CC" }} />
                  <circle cx="30" cy="145" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} />

                  {/* Node Labels */}
                  <text x="130" y="39" textAnchor="middle" style={{ fill: "#FFFFFF" }}>A</text>
                  <text x="70" y="94" textAnchor="middle" style={{ fill: "#FFFFFF" }}>B</text>
                  <text x="190" y="94" textAnchor="middle" style={{ fill: "#666666" }}>C</text>
                  <text x="30" y="149" textAnchor="middle" style={{ fill: "#FFFFFF" }}>D</text>

                  {/* Subtree Height annotations */}
                  <text x="25" y="60" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px", fill: "#D97706" }}>Left Subtree Height (LH) = 1</text>
                  <text x="200" y="60" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px", fill: "#666666" }}>Right Height (RH) = 0</text>
                  
                  {/* Root equation */}
                  <text x="130" y="18" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px", fill: "#D97706", fontWeight: "bold" }}>
                    BF = LH - RH = 1 - 0 = +1
                  </text>
                </svg>
              )}

              {activeTab === "balanced" && (
                <svg width="260" height="170" className="overflow-visible font-mono text-[10px] font-bold">
                  {/* Lines */}
                  <line x1="130" y1="45" x2="70" y2="110" stroke="#DDD7CC" strokeWidth="2" />
                  <line x1="130" y1="45" x2="190" y2="110" stroke="#DDD7CC" strokeWidth="2" />
                  
                  {/* Nodes */}
                  <circle cx="130" cy="45" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} />
                  <circle cx="70" cy="110" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} />
                  <circle cx="190" cy="110" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} />

                  {/* Node Labels */}
                  <text x="130" y="49" textAnchor="middle" style={{ fill: "#FFFFFF" }}>A</text>
                  <text x="70" y="114" textAnchor="middle" style={{ fill: "#FFFFFF" }}>B</text>
                  <text x="190" y="114" textAnchor="middle" style={{ fill: "#FFFFFF" }}>C</text>

                  {/* Subtree Height annotations */}
                  <text x="25" y="70" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px", fill: "#2E7D32" }}>Left Subtree Height (LH) = 0</text>
                  <text x="200" y="70" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px", fill: "#2E7D32" }}>Right Height (RH) = 0</text>
                  
                  {/* Root equation */}
                  <text x="130" y="25" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px", fill: "#2E7D32", fontWeight: "bold" }}>
                    BF = LH - RH = 0 - 0 = 0
                  </text>
                </svg>
              )}

              {activeTab === "right-heavy" && (
                <svg width="260" height="170" className="overflow-visible font-mono text-[10px] font-bold">
                  {/* Lines */}
                  <line x1="130" y1="35" x2="70" y2="90" stroke="#DDD7CC" strokeWidth="2" />
                  <line x1="130" y1="35" x2="190" y2="90" stroke="#DDD7CC" strokeWidth="2" />
                  <line x1="190" y1="90" x2="230" y2="145" stroke="#DDD7CC" strokeWidth="2" />
                  
                  {/* Nodes */}
                  <circle cx="130" cy="35" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} />
                  <circle cx="70" cy="90" r="14" style={{ fill: "#DDD7CC", stroke: "#DDD7CC" }} />
                  <circle cx="190" cy="90" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} />
                  <circle cx="230" cy="145" r="14" style={{ fill: "#3F51B5", stroke: "#3F51B5" }} />

                  {/* Node Labels */}
                  <text x="130" y="39" textAnchor="middle" style={{ fill: "#FFFFFF" }}>A</text>
                  <text x="70" y="94" textAnchor="middle" style={{ fill: "#666666" }}>B</text>
                  <text x="190" y="94" textAnchor="middle" style={{ fill: "#FFFFFF" }}>C</text>
                  <text x="230" y="149" textAnchor="middle" style={{ fill: "#FFFFFF" }}>D</text>

                  {/* Subtree Height annotations */}
                  <text x="25" y="60" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px", fill: "#666666" }}>Left Subtree Height (LH) = 0</text>
                  <text x="200" y="60" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px", fill: "#C0392B" }}>Right Height (RH) = 1</text>
                  
                  {/* Root equation */}
                  <text x="130" y="18" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px", fill: "#C0392B", fontWeight: "bold" }}>
                    BF = LH - RH = 0 - 1 = -1
                  </text>
                </svg>
              )}
            </div>

            {/* Right side: Detailed explanation details */}
            <div className="md:col-span-2 space-y-4 font-serif text-sm">
              {activeTab === "left-heavy" && (
                <div className="space-y-3">
                  <h5 className="text-base font-extrabold text-[#232323] font-serif">
                    Left-Heavy State (BF = +1)
                  </h5>
                  <p className="text-secondary-foreground leading-relaxed text-[13px]">
                    The left subtree is taller than the right subtree because node B has child D, whereas C is a leaf node. 
                  </p>
                  <div className="bg-[#D97706]/5 border-l-2 border-[#D97706] p-2.5 rounded-sm">
                    <span className="text-[10px] uppercase font-bold text-[#D97706] tracking-wider block mb-1">
                      Allowed Range Check
                    </span>
                    <p className="text-secondary-foreground text-[12px] leading-relaxed">
                      Because the Balance Factor is <strong>+1</strong>, it stays within the allowed range of <strong>[-1, 0, +1]</strong>. This node is <strong>balanced</strong>!
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "balanced" && (
                <div className="space-y-3">
                  <h5 className="text-base font-extrabold text-[#232323] font-serif">
                    Symmetric Balance (BF = 0)
                  </h5>
                  <p className="text-secondary-foreground leading-relaxed text-[13px]">
                    Both subtrees have the exact same height (0) since B and C are both leaf nodes. 
                  </p>
                  <div className="bg-[#2E7D32]/5 border-l-2 border-[#2E7D32] p-2.5 rounded-sm">
                    <span className="text-[10px] uppercase font-bold text-[#2E7D32] tracking-wider block mb-1">
                      Allowed Range Check
                    </span>
                    <p className="text-secondary-foreground text-[12px] leading-relaxed">
                      A Balance Factor of <strong>0</strong> represents perfect symmetry. It is inside the allowed range of <strong>[-1, 0, +1]</strong>, meaning it is <strong>balanced</strong>!
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "right-heavy" && (
                <div className="space-y-3">
                  <h5 className="text-base font-extrabold text-[#232323] font-serif">
                    Right-Heavy State (BF = -1)
                  </h5>
                  <p className="text-secondary-foreground leading-relaxed text-[13px]">
                    The right subtree is taller than the left subtree because node C has child D, whereas B is a leaf node.
                  </p>
                  <div className="bg-[#C0392B]/5 border-l-2 border-[#C0392B] p-2.5 rounded-sm">
                    <span className="text-[10px] uppercase font-bold text-[#C0392B] tracking-wider block mb-1">
                      Allowed Range Check
                    </span>
                    <p className="text-secondary-foreground text-[12px] leading-relaxed">
                      Because the Balance Factor is <strong>-1</strong>, it stays within the allowed range of <strong>[-1, 0, +1]</strong>. This node is <strong>balanced</strong>!
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>



      </div>

    </div>
  );
}
