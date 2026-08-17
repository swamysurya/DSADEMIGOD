"use client";

import React, { useState, useEffect } from "react";
import { RotateCcw, ChevronLeft, ChevronRight, Maximize2, Minimize2, Settings } from "lucide-react";

interface NodeState {
  val: string;
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
  const [activeTab, setActiveTab] = useState<"ll" | "rr" | "lr" | "rl">("ll");
  const [step, setStep] = useState(0);
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

  // Exact C++ Code from the user's snippet
  const llCode = [
    "Node* LLRoation(Node* y) {",
    "    Node* x = y->left;",
    "    Node* T2 = x->right;",
    "    ",
    "    // rotation",
    "    x->right = y;",
    "    y->left = T2;",
    "    ",
    "    // update height of y ",
    "    y->height = 1 + max(getHeightOfNode(y->left), getHeightOfNode(y->right));",
    "    // updated height of x",
    "    x->height = 1 + max(getHeightOfNode(x->left), getHeightOfNode(x->right));",
    "    ",
    "    return x;",
    "}"
  ];

  const rrCode = [
    "Node* RRrotation(Node* y) {",
    "    Node* x = y->right;",
    "    Node* T2 = x->left;",
    "    ",
    "    // rotate ",
    "    x->left = y;",
    "    y->right = T2;",
    "    ",
    "    // update height of y ",
    "    y->height = 1 + max(getHeightOfNode(y->left), getHeightOfNode(y->right));",
    "    // updated height of x",
    "    x->height = 1 + max(getHeightOfNode(x->left), getHeightOfNode(x->right));",
    "    ",
    "    return x;",
    "}"
  ];

  const lrCode = [
    "Node* LRrotation(Node* root) {",
    "    root->left = RRrotation(root->left);",
    "    root = LLRoation(root);",
    "    return root;",
    "}"
  ];

  const rlCode = [
    "Node* RLrotation(Node* root) {",
    "    root->right = LLRoation(root->right);",
    "    root = RRrotation(root);",
    "    return root;",
    "}"
  ];

