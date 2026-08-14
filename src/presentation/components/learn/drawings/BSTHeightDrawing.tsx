"use client";

import React from "react";

export default function BSTHeightDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-3xl border border-border bg-card p-6 rounded-sm space-y-8">
        <div>
          <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wide">
            BST Shape vs. Insertion Order
          </h4>
          <p className="text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "15px" }}>
            "Watch how inserting the same values in a different order changes the tree shape and search speed."
          </p>
        </div>

        {/* 1. BALANCED TREE SECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">1. Balanced BST (Insertion Order: 30, 20, 10, 50, 40, 60)</span>
            <span className="text-[11px] font-mono text-secondary-foreground">Height ≈ O(log N)</span>
          </div>

          <p className="text-[12px] text-secondary-foreground leading-relaxed">
            When keys are inserted in a mixed order, the tree naturally spreads out. The path from the root to any leaf remains short.
          </p>

          <div className="flex flex-col md:flex-row gap-6 bg-secondary/5 p-4 border border-dashed border-border rounded-sm items-center justify-center">
            {/* Tree diagram */}
            <svg width="280" height="180" className="overflow-visible font-mono text-[11px] font-bold">
              {/* Lines */}
              <line x1="140" y1="30" x2="80" y2="80" stroke="currentColor" strokeWidth="1.5" className="text-border" />
              <line x1="140" y1="30" x2="200" y2="80" stroke="currentColor" strokeWidth="1.5" className="text-border" />
              
              <line x1="80" y1="80" x2="40" y2="130" stroke="currentColor" strokeWidth="1.5" className="text-border" />
              <line x1="200" y1="80" x2="160" y2="130" stroke="currentColor" strokeWidth="1.5" className="text-border" />
              <line x1="200" y1="80" x2="240" y2="130" stroke="currentColor" strokeWidth="1.5" className="text-border" />

              {/* Node 30 */}
              <circle cx="140" cy="30" r="16" fill="#3F51B5" stroke="#3F51B5" strokeWidth="1.5" />
              <text x="140" y="34" textAnchor="middle" fill="#FFFFFF" className="font-mono font-bold">30</text>

              {/* Node 20 */}
              <circle cx="80" cy="80" r="16" fill="#3F51B5" stroke="#3F51B5" strokeWidth="1.5" />
              <text x="80" y="84" textAnchor="middle" fill="#FFFFFF" className="font-mono font-bold">20</text>

              {/* Node 50 */}
              <circle cx="200" cy="80" r="16" fill="#3F51B5" stroke="#3F51B5" strokeWidth="1.5" />
              <text x="200" y="84" textAnchor="middle" fill="#FFFFFF" className="font-mono font-bold">50</text>

              {/* Node 10 */}
              <circle cx="40" cy="130" r="16" fill="#3F51B5" stroke="#3F51B5" strokeWidth="1.5" />
              <text x="40" y="134" textAnchor="middle" fill="#FFFFFF" className="font-mono font-bold">10</text>

              {/* Node 40 */}
              <circle cx="160" cy="130" r="16" fill="#3F51B5" stroke="#3F51B5" strokeWidth="1.5" />
              <text x="160" y="134" textAnchor="middle" fill="#FFFFFF" className="font-mono font-bold">40</text>

              {/* Node 60 */}
              <circle cx="240" cy="130" r="16" fill="#3F51B5" stroke="#3F51B5" strokeWidth="1.5" />
              <text x="240" y="134" textAnchor="middle" fill="#FFFFFF" className="font-mono font-bold">60</text>
            </svg>

            <div className="max-w-xs space-y-2 text-[12px] text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
              <p className="text-emerald-800 font-bold">Why it is fast:</p>
              <p>"Searching 60 takes only 3 steps: 30 → 50 → 60. With every step, we throw away half the tree! Searching is extremely efficient here."</p>
            </div>
          </div>
        </div>

        {/* 2. SKEWED TREE SECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-700">2. Skewed BST (Insertion Order: 60, 50, 40, 30, 20)</span>
            <span className="text-[11px] font-mono text-secondary-foreground">Height = N (Worst Case)</span>
          </div>

          <p className="text-[12px] text-secondary-foreground leading-relaxed">
            When keys are inserted in strictly decreasing (or increasing) order, the BST properties force every node to the left child, creating a straight line.
          </p>

          <div className="flex flex-col md:flex-row gap-6 bg-secondary/5 p-4 border border-dashed border-border rounded-sm items-center justify-center">
            {/* Tree diagram */}
            <svg width="200" height="220" className="overflow-visible font-mono text-[11px] font-bold">
              {/* Lines */}
              <line x1="150" y1="30" x2="120" y2="70" stroke="currentColor" strokeWidth="1.5" className="text-border" />
              <line x1="120" y1="70" x2="90" y2="110" stroke="currentColor" strokeWidth="1.5" className="text-border" />
              <line x1="90" y1="110" x2="60" y2="150" stroke="currentColor" strokeWidth="1.5" className="text-border" />
              <line x1="60" y1="150" x2="30" y2="190" stroke="currentColor" strokeWidth="1.5" className="text-border" />

              {/* Nodes */}
              <circle cx="150" cy="30" r="14" fill="#3F51B5" stroke="#3F51B5" strokeWidth="1.5" />
              <text x="150" y="34" textAnchor="middle" fill="#FFFFFF" className="font-mono font-bold">60</text>

              <circle cx="120" cy="70" r="14" fill="#3F51B5" stroke="#3F51B5" strokeWidth="1.5" />
              <text x="120" y="74" textAnchor="middle" fill="#FFFFFF" className="font-mono font-bold">50</text>

              <circle cx="90" cy="110" r="14" fill="#3F51B5" stroke="#3F51B5" strokeWidth="1.5" />
              <text x="90" y="114" textAnchor="middle" fill="#FFFFFF" className="font-mono font-bold">40</text>

              <circle cx="60" cy="150" r="14" fill="#3F51B5" stroke="#3F51B5" strokeWidth="1.5" />
              <text x="60" y="154" textAnchor="middle" fill="#FFFFFF" className="font-mono font-bold">30</text>

              <circle cx="30" cy="190" r="14" fill="#3F51B5" stroke="#3F51B5" strokeWidth="1.5" />
              <text x="30" y="194" textAnchor="middle" fill="#FFFFFF" className="font-mono font-bold">20</text>
            </svg>

            <div className="max-w-xs space-y-2 text-[12px] text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
              <p className="text-rose-700 font-bold">Why it is slow:</p>
              <p>"This tree is a glorified Linked List! Searching for 20 requires visiting 60, 50, 40, 30, and then 20. There is no 'halving' choice. Time is O(N) — linear search!"</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
