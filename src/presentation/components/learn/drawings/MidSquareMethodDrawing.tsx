"use client";

import React from "react";

export default function MidSquareMethodDrawing() {
  const targetIndex = 60;
  const insertedKey = 60;

  // We show a segmented array snippet around index 60 to fit on screen cleanly.
  const arraySegment = [57, 58, 59, 60, 61, 62, 63];

  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-lg border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-5 shadow-sm">
        <div>
          <h4 className="text-xs font-extrabold text-[#232323] uppercase tracking-wide">
            2. Mid-Square Method Array Placement
          </h4>
          <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "We square key 60 to get 3600, extract the middle two digits '60', and store 60 at index 60."
          </p>
        </div>

        {/* Mid-Square visualization box */}
        <div className="p-4 border border-dashed border-[#DDD7CC] bg-[#F4F1EA]/30 rounded-sm font-mono text-xs flex flex-col items-center space-y-4">
          <div className="text-[10px] text-[#666666] uppercase font-sans font-bold">Calculation Steps</div>
          
          <div className="w-full text-[10px] text-[#666666] space-y-2 border-b border-[#DDD7CC]/50 pb-3">
            <div className="flex justify-between items-center">
              <span>1. Key:</span>
              <span className="font-bold text-[#232323] text-sm">60</span>
            </div>
            <div className="flex justify-between items-center">
              <span>2. Square (60 × 60):</span>
              <span className="font-bold text-[#232323] text-sm">
                3<span className="text-[#3F51B5] font-black underline decoration-2">60</span>0
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>3. Middle Digits extracted:</span>
              <span className="text-[#3F51B5] font-black text-sm">60</span>
            </div>
          </div>

          {/* Visual Array Snippet */}
          <div className="w-full space-y-1.5">
            <div className="text-[10px] text-[#666666] font-sans font-bold text-center">Hash Table Array (Capacity 100 - Snippet)</div>
            
            <div className="flex items-center justify-center gap-1.5">
              {/* Left dots */}
              <span className="text-[#666666] font-bold text-sm tracking-widest">...</span>

              {arraySegment.map((idx) => {
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

              {/* Right dots */}
              <span className="text-[#666666] font-bold text-sm tracking-widest">...</span>
            </div>

            {/* Label Pointer */}
            <div className="text-center" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
              <span className="text-[#3F51B5] font-bold">↑ key 60 stored at index 60</span>
            </div>
          </div>
        </div>

        <span className="text-[11px] text-[#666666] block leading-relaxed" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
          "Why? Squaring ripples changes throughout the digits, ensuring keys are well distributed!"
        </span>
      </div>
    </div>
  );
}
