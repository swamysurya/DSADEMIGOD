"use client";

import React, { useState } from "react";

export default function NamespacesDrawing() {
  const [selectedNamespace, setSelectedNamespace] = useState<"math" | "physics" | null>(null);

  return (
    <div className="w-full my-8 select-none flex flex-col items-center">
      <div className="border border-border/80 bg-card p-6 w-full max-w-2xl shadow-lg rounded-md transition-all duration-300">
        <div className="text-[10px] font-bold text-secondary-foreground uppercase tracking-widest mb-6 text-center">
          How Namespaces Avoid Name Clashes (Interactive Demo)
        </div>

        {/* Analogy explanation banner */}
        <div className="mb-6 p-3 bg-secondary/15 border border-border/60 text-xs text-foreground/90 font-serif leading-relaxed rounded-sm">
          Imagine two jars labeled <span className="font-mono font-bold">value</span> on different shelves. 
          To tell the compiler which jar to open, we use the shelf name followed by <span className="font-mono font-bold text-rose-600 font-extrabold">::</span> (the scope resolution operator).
        </div>

        {/* Flex container for the namespace shelves */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-6">
          
          {/* Math Shelf */}
          <div 
            onMouseEnter={() => setSelectedNamespace("math")}
            onMouseLeave={() => setSelectedNamespace(null)}
            className={`p-5 border transition-all duration-300 flex flex-col justify-between min-h-[160px] rounded-md ${
              selectedNamespace === "math"
                ? "border-blue-500 bg-blue-50/20 shadow-md scale-[1.01] dark:border-blue-600 dark:bg-blue-950/20"
                : "border-border bg-[#f8f9fa] dark:bg-secondary/5"
            }`}
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Namespace Math
                </span>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60">
                  Scope: Math::
                </span>
              </div>
              
              <div className="border border-blue-200 dark:border-blue-900 bg-card p-3 rounded-sm relative flex flex-col items-center">
                <span className="text-[9px] text-muted-foreground/80 absolute top-1 left-2 font-mono">
                  0x7ffd1
                </span>
                <div className="text-[11px] font-bold text-blue-700 dark:text-blue-400 font-mono mt-1">
                  int value = 5;
                </div>
                <div className="text-[18px] font-bold mt-2 font-serif text-foreground">
                  [ 5 ]
                </div>
              </div>
            </div>
            
            <div 
              className="mt-3 text-xs text-secondary-foreground leading-snug font-semibold text-center"
              style={{ fontFamily: "'Caveat', cursive", fontSize: "16px" }}
            >
              Math shelf holds variable "value" set to 5.
            </div>
          </div>

          {/* Physics Shelf */}
          <div 
            onMouseEnter={() => setSelectedNamespace("physics")}
            onMouseLeave={() => setSelectedNamespace(null)}
            className={`p-5 border transition-all duration-300 flex flex-col justify-between min-h-[160px] rounded-md ${
              selectedNamespace === "physics"
                ? "border-amber-500 bg-amber-50/20 shadow-md scale-[1.01] dark:border-amber-600 dark:bg-amber-950/20"
                : "border-border bg-[#f8f9fa] dark:bg-secondary/5"
            }`}
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Namespace Physics
                </span>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60">
                  Scope: Physics::
                </span>
              </div>
              
              <div className="border border-amber-200 dark:border-amber-900 bg-card p-3 rounded-sm relative flex flex-col items-center">
                <span className="text-[9px] text-muted-foreground/80 absolute top-1 left-2 font-mono">
                  0x7ffd2
                </span>
                <div className="text-[11px] font-bold text-amber-700 dark:text-amber-400 font-mono mt-1">
                  int value = 10;
                </div>
                <div className="text-[18px] font-bold mt-2 font-serif text-foreground">
                  [ 10 ]
                </div>
              </div>
            </div>
            
            <div 
              className="mt-3 text-xs text-secondary-foreground leading-snug font-semibold text-center"
              style={{ fontFamily: "'Caveat', cursive", fontSize: "16px" }}
            >
              Physics shelf holds variable "value" set to 10.
            </div>
          </div>

        </div>

        {/* Code query and lookup path */}
        <div className="border border-dashed border-border/80 bg-secondary/5 p-4 rounded-md flex flex-col items-center justify-center text-center">
          <div className="text-[10px] font-extrabold text-rose-600 uppercase tracking-widest mb-2">
            Target Lookup
          </div>
          
          <div className="flex gap-4 mb-3">
            <button 
              onMouseEnter={() => setSelectedNamespace("math")}
              onMouseLeave={() => setSelectedNamespace(null)}
              className={`px-3 py-1.5 border text-xs font-mono font-bold transition-all rounded-sm ${
                selectedNamespace === "math" 
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-card border-border hover:bg-secondary/10"
              }`}
            >
              Math::value
            </button>
            
            <button 
              onMouseEnter={() => setSelectedNamespace("physics")}
              onMouseLeave={() => setSelectedNamespace(null)}
              className={`px-3 py-1.5 border text-xs font-mono font-bold transition-all rounded-sm ${
                selectedNamespace === "physics" 
                  ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                  : "bg-card border-border hover:bg-secondary/10"
              }`}
            >
              Physics::value
            </button>
          </div>

          <div 
            className="text-foreground font-semibold leading-relaxed min-h-[44px] flex items-center justify-center max-w-md"
            style={{ fontFamily: "'Caveat', cursive", fontSize: "18px" }}
          >
            {selectedNamespace === "math" && (
              <span className="text-blue-700 dark:text-blue-400">
                {"Compiler goes into \"Math\" box -> finds \"value\" (5) -> prints 5!"}
              </span>
            )}
            {selectedNamespace === "physics" && (
              <span className="text-amber-700 dark:text-amber-400">
                {"Compiler goes into \"Physics\" box -> finds \"value\" (10) -> prints 10!"}
              </span>
            )}
            {!selectedNamespace && (
              <span className="text-muted-foreground">
                Hover over a query button or namespace folder to see the scope path!
              </span>
            )}
          </div>
        </div>

        <div className="mt-5 text-center text-[10px] text-muted-foreground select-none italic font-serif">
          * Notice how both variables share the name 'value' without conflict.
        </div>
      </div>
    </div>
  );
}