  // LL Steps
  const llSteps: SimulationStep[] = [
    {
      title: "Step 0: Initial State & Setup",
      description: "1. Identify unbalanced node A (passed as y).\n2. Set: Node* x = y->left (Node B).\n3. Set: Node* T2 = x->right (Subtree B_R).\n(T2 is the right child of node x/B)",
      nodes: [
        { val: "A", left: "B", right: "A_R", height: 3, cx: 220, cy: 40, isUnbalanced: true, label: "y" },
        { val: "B", left: "C", right: "B_R", height: 2, cx: 140, cy: 100, label: "x" },
        { val: "C", left: "C_L", right: "C_R", height: 1, cx: 80, cy: 160 },
      ],
      subtrees: [
        { label: "C_L", cx: 50, cy: 210 },
        { label: "C_R", cx: 110, cy: 210 },
        { label: "B_R", cx: 200, cy: 160, pointer: "T2" },
        { label: "A_R", cx: 300, cy: 100 },
      ],
      connections: [
        { from: [220, 40], to: [140, 100] }, // y -> x
        { from: [220, 40], to: [300, 100], isDashed: true }, // y -> A_R
        { from: [140, 100], to: [80, 160] }, // x -> C
        { from: [140, 100], to: [200, 160], isDashed: true }, // x -> B_R
        { from: [80, 160], to: [50, 210], isDashed: true },
        { from: [80, 160], to: [110, 210], isDashed: true },
      ],
      rotationArrow: {
        d: "M 220,15 Q 260,15 260,40",
        label: "Right Rotate",
        lx: 270,
        ly: 25,
        textAnchor: "start"
      },
      highlightBox: {
        x: 45,
        y: 20,
        w: 205,
        h: 180,
        label: "Nodes in LL Imbalance",
        lx: 60,
        ly: 15
      },
      code: llCode,
      highlightedLines: [1, 2, 3]
    },
    {
      title: "Step 1: Pointer Swaps",
      description: "1. Reassign: x->right = y;\n   (Unbalanced node y/A becomes right child of x/B)\n2. Reassign: y->left = T2;\n   (Subtree B_R is connected to left side of y/A)",
      nodes: [
        { val: "A", left: "B_R", right: "A_R", height: 3, cx: 220, cy: 100, label: "y" },
        { val: "B", left: "C", right: "A", height: 2, cx: 140, cy: 40, label: "x" },
        { val: "C", left: "C_L", right: "C_R", height: 1, cx: 80, cy: 100 },
      ],
      subtrees: [
        { label: "C_L", cx: 50, cy: 150 },
        { label: "C_R", cx: 110, cy: 150 },
        { label: "B_R", cx: 180, cy: 150, pointer: "T2" },
        { label: "A_R", cx: 260, cy: 150 },
      ],
      connections: [
        { from: [140, 40], to: [80, 100] }, // x -> C
        { from: [140, 40], to: [220, 100] }, // x -> y
        { from: [80, 100], to: [50, 150], isDashed: true },
        { from: [80, 100], to: [110, 150], isDashed: true },
        { from: [220, 100], to: [180, 150], isDashed: true }, // y -> B_R
        { from: [220, 100], to: [260, 150], isDashed: true }, // y -> A_R
      ],
      highlightBox: {
        x: 45,
        y: 20,
        w: 235,
        h: 150,
        label: "Pointers Swapped",
        lx: 50,
        ly: 15
      },
      code: llCode,
      highlightedLines: [5, 6, 7]
    },
    {
      title: "Step 2: Update Heights & Return",
      description: "1. Recalculate y->height (Node A).\n2. Recalculate x->height (Node B).\n3. Return x (Node B) as the new root of the subtree.",
      nodes: [
        { val: "A", left: "B_R", right: "A_R", height: 2, cx: 220, cy: 100, label: "y" },
        { val: "B", left: "C", right: "A", height: 3, cx: 140, cy: 40, label: "x" },
        { val: "C", left: "C_L", right: "C_R", height: 1, cx: 80, cy: 100 },
      ],
      subtrees: [
        { label: "C_L", cx: 50, cy: 150 },
        { label: "C_R", cx: 110, cy: 150 },
        { label: "B_R", cx: 180, cy: 150, pointer: "T2" },
        { label: "A_R", cx: 260, cy: 150 },
      ],
      connections: [
        { from: [140, 40], to: [80, 100] },
        { from: [140, 40], to: [220, 100] },
        { from: [80, 100], to: [50, 150], isDashed: true },
        { from: [80, 100], to: [110, 150], isDashed: true },
        { from: [220, 100], to: [180, 150], isDashed: true },
        { from: [220, 100], to: [260, 150], isDashed: true },
      ],
      highlightBox: {
        x: 45,
        y: 20,
        w: 235,
        h: 150,
        label: "Heights Corrected",
        lx: 50,
        ly: 15
      },
      code: llCode,
      highlightedLines: [9, 10, 11, 13]
    }
  ];

