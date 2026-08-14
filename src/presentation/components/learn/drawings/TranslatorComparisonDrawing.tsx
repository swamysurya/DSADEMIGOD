"use client";

import React from "react";

export default function TranslatorComparisonDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      {/* Side-by-side comparison containers */}
      <div className="flex flex-col md:flex-row gap-6 w-full items-stretch justify-center max-w-2xl px-2">
        
        {/* Left Side: Compiler (C++) */}
        <div className="flex-1 border border-border bg-card p-5 flex flex-col justify-between space-y-4 min-h-[220px]">
          <div className="space-y-1">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-foreground">The Compiler</h4>
            <p className="text-[12px] font-sans text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "15px" }}>
              "Translates the entire program all at once before running it."
            </p>
          </div>

          {/* Pure HTML Flow Diagram */}
          <div className="flex items-center justify-between w-full gap-2 p-3 border border-dashed border-border/80 bg-secondary/10">
            {/* Source Code */}
            <div className="flex-1 flex flex-col items-center justify-center p-2 border border-border bg-card">
              <span className="text-[9px] font-bold text-foreground/80">Source</span>
              <span className="text-[8px] font-mono text-secondary-foreground mt-0.5">main.cpp</span>
            </div>

            {/* Connecting Arrow */}
            <span className="text-secondary-foreground text-xs font-bold font-serif shrink-0">→</span>

            {/* Translation Box */}
            <div className="flex-1 flex flex-col items-center justify-center p-2 border border-foreground bg-foreground text-background">
              <span className="text-[9px] font-extrabold tracking-wider">COMPILER</span>
            </div>

            {/* Connecting Arrow */}
            <span className="text-secondary-foreground text-xs font-bold font-serif shrink-0">→</span>

            {/* Executable Output */}
            <div className="flex-1 flex flex-col items-center justify-center p-2 border border-emerald-600 bg-emerald-500/10 text-emerald-800 dark:text-emerald-400">
              <span className="text-[9px] font-bold">Executable</span>
              <span className="text-[8px] font-mono mt-0.5">main.exe</span>
            </div>
          </div>

          <div className="pt-2 border-t border-border/40 text-[10px] text-secondary-foreground font-serif leading-relaxed">
            * C++ compiles your source files into a standalone binary file that can run directly on the processor instantly.
          </div>
        </div>

        {/* Right Side: Interpreter (Python) */}
        <div className="flex-1 border border-border bg-card p-5 flex flex-col justify-between space-y-4 min-h-[220px]">
          <div className="space-y-1">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-foreground">The Interpreter</h4>
            <p className="text-[12px] font-sans text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "15px" }}>
              "Translates and executes line-by-line in real time during run."
            </p>
          </div>

          {/* Pure HTML Flow Diagram */}
          <div className="flex items-center justify-between w-full gap-2 p-3 border border-dashed border-border/80 bg-secondary/10">
            {/* Script lines */}
            <div className="flex-1 flex flex-col items-center justify-center p-2 border border-border bg-card">
              <span className="text-[9px] font-bold text-foreground/80">Code Line</span>
              <span className="text-[8px] font-mono text-secondary-foreground mt-0.5 truncate max-w-full">print("Hi")</span>
            </div>

            {/* Connecting Arrow */}
            <span className="text-secondary-foreground text-xs font-bold font-serif shrink-0">→</span>

            {/* Translation Box */}
            <div className="flex-1 flex flex-col items-center justify-center p-2 border border-foreground bg-foreground text-background">
              <span className="text-[9px] font-extrabold tracking-wider">ENGINE</span>
            </div>

            {/* Connecting Arrow */}
            <span className="text-secondary-foreground text-xs font-bold font-serif shrink-0">→</span>

            {/* Instant Output */}
            <div className="flex-1 flex flex-col items-center justify-center p-2 border border-rose-600 bg-rose-500/10 text-rose-800 dark:text-rose-400">
              <span className="text-[9px] font-bold">Execution</span>
              <span className="text-[8px] font-mono mt-0.5">Print "Hi"</span>
            </div>
          </div>

          <div className="pt-2 border-t border-border/40 text-[10px] text-secondary-foreground font-serif leading-relaxed">
            * Python translates and executes each code line on-the-fly. No separate executable file is ever saved.
          </div>
        </div>

      </div>
    </div>
  );
}
