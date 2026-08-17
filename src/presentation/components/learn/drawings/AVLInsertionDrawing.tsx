"use client";

import React, { useState, useEffect } from "react";
import { RotateCcw, ChevronLeft, ChevronRight, Maximize2, Minimize2, Settings } from "lucide-react";

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
  highlightedLines: number[];
}

export default function AVLInsertionDrawing() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);

  // Prevent background scroll when maximized modal is open
  useEffect(() => {
    if (isMaximized) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMaximized]);

  // C++ AVL Insertion code block showing helper definitions as collapsed stubs
  const insertionCode = [
    "// Helper Definitions (declared helper functions)",
    "class Node { ... };",
    "int getHeightOfNode(Node* node) { ... }",
    "int getBalanceOfNode(Node* node) { ... }",
    "Node* LLRoation(Node* y) { ... }",
    "Node* RRrotation(Node* y) { ... }",
    "Node* LRrotation(Node* root) { ... }",
    "Node* RLrotation(Node* root) { ... }",
    "",
    "// AVL Insertion Function",
    "Node* insert(Node* node, int value) {",
    "    if (node == nullptr) return new Node(value);",
    "    ",
    "    if (value < node->data)",
    "        node->left = insert(node->left, value);",
    "    else if (value > node->data)",
    "        node->right = insert(node->right, value);",
    "    else",
    "        return node;",
    "        ",
    "    node->height = 1 + max(getHeightOfNode(node->left), getHeightOfNode(node->right));",
    "    int balance = getBalanceOfNode(node);",
    "    ",
    "    if (balance > 1 && value < node->left->data)",
    "        return LLRoation(node);",
    "    if (balance < -1 && value > node->right->data)",
    "        return RRrotation(node);",
    "    if (balance > 1 && value > node->left->data)",
    "        return LRrotation(node);",
    "    if (balance < -1 && value < node->right->data)",
    "        return RLrotation(node);",
    "        ",
    "    return node;",
    "}"
  ];

  const stepsData: StepData[] = [
    {
      title: "Step 1: Insert 40",
      description: "First insertion is straightforward. Node 40 is created as the root.",
      explanation: "Since the tree is empty, we hit the base case and allocate a new leaf Node 40. Balance Factor is 0.",
      nodes: [{ val: 40, x: 160, y: 45, bf: "0" }],
      connections: [],
      highlightedLines: [11, 12]
    },
    {
      title: "Step 2: Insert 20",
      description: "20 is less than 40, so it is recursively inserted as the left child of 40.",
      explanation: "Standard BST recursion goes left. After insertion, we backtrack to 40, update its height to 2, and find BF = 1 - 0 = +1. No rotation needed.",
      nodes: [
        { val: 40, x: 160, y: 45, bf: "+1" },
        { val: 20, x: 100, y: 105, bf: "0" },
      ],
      connections: [{ fromX: 160, fromY: 45, toX: 100, toY: 105 }],
      highlightedLines: [14, 15, 21, 22]
    },
    {
      title: "Step 3: Insert 10 (Imbalance Detected)",
      description: "10 goes to the left of 20. This creates a Left-Left line under 40, triggering an imbalance.",
      explanation: "Backtracking to 40, its Left Height is 2 and Right Height is 0. BF of 40 = +2. Since the path is Left-Left, we detect the LL Case.",
      nodes: [
        { val: 40, x: 180, y: 45, bf: "+2", isUnbalanced: true },
        { val: 20, x: 120, y: 105, bf: "+1" },
        { val: 10, x: 60, y: 165, bf: "0" },
      ],
      connections: [
        { fromX: 180, fromY: 45, toX: 120, toY: 105 },
        { fromX: 120, fromY: 105, toX: 60, toY: 165 },
      ],
      highlightedLines: [22, 24]
    },
    {
      title: "Step 4: Right Rotation around 40",
      description: "We execute LLRoation around unbalanced Node 40. Node 20 becomes the new root.",
      explanation: "LLRoation(40) is called. Node 20 is pulled to the root, pushing 40 down to its right. Balance factor resets to 0.",
      nodes: [
        { val: 20, x: 160, y: 45, bf: "0" },
        { val: 10, x: 100, y: 105, bf: "0" },
        { val: 40, x: 220, y: 105, bf: "0" },
      ],
      connections: [
        { fromX: 160, fromY: 45, toX: 100, toY: 105 },
        { fromX: 160, fromY: 45, toX: 220, toY: 105 },
      ],
      highlightedLines: [24, 25]
    },
    {
      title: "Step 5: Insert 25",
      description: "25 is compared to 20 (goes right) and 40 (goes left). It becomes the left child of 40.",
      explanation: "BST insertion places 25 under 40. Backtracking updates heights: 40's BF becomes +1, root 20's BF becomes -1. All balances are safe.",
      nodes: [
        { val: 20, x: 160, y: 45, bf: "-1" },
        { val: 10, x: 100, y: 105, bf: "0" },
        { val: 40, x: 220, y: 105, bf: "+1" },
        { val: 25, x: 180, y: 165, bf: "0" },
      ],
      connections: [
        { fromX: 160, fromY: 45, toX: 100, toY: 105 },
        { fromX: 160, fromY: 45, toX: 220, toY: 105 },
        { fromX: 220, fromY: 105, toX: 180, toY: 165 },
      ],
      highlightedLines: [16, 17, 21, 22]
    },
    {
      title: "Step 6: Insert 30 (Imbalance Detected)",
      description: "30 is inserted as 25's right child. This triggers a Left-Right (LR) imbalance at Node 40.",
      explanation: "Backtracking to 40, its Left Height is 2 and Right Height is 0. BF of 40 is +2. Path is Left-Right, so we detect the LR Case.",
      nodes: [
        { val: 20, x: 130, y: 45, bf: "-2" },
        { val: 10, x: 70, y: 105, bf: "0" },
        { val: 40, x: 190, y: 105, bf: "+2", isUnbalanced: true },
        { val: 25, x: 150, y: 165, bf: "-1" },
        { val: 30, x: 170, y: 225, bf: "0" },
      ],
      connections: [
        { fromX: 130, fromY: 45, toX: 70, toY: 105 },
        { fromX: 130, fromY: 45, toX: 190, toY: 105 },
        { fromX: 190, fromY: 105, toX: 150, toY: 165 },
        { fromX: 150, fromY: 165, toX: 170, toY: 225 },
      ],
      highlightedLines: [22, 28]
    },
    {
      title: "Step 7: LR Rotation - Left Rotate Child",
      description: "We execute the child rotation phase: root->left = RRrotation(root->left);",
      explanation: "Node 25 (left child of 40) is rotated left around Node 30. Node 30 becomes the new left child of 40, converting the zig-zag into a straight LL case.",
      nodes: [
        { val: 20, x: 130, y: 45, bf: "-2" },
        { val: 10, x: 70, y: 105, bf: "0" },
        { val: 40, x: 190, y: 105, bf: "+2", isUnbalanced: true },
        { val: 30, x: 150, y: 165, bf: "+1" },
        { val: 25, x: 130, y: 225, bf: "0" },
      ],
      connections: [
        { fromX: 130, fromY: 45, toX: 70, toY: 105 },
        { fromX: 130, fromY: 45, toX: 190, toY: 105 },
        { fromX: 190, fromY: 105, toX: 150, toY: 165 },
        { fromX: 150, fromY: 165, toX: 130, toY: 225 },
      ],
      highlightedLines: [28]
    },
    {
      title: "Step 8: LR Rotation - Right Rotate Parent",
      description: "We execute the parent rotation phase: root = LLRoation(root);",
      explanation: "Node 40 is rotated right around Node 30. Node 30 becomes the root of this right subtree, resolving the imbalance completely.",
      nodes: [
        { val: 20, x: 130, y: 45, bf: "-1" },
        { val: 10, x: 70, y: 105, bf: "0" },
        { val: 30, x: 190, y: 105, bf: "0" },
        { val: 25, x: 150, y: 165, bf: "0" },
        { val: 40, x: 230, y: 165, bf: "0" },
      ],
      connections: [
        { fromX: 130, fromY: 45, toX: 70, toY: 105 },
        { fromX: 130, fromY: 45, toX: 190, toY: 105 },
        { fromX: 190, fromY: 105, toX: 150, toY: 165 },
        { fromX: 190, fromY: 105, toX: 230, toY: 165 },
      ],
      highlightedLines: [29]
    },
    {
      title: "Step 9: Insert 22 (Imbalance Detected)",
      description: "22 goes under 25. Backtracking up to root Node 20, its Balance Factor becomes -2, triggering an RL imbalance.",
      explanation: "Root 20 has Left Height 1 and Right Height 3. BF is -2. The path is Right-Left, indicating the RL double rotation case.",
      nodes: [
        { val: 20, x: 130, y: 45, bf: "-2", isUnbalanced: true },
        { val: 10, x: 70, y: 105, bf: "0" },
        { val: 30, x: 190, y: 105, bf: "+1" },
        { val: 25, x: 150, y: 165, bf: "+1" },
        { val: 22, x: 120, y: 225, bf: "0" },
        { val: 40, x: 230, y: 165, bf: "0" },
      ],
      connections: [
        { fromX: 130, fromY: 45, toX: 70, toY: 105 },
        { fromX: 130, fromY: 45, toX: 190, toY: 105 },
        { fromX: 190, fromY: 105, toX: 150, toY: 165 },
        { fromX: 190, fromY: 105, toX: 230, toY: 165 },
        { fromX: 150, fromY: 165, toX: 120, toY: 225 },
      ],
      highlightedLines: [22, 30]
    },
    {
      title: "Step 10: RL Rotation - Right Rotate Child",
      description: "We execute the child rotation phase: root->right = LLRoation(root->right);",
      explanation: "Node 30 (right child of root 20) is rotated right around Node 25. Node 25 becomes the new right child of 20, creating a straight RR path.",
      nodes: [
        { val: 20, x: 130, y: 45, bf: "-2", isUnbalanced: true },
        { val: 10, x: 70, y: 105, bf: "0" },
        { val: 25, x: 190, y: 105, bf: "-1" },
        { val: 22, x: 150, y: 165, bf: "0" },
        { val: 30, x: 230, y: 165, bf: "-1" },
        { val: 40, x: 260, y: 225, bf: "0" },
      ],
      connections: [
        { fromX: 130, fromY: 45, toX: 70, toY: 105 },
        { fromX: 130, fromY: 45, toX: 190, toY: 105 },
        { fromX: 190, fromY: 105, toX: 150, toY: 165 },
        { fromX: 190, fromY: 105, toX: 230, toY: 165 },
        { fromX: 230, fromY: 165, toX: 260, toY: 225 },
      ],
      highlightedLines: [30]
    },
    {
      title: "Step 11: RL Rotation - Left Rotate Parent",
      description: "We execute the parent rotation phase: root = RRrotation(root);",
      explanation: "Node 20 is rotated left around Node 25. Node 25 rises to become the root of the entire tree. Node 22 is reconnected to 20's right.",
      nodes: [
        { val: 25, x: 160, y: 45, bf: "0" },
        { val: 20, x: 100, y: 105, bf: "0" },
        { val: 10, x: 50, y: 165, bf: "0" },
        { val: 22, x: 130, y: 165, bf: "0" },
        { val: 30, x: 220, y: 105, bf: "-1" },
        { val: 40, x: 260, y: 165, bf: "0" },
      ],
      connections: [
        { fromX: 160, fromY: 45, toX: 100, toY: 105 },
        { fromX: 160, fromY: 45, toX: 220, toY: 105 },
        { fromX: 100, fromY: 105, toX: 50, toY: 165 },
        { fromX: 100, fromY: 105, toX: 130, toY: 165 },
        { fromX: 220, fromY: 105, toX: 260, toY: 165 },
      ],
      highlightedLines: [31]
    },
    {
      title: "Step 12: Insert 50 (Imbalance Detected)",
      description: "50 is inserted as 40's right child. Backtracking up to Node 30, its BF becomes -2, triggering an RR imbalance.",
      explanation: "Node 30's Left Height is 0 and Right Height is 2. BF is -2. The path is Right-Right, indicating a single Left Rotation.",
      nodes: [
        { val: 25, x: 160, y: 45, bf: "-1" },
        { val: 20, x: 100, y: 105, bf: "0" },
        { val: 10, x: 50, y: 165, bf: "0" },
        { val: 22, x: 130, y: 165, bf: "0" },
        { val: 30, x: 220, y: 105, bf: "-2", isUnbalanced: true },
        { val: 40, x: 260, y: 165, bf: "-1" },
        { val: 50, x: 290, y: 225, bf: "0" },
      ],
      connections: [
        { fromX: 160, fromY: 45, toX: 100, toY: 105 },
        { fromX: 160, fromY: 45, toX: 220, toY: 105 },
        { fromX: 100, fromY: 105, toX: 50, toY: 165 },
        { fromX: 100, fromY: 105, toX: 130, toY: 165 },
        { fromX: 220, fromY: 105, toX: 260, toY: 165 },
        { fromX: 260, fromY: 165, toX: 290, toY: 225 },
      ],
      highlightedLines: [22, 26]
    },
    {
      title: "Step 13: Left Rotation around 30",
      description: "We execute: return RRrotation(node); around Node 30.",
      explanation: "Node 30 is rotated left around Node 40. Node 40 becomes the new right child of root 25, restoring full balance.",
      nodes: [
        { val: 25, x: 160, y: 45, bf: "0" },
        { val: 20, x: 100, y: 105, bf: "0" },
        { val: 10, x: 50, y: 165, bf: "0" },
        { val: 22, x: 130, y: 165, bf: "0" },
        { val: 40, x: 220, y: 105, bf: "0" },
        { val: 30, x: 190, y: 165, bf: "0" },
        { val: 50, x: 250, y: 165, bf: "0" },
      ],
      connections: [
        { fromX: 160, fromY: 45, toX: 100, toY: 105 },
        { fromX: 160, fromY: 45, toX: 220, toY: 105 },
        { fromX: 100, fromY: 105, toX: 50, toY: 165 },
        { fromX: 100, fromY: 105, toX: 130, toY: 165 },
        { fromX: 220, fromY: 105, toX: 190, toY: 165 },
        { fromX: 220, fromY: 105, toX: 250, toY: 165 },
      ],
      highlightedLines: [26, 27]
    },
    {
      title: "Step 14: Insert 42 (Final balanced tree)",
      description: "42 is compared to 25 (right), 40 (right), 50 (left), and inserted as 50's left child.",
      explanation: "All balance factors remain stable after backtracking updates. The tree maintains a height of 3 for 8 keys.",
      nodes: [
        { val: 25, x: 160, y: 45, bf: "-1" },
        { val: 20, x: 100, y: 105, bf: "0" },
        { val: 10, x: 50, y: 165, bf: "0" },
        { val: 22, x: 130, y: 165, bf: "0" },
        { val: 40, x: 220, y: 105, bf: "-1" },
        { val: 30, x: 190, y: 165, bf: "0" },
        { val: 50, x: 250, y: 165, bf: "+1" },
        { val: 42, x: 230, y: 225, bf: "0" },
      ],
      connections: [
        { fromX: 160, fromY: 45, toX: 100, toY: 105 },
        { fromX: 160, fromY: 45, toX: 220, toY: 105 },
        { fromX: 100, fromY: 105, toX: 50, toY: 165 },
        { fromX: 100, fromY: 105, toX: 130, toY: 165 },
        { fromX: 220, fromY: 105, toX: 190, toY: 165 },
        { fromX: 220, fromY: 105, toX: 250, toY: 165 },
        { fromX: 250, fromY: 165, toX: 230, toY: 225 },
      ],
      highlightedLines: [33, 34]
    }
  ];

  const stepData = stepsData[currentStep];

  const handleNext = () => {
    if (currentStep < stepsData.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  const visualizerContent = (
    <div className="w-full flex flex-col gap-4 font-serif flex-1 min-h-0">
      {/* 1. Simulation Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DDD7CC]/50 pb-3 select-none">
        <div>
          <h4 className="text-xs font-extrabold text-[#232323] uppercase tracking-wide">
            AVL Tree Construction Simulator
          </h4>
          <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Step-by-step trace of inserting keys: 40, 20, 10, 25, 30, 22, 50, 42."
          </p>
        </div>
        
        {/* Controls Toolbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1.5 border border-[#DDD7CC] rounded-sm text-[10px] font-bold bg-white text-[#666666] hover:bg-[#F4F1EA] cursor-pointer"
            title={isMaximized ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleReset}
            disabled={currentStep === 0}
            className={`p-1.5 border border-[#DDD7CC] rounded-sm text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 cursor-pointer transition-colors ${
              currentStep === 0
                ? "opacity-40 cursor-not-allowed"
                : "bg-white text-[#666666] hover:bg-[#F4F1EA]"
            }`}
            title="Reset Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`px-2.5 py-1.5 border border-[#DDD7CC] rounded-sm text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 cursor-pointer transition-colors ${
              currentStep === 0
                ? "opacity-40 cursor-not-allowed"
                : "bg-white text-[#232323] hover:bg-[#F4F1EA]"
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Prev
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep === stepsData.length - 1}
            className={`px-2.5 py-1.5 border border-[#3F51B5] rounded-sm text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 cursor-pointer transition-colors ${
              currentStep === stepsData.length - 1
                ? "opacity-40 cursor-not-allowed"
                : "bg-[#3F51B5] text-white hover:bg-[#3F51B5]/90"
            }`}
          >
            Next
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <span className="text-[10px] font-mono font-bold bg-[#F4F1EA] px-2 py-1 border border-[#DDD7CC] rounded-sm text-[#666666] shrink-0">
            {currentStep + 1} / {stepsData.length}
          </span>
        </div>
      </div>

      {/* 2. Main Simulation Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch flex-1 min-h-0">
        
        {/* Left Column: C++ Source Code (spanning 5/12) */}
        <div className="lg:col-span-5 flex flex-col h-full min-h-0 bg-[#FCFBF8] border border-[#DDD7CC] rounded-sm p-4 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#666666] block font-serif">
            C++ Insertion Logic
          </span>
          <pre className="text-[9px] font-mono bg-[#fafafa] p-3 rounded-sm overflow-auto leading-relaxed border border-[#DDD7CC]/50 text-left select-all flex-1 min-h-0">
            {insertionCode.map((line, lIdx) => {
              const isHighlighted = stepData.highlightedLines.includes(lIdx + 1);
              return (
                <div
                  key={lIdx}
                  className={`px-1.5 rounded-sm min-h-[1.1rem] ${
                    isHighlighted
                      ? "bg-[#3F51B5]/15 text-[#3F51B5] font-bold border-l-2 border-[#3F51B5]"
                      : "text-[#4A4A4A]"
                  }`}
                >
                  {line}
                </div>
              );
            })}
          </pre>
        </div>

        {/* Right Column: Visualizer Canvas + Explanation Panel (spanning 7/12) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4 h-full min-h-0">
          
          <div className="flex flex-col sm:flex-row gap-4 items-stretch w-full flex-1 min-h-0">
            {/* SVG Tree Canvas Panel */}
            <div className="flex flex-col flex-1 border border-[#DDD7CC] bg-[#F4F1EA]/10 p-4 rounded-sm items-center justify-start relative min-h-[260px]">
              <div className="w-full flex justify-between items-center mb-2 select-none">
                <span className="text-[11px] font-bold text-[#3F51B5] uppercase tracking-wider font-mono">
                  {stepData.title}
                </span>
                <span className="text-[10px] text-[#666666] font-mono">
                  Step {currentStep + 1} of {stepsData.length}
                </span>
              </div>

              <svg width="320" height="250" className="overflow-visible font-mono text-[10px] font-bold">
                {/* Backdrop grids */}
                <line x1="0" y1="45" x2="320" y2="45" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
                <line x1="0" y1="105" x2="320" y2="105" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
                <line x1="0" y1="165" x2="320" y2="165" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
                <line x1="0" y1="225" x2="320" y2="225" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />

                {/* Connections */}
                {stepData.connections.map((c, idx) => (
                  <line
                    key={idx}
                    x1={c.fromX}
                    y1={c.fromY}
                    x2={c.toX}
                    y2={c.toY}
                    stroke="#3F51B5"
                    strokeWidth={c.dashed ? 1.5 : 2.5}
                    strokeDasharray={c.dashed ? "3,3" : undefined}
                  />
                ))}

                {/* Node Circles */}
                {stepData.nodes.map((node) => (
                  <g key={node.val}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="14"
                      fill={node.isUnbalanced ? "#C0392B" : "#3F51B5"}
                      stroke={node.isUnbalanced ? "#C0392B" : "#3F51B5"}
                      strokeWidth="1.5"
                    />
                    <text
                      x={node.x}
                      y={node.y + 4}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      className="font-mono font-bold text-[10px]"
                    >
                      {node.val}
                    </text>
                    {/* Handwritten Balance Factor Annotation next to node */}
                    {node.bf !== undefined && (
                      <text
                        x={node.x + 18}
                        y={node.y - 4}
                        style={{ fontFamily: "'Caveat', cursive", fill: "#666666", fontSize: "12px", fontWeight: "bold" }}
                      >
                        BF={node.bf}
                      </text>
                    )}
                  </g>
                ))}
              </svg>
            </div>

            {/* Step Explanation Card (spanning 40% width on row) */}
            <div className="bg-[#FCFBF8] border border-[#DDD7CC] rounded-sm p-4 space-y-2 sm:w-[40%] flex flex-col justify-start">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#666666] block font-serif">
                Step Description
              </span>
              <p className="text-[12px] text-[#232323] leading-relaxed whitespace-pre-line font-mono font-bold bg-[#F4F1EA]/30 p-2.5 border border-[#DDD7CC]/50 rounded-sm select-none">
                {stepData.description}
              </p>
              <div className="bg-secondary/5 border border-dashed border-[#DDD7CC] p-3 rounded-sm leading-relaxed mt-2" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
                <span className="font-bold text-[#232323] block mb-1">Teacher's Explanation:</span>
                "{stepData.explanation}"
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );

  return (
    <div className="w-full my-4 select-none flex flex-col items-center">
      {isMaximized ? (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm cursor-zoom-out"
            onClick={() => setIsMaximized(false)}
          />

          {/* Maximized Modal Container */}
          <div 
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] lg:w-[80vw] lg:max-w-none h-[calc(100vh-2rem)] lg:h-[85vh] border border-[#DDD7CC] bg-[#FCFBF8] shadow-2xl rounded-sm p-4 md:p-6 flex flex-col gap-4 overflow-hidden"
          >
            {visualizerContent}
          </div>
        </>
      ) : (
        /* Inline Preview State matching standard SimulationEngine structure */
        <div className="w-full border border-[#DDD7CC] bg-[#FCFBF8] p-4 md:p-5 rounded-sm shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#3F51B5]/30">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-6 items-stretch">
            {/* Left Column: C++ Source Code Panel (spanning 6/10) */}
            <div className="md:col-span-6 flex flex-col h-[220px] min-h-0 bg-[#FCFBF8] border border-[#DDD7CC]/50 rounded-sm p-3 overflow-hidden text-left">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#666666] block font-serif mb-1">
                C++ AVL Insertion Code
              </span>
              <pre className="text-[9px] font-mono bg-[#fafafa] p-2 border border-[#DDD7CC]/30 rounded-sm overflow-auto leading-relaxed text-left flex-1 select-all">
                {insertionCode.slice(9).map((line, idx) => (
                  <div key={idx} className="text-[#4A4A4A]">{line}</div>
                ))}
              </pre>
            </div>

            {/* Right Column: Engine description & launch trigger (spanning 4/10) */}
            <div className="md:col-span-4 flex flex-col justify-between h-[220px] bg-[#F4F1EA]/30 rounded border border-[#DDD7CC]/40 p-4 text-center">
              <div className="flex flex-col items-center">
                {/* Center Spinning Gears */}
                <div className="flex items-center justify-center mb-3">
                  <div className="relative flex items-center justify-center w-8 h-8">
                    <Settings className="w-7 h-7 text-[#3F51B5] animate-[spin_6s_linear_infinite]" />
                  </div>
                  <div className="relative flex items-center justify-center w-5 h-5 -mt-3.5 -ml-1.5">
                    <Settings className="w-4.5 h-4.5 text-[#3F51B5]/75 animate-[spin_4s_linear_infinite_reverse]" />
                  </div>
                </div>

                <h5 className="font-serif font-black text-xs md:text-sm text-[#232323] uppercase tracking-wider mb-2">
                  Insertion Simulator
                </h5>
                <p className="text-[11px] md:text-xs text-[#666666] leading-relaxed font-serif max-w-[240px]">
                  Trace standard BST insertion combined with AVL backtracking balancing rules. 
                  Observe LL, RR, LR, and RL rotations trigger dynamically.
                </p>
              </div>

              <div>
                <button
                  onClick={() => setIsMaximized(true)}
                  className="group/btn flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-[#3F51B5] text-white font-mono text-[11px] uppercase tracking-wider font-bold shadow hover:bg-[#3F51B5]/90 transition-all outline-none cursor-pointer rounded-sm"
                >
                  <span>Launch Simulator</span>
                  <span className="text-[9px] transition-transform duration-200 group-hover/btn:translate-x-0.5">▶</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
