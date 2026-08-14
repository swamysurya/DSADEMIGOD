"use client";

import React from "react";

export default function PrefixSumIntroDrawing() {
  const originalArray = [2, 4, 1, 5, 3];
  const prefixArray = [2, 6, 7, 12, 15];

  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-6 shadow-sm">
        <div>
          <h4 className="text-xs font-extrabold text-[#232323] uppercase tracking-wide">
            Prefix Sum: Input Array vs. Output Array
          </h4>
          <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "A prefix sum array accumulates the values from the beginning up to each index."
          </p>
        </div>

        <div className="flex flex-col gap-6 p-4 border border-dashed border-[#DDD7CC] bg-[#F4F1EA]/25 rounded-sm font-sans">
          {/* Row 1: Original Array A */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#666666]">
                Original (Input) Array A
              </span>
              <span className="text-[9px] font-mono text-muted-foreground/60">
                Size = 5
              </span>
            </div>
            <div className="flex items-center justify-start gap-2.5 overflow-x-auto pb-1">
              {originalArray.map((val, idx) => (
                <div key={`orig-${idx}`} className="flex flex-col items-center min-w-[48px]">
                  <div className="w-12 h-12 border border-[#DDD7CC] bg-white flex items-center justify-center font-mono font-bold text-sm text-[#232323] rounded-sm shadow-sm">
                    {val}
                  </div>
                  <span className="text-[9px] text-[#666666] font-mono mt-1">
                    [{idx}]
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Accumulation Flow */}
          <div className="py-2 border-y border-[#DDD7CC]/40 text-xs space-y-1">
            <span className="text-[9px] uppercase font-bold tracking-wider text-[#666666] block">
              Accumulation Process
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-[11px] font-mono text-[#232323]">
              <div className="p-2 bg-white border border-[#DDD7CC]/50 rounded-sm">
                <div className="font-semibold text-[#3F51B5]">Index 0</div>
                <div className="text-[#666666] mt-0.5">P[0] = A[0]</div>
                <div className="font-bold text-xs mt-1">2 = 2</div>
              </div>
              <div className="p-2 bg-white border border-[#DDD7CC]/50 rounded-sm">
                <div className="font-semibold text-[#3F51B5]">Index 1</div>
                <div className="text-[#666666] mt-0.5">P[1] = P[0] + A[1]</div>
                <div className="font-bold text-xs mt-1">6 = 2 + 4</div>
              </div>
              <div className="p-2 bg-white border border-[#DDD7CC]/50 rounded-sm">
                <div className="font-semibold text-[#3F51B5]">Index 2</div>
                <div className="text-[#666666] mt-0.5">P[2] = P[1] + A[2]</div>
                <div className="font-bold text-xs mt-1">7 = 6 + 1</div>
              </div>
              <div className="p-2 bg-white border border-[#DDD7CC]/50 rounded-sm">
                <div className="font-semibold text-[#3F51B5]">Index 3</div>
                <div className="text-[#666666] mt-0.5">P[3] = P[2] + A[3]</div>
                <div className="font-bold text-xs mt-1">12 = 7 + 5</div>
              </div>
              <div className="p-2 bg-white border border-[#DDD7CC]/50 rounded-sm">
                <div className="font-semibold text-[#3F51B5]">Index 4</div>
                <div className="text-[#666666] mt-0.5">P[4] = P[3] + A[4]</div>
                <div className="font-bold text-xs mt-1">15 = 12 + 3</div>
              </div>
            </div>
          </div>

          {/* Row 2: Prefix Sum Array P */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#3F51B5]">
                Prefix Sum (Output) Array P
              </span>
              <span className="text-[9px] font-mono text-[#3F51B5]/60 font-bold">
                P[i] = Sum(A[0]...A[i])
              </span>
            </div>
            <div className="flex items-center justify-start gap-2.5 overflow-x-auto pb-1">
              {prefixArray.map((val, idx) => (
                <div key={`pref-${idx}`} className="flex flex-col items-center min-w-[48px]">
                  <div className="w-12 h-12 border-2 border-[#3F51B5]/40 bg-[#3F51B5]/5 flex items-center justify-center font-mono font-black text-sm text-[#3F51B5] rounded-sm shadow-sm">
                    {val}
                  </div>
                  <span className="text-[9px] text-[#3F51B5] font-mono font-bold mt-1">
                    [{idx}]
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
