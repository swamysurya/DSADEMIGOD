"use client";

import React from "react";
import { Settings } from "lucide-react";

export default function InputOutputDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="border border-border/80 bg-card p-5 w-full max-w-2xl shadow-sm rounded-md text-center">
        <span className="text-[9px] font-bold text-rose-600 uppercase tracking-widest block mb-4 font-mono">
          Visualizing: The Input & Output Data Stream
        </span>

        {/* Outer diagram box */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-secondary/5 border-2 border-primary/10 rounded-md relative min-h-[200px]">
          
          {/* 1. KEYBOARD (std::cin Source) */}
          <div className="flex flex-col items-center w-full md:w-1/4">
            <div className="w-16 h-12 bg-card border border-border flex items-center justify-center rounded shadow-sm relative group hover:border-primary/50 transition-colors">
              {/* Keyboard SVG keys layout */}
              <svg className="w-12 h-8 text-muted-foreground/60" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="96" height="56" rx="4" fill="var(--card)" />
                <line x1="10" y1="12" x2="90" y2="12" strokeDasharray="3 3" />
                <line x1="10" y1="24" x2="90" y2="24" strokeDasharray="3 3" />
                <line x1="10" y1="36" x2="90" y2="36" strokeDasharray="3 3" />
                <line x1="25" y1="48" x2="75" y2="48" strokeWidth="2.5" />
              </svg>
              <div className="absolute -top-2 px-1 text-[8px] bg-card border border-border rounded font-mono font-bold scale-90">
                INPUT
              </div>
            </div>
            <span className="text-[10px] font-bold font-mono text-foreground mt-2">
              Keyboard
            </span>
            <span className="text-[9px] font-mono text-muted-foreground mt-0.5">
              (std::cin)
            </span>
          </div>

          {/* Arrow 1: cin >> (Extraction) */}
          <div className="flex flex-col items-center justify-center w-full md:w-1/6 py-2">
            <div className="flex items-center gap-0.5">
              <span className="text-primary font-bold text-sm tracking-tighter">&gt;&gt;</span>
              <div className="h-0.5 w-12 bg-primary relative">
                <span className="absolute right-0 -top-1 text-primary font-bold text-[9px] leading-none">➔</span>
              </div>
            </div>
            <span 
              className="text-amber-700 mt-1 select-none font-bold text-[14px]"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              Extraction
            </span>
          </div>

          {/* 2. VARIABLE CONTAINER (Memory RAM) */}
          <div className="flex flex-col items-center w-full md:w-1/4">
            <div className="w-14 h-14 bg-card border-2 border-dashed border-primary/40 flex flex-col items-center justify-center rounded-md relative shadow-sm hover:border-primary transition-colors">
              <div className="w-10 h-8 border border-border/80 bg-secondary/15 rounded flex items-center justify-center">
                <span className="font-mono text-[10px] text-primary font-bold">10</span>
              </div>
              <div className="absolute -top-2.5 px-1.5 py-0.5 bg-primary text-primary-foreground font-mono text-[8px] font-bold rounded-sm shadow-sm scale-90">
                age
              </div>
            </div>
            <span className="text-[10px] font-bold font-mono text-foreground mt-2">
              RAM Variable
            </span>
            <span className="text-[9px] font-mono text-muted-foreground mt-0.5">
              (int container)
            </span>
          </div>

          {/* Arrow 2: cout << (Insertion) */}
          <div className="flex flex-col items-center justify-center w-full md:w-1/6 py-2">
            <div className="flex items-center gap-0.5">
              <div className="h-0.5 w-12 bg-primary relative">
                <span className="absolute right-0 -top-1 text-primary font-bold text-[9px] leading-none">➔</span>
              </div>
              <span className="text-primary font-bold text-sm tracking-tighter">&lt;&lt;</span>
            </div>
            <span 
              className="text-amber-700 mt-1 select-none font-bold text-[14px]"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              Insertion
            </span>
          </div>

          {/* 3. MONITOR SCREEN (std::cout Destination) */}
          <div className="flex flex-col items-center w-full md:w-1/4">
            <div className="w-16 h-12 bg-[#1e1e1a] border border-[#2d2d27] rounded flex flex-col items-center justify-center shadow-md relative group hover:border-[#3f3f37] transition-colors">
              <div className="font-mono text-[9px] text-emerald-400 flex items-center gap-0.5">
                <span>&gt;</span>
                <span className="animate-pulse">_</span>
              </div>
              <div className="absolute -bottom-2 w-4 h-2 bg-neutral-600 rounded-t-sm" />
              <div className="absolute -bottom-2.5 w-8 h-0.5 bg-neutral-500" />
              <div className="absolute -top-2 px-1 text-[8px] bg-card border border-border rounded font-mono font-bold text-foreground scale-90">
                SCREEN
              </div>
            </div>
            <span className="text-[10px] font-bold font-mono text-foreground mt-4">
              Console Screen
            </span>
            <span className="text-[9px] font-mono text-muted-foreground mt-0.5">
              (std::cout)
            </span>
          </div>

        </div>

        <div 
          className="text-[13px] text-amber-800 text-center font-bold mt-4"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          * Notice: cin pushes keyboard values into the variable. cout pulls values out of the variable to print.
        </div>
      </div>
    </div>
  );
}
