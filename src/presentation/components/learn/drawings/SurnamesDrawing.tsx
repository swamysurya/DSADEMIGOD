"use client";

import React from "react";

export default function SurnamesDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="border border-border/80 bg-card p-5 w-full max-w-xl shadow-sm rounded-md text-center">
        <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block mb-4">
          Visualizing: The Surname Analogy (Namespaces)
        </span>

        {/* Two families side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2 mb-4">
          
          {/* Family Smith */}
          <div className="p-4 border border-blue-200 bg-blue-50/20 dark:border-blue-900/40 dark:bg-blue-950/10 rounded-md flex flex-col items-center justify-between">
            <span className="text-xs font-black uppercase text-blue-700 dark:text-blue-400 tracking-wider">
              Smith Family (Namespace)
            </span>
            <div className="w-full border border-dashed border-blue-300 dark:border-blue-800 p-3 mt-3 flex flex-col items-center bg-card rounded-sm">
              <svg className="w-8 h-8 text-blue-600/80 mb-1.5" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="25" cy="15" r="7" />
                <path d="M 17 38 C 17 30, 33 30, 33 38" />
              </svg>
              <span className="text-xs font-bold text-foreground">Alex</span>
            </div>
            <div 
              className="text-[12px] text-blue-700 dark:text-blue-400 mt-2 font-mono"
              style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}
            >
              Full name: Smith::Alex
            </div>
          </div>

          {/* Family Jones */}
          <div className="p-4 border border-amber-200 bg-amber-50/20 dark:border-amber-900/40 dark:bg-amber-950/10 rounded-md flex flex-col items-center justify-between">
            <span className="text-xs font-black uppercase text-amber-700 dark:text-amber-400 tracking-wider">
              Jones Family (Namespace)
            </span>
            <div className="w-full border border-dashed border-amber-300 dark:border-amber-800 p-3 mt-3 flex flex-col items-center bg-card rounded-sm">
              <svg className="w-8 h-8 text-amber-600/80 mb-1.5" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="25" cy="15" r="7" />
                <path d="M 17 38 C 17 30, 33 30, 33 38" />
              </svg>
              <span className="text-xs font-bold text-foreground">Alex</span>
            </div>
            <div 
              className="text-[12px] text-amber-700 dark:text-amber-400 mt-2 font-mono"
              style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}
            >
              Full name: Jones::Alex
            </div>
          </div>

        </div>

        <div className="bg-secondary/5 border border-dashed border-border p-3 text-[11px] leading-relaxed text-foreground/90 font-serif rounded-sm">
          In C++, <span className="font-mono font-bold text-blue-700 dark:text-blue-400">Smith</span> and <span className="font-mono font-bold text-amber-700 dark:text-amber-400">Jones</span> are <strong>namespaces</strong>, and the double colon <span className="font-mono font-bold text-rose-600 font-extrabold">::</span> acts as the link telling the compiler which scope to look into.
        </div>
      </div>
    </div>
  );
}