  // RR Steps
  const rrSteps: SimulationStep[] = [
    {
      title: "Step 0: Initial State & Setup",
      description: "1. Identify unbalanced node A (passed as y).\n2. Set: Node* x = y->right (Node B).\n3. Set: Node* T2 = x->left (Subtree B_L).\n(T2 is the left child of node x/B)",
      nodes: [
        { val: "A", left: "A_L", right: "B", height: 3, cx: 100, cy: 40, isUnbalanced: true, label: "y" },
        { val: "B", left: "B_L", right: "C", height: 2, cx: 180, cy: 100, label: "x" },
        { val: "C", left: "C_L", right: "C_R", height: 1, cx: 240, cy: 160 },
      ],
      subtrees: [
        { label: "A_L", cx: 40, cy: 100 },
        { label: "B_L", cx: 140, cy: 160, pointer: "T2" },
        { label: "C_L", cx: 210, cy: 210 },
        { label: "C_R", cx: 270, cy: 210 },
      ],
      connections: [
        { from: [100, 40], to: [40, 100], isDashed: true }, // y -> A_L
        { from: [100, 40], to: [180, 100] }, // y -> x
        { from: [180, 100], to: [140, 160], isDashed: true }, // x -> B_L
        { from: [180, 100], to: [240, 160] }, // x -> C
        { from: [240, 160], to: [210, 210], isDashed: true },
        { from: [240, 160], to: [270, 210], isDashed: true },
      ],
      rotationArrow: {
        d: "M 100,15 Q 60,15 60,40",
        label: "Left Rotate",
        lx: 50,
        ly: 25,
        textAnchor: "end"
      },
      highlightBox: {
        x: 75,
        y: 20,
        w: 205,
        h: 180,
        label: "Nodes in RR Imbalance",
        lx: 145,
        ly: 15
      },
      code: rrCode,
      highlightedLines: [1, 2, 3]
    },
    {
      title: "Step 1: Pointer Swaps",
      description: "1. Reassign: x->left = y;\n   (Unbalanced node y/A becomes left child of x/B)\n2. Reassign: y->right = T2;\n   (Subtree B_L is connected to right side of y/A)",
      nodes: [
        { val: "A", left: "A_L", right: "B_L", height: 3, cx: 100, cy: 100, label: "y" },
        { val: "B", left: "A", right: "C", height: 2, cx: 180, cy: 40, label: "x" },
        { val: "C", left: "C_L", right: "C_R", height: 1, cx: 240, cy: 100 },
      ],
      subtrees: [
        { label: "A_L", cx: 60, cy: 150 },
        { label: "B_L", cx: 140, cy: 150, pointer: "T2" },
        { label: "C_L", cx: 210, cy: 150 },
        { label: "C_R", cx: 270, cy: 150 },
      ],
      connections: [
        { from: [180, 40], to: [100, 100] }, // x -> y
        { from: [180, 40], to: [240, 100] }, // x -> C
        { from: [100, 100], to: [60, 150], isDashed: true }, // y -> A_L
        { from: [100, 100], to: [140, 150], isDashed: true }, // y -> B_L
        { from: [240, 100], to: [210, 150], isDashed: true },
        { from: [240, 100], to: [270, 150], isDashed: true },
      ],
      highlightBox: {
        x: 45,
        y: 20,
        w: 245,
        h: 150,
        label: "Pointers Swapped",
        lx: 145,
        ly: 15
      },
      code: rrCode,
      highlightedLines: [5, 6, 7]
    },
    {
      title: "Step 2: Heights & Return",
      description: "1. Recalculate y->height (Node A).\n2. Recalculate x->height (Node B).\n3. Return x (Node B) as the new root of the subtree.",
      nodes: [
        { val: "A", left: "A_L", right: "B_L", height: 2, cx: 100, cy: 100, label: "y" },
        { val: "B", left: "A", right: "C", height: 3, cx: 180, cy: 40, label: "x" },
        { val: "C", left: "C_L", right: "C_R", height: 1, cx: 240, cy: 100 },
      ],
      subtrees: [
        { label: "A_L", cx: 60, cy: 150 },
        { label: "B_L", cx: 140, cy: 150, pointer: "T2" },
        { label: "C_L", cx: 210, cy: 150 },
        { label: "C_R", cx: 270, cy: 150 },
      ],
      connections: [
        { from: [180, 40], to: [100, 100] },
        { from: [180, 40], to: [240, 100] },
        { from: [100, 100], to: [60, 150], isDashed: true },
        { from: [100, 100], to: [140, 150], isDashed: true },
        { from: [240, 100], to: [210, 150], isDashed: true },
        { from: [240, 100], to: [270, 150], isDashed: true },
      ],
      highlightBox: {
        x: 45,
        y: 20,
        w: 245,
        h: 150,
        label: "Heights Corrected",
        lx: 145,
        ly: 15
      },
      code: rrCode,
      highlightedLines: [9, 10, 11, 13]
    }
  ];

