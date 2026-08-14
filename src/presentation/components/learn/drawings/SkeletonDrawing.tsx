"use client";

import React, { useState } from "react";

export default function SkeletonDrawing() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const steps = [
    {
      code: "#include <iostream>",
      label: "1. Header Include",
      desc: "Imports the standard input-output stream tools. This is what allows your program to print text onto the screen.",
      color: "border-rose-200 bg-rose-50/30 text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/10 dark:text-rose-400",
      accent: "text-[#cf222e]",
      textColor: "text-[#cf222e]"
    },
    {
      code: "int main() {",
      label: "2. Entry Gate Function",
      desc: "The main door where the computer enters. Every standard C++ program must have exactly one main function where execution starts.",
      color: "border-blue-200 bg-blue-50/30 text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/10 dark:text-blue-400",
      accent: "text-[#0550ae]",
      textColor: "text-[#0550ae]"
    },
    {
      code: "    std::cout << \"Hello, World!\";",
      label: "3. Action Statement",
      desc: "The active instruction that prints the greeting text to the monitor screen. Notice the double arrows (<<) funnelling the text.",
      color: "border-amber-200 bg-amber-50/30 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/10 dark:text-amber-400",
      accent: "text-[#b06000]",
      textColor: "text-[#24292f]"
    },
    {
      code: "    return 0;",
      label: "4. Success Exit Signal",
      desc: "Sends a successful exit signal (code 0) back to the operating system, closing the program clean and safe.",
      color: "border-emerald-200 bg-emerald-50/30 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/10 dark:text-emerald-400",
      accent: "text-[#1a7f37]",
      textColor: "text-[#8250df]"
    },
    {
      code: "}",
      label: "5. Scope Boundary Wall",
      desc: "The closing curly brace that marks the end boundary wall of your main program logic.",
      color: "border-zinc-200 bg-zinc-50/30 text-zinc-700 dark:border-zinc-700/40 dark:bg-zinc-800/10 dark:text-zinc-400",
      accent: "text-zinc-600 dark:text-zinc-400",
      textColor: "text-zinc-500"
    }
  ];

  const activeStep = hoveredIdx !== null ? steps[hoveredIdx] : null;

  return (
    <div className="w-full my-8 select-none flex flex-col items-center">
      <div className="border border-border/80 bg-card p-6 w-full max-w-2xl shadow-lg rounded-md transition-all duration-300">
        <div className="text-[10px] font-bold text-secondary-foreground uppercase tracking-widest mb-6 text-center">
          Skeleton of a C++ Program (Interactive Overview)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* LEFT SIDE: CONTIGUOUS CODE BLOCK */}
          <div className="p-4 border border-border bg-[#f8f9fa] rounded-md font-mono text-xs md:text-sm font-bold tracking-wide select-none leading-relaxed flex flex-col justify-center text-left min-h-[180px] shadow-sm">
            {steps.map((step, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`w-full py-1.5 px-3 rounded-sm transition-all duration-200 cursor-help flex items-center justify-between ${
                    isHovered ? "bg-primary/10 shadow-sm scale-[1.01]" : ""
                  }`}
                >
                  <span className={step.textColor}>
                    {idx === 2 ? (
                      <>
                        &nbsp;&nbsp;&nbsp;&nbsp;std::cout &lt;&lt; <span className="text-[#cf222e]">"Hello, World!"</span>;
                      </>
                    ) : idx === 3 ? (
                      <>
                        &nbsp;&nbsp;&nbsp;&nbsp;return <span className="text-[#8250df]">0</span>;
                      </>
                    ) : (
                      step.code
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE: DYNAMIC HOVERED TEXT */}
          <div className="border border-dashed border-border/80 bg-secondary/5 p-5 rounded-md flex flex-col justify-center text-left min-h-[180px] transition-all duration-300">
            {activeStep ? (
              <div className="space-y-2 animate-fadeIn">
                <div className={`text-xs font-extrabold uppercase tracking-wider ${activeStep.accent}`}>
                  {activeStep.label}
                </div>
                <div 
                  className="font-semibold text-foreground" 
                  style={{ fontFamily: "'Caveat', cursive", fontSize: "18px", lineHeight: "1.4" }}
                >
                  {activeStep.desc}
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground flex flex-col items-center justify-center space-y-2 p-4">
                <svg className="w-8 h-8 text-muted-foreground/60 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                <p 
                  className="text-muted-foreground"
                  style={{ fontFamily: "'Caveat', cursive", fontSize: "16px" }}
                >
                  Hover over any code line on the left to see what it does!
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 text-center text-[10px] text-muted-foreground select-none italic font-serif">
          * Place your cursor over any code line on the left to inspect its structure.
        </div>
      </div>
    </div>
  );
}
