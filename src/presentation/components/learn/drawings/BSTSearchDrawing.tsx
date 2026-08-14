"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";

interface NodeState {
  val: number;
  x: number;
  y: number;
}

interface Step {
  title: string;
  description: string;
  explanation: string;
  activeNode: number | null; // null represents nullptr/not found state
  pathNodes: number[];
  pathLines: string[];
  showNullBox?: boolean;
  nullBoxCoords?: { x: number; y: number };
}

const SEARCH_60_STEPS: Step[] = [
  {
    title: "Step 1: Start at Root",
    description: "Compare target 60 with the root node value 30.",
    explanation: "Since 60 is greater than 30 (60 > 30), we know it must lie in the right subtree. We discard the entire left subtree and move right.",
    activeNode: 30,
    pathNodes: [30],
    pathLines: [],
  },
  {
    title: "Step 2: Move to Right Child",
    description: "Compare target 60 with the node value 50.",
    explanation: "We arrive at 50. Since 60 is greater than 50 (60 > 50), we must go right again. We discard 50's left child and move right.",
    activeNode: 50,
    pathNodes: [30, 50],
    pathLines: ["30-50"],
  },
  {
    title: "Step 3: Target Found!",
    description: "Compare target 60 with node value 60.",
    explanation: "We arrive at 60. Since 60 matches our target (60 == 60), we stop. The search is successful!",
    activeNode: 60,
    pathNodes: [30, 50, 60],
    pathLines: ["30-50", "50-60"],
  },
];

const SEARCH_25_STEPS: Step[] = [
  {
    title: "Step 1: Start at Root",
    description: "Compare target 25 with the root node value 30.",
    explanation: "Since 25 is less than 30 (25 < 30), we know it must lie in the left subtree. We discard the entire right subtree and move left.",
    activeNode: 30,
    pathNodes: [30],
    pathLines: [],
  },
  {
    title: "Step 2: Move to Left Child",
    description: "Compare target 25 with the node value 20.",
    explanation: "We arrive at 20. Since 25 is greater than 20 (25 > 20), we must go right. We discard 20's left child and move to its right child.",
    activeNode: 20,
    pathNodes: [30, 20],
    pathLines: ["30-20"],
  },
  {
    title: "Step 3: Hit nullptr (Not Found)",
    description: "Move to 20's right child, which is nullptr.",
    explanation: "We try to move to 20's right child but find it is empty (nullptr). This means the number 25 is not in the tree. The search ends unsuccessfully.",
    activeNode: null,
    pathNodes: [30, 20],
    pathLines: ["30-20", "20-nullptr"],
    showNullBox: true,
    nullBoxCoords: { x: 100, y: 130 },
  },
];