  // LR Steps
  const lrSteps: SimulationStep[] = [
    {
      title: "Step 0: Initial State & Setup",
      description: "We identify a Left-Right (LR) zig-zag imbalance at parent root (Node A):\n· root points to Node A\n· root->left points to Node B\n· root->left->right points to Node C\n\nWe are about to execute the first rotation: root->left = RRrotation(root->left);",
      nodes: [
        { val: "A", left: "B", right: "A_R", height: 3, cx: 180, cy: 40, isUnbalanced: true, label: "root" },
        { val: "B", left: "B_L", right: "C", height: 2, cx: 100, cy: 100 },
        { val: "C", left: "C_L", right: "C_R", height: 1, cx: 140, cy: 160 },
      ],
      subtrees: [
        { label: "A_R", cx: 260, cy: 100 },
        { label: "B_L", cx: 60, cy: 160 },
        { label: "C_L", cx: 110, cy: 210, pointer: "C_L" },
        { label: "C_R", cx: 170, cy: 210 },
      ],
      connections: [
        { from: [180, 40], to: [100, 100] },
        { from: [180, 40], to: [260, 100], isDashed: true },
        { from: [100, 100], to: [60, 160], isDashed: true },
        { from: [100, 100], to: [140, 160] },
        { from: [140, 160], to: [110, 210], isDashed: true },
        { from: [140, 160], to: [170, 210], isDashed: true },
      ],
      rotationArrow: {
        d: "M 100,85 Q 70,85 70,115",
        label: "RRrotation(root->left)",
        lx: 60,
        ly: 95,
        textAnchor: "end"
      },
      highlightBox: {
        x: 45,
        y: 20,
        w: 150,
        h: 180,
        label: "Zig-Zag Nodes",
        lx: 50,
        ly: 15
      },
      code: lrCode,
      highlightedLines: [2]
    },
    {
      title: "Step 1: First Rotation (Left Rotate Left Child)",
      description: "This drawing shows the tree after executing: root->left = RRrotation(root->left);\n· Node B (left child) was rotated left around Node C.\n· Node C is now the new left child of root Node A.\n· The zig-zag shape is now simplified into a straight LL case.\n\nWe are about to execute the second rotation: root = LLRoation(root);",
      nodes: [
        { val: "A", left: "C", right: "A_R", height: 3, cx: 180, cy: 40, isUnbalanced: true, label: "root" },
        { val: "C", left: "B", right: "C_R", height: 2, cx: 100, cy: 100, label: "root->left" },
        { val: "B", left: "B_L", right: "C_L", height: 1, cx: 60, cy: 160 },
      ],
      subtrees: [
        { label: "A_R", cx: 260, cy: 100 },
        { label: "B_L", cx: 30, cy: 210 },
        { label: "C_L", cx: 90, cy: 210 },
        { label: "C_R", cx: 140, cy: 160, pointer: "C_R" },
      ],
      connections: [
        { from: [180, 40], to: [100, 100] },
        { from: [180, 40], to: [260, 100], isDashed: true },
        { from: [100, 100], to: [60, 160] },
        { from: [100, 100], to: [140, 160], isDashed: true },
        { from: [60, 160], to: [30, 210], isDashed: true },
        { from: [60, 160], to: [90, 210], isDashed: true },
      ],
      rotationArrow: {
        d: "M 180,15 Q 220,15 220,40",
        label: "LLRoation(root)",
        lx: 230,
        ly: 25,
        textAnchor: "start"
      },
      highlightBox: {
        x: 25,
        y: 20,
        w: 195,
        h: 180,
        label: "Straight LL Case",
        lx: 30,
        ly: 15
      },
      code: lrCode,
      highlightedLines: [3]
    },
    {
      title: "Step 2: Second Rotation (Right Rotate Root)",
      description: "This drawing shows the tree after executing: root = LLRoation(root);\n· Node A was rotated right around Node C.\n· Node C is now the new balanced root of this subtree.\n· We now return root (Node C).\n\nThe double rotation completes, leaving the tree fully balanced.",
      nodes: [
        { val: "B", left: "B_L", right: "C_L", height: 1, cx: 80, cy: 100 },
        { val: "C", left: "B", right: "A", height: 2, cx: 140, cy: 40, label: "root" },
        { val: "A", left: "C_R", right: "A_R", height: 1, cx: 200, cy: 100 },
      ],
      subtrees: [
        { label: "B_L", cx: 50, cy: 150 },
        { label: "C_L", cx: 110, cy: 150 },
        { label: "C_R", cx: 170, cy: 150, pointer: "C_R" },
        { label: "A_R", cx: 230, cy: 150 },
      ],
      connections: [
        { from: [140, 40], to: [80, 100] },
        { from: [140, 40], to: [200, 100] },
        { from: [80, 100], to: [50, 150], isDashed: true },
        { from: [80, 100], to: [110, 150], isDashed: true },
        { from: [200, 100], to: [170, 150], isDashed: true },
        { from: [200, 100], to: [230, 150], isDashed: true },
      ],
      highlightBox: {
        x: 35,
        y: 20,
        w: 210,
        h: 150,
        label: "Balanced Subtree",
        lx: 40,
        ly: 15
      },
      code: lrCode,
      highlightedLines: [4]
    }
  ];

