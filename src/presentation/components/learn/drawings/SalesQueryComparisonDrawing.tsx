"use client";

import React from "react";

export default function SalesQueryComparisonDrawing() {
  const originalArray = [2, 4, 1, 5, 3];
  const prefixArray = [2, 6, 7, 12, 15];

  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-6 shadow-sm">
        <div>
          <h4 className="text-xs font-extrabold text-[#232323] uppercase tracking-wide">
            Range Sum Query: Without vs. With Prefix Sum
          </h4>
          <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Calculating the sum of elements from index 1 to 3 (values: 4, 1, 5)"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Without Prefix Sum */}
          <div className="border border-[#DDD7CC] p-4 rounded-sm bg-white space-y-4">
            <span className="text-[10px] uppercase font-bold tracking-wider text-rose-700 block">
              🔴 Approach 1: Without Prefix Sum (Looping)
            </span>

            {/* Array showing loop path */}
            <div className="flex items-center gap-1.5 justify-center py-2 bg-secondary/5 rounded border border-border/40">
              {originalArray.map((val, idx) => {
                const isActive = idx >= 1 && idx <= 3;
                return (
                  <div key={`orig-query-${idx}`} className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 flex items-center justify-center font-mono font-bold text-xs rounded-sm border ${
                        isActive
                          ? "border-rose-500 bg-rose-500/10 text-rose-700 shadow-sm"
                          : "border-[#DDD7CC] bg-white text-[#666666] opacity-60"
                      }`}
                    >
                      {val}
                    </div>
                    <span className={`text-[8px] font-mono mt-1 ${isActive ? "text-rose-700 font-bold" : "text-[#666666]"}`}>
                      {isActive ? `★ [${idx}]` : `[${idx}]`}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 text-xs leading-relaxed text-[#666666]">
              <div className="font-semibold text-rose-800 text-[11px]">Execution Steps:</div>
              <ul className="list-disc pl-4 space-y-1 font-mono text-[10px]">
                <li>Visit index 1: <span className="font-bold text-[#232323]">Sum = 4</span></li>
                <li>Visit index 2: Sum = 4 + 1 = <span className="font-bold text-[#232323]">5</span></li>
                <li>Visit index 3: Sum = 5 + 5 = <span className="font-bold text-[#232323]">10</span></li>
              </ul>
              <div className="pt-2 border-t border-[#DDD7CC]/50 mt-2">
                <span className="font-extrabold text-[#232323]">Time Complexity:</span> <code className="font-bold bg-rose-50 text-rose-800 px-1 rounded">O(R - L + 1) → O(N)</code>
                <p className="text-[10px] text-rose-700/80 mt-0.5">Slow for multiple queries!</p>
              </div>
            </div>
          </div>

          {/* Right Column: With Prefix Sum */}
          <div className="border border-[#3F51B5]/30 p-4 rounded-sm bg-white space-y-4">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#3F51B5] block">
              🟢 Approach 2: With Prefix Sum (Formula)
            </span>

            {/* Prefix Array showing lookup */}
            <div className="flex items-center gap-1.5 justify-center py-2 bg-[#3F51B5]/5 rounded border border-[#3F51B5]/20">
              {prefixArray.map((val, idx) => {
                const isR = idx === 3;
                const isLMinus1 = idx === 0;
                return (
                  <div key={`pref-query-${idx}`} className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 flex items-center justify-center font-mono font-bold text-xs rounded-sm border ${
                        isR
                          ? "border-emerald-600 bg-emerald-500/20 text-emerald-800 font-extrabold shadow-sm"
                          : isLMinus1
                          ? "border-rose-600 bg-rose-500/20 text-rose-800 font-extrabold shadow-sm"
                          : "border-[#DDD7CC] bg-white text-[#666666] opacity-60"
                      }`}
                    >
                      {val}
                    </div>
                    <span
                      className={`text-[8px] font-mono mt-1 ${
                        isR
                          ? "text-emerald-800 font-bold"
                          : isLMinus1
                          ? "text-rose-800 font-bold"
                          : "text-[#666666]"
                      }`}
                    >
                      {isR ? "P[3]" : isLMinus1 ? "P[0]" : `[${idx}]`}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 text-xs leading-relaxed text-[#666666]">
              <div className="font-semibold text-[#3F51B5] text-[11px]">Instant Formula:</div>
              <div className="bg-[#3F51B5]/5 p-2 rounded-sm font-mono text-[10px] space-y-1 text-[#232323] border border-[#3F51B5]/10">
                <div>Formula: P[R] - P[L - 1]</div>
                <div>Calculation: P[3] - P[0]</div>
                <div className="font-bold text-[#3F51B5]">Result: 12 - 2 = 10</div>
              </div>
              <div className="pt-2 border-t border-[#DDD7CC]/50 mt-2">
                <span className="font-extrabold text-[#232323]">Time Complexity:</span> <code className="font-bold bg-emerald-50 text-emerald-800 px-1 rounded">O(1) Constant Time</code>
                <p className="text-[10px] text-emerald-800/80 mt-0.5">Instant result regardless of array size!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
