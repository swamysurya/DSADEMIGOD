"use client";

import React from "react";

export default function StdNamespaceDrawing() {
  const stdFeatures = ["cout", "cin", "endl", "string", "vector"];

  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="border border-border/80 bg-card p-5 w-full max-w-xl shadow-sm rounded-md text-center">
        <span className="text-[9px] font-bold text-rose-600 uppercase tracking-widest block mb-4">
          Visualizing: The std Namespace Container
        </span>

        {/* Big Container Box */}
        <div className="border-2 border-primary bg-secondary/5 p-5 relative min-h-[160px] flex flex-col items-center justify-center mb-4 rounded-md">
          {/* Main big namespace folder badge */}
          <span className="absolute -top-3 left-4 px-2.5 py-0.5 border border-primary bg-primary text-background font-mono text-xs font-bold uppercase tracking-wider rounded-sm">
            Namespace std
          </span>

          {/* Scope Resolution Key indicator */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col items-center select-none">
            <span 
              className="text-xs bg-[#FFF9E6] border border-amber-500/60 text-amber-700 font-mono font-bold px-1.5 py-0.5 shadow-sm transform -rotate-12 rounded-sm"
              style={{ fontFamily: "'Caveat', cursive", fontSize: "16px" }}
            >
              std::
            </span>
            <span className="text-secondary-foreground text-xs font-bold mt-1">➔</span>
          </div>

          <p 
            className="text-muted-foreground text-xs max-w-xs mb-3.5 leading-snug"
            style={{ fontFamily: "'Caveat', cursive", fontSize: "15px" }}
          >
            The standard C++ chest box. All built-in console tools live inside here!
          </p>

          {/* Grid of tools inside the folder */}
          <div className="flex flex-wrap justify-center gap-3 w-full max-w-sm">
            {stdFeatures.map((feat) => (
              <div 
                key={feat} 
                className="px-3 py-1.5 border border-border bg-card font-mono text-xs font-bold text-foreground shadow-sm rounded-sm hover:scale-105 transition-transform duration-100 cursor-help"
              >
                {feat}
              </div>
            ))}
          </div>
        </div>

        <div className="text-[10px] text-muted-foreground italic font-serif">
          * Writing <span className="font-mono font-bold text-foreground">std::cout</span> tells the compiler to search the <span className="font-mono font-bold text-foreground">std</span> container specifically.
        </div>
      </div>
    </div>
  );
}
