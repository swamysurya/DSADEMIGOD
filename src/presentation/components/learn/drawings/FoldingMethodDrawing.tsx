"use client";

import React from "react";

export default function FoldingMethodDrawing() {
  const targetIndex = 2;
  const insertedKey = 123456;

  // We show index 0 to 5 segment.
  const arraySegment = [0, 1, 2, 3, 4, 5];

  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-lg border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-5 shadow-sm">
        <div>
          <h4 className="text-xs font-extrabold text-[#232323] uppercase tracking-wide">
            3. Folding Method Array Placement
          </h4>
          <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "We slice key 123456 into parts 12, 34, 56. We add them to get 102. Taking 102 % 100 gives 2, so we store 123456 at index 2."
          </p>
        </div>

        {/* Folding visualization box */}
        <div className="p-4 border border-dashed border-[#DDD7CC] bg-[#F4F1EA]/30 rounded-sm font-mono text-xs flex flex-col items-center space-y-4">
          <div className="text-[10px] text-[#666666] uppercase font-sans font-bold">Calculation Steps</div>
          
          <div className="w-full text-[10px] text-[#666666] space-y-2 border-b border-[#DDD7CC]/50 pb-3">
            <div className="flex justify-between items-center">
              <span>1. Large Key:</span>
              <span className="font-bold text-[#232323] text-sm">123456</span>
            </div>
            <div className="flex justify-between items-center">
              <span>2. Slice into 2-digit folds:</span>
              <span className="font-bold text-[#3F51B5] text-sm">
                12 | 34 | 56
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>3. Sum Folds (12 + 34 + 56):</span>
              <span className="font-bold text-[#232323] text-sm">102</span>
            </div>
            <div className="flex justify-between items-center">
              <span>4. Modulo Capacity (102 % 100):</span>
              <span className="text-[#3F51B5] font-black text-sm">2</span>
            </div>
          </div>

          {/* Visual Array Segment */}
          <div className="w-full space-y-1.5">
            <div className="text-[10px] text-[#666666] font-sans font-bold text-center">Hash Table Array (Capacity 100 - Snippet)</div>
            
            <div className="flex items-center justify-center gap-1.5">
              {arraySegment.map((idx) => {
                const isTarget = idx === targetIndex;
                return (
                  <div key={idx} className="flex flex-col items-center space-y-1">
                    {/* Index Label */}
                    <span className="text-[8px] font-mono text-[#666666]">[{idx}]</span>
                    
                    {/* Cell Box */}
                    <div 
                      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border font-mono text-[8px] font-bold rounded-sm transition-all ${
                        isTarget 
                          ? "bg-[#3F51B5]/10 border-[#3F51B5] text-[#3F51B5] shadow-sm ring-1 ring-[#3F51B5]/30 px-0.5 overflow-hidden text-ellipsis" 
                          : "bg-[#FCFBF8] border-[#DDD7CC] text-[#DDD7CC]"
                      }`}
                      title={isTarget ? String(insertedKey) : ""}
                    >
                      {isTarget ? insertedKey : "-"}
                    </div>
                  </div>
                );
              })}

              {/* Right dots */}
              <span className="text-[#666666] font-bold text-sm tracking-widest">...</span>
            </div>

            {/* Label Pointer */}
            <div className="text-center" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
              <span className="text-[#3F51B5] font-bold">↑ key 123456 stored at index 2</span>
            </div>
          </div>
        </div>

        <span className="text-[11px] text-[#666666] block leading-relaxed" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
          "Perfect for folding very large numbers like credit cards, telephone numbers, or social security numbers!"
        </span>
      </div>
    </div>
  );
}
