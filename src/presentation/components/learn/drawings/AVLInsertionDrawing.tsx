"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";

interface TreeNode {
  val: number;
  x: number;
  y: number;
  bf?: string;
  isUnbalanced?: boolean;
}

interface TreeConnection {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  dashed?: boolean;
}

interface StepData {
  title: string;
  description: string;
  explanation: string;
  nodes: TreeNode[];
  connections: TreeConnection[];
}

const STEPS: StepData[] = [
  {
    title: "Step 1: Insert 40",
    description: "First insertion is straightforward. 40 becomes the root node.",
    explanation: "Since there is only one node, the height of both subtrees is 0. Balance Factor = 0 - 0 = 0. The tree is balanced.",
    nodes: [{ val: 40, x: 150, y: 45, bf: "0" }],
    connections: [],
  },
  {
    title: "Step 2: Insert 20",
    description: "20 is less than 40, so it goes to the left child of 40.",
    explanation: "Balance Factor of 40 = Height(Left) - Height(Right) = 1 - 0 = +1. 20 is a leaf, so its BF is 0. The tree remains balanced.",
    nodes: [
      { val: 40, x: 150, y: 45, bf: "+1" },
      { val: 20, x: 90, y: 100, bf: "0" },
    ],
    connections: [{ fromX: 150, fromY: 45, toX: 90, toY: 100 }],
  },
  {
    title: "Step 3a: Insert 10 (Imbalance detected!)",
    description: "10 goes to the left of 20. But this makes the tree heavy on the left.",
    explanation: "Going upward, node 40's Left Height is 2, Right Height is 0. Balance Factor of 40 = 2 - 0 = +2! Since 40 has BF = +2 and the insertion path was Left-Left (LL), we must perform a Right Rotation around 40.",
    nodes: [
      { val: 40, x: 150, y: 45, bf: "+2", isUnbalanced: true },
      { val: 20, x: 90, y: 100, bf: "+1" },
      { val: 10, x: 40, y: 155, bf: "0" },
    ],
    connections: [
      { fromX: 150, fromY: 45, toX: 90, toY: 100 },
      { fromX: 90, fromY: 100, toX: 40, toY: 155 },
    ],
  },
  {
    title: "Step 3b: Right Rotation around 40",
    description: "We rotate the tree to the right around the unbalanced node 40. Node 20 becomes the new root.",
    explanation: "Node 20 rises to the root, pushing 40 down to its right child, while 10 remains 20's left child. All balance factors reset to 0. Beautifully balanced!",
    nodes: [
      { val: 20, x: 150, y: 45, bf: "0" },
      { val: 10, x: 90, y: 100, bf: "0" },
      { val: 40, x: 210, y: 100, bf: "0" },
    ],
    connections: [
      { fromX: 150, fromY: 45, toX: 90, toY: 100 },
      { fromX: 150, fromY: 45, toX: 210, toY: 100 },
    ],
  },
  {
    title: "Step 4: Insert 25",
    description: "25 is compared to root 20 (go right), then 40 (go left). It becomes the left child of 40.",
    explanation: "We update balance factors going upward: 40 becomes +1, 20 becomes -1. All nodes are within the allowed [-1, 0, +1] range. The tree is balanced.",
    nodes: [
      { val: 20, x: 150, y: 45, bf: "-1" },
      { val: 10, x: 90, y: 100, bf: "0" },
      { val: 40, x: 210, y: 100, bf: "+1" },
      { val: 25, x: 170, y: 155, bf: "0" },
    ],
    connections: [
      { fromX: 150, fromY: 45, toX: 90, toY: 100 },
      { fromX: 150, fromY: 45, toX: 210, toY: 100 },
      { fromX: 210, fromY: 100, toX: 170, toY: 155 },
    ],
  },
  {
    title: "Step 5a: Insert 30 (Imbalance detected!)",
    description: "30 is compared to 20 (right), 40 (left), 25 (right). It is inserted to the right of 25.",
    explanation: "Let's check balance factors: 25 is -1, 40's Left Height is 2 (nodes 25,30) and Right Height is 0. BF of 40 = +2! The path from unbalanced node 40 to inserted node 30 is Left-Right (LR). We must do an LR Double Rotation.",
    nodes: [
      { val: 20, x: 120, y: 45, bf: "-2" },
      { val: 10, x: 70, y: 100, bf: "0" },
      { val: 40, x: 180, y: 100, bf: "+2", isUnbalanced: true },
      { val: 25, x: 145, y: 155, bf: "-1" },
      { val: 30, x: 165, y: 210, bf: "0" },
    ],
    connections: [
      { fromX: 120, fromY: 45, toX: 70, toY: 100 },
      { fromX: 120, fromY: 45, toX: 180, toY: 100 },
      { fromX: 180, fromY: 100, toX: 145, toY: 155 },
      { fromX: 145, fromY: 155, toX: 165, toY: 210 },
    ],
  },
  {
    title: "Step 5b: LR Double Rotation around 40",
    description: "We rotate Left around 25, then Right around 40. Conceptually, the middle node 30 is pulled directly to the top of this subtree.",
    explanation: "30 becomes the root of this right subtree, with 25 on its left and 40 on its right. The main root 20's right child is now 30. Balance is restored!",
    nodes: [
      { val: 20, x: 120, y: 45, bf: "-1" },
      { val: 10, x: 70, y: 100, bf: "0" },
      { val: 30, x: 180, y: 100, bf: "0" },
      { val: 25, x: 145, y: 155, bf: "0" },
      { val: 40, x: 215, y: 155, bf: "0" },
    ],
    connections: [
      { fromX: 120, fromY: 45, toX: 70, toY: 100 },
      { fromX: 120, fromY: 45, toX: 180, toY: 100 },
      { fromX: 180, fromY: 100, toX: 145, toY: 155 },
      { fromX: 180, fromY: 100, toX: 215, toY: 155 },
    ],
  },
  {
    title: "Step 6a: Insert 22 (Root unbalanced!)",
    description: "22 goes: right of 20, left of 30, left of 25. It is inserted as 25's left child.",
    explanation: "Let's check BFs going up: 25 is +1, 30 is +1, but root 20's Left Height is 1 (node 10) and Right Height is 3 (nodes 30,25,22). BF of 20 = 1 - 3 = -2! Path from 20 is Right-Left (RL). We need an RL Double Rotation.",
    nodes: [
      { val: 20, x: 120, y: 45, bf: "-2", isUnbalanced: true },
      { val: 10, x: 70, y: 100, bf: "0" },
      { val: 30, x: 180, y: 100, bf: "+1" },
      { val: 25, x: 145, y: 155, bf: "+1" },
      { val: 22, x: 120, y: 210, bf: "0" },
      { val: 40, x: 215, y: 155, bf: "0" },
    ],
    connections: [
      { fromX: 120, fromY: 45, toX: 70, toY: 100 },
      { fromX: 120, fromY: 45, toX: 180, toY: 100 },
      { fromX: 180, fromY: 100, toX: 145, toY: 155 },
      { fromX: 180, fromY: 100, toX: 215, toY: 155 },
      { fromX: 145, fromY: 155, toX: 120, toY: 210 },
    ],
  },
  {
    title: "Step 6b: RL Double Rotation around 20",
    description: "First rotate Right around 30, then rotate Left around root 20. The middle node 25 becomes the new root of the entire tree.",
    explanation: "25 rises to the top root. 20 becomes 25's left child, and 30 becomes 25's right child. 22 (originally 25's left child) is reconnected to 20's right side, preserving BST order. All nodes are balanced!",
    nodes: [
      { val: 25, x: 150, y: 45, bf: "0" },
      { val: 20, x: 95, y: 100, bf: "0" },
      { val: 10, x: 50, y: 155, bf: "0" },
      { val: 22, x: 120, y: 155, bf: "0" },
      { val: 30, x: 205, y: 100, bf: "-1" },
      { val: 40, x: 245, y: 155, bf: "0" },
    ],
    connections: [
      { fromX: 150, fromY: 45, toX: 95, toY: 100 },
      { fromX: 150, fromY: 45, toX: 205, toY: 100 },
      { fromX: 95, fromY: 100, toX: 50, toY: 155 },
      { fromX: 95, fromY: 100, toX: 120, toY: 155 },
      { fromX: 205, fromY: 100, toX: 245, toY: 155 },
    ],
  },
  {
    title: "Step 7a: Insert 50 (Imbalance at 30)",
    description: "50 is compared to 25 (right), 30 (right), 40 (right). It is inserted to the right of 40.",
    explanation: "Let's update BFs: 40 is -1, but 30's Left Height is 0 and Right Height is 2. BF of 30 = 0 - 2 = -2! The path from 30 to 50 is Right-Right (RR). We do a Left Rotation around 30.",
    nodes: [
      { val: 25, x: 150, y: 45, bf: "-1" },
      { val: 20, x: 95, y: 100, bf: "0" },
      { val: 10, x: 50, y: 155, bf: "0" },
      { val: 22, x: 120, y: 155, bf: "0" },
      { val: 30, x: 205, y: 100, bf: "-2", isUnbalanced: true },
      { val: 40, x: 245, y: 155, bf: "-1" },
      { val: 50, x: 275, y: 210, bf: "0" },
    ],
    connections: [
      { fromX: 150, fromY: 45, toX: 95, toY: 100 },
      { fromX: 150, fromY: 45, toX: 205, toY: 100 },
      { fromX: 95, fromY: 100, toX: 50, toY: 155 },
      { fromX: 95, fromY: 100, toX: 120, toY: 155 },
      { fromX: 205, fromY: 100, toX: 245, toY: 155 },
      { fromX: 245, fromY: 155, toX: 275, toY: 210 },
    ],
  },
  {
    title: "Step 7b: Left Rotation around 30",
    description: "We rotate Left around 30. 40 rises to replace 30, and 30 becomes 40's left child.",
    explanation: "40 becomes 25's right child, with 30 on its left and 50 on its right. All balance factors become balanced. Perfect!",
    nodes: [
      { val: 25, x: 150, y: 45, bf: "0" },
      { val: 20, x: 95, y: 100, bf: "0" },
      { val: 10, x: 50, y: 155, bf: "0" },
      { val: 22, x: 120, y: 155, bf: "0" },
      { val: 40, x: 205, y: 100, bf: "0" },
      { val: 30, x: 175, y: 155, bf: "0" },
      { val: 50, x: 235, y: 155, bf: "0" },
    ],
    connections: [
      { fromX: 150, fromY: 45, toX: 95, toY: 100 },
      { fromX: 150, fromY: 45, toX: 205, toY: 100 },
      { fromX: 95, fromY: 100, toX: 50, toY: 155 },
      { fromX: 95, fromY: 100, toX: 120, toY: 155 },
      { fromX: 205, fromY: 100, toX: 175, toY: 155 },
      { fromX: 205, fromY: 100, toX: 235, toY: 155 },
    ],
  },
  {
    title: "Step 8: Insert 42 (Final balanced tree)",
    description: "42 is compared to 25 (right), 40 (right), 50 (left). It is inserted as the left child of 50.",
    explanation: "Checking balance factors going up: 50 becomes +1, 40 becomes -1, 25 becomes -1. All nodes remain balanced! The final height of the tree is 3, storing 8 keys. Contrast this with the skewed BST height of 8!",
    nodes: [
      { val: 25, x: 150, y: 45, bf: "-1" },
      { val: 20, x: 95, y: 100, bf: "0" },
      { val: 10, x: 50, y: 155, bf: "0" },
      { val: 22, x: 120, y: 155, bf: "0" },
      { val: 40, x: 205, y: 100, bf: "-1" },
      { val: 30, x: 175, y: 155, bf: "0" },
      { val: 50, x: 235, y: 155, bf: "+1" },
      { val: 42, x: 215, y: 210, bf: "0" },
    ],
    connections: [
      { fromX: 150, fromY: 45, toX: 95, toY: 100 },
      { fromX: 150, fromY: 45, toX: 205, toY: 100 },
      { fromX: 95, fromY: 100, toX: 50, toY: 155 },
      { fromX: 95, fromY: 100, toX: 120, toY: 155 },
      { fromX: 205, fromY: 100, toX: 175, toY: 155 },
      { fromX: 205, fromY: 100, toX: 235, toY: 155 },
      { fromX: 235, fromY: 155, toX: 215, toY: 210 },
    ],
  },
];

