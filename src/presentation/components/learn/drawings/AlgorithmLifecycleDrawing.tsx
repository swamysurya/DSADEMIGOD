"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LifecycleStage = "design" | "analyze" | "validate" | "test";

interface StageInfo {
  id: LifecycleStage;
  step: string;
  title: string;
  question: string;
  badge: string;
  explanation: string;
  visual: React.ReactNode;
}

export default function AlgorithmLifecycleDrawing() {
  const [activeStage, setActiveStage] = useState<LifecycleStage>("design");

  const stages: StageInfo[] = [
    {
      id: "design",
      step: "Phase 1",
      title: "Design",
      question: "How do we solve it?",
      badge: "Formulate Logic",
      explanation: "Creating a step-by-step procedure to solve the problem, often written in natural language or pseudocode first.",
      visual: (
        <div className="flex items-center gap-3 bg-[#FCFBF8] border border-[#DDD7CC] p-3 rounded-sm">
          <div className="p-2 border border-foreground bg-foreground text-background font-mono text-[9px] rounded-sm uppercase font-bold">
            Problem
          </div>
          <span className="text-[#666] text-xs font-bold font-sans">→</span>
          <div className="p-2 border border-[#3F51B5] bg-[#3F51B5]/5 font-mono text-[9px] text-[#3F51B5] rounded-sm font-bold uppercase">
            Pseudocode logic
          </div>
        </div>
      )
    },
    {
      id: "analyze",
      step: "Phase 2",
      title: "Analyze",
      question: "How efficiently does it run?",
      badge: "Evaluate Complexity",
      explanation: "Checking the time complexity (operations count) and space complexity (extra RAM memory) to see how the algorithm behaves as inputs scale.",
      visual: (
        <div className="flex gap-4 justify-center">
          <div className="px-3 py-1.5 border border-[#DDD7CC] bg-[#FCFBF8] rounded-sm text-center">
            <span className="text-[9px] text-muted-foreground uppercase font-bold block">Time Complexity</span>
            <span className="font-mono text-xs font-bold text-[#C0392B]">O(N) Operations</span>
          </div>
          <div className="px-3 py-1.5 border border-[#DDD7CC] bg-[#FCFBF8] rounded-sm text-center">
            <span className="text-[9px] text-muted-foreground uppercase font-bold block">Space Complexity</span>
            <span className="font-mono text-xs font-bold text-[#3F51B5]">O(1) Aux Space</span>
          </div>
        </div>
      )
    },
    {
      id: "validate",
      step: "Phase 3",
      title: "Validate",
      question: "Is the logic mathematically correct?",
      badge: "Correctness Check",
      explanation: "Proving that the algorithm produces the mathematically correct answer for all valid inputs, under every edge condition.",
      visual: (
        <div className="flex flex-col items-center gap-1">
          <div className="text-xs font-mono font-bold text-[#2E7D32] bg-[#2E7D32]/5 border border-[#2E7D32]/30 px-3 py-1 rounded-sm flex items-center gap-1.5">
            <span>✓</span>
            <span>Mathematical Proof of Correctness</span>
          </div>
          <span style={{ fontFamily: "'Caveat', cursive", fontSize: "13px" }} className="text-[#666]">
            "Guarantees correct result, not just termination."
          </span>
        </div>
      )
    },
    {
      id: "test",
      step: "Phase 4",
      title: "Test",
      question: "Does the code handle edge cases?",
      badge: "Bug Discovery",
      explanation: "Running the actual code implementation against extreme edge cases (like empty arrays, negative inputs, large arrays) to verify functional correctness.",
      visual: (
        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono w-full max-w-xs">
          <div className="p-1.5 border border-[#2E7D32] bg-[#2E7D32]/5 text-[#2E7D32] rounded-sm text-center font-bold">
            Empty List → PASS
          </div>
          <div className="p-1.5 border border-[#2E7D32] bg-[#2E7D32]/5 text-[#2E7D32] rounded-sm text-center font-bold">
            Target Absent → PASS
          </div>
          <div className="p-1.5 border border-[#2E7D32] bg-[#2E7D32]/5 text-[#2E7D32] rounded-sm text-center font-bold">
            Large Inputs → PASS
          </div>
          <div className="p-1.5 border border-[#2E7D32] bg-[#2E7D32]/5 text-[#2E7D32] rounded-sm text-center font-bold">
            Single Element → PASS
          </div>
        </div>
      )
    }
  ];

  const current = stages.find((s) => s.id === activeStage)!;

  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-4 font-sans">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[#DDD7CC]/40 pb-3">
          <div>
            <h4 className="text-xs font-black text-foreground uppercase tracking-wider font-mono">
              The Algorithm Lifecycle
            </h4>
            <p className="text-[13px] text-muted-foreground" style={{ fontFamily: "'Caveat', cursive" }}>
              Explore the four key phases of designing and implementing algorithms.
            </p>
          </div>
          <span className="px-2 py-0.5 bg-[#3F51B5]/5 border border-[#3F51B5]/30 text-[#3F51B5] font-mono text-[9px] uppercase font-bold rounded-sm">
            Interactive Lifecycle
          </span>
        </div>

        {/* Steps Timeline Grid */}
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
              <span className="text-[8px] text-muted-foreground/60 uppercase">{stg.step}</span>
              <span className="text-[10px] tracking-wide mt-0.5">{stg.title}</span>
            </button>
          ))}
        </div>

        {/* Display Panel */}
        <div className="min-h-[190px] flex flex-col justify-between p-4 border border-dashed border-[#DDD7CC] bg-[#F4F1EA]/10 rounded-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="space-y-4 flex-1 flex flex-col justify-between"
            >
              {/* Stage Info */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h5 className="font-serif font-black text-sm text-foreground">
                    {current.title} — <span className="italic text-muted-foreground font-normal">{current.question}</span>
                  </h5>
                  <span className="text-[9px] font-mono font-bold bg-[#3F51B5]/5 border border-[#3F51B5]/20 text-[#3F51B5] px-2 py-0.5 rounded-sm">
                    {current.badge}
                  </span>
                </div>
                <p className="text-xs text-foreground font-serif leading-relaxed">
                  {current.explanation}
                </p>
              </div>

              {/* Visualization */}
              <div className="py-1.5 flex items-center justify-center min-h-[70px]">
                {current.visual}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
