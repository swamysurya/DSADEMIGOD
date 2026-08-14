"use client";

import React from "react";

export default function HashingCodingPatternsDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-3xl border border-border bg-card p-5 rounded-sm space-y-4">
        <div>
          <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wide">
            Four Core Hashing Problem Patterns
          </h4>
          <p className="text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Learn to match the problem clues to the correct hashing structure."
          </p>
        </div>

        {/* 2x2 Grid of Patterns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Pattern 1 */}
          <div className="p-4 border border-border bg-secondary/5 rounded-sm flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-extrabold text-primary uppercase tracking-wide">Pattern 1: Complement Lookup</span>
              <p className="text-[10px] text-secondary-foreground mt-1">
                Lookup helper values `target - x` that have been stored in the map.
              </p>
            </div>
            <div className="p-2 border border-dashed border-border bg-card rounded-sm font-mono text-[9px] text-center">
              Map: <span className="text-foreground">nums[i] ➔ index</span><br/>
              Check: <span className="font-bold text-primary">target - current</span>
            </div>
            <span className="text-[11px] text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px" }}>
              "Classic example: Two Sum"
            </span>
          </div>

          {/* Pattern 2 */}
          <div className="p-4 border border-border bg-secondary/5 rounded-sm flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-extrabold text-primary uppercase tracking-wide">Pattern 2: Prefix Sum + Hashing</span>
              <p className="text-[10px] text-secondary-foreground mt-1">
                Store frequencies of previous prefix sums to match `sum - K`.
              </p>
            </div>
            <div className="p-2 border border-dashed border-border bg-card rounded-sm font-mono text-[9px] text-center">
              Map: <span className="text-foreground">prefixSum ➔ frequency</span><br/>
              Check: <span className="font-bold text-primary">currentSum - K</span>
            </div>
            <span className="text-[11px] text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px" }}>
              "Classic example: Subarray Sum Equals K"
            </span>
          </div>

          {/* Pattern 3 */}
          <div className="p-4 border border-border bg-secondary/5 rounded-sm flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-extrabold text-primary uppercase tracking-wide">Pattern 3: Existence Check</span>
              <p className="text-[10px] text-secondary-foreground mt-1">
                Use a Hash Set to query whether elements or neighbors exist in $O(1)$.
              </p>
            </div>
            <div className="p-2 border border-dashed border-border bg-card rounded-sm font-mono text-[9px] text-center">
              Set: <span className="text-foreground">[val1, val2, val3...]</span><br/>
              Check: <span className="font-bold text-primary">set.find(x - 1) == end</span>
            </div>
            <span className="text-[11px] text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px" }}>
              "Classic example: Longest Consecutive Sequence"
            </span>
          </div>

          {/* Pattern 4 */}
          <div className="p-4 border border-border bg-secondary/5 rounded-sm flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-extrabold text-primary uppercase tracking-wide">Pattern 4: Canonical Mapping</span>
              <p className="text-[10px] text-secondary-foreground mt-1">
                Generate a sorted signature/key to group related items.
              </p>
            </div>
            <div className="p-2 border border-dashed border-border bg-card rounded-sm font-mono text-[9px] text-center">
              Map: <span className="text-foreground">sortedString ➔ list of strings</span><br/>
              Check: <span className="font-bold text-primary">groups[sortedWord].push(word)</span>
            </div>
            <span className="text-[11px] text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px" }}>
              "Classic example: Group Anagrams"
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
