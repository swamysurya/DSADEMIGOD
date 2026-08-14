"use client";

import React from "react";

export default function IDEWorkspaceDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      {/* Visual Workspace Card Layout */}
      <div className="border border-border bg-card p-5 w-full max-w-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Step 1: Text Editor */}
        <div className="flex-1 flex flex-col items-center p-3 border border-border bg-secondary/5 w-full">
          <span className="text-[10px] font-extrabold text-[#0550ae] uppercase tracking-wider mb-2">1. The Editor (VS Code)</span>
          <div className="w-full h-24 border border-border bg-card p-2 flex flex-col justify-between font-mono text-[8px] leading-tight text-foreground/75">
            <div>
              <span className="text-rose-600">#include</span> &lt;iostream&gt;<br />
              <span className="text-blue-600">int</span> main() &#123;<br />
              &nbsp;&nbsp;std::cout &lt;&lt; <span className="text-amber-600">"Hi"</span>;<br />
              &#125;
            </div>
            <div className="border-t border-border/40 pt-1 text-[7px] text-secondary-foreground text-center">
              Write & edit text here
            </div>
          </div>
        </div>

        {/* Arrow / Connection */}
        <span className="text-secondary-foreground text-sm font-bold font-serif shrink-0 rotate-90 md:rotate-0">→</span>

        {/* Step 2: C++ Extension Bridge */}
        <div className="flex-1 flex flex-col items-center p-3 border border-border bg-secondary/5 w-full">
          <span className="text-[10px] font-extrabold text-[#0550ae] uppercase tracking-wider mb-2">2. The Bridge (Extension)</span>
          <div className="w-full h-24 border border-border bg-card p-2 flex flex-col justify-center items-center text-center">
            <span className="text-xs font-bold text-foreground">C/C++ Extension</span>
            <span className="text-[9px] text-secondary-foreground mt-1 leading-tight" style={{ fontFamily: "'Caveat', cursive", fontSize: "12px" }}>
              Helps VS Code find your compiler & colorizes your text
            </span>
          </div>
        </div>

        {/* Arrow / Connection */}
        <span className="text-secondary-foreground text-sm font-bold font-serif shrink-0 rotate-90 md:rotate-0">→</span>

        {/* Step 3: Compiler */}
        <div className="flex-1 flex flex-col items-center p-3 border border-border bg-secondary/5 w-full">
          <span className="text-[10px] font-extrabold text-[#0550ae] uppercase tracking-wider mb-2">3. The Translator (Compiler)</span>
          <div className="w-full h-24 border border-border bg-card p-2 flex flex-col justify-center items-center text-center">
            <span className="text-xs font-bold text-foreground">MinGW / GCC</span>
            <span className="text-[9px] text-secondary-foreground mt-1 leading-tight" style={{ fontFamily: "'Caveat', cursive", fontSize: "12px" }}>
              Sits in Windows (PATH) to turn C++ text into main.exe
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
