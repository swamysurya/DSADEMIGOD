"use client";

import React from "react";

export default function CommentsDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="border border-border/80 bg-card p-5 w-full max-w-2xl shadow-sm rounded-md text-center">
        <span className="text-[9px] font-bold text-rose-600 uppercase tracking-widest block mb-4 font-mono">
          Visualizing: Active Code vs. Comment Blocks
        </span>

        {/* Outer whiteboard layout */}
        <div className="flex flex-col gap-6 p-6 bg-secondary/5 border-2 border-primary/10 rounded-md relative text-left">
          
          {/* 1. Multi-line Comment block wrapper */}
          <div className="border border-amber-600/40 bg-amber-500/5 p-3.5 rounded relative">
            <span className="absolute -top-2.5 left-3 px-1.5 py-0.5 bg-amber-600 text-white font-mono text-[8px] font-bold uppercase rounded-sm shadow-sm">
              Multi-line Comment Box (/* ... */)
            </span>
            <pre className="font-mono text-xs text-[#1a7f37] leading-relaxed">
              {"/*\n  This program displays player statistics.\n  Created by: Bjarne\n*/"}
            </pre>
            <div 
              className="absolute right-3 bottom-1.5 text-xs text-amber-700 font-bold select-none"
              style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}
            >
              * C++ ignores everything inside this square box
            </div>
          </div>

          {/* 2. Active C++ Code line */}
          <div className="border border-indigo-600/30 bg-indigo-500/5 p-3.5 rounded relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="absolute -top-2.5 left-3 px-1.5 py-0.5 bg-indigo-600 text-white font-mono text-[8px] font-bold uppercase rounded-sm shadow-sm">
              Active Executable Code
            </span>
            
            <pre className="font-mono text-xs text-foreground font-semibold">
              {"int level = 5;"}
            </pre>

            <div 
              className="text-xs text-indigo-700 font-bold select-none"
              style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}
            >
              * Compiled and run in memory (RAM)
            </div>
          </div>

          {/* 3. Single-line Comment block wrapper */}
          <div className="border border-emerald-600/40 bg-emerald-500/5 p-3.5 rounded relative">
            <span className="absolute -top-2.5 left-3 px-1.5 py-0.5 bg-emerald-600 text-white font-mono text-[8px] font-bold uppercase rounded-sm shadow-sm">
              Single-line Comment (//)
            </span>
            <pre className="font-mono text-xs text-[#1a7f37] leading-relaxed">
              {"// Start the player at level 5"}
            </pre>
            <div 
              className="absolute right-3 bottom-1.5 text-xs text-emerald-700 font-bold select-none"
              style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}
            >
              * Ignores this single line from the slashes onward
            </div>
          </div>

        </div>

        <div 
          className="text-[13px] text-amber-800 text-center font-bold mt-4"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          * Notice: The C++ compiler completely strips away the amber and emerald boxes, running only the active code inside the blue box!
        </div>
      </div>
    </div>
  );
}
