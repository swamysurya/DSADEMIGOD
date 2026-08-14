"use client";

import React from "react";

export default function CountingSortIntuitionDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center font-sans">
      <div className="w-full max-w-2xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-4">
        {/* Header */}
        <div>
          <h4 className="text-xs font-black text-foreground uppercase tracking-wider font-mono">
            Visual Intuition: Reserving Output Slots
          </h4>
          <p className="text-[13px] text-muted-foreground" style={{ fontFamily: "'Caveat', cursive" }}>
            "Cumulative sums define the ending index limits for each number, reserving their territories in the output."
          </p>
        </div>

        {/* Visual Slot Layout Grid */}
        <div className="flex flex-col items-center p-6 border border-dashed border-[#DDD7CC] bg-[#F4F1EA]/10 rounded-sm space-y-6">
          {/* Cumulative Index Bounds */}
          <div className="flex gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 bg-[#3F51B5]/5 border border-[#3F51B5]/20 text-[#3F51B5] px-2 py-1 rounded-sm">
              <span className="font-bold">count[1] = 2</span>
              <span className="text-[9px] text-muted-foreground">(Ends at index 1)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#2E7D32]/5 border border-[#2E7D32]/20 text-[#2E7D32] px-2 py-1 rounded-sm">
              <span className="font-bold">count[2] = 3</span>
              <span className="text-[9px] text-muted-foreground">(Ends at index 2)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#D97706]/5 border border-[#D97706]/20 text-[#D97706] px-2 py-1 rounded-sm">
              <span className="font-bold">count[3] = 4</span>
              <span className="text-[9px] text-muted-foreground">(Ends at index 3)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#6B46C1]/5 border border-[#6B46C1]/20 text-[#6B46C1] px-2 py-1 rounded-sm">
              <span className="font-bold">count[4] = 5</span>
              <span className="text-[9px] text-muted-foreground">(Ends at index 4)</span>
            </div>
          </div>

          {/* Reserved Territories Array */}
          <div className="flex flex-col items-center w-full max-w-md">
            <span className="text-[9px] font-mono uppercase font-bold text-muted-foreground tracking-wider mb-2">
              Reserved Slots in Output Array
            </span>
            
            <div className="flex w-full border border-[#DDD7CC] rounded-sm shadow-sm overflow-hidden h-14 font-mono text-center">
              
              {/* Slots 0-1 reserved for 1 */}
              <div className="flex-[2] bg-[#3F51B5]/10 border-r border-[#DDD7CC] flex flex-col justify-between py-1 px-1">
                <span className="text-[10px] font-bold text-[#3F51B5] uppercase tracking-wide">1's Zone</span>
                <div className="flex justify-around text-[9px] text-muted-foreground/60 border-t border-[#3F51B5]/10 pt-0.5">
                  <span>idx [0]</span>
                  <span>idx [1]</span>
                </div>
              </div>

              {/* Slot 2 reserved for 2 */}
              <div className="flex-[1] bg-[#2E7D32]/10 border-r border-[#DDD7CC] flex flex-col justify-between py-1 px-1">
                <span className="text-[10px] font-bold text-[#2E7D32] uppercase tracking-wide">2's Zone</span>
                <div className="text-[9px] text-muted-foreground/60 border-t border-[#2E7D32]/10 pt-0.5">
                  <span>idx [2]</span>
                </div>
              </div>

              {/* Slot 3 reserved for 3 */}
              <div className="flex-[1] bg-[#D97706]/10 border-r border-[#DDD7CC] flex flex-col justify-between py-1 px-1">
                <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-wide">3's Zone</span>
                <div className="text-[9px] text-muted-foreground/60 border-t border-[#D97706]/10 pt-0.5">
                  <span>idx [3]</span>
                </div>
              </div>

              {/* Slot 4 reserved for 4 */}
              <div className="flex-[1] bg-[#6B46C1]/10 flex flex-col justify-between py-1 px-1">
                <span className="text-[10px] font-bold text-[#6B46C1] uppercase tracking-wide">4's Zone</span>
                <div className="text-[9px] text-muted-foreground/60 border-t border-[#6B46C1]/10 pt-0.5">
                  <span>idx [4]</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footnote */}
        <div
          className="text-muted-foreground text-[13px] leading-tight pt-1"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          <span className="font-bold text-foreground">Teacher's Note: </span>
          Since we know 2 items are less than or equal to 1, we save indices 0 and 1 for the 1s. Since 3 items are less than or equal to 2 (two 1s + one 2), the 2s take index 2. This structure is pre-allocated in memory before sorting!
        </div>
      </div>
    </div>
  );
}