export default function BSTSearchDrawing() {
  const [activeTab, setActiveTab] = useState<"search60" | "search25">("search60");
  const [currentStep, setCurrentStep] = useState(0);

  const steps = activeTab === "search60" ? SEARCH_60_STEPS : SEARCH_25_STEPS;
  const targetVal = activeTab === "search60" ? 60 : 25;

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
  };

  const step = steps[currentStep];

  const handleTabChange = (tab: "search60" | "search25") => {
    setActiveTab(tab);
    setCurrentStep(0);
  };

  // Node coordinate configuration
  const nodes: NodeState[] = [
    { val: 30, x: 140, y: 30 },
    { val: 20, x: 80, y: 80 },
    { val: 50, x: 200, y: 80 },
    { val: 10, x: 40, y: 130 },
    { val: 40, x: 160, y: 130 },
    { val: 60, x: 240, y: 130 },
  ];

  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-3xl border border-border bg-card p-5 rounded-sm space-y-4">
        
        {/* Header and Mode Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
          <div>
            <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wide">
              BST Interactive Search Tracer
            </h4>
            <span className="text-[10px] font-mono text-secondary-foreground uppercase tracking-wider">
              Trace: Target = {targetVal} ({activeTab === "search60" ? "Successful" : "Unsuccessful"})
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handleTabChange("search60")}
              className={`px-2.5 py-1 text-[11px] font-mono border transition-all ${
                activeTab === "search60"
                  ? "border-primary bg-primary/5 text-primary font-bold"
                  : "border-transparent text-secondary-foreground hover:bg-secondary/10"
              }`}
            >
              Search(60)
            </button>
            <button
              onClick={() => handleTabChange("search25")}
              className={`px-2.5 py-1 text-[11px] font-mono border transition-all ${
                activeTab === "search25"
                  ? "border-primary bg-primary/5 text-primary font-bold"
                  : "border-transparent text-secondary-foreground hover:bg-secondary/10"
              }`}
            >
              Search(25)
            </button>
          </div>
        </div>

        {/* Controller Bar */}
        <div className="flex items-center justify-between bg-secondary/5 px-3 py-2 rounded-sm border border-border/40">
          <span className="text-xs font-semibold text-foreground">
            {step.title}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={prev}
              disabled={currentStep === 0}
              className="p-1 border border-border rounded-sm hover:bg-secondary/20 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-mono px-2 font-bold min-w-[70px] text-center">
              Step {currentStep + 1} / {steps.length}
            </span>
            <button
              onClick={next}
              disabled={currentStep === steps.length - 1}
              className="p-1 border border-border rounded-sm hover:bg-secondary/20 disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={reset}
              className="p-1 ml-1 border border-border rounded-sm hover:bg-secondary/20"
              title="Restart trace"
            >
              <RefreshCw size={12} />
            </button>
          </div>
        </div>

        {/* Visual Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          
          {/* Left: Step Explanations */}
          <div className="md:col-span-2 space-y-3 font-sans text-xs">
            <div className="border-l-2 border-primary pl-2.5">
              <h5 className="font-extrabold text-foreground uppercase tracking-wider text-[11px]">
                {step.description}
              </h5>
            </div>
            
            <div className="bg-secondary/5 border border-dashed border-border p-3 rounded-sm leading-relaxed" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
              <span className="font-bold text-foreground block mb-1">Teacher's Explanation:</span>
              "{step.explanation}"
            </div>

            <div className="text-[10px] font-mono text-secondary-foreground space-y-1 bg-secondary/10 p-2 rounded-sm">
              <div className="flex justify-between">
                <span>Target Element:</span>
                <span className="font-bold text-primary">{targetVal}</span>
              </div>
              <div className="flex justify-between">
                <span>Comparison:</span>
                <span className="font-bold">
                  {step.activeNode !== null 
                    ? `${targetVal} ${targetVal === step.activeNode ? "==" : targetVal < step.activeNode ? "<" : ">"} ${step.activeNode}`
                    : "Hit nullptr!"}
                </span>
              </div>
            </div>
          </div>

          {/* Right: SVG BST Tree Representation */}
          <div className="md:col-span-3 border border-border rounded-sm bg-secondary/5 flex items-center justify-center p-4 min-h-[220px]">
            <svg width="280" height="180" className="overflow-visible font-mono text-[11px] font-bold">
              
              {/* Lines / Connections */}
              {/* 30 -> 20 */}
              <line 
                x1="140" y1="30" x2="80" y2="80" 
                stroke={step.pathLines.includes("30-20") ? "#3F51B5" : "currentColor"} 
                strokeWidth={step.pathLines.includes("30-20") ? "2.5" : "1.5"} 
                className={step.pathLines.includes("30-20") ? "" : "text-border"} 
              />
              {/* 30 -> 50 */}
              <line 
                x1="140" y1="30" x2="200" y2="80" 
                stroke={step.pathLines.includes("30-50") ? "#3F51B5" : "currentColor"} 
                strokeWidth={step.pathLines.includes("30-50") ? "2.5" : "1.5"} 
                className={step.pathLines.includes("30-50") ? "" : "text-border"} 
              />
              {/* 20 -> 10 */}
              <line 
                x1="80" y1="80" x2="40" y2="130" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                className="text-border" 
              />
              {/* 20 -> nullptr (only for search 25 step 3) */}
              {step.showNullBox && (
                <line 
                  x1="80" y1="80" x2="100" y2="130" 
                  stroke="#C0392B" 
                  strokeWidth="2.5" 
                  strokeDasharray="3,3"
                />
              )}
              {/* 50 -> 40 */}
              <line 
                x1="200" y1="80" x2="160" y2="130" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                className="text-border" 
              />
              {/* 50 -> 60 */}
              <line 
                x1="200" y1="80" x2="240" y2="130" 
                stroke={step.pathLines.includes("50-60") ? "#3F51B5" : "currentColor"} 
                strokeWidth={step.pathLines.includes("50-60") ? "2.5" : "1.5"} 
                className={step.pathLines.includes("50-60") ? "" : "text-border"} 
              />

              {/* Render nullptr Box if applicable */}
              {step.showNullBox && step.nullBoxCoords && (
                <g>
                  <rect 
                    x={step.nullBoxCoords.x - 22} 
                    y={step.nullBoxCoords.y - 12} 
                    width="44" 
                    height="24" 
                    style={{ fill: "#C0392B" }} 
                    rx="3"
                  />
                  <text 
                    x={step.nullBoxCoords.x} 
                    y={step.nullBoxCoords.y + 4} 
                    textAnchor="middle" 
                    style={{ fill: "#FFFFFF" }} 
                    className="text-[9px] font-mono font-bold"
                  >
                    nullptr
                  </text>
                </g>
              )}

              {/* Render Nodes */}
              {nodes.map((n) => {
                const isActive = step.activeNode === n.val;
                const isVisited = step.pathNodes.includes(n.val) && !isActive;
                
                let fill = "#3F51B5"; // Standard Indigo
                let stroke = "#3F51B5";
                let textFill = "#FFFFFF";
                let strokeWidth = "1.5";

                if (isActive) {
                  // Active search node is highlighted in orange/warning color
                  fill = "#D97706";
                  stroke = "#D97706";
                  textFill = "#FFFFFF";
                  
                  // If it's a match, highlight green!
                  if (n.val === targetVal) {
                    fill = "#2E7D32";
                    stroke = "#2E7D32";
                  }
                } else if (isVisited) {
                  // Visited path nodes are highlighted in indigo
                  fill = "#3F51B5";
                  stroke = "#3F51B5";
                  textFill = "#FFFFFF";
                } else {
                  // Standard unvisited nodes are outlined
                  fill = "#FCFBF8"; // Warm background surface
                  stroke = "#DDD7CC"; // Soft border color
                  textFill = "#232323"; // Dark text color
                }

                return (
                  <g key={n.val}>
                    <circle 
                      cx={n.x} 
                      cy={n.y} 
                      r="15" 
                      style={{ fill: fill, stroke: stroke }} 
                      strokeWidth={strokeWidth} 
                    />
                    <text 
                      x={n.x} 
                      y={n.y + 4} 
                      textAnchor="middle" 
                      style={{ fill: textFill }} 
                      className="font-mono font-bold"
                    >
                      {n.val}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

        </div>

      </div>
    </div>
  );
}
