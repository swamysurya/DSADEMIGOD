"use client";

import React, { useState } from "react";

export default function CollisionResolutionDrawing() {
  const [activeTab, setActiveTab] = useState<"chaining" | "linear" | "quadratic" | "double">("chaining");

  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-border bg-card overflow-hidden rounded-sm">
        
        {/* Header containing tabs */}
        <div className="flex border-b border-border bg-secondary/15 select-none text-[10px] sm:text-xs font-bold uppercase tracking-wider">
          {(["chaining", "linear", "quadratic", "double"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-1 text-center transition-colors outline-none focus-visible:bg-secondary/20 cursor-pointer ${
                activeTab === tab
                  ? "bg-card text-foreground border-b-2 border-primary"
                  : "text-secondary-foreground hover:text-foreground hover:bg-secondary/5"
              }`}
            >
              {tab === "chaining" ? "Chaining" : tab === "linear" ? "Linear Probing" : tab === "quadratic" ? "Quadratic" : "Double Hashing"}
            </button>
          ))}
        </div>

        {/* Tab Content area */}
        <div className="p-5 min-h-[220px] flex flex-col justify-between space-y-4 font-serif text-sm">
          {activeTab === "chaining" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wide">
                  Open Hashing: Separate Chaining
                </h4>
                <p className="text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
                  "If a slot is full, hang a linked list chain from it!"
                </p>
              </div>

              {/* Chaining diagram */}
              <div className="flex flex-col gap-2 p-3 border border-dashed border-border/80 bg-secondary/5 rounded-sm font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-12 text-[10px] text-secondary-foreground">Slot [0]:</span>
                  <span className="text-[10px] text-secondary-foreground/50">null</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-12 text-[10px] text-secondary-foreground">Slot [5]:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 border border-primary/40 bg-accent/10 rounded-sm text-[10px] font-bold">15</span>
                    <span className="text-secondary-foreground">──&gt;</span>
                    <span className="px-2 py-0.5 border border-primary/40 bg-accent/10 rounded-sm text-[10px] font-bold">25</span>
                    <span className="text-secondary-foreground">──&gt;</span>
                    <span className="text-[10px] text-secondary-foreground/50">null</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-12 text-[10px] text-secondary-foreground">Slot [8]:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 border border-primary/40 bg-accent/10 rounded-sm text-[10px] font-bold">38</span>
                    <span className="text-secondary-foreground">──&gt;</span>
                    <span className="text-[10px] text-secondary-foreground/50">null</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-secondary-foreground font-serif leading-relaxed">
                <strong className="font-bold text-foreground">Explanation</strong>: Keys <code className="font-mono bg-secondary/30 px-1 py-0.5 rounded-sm">15</code> and <code className="font-mono bg-secondary/30 px-1 py-0.5 rounded-sm">25</code> both hash to slot <code className="font-mono bg-secondary/30 px-1 py-0.5 rounded-sm">5</code>. Instead of overwriting, they are stored sequentially in a Linked List starting at index <code className="font-mono bg-secondary/30 px-1 py-0.5 rounded-sm">5</code>.
              </p>
            </div>
          )}

          {activeTab === "linear" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wide">
                  Open Addressing: Linear Probing
                </h4>
                <p className="text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
                  "If slot is full, check slot + 1, slot + 2, slot + 3... in a straight line."
                </p>
              </div>

              {/* Linear Probing diagram */}
              <div className="flex flex-col gap-1.5 p-3 border border-dashed border-border/80 bg-secondary/5 rounded-sm font-mono text-xs">
                <div className="flex items-center justify-between border-b border-border/30 pb-1 text-[10px] font-bold text-secondary-foreground">
                  <span>Slot Index</span>
                  <span>Occupied Key</span>
                  <span>Probing Step</span>
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span className="text-[10px] text-secondary-foreground">[5]</span>
                  <span className="px-2 py-0.5 border border-primary/40 bg-accent/10 rounded-sm text-[10px] font-bold">25</span>
                  <span className="text-[9px] text-secondary-foreground italic">Home slot (No collision)</span>
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span className="text-[10px] text-secondary-foreground">[6]</span>
                  <span className="px-2 py-0.5 border border-primary/40 bg-accent/10 rounded-sm text-[10px] font-bold">35</span>
                  <span className="text-[9px] text-rose-600 font-bold">Collision at [5] ──&gt; Stored at [6]</span>
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span className="text-[10px] text-secondary-foreground">[7]</span>
                  <span className="px-2 py-0.5 border border-primary/40 bg-accent/10 rounded-sm text-[10px] font-bold">45</span>
                  <span className="text-[9px] text-rose-600 font-bold">Collision at [5], [6] ──&gt; Stored at [7]</span>
                </div>
              </div>
              <p className="text-[11px] text-secondary-foreground font-serif leading-relaxed">
                <strong className="font-bold text-foreground">Explanation</strong>: Keys <code className="font-mono bg-secondary/30 px-1 py-0.5 rounded-sm">35</code> and <code className="font-mono bg-secondary/30 px-1 py-0.5 rounded-sm">45</code> repeatedly collide and search the next slot. This leads to <strong className="font-bold text-foreground">Primary Clustering</strong> (a consecutive block of occupied slots).
              </p>
            </div>
          )}

          {activeTab === "quadratic" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wide">
                  Open Addressing: Quadratic Probing
                </h4>
                <p className="text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
                  "If slot is full, check slot + 1², slot + 2², slot + 3²... to jump clusters!"
                </p>
              </div>

              {/* Quadratic Probing diagram */}
              <div className="flex flex-col gap-1.5 p-3 border border-dashed border-border/80 bg-secondary/5 rounded-sm font-mono text-xs">
                <div className="flex items-center justify-between border-b border-border/30 pb-1 text-[10px] font-bold text-secondary-foreground">
                  <span>Probing Step</span>
                  <span>Calculated Index (Size = 10)</span>
                  <span>Slot Status</span>
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span className="text-[10px] text-secondary-foreground">i = 0 (Home slot)</span>
                  <span className="text-[10px] font-bold">5</span>
                  <span className="text-[9px] text-rose-600 font-bold">Occupied by 25</span>
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span className="text-[10px] text-secondary-foreground">i = 1 (+ 1² = +1)</span>
                  <span className="text-[10px] font-bold">6</span>
                  <span className="text-[9px] text-rose-600 font-bold">Occupied by 35</span>
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span className="text-[10px] text-secondary-foreground">i = 2 (+ 2² = +4)</span>
                  <span className="text-[10px] font-bold">9</span>
                  <span className="text-[9px] text-emerald-600 font-bold">Empty! Key stored here</span>
                </div>
              </div>
              <p className="text-[11px] text-secondary-foreground font-serif leading-relaxed">
                <strong className="font-bold text-foreground">Explanation</strong>: By squaring the step size, we jump over clusters. Key <code className="font-mono bg-secondary/30 px-1 py-0.5 rounded-sm">45</code> starts at <code className="font-mono bg-secondary/30 px-1 py-0.5 rounded-sm">5</code>, skips <code className="font-mono bg-secondary/30 px-1 py-0.5 rounded-sm">6</code>, and lands safely at <code className="font-mono bg-secondary/30 px-1 py-0.5 rounded-sm">9</code>.
              </p>
            </div>
          )}

          {activeTab === "double" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wide">
                  Open Addressing: Double Hashing
                </h4>
                <p className="text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
                  "If slot is full, use a second hash function as your step size!"
                </p>
              </div>

              {/* Double Hashing diagram */}
              <div className="flex flex-col gap-1.5 p-3 border border-dashed border-border/80 bg-secondary/5 rounded-sm font-mono text-xs">
                <div className="flex items-center justify-between border-b border-border/30 pb-1 text-[10px] font-bold text-secondary-foreground">
                  <span>Probing Step</span>
                  <span>Calculated Index (Hash₂ = 3)</span>
                  <span>Slot Status</span>
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span className="text-[10px] text-secondary-foreground">i = 0 (Home slot)</span>
                  <span className="text-[10px] font-bold">5</span>
                  <span className="text-[9px] text-rose-600 font-bold">Occupied</span>
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span className="text-[10px] text-secondary-foreground">i = 1 (+ 1 * 3 = +3)</span>
                  <span className="text-[10px] font-bold">8</span>
                  <span className="text-[9px] text-rose-600 font-bold">Occupied</span>
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span className="text-[10px] text-secondary-foreground">i = 2 (+ 2 * 3 = +6)</span>
                  <span className="text-[10px] font-bold">1 (wraps around)</span>
                  <span className="text-[9px] text-emerald-600 font-bold">Empty! Key stored here</span>
                </div>
              </div>
              <p className="text-[11px] text-secondary-foreground font-serif leading-relaxed">
                <strong className="font-bold text-foreground">Explanation</strong>: The step size is calculated by <code className="font-mono bg-secondary/30 px-1 py-0.5 rounded-sm">Hash₂(key)</code>. Since step size is unique to the key, different keys follow completely different search paths!
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
