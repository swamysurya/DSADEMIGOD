"use client";

import React from "react";

export default function ConfusionDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="border border-border/80 bg-card p-5 w-full max-w-xl shadow-sm rounded-none text-center">
        <span className="text-[9px] font-bold text-rose-600 uppercase tracking-widest block mb-4">
          Visualizing: The Naming Collision Problem
        </span>

        {/* Layout: Stacks on mobile, row on desktop */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-2">
          
          {/* Caller (Teacher) */}
          <div className="flex flex-col items-center p-3 border border-border bg-secondary/5 rounded-none w-full md:w-1/3">
            <svg className="w-12 h-12 text-foreground/80 mb-2" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
              {/* Head */}
              <circle cx="25" cy="15" r="8" />
              {/* Body */}
              <path d="M 15 38 C 15 28, 35 28, 35 38" />
              {/* Arm pointing */}
              <path d="M 33 25 L 43 25" />
            </svg>
            <span className="text-[11px] font-bold uppercase tracking-wide text-foreground">Teacher</span>
            <div 
              className="mt-1 text-rose-600 font-extrabold text-sm"
              style={{ fontFamily: "'Caveat', cursive", fontSize: "16px" }}
            >
              "Alex, come here!"
            </div>
          </div>

          {/* Arrow */}
          <span className="text-secondary-foreground text-sm font-bold font-serif shrink-0 rotate-90 md:rotate-0">➔</span>

          {/* Two confused students */}
          <div className="flex-1 flex gap-4 w-full justify-center">
            
            {/* Student 1 */}
            <div className="flex-1 flex flex-col items-center p-3 border border-border bg-[#f8f9fa] dark:bg-secondary/5 relative">
              <span className="absolute -top-2 right-2 text-rose-600 font-bold text-base" style={{ fontFamily: "'Caveat', cursive" }}>?</span>
              <svg className="w-10 h-10 text-foreground/70 mb-2" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="25" cy="15" r="7" />
                <path d="M 17 38 C 17 30, 33 30, 33 38" />
              </svg>
              <span className="text-xs font-bold text-foreground">Alex #1</span>
              <span className="text-[10px] text-muted-foreground mt-0.5" style={{ fontFamily: "'Caveat', cursive" }}>"Who, me?"</span>
            </div>

            {/* Student 2 */}
            <div className="flex-1 flex flex-col items-center p-3 border border-border bg-[#f8f9fa] dark:bg-secondary/5 relative">
              <span className="absolute -top-2 right-2 text-rose-600 font-bold text-base" style={{ fontFamily: "'Caveat', cursive" }}>?</span>
              <svg className="w-10 h-10 text-foreground/70 mb-2" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="25" cy="15" r="7" />
                <path d="M 17 38 C 17 30, 33 30, 33 38" />
              </svg>
              <span className="text-xs font-bold text-foreground">Alex #2</span>
              <span className="text-[10px] text-muted-foreground mt-0.5" style={{ fontFamily: "'Caveat', cursive" }}>"Or him?"</span>
            </div>

          </div>

        </div>

        <div className="mt-4 border-t border-border/40 pt-2 text-[10px] text-muted-foreground italic font-serif">
          * Without a prefix (surname), the system gets confused by duplicated names.
        </div>
      </div>
    </div>
  );
}
