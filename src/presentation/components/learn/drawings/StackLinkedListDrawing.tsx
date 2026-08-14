"use client";

import React from "react";

export default function StackLinkedListDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-xl border border-border bg-card p-5 rounded-sm space-y-4">
        <div>
          <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wide">
            Stack Linked List Implementation
          </h4>
          <p className="text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "A stack that grows dynamically. We insert and delete nodes at the Head (top) of the list."
          </p>
        </div>

        {/* Linked List Nodes */}
        <div className="flex flex-col items-center gap-4 p-4 border border-dashed border-border/80 bg-secondary/5 font-mono text-xs">
          
          {/* Head Pointer */}
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-primary uppercase">top / head</span>
            <span className="text-primary font-bold">──▶</span>
            
            {/* Top Node */}
            <div className="flex items-stretch border border-primary bg-accent/10 rounded-sm overflow-hidden">
              <span className="px-2 py-1 font-black text-primary border-r border-primary/30">Val: 30</span>
              <span className="px-2 py-1 text-secondary-foreground">next</span>
            </div>
          </div>

          <div className="text-primary font-bold text-center">│<br/>▼</div>

          {/* Node 2 */}
          <div className="flex items-stretch border border-border bg-card rounded-sm overflow-hidden">
            <span className="px-2 py-1 font-bold border-r border-border/50">Val: 20</span>
            <span className="px-2 py-1 text-secondary-foreground">next</span>
          </div>

          <div className="text-secondary-foreground text-center">│<br/>▼</div>

          {/* Node 3 */}
          <div className="flex items-stretch border border-border bg-card rounded-sm overflow-hidden">
            <span className="px-2 py-1 font-bold border-r border-border/50">Val: 10</span>
            <span className="px-2 py-1 text-secondary-foreground">next</span>
          </div>

          <div className="text-secondary-foreground text-center">│<br/>▼</div>

          {/* null */}
          <span className="text-secondary-foreground/50 font-bold italic">null (Bottom of stack)</span>

          <div className="pt-2 border-t border-border/40 text-[10px] text-secondary-foreground font-serif leading-relaxed text-center">
            * <strong className="font-bold text-foreground">Push</strong>: Create node $\rightarrow$ set <code className="font-mono bg-secondary/30 px-1 py-0.5 rounded-sm">new_node-&gt;next = top</code> $\rightarrow$ set <code className="font-mono bg-secondary/30 px-1 py-0.5 rounded-sm">top = new_node</code>. ($O(1)$ time)
            <br/>
            * <strong className="font-bold text-foreground">Pop</strong>: Temp store <code className="font-mono bg-secondary/30 px-1 py-0.5 rounded-sm">top</code> $\rightarrow$ set <code className="font-mono bg-secondary/30 px-1 py-0.5 rounded-sm">top = top-&gt;next</code> $\rightarrow$ delete temp. ($O(1)$ time)
          </div>

        </div>
      </div>
    </div>
  );
}
