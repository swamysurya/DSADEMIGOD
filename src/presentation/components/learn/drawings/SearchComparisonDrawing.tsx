"use client";

import React from "react";

export default function SearchComparisonDrawing() {
  const arrayVal = [10, 20, 30, 42, 50];

  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-3xl border border-border bg-card p-6 rounded-sm space-y-8">
        <div>
          <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wide">
            Visualizing Pointer Traversal (Target: 42)
          </h4>
          <p className="text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "15px" }}>
            "See how the pointers physically point to memory slots during the search."
          </p>
        </div>

        {/* 1. LINEAR SEARCH VISUALIZATION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-700">1. Linear Search: One Moving Pointer</span>
            <span className="text-[11px] font-mono text-secondary-foreground">Time Complexity: O(N)</span>
          </div>

          <p className="text-[12px] text-secondary-foreground leading-relaxed">
            In <strong className="font-bold text-foreground">Linear Search</strong>, we start a pointer <code className="font-mono bg-secondary/30 px-1 py-0.5 rounded-sm">i</code> at index 0 and slide it one box to the right (<code className="font-mono bg-secondary/30 px-1 py-0.5 rounded-sm">i = 0, 1, 2, 3...</code>) checking each value until we hit our target.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-secondary/5 p-4 border border-dashed border-border rounded-sm">
            {/* Linear Step 1 */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-foreground">First Check (i = 0)</span>
              <div className="flex justify-start gap-1.5 font-mono">
                {arrayVal.map((val, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="text-[8px] text-secondary-foreground/60">idx {idx}</span>
                    <div className={`w-9 h-9 border ${idx === 0 ? 'border-rose-500 bg-rose-500/10 text-rose-700 font-bold' : 'border-border bg-card text-foreground'} flex items-center justify-center text-xs rounded-sm`}>
                      {val}
                    </div>
                    {idx === 0 && (
                      <div className="flex flex-col items-center mt-1">
                        <span className="text-rose-700 text-xs">▲</span>
                        <span className="text-[9px] font-bold text-rose-700">i</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px" }}>
                "We check index 0. 10 is not 42, so we slide `i` to the right."
              </p>
            </div>

            {/* Linear Step 2 */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-foreground">Found the Target (i = 3)</span>
              <div className="flex justify-start gap-1.5 font-mono">
                {arrayVal.map((val, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="text-[8px] text-secondary-foreground/60">idx {idx}</span>
                    <div className={`w-9 h-9 border ${idx === 3 ? 'border-emerald-600 bg-emerald-500/10 text-emerald-800 font-black' : 'border-border bg-card text-foreground'} flex items-center justify-center text-xs rounded-sm`}>
                      {val}
                    </div>
                    {idx === 3 && (
                      <div className="flex flex-col items-center mt-1">
                        <span className="text-emerald-700 text-xs">▲</span>
                        <span className="text-[9px] font-bold text-emerald-700">i</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px" }}>
                "After checking indices 1 and 2, `i` reaches index 3. 42 is our target! We stop."
              </p>
            </div>
          </div>
        </div>

        {/* 2. BINARY SEARCH VISUALIZATION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700">2. Binary Search: Three Pointers (Low, Mid, High)</span>
            <span className="text-[11px] font-mono text-secondary-foreground">Time Complexity: O(log N)</span>
          </div>

          <p className="text-[12px] text-secondary-foreground leading-relaxed">
            In <strong className="font-bold text-foreground">Binary Search</strong>, we look at the middle value. If it is too small, we discard the left half by moving the <code className="font-mono bg-secondary/30 px-1 py-0.5 rounded-sm">low</code> pointer. If too big, we discard the right half by moving the <code className="font-mono bg-secondary/30 px-1 py-0.5 rounded-sm">high</code> pointer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-secondary/5 p-4 border border-dashed border-border rounded-sm">
            {/* Binary Step 1 */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-foreground">First Division (low = 0, high = 4)</span>
              <div className="flex justify-start gap-1.5 font-mono h-24">
                {arrayVal.map((val, idx) => {
                  const isLow = idx === 0;
                  const isHigh = idx === 4;
                  const isMid = idx === 2;
                  
                  let borderClass = "border-border bg-card";
                  if (isMid) borderClass = "border-amber-600 bg-amber-500/10 text-amber-800 font-bold";

                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <span className="text-[8px] text-secondary-foreground/60">idx {idx}</span>
                      <div className={`w-9 h-9 border ${borderClass} flex items-center justify-center text-xs rounded-sm`}>
                        {val}
                      </div>
                      <div className="flex flex-col items-center mt-1 text-[8px] font-bold space-y-0.5 leading-none">
                        {isLow && (
                          <div className="flex flex-col items-center">
                            <span className="text-amber-800 text-[8px]">▲</span>
                            <span className="text-amber-900 text-[8px]">low</span>
                          </div>
                        )}
                        {isMid && (
                          <div className="flex flex-col items-center">
                            <span className="text-amber-800 text-[8px]">▲</span>
                            <span className="text-amber-950 text-[9px] font-black underline">mid</span>
                          </div>
                        )}
                        {isHigh && (
                          <div className="flex flex-col items-center">
                            <span className="text-amber-800 text-[8px]">▲</span>
                            <span className="text-amber-900 text-[8px]">high</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] text-secondary-foreground mt-2" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px" }}>
                "We check middle slot index 2. 30 &lt; 42, so 42 must be in the right half. We move low to index 3 (mid + 1)."
              </p>
            </div>

            {/* Binary Step 2 */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-foreground">Second Division (low = 3, high = 4)</span>
              <div className="flex justify-start gap-1.5 font-mono h-24">
                {arrayVal.map((val, idx) => {
                  const isLow = idx === 3;
                  const isHigh = idx === 4;
                  const isMid = idx === 3; // low=3, high=4, mid=(3+4)/2 = 3
                  
                  let borderClass = "border-border bg-card";
                  if (isMid) borderClass = "border-emerald-600 bg-emerald-500/20 text-emerald-800 font-black";

                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <span className="text-[8px] text-secondary-foreground/60">idx {idx}</span>
                      <div className={`w-9 h-9 border ${borderClass} flex items-center justify-center text-xs rounded-sm`}>
                        {val}
                      </div>
                      <div className="flex flex-col items-center mt-1 text-[8px] font-bold space-y-0.5 leading-none">
                        {isLow && isMid && (
                          <div className="flex flex-col items-center">
                            <span className="text-emerald-700 text-[8px]">▲</span>
                            <span className="text-emerald-800 text-[8px]">low/mid</span>
                          </div>
                        )}
                        {isHigh && (
                          <div className="flex flex-col items-center">
                            <span className="text-amber-800 text-[8px]">▲</span>
                            <span className="text-amber-900 text-[8px]">high</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] text-secondary-foreground mt-2" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px" }}>
                "We calculate the new mid: (3 + 4) / 2 = 3. mid is index 3. 42 matches our target! We stop."
              </p>
            </div>
          </div>
        </div>

        {/* 3. HASHING (O(1)) ADVANTAGE BAR */}
        <div className="p-4 border border-emerald-600/30 bg-emerald-500/5 rounded-sm flex items-center justify-between text-xs font-mono">
          <div className="space-y-0.5">
            <span className="text-[10px] font-black uppercase text-emerald-800">The Hashing Superpower: O(1)</span>
            <p className="text-[10px] text-secondary-foreground font-serif leading-relaxed">
              Instead of using pointers to traverse or search the boxes, Hashing uses a formula to calculate the exact index position instantly!
            </p>
          </div>
          <div className="p-2 border border-emerald-600 bg-card text-emerald-800 font-bold text-center text-[10px] shrink-0">
            Index = Hash(42)<br />
            Go to slot directly!
          </div>
        </div>

      </div>
    </div>
  );
}
