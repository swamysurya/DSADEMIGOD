"use client";

import React from "react";

export default function DivisionMethodDrawing() {
  const tableCapacity = 11;
  const targetIndex = 3;
  const insertedKey = 25;

  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-lg border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-5 shadow-sm">
        <div>
          <h4 className="text-xs font-extrabold text-[#232323] uppercase tracking-wide">
            1. Division Method Math & Array Placement
          </h4>
          <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "We divide the key 25 by capacity 11. The remainder is 3, so we store 25 at index 3."
          </p>
        </div>

        {/* Division method visualization box */}
        <div className="p-4 border border-dashed border-[#DDD7CC] bg-[#F4F1EA]/30 rounded-sm font-mono text-xs flex flex-col items-center space-y-4">
          <div className="text-[10px] text-[#666666] uppercase font-sans font-bold">Calculation</div>
          <div className="text-sm font-black text-[#3F51B5] bg-[#FCFBF8] px-3 py-1 border border-[#DDD7CC] rounded-sm">
            H(25) = 25 % 11 = <span className="underline decoration-2 text-[#3F51B5]">3</span>
          </div>
          
          {/* Visual Array */}
          <div className="w-full space-y-1.5">
            <div className="text-[10px] text-[#666666] font-sans font-bold text-center">Hash Table Array (Capacity 11)</div>
            
            {/* Array Cells Row */}
            <div className="flex flex-wrap justify-center gap-1.5">
              {Array.from({ length: tableCapacity }).map((_, idx) => {
                const isTarget = idx === targetIndex;
                return (
                  <div key={idx} className="flex flex-col items-center space-y-1">
                    {/* Index Label */}
                    <span className="text-[8px] font-mono text-[#666666]">[{idx}]</span>
                    
                    {/* Cell Box */}
                    <div 
                      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border font-mono text-xs font-bold rounded-sm transition-all ${
                        isTarget 
                          ? "bg-[#3F51B5]/10 border-[#3F51B5] text-[#3F51B5] shadow-sm ring-1 ring-[#3F51B5]/30" 
                          : "bg-[#FCFBF8] border-[#DDD7CC] text-[#DDD7CC]"
                      }`}
                    >
                      {isTarget ? insertedKey : "-"}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Label Pointer */}
            <div className="text-center" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
              <span className="text-[#3F51B5] font-bold">↑ key 25 goes here at index 3</span>
            </div>
          </div>
        </div>

        <span className="text-[11px] text-[#666666] block leading-relaxed" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
          "Teacher Tip: Always make the capacity 'm' a prime number! It prevents pattern clusters and spreads out keys uniformly."
        </span>
      </div>
    </div>
  );
}
