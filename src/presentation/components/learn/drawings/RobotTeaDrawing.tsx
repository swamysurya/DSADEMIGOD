"use client";

import React from "react";

export default function RobotTeaDrawing() {
  return (
    <div className="my-6 select-none w-full flex flex-col items-center">
      {/* Responsive timeline layout: stacks on mobile, columns on desktop */}
      <div className="flex flex-col sm:flex-row items-center justify-center w-full py-2 gap-4 sm:gap-5">
        
        {/* Step 1: Grab Cup */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 relative flex items-center justify-center border border-border bg-card shadow-sm">
            <svg className="w-12 h-12 text-foreground/80" viewBox="0 0 50 50">
              {/* Cup */}
              <path d="M 12 15 L 38 15 L 34 40 L 16 40 Z" fill="none" stroke="currentColor" strokeWidth="2" />
              {/* Cup Handle */}
              <path d="M 38 20 C 44 20 44 32 36 32" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <span className="text-[11px] font-bold font-serif text-foreground mt-2">1. Grab Cup</span>
        </div>

        {/* Connector 1 */}
        <Arrow />

        {/* Step 2: Heat Water */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 relative flex items-center justify-center border border-border bg-card shadow-sm">
            <svg className="w-12 h-12 text-foreground/80" viewBox="0 0 50 50">
              {/* Kettle Body */}
              <path d="M 15 38 L 40 38 L 36 20 L 18 20 Z" fill="none" stroke="currentColor" strokeWidth="2" />
              {/* Kettle Handle */}
              <path d="M 18 20 C 18 10 36 10 36 20" fill="none" stroke="currentColor" strokeWidth="2" />
              {/* Spout */}
              <path d="M 36 26 L 43 18 L 41 16 L 35 23" fill="none" stroke="currentColor" strokeWidth="2" />
              {/* Steam */}
              <path d="M 44 14 Q 46 10 44 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M 47 16 Q 49 12 47 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <span className="text-[11px] font-bold font-serif text-foreground mt-2">2. Heat Water</span>
        </div>

        {/* Connector 2 */}
        <Arrow />

        {/* Step 3: Drop Tea Bag */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 relative flex items-center justify-center border border-border bg-card shadow-sm">
            <svg className="w-12 h-12 text-foreground/80" viewBox="0 0 50 50">
              {/* Cup */}
              <path d="M 12 18 L 38 18 L 34 42 L 16 42 Z" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M 38 23 C 44 23 44 35 36 35" fill="none" stroke="currentColor" strokeWidth="2" />
              {/* Tea bag string */}
              <path d="M 25 6 L 25 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" />
              {/* Tea bag label tag */}
              <rect x="22" y="2" width="6" height="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              {/* Tea bag body inside cup */}
              <rect x="21" y="22" width="8" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <span className="text-[11px] font-bold font-serif text-foreground mt-2">3. Drop Bag</span>
        </div>
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex items-center justify-center shrink-0">
      {/* Down arrow on mobile, Right arrow on desktop */}
      <span className="text-secondary-foreground text-sm font-bold font-serif block sm:hidden">↓</span>
      <span className="text-secondary-foreground text-sm font-bold font-serif hidden sm:block">→</span>
    </div>
  );
}
