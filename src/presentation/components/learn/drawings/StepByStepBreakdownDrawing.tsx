"use client";

import React, { useState } from "react";

export default function StepByStepBreakdownDrawing() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const steps = [
    {
      code: "std::",
      label: "1. Standard Namespace",
      desc: "Stands for 'standard'. It tells the computer to look inside the Standard C++ namespace folder where built-in features are stored.",
      color: "border-blue-200 bg-blue-50/30 text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/10 dark:text-blue-400",
      accent: "text-[#0550ae]",
      textColor: "text-[#0550ae]"
    },
    {
      code: "cout",
      label: "2. Output Stream (Screen)",
      desc: "Stands for 'Character Output'. It represents your monitor screen console where text messages are shown.",
      color: "border-amber-200 bg-amber-50/30 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/10 dark:text-amber-400",
      accent: "text-[#b06000]",
      textColor: "text-[#b06000]"
    },
    {
      code: "<<",
      label: "3. Insertion Operator",
      desc: "Think of it as a funnel or direction arrow. It takes the text message on the right and funnels it into the screen on the left.",
      color: "border-rose-200 bg-rose-50/30 text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/10 dark:text-rose-400",
      accent: "text-rose-600 dark:text-rose-400",
      textColor: "text-[#0550ae]"
    },
    {
      code: "\"Hello World!\"",
      label: "4. String Literal (Text)",
      desc: "The actual raw text message you want to print, wrapped inside double quotes to show it is a text sentence.",
      color: "border-emerald-200 bg-emerald-50/30 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/10 dark:text-emerald-400",
      accent: "text-[#1a7f37]",
      textColor: "text-[#cf222e]"
    },
    {
      code: ";",
      label: "5. Semicolon Terminator",
      desc: "The period at the end of the sentence. In C++, almost every instruction command statement must end with a semicolon.",
      color: "border-purple-200 bg-purple-50/30 text-purple-700 dark:border-purple-900/40 dark:bg-purple-950/10 dark:text-purple-400",
      accent: "text-purple-600 dark:text-purple-400",
      textColor: "text-rose-600"
    }
  ];

  const activeStep = hoveredIdx !== null ? steps[hoveredIdx] : null;

  return (
    <div className="w-full my-8 select-none flex flex-col items-center">
      <div className="border border-border/80 bg-card p-6 w-full max-w-2xl shadow-lg rounded-md transition-all duration-300">
        <div className="text-[10px] font-bold text-secondary-foreground uppercase tracking-widest mb-6 text-center">
          Breakdown of std::cout Statement (Interactive Breakdown)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* LEFT SIDE: TOKENS LIST */}
          <div className="p-4 border border-border bg-[#f8f9fa] rounded-md flex flex-col justify-between text-left min-h-[220px] shadow-sm">
            {/* Full Preview */}
            <div className="mb-4 pb-3 border-b border-border/60 font-mono text-xs md:text-sm font-bold flex items-center justify-center bg-card py-1.5 shadow-sm rounded-sm">
              <span 
                onMouseEnter={() => setHoveredIdx(0)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`transition-all duration-150 px-1 py-0.5 rounded-sm cursor-help ${hoveredIdx === 0 ? "bg-blue-200/50 text-blue-800 scale-105" : "text-[#0550ae]"}`}
              >
                std::
              </span>
              <span 
                onMouseEnter={() => setHoveredIdx(1)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`transition-all duration-150 px-1 py-0.5 rounded-sm cursor-help ${hoveredIdx === 1 ? "bg-amber-200/50 text-amber-800 scale-105" : "text-[#b06000]"}`}
              >
                cout
              </span>
              <span 
                onMouseEnter={() => setHoveredIdx(2)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`transition-all duration-150 px-1.5 py-0.5 rounded-sm cursor-help ${hoveredIdx === 2 ? "bg-rose-200/50 text-rose-800 scale-105" : "text-[#0550ae] ml-1"}`}
              >
                &lt;&lt;
              </span>
              <span 
                onMouseEnter={() => setHoveredIdx(3)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`transition-all duration-150 px-2 py-0.5 rounded-sm cursor-help ${hoveredIdx === 3 ? "bg-emerald-200/50 text-emerald-800 scale-105" : "text-[#cf222e] ml-1"}`}
              >
                "Hello World!"
              </span>
              <span 
                onMouseEnter={() => setHoveredIdx(4)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`transition-all duration-150 px-1 py-0.5 rounded-sm cursor-help ${hoveredIdx === 4 ? "bg-purple-200/50 text-purple-800 scale-105" : "text-rose-600 font-extrabold"}`}
              >
                ;
              </span>
            </div>

            {/* Token badging list */}
            <div className="space-y-1.5">
              {steps.map((step, idx) => {
                const isHovered = hoveredIdx === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`py-1 px-3 border font-mono text-xs font-bold rounded-sm transition-all duration-150 cursor-help flex items-center justify-between ${
                      isHovered
                        ? "border-primary bg-primary/5 text-primary shadow-sm scale-[1.01]"
                        : "border-border/40 bg-card text-foreground"
                    }`}
                  >
                    <span>{step.code}</span>
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60 font-sans">
                      Token {idx + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: DYNAMIC HOVERED TEXT */}
          <div className="border border-dashed border-border/80 bg-secondary/5 p-5 rounded-md flex flex-col justify-center text-left min-h-[220px] transition-all duration-300">
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
                  Hover over the code statement above or any token to see what it does!
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 text-center text-[10px] text-muted-foreground select-none italic font-serif">
          * Place your cursor over any code token on the left to inspect its stream path.
        </div>
      </div>
    </div>
  );
}