  // RL Steps
  const rlSteps: SimulationStep[] = [
    {
      title: "Step 0: Initial State & Setup",
      description: "We identify a Right-Left (RL) zig-zag imbalance at parent root (Node A):\n· root points to Node A\n· root->right points to Node B\n· root->right->left points to Node C\n\nWe are about to execute the first rotation: root->right = LLRoation(root->right);",
      nodes: [
        { val: "A", left: "A_L", right: "B", height: 3, cx: 140, cy: 40, isUnbalanced: true, label: "root" },
        { val: "B", left: "C", right: "B_R", height: 2, cx: 220, cy: 100 },
        { val: "C", left: "C_L", right: "C_R", height: 1, cx: 180, cy: 160 },
      ],
      subtrees: [
        { label: "A_L", cx: 60, cy: 100 },
        { label: "B_R", cx: 260, cy: 160 },
        { label: "C_L", cx: 150, cy: 210 },
        { label: "C_R", cx: 210, cy: 210, pointer: "T2" },
      ],
      connections: [
        { from: [140, 40], to: [60, 100], isDashed: true },
        { from: [140, 40], to: [220, 100] },
        { from: [220, 100], to: [180, 160] },
        { from: [220, 100], to: [260, 160], isDashed: true },
        { from: [180, 160], to: [150, 210], isDashed: true },
        { from: [180, 160], to: [210, 210], isDashed: true },
      ],
      rotationArrow: {
        d: "M 220,85 Q 250,85 250,115",
        label: "LLRoation(root->right)",
        lx: 260,
        ly: 95,
        textAnchor: "start"
      },
      highlightBox: {
        x: 125,
        y: 20,
        w: 150,
        h: 180,
        label: "Zig-Zag Nodes",
        lx: 130,
        ly: 15
      },
      code: rlCode,
      highlightedLines: [2]
    },
    {
      title: "Step 1: First Rotation (Right Rotate Right Child)",
      description: "This drawing shows the tree after executing: root->right = LLRoation(root->right);\n· Node B (right child) was rotated right around Node C.\n· Node C is now the new right child of root Node A.\n· The zig-zag shape is now simplified into a straight RR case.\n\nWe are about to execute the second rotation: root = RRrotation(root);",
      nodes: [
        { val: "A", left: "A_L", right: "C", height: 3, cx: 140, cy: 40, isUnbalanced: true, label: "root" },
        { val: "C", left: "C_L", right: "B", height: 2, cx: 220, cy: 100, label: "root->right" },
        { val: "B", left: "C_R", right: "B_R", height: 1, cx: 260, cy: 160 },
      ],
      subtrees: [
        { label: "A_L", cx: 60, cy: 100 },
        { label: "C_L", cx: 180, cy: 160, pointer: "T2" },
        { label: "C_R", cx: 230, cy: 210 },
        { label: "B_R", cx: 290, cy: 210 },
      ],
      connections: [
        { from: [140, 40], to: [60, 100], isDashed: true },
        { from: [140, 40], to: [220, 100] },
        { from: [220, 100], to: [180, 160], isDashed: true },
        { from: [220, 100], to: [260, 160] },
        { from: [260, 160], to: [230, 210], isDashed: true },
        { from: [260, 160], to: [290, 210], isDashed: true },
      ],
      rotationArrow: {
        d: "M 140,15 Q 100,15 100,40",
        label: "RRrotation(root)",
        lx: 90,
        ly: 25,
        textAnchor: "end"
      },
      highlightBox: {
        x: 120,
        y: 20,
        w: 185,
        h: 180,
        label: "Straight RR Case",
        lx: 130,
        ly: 15
      },
      code: rlCode,
      highlightedLines: [3]
    },
    {
      title: "Step 2: Second Rotation (Left Rotate Root)",
      description: "This drawing shows the tree after executing: root = RRrotation(root);\n· Node A was rotated left around Node C.\n· Node C is now the new balanced root of this subtree.\n· We now return root (Node C).\n\nThe double rotation completes, leaving the tree fully balanced.",
      nodes: [
        { val: "A", left: "A_L", right: "C_L", height: 1, cx: 120, cy: 100 },
        { val: "C", left: "A", right: "B", height: 2, cx: 180, cy: 40, label: "root" },
        { val: "B", left: "C_R", right: "B_R", height: 1, cx: 240, cy: 100 },
      ],
      subtrees: [
        { label: "A_L", cx: 90, cy: 150 },
        { label: "C_L", cx: 150, cy: 150, pointer: "T2" },
        { label: "C_R", cx: 210, cy: 150 },
        { label: "B_R", cx: 270, cy: 150 },
      ],
      connections: [
        { from: [180, 40], to: [120, 100] },
        { from: [180, 40], to: [240, 100] },
        { from: [120, 100], to: [90, 150], isDashed: true },
        { from: [120, 100], to: [150, 150], isDashed: true },
        { from: [240, 100], to: [210, 150], isDashed: true },
        { from: [240, 100], to: [270, 150], isDashed: true },
      ],
      highlightBox: {
        x: 75,
        y: 20,
        w: 210,
        h: 150,
        label: "Balanced Subtree",
        lx: 80,
        ly: 15
      },
      code: rlCode,
      highlightedLines: [4]
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

  const handleNext = () => {
    if (step < stepsData.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(0);
  };

  // Standard preview C++ Code to show in inline card
  const previewCodeLines = activeTab === "ll" ? llCode : activeTab === "rr" ? rrCode : activeTab === "lr" ? lrCode : rlCode;

  const visualizerContent = (
    <div className="w-full flex flex-col gap-4 font-serif flex-1 min-h-0">
      {/* 1. Simulation Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DDD7CC]/50 pb-3 select-none">
        <div>
          <h4 className="text-xs font-extrabold text-[#232323] uppercase tracking-wide">
            AVL Rotations Simulator
          </h4>
          <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Step-by-step visual of the four AVL tree balancing rotations."
          </p>
        </div>
        
        {/* Controls Toolbar */}
        <div className="flex items-center gap-2">
          {/* Focus mode toggle */}
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1.5 border border-[#DDD7CC] rounded-sm text-[10px] font-bold bg-white text-[#666666] hover:bg-[#F4F1EA] cursor-pointer"
            title={isMaximized ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleReset}
            disabled={step === 0}
            className={`p-1.5 border border-[#DDD7CC] rounded-sm text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 cursor-pointer transition-colors ${
              step === 0
                ? "opacity-40 cursor-not-allowed"
                : "bg-white text-[#666666] hover:bg-[#F4F1EA]"
            }`}
            title="Reset Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handlePrev}
            disabled={step === 0}
            className={`px-2.5 py-1.5 border border-[#DDD7CC] rounded-sm text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 cursor-pointer transition-colors ${
              step === 0
                ? "opacity-40 cursor-not-allowed"
                : "bg-white text-[#232323] hover:bg-[#F4F1EA]"
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Prev
          </button>

          <button
            onClick={handleNext}
            disabled={step === stepsData.length - 1}
            className={`px-2.5 py-1.5 border border-[#3F51B5] rounded-sm text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 cursor-pointer transition-colors ${
              step === stepsData.length - 1
                ? "opacity-40 cursor-not-allowed"
                : "bg-[#3F51B5] text-white hover:bg-[#3F51B5]/90"
            }`}
          >
            Next
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <span className="text-[10px] font-mono font-bold bg-[#F4F1EA] px-2 py-1 border border-[#DDD7CC] rounded-sm text-[#666666] shrink-0">
            {step} / {stepsData.length - 1}
          </span>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="flex gap-1 border-b border-[#DDD7CC]/50 pb-1 select-none">
        {[
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
            className={`px-3 py-1.5 text-xs font-mono border transition-all cursor-pointer ${
              activeTab === tab.id
                ? "border-[#3F51B5] bg-[#3F51B5]/5 text-[#3F51B5] font-bold"
                : "border-transparent text-secondary-foreground hover:bg-[#F4F1EA]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 2. Main Simulation Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch flex-1 min-h-0">
        
        {/* Left Column: C++ Source Code (spanning 5/12) */}
        <div className="lg:col-span-5 flex flex-col h-full min-h-0 bg-[#FCFBF8] border border-[#DDD7CC] rounded-sm p-4 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#666666] block font-serif">
            C++ Code Execution
          </span>
          <pre className="text-[10px] font-mono bg-[#fafafa] p-3 rounded-sm overflow-auto leading-relaxed border border-[#DDD7CC]/50 text-left select-all flex-1 min-h-0">
            {currentStepData.code.map((line, lIdx) => {
              const isHighlighted = currentStepData.highlightedLines.includes(lIdx + 1);
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
                  {currentStepData.title}
                </span>
                <span className="text-[10px] text-[#666666] font-mono">
                  Step {step + 1} of {stepsData.length}
                </span>
              </div>

              <svg width="320" height="230" className="overflow-visible font-mono text-[10px] font-bold">
                {/* Backdrop grids */}
                <line x1="0" y1="40" x2="320" y2="40" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
                <line x1="0" y1="100" x2="320" y2="100" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
                <line x1="0" y1="150" x2="320" y2="150" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />

                {/* Nodes Highlight Box */}
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

                {/* Connections */}
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
                    {/* Reference variable label next to subtree */}
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
                    {/* Variable name overlay */}
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
            </div>

            {/* Step Explanation Card (spanning 40% width on row) */}
            <div className="bg-[#FCFBF8] border border-[#DDD7CC] rounded-sm p-4 space-y-2 sm:w-[40%] flex flex-col justify-start">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#666666] block font-serif">
                Step Description
              </span>
              <p className="text-[12px] text-[#232323] leading-relaxed whitespace-pre-line font-mono font-bold bg-[#F4F1EA]/30 p-2.5 border border-[#DDD7CC]/50 rounded-sm select-none">
                {currentStepData.description}
              </p>
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

          {/* Maximized Modal Container matching standard SimulationEngine structure */}
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
                C++ Rotation Source Code
              </span>
              <pre className="text-[9px] font-mono bg-[#fafafa] p-2 border border-[#DDD7CC]/30 rounded-sm overflow-auto leading-relaxed text-left flex-1 select-all">
                {previewCodeLines.map((line, idx) => (
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
                  Rotation Simulator
                </h5>
                <p className="text-[11px] md:text-xs text-[#666666] leading-relaxed font-serif max-w-[240px]">
                  This interactive tool lets you step through AVL tree rotations line-by-line. 
                  You can inspect pointer reassignments and visual height updates in real-time.
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
