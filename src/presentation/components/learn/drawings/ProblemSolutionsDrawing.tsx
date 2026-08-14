"use client";

import React from "react";

export default function ProblemSolutionsDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-4">
        {/* Header */}
        <div>
          <h4 className="text-xs font-black text-foreground uppercase tracking-wider font-mono">
            One Problem, Multiple Solutions
          </h4>
          <p className="text-[13px] text-muted-foreground" style={{ fontFamily: "'Caveat', cursive" }}>
            "A single problem can be solved in many different ways, each with unique tradeoffs."
          </p>
        </div>

        {/* Tree Layout */}
        <div className="flex flex-col items-center p-6 border border-dashed border-[#DDD7CC] bg-[#F4F1EA]/10 rounded-sm space-y-8">
          
          {/* Central Problem Node */}
          <div className="p-4 border-2 border-[#232323] bg-white rounded-sm text-center shadow-md max-w-xs w-full">
            <span className="text-[9px] uppercase font-bold tracking-wider text-muted-foreground block mb-0.5">THE PROBLEM</span>
            <div className="text-sm font-serif font-black text-foreground">
              Find target value in an array
            </div>
            <div className="text-[10px] font-mono text-[#666] mt-1">Input: Array A, Target T</div>
          </div>

          {/* Branch Lines & Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
            
            {/* Solution 1: Linear Search */}
            <div className="p-3.5 border border-[#DDD7CC] bg-white rounded-sm flex flex-col justify-between shadow-sm relative">
              {/* Connector line (for md and up) */}
              <div className="hidden md:block absolute -top-8 left-1/2 -translate-x-1/2 w-px h-8 bg-[#DDD7CC]" />

              <div className="space-y-2">
                <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-700 font-mono text-[9px] font-bold uppercase rounded-sm block w-fit">
                  Solution 1
                </span>
                <h5 className="font-serif font-black text-xs text-foreground">Linear Search</h5>
                <p className="text-[11px] text-muted-foreground font-serif leading-snug">
                  Checks each element from index 0 to N-1 one-by-one.
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-[#DDD7CC]/40 space-y-1 font-mono text-[10px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Complexity:</span>
                  <span className="font-bold text-[#C0392B]">O(N)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Requirement:</span>
                  <span className="font-bold text-foreground">None</span>
                </div>
              </div>
            </div>

            {/* Solution 2: Binary Search */}
            <div className="p-3.5 border border-[#DDD7CC] bg-[#3F51B5]/5 border-t-[#3F51B5] border-t-2 rounded-sm flex flex-col justify-between shadow-sm relative">
              {/* Connector line (for md and up) */}
              <div className="hidden md:block absolute -top-8 left-1/2 -translate-x-1/2 w-px h-8 bg-[#3F51B5]" />

              <div className="space-y-2">
                <span className="px-2 py-0.5 bg-[#3F51B5]/5 border border-[#3F51B5]/20 text-[#3F51B5] font-mono text-[9px] font-bold uppercase rounded-sm block w-fit">
                  Solution 2
                </span>
                <h5 className="font-serif font-black text-xs text-foreground">Binary Search</h5>
                <p className="text-[11px] text-muted-foreground font-serif leading-snug">
                  Halves the search range repeatedly by comparing the middle element.
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-[#DDD7CC]/40 space-y-1 font-mono text-[10px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Complexity:</span>
                  <span className="font-bold text-[#2E7D32]">O(log N)</span>
                </div>
                <div className="flex justify-between text-right">
                  <span className="text-muted-foreground">Requirement:</span>
                  <span className="font-bold text-foreground">Sorted Array</span>
                </div>
              </div>
            </div>

            {/* Solution 3: Hashing */}
            <div className="p-3.5 border border-[#DDD7CC] bg-white rounded-sm flex flex-col justify-between shadow-sm relative">
              {/* Connector line (for md and up) */}
              <div className="hidden md:block absolute -top-8 left-1/2 -translate-x-1/2 w-px h-8 bg-[#DDD7CC]" />

              <div className="space-y-2">
                <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-700 font-mono text-[9px] font-bold uppercase rounded-sm block w-fit">
                  Solution 3
                </span>
                <h5 className="font-serif font-black text-xs text-foreground">Hash Lookup</h5>
                <p className="text-[11px] text-muted-foreground font-serif leading-snug">
                  Maps values directly to memory slot positions.
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-[#DDD7CC]/40 space-y-1 font-mono text-[10px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Complexity:</span>
                  <span className="font-bold text-[#2E7D32]">O(1) Avg</span>
                </div>
                <div className="flex justify-between text-right">
                  <span className="text-muted-foreground">Requirement:</span>
                  <span className="font-bold text-foreground">Extra Memory</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footnote */}
        <div
          className="text-muted-foreground select-none text-[13px] leading-tight pt-1"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          <span className="font-bold text-foreground">Teacher's Summary: </span>
          Algorithms are about trade-offs. Binary Search is faster than Linear Search, but forces you to sort the array first. Hashing is instant, but wastes RAM space. You must choose depending on your constraints!
        </div>
      </div>
    </div>
  );
}
