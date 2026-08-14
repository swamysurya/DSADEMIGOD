"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CharacteristicSlide {
  title: string;
  badge: string;
  concept: string;
  analogy: string;
  linearSearchExample: string;
  visualLayout: React.ReactNode;
}

export default function AlgorithmCharacteristicsDrawing() {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const slides: CharacteristicSlide[] = [
    {
      title: "1. Input",
      badge: "Zero or More Inputs",
      concept: "The external data supplied to the algorithm before it runs.",
      analogy: "Like the raw ingredients you hand to a chef to prepare a meal.",
      linearSearchExample: "For Linear Search, our input is the Array [10, 20, 30, 40] and the Target 30.",
      visualLayout: (
        <div className="flex items-center gap-4 justify-center">
          <div className="p-3 border border-[#DDD7CC] bg-[#FCFBF8] rounded-sm text-center shadow-sm">
            <span className="text-[10px] text-secondary-foreground block font-bold uppercase tracking-wider">Array</span>
            <span className="font-mono text-xs text-[#3F51B5] font-bold">[10, 20, 30, 40]</span>
          </div>
          <span className="text-secondary-foreground font-serif text-lg font-bold">+</span>
          <div className="p-3 border border-[#DDD7CC] bg-[#FCFBF8] rounded-sm text-center shadow-sm">
            <span className="text-[10px] text-secondary-foreground block font-bold uppercase tracking-wider">Target</span>
            <span className="font-mono text-xs text-[#3F51B5] font-bold">30</span>
          </div>
        </div>
      )
    },
    {
      title: "2. Output",
      badge: "At Least One Result",
      concept: "The final solution or result produced after execution.",
      analogy: "Like the delicious finished cake that comes out of the oven.",
      linearSearchExample: "For Linear Search, it produces the index position 2 (since 30 is at index 2).",
      visualLayout: (
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex gap-2">
            <div className="px-2 py-1 border border-[#DDD7CC] bg-[#F4F1EA] text-[10px] font-mono rounded-sm">[10]</div>
            <div className="px-2 py-1 border border-[#DDD7CC] bg-[#F4F1EA] text-[10px] font-mono rounded-sm">[20]</div>
            <div className="px-2 py-1 border-2 border-[#3F51B5] bg-[#3F51B5]/5 text-[10px] font-mono rounded-sm font-bold text-[#3F51B5]">[30] at index 2</div>
            <div className="px-2 py-1 border border-[#DDD7CC] bg-[#F4F1EA] text-[10px] font-mono rounded-sm">[40]</div>
          </div>
          <div className="mt-2 text-xs font-mono font-bold text-[#2E7D32] bg-[#2E7D32]/5 border border-[#2E7D32]/30 px-3 py-1.5 rounded-sm">
            Result Output: 2
          </div>
        </div>
      )
    },
    {
      title: "3. Definiteness",
      badge: "Clear & Unambiguous Steps",
      concept: "Every step must have a single, perfectly clear meaning.",
      analogy: "Like exact GPS directions: 'Turn right at Elm St', not 'Go towards a nice street'.",
      linearSearchExample: "Instead of 'check values', the algorithm specifies: 'compare current element with target'.",
      visualLayout: (
        <div className="flex flex-col gap-2 max-w-xs w-full bg-[#FCFBF8] border border-[#DDD7CC] p-3 rounded-sm">
          <div className="flex gap-2 items-start text-xs">
            <span className="text-red-500 font-bold font-sans">✕</span>
            <span className="text-muted-foreground line-through">"Look through the array list." (Vague)</span>
          </div>
          <div className="flex gap-2 items-start text-xs border-t border-[#DDD7CC]/40 pt-2 font-bold text-[#2E7D32]">
            <span className="font-sans">✓</span>
            <span>"Check if A[i] is equal to target. If yes, return i." (Definite)</span>
          </div>
        </div>
      )
    },
    {
      title: "4. Effectiveness",
      badge: "Feasible & Actionable",
      concept: "Every operation must be basic enough to be carried out on paper or a CPU.",
      analogy: "Directions shouldn't tell you to 'teleport to the shop'—they must be physically doable steps.",
      linearSearchExample: "Operations like 'increment i by 1' or 'compare two integers' are hardware-executable.",
      visualLayout: (
        <div className="flex justify-around items-center w-full gap-4 text-center">
          <div className="p-3 border border-[#DDD7CC] bg-white rounded-sm w-[45%]">
            <div className="text-[10px] text-muted-foreground font-bold">FEASIBLE</div>
            <div className="text-xs font-mono text-[#2E7D32] mt-1 font-bold">i = i + 1;</div>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: "13px" }} className="text-[#666666]">Simple assignment</span>
          </div>
          <div className="p-3 border border-red-200 bg-red-50/50 rounded-sm w-[45%]">
            <div className="text-[10px] text-muted-foreground font-bold">NOT FEASIBLE</div>
            <div className="text-xs font-mono text-red-600 mt-1 font-bold">Find largest prime...</div>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: "13px" }} className="text-red-500">Too abstract for 1 step</span>
          </div>
        </div>
      )
    },
    {
      title: "5. Finiteness",
      badge: "Guaranteed Termination",
      concept: "The algorithm must stop after a finite count of steps, never looping infinitely.",
      analogy: "A book must have a last page; a recipe must finish and let you eat the cake.",
      linearSearchExample: "Our search stops immediately when target is found OR we reach index n-1.",
      visualLayout: (
        <div className="flex flex-col items-center gap-2">
          <div className="flex border border-[#DDD7CC] rounded-sm overflow-hidden bg-white">
            <div className="px-3 py-1.5 bg-[#F4F1EA] text-[10px] font-mono border-r border-[#DDD7CC]">index 0</div>
            <div className="px-3 py-1.5 bg-[#F4F1EA] text-[10px] font-mono border-r border-[#DDD7CC]">index 1</div>
            <div className="px-3 py-1.5 bg-[#F4F1EA] text-[10px] font-mono border-r border-[#DDD7CC]">index 2</div>
            <div className="px-3 py-1.5 bg-[#3F51B5]/10 text-[10px] font-mono font-bold text-[#3F51B5] border-r border-[#DDD7CC]">index 3 (End)</div>
          </div>
          <span style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }} className="text-[#3F51B5] font-bold">
            "Array ends at index 3: Search terminates!"
          </span>
        </div>
      )
    }
  ];

  const current = slides[activeSlide];

  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[#DDD7CC]/40 pb-3">
          <div>
            <h4 className="text-xs font-black text-foreground uppercase tracking-wider font-mono">
              Visualizing Algorithm Characteristics
            </h4>
            <p className="text-[13px] text-muted-foreground" style={{ fontFamily: "'Caveat', cursive" }}>
              Click through the slides below to see the 5 characteristics using the Linear Search example.
            </p>
          </div>
          <span className="px-2 py-0.5 bg-[#3F51B5]/5 border border-[#3F51B5]/30 text-[#3F51B5] font-mono text-[9px] uppercase font-bold rounded-sm">
            Interactive Slide
          </span>
        </div>

        {/* Slide Deck Container */}
        <div className="min-h-[220px] flex flex-col justify-between p-5 border border-dashed border-[#DDD7CC] bg-[#F4F1EA]/20 rounded-sm relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 flex-1 flex flex-col justify-between"
            >
              {/* Slide Meta */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h5 className="font-serif font-black text-sm text-foreground">
                    {current.title}
                  </h5>
                  <span className="text-[9px] font-mono font-bold bg-[#3F51B5]/5 border border-[#3F51B5]/20 text-[#3F51B5] px-2 py-0.5 rounded-sm">
                    {current.badge}
                  </span>
                </div>
                <p className="text-xs text-foreground leading-relaxed font-serif">
                  {current.concept}
                </p>
              </div>

              {/* Central Visualization Block */}
              <div className="py-2 flex items-center justify-center min-h-[70px]">
                {current.visualLayout}
              </div>

              {/* Analogy & Example Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-[#DDD7CC]/40 pt-3">
                <div>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Analogy</span>
                  <p className="text-[13px] text-foreground leading-snug" style={{ fontFamily: "'Caveat', cursive" }}>
                    "{current.analogy}"
                  </p>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Linear Search Example</span>
                  <p className="text-[11px] text-muted-foreground font-mono leading-tight">
                    {current.linearSearchExample}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center justify-between pt-1 font-mono">
          <div className="flex gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  activeSlide === idx ? "bg-[#3F51B5]" : "bg-[#DDD7CC] hover:bg-[#666666]"
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-muted-foreground font-bold select-none">
              Slide {activeSlide + 1} of 5
            </span>
            <div className="flex gap-2">
              <button
                disabled={activeSlide === 0}
                onClick={() => setActiveSlide(prev => prev - 1)}
                className="px-3 py-1.5 border border-[#DDD7CC] text-foreground font-bold hover:bg-secondary/10 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer text-[10px] uppercase tracking-wider rounded-sm"
              >
                Prev
              </button>
              <button
                disabled={activeSlide === slides.length - 1}
                onClick={() => setActiveSlide(prev => prev + 1)}
                className="px-3 py-1.5 bg-[#3F51B5] text-white border border-[#3F51B5] font-bold hover:bg-[#3F51B5]/95 disabled:opacity-30 disabled:hover:bg-[#3F51B5] cursor-pointer text-[10px] uppercase tracking-wider rounded-sm"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
