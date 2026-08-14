"use client";

import React, { useState } from "react";
import { Play, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

interface NodeState {
  val: number;
  left: string;
  right: string;
  height: number;
  cx: number;
  cy: number;
  isUnbalanced?: boolean;
  label?: string;
}

interface SubtreeState {
  label: string;
  cx: number;
  cy: number;
  pointer?: string;
}

interface ConnectionState {
  from: [number, number];
  to: [number, number];
  isDashed?: boolean;
}

interface HighlightBoxState {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  lx: number;
  ly: number;
}

interface SimulationStep {
  title: string;
  description: string;
  nodes: NodeState[];
  subtrees: SubtreeState[];
  connections: ConnectionState[];
  rotationArrow?: {
    d: string;
    label: string;
    lx: number;
    ly: number;
    textAnchor?: "start" | "end" | "middle";
  };
  highlightBox?: HighlightBoxState;
  code: string[];
  highlightedLines: number[];
}

export default function AVLRotationsDrawing() {
  const [activeTab, setActiveTab] = useState<"nail" | "ll" | "rr" | "lr" | "rl">("nail");
  const [step, setStep] = useState(0);

  // Common C++ Code templates
  const llCode = [
    "Node* LLRotation(Node* y) {",
    "    Node* x = y->left;",
    "    Node* T2 = x->right;",
    "    ",
    "    // Perform rotation",
    "    x->right = y;",
    "    y->left = T2;",
    "    ",
    "    // Update height of y",
    "    y->height = 1 + max(getHeight(y->left), getHeight(y->right));",
    "    // Update height of x",
    "    x->height = 1 + max(getHeight(x->left), getHeight(x->right));",
    "    ",
    "    return x;",
    "}"
  ];

  const rrCode = [
    "Node* RRRotation(Node* y) {",
    "    Node* x = y->right;",
    "    Node* T2 = x->left;",
    "    ",
    "    // Perform rotation",
    "    x->left = y;",
    "    y->right = T2;",
    "    ",
    "    // Update height of y",
    "    y->height = 1 + max(getHeight(y->left), getHeight(y->right));",
    "    // Update height of x",
    "    x->height = 1 + max(getHeight(x->left), getHeight(x->right));",
    "    ",
    "    return x;",
    "}"
  ];

  const lrCode = [
    "Node* LRRotation(Node* y) {",
    "    // 1. Left rotate the left child",
    "    y->left = RRRotation(y->left);",
    "    ",
    "    // 2. Right rotate the unbalanced parent",
    "    return LLRotation(y);",
    "}"
  ];

  const rlCode = [
    "Node* RLRotation(Node* y) {",
    "    // 1. Right rotate the right child",
    "    y->right = LLRotation(y->right);",
    "    ",
    "    // 2. Left rotate the unbalanced parent",
    "    return RRRotation(y);",
    "}"
  ];

  // LL Steps
  const llSteps: SimulationStep[] = [
    {
      title: "Step 0: Pointer Setup",
      description: "1. Identify unbalanced node y\n2. Set: Node* x = y->left;\n3. Set: Node* T2 = x->right;\n(T2 is reference variable pointing to 2R Tr)",
      nodes: [
        { val: 3, left: "Node 2", right: "3R Tr", height: 3, cx: 220, cy: 45, isUnbalanced: true, label: "y" },
        { val: 2, left: "Node 1", right: "T2", height: 2, cx: 150, cy: 105, label: "x" },
        { val: 1, left: "1L Tr", right: "1R Tr", height: 1, cx: 80, cy: 165 },
      ],
      subtrees: [
        { label: "1L Tr", cx: 50, cy: 195 },
        { label: "1R Tr", cx: 110, cy: 195 },
        { label: "2R Tr", cx: 180, cy: 135, pointer: "T2" },
        { label: "3R Tr", cx: 250, cy: 75 },
      ],
      connections: [
        { from: [220, 45], to: [150, 105] }, // y -> x
        { from: [220, 45], to: [250, 75], isDashed: true }, // y -> 3R Tr
        { from: [150, 105], to: [80, 165] }, // x -> Node 1
        { from: [150, 105], to: [180, 135], isDashed: true }, // x -> T2
        { from: [80, 165], to: [50, 195], isDashed: true },
        { from: [80, 165], to: [110, 195], isDashed: true },
      ],
      rotationArrow: {
        d: "M 220,15 Q 260,15 260,45",
        label: "Rotate Right",
        lx: 270,
        ly: 30,
        textAnchor: "start"
      },
      highlightBox: {
        x: 55,
        y: 20,
        w: 190,
        h: 170,
        label: "3 Nodes in Rotation",
        lx: 60,
        ly: 15
      },
      code: llCode,
      highlightedLines: [1, 2]
    },
    {
      title: "Step 1: Pointer Swaps",
      description: "1. Set: x->right = y;\n   (y becomes right child of x)\n2. Set: y->left = T2;\n   (T2 reference pointer reassigned to y->left)",
      nodes: [
        { val: 3, left: "T2", right: "3R Tr", height: 3, cx: 220, cy: 105, label: "y" },
        { val: 2, left: "Node 1", right: "Node 3", height: 2, cx: 150, cy: 45, label: "x" },
        { val: 1, left: "1L Tr", right: "1R Tr", height: 1, cx: 80, cy: 105 },
      ],
      subtrees: [
        { label: "1L Tr", cx: 50, cy: 135 },
        { label: "1R Tr", cx: 110, cy: 135 },
        { label: "2R Tr", cx: 190, cy: 135, pointer: "T2" },
        { label: "3R Tr", cx: 250, cy: 135 },
      ],
      connections: [
        { from: [150, 45], to: [80, 105] }, // x -> Node 1
        { from: [150, 45], to: [220, 105] }, // x -> y
        { from: [80, 105], to: [50, 135], isDashed: true },
        { from: [80, 105], to: [110, 135], isDashed: true },
        { from: [220, 105], to: [190, 135], isDashed: true }, // y -> T2
        { from: [220, 105], to: [250, 135], isDashed: true }, // y -> 3R Tr
      ],
      highlightBox: {
        x: 55,
        y: 20,
        w: 190,
        h: 120,
        label: "3 Nodes in Rotation",
        lx: 60,
        ly: 15
      },
      code: llCode,
      highlightedLines: [5, 6]
    },
    {
      title: "Step 2: Heights & Return",
      description: "1. Update height of y:\n   y->height = 1 + max(h(left), h(right));\n2. Update height of x:\n   x->height = 1 + max(h(left), h(right));\n3. Return x; (new root of subtree)",
      nodes: [
        { val: 3, left: "T2", right: "3R Tr", height: 1, cx: 220, cy: 105, label: "y" },
        { val: 2, left: "Node 1", right: "Node 3", height: 2, cx: 150, cy: 45, label: "x" },
        { val: 1, left: "1L Tr", right: "1R Tr", height: 1, cx: 80, cy: 105 },
      ],
      subtrees: [
        { label: "1L Tr", cx: 50, cy: 135 },
        { label: "1R Tr", cx: 110, cy: 135 },
        { label: "2R Tr", cx: 190, cy: 135, pointer: "T2" },
        { label: "3R Tr", cx: 250, cy: 135 },
      ],
      connections: [
        { from: [150, 45], to: [80, 105] },
        { from: [150, 45], to: [220, 105] },
        { from: [80, 105], to: [50, 135], isDashed: true },
        { from: [80, 105], to: [110, 135], isDashed: true },
        { from: [220, 105], to: [190, 135], isDashed: true },
        { from: [220, 105], to: [250, 135], isDashed: true },
      ],
      highlightBox: {
        x: 55,
        y: 20,
        w: 190,
        h: 120,
        label: "3 Nodes in Rotation",
        lx: 60,
        ly: 15
      },
      code: llCode,
      highlightedLines: [9, 11, 13]
    }
  ];

  // RR Steps
  const rrSteps: SimulationStep[] = [
    {
      title: "Step 0: Pointer Setup",
      description: "1. Identify unbalanced node y\n2. Set: Node* x = y->right;\n3. Set: Node* T2 = x->left;\n(T2 is reference variable pointing to 2L Tr)",
      nodes: [
        { val: 1, left: "1L Tr", right: "Node 2", height: 3, cx: 80, cy: 45, isUnbalanced: true, label: "y" },
        { val: 2, left: "T2", right: "Node 3", height: 2, cx: 150, cy: 105, label: "x" },
        { val: 3, left: "3L Tr", right: "3R Tr", height: 1, cx: 220, cy: 165 },
      ],
      subtrees: [
        { label: "1L Tr", cx: 50, cy: 75 },
        { label: "2L Tr", cx: 120, cy: 135, pointer: "T2" },
        { label: "3L Tr", cx: 190, cy: 195 },
        { label: "3R Tr", cx: 250, cy: 195 },
      ],
      connections: [
        { from: [80, 45], to: [50, 75], isDashed: true },
        { from: [80, 45], to: [150, 105] }, // y -> x
        { from: [150, 105], to: [120, 135], isDashed: true }, // x -> T2
        { from: [150, 105], to: [220, 165] }, // x -> Node 3
        { from: [220, 165], to: [190, 195], isDashed: true },
        { from: [220, 165], to: [250, 195], isDashed: true },
      ],
      rotationArrow: {
        d: "M 80,15 Q 40,15 40,45",
        label: "Rotate Left",
        lx: 30,
        ly: 30,
        textAnchor: "end"
      },
      highlightBox: {
        x: 55,
        y: 20,
        w: 190,
        h: 170,
        label: "3 Nodes in Rotation",
        lx: 145,
        ly: 15
      },
      code: rrCode,
      highlightedLines: [1, 2]
    },
    {
      title: "Step 1: Pointer Swaps",
      description: "1. Set: x->left = y;\n   (y becomes left child of x)\n2. Set: y->right = T2;\n   (T2 reference pointer reassigned to y->right)",
      nodes: [
        { val: 1, left: "1L Tr", right: "T2", height: 3, cx: 80, cy: 105, label: "y" },
        { val: 2, left: "Node 1", right: "Node 3", height: 2, cx: 150, cy: 45, label: "x" },
        { val: 3, left: "3L Tr", right: "3R Tr", height: 1, cx: 220, cy: 105 },
      ],
      subtrees: [
        { label: "1L Tr", cx: 50, cy: 135 },
        { label: "2L Tr", cx: 110, cy: 135, pointer: "T2" },
        { label: "3L Tr", cx: 190, cy: 135 },
        { label: "3R Tr", cx: 250, cy: 135 },
      ],
      connections: [
        { from: [150, 45], to: [80, 105] }, // x -> y
        { from: [150, 45], to: [220, 105] }, // x -> Node 3
        { from: [80, 105], to: [50, 135], isDashed: true }, // y -> 1L Tr
        { from: [80, 105], to: [110, 135], isDashed: true }, // y -> T2
        { from: [220, 105], to: [190, 135], isDashed: true },
        { from: [220, 105], to: [250, 135], isDashed: true },
      ],
      highlightBox: {
        x: 55,
        y: 20,
        w: 190,
        h: 120,
        label: "3 Nodes in Rotation",
        lx: 145,
        ly: 15
      },
      code: rrCode,
      highlightedLines: [5, 6]
    },
    {
      title: "Step 2: Heights & Return",
      description: "1. Update height of y:\n   y->height = 1 + max(h(left), h(right));\n2. Update height of x:\n   x->height = 1 + max(h(left), h(right));\n3. Return x; (new root of subtree)",
      nodes: [
        { val: 1, left: "1L Tr", right: "T2", height: 1, cx: 80, cy: 105, label: "y" },
        { val: 2, left: "Node 1", right: "Node 3", height: 2, cx: 150, cy: 45, label: "x" },
        { val: 3, left: "3L Tr", right: "3R Tr", height: 1, cx: 220, cy: 105 },
      ],
      subtrees: [
        { label: "1L Tr", cx: 50, cy: 135 },
        { label: "2L Tr", cx: 110, cy: 135, pointer: "T2" },
        { label: "3L Tr", cx: 190, cy: 135 },
        { label: "3R Tr", cx: 250, cy: 135 },
      ],
      connections: [
        { from: [150, 45], to: [80, 105] },
        { from: [150, 45], to: [220, 105] },
        { from: [80, 105], to: [50, 135], isDashed: true },
        { from: [80, 105], to: [110, 135], isDashed: true },
        { from: [220, 105], to: [190, 135], isDashed: true },
        { from: [220, 105], to: [250, 135], isDashed: true },
      ],
      highlightBox: {
        x: 55,
        y: 20,
        w: 190,
        h: 120,
        label: "3 Nodes in Rotation",
        lx: 145,
        ly: 15
      },
      code: rrCode,
      highlightedLines: [9, 11, 13]
    }
  ];

  // LR Steps
  const lrSteps: SimulationStep[] = [
    {
      title: "Step 0: Rotate Child Node (x)",
      description: "1. Left rotate the left child node x:\n   y->left = RRRotation(y->left);\n(T2 reference variable pointing to 2L Tr locally)",
      nodes: [
        { val: 3, left: "Node 1", right: "3R Tr", height: 3, cx: 200, cy: 45, isUnbalanced: true, label: "y" },
        { val: 1, left: "1L Tr", right: "Node 2", height: 2, cx: 120, cy: 105, label: "x" },
        { val: 2, left: "2L Tr", right: "2R Tr", height: 1, cx: 160, cy: 165, label: "w" },
      ],
      subtrees: [
        { label: "3R Tr", cx: 240, cy: 75 },
        { label: "1L Tr", cx: 90, cy: 135 },
        { label: "2L Tr", cx: 130, cy: 195, pointer: "T2" },
        { label: "2R Tr", cx: 190, cy: 195 },
      ],
      connections: [
        { from: [200, 45], to: [120, 105] },
        { from: [200, 45], to: [240, 75], isDashed: true },
        { from: [120, 105], to: [90, 135], isDashed: true },
        { from: [120, 105], to: [160, 165] },
        { from: [160, 165], to: [130, 195], isDashed: true },
        { from: [160, 165], to: [190, 195], isDashed: true },
      ],
      rotationArrow: {
        d: "M 120,85 Q 90,85 90,115",
        label: "Left Rotate Child (x)",
        lx: 80,
        ly: 95,
        textAnchor: "end"
      },
      highlightBox: {
        x: 95,
        y: 20,
        w: 130,
        h: 170,
        label: "3 Nodes in Rotation",
        lx: 100,
        ly: 15
      },
      code: lrCode,
      highlightedLines: [2]
    },
    {
      title: "Step 1: Rotate Parent Node (y)",
      description: "1. Right rotate parent node y:\n   return LLRotation(y);\n(T2 reference variable pointing to 2R Tr locally)",
      nodes: [
        { val: 3, left: "Node 2", right: "3R Tr", height: 3, cx: 200, cy: 45, isUnbalanced: true, label: "y" },
        { val: 2, left: "Node 1", right: "2R Tr", height: 2, cx: 120, cy: 105, label: "w" },
        { val: 1, left: "1L Tr", right: "2L Tr", height: 1, cx: 80, cy: 165, label: "x" },
      ],
      subtrees: [
        { label: "3R Tr", cx: 240, cy: 75 },
        { label: "1L Tr", cx: 50, cy: 195 },
        { label: "2L Tr", cx: 110, cy: 195 },
        { label: "2R Tr", cx: 150, cy: 135, pointer: "T2" },
      ],
      connections: [
        { from: [200, 45], to: [120, 105] },
        { from: [200, 45], to: [240, 75], isDashed: true },
        { from: [120, 105], to: [80, 165] },
        { from: [120, 105], to: [150, 135], isDashed: true },
        { from: [80, 165], to: [50, 195], isDashed: true },
        { from: [80, 165], to: [110, 195], isDashed: true },
      ],
      rotationArrow: {
        d: "M 200,15 Q 240,15 240,45",
        label: "Right Rotate Parent (y)",
        lx: 250,
        ly: 30,
        textAnchor: "start"
      },
      highlightBox: {
        x: 55,
        y: 20,
        w: 190,
        h: 170,
        label: "3 Nodes in Rotation",
        lx: 60,
        ly: 15
      },
      code: lrCode,
      highlightedLines: [5]
    },
    {
      title: "Step 2: Subtree Balanced",
      description: "1. Rotation operations complete.\n2. Subtree is now fully balanced.\n(T2 reference variable pointing to 2R Tr)",
      nodes: [
        { val: 1, left: "1L Tr", right: "2L Tr", height: 1, cx: 80, cy: 105, label: "x" },
        { val: 2, left: "Node 1", right: "Node 3", height: 2, cx: 160, cy: 45, label: "w" },
        { val: 3, left: "2R Tr", right: "3R Tr", height: 1, cx: 240, cy: 105, label: "y" },
      ],
      subtrees: [
        { label: "1L Tr", cx: 50, cy: 135 },
        { label: "2L Tr", cx: 110, cy: 135 },
        { label: "2R Tr", cx: 210, cy: 135, pointer: "T2" },
        { label: "3R Tr", cx: 270, cy: 135 },
      ],
      connections: [
        { from: [160, 45], to: [80, 105] },
        { from: [160, 45], to: [240, 105] },
        { from: [80, 105], to: [50, 135], isDashed: true },
        { from: [80, 105], to: [110, 135], isDashed: true },
        { from: [240, 105], to: [210, 135], isDashed: true },
        { from: [240, 105], to: [270, 135], isDashed: true },
      ],
      highlightBox: {
        x: 55,
        y: 20,
        w: 240,
        h: 120,
        label: "3 Nodes in Rotation",
        lx: 60,
        ly: 15
      },
      code: lrCode,
      highlightedLines: [5]
    }
  ];

  // RL Steps
  const rlSteps: SimulationStep[] = [
    {
      title: "Step 0: Rotate Child Node (x)",
      description: "1. Right rotate the right child node x:\n   y->right = LLRotation(y->right);\n(T2 reference variable pointing to 2R Tr locally)",
      nodes: [
        { val: 1, left: "1L Tr", right: "Node 3", height: 3, cx: 120, cy: 45, isUnbalanced: true, label: "y" },
        { val: 3, left: "Node 2", right: "3R Tr", height: 2, cx: 200, cy: 105, label: "x" },
        { val: 2, left: "2L Tr", right: "2R Tr", height: 1, cx: 160, cy: 165, label: "w" },
      ],
      subtrees: [
        { label: "1L Tr", cx: 90, cy: 75 },
        { label: "3R Tr", cx: 230, cy: 135 },
        { label: "2L Tr", cx: 130, cy: 195 },
        { label: "2R Tr", cx: 190, cy: 195, pointer: "T2" },
      ],
      connections: [
        { from: [120, 45], to: [90, 75], isDashed: true },
        { from: [120, 45], to: [200, 105] },
        { from: [200, 105], to: [160, 165] },
        { from: [200, 105], to: [230, 135], isDashed: true },
        { from: [160, 165], to: [130, 195], isDashed: true },
        { from: [160, 165], to: [190, 195], isDashed: true },
      ],
      rotationArrow: {
        d: "M 200,85 Q 230,85 230,115",
        label: "Right Rotate Child (x)",
        lx: 240,
        ly: 95,
        textAnchor: "start"
      },
      highlightBox: {
        x: 95,
        y: 20,
        w: 130,
        h: 170,
        label: "3 Nodes in Rotation",
        lx: 100,
        ly: 15
      },
      code: rlCode,
      highlightedLines: [2]
    },
    {
      title: "Step 1: Rotate Parent Node (y)",
      description: "1. Left rotate parent node y:\n   return RRRotation(y);\n(T2 reference variable pointing to 2L Tr locally)",
      nodes: [
        { val: 1, left: "1L Tr", right: "Node 2", height: 3, cx: 120, cy: 45, isUnbalanced: true, label: "y" },
        { val: 2, left: "2L Tr", right: "Node 3", height: 2, cx: 200, cy: 105, label: "w" },
        { val: 3, left: "3L Tr", right: "3R Tr", height: 1, cx: 240, cy: 165, label: "x" },
      ],
      subtrees: [
        { label: "1L Tr", cx: 90, cy: 75 },
        { label: "2L Tr", cx: 170, cy: 135, pointer: "T2" },
        { label: "3L Tr", cx: 210, cy: 195 },
        { label: "3R Tr", cx: 270, cy: 195 },
      ],
      connections: [
        { from: [120, 45], to: [90, 75], isDashed: true },
        { from: [120, 45], to: [200, 105] },
        { from: [200, 105], to: [170, 135], isDashed: true },
        { from: [200, 105], to: [240, 165] },
        { from: [240, 165], to: [210, 195], isDashed: true },
        { from: [240, 165], to: [270, 195], isDashed: true },
      ],
      rotationArrow: {
        d: "M 120,15 Q 80,15 80,45",
        label: "Left Rotate Parent (y)",
        lx: 70,
        ly: 30,
        textAnchor: "end"
      },
      highlightBox: {
        x: 95,
        y: 20,
        w: 170,
        h: 170,
        label: "3 Nodes in Rotation",
        lx: 100,
        ly: 15
      },
      code: rlCode,
      highlightedLines: [5]
    },
    {
      title: "Step 2: Subtree Balanced",
      description: "1. Rotation operations complete.\n2. Subtree is now fully balanced.\n(T2 reference variable pointing to 2L Tr)",
      nodes: [
        { val: 1, left: "1L Tr", right: "2L Tr", height: 1, cx: 80, cy: 105, label: "y" },
        { val: 2, left: "Node 1", right: "Node 3", height: 2, cx: 160, cy: 45, label: "w" },
        { val: 3, left: "2R Tr", right: "3R Tr", height: 1, cx: 240, cy: 105, label: "x" },
      ],
      subtrees: [
        { label: "1L Tr", cx: 50, cy: 135 },
        { label: "2L Tr", cx: 110, cy: 135, pointer: "T2" },
        { label: "3L Tr", cx: 190, cy: 135 },
        { label: "3R Tr", cx: 250, cy: 135 },
      ],
      connections: [
        { from: [160, 45], to: [80, 105] },
        { from: [160, 45], to: [240, 105] },
        { from: [80, 105], to: [50, 135], isDashed: true },
        { from: [80, 105], to: [110, 135], isDashed: true },
        { from: [240, 105], to: [210, 135], isDashed: true },
        { from: [240, 105], to: [270, 135], isDashed: true },
      ],
      highlightBox: {
        x: 55,
        y: 20,
        w: 240,
        h: 120,
        label: "3 Nodes in Rotation",
        lx: 60,
        ly: 15
      },
      code: rlCode,
      highlightedLines: [5]
    }
  ];

  // Helper to fetch current steps
  const getCurrentSteps = () => {
    switch (activeTab) {
      case "ll": return llSteps;
      case "rr": return rrSteps;
      case "lr": return lrSteps;
      case "rl": return rlSteps;
      default: return [];
    }
  };

  const stepsData = getCurrentSteps();
  const currentStepData = stepsData[step];

  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-3xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-6 shadow-sm font-serif">
        <div>
          <h4 className="text-sm font-extrabold text-[#232323] uppercase tracking-wide">
            AVL Rotations & Whiteboard Intuition
          </h4>
          <p className="text-xs text-secondary-foreground font-normal" style={{ fontFamily: "'Caveat', cursive", fontSize: "15px" }}>
            "Click on the tabs below to explore the physical analogies and the 4 rotation cases step-by-step."
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-1 border-b border-[#DDD7CC]/80 pb-2">
          {[
            { id: "nail", label: "Nail & Thread Analogy" },
            { id: "ll", label: "LL Rotation (Right)" },
            { id: "rr", label: "RR Rotation (Left)" },
            { id: "lr", label: "LR Rotation (Double)" },
            { id: "rl", label: "RL Rotation (Double)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setStep(0);
              }}
              className={`px-3 py-1.5 text-xs font-mono border transition-all ${
                activeTab === tab.id
                  ? "border-[#3F51B5] bg-[#3F51B5]/5 text-[#3F51B5] font-bold"
                  : "border-transparent text-secondary-foreground hover:bg-[#F4F1EA]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. NAIL AND THREAD ANALOGY */}
        {activeTab === "nail" && (
          <div className="space-y-4 animate-fadeIn">
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
        )}

        {/* INTERACTIVE ROTATIONS SIMULATOR FOR ALL IMBLANCE CASES */}
        {activeTab !== "nail" && currentStepData && (
          <div className="space-y-4 animate-fadeIn">
            
            {/* Header info */}
            <div className="flex justify-between items-center bg-[#F4F1EA]/30 p-3 border border-[#DDD7CC]/50 rounded-sm">
              <h5 className="text-[13px] font-bold text-[#232323] uppercase">
                {activeTab.toUpperCase()} Rotation Simulator
              </h5>
              <div className="flex space-x-1">
                {stepsData.map((_, sIdx) => (
                  <div
                    key={sIdx}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      step === sIdx ? "bg-[#3F51B5] scale-110" : "bg-[#DDD7CC]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* SVG Canvas Columns (left 2/3) */}
              <div className="lg:col-span-2 flex flex-col space-y-4">
                
                {/* Visual white-board canvas */}
                <div className="flex flex-col items-center border border-[#DDD7CC]/60 bg-[#F4F1EA]/10 p-4 rounded-sm relative">
                  
                  {/* Stepper Header */}
                  <div className="w-full flex justify-between items-center mb-3">
                    <span className="text-[11px] font-bold text-[#3F51B5] uppercase tracking-wider font-mono">
                      {currentStepData.title}
                    </span>
                    <span className="text-[10px] text-[#666666] font-mono">
                      Step {step + 1} of {stepsData.length}
                    </span>
                  </div>

                  {/* Whiteboard Drawing Canvas */}
                  <svg width="320" height="230" className="overflow-visible font-mono text-[10px] font-bold">
                    {/* Backdrop grids */}
                    <line x1="0" y1="45" x2="320" y2="45" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
                    <line x1="0" y1="105" x2="320" y2="105" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
                    <line x1="0" y1="165" x2="320" y2="165" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />

                    {/* 3 Nodes Group Highlight */}
                    {currentStepData.highlightBox && (
                      <g>
                        <rect
                          x={currentStepData.highlightBox.x}
                          y={currentStepData.highlightBox.y}
                          width={currentStepData.highlightBox.w}
                          height={currentStepData.highlightBox.h}
                          rx="14"
                          fill="none"
                          stroke="#3F51B5"
                          strokeWidth="1.2"
                          strokeDasharray="4,4"
                        />
                        <text
                          x={currentStepData.highlightBox.lx}
                          y={currentStepData.highlightBox.ly}
                          style={{
                            fontFamily: "'Caveat', cursive",
                            fill: "#3F51B5",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                          className="select-none"
                        >
                          {currentStepData.highlightBox.label}
                        </text>
                      </g>
                    )}

                    {/* Connections/Pointers */}
                    {currentStepData.connections.map((conn, idx) => (
                      <line
                        key={idx}
                        x1={conn.from[0]}
                        y1={conn.from[1]}
                        x2={conn.to[0]}
                        y2={conn.to[1]}
                        stroke="#3F51B5"
                        strokeWidth={conn.isDashed ? 1.5 : 2.5}
                        strokeDasharray={conn.isDashed ? "3,3" : undefined}
                      />
                    ))}

                    {/* Subtrees */}
                    {currentStepData.subtrees.map((sub, idx) => (
                      <g key={idx}>
                        <polygon
                          points={`${sub.cx},${sub.cy - 10} ${sub.cx - 20},${sub.cy + 15} ${sub.cx + 20},${sub.cy + 15}`}
                          fill="#F4F1EA"
                          stroke="#DDD7CC"
                          strokeWidth="1.5"
                        />
                        <text
                          x={sub.cx}
                          y={sub.cy + 10}
                          textAnchor="middle"
                          fill="#666666"
                          className="text-[9px] font-bold"
                        >
                          {sub.label}
                        </text>
                        {/* Reference variable label next to subtree triangle */}
                        {sub.pointer && (
                          <text
                            x={sub.cx + 23}
                            y={sub.cy + 11}
                            style={{ fontFamily: "'Caveat', cursive", fill: "#D97706", fontSize: "13px", fontWeight: "bold" }}
                          >
                            {sub.pointer}
                          </text>
                        )}
                      </g>
                    ))}

                    {/* Rotation Bending Arrow */}
                    {currentStepData.rotationArrow && (
                      <g>
                        <path
                          d={currentStepData.rotationArrow.d}
                          fill="none"
                          stroke="#D97706"
                          strokeWidth="2.5"
                          markerEnd="url(#arrow)"
                        />
                        <text
                          x={currentStepData.rotationArrow.lx}
                          y={currentStepData.rotationArrow.ly}
                          textAnchor={currentStepData.rotationArrow.textAnchor || "middle"}
                          style={{ fontFamily: "'Caveat', cursive", fill: "#D97706", fontSize: "12px" }}
                        >
                          {currentStepData.rotationArrow.label}
                        </text>
                      </g>
                    )}

                    {/* Node Circles */}
                    {currentStepData.nodes.map((node, idx) => (
                      <g key={idx}>
                        <circle
                          cx={node.cx}
                          cy={node.cy}
                          r="14"
                          fill={node.isUnbalanced ? "#C0392B" : "#3F51B5"}
                          stroke={node.isUnbalanced ? "#C0392B" : "#3F51B5"}
                          strokeWidth="1.5"
                        />
                        <text
                          x={node.cx}
                          y={node.cy + 4}
                          textAnchor="middle"
                          fill="#FFFFFF"
                          className="font-mono font-bold text-[10px]"
                        >
                          {node.val}
                        </text>
                        {/* Height overlay label */}
                        <text
                          x={node.cx}
                          y={node.cy - 18}
                          textAnchor="middle"
                          fill="#666666"
                          className="font-mono text-[8px] font-normal"
                        >
                          h={node.height}
                        </text>
                        {/* Variable name overlay next to node circle */}
                        {node.label && (
                          <text
                            x={node.cx + 20}
                            y={node.cy + 4}
                            style={{ fontFamily: "'Caveat', cursive", fill: "#D97706", fontSize: "13px", fontWeight: "bold" }}
                          >
                            {node.label}
                          </text>
                        )}
                      </g>
                    ))}
                  </svg>

                  {/* Stepper buttons */}
                  <div className="w-full flex justify-between items-center mt-4 pt-3 border-t border-[#DDD7CC]/50">
                    <button
                      disabled={step === 0}
                      onClick={() => setStep((s) => s - 1)}
                      className="flex items-center space-x-1 px-2.5 py-1 text-[11px] font-mono border border-[#DDD7CC] rounded hover:bg-[#F4F1EA] transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <ChevronLeft size={12} />
                      <span>Back</span>
                    </button>

                    <button
                      onClick={() => setStep(0)}
                      className="flex items-center space-x-1 px-2 py-1 text-[10px] font-mono text-[#666666] border border-transparent rounded hover:border-[#DDD7CC] hover:bg-[#F4F1EA] transition-all"
                      title="Reset Simulator"
                    >
                      <RotateCcw size={11} />
                      <span>Reset</span>
                    </button>

                    <button
                      disabled={step === stepsData.length - 1}
                      onClick={() => setStep((s) => s + 1)}
                      className="flex items-center space-x-1 px-2.5 py-1 text-[11px] font-mono bg-[#3F51B5] text-white rounded hover:bg-[#3F51B5]/90 transition-all disabled:opacity-30 disabled:hover:bg-[#3F51B5]"
                    >
                      <span>Next</span>
                      <ChevronRight size={12} />
                    </button>
                  </div>
                </div>

              </div>

              {/* State Inspector & Explanation Column (right 1/3) */}
              <div className="flex flex-col space-y-4">
                
                {/* Explanation Card */}
                <div className="bg-[#FCFBF8] border border-[#DDD7CC] rounded-sm p-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#666666] block font-serif">
                    Step Description
                  </span>
                  <p className="text-[12px] text-[#232323] leading-relaxed whitespace-pre-line font-mono font-bold bg-[#F4F1EA]/30 p-2 border border-[#DDD7CC]/50 rounded-sm">
                    {currentStepData.description}
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

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
