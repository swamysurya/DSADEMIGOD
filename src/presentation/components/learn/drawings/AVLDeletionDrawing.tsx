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
  isDeleted?: boolean;
  isHighlighted?: boolean;
  label?: string;
}

interface ConnectionState {
  from: [number, number];
  to: [number, number];
  isDashed?: boolean;
  isRed?: boolean;
}

interface SimulationStep {
  title: string;
  description: string;
  nodes: NodeState[];
  connections: ConnectionState[];
  rotationArrow?: {
    path: string;
    label: string;
    lx: number;
    ly: number;
  };
  highlightBox?: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

export default function AVLDeletionDrawing() {
  const [activeTab, setActiveTab] = useState<"cases" | "sequence">("cases");
  const [caseTab, setCaseTab] = useState<"leaf" | "single" | "double">("leaf");
  const [step, setStep] = useState(0);

  // TAB 1: Conceptual Cases Data (Before and After structures)
  const caseData: Record<
    "leaf" | "single" | "double",
    {
      beforeDesc: string;
      afterDesc: string;
      beforeNodes: NodeState[];
      beforeConns: ConnectionState[];
      afterNodes: NodeState[];
      afterConns: ConnectionState[];
    }
  > = {
    leaf: {
      beforeDesc: "// Case 1: Target Node 8 has no children\nif (root->left == nullptr && root->right == nullptr) {\n    delete root;\n    return nullptr;\n}",
      afterDesc: "// Result: Node 8 is deleted.\n// Parent Node 7's right pointer is now nullptr.",
      beforeNodes: [
        { val: 11, left: "7", right: "12", height: 2, cx: 110, cy: 30 },
        { val: 7, left: "4", right: "8", height: 1, cx: 60, cy: 75 },
        { val: 12, left: "", right: "", height: 0, cx: 160, cy: 75 },
        { val: 4, left: "", right: "", height: 0, cx: 30, cy: 120 },
        { val: 8, left: "", right: "", height: 0, cx: 90, cy: 120, isUnbalanced: true, label: "Delete" },
      ],
      beforeConns: [
        { from: [110, 30], to: [60, 75] },
        { from: [110, 30], to: [160, 75] },
        { from: [60, 75], to: [30, 120] },
        { from: [60, 75], to: [90, 120] },
      ],
      afterNodes: [
        { val: 11, left: "7", right: "12", height: 2, cx: 110, cy: 30 },
        { val: 7, left: "4", right: "", height: 1, cx: 60, cy: 75 },
        { val: 12, left: "", right: "", height: 0, cx: 160, cy: 75 },
        { val: 4, left: "", right: "", height: 0, cx: 30, cy: 120 },
      ],
      afterConns: [
        { from: [110, 30], to: [60, 75] },
        { from: [110, 30], to: [160, 75] },
        { from: [60, 75], to: [30, 120] },
      ]
    },
    single: {
      beforeDesc: "// Case 2: Target Node 7 has only left child (Node 4)\nelse if (root->right == nullptr) {\n    Node* temp = root->left;\n    delete root;\n    return temp;\n}",
      afterDesc: "// Result: Node 7 is deleted.\n// Node 4 rises to take Node 7's place directly.",
      beforeNodes: [
        { val: 11, left: "7", right: "12", height: 2, cx: 110, cy: 30 },
        { val: 7, left: "4", right: "", height: 1, cx: 60, cy: 75, isUnbalanced: true, label: "Delete" },
        { val: 12, left: "", right: "", height: 0, cx: 160, cy: 75 },
        { val: 4, left: "", right: "", height: 0, cx: 30, cy: 120, isHighlighted: true },
      ],
      beforeConns: [
        { from: [110, 30], to: [60, 75] },
        { from: [110, 30], to: [160, 75] },
        { from: [60, 75], to: [30, 120] },
      ],
      afterNodes: [
        { val: 11, left: "4", right: "12", height: 2, cx: 110, cy: 30 },
        { val: 4, left: "", right: "", height: 0, cx: 60, cy: 75, isHighlighted: true },
        { val: 12, left: "", right: "", height: 0, cx: 160, cy: 75 },
      ],
      afterConns: [
        { from: [110, 30], to: [60, 75] },
        { from: [110, 30], to: [160, 75] },
      ]
    },
    double: {
      beforeDesc: "// Case 3: Target Node 11 has left and right subtrees\nelse {\n    Node* temp = getMinNode(root->right); // Successor 12\n    root->data = temp->data; // Copy value\n    root->right = deleteNode(root->right, temp->data); // Delete 12\n}",
      afterDesc: "// Result: Node 11's value is replaced by successor 12.\n// Node 12's old position is deleted; Node 13 rises.",
      beforeNodes: [
        { val: 11, left: "7", right: "12", height: 2, cx: 110, cy: 30, isUnbalanced: true, label: "Delete" },
        { val: 7, left: "4", right: "", height: 1, cx: 60, cy: 75 },
        { val: 12, left: "", right: "13", height: 1, cx: 160, cy: 75, isHighlighted: true, label: "Successor" },
        { val: 4, left: "", right: "", height: 0, cx: 30, cy: 120 },
        { val: 13, left: "", right: "", height: 0, cx: 180, cy: 120 },
      ],
      beforeConns: [
        { from: [110, 30], to: [60, 75] },
        { from: [110, 30], to: [160, 75] },
        { from: [60, 75], to: [30, 120] },
        { from: [160, 75], to: [180, 120] },
      ],
      afterNodes: [
        { val: 12, left: "7", right: "13", height: 2, cx: 110, cy: 30, isHighlighted: true, label: "Value Replaced" },
        { val: 7, left: "4", right: "", height: 1, cx: 60, cy: 75 },
        { val: 13, left: "", right: "", height: 0, cx: 160, cy: 75, isHighlighted: true },
        { val: 4, left: "", right: "", height: 0, cx: 30, cy: 120 },
      ],
      afterConns: [
        { from: [110, 30], to: [60, 75] },
        { from: [110, 30], to: [160, 75] },
        { from: [60, 75], to: [30, 120] },
      ]
    }
  };

  // TAB 2: Sequence Deletes with full internal algorithm sub-steps
  const sequenceSteps: SimulationStep[] = [
    {
      title: "Step 0: Initial AVL Tree",
      description: "// Initial constructed AVL Tree\n// Sequence inserted: 14, 11, 19, 7, 12, 17, 53, 4, 8, 13, 16, 20, 60\n// Heights and Balance Factors are fully balanced.",
      nodes: [
        { val: 14, left: "11", right: "19", height: 3, cx: 250, cy: 30 },
        { val: 11, left: "7", right: "12", height: 2, cx: 140, cy: 75 },
        { val: 19, left: "17", right: "53", height: 2, cx: 360, cy: 75 },
        { val: 7, left: "4", right: "8", height: 1, cx: 80, cy: 120 },
        { val: 12, left: "", right: "13", height: 1, cx: 200, cy: 120 },
        { val: 17, left: "16", right: "", height: 1, cx: 300, cy: 120 },
        { val: 53, left: "20", right: "60", height: 1, cx: 420, cy: 120 },
        { val: 4, left: "", right: "", height: 0, cx: 50, cy: 165 },
        { val: 8, left: "", right: "", height: 0, cx: 110, cy: 165 },
        { val: 13, left: "", right: "", height: 0, cx: 230, cy: 165 },
        { val: 16, left: "", right: "", height: 0, cx: 270, cy: 165 },
        { val: 20, left: "", right: "", height: 0, cx: 390, cy: 165 },
        { val: 60, left: "", right: "", height: 0, cx: 450, cy: 165 },
      ],
      connections: [
        { from: [250, 30], to: [140, 75] },
        { from: [250, 30], to: [360, 75] },
        { from: [140, 75], to: [80, 120] },
        { from: [140, 75], to: [200, 120] },
        { from: [360, 75], to: [300, 120] },
        { from: [360, 75], to: [420, 120] },
        { from: [80, 120], to: [50, 165] },
        { from: [80, 120], to: [110, 165] },
        { from: [200, 120], to: [230, 165] },
        { from: [300, 120], to: [270, 165] },
        { from: [420, 120], to: [390, 165] },
        { from: [420, 120], to: [450, 165] },
      ]
    },
    // DELETION 1: DELETE NODE 8
    {
      title: "Step 1.1: Locate Node 8",
      description: "// 1. Search for value 8\n// Go left of 14, left of 11, right of 7 -> Found.\nNode* target = root->left->left->right;",
      nodes: [
        { val: 14, left: "11", right: "19", height: 3, cx: 250, cy: 30 },
        { val: 11, left: "7", right: "12", height: 2, cx: 140, cy: 75 },
        { val: 19, left: "17", right: "53", height: 2, cx: 360, cy: 75 },
        { val: 7, left: "4", right: "8", height: 1, cx: 80, cy: 120 },
        { val: 12, left: "", right: "13", height: 1, cx: 200, cy: 120 },
        { val: 17, left: "16", right: "", height: 1, cx: 300, cy: 120 },
        { val: 53, left: "20", right: "60", height: 1, cx: 420, cy: 120 },
        { val: 4, left: "", right: "", height: 0, cx: 50, cy: 165 },
        { val: 8, left: "", right: "", height: 0, cx: 110, cy: 165, isHighlighted: true, label: "Locate Node 8" },
        { val: 13, left: "", right: "", height: 0, cx: 230, cy: 165 },
        { val: 16, left: "", right: "", height: 0, cx: 270, cy: 165 },
        { val: 20, left: "", right: "", height: 0, cx: 390, cy: 165 },
        { val: 60, left: "", right: "", height: 0, cx: 450, cy: 165 },
      ],
      connections: [
        { from: [250, 30], to: [140, 75] },
        { from: [250, 30], to: [360, 75] },
        { from: [140, 75], to: [80, 120] },
        { from: [140, 75], to: [200, 120] },
        { from: [360, 75], to: [300, 120] },
        { from: [360, 75], to: [420, 120] },
        { from: [80, 120], to: [50, 165] },
        { from: [80, 120], to: [110, 165] },
        { from: [200, 120], to: [230, 165] },
        { from: [300, 120], to: [270, 165] },
        { from: [420, 120], to: [390, 165] },
        { from: [420, 120], to: [450, 165] },
      ]
    },
    {
      title: "Step 1.2: Remove Node 8",
      description: "// 2. Node 8 has no children (Leaf node)\ndelete root; // Delete Node 8\nreturn nullptr; // parent pointer 7->right = nullptr;",
      nodes: [
        { val: 14, left: "11", right: "19", height: 3, cx: 250, cy: 30 },
        { val: 11, left: "7", right: "12", height: 2, cx: 140, cy: 75 },
        { val: 19, left: "17", right: "53", height: 2, cx: 360, cy: 75 },
        { val: 7, left: "4", right: "", height: 1, cx: 80, cy: 120 },
        { val: 12, left: "", right: "13", height: 1, cx: 200, cy: 120 },
        { val: 17, left: "16", right: "", height: 1, cx: 300, cy: 120 },
        { val: 53, left: "20", right: "60", height: 1, cx: 420, cy: 120 },
        { val: 4, left: "", right: "", height: 0, cx: 50, cy: 165 },
        { val: 8, left: "", right: "", height: 0, cx: 110, cy: 165, isDeleted: true },
        { val: 13, left: "", right: "", height: 0, cx: 230, cy: 165 },
        { val: 16, left: "", right: "", height: 0, cx: 270, cy: 165 },
        { val: 20, left: "", right: "", height: 0, cx: 390, cy: 165 },
        { val: 60, left: "", right: "", height: 0, cx: 450, cy: 165 },
      ],
      connections: [
        { from: [250, 30], to: [140, 75] },
        { from: [250, 30], to: [360, 75] },
        { from: [140, 75], to: [80, 120] },
        { from: [140, 75], to: [200, 120] },
        { from: [360, 75], to: [300, 120] },
        { from: [360, 75], to: [420, 120] },
        { from: [80, 120], to: [50, 165] },
        { from: [80, 120], to: [110, 165], isDashed: true, isRed: true }, // deleted
        { from: [200, 120], to: [230, 165] },
        { from: [300, 120], to: [270, 165] },
        { from: [420, 120], to: [390, 165] },
        { from: [420, 120], to: [450, 165] },
      ]
    },
    {
      title: "Step 1.3: Update Height & BF of Node 7",
      description: "// 3. Backtracking: Update heights & check balance\nroot->height = 1 + std::max(h(L), h(R));\nint balance = getBalanceOfNode(7); // BF = 1 - 0 = +1 (Balanced)",
      nodes: [
        { val: 14, left: "11", right: "19", height: 3, cx: 250, cy: 30 },
        { val: 11, left: "7", right: "12", height: 2, cx: 140, cy: 75 },
        { val: 19, left: "17", right: "53", height: 2, cx: 360, cy: 75 },
        { val: 7, left: "4", right: "", height: 1, cx: 80, cy: 120, isHighlighted: true },
        { val: 12, left: "", right: "13", height: 1, cx: 200, cy: 120 },
        { val: 17, left: "16", right: "", height: 1, cx: 300, cy: 120 },
        { val: 53, left: "20", right: "60", height: 1, cx: 420, cy: 120 },
        { val: 4, left: "", right: "", height: 0, cx: 50, cy: 165 },
        { val: 13, left: "", right: "", height: 0, cx: 230, cy: 165 },
        { val: 16, left: "", right: "", height: 0, cx: 270, cy: 165 },
        { val: 20, left: "", right: "", height: 0, cx: 390, cy: 165 },
        { val: 60, left: "", right: "", height: 0, cx: 450, cy: 165 },
      ],
      connections: [
        { from: [250, 30], to: [140, 75] },
        { from: [250, 30], to: [360, 75] },
        { from: [140, 75], to: [80, 120] },
        { from: [140, 75], to: [200, 120] },
        { from: [360, 75], to: [300, 120] },
        { from: [360, 75], to: [420, 120] },
        { from: [80, 120], to: [50, 165] },
        { from: [200, 120], to: [230, 165] },
        { from: [300, 120], to: [270, 165] },
        { from: [420, 120], to: [390, 165] },
        { from: [420, 120], to: [450, 165] },
      ]
    },
    // DELETION 2: DELETE NODE 7
    {
      title: "Step 2.1: Locate Node 7",
      description: "// 1. Search for value 7\n// Go left of 14, left of 11 -> Found.\nNode* target = root->left->left;",
      nodes: [
        { val: 14, left: "11", right: "19", height: 3, cx: 250, cy: 30 },
        { val: 11, left: "7", right: "12", height: 2, cx: 140, cy: 75 },
        { val: 19, left: "17", right: "53", height: 2, cx: 360, cy: 75 },
        { val: 7, left: "4", right: "", height: 1, cx: 80, cy: 120, isHighlighted: true, label: "Locate Node 7" },
        { val: 12, left: "", right: "13", height: 1, cx: 200, cy: 120 },
        { val: 17, left: "16", right: "", height: 1, cx: 300, cy: 120 },
        { val: 53, left: "20", right: "60", height: 1, cx: 420, cy: 120 },
        { val: 4, left: "", right: "", height: 0, cx: 50, cy: 165 },
        { val: 13, left: "", right: "", height: 0, cx: 230, cy: 165 },
        { val: 16, left: "", right: "", height: 0, cx: 270, cy: 165 },
        { val: 20, left: "", right: "", height: 0, cx: 390, cy: 165 },
        { val: 60, left: "", right: "", height: 0, cx: 450, cy: 165 },
      ],
      connections: [
        { from: [250, 30], to: [140, 75] },
        { from: [250, 30], to: [360, 75] },
        { from: [140, 75], to: [80, 120] },
        { from: [140, 75], to: [200, 120] },
        { from: [360, 75], to: [300, 120] },
        { from: [360, 75], to: [420, 120] },
        { from: [80, 120], to: [50, 165] },
        { from: [200, 120], to: [230, 165] },
        { from: [300, 120], to: [270, 165] },
        { from: [420, 120], to: [390, 165] },
        { from: [420, 120], to: [450, 165] },
      ]
    },
    {
      title: "Step 2.2: Remove Node 7 & Bypass",
      description: "// 2. Node 7 has only one child (Node 4)\nNode* temp = root->left; // Node 4\ndelete root; // Delete Node 7\nreturn temp; // parent pointer 11->left = Node 4;",
      nodes: [
        { val: 14, left: "11", right: "19", height: 3, cx: 250, cy: 30 },
        { val: 11, left: "4", right: "12", height: 2, cx: 140, cy: 75 },
        { val: 19, left: "17", right: "53", height: 2, cx: 360, cy: 75 },
        { val: 7, left: "4", right: "", height: 1, cx: 80, cy: 120, isDeleted: true },
        { val: 12, left: "", right: "13", height: 1, cx: 200, cy: 120 },
        { val: 17, left: "16", right: "", height: 1, cx: 300, cy: 120 },
        { val: 53, left: "20", right: "60", height: 1, cx: 420, cy: 120 },
        { val: 4, left: "", right: "", height: 0, cx: 50, cy: 165, isHighlighted: true },
        { val: 13, left: "", right: "", height: 0, cx: 230, cy: 165 },
        { val: 16, left: "", right: "", height: 0, cx: 270, cy: 165 },
        { val: 20, left: "", right: "", height: 0, cx: 390, cy: 165 },
        { val: 60, left: "", right: "", height: 0, cx: 450, cy: 165 },
      ],
      connections: [
        { from: [250, 30], to: [140, 75] },
        { from: [250, 30], to: [360, 75] },
        { from: [140, 75], to: [80, 120], isDashed: true, isRed: true }, // deleted
        { from: [80, 120], to: [50, 165], isDashed: true, isRed: true }, // deleted
        { from: [140, 75], to: [50, 165], isDashed: true }, // bypass link
        { from: [140, 75], to: [200, 120] },
        { from: [360, 75], to: [300, 120] },
        { from: [360, 75], to: [420, 120] },
        { from: [200, 120], to: [230, 165] },
        { from: [300, 120], to: [270, 165] },
        { from: [420, 120], to: [390, 165] },
        { from: [420, 120], to: [450, 165] },
      ]
    },
    {
      title: "Step 2.3: Update Height & BF of Node 11",
      description: "// 3. Backtracking: Update heights & check balance\nroot->height = 1 + std::max(h(L), h(R));\nint balance = getBalanceOfNode(11); // BF = 1 - 2 = -1 (Balanced)",
      nodes: [
        { val: 14, left: "11", right: "19", height: 3, cx: 250, cy: 30 },
        { val: 11, left: "4", right: "12", height: 2, cx: 140, cy: 75, isHighlighted: true },
        { val: 19, left: "17", right: "53", height: 2, cx: 360, cy: 75 },
        { val: 12, left: "", right: "13", height: 1, cx: 200, cy: 120 },
        { val: 17, left: "16", right: "", height: 1, cx: 300, cy: 120 },
        { val: 53, left: "20", right: "60", height: 1, cx: 420, cy: 120 },
        { val: 4, left: "", right: "", height: 0, cx: 50, cy: 165 },
        { val: 13, left: "", right: "", height: 0, cx: 230, cy: 165 },
        { val: 16, left: "", right: "", height: 0, cx: 270, cy: 165 },
        { val: 20, left: "", right: "", height: 0, cx: 390, cy: 165 },
        { val: 60, left: "", right: "", height: 0, cx: 450, cy: 165 },
      ],
      connections: [
        { from: [250, 30], to: [140, 75] },
        { from: [250, 30], to: [360, 75] },
        { from: [140, 75], to: [50, 165] }, // 11 -> 4
        { from: [140, 75], to: [200, 120] },
        { from: [360, 75], to: [300, 120] },
        { from: [360, 75], to: [420, 120] },
        { from: [200, 120], to: [230, 165] },
        { from: [300, 120], to: [270, 165] },
        { from: [420, 120], to: [390, 165] },
        { from: [420, 120], to: [450, 165] },
      ]
    },
    // DELETION 3: DELETE NODE 11
    {
      title: "Step 3.1: Locate Node 11",
      description: "// 1. Search for value 11\n// Go left of 14 -> Found.\nNode* target = root->left;",
      nodes: [
        { val: 14, left: "11", right: "19", height: 3, cx: 250, cy: 30 },
        { val: 11, left: "4", right: "12", height: 2, cx: 140, cy: 75, isHighlighted: true, label: "Locate Node 11" },
        { val: 19, left: "17", right: "53", height: 2, cx: 360, cy: 75 },
        { val: 12, left: "", right: "13", height: 1, cx: 200, cy: 120 },
        { val: 17, left: "16", right: "", height: 1, cx: 300, cy: 120 },
        { val: 53, left: "20", right: "60", height: 1, cx: 420, cy: 120 },
        { val: 4, left: "", right: "", height: 0, cx: 50, cy: 165 },
        { val: 13, left: "", right: "", height: 0, cx: 230, cy: 165 },
        { val: 16, left: "", right: "", height: 0, cx: 270, cy: 165 },
        { val: 20, left: "", right: "", height: 0, cx: 390, cy: 165 },
        { val: 60, left: "", right: "", height: 0, cx: 450, cy: 165 },
      ],
      connections: [
        { from: [250, 30], to: [140, 75] },
        { from: [250, 30], to: [360, 75] },
        { from: [140, 75], to: [50, 165] },
        { from: [140, 75], to: [200, 120] },
        { from: [360, 75], to: [300, 120] },
        { from: [360, 75], to: [420, 120] },
        { from: [200, 120], to: [230, 165] },
        { from: [300, 120], to: [270, 165] },
        { from: [420, 120], to: [390, 165] },
        { from: [420, 120], to: [450, 165] },
      ]
    },
    {
      title: "Step 3.2: Find Inorder Successor",
      description: "// 2. Node 11 has left and right subtrees\n// Find inorder successor (smallest in right subtree)\nNode* successor = getMinNode(root->right); // Node 12",
      nodes: [
        { val: 14, left: "11", right: "19", height: 3, cx: 250, cy: 30 },
        { val: 11, left: "4", right: "12", height: 2, cx: 140, cy: 75, isHighlighted: true },
        { val: 19, left: "17", right: "53", height: 2, cx: 360, cy: 75 },
        { val: 12, left: "", right: "13", height: 1, cx: 200, cy: 120, isHighlighted: true, label: "Successor" },
        { val: 17, left: "16", right: "", height: 1, cx: 300, cy: 120 },
        { val: 53, left: "20", right: "60", height: 1, cx: 420, cy: 120 },
        { val: 4, left: "", right: "", height: 0, cx: 50, cy: 165 },
        { val: 13, left: "", right: "", height: 0, cx: 230, cy: 165 },
        { val: 16, left: "", right: "", height: 0, cx: 270, cy: 165 },
        { val: 20, left: "", right: "", height: 0, cx: 390, cy: 165 },
        { val: 60, left: "", right: "", height: 0, cx: 450, cy: 165 },
      ],
      connections: [
        { from: [250, 30], to: [140, 75] },
        { from: [250, 30], to: [360, 75] },
        { from: [140, 75], to: [50, 165] },
        { from: [140, 75], to: [200, 120] },
        { from: [360, 75], to: [300, 120] },
        { from: [360, 75], to: [420, 120] },
        { from: [200, 120], to: [230, 165] },
        { from: [300, 120], to: [270, 165] },
        { from: [420, 120], to: [390, 165] },
        { from: [420, 120], to: [450, 165] },
      ]
    },
    {
      title: "Step 3.3: Copy Successor Value",
      description: "// 3. Copy successor's value into node\nroot->data = successor->data; // value becomes 12",
      nodes: [
        { val: 14, left: "12", right: "19", height: 3, cx: 250, cy: 30 },
        { val: 12, left: "4", right: "12", height: 2, cx: 140, cy: 75, isHighlighted: true, label: "Succ. Copied" },
        { val: 19, left: "17", right: "53", height: 2, cx: 360, cy: 75 },
        { val: 12, left: "", right: "13", height: 1, cx: 200, cy: 120, isHighlighted: true },
        { val: 17, left: "16", right: "", height: 1, cx: 300, cy: 120 },
        { val: 53, left: "20", right: "60", height: 1, cx: 420, cy: 120 },
        { val: 4, left: "", right: "", height: 0, cx: 50, cy: 165 },
        { val: 13, left: "", right: "", height: 0, cx: 230, cy: 165 },
        { val: 16, left: "", right: "", height: 0, cx: 270, cy: 165 },
        { val: 20, left: "", right: "", height: 0, cx: 390, cy: 165 },
        { val: 60, left: "", right: "", height: 0, cx: 450, cy: 165 },
      ],
      connections: [
        { from: [250, 30], to: [140, 75] },
        { from: [250, 30], to: [360, 75] },
        { from: [140, 75], to: [50, 165] },
        { from: [140, 75], to: [200, 120] },
        { from: [360, 75], to: [300, 120] },
        { from: [360, 75], to: [420, 120] },
        { from: [200, 120], to: [230, 165] },
        { from: [300, 120], to: [270, 165] },
        { from: [420, 120], to: [390, 165] },
        { from: [420, 120], to: [450, 165] },
      ]
    },
    {
      title: "Step 3.4: Delete Successor Position",
      description: "// 4. Recursively delete successor node\nroot->right = deleteNode(root->right, 12);\n// Old Node 12 deleted, bypassed to Node 13.",
      nodes: [
        { val: 14, left: "12", right: "19", height: 3, cx: 250, cy: 30 },
        { val: 12, left: "4", right: "13", height: 2, cx: 140, cy: 75 },
        { val: 19, left: "17", right: "53", height: 2, cx: 360, cy: 75 },
        { val: 12, left: "", right: "13", height: 1, cx: 200, cy: 120, isDeleted: true },
        { val: 17, left: "16", right: "", height: 1, cx: 300, cy: 120 },
        { val: 53, left: "20", right: "60", height: 1, cx: 420, cy: 120 },
        { val: 4, left: "", right: "", height: 0, cx: 50, cy: 165 },
        { val: 13, left: "", right: "", height: 0, cx: 230, cy: 165, isHighlighted: true },
        { val: 16, left: "", right: "", height: 0, cx: 270, cy: 165 },
        { val: 20, left: "", right: "", height: 0, cx: 390, cy: 165 },
        { val: 60, left: "", right: "", height: 0, cx: 450, cy: 165 },
      ],
      connections: [
        { from: [250, 30], to: [140, 75] },
        { from: [250, 30], to: [360, 75] },
        { from: [140, 75], to: [50, 165] },
        { from: [140, 75], to: [200, 120], isDashed: true, isRed: true }, // deleted
        { from: [200, 120], to: [230, 165], isDashed: true, isRed: true }, // deleted
        { from: [140, 75], to: [230, 165], isDashed: true }, // bypasssuccessor link
        { from: [360, 75], to: [300, 120] },
        { from: [360, 75], to: [420, 120] },
        { from: [300, 120], to: [270, 165] },
        { from: [420, 120], to: [390, 165] },
        { from: [420, 120], to: [450, 165] },
      ]
    },
    {
      title: "Step 3.5: Update Height & BF of Node 12",
      description: "// 5. Backtracking: Update heights & check balance\nroot->height = 1 + std::max(h(L), h(R));\nint balance = getBalanceOfNode(12); // BF = 1 - 1 = 0 (Balanced)",
      nodes: [
        { val: 14, left: "12", right: "19", height: 3, cx: 250, cy: 30 },
        { val: 12, left: "4", right: "13", height: 2, cx: 140, cy: 75, isHighlighted: true },
        { val: 19, left: "17", right: "53", height: 2, cx: 360, cy: 75 },
        { val: 17, left: "16", right: "", height: 1, cx: 300, cy: 120 },
        { val: 53, left: "20", right: "60", height: 1, cx: 420, cy: 120 },
        { val: 4, left: "", right: "", height: 0, cx: 50, cy: 165 },
        { val: 13, left: "", right: "", height: 0, cx: 230, cy: 165 },
        { val: 16, left: "", right: "", height: 0, cx: 270, cy: 165 },
        { val: 20, left: "", right: "", height: 0, cx: 390, cy: 165 },
        { val: 60, left: "", right: "", height: 0, cx: 450, cy: 165 },
      ],
      connections: [
        { from: [250, 30], to: [140, 75] },
        { from: [250, 30], to: [360, 75] },
        { from: [140, 75], to: [50, 165] },
        { from: [140, 75], to: [230, 165] },
        { from: [360, 75], to: [300, 120] },
        { from: [360, 75], to: [420, 120] },
        { from: [300, 120], to: [270, 165] },
        { from: [420, 120], to: [390, 165] },
        { from: [420, 120], to: [450, 165] },
      ]
    },
    // DELETION 4: DELETE NODE 14 (ROOT)
    {
      title: "Step 4.1: Locate Root Node 14",
      description: "// 1. Search for value 14\n// Node 14 is the root node -> Found.\nNode* target = root;",
      nodes: [
        { val: 14, left: "12", right: "19", height: 3, cx: 250, cy: 30, isHighlighted: true, label: "Locate Root 14" },
        { val: 12, left: "4", right: "13", height: 2, cx: 140, cy: 75 },
        { val: 19, left: "17", right: "53", height: 2, cx: 360, cy: 75 },
        { val: 17, left: "16", right: "", height: 1, cx: 300, cy: 120 },
        { val: 53, left: "20", right: "60", height: 1, cx: 420, cy: 120 },
        { val: 4, left: "", right: "", height: 0, cx: 50, cy: 165 },
        { val: 13, left: "", right: "", height: 0, cx: 230, cy: 165 },
        { val: 16, left: "", right: "", height: 0, cx: 270, cy: 165 },
        { val: 20, left: "", right: "", height: 0, cx: 390, cy: 165 },
        { val: 60, left: "", right: "", height: 0, cx: 450, cy: 165 },
      ],
      connections: [
        { from: [250, 30], to: [140, 75] },
        { from: [250, 30], to: [360, 75] },
        { from: [140, 75], to: [50, 165] },
        { from: [140, 75], to: [230, 165] },
        { from: [360, 75], to: [300, 120] },
        { from: [360, 75], to: [420, 120] },
        { from: [300, 120], to: [270, 165] },
        { from: [420, 120], to: [390, 165] },
        { from: [420, 120], to: [450, 165] },
      ]
    },
    {
      title: "Step 4.2: Find Inorder Successor of Root",
      description: "// 2. Root 14 has left and right subtrees\n// Find inorder successor (smallest in right subtree)\nNode* successor = getMinNode(root->right); // Node 16",
      nodes: [
        { val: 14, left: "12", right: "19", height: 3, cx: 250, cy: 30, isHighlighted: true },
        { val: 12, left: "4", right: "13", height: 2, cx: 140, cy: 75 },
        { val: 19, left: "17", right: "53", height: 2, cx: 360, cy: 75 },
        { val: 17, left: "16", right: "", height: 1, cx: 300, cy: 120 },
        { val: 53, left: "20", right: "60", height: 1, cx: 420, cy: 120 },
        { val: 4, left: "", right: "", height: 0, cx: 50, cy: 165 },
        { val: 13, left: "", right: "", height: 0, cx: 230, cy: 165 },
        { val: 16, left: "", right: "", height: 0, cx: 270, cy: 165, isHighlighted: true, label: "Successor" },
        { val: 20, left: "", right: "", height: 0, cx: 390, cy: 165 },
        { val: 60, left: "", right: "", height: 0, cx: 450, cy: 165 },
      ],
      connections: [
        { from: [250, 30], to: [140, 75] },
        { from: [250, 30], to: [360, 75] },
        { from: [140, 75], to: [50, 165] },
        { from: [140, 75], to: [230, 165] },
        { from: [360, 75], to: [300, 120] },
        { from: [360, 75], to: [420, 120] },
        { from: [300, 120], to: [270, 165] },
        { from: [420, 120], to: [390, 165] },
        { from: [420, 120], to: [450, 165] },
      ]
    },
    {
      title: "Step 4.3: Copy Successor to Root",
      description: "// 3. Copy successor's value into root\nroot->data = successor->data; // root becomes 16",
      nodes: [
        { val: 16, left: "12", right: "19", height: 3, cx: 250, cy: 30, isHighlighted: true, label: "Succ. copied" },
        { val: 12, left: "4", right: "13", height: 2, cx: 140, cy: 75 },
        { val: 19, left: "17", right: "53", height: 2, cx: 360, cy: 75 },
        { val: 17, left: "16", right: "", height: 1, cx: 300, cy: 120 },
        { val: 53, left: "20", right: "60", height: 1, cx: 420, cy: 120 },
        { val: 4, left: "", right: "", height: 0, cx: 50, cy: 165 },
        { val: 13, left: "", right: "", height: 0, cx: 230, cy: 165 },
        { val: 16, left: "", right: "", height: 0, cx: 270, cy: 165, isHighlighted: true },
        { val: 20, left: "", right: "", height: 0, cx: 390, cy: 165 },
        { val: 60, left: "", right: "", height: 0, cx: 450, cy: 165 },
      ],
      connections: [
        { from: [250, 30], to: [140, 75] },
        { from: [250, 30], to: [360, 75] },
        { from: [140, 75], to: [50, 165] },
        { from: [140, 75], to: [230, 165] },
        { from: [360, 75], to: [300, 120] },
        { from: [360, 75], to: [420, 120] },
        { from: [300, 120], to: [270, 165] },
        { from: [420, 120], to: [390, 165] },
        { from: [420, 120], to: [450, 165] },
      ]
    },
    {
      title: "Step 4.4: Remove Successor Leaf",
      description: "// 4. Recursively delete successor node\nroot->right = deleteNode(root->right, 16);\n// Successor Node 16 (leaf node) is removed.",
      nodes: [
        { val: 16, left: "12", right: "19", height: 3, cx: 250, cy: 30 },
        { val: 12, left: "4", right: "13", height: 2, cx: 140, cy: 75 },
        { val: 19, left: "17", right: "53", height: 2, cx: 360, cy: 75 },
        { val: 17, left: "16", right: "", height: 1, cx: 300, cy: 120 },
        { val: 53, left: "20", right: "60", height: 1, cx: 420, cy: 120 },
        { val: 4, left: "", right: "", height: 0, cx: 50, cy: 165 },
        { val: 13, left: "", right: "", height: 0, cx: 230, cy: 165 },
        { val: 16, left: "", right: "", height: 0, cx: 270, cy: 165, isDeleted: true },
        { val: 20, left: "", right: "", height: 0, cx: 390, cy: 165 },
        { val: 60, left: "", right: "", height: 0, cx: 450, cy: 165 },
      ],
      connections: [
        { from: [250, 30], to: [140, 75] },
        { from: [250, 30], to: [360, 75] },
        { from: [140, 75], to: [50, 165] },
        { from: [140, 75], to: [230, 165] },
        { from: [360, 75], to: [300, 120] },
        { from: [360, 75], to: [420, 120] },
        { from: [300, 120], to: [270, 165], isDashed: true, isRed: true }, // deleted
        { from: [420, 120], to: [390, 165] },
        { from: [420, 120], to: [450, 165] },
      ]
    },
    {
      title: "Step 4.5: Update Height & BF of Root 16",
      description: "// 5. Backtracking: Update heights & check balance\nroot->height = 1 + std::max(h(L), h(R));\nint balance = getBalanceOfNode(16); // BF = 2 - 3 = -1 (Balanced)",
      nodes: [
        { val: 16, left: "12", right: "19", height: 3, cx: 250, cy: 30, isHighlighted: true },
        { val: 12, left: "4", right: "13", height: 2, cx: 140, cy: 75 },
        { val: 19, left: "17", right: "53", height: 2, cx: 360, cy: 75 },
        { val: 17, left: "", right: "", height: 1, cx: 300, cy: 120 },
        { val: 53, left: "20", right: "60", height: 1, cx: 420, cy: 120 },
        { val: 4, left: "", right: "", height: 0, cx: 50, cy: 165 },
        { val: 13, left: "", right: "", height: 0, cx: 230, cy: 165 },
        { val: 20, left: "", right: "", height: 0, cx: 390, cy: 165 },
        { val: 60, left: "", right: "", height: 0, cx: 450, cy: 165 },
      ],
      connections: [
        { from: [250, 30], to: [140, 75] },
        { from: [250, 30], to: [360, 75] },
        { from: [140, 75], to: [50, 165] },
        { from: [140, 75], to: [230, 165] },
        { from: [360, 75], to: [300, 120] },
        { from: [360, 75], to: [420, 120] },
        { from: [420, 120], to: [390, 165] },
        { from: [420, 120], to: [450, 165] },
      ]
    },
    // DELETION 5: DELETE NODE 17
    {
      title: "Step 5.1: Locate Node 17",
      description: "// 1. Search for value 17\n// Go right of 16, left of 19 -> Found.\nNode* target = root->right->left;",
      nodes: [
        { val: 16, left: "12", right: "19", height: 3, cx: 250, cy: 30 },
        { val: 12, left: "4", right: "13", height: 2, cx: 140, cy: 75 },
        { val: 19, left: "17", right: "53", height: 2, cx: 360, cy: 75 },
        { val: 17, left: "", right: "", height: 1, cx: 300, cy: 120, isHighlighted: true, label: "Locate Node 17" },
        { val: 53, left: "20", right: "60", height: 1, cx: 420, cy: 120 },
        { val: 4, left: "", right: "", height: 0, cx: 50, cy: 165 },
        { val: 13, left: "", right: "", height: 0, cx: 230, cy: 165 },
        { val: 20, left: "", right: "", height: 0, cx: 390, cy: 165 },
        { val: 60, left: "", right: "", height: 0, cx: 450, cy: 165 },
      ],
      connections: [
        { from: [250, 30], to: [140, 75] },
        { from: [250, 30], to: [360, 75] },
        { from: [140, 75], to: [50, 165] },
        { from: [140, 75], to: [230, 165] },
        { from: [360, 75], to: [300, 120] },
        { from: [360, 75], to: [420, 120] },
        { from: [420, 120], to: [390, 165] },
        { from: [420, 120], to: [450, 165] },
      ]
    },
    {
      title: "Step 5.2: Remove Node 17",
      description: "// 2. Node 17 has no children (Leaf node)\ndelete root; // Delete Node 17\nreturn nullptr; // parent pointer 19->left = nullptr;",
      nodes: [
        { val: 16, left: "12", right: "19", height: 3, cx: 250, cy: 30 },
        { val: 12, left: "4", right: "13", height: 2, cx: 140, cy: 75 },
        { val: 19, left: "", right: "53", height: 2, cx: 360, cy: 75 },
        { val: 17, left: "", right: "", height: 1, cx: 300, cy: 120, isDeleted: true },
        { val: 53, left: "20", right: "60", height: 1, cx: 420, cy: 120 },
        { val: 4, left: "", right: "", height: 0, cx: 50, cy: 165 },
        { val: 13, left: "", right: "", height: 0, cx: 230, cy: 165 },
        { val: 20, left: "", right: "", height: 0, cx: 390, cy: 165 },
        { val: 60, left: "", right: "", height: 0, cx: 450, cy: 165 },
      ],
      connections: [
        { from: [250, 30], to: [140, 75] },
        { from: [250, 30], to: [360, 75] },
        { from: [140, 75], to: [50, 165] },
        { from: [140, 75], to: [230, 165] },
        { from: [360, 75], to: [300, 120], isDashed: true, isRed: true }, // deleted
        { from: [360, 75], to: [420, 120] },
        { from: [420, 120], to: [390, 165] },
        { from: [420, 120], to: [450, 165] },
      ]
    },
    {
      title: "Step 5.3: Update Height & BF (Imbalance Detected)",
      description: "// 3. Backtracking: Update heights & check balance\nroot->height = 1 + std::max(h(L), h(R)); // 19 height = 2\nint balance = getBalanceOfNode(19); // BF = 0 - 2 = -2\n\n// BF = -2 (IMBALANCE DETECTED at 19!)",
      nodes: [
        { val: 16, left: "12", right: "19", height: 3, cx: 250, cy: 30 },
        { val: 12, left: "4", right: "13", height: 2, cx: 140, cy: 75 },
        { val: 19, left: "", right: "53", height: 2, cx: 360, cy: 75, isUnbalanced: true, label: "BF = -2 (Imbalanced)" },
        { val: 17, left: "", right: "", height: 1, cx: 300, cy: 120, isDeleted: true },
        { val: 53, left: "20", right: "60", height: 1, cx: 420, cy: 120 },
        { val: 4, left: "", right: "", height: 0, cx: 50, cy: 165 },
        { val: 13, left: "", right: "", height: 0, cx: 230, cy: 165 },
        { val: 20, left: "", right: "", height: 0, cx: 390, cy: 165 },
        { val: 60, left: "", right: "", height: 0, cx: 450, cy: 165 },
      ],
      connections: [
        { from: [250, 30], to: [140, 75] },
        { from: [250, 30], to: [360, 75] },
        { from: [140, 75], to: [50, 165] },
        { from: [140, 75], to: [230, 165] },
        { from: [360, 75], to: [300, 120], isDashed: true, isRed: true }, // deleted
        { from: [360, 75], to: [420, 120] },
        { from: [420, 120], to: [390, 165] },
        { from: [420, 120], to: [450, 165] },
      ],
      highlightBox: { x: 320, y: 55, w: 160, h: 130 },
      rotationArrow: {
        path: "M 390,110 A 30,30 0 0,1 330,110",
        label: "Left Rotate around 19",
        lx: 360,
        ly: 90
      }
    },
    {
      title: "Step 5.4: Perform Left Rotation Rebalancing",
      description: "// 4. balance < -1 && getBalanceOfNode(root->right) <= 0 -> RR Case\nreturn RRrotation(root); // Perform left rotate around 19\n\n// Tree is now perfectly balanced!",
      nodes: [
        { val: 16, left: "12", right: "53", height: 3, cx: 250, cy: 30 },
        { val: 12, left: "4", right: "13", height: 2, cx: 140, cy: 75 },
        { val: 53, left: "19", right: "60", height: 2, cx: 360, cy: 75, isHighlighted: true, label: "New Parent" },
        { val: 19, left: "", right: "20", height: 1, cx: 310, cy: 120 },
        { val: 60, left: "", right: "", height: 0, cx: 410, cy: 120 },
        { val: 4, left: "", right: "", height: 0, cx: 50, cy: 165 },
        { val: 13, left: "", right: "", height: 0, cx: 230, cy: 165 },
        { val: 20, left: "", right: "", height: 0, cx: 330, cy: 165 },
      ],
      connections: [
        { from: [250, 30], to: [140, 75] },
        { from: [250, 30], to: [360, 75] },
        { from: [140, 75], to: [50, 165] },
        { from: [140, 75], to: [230, 165] },
        { from: [360, 75], to: [310, 120] },
        { from: [360, 75], to: [410, 120] },
        { from: [310, 120], to: [330, 165] },
      ]
    }
  ];

  // Helper to fetch current steps
  const getCurrentSteps = () => {
    switch (activeTab) {
      case "sequence": return sequenceSteps;
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
            AVL Deletion & Rebalancing Simulator
          </h4>
          <p className="text-xs text-secondary-foreground font-normal" style={{ fontFamily: "'Caveat', cursive", fontSize: "15px" }}>
            "Learn node deletion cases first, then trace the sequential deletion of keys step-by-step."
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-1 border-b border-[#DDD7CC]/80 pb-2">
          {[
            { id: "cases", label: "1. Three Deletion Cases" },
            { id: "sequence", label: "2. Sequential Deletion Trace (8 -> 7 -> 11 -> 14 -> 17)" },
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

        {/* Tab 1: Conceptual Deletion Cases (Side by Side) */}
        {activeTab === "cases" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Sub-selector for the three cases */}
            <div className="flex space-x-2 border-b border-[#DDD7CC]/50 pb-2">
              {[
                { id: "leaf", label: "Leaf Node (No Children)" },
                { id: "single", label: "Single Child Node" },
                { id: "double", label: "Two Children Node" },
              ].map((subTab) => (
                <button
                  key={subTab.id}
                  onClick={() => setCaseTab(subTab.id as any)}
                  className={`px-3 py-1 text-xs font-mono rounded border ${
                    caseTab === subTab.id
                      ? "border-[#3F51B5]/50 bg-[#3F51B5]/10 text-[#3F51B5]"
                      : "border-transparent text-secondary-foreground hover:bg-[#F4F1EA]"
                  }`}
                >
                  {subTab.label}
                </button>
              ))}
            </div>

            {/* Side-by-Side Visualizers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FCFBF8]">
              {/* Left Side: Before Deletion */}
              <div className="flex flex-col items-center border border-[#DDD7CC]/50 rounded p-4 bg-[#F4F1EA]/10">
                <span className="text-[10px] uppercase font-extrabold text-[#C0392B] tracking-wider mb-3">
                  Before Deletion
                </span>
                <svg width="220" height="150" viewBox="0 0 220 150" className="overflow-visible font-mono text-[9px] font-bold">
                  <line x1="0" y1="30" x2="220" y2="30" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
                  <line x1="0" y1="75" x2="220" y2="75" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
                  <line x1="0" y1="120" x2="220" y2="120" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
                  {caseData[caseTab].beforeConns.map((conn, idx) => (
                    <line key={idx} x1={conn.from[0]} y1={conn.from[1]} x2={conn.to[0]} y2={conn.to[1]} stroke="#3F51B5" strokeWidth="2" />
                  ))}
                  {caseData[caseTab].beforeNodes.map((node, idx) => (
                    <g key={idx}>
                      <circle cx={node.cx} cy={node.cy} r="12" fill={node.isUnbalanced ? "#C0392B" : (node.isHighlighted ? "#2E7D32" : "#3F51B5")} stroke={node.isUnbalanced ? "#C0392B" : (node.isHighlighted ? "#2E7D32" : "#3F51B5")} strokeWidth="1.5" />
                      <text x={node.cx} y={node.cy + 3} textAnchor="middle" fill="#FFFFFF">{node.val}</text>
                      <text x={node.cx} y={node.cy - 15} textAnchor="middle" fill="#666666" className="text-[7px]">h={node.height}</text>
                      {node.label && (
                        <text x={node.cx + 16} y={node.cy + 3} style={{ fontFamily: "'Caveat', cursive", fill: "#D97706", fontSize: "11px", fontWeight: "bold" }}>{node.label}</text>
                      )}
                    </g>
                  ))}
                </svg>
                <div className="w-full mt-3 bg-[#F4F1EA]/30 border border-[#DDD7CC]/50 rounded p-2.5 font-mono text-[11px] leading-relaxed whitespace-pre-line text-[#232323] font-bold">
                  {caseData[caseTab].beforeDesc}
                </div>
              </div>

              {/* Right Side: After Deletion */}
              <div className="flex flex-col items-center border border-[#DDD7CC]/50 rounded p-4 bg-[#F4F1EA]/10">
                <span className="text-[10px] uppercase font-extrabold text-[#2E7D32] tracking-wider mb-3">
                  After Deletion
                </span>
                <svg width="220" height="150" viewBox="0 0 220 150" className="overflow-visible font-mono text-[9px] font-bold">
                  <line x1="0" y1="30" x2="220" y2="30" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
                  <line x1="0" y1="75" x2="220" y2="75" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
                  <line x1="0" y1="120" x2="220" y2="120" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
                  {caseData[caseTab].afterConns.map((conn, idx) => (
                    <line key={idx} x1={conn.from[0]} y1={conn.from[1]} x2={conn.to[0]} y2={conn.to[1]} stroke="#3F51B5" strokeWidth="2" />
                  ))}
                  {caseData[caseTab].afterNodes.map((node, idx) => (
                    <g key={idx}>
                      <circle cx={node.cx} cy={node.cy} r="12" fill={node.isHighlighted ? "#2E7D32" : "#3F51B5"} stroke={node.isHighlighted ? "#2E7D32" : "#3F51B5"} strokeWidth="1.5" />
                      <text x={node.cx} y={node.cy + 3} textAnchor="middle" fill="#FFFFFF">{node.val}</text>
                      <text x={node.cx} y={node.cy - 15} textAnchor="middle" fill="#666666" className="text-[7px]">h={node.height}</text>
                      {node.label && (
                        <text x={node.cx + 16} y={node.cy + 3} style={{ fontFamily: "'Caveat', cursive", fill: "#D97706", fontSize: "11px", fontWeight: "bold" }}>{node.label}</text>
                      )}
                    </g>
                  ))}
                </svg>
                <div className="w-full mt-3 bg-[#F4F1EA]/30 border border-[#DDD7CC]/50 rounded p-2.5 font-mono text-[11px] leading-relaxed whitespace-pre-line text-[#232323] font-bold">
                  {caseData[caseTab].afterDesc}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Sequence Deletion Trace */}
        {activeTab === "sequence" && currentStepData && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* SVG Canvas Columns (left 2/3) */}
              <div className="lg:col-span-2 flex flex-col space-y-4">
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

                  {/* Whiteboard Drawing Canvas with 500x220 viewBox */}
                  <svg width="100%" height="220" viewBox="0 0 500 220" className="overflow-visible font-mono text-[9px] font-bold">
                    {/* Backdrop grids */}
                    <line x1="0" y1="30" x2="500" y2="30" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
                    <line x1="0" y1="75" x2="500" y2="75" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
                    <line x1="0" y1="120" x2="500" y2="120" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
                    <line x1="0" y1="165" x2="500" y2="165" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />

                    {/* Rotation highlight group box */}
                    {currentStepData.highlightBox && (
                      <rect
                        x={currentStepData.highlightBox.x}
                        y={currentStepData.highlightBox.y}
                        width={currentStepData.highlightBox.w}
                        height={currentStepData.highlightBox.h}
                        fill="none"
                        stroke="#3F51B5"
                        strokeWidth="1.5"
                        strokeDasharray="4,4"
                        rx="4"
                      />
                    )}

                    {/* Connections/Pointers */}
                    {currentStepData.connections.map((conn, idx) => (
                      <line
                        key={idx}
                        x1={conn.from[0]}
                        y1={conn.from[1]}
                        x2={conn.to[0]}
                        y2={conn.to[1]}
                        stroke={conn.isRed ? "#C0392B" : "#3F51B5"}
                        strokeWidth={conn.isDashed ? 1.5 : 2.5}
                        strokeDasharray={conn.isDashed ? "3,3" : undefined}
                      />
                    ))}

                    {/* Rotation Arrow */}
                    {currentStepData.rotationArrow && (
                      <g>
                        <path
                          d={currentStepData.rotationArrow.path}
                          fill="none"
                          stroke="#D97706"
                          strokeWidth="2"
                          markerEnd="url(#arrow)"
                          strokeDasharray="none"
                          className="animate-pulse"
                        />
                        <text
                          x={currentStepData.rotationArrow.lx}
                          y={currentStepData.rotationArrow.ly}
                          textAnchor="middle"
                          style={{ fontFamily: "'Caveat', cursive", fill: "#D97706", fontSize: "11px", fontWeight: "bold" }}
                        >
                          {currentStepData.rotationArrow.label}
                        </text>
                      </g>
                    )}

                    {/* SVG arrow marker */}
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#D97706" />
                      </marker>
                    </defs>

                    {/* Node Circles */}
                    {currentStepData.nodes.map((node, idx) => (
                      <g key={idx} className={node.isDeleted ? "opacity-30" : ""}>
                        <circle
                          cx={node.cx}
                          cy={node.cy}
                          r="13"
                          fill={node.isHighlighted ? "#2E7D32" : (node.isUnbalanced ? "#C0392B" : "#3F51B5")}
                          stroke={node.isHighlighted ? "#2E7D32" : (node.isUnbalanced ? "#C0392B" : "#3F51B5")}
                          strokeWidth="1.5"
                        />
                        <text
                          x={node.cx}
                          y={node.cy + 3}
                          textAnchor="middle"
                          fill="#FFFFFF"
                          className="font-mono font-bold text-[9px]"
                        >
                          {node.val}
                        </text>
                        {/* Height overlay label */}
                        <text
                          x={node.cx}
                          y={node.cy - 16}
                          textAnchor="middle"
                          fill="#666666"
                          className="font-mono text-[7px] font-normal"
                        >
                          h={node.height}
                        </text>
                        {/* Variable name overlay next to node circle */}
                        {node.label && (
                          <text
                            x={node.cx + 18}
                            y={node.cy + 4}
                            style={{ fontFamily: "'Caveat', cursive", fill: "#D97706", fontSize: "11px", fontWeight: "bold" }}
                          >
                            {node.label}
                          </text>
                        )}
                        {node.isDeleted && (
                          <text
                            x={node.cx}
                            y={node.cy + 25}
                            textAnchor="middle"
                            fill="#C0392B"
                            className="text-[7px] font-extrabold uppercase"
                          >
                            Deleted
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
                <div className="bg-[#FCFBF8] border border-[#DDD7CC] rounded-sm p-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#666666] block font-serif">
                    C++ Pointer Updates
                  </span>
                  <p className="text-[11px] text-[#232323] leading-relaxed whitespace-pre-line font-mono font-bold bg-[#F4F1EA]/30 p-2 border border-[#DDD7CC]/50 rounded-sm">
                    {currentStepData.description}
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