export default function AVLInsertionDrawing() {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    if (currentStep < STEPS.length - 1) {
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

  const step = STEPS[currentStep];

  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-3xl border border-border bg-card p-5 rounded-sm space-y-4">
        
        {/* Header and Controller */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
          <div>
            <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wide">
              AVL Tree Dynamic Construction
            </h4>
            <span className="text-[10px] font-mono text-secondary-foreground uppercase tracking-wider">
              Inserting: 40, 20, 10, 25, 30, 22, 50, 42
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={prev}
              disabled={currentStep === 0}
              className="p-1 border border-border rounded-sm hover:bg-secondary/20 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-mono px-2 font-bold min-w-[70px] text-center">
              Step {currentStep + 1} / {STEPS.length}
            </span>
            <button
              onClick={next}
              disabled={currentStep === STEPS.length - 1}
              className="p-1 border border-border rounded-sm hover:bg-secondary/20 disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={reset}
              className="p-1 ml-1 border border-border rounded-sm hover:bg-secondary/20"
              title="Restart construction"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          
          {/* Explanation Text */}
          <div className="md:col-span-2 space-y-3 font-sans text-xs">
            <div className="border-l-2 border-primary pl-2.5">
              <h5 className="font-extrabold text-foreground uppercase tracking-wider text-[11px]">
                {step.title}
              </h5>
              <p className="text-secondary-foreground leading-relaxed mt-1">
                {step.description}
              </p>
            </div>
            
            <div className="bg-secondary/5 border border-dashed border-border p-3 rounded-sm leading-relaxed" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
              <span className="font-bold text-foreground block mb-1">Teacher's Explanation:</span>
              "{step.explanation}"
            </div>
          </div>

          {/* SVG Tree Visualization */}
          <div className="md:col-span-3 border border-border rounded-sm bg-secondary/5 flex items-center justify-center p-3 relative min-h-[260px]">
            <svg width="320" height="250" className="overflow-visible font-mono text-[10px] font-bold">
              {/* Lines / Connections */}
              {step.connections.map((c, idx) => (
                <line
                  key={idx}
                  x1={c.fromX}
                  y1={c.fromY}
                  x2={c.toX}
                  y2={c.toY}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray={c.dashed ? "3,3" : undefined}
                  className="text-border"
                />
              ))}

              {/* Nodes */}
              {step.nodes.map((n) => {
                let fill = "#3F51B5"; // Balanced blue
                if (n.isUnbalanced) {
                  fill = "#C0392B"; // Unbalanced red
                }

                return (
                  <g key={n.val}>
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r="14"
                      style={{ fill: fill, stroke: fill }}
                      strokeWidth="1.5"
                    />
                    <text
                      x={n.x}
                      y={n.y + 4}
                      textAnchor="middle"
                      style={{ fill: "#FFFFFF" }}
                      className="font-mono font-bold"
                    >
                      {n.val}
                    </text>
                    {n.bf !== undefined && (
                      <text
                        x={n.x}
                        y={n.y - 18}
                        textAnchor="middle"
                        fill="currentColor"
                        className="text-[9px] text-secondary-foreground font-medium"
                      >
                        BF: {n.bf}
                      </text>
                    )}
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
