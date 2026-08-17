"use client";

import React, { useState, useEffect } from "react";
import { RotateCcw, ChevronLeft, ChevronRight, Maximize2, Minimize2, Settings } from "lucide-react";

interface TreeNode {
  val: number;
  x: number;
  y: number;
  bf?: string;
  isUnbalanced?: boolean;
  isDeleted?: boolean;
  isHighlighted?: boolean;
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

export default function AVLDeletionDrawing() {
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

  // C++ AVL Deletion code block showing helper definitions as collapsed stubs
  const deletionCode = [
    "// Helper Definitions (declared helper functions)",
    "class Node { ... };",
    "int getHeightOfNode(Node* node) { ... }",
    "int getBalanceOfNode(Node* node) { ... }",
    "Node* LLRoation(Node* y) { ... }",
    "Node* RRrotation(Node* y) { ... }",
    "Node* LRrotation(Node* root) { ... }",
    "Node* RLrotation(Node* root) { ... }",
    "Node* minValueNode(Node* node) { ... }",
    "",
    "// AVL Deletion Function",
    "Node* deleteNode(Node* root, int key) {",
    "    if (root == nullptr) return root;",
    "    ",
    "    if (key < root->data)",
    "        root->left = deleteNode(root->left, key);",
    "    else if (key > root->data)",
    "        root->right = deleteNode(root->right, key);",
    "    else {",
    "        if ((root->left == nullptr) || (root->right == nullptr)) {",
    "            Node* temp = root->left ? root->left : root->right;",
    "            if (temp == nullptr) {",
    "                temp = root; root = nullptr;",
    "            } else",
    "                *root = *temp;",
    "            delete temp;",
    "        } else {",
    "            Node* temp = minValueNode(root->right);",
    "            root->data = temp->data;",
    "            root->right = deleteNode(root->right, temp->data);",
    "        }",
    "    }",
    "    if (root == nullptr) return root;",
    "    ",
    "    root->height = 1 + max(getHeightOfNode(root->left), getHeightOfNode(root->right));",
    "    int balance = getBalanceOfNode(root);",
    "    ",
    "    if (balance > 1 && getBalanceOfNode(root->left) >= 0)",
    "        return LLRoation(root);",
    "    if (balance > 1 && getBalanceOfNode(root->left) < 0)",
    "        return LRrotation(root);",
    "    if (balance < -1 && getBalanceOfNode(root->right) <= 0)",
    "        return RRrotation(root);",
    "    if (balance < -1 && getBalanceOfNode(root->right) > 0)",
    "        return RLrotation(root);",
    "        ",
    "    return root;",
    "}"
  ];

  const stepsData: StepData[] = [
    {
      title: "Step 0: Initial Balanced Tree",
      description: "We begin with a fully balanced AVL tree containing 13 keys.",
      explanation: "All balance factors (BF) are within the safe range [-1, 0, +1]. No rotations are currently active.",
      nodes: [
        { val: 14, x: 250, y: 45, bf: "+1" },
        { val: 11, x: 150, y: 105, bf: "-1" },
        { val: 19, x: 350, y: 105, bf: "0" },
        { val: 7, x: 100, y: 165, bf: "0" },
        { val: 12, x: 200, y: 165, bf: "-1" },
        { val: 17, x: 300, y: 165, bf: "+1" },
        { val: 53, x: 400, y: 165, bf: "0" },
        { val: 4, x: 75, y: 225, bf: "0" },
        { val: 8, x: 125, y: 225, bf: "0" },
        { val: 13, x: 225, y: 225, bf: "0" },
        { val: 16, x: 275, y: 225, bf: "0" },
        { val: 20, x: 375, y: 225, bf: "0" },
        { val: 60, x: 425, y: 225, bf: "0" },
      ],
      connections: [
        { fromX: 250, fromY: 45, toX: 150, toY: 105 },
        { fromX: 250, fromY: 45, toX: 350, toY: 105 },
        { fromX: 150, fromY: 105, toX: 100, toY: 165 },
        { fromX: 150, fromY: 105, toX: 200, toY: 165 },
        { fromX: 350, fromY: 105, toX: 300, toY: 165 },
        { fromX: 350, fromY: 105, toX: 400, toY: 165 },
        { fromX: 100, fromY: 165, toX: 75, toY: 225 },
        { fromX: 100, fromY: 165, toX: 125, toY: 225 },
        { fromX: 200, fromY: 165, toX: 225, toY: 225 },
        { fromX: 300, fromY: 165, toX: 275, toY: 225 },
        { fromX: 400, fromY: 165, toX: 375, toY: 225 },
        { fromX: 400, fromY: 165, toX: 425, toY: 225 },
      ],
      highlightedLines: [12]
    },
    {
      title: "Step 1: Delete Leaf Node 8",
      description: "Node 8 is a leaf node under 7. We disconnect Node 8 and return nullptr.",
      explanation: "Recursion locates Node 8. Since it has no children, we delete the node and return nullptr. Backtracking updates heights: 7's BF becomes +1. Balanced.",
      nodes: [
        { val: 14, x: 250, y: 45, bf: "+1" },
        { val: 11, x: 150, y: 105, bf: "-1" },
        { val: 19, x: 350, y: 105, bf: "0" },
        { val: 7, x: 100, y: 165, bf: "+1" },
        { val: 12, x: 200, y: 165, bf: "-1" },
        { val: 17, x: 300, y: 165, bf: "+1" },
        { val: 53, x: 400, y: 165, bf: "0" },
        { val: 4, x: 75, y: 225, bf: "0" },
        { val: 8, x: 125, y: 225, bf: "0", isDeleted: true },
        { val: 13, x: 225, y: 225, bf: "0" },
        { val: 16, x: 275, y: 225, bf: "0" },
        { val: 20, x: 375, y: 225, bf: "0" },
        { val: 60, x: 425, y: 225, bf: "0" },
      ],
      connections: [
        { fromX: 250, fromY: 45, toX: 150, toY: 105 },
        { fromX: 250, fromY: 45, toX: 350, toY: 105 },
        { fromX: 150, fromY: 105, toX: 100, toY: 165 },
        { fromX: 150, fromY: 105, toX: 200, toY: 165 },
        { fromX: 350, fromY: 105, toX: 300, toY: 165 },
        { fromX: 350, fromY: 105, toX: 400, toY: 165 },
        { fromX: 100, fromY: 165, toX: 75, toY: 225 },
        { fromX: 100, fromY: 165, toX: 125, toY: 225, dashed: true },
        { fromX: 200, fromY: 165, toX: 225, toY: 225 },
        { fromX: 300, fromY: 165, toX: 275, toY: 225 },
        { fromX: 400, fromY: 165, toX: 375, toY: 225 },
        { fromX: 400, fromY: 165, toX: 425, toY: 225 },
      ],
      highlightedLines: [21, 22, 23, 24, 25, 26]
    },
    {
      title: "Step 2: Delete Node 7 (Single Child)",
      description: "Node 7 has only one child (Node 4). We bypass Node 7, linking 11 directly to 4.",
      explanation: "Standard BST bypass deletion: Node 7's non-null child (Node 4) takes its place directly. Backtracking updates heights: Node 11's BF becomes -1.",
      nodes: [
        { val: 14, x: 250, y: 45, bf: "0" },
        { val: 11, x: 150, y: 105, bf: "-1" },
        { val: 19, x: 350, y: 105, bf: "0" },
        { val: 7, x: 100, y: 165, bf: "0", isDeleted: true },
        { val: 12, x: 200, y: 165, bf: "-1" },
        { val: 17, x: 300, y: 165, bf: "+1" },
        { val: 53, x: 400, y: 165, bf: "0" },
        { val: 4, x: 100, y: 165, bf: "0", isHighlighted: true }, // shifted to replace 7
        { val: 13, x: 225, y: 225, bf: "0" },
        { val: 16, x: 275, y: 225, bf: "0" },
        { val: 20, x: 375, y: 225, bf: "0" },
        { val: 60, x: 425, y: 225, bf: "0" },
      ],
      connections: [
        { fromX: 250, fromY: 45, toX: 150, toY: 105 },
        { fromX: 250, fromY: 45, toX: 350, toY: 105 },
        { fromX: 150, fromY: 105, toX: 100, toY: 165 }, // linked 11 to 4
        { fromX: 150, fromY: 105, toX: 200, toY: 165 },
        { fromX: 350, fromY: 105, toX: 300, toY: 165 },
        { fromX: 350, fromY: 105, toX: 400, toY: 165 },
        { fromX: 200, fromY: 165, toX: 225, toY: 225 },
        { fromX: 300, fromY: 165, toX: 275, toY: 225 },
        { fromX: 400, fromY: 165, toX: 375, toY: 225 },
        { fromX: 400, fromY: 165, toX: 425, toY: 225 },
      ],
      highlightedLines: [21, 22, 24, 25, 26]
    },
    {
      title: "Step 3a: Delete Node 11 (Two Children) - Successor",
      description: "Node 11 has two children. We locate its inorder successor (minimum in right subtree), Node 12.",
      explanation: "When deleting a node with two children, we find the next largest value to maintain BST structure. Node 12 is chosen.",
      nodes: [
        { val: 14, x: 250, y: 45, bf: "0" },
        { val: 11, x: 150, y: 105, bf: "-1", isHighlighted: true },
        { val: 19, x: 350, y: 105, bf: "0" },
        { val: 12, x: 200, y: 165, bf: "-1", isHighlighted: true },
        { val: 17, x: 300, y: 165, bf: "+1" },
        { val: 53, x: 400, y: 165, bf: "0" },
        { val: 4, x: 100, y: 165, bf: "0" },
        { val: 13, x: 225, y: 225, bf: "0" },
        { val: 16, x: 275, y: 225, bf: "0" },
        { val: 20, x: 375, y: 225, bf: "0" },
        { val: 60, x: 425, y: 225, bf: "0" },
      ],
      connections: [
        { fromX: 250, fromY: 45, toX: 150, toY: 105 },
        { fromX: 250, fromY: 45, toX: 350, toY: 105 },
        { fromX: 150, fromY: 105, toX: 100, toY: 165 },
        { fromX: 150, fromY: 105, toX: 200, toY: 165 },
        { fromX: 350, fromY: 105, toX: 300, toY: 165 },
        { fromX: 350, fromY: 105, toX: 400, toY: 165 },
        { fromX: 200, fromY: 165, toX: 225, toY: 225 },
        { fromX: 300, fromY: 165, toX: 275, toY: 225 },
        { fromX: 400, fromY: 165, toX: 375, toY: 225 },
        { fromX: 400, fromY: 165, toX: 425, toY: 225 },
      ],
      highlightedLines: [28]
    },
    {
      title: "Step 3b: Delete Node 11 - Copy & Remove Succ Position",
      description: "Node 12's value is copied to Node 11's place. Old Node 12 is recursively deleted (bypassed to Node 13).",
      explanation: "Copying Node 12 preserves parent links. Old Node 12's position is deleted and bypassed to Node 13. Backtracking: Node 12's BF is 0.",
      nodes: [
        { val: 14, x: 250, y: 45, bf: "0" },
        { val: 12, x: 150, y: 105, bf: "0", isHighlighted: true }, // value replaced
        { val: 19, x: 350, y: 105, bf: "0" },
        { val: 12, x: 200, y: 165, bf: "0", isDeleted: true },
        { val: 17, x: 300, y: 165, bf: "+1" },
        { val: 53, x: 400, y: 165, bf: "0" },
        { val: 4, x: 100, y: 165, bf: "0" },
        { val: 13, x: 200, y: 165, bf: "0", isHighlighted: true }, // shifted to replace 12
        { val: 16, x: 275, y: 225, bf: "0" },
        { val: 20, x: 375, y: 225, bf: "0" },
        { val: 60, x: 425, y: 225, bf: "0" },
      ],
      connections: [
        { fromX: 250, fromY: 45, toX: 150, toY: 105 },
        { fromX: 250, fromY: 45, toX: 350, toY: 105 },
        { fromX: 150, fromY: 105, toX: 100, toY: 165 },
        { fromX: 150, fromY: 105, toX: 200, toY: 165 },
        { fromX: 350, fromY: 105, toX: 300, toY: 165 },
        { fromX: 350, fromY: 105, toX: 400, toY: 165 },
        { fromX: 300, fromY: 165, toX: 275, toY: 225 },
        { fromX: 400, fromY: 165, toX: 375, toY: 225 },
        { fromX: 400, fromY: 165, toX: 425, toY: 225 },
      ],
      highlightedLines: [29, 30]
    },
    {
      title: "Step 4a: Delete Root Node 14 (Two Children) - Successor",
      description: "Root 14 is located. Its inorder successor is Node 16 (smallest in right subtree).",
      explanation: "To delete Root 14, we search its right child 19 and find the leftmost descendant, Node 16.",
      nodes: [
        { val: 14, x: 250, y: 45, bf: "0", isHighlighted: true },
        { val: 12, x: 150, y: 105, bf: "0" },
        { val: 19, x: 350, y: 105, bf: "0" },
        { val: 17, x: 300, y: 165, bf: "+1" },
        { val: 53, x: 400, y: 165, bf: "0" },
        { val: 4, x: 100, y: 165, bf: "0" },
        { val: 13, x: 200, y: 165, bf: "0" },
        { val: 16, x: 275, y: 225, bf: "0", isHighlighted: true },
        { val: 20, x: 375, y: 225, bf: "0" },
        { val: 60, x: 425, y: 225, bf: "0" },
      ],
      connections: [
        { fromX: 250, fromY: 45, toX: 150, toY: 105 },
        { fromX: 250, fromY: 45, toX: 350, toY: 105 },
        { fromX: 150, fromY: 105, toX: 100, toY: 165 },
        { fromX: 150, fromY: 105, toX: 200, toY: 165 },
        { fromX: 350, fromY: 105, toX: 300, toY: 165 },
        { fromX: 350, fromY: 105, toX: 400, toY: 165 },
        { fromX: 200, fromY: 165, toX: 225, toY: 225 },
        { fromX: 300, fromY: 165, toX: 275, toY: 225 },
        { fromX: 400, fromY: 165, toX: 375, toY: 225 },
        { fromX: 400, fromY: 165, toX: 425, toY: 225 },
      ],
      highlightedLines: [28]
    },
    {
      title: "Step 4b: Delete Root 14 - Copy & Remove Succ Position",
      description: "Node 16's value is copied to the root. Old Node 16 is deleted.",
      explanation: "Copying 16 keeps BST properties intact. Node 16's original leaf position is removed. Backtracking: 17's BF becomes 0, 19's BF becomes -1.",
      nodes: [
        { val: 16, x: 250, y: 45, bf: "-1", isHighlighted: true }, // value replaced
        { val: 12, x: 150, y: 105, bf: "0" },
        { val: 19, x: 350, y: 105, bf: "-1" },
        { val: 17, x: 300, y: 165, bf: "0" },
        { val: 53, x: 400, y: 165, bf: "0" },
        { val: 4, x: 100, y: 165, bf: "0" },
        { val: 13, x: 200, y: 165, bf: "0" },
        { val: 16, x: 275, y: 225, bf: "0", isDeleted: true },
        { val: 20, x: 375, y: 225, bf: "0" },
        { val: 60, x: 425, y: 225, bf: "0" },
      ],
      connections: [
        { fromX: 250, fromY: 45, toX: 150, toY: 105 },
        { fromX: 250, fromY: 45, toX: 350, toY: 105 },
        { fromX: 150, fromY: 105, toX: 100, toY: 165 },
        { fromX: 150, fromY: 105, toX: 200, toY: 165 },
        { fromX: 350, fromY: 105, toX: 300, toY: 165 },
        { fromX: 350, fromY: 105, toX: 400, toY: 165 },
        { fromX: 400, fromY: 165, toX: 375, toY: 225 },
        { fromX: 400, fromY: 165, toX: 425, toY: 225 },
      ],
      highlightedLines: [29, 30]
    },
    {
      title: "Step 5a: Delete Node 17",
      description: "Node 17 is a leaf node under 19. We delete Node 17 and set 19's left child to nullptr.",
      explanation: "Standard BST leaf deletion: Node 17 is deleted. This reduces the height of 19's left child, making 19 unbalanced.",
      nodes: [
        { val: 16, x: 250, y: 45, bf: "-1" },
        { val: 12, x: 150, y: 105, bf: "0" },
        { val: 19, x: 350, y: 105, bf: "-2", isUnbalanced: true },
        { val: 17, x: 300, y: 165, bf: "0", isDeleted: true },
        { val: 53, x: 400, y: 165, bf: "0" },
        { val: 4, x: 100, y: 165, bf: "0" },
        { val: 13, x: 200, y: 165, bf: "0" },
        { val: 20, x: 375, y: 225, bf: "0" },
        { val: 60, x: 425, y: 225, bf: "0" },
      ],
      connections: [
        { fromX: 250, fromY: 45, toX: 150, toY: 105 },
        { fromX: 250, fromY: 45, toX: 350, toY: 105 },
        { fromX: 150, fromY: 105, toX: 100, toY: 165 },
        { fromX: 150, fromY: 105, toX: 200, toY: 165 },
        { fromX: 350, fromY: 105, toX: 300, toY: 165, dashed: true },
        { fromX: 350, fromY: 105, toX: 400, toY: 165 },
        { fromX: 400, fromY: 165, toX: 375, toY: 225 },
        { fromX: 400, fromY: 165, toX: 425, toY: 225 },
      ],
      highlightedLines: [21, 22, 23, 24, 25, 26]
    },
    {
      title: "Step 5b: Balance Check at Node 19 (BF = -2)",
      description: "Backtracking to Node 19, height check finds BF = -2. Its right child (Node 53) has BF = 0.",
      explanation: "Since BF of Node 19 is -2, and BF of its right child (Node 53) is 0, we identify this as the Right-Right (RR) Case. A single Left Rotation around 19 is needed.",
      nodes: [
        { val: 16, x: 250, y: 45, bf: "-1" },
        { val: 12, x: 150, y: 105, bf: "0" },
        { val: 19, x: 350, y: 105, bf: "-2", isUnbalanced: true },
        { val: 53, x: 400, y: 165, bf: "0" },
        { val: 4, x: 100, y: 165, bf: "0" },
        { val: 13, x: 200, y: 165, bf: "0" },
        { val: 20, x: 375, y: 225, bf: "0" },
        { val: 60, x: 425, y: 225, bf: "0" },
      ],
      connections: [
        { fromX: 250, fromY: 45, toX: 150, toY: 105 },
        { fromX: 250, fromY: 45, toX: 350, toY: 105 },
        { fromX: 150, fromY: 105, toX: 100, toY: 165 },
        { fromX: 150, fromY: 105, toX: 200, toY: 165 },
        { fromX: 350, fromY: 105, toX: 400, toY: 165 },
        { fromX: 400, fromY: 165, toX: 375, toY: 225 },
        { fromX: 400, fromY: 165, toX: 425, toY: 225 },
      ],
      highlightedLines: [34, 35, 41]
    },
    {
      title: "Step 5c: Left Rotation around Node 19",
      description: "We execute RRrotation(19). Node 53 rises to replace Node 19, and Node 19 becomes 53's left child.",
      explanation: "The rotation completes. Node 19's height is updated to 2, Node 53's height becomes 3. Balance factors are restored safely.",
      nodes: [
        { val: 16, x: 250, y: 45, bf: "-1" },
        { val: 12, x: 150, y: 105, bf: "0" },
        { val: 53, x: 350, y: 105, bf: "-1", isHighlighted: true }, // 53 becomes new right child of root
        { val: 19, x: 300, y: 165, bf: "-1" }, // 19 goes to 53's left
        { val: 60, x: 400, y: 165, bf: "0" }, // 60 stays 53's right
        { val: 4, x: 100, y: 165, bf: "0" },
        { val: 13, x: 200, y: 165, bf: "0" },
        { val: 20, x: 275, y: 225, bf: "0" }, // 20 is reconnected to 19's right
      ],
      connections: [
        { fromX: 250, fromY: 45, toX: 150, toY: 105 },
        { fromX: 250, fromY: 45, toX: 350, toY: 105 },
        { fromX: 150, fromY: 105, toX: 100, toY: 165 },
        { fromX: 150, fromY: 105, toX: 200, toY: 165 },
        { fromX: 350, fromY: 105, toX: 300, toY: 165 },
        { fromX: 350, fromY: 105, toX: 400, toY: 165 },
        { fromX: 300, fromY: 165, toX: 275, toY: 225 },
      ],
      highlightedLines: [42]
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
            AVL Tree Deletion Simulator
          </h4>
          <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Step-by-step trace of deleting keys: 8, 7, 11, 14, 17."
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
            C++ Deletion Logic
          </span>
          <pre className="text-[9px] font-mono bg-[#fafafa] p-3 rounded-sm overflow-auto leading-relaxed border border-[#DDD7CC]/50 text-left select-all flex-1 min-h-0">
            {deletionCode.map((line, lIdx) => {
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

              <svg width="450" height="250" className="overflow-visible font-mono text-[10px] font-bold">
                {/* Backdrop grids */}
                <line x1="0" y1="45" x2="450" y2="45" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
                <line x1="0" y1="105" x2="450" y2="105" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
                <line x1="0" y1="165" x2="450" y2="165" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />
                <line x1="0" y1="225" x2="450" y2="225" stroke="#DDD7CC" strokeWidth="0.5" strokeDasharray="3,3" />

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
                  <g key={node.val} className={node.isDeleted ? "opacity-35" : ""}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="13"
                      fill={node.isHighlighted ? "#2E7D32" : (node.isUnbalanced ? "#C0392B" : "#3F51B5")}
                      stroke={node.isHighlighted ? "#2E7D32" : (node.isUnbalanced ? "#C0392B" : "#3F51B5")}
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
                        x={node.x + 16}
                        y={node.y - 4}
                        style={{ fontFamily: "'Caveat', cursive", fill: "#666666", fontSize: "12px", fontWeight: "bold" }}
                      >
                        BF={node.bf}
                      </text>
                    )}
                    {node.isDeleted && (
                      <text
                        x={node.x}
                        y={node.y + 23}
                        textAnchor="middle"
                        fill="#C0392B"
                        className="text-[7px] font-extrabold uppercase font-mono tracking-tighter"
                      >
                        Deleted
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
                C++ AVL Deletion Code
              </span>
              <pre className="text-[9px] font-mono bg-[#fafafa] p-2 border border-[#DDD7CC]/30 rounded-sm overflow-auto leading-relaxed text-left flex-1 select-all">
                {deletionCode.slice(10).map((line, idx) => (
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
                  Deletion Simulator
                </h5>
                <p className="text-[11px] md:text-xs text-[#666666] leading-relaxed font-serif max-w-[240px]">
                  Trace standard BST node deletion combined with AVL backtracking balancing rules. 
                  Observe height updates and rebalancing rotations trigger dynamically.
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
