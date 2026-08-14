"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CountingStage = "input" | "frequency" | "cumulative" | "output";

interface StageInfo {
  id: CountingStage;
  title: string;
  stepName: string;
  badge: string;
  explanation: string;
  visual: React.ReactNode;
}

export default function CountingSortDrawing() {
  const [activeStage, setActiveStage] = useState<CountingStage>("input");

  const stages: StageInfo[] = [
    {
      id: "input",
      title: "1. The Starting Array",
      stepName: "Input Array",
      badge: "Unsorted",
      explanation: "We are given an array of integers. Since the numbers are small (ranging from 1 to 4), we can sort them by counting their frequencies instead of comparing them in pairs.",
      visual: (
        <div className="flex flex-col items-center gap-1 font-mono">
          <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Original Array</span>
          <div className="flex border border-[#DDD7CC] bg-[#FCFBF8] rounded-sm shadow-sm overflow-hidden">
            {[4, 1, 2, 1, 3].map((val, idx) => (
              <div key={idx} className="flex flex-col items-center w-12 border-[#DDD7CC] border-r last:border-r-0">
                <div className="h-10 flex items-center justify-center font-bold text-foreground text-sm">{val}</div>
                <div className="w-full text-center border-t border-[#DDD7CC] bg-[#F4F1EA]/30 text-[9px] text-muted-foreground py-0.5">[{idx}]</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "frequency",
      title: "2. Counting Frequencies",
      stepName: "Count Array",
      badge: "Frequency Map",
      explanation: "We create a new array (called the Count Array) of size 5 (indices 0 to 4). We scan our original array and increment the count at the index matching the value we see.",
      visual: (
        <div className="flex flex-col items-center gap-2 font-mono">
          <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">Count Array (Frequencies)</span>
          <div className="flex border border-[#DDD7CC] bg-[#FCFBF8] rounded-sm shadow-sm overflow-hidden">
            {/* Count array values for [4, 1, 2, 1, 3]: 0->0, 1->2, 2->1, 3->1, 4->1 */}
            {[0, 2, 1, 1, 1].map((countVal, idx) => (
              <div key={idx} className="flex flex-col items-center w-12 border-[#DDD7CC] border-r last:border-r-0">
                <div className="h-10 flex flex-col items-center justify-center font-bold text-[#3F51B5] text-sm">
                  <span>{countVal}</span>
                  {countVal > 0 && <span className="text-[8px] font-normal text-muted-foreground">({countVal}x)</span>}
                </div>
                <div className="w-full text-center border-t border-[#DDD7CC] bg-[#F4F1EA]/30 text-[9px] text-[#3F51B5] py-0.5 font-bold">[{idx}]</div>
              </div>
            ))}
          </div>
          <span style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }} className="text-[#3F51B5]">
            "Number 1 appears 2 times, numbers 2, 3, and 4 appear 1 time."
          </span>
        </div>
      )
    },
    {
      id: "cumulative",
      title: "3. Accumulating Positions",
      stepName: "Cumulative Sum",
      badge: "Index Allocator",
      explanation: "We modify the Count Array by adding each cell's value to the previous cell. This cumulative sum tells us the exact ending position (index) of each number in our final sorted output.",
      visual: (
        <div className="flex flex-col md:flex-row items-center gap-6 font-mono w-full justify-center py-2">
          
          {/* Before Cumulative Sum */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[8px] uppercase font-extrabold text-muted-foreground tracking-wider">Before (Frequencies)</span>
            <div className="flex border border-[#DDD7CC] bg-[#FCFBF8] rounded-sm shadow-sm overflow-hidden opacity-60">
              {[0, 2, 1, 1, 1].map((countVal, idx) => (
                <div key={idx} className="flex flex-col items-center w-10 border-[#DDD7CC] border-r last:border-r-0">
                  <div className="h-8 flex items-center justify-center text-xs text-foreground">{countVal}</div>
                  <div className="w-full text-center border-t border-[#DDD7CC] bg-[#F4F1EA]/30 text-[8px] text-muted-foreground py-0.5">[{idx}]</div>
                </div>
              ))}
            </div>
          </div>

          {/* Transition Formula Badge */}
          <div className="flex flex-col items-center text-center">
            <span className="text-xl text-[#3F51B5]">➔</span>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: "12px" }} className="text-muted-foreground">
              count[i] += count[i-1]
            </span>
          </div>

          {/* After Cumulative Sum */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[8px] uppercase font-extrabold text-[#2E7D32] tracking-wider">After (Cumulative positions)</span>
            <div className="flex border-2 border-[#2E7D32] bg-white rounded-sm shadow-sm overflow-hidden">
              {[0, 2, 3, 4, 5].map((cumVal, idx) => (
                <div key={idx} className="flex flex-col items-center w-10 border-[#DDD7CC] border-r last:border-r-0">
                  <div className="h-8 flex items-center justify-center font-bold text-[#2E7D32] text-xs">{cumVal}</div>
                  <div className="w-full text-center border-t border-[#DDD7CC] bg-[#F4F1EA]/30 text-[8px] text-[#2E7D32] py-0.5 font-bold">[{idx}]</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )
    },
    {
      id: "output",
      title: "4. Building the Sorted Array",
      stepName: "Sorted Output",
      badge: "Sorted",
      explanation: "We scan our original array from right-to-left. For each element, we check its cumulative position index in the Count Array, place it at that spot in the Output Array, and decrement the count.",
      visual: (
        <div className="flex flex-col items-center gap-1 font-mono">
          <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Final Sorted Array</span>
          <div className="flex border border-[#DDD7CC] bg-[#FCFBF8] rounded-sm shadow-sm overflow-hidden">
            {[1, 1, 2, 3, 4].map((val, idx) => (
              <div key={idx} className="flex flex-col items-center w-12 border-[#DDD7CC] border-r last:border-r-0">
                <div className="h-10 flex items-center justify-center font-bold text-[#2E7D32] text-sm">{val}</div>
                <div className="w-full text-center border-t border-[#DDD7CC] bg-[#F4F1EA]/30 text-[9px] text-muted-foreground py-0.5">[{idx}]</div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  const current = stages.find((s) => s.id === activeStage)!;

  const handlePrevious = () => {
    const currentIndex = stages.findIndex((s) => s.id === activeStage);
    if (currentIndex > 0) {
      setActiveStage(stages[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    const currentIndex = stages.findIndex((s) => s.id === activeStage);
    if (currentIndex < stages.length - 1) {
      setActiveStage(stages[currentIndex + 1].id);
    }
  };

  return (
    <div className="w-full my-6 select-none flex flex-col items-center font-sans">
      <div className="w-full max-w-2xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[#DDD7CC]/40 pb-3">
          <div>
            <h4 className="text-xs font-black text-foreground uppercase tracking-wider font-mono">
              Counting Sort Visualization
            </h4>
            <p className="text-[13px] text-muted-foreground" style={{ fontFamily: "'Caveat', cursive" }}>
              Explore how we sort elements in linear time by mapping frequencies rather than making comparisons.
            </p>
          </div>
          <span className="px-2 py-0.5 bg-[#3F51B5]/5 border border-[#3F51B5]/30 text-[#3F51B5] font-mono text-[9px] uppercase font-bold rounded-sm">
            Whiteboard Simulation
          </span>
        </div>

        {/* Steps navigation toolbar */}
        <div className="grid grid-cols-4 border border-[#DDD7CC] bg-[#F4F1EA]/30 text-xs font-mono rounded-sm overflow-hidden divide-x divide-[#DDD7CC]">
          {stages.map((stg) => (
            <button
              key={stg.id}
              onClick={() => setActiveStage(stg.id)}
              className={`p-2 flex flex-col items-center text-center transition-all cursor-pointer ${
                activeStage === stg.id
                  ? "bg-[#FCFBF8] text-[#3F51B5] font-bold"
                  : "bg-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="text-[9px] tracking-wide">{stg.stepName}</span>
            </button>
          ))}
        </div>

        {/* Panel Content */}
        <div className="min-h-[205px] flex flex-col justify-between p-4 border border-dashed border-[#DDD7CC] bg-[#F4F1EA]/10 rounded-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="space-y-4 flex-1 flex flex-col justify-between"
            >
              {/* Description */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h5 className="font-serif font-black text-sm text-foreground">
                    {current.title}
                  </h5>
                  <span className="text-[9px] font-mono font-bold bg-[#3F51B5]/5 border border-[#3F51B5]/20 text-[#3F51B5] px-2 py-0.5 rounded-sm">
                    {current.badge}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-serif">
                  {current.explanation}
                </p>
              </div>

              {/* Central Visualization */}
              <div className="py-2 flex items-center justify-center min-h-[70px]">
                {current.visual}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Toolbar Controls */}
        <div className="flex items-center justify-between font-mono pt-1">
          <span className="text-[10px] text-muted-foreground font-bold">
            Step {stages.findIndex((s) => s.id === activeStage) + 1} of 4
          </span>
          
          <div className="flex gap-2">
            <button
              disabled={activeStage === "input"}
              onClick={handlePrevious}
              className="px-3 py-1.5 border border-[#DDD7CC] text-foreground font-bold hover:bg-secondary/10 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer text-[10px] uppercase tracking-wider rounded-sm"
            >
              Prev
            </button>
            <button
              disabled={activeStage === "output"}
              onClick={handleNext}
              className="px-3 py-1.5 bg-[#3F51B5] text-white border border-[#3F51B5] font-bold hover:bg-[#3F51B5]/95 disabled:opacity-30 disabled:hover:bg-[#3F51B5] cursor-pointer text-[10px] uppercase tracking-wider rounded-sm"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
