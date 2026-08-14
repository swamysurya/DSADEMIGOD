"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, RotateCcw, Maximize2, Minimize2 } from "lucide-react";

interface SimulationStep {
  title: string;
  activeKey: number | null;
  formula: string | null;
  explanation: string;
  tableState: Record<number, number[]>;
}

export default function ChainingSimulation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  // Prevent background scroll when focus modal is open
  useEffect(() => {
    if (isFocused) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFocused]);

  const steps: SimulationStep[] = [
    {
      title: "Initial Table State",
      activeKey: null,
      formula: null,
      explanation: "We begin with a fresh, empty Hash Table of size 10 (indexes 0 to 9). We want to insert ten keys: 15, 25, 35, 8, 18, 28, 42, 52, 99, and 7. Click 'Next Step' to insert the first key.",
      tableState: {}
    },
    {
      title: "Inserting Key 15",
      activeKey: 15,
      formula: "15 % 10 = 5",
      explanation: "Key 15 hashes to slot [5] (15 % 10 = 5). Since slot [5] is empty, we store 15 there.",
      tableState: {
        5: [15]
      }
    },
    {
      title: "Inserting Key 25 (Collision!)",
      activeKey: 25,
      formula: "25 % 10 = 5",
      explanation: "Key 25 hashes to slot [5]. Since 15 already occupies slot [5], a collision occurs! We chain 25 right after 15 (15 ➔ 25).",
      tableState: {
        5: [15, 25]
      }
    },
    {
      title: "Inserting Key 35 (Another Collision!)",
      activeKey: 35,
      formula: "35 % 10 = 5",
      explanation: "Key 35 also hashes to slot [5]. It collides with the existing nodes, so we append it to the end of the slot [5] chain (15 ➔ 25 ➔ 35).",
      tableState: {
        5: [15, 25, 35]
      }
    },
    {
      title: "Inserting Key 8",
      activeKey: 8,
      formula: "8 % 10 = 8",
      explanation: "Key 8 hashes to slot [8]. Index 8 is empty, so 8 is stored directly.",
      tableState: {
        5: [15, 25, 35],
        8: [8]
      }
    },
    {
      title: "Inserting Key 18 (Collision!)",
      activeKey: 18,
      formula: "18 % 10 = 8",
      explanation: "Key 18 hashes to slot [8], colliding with 8. We chain 18 to 8 (8 ➔ 18).",
      tableState: {
        5: [15, 25, 35],
        8: [8, 18]
      }
    },
    {
      title: "Inserting Key 28 (Another Collision!)",
      activeKey: 28,
      formula: "28 % 10 = 8",
      explanation: "Key 28 hashes to slot [8] and gets appended to the end of the slot [8] chain (8 ➔ 18 ➔ 28).",
      tableState: {
        5: [15, 25, 35],
        8: [8, 18, 28]
      }
    },
    {
      title: "Inserting Key 42",
      activeKey: 42,
      formula: "42 % 10 = 2",
      explanation: "Key 42 hashes to slot [2]. Index 2 is empty, so 42 is stored directly.",
      tableState: {
        5: [15, 25, 35],
        8: [8, 18, 28],
        2: [42]
      }
    },
    {
      title: "Inserting Key 52 (Collision!)",
      activeKey: 52,
      formula: "52 % 10 = 2",
      explanation: "Key 52 hashes to slot [2], colliding with 42. We chain 52 to 42 (42 ➔ 52).",
      tableState: {
        5: [15, 25, 35],
        8: [8, 18, 28],
        2: [42, 52]
      }
    },
    {
      title: "Inserting Key 99",
      activeKey: 99,
      formula: "99 % 10 = 9",
      explanation: "Key 99 hashes to slot [9]. Index 9 is empty, so 99 is stored directly.",
      tableState: {
        5: [15, 25, 35],
        8: [8, 18, 28],
        2: [42, 52],
        9: [99]
      }
    },
    {
      title: "Inserting Key 7",
      activeKey: 7,
      formula: "7 % 10 = 7",
      explanation: "Key 7 hashes to slot [7]. Index 7 is empty, so 7 is stored directly. All 10 keys are now successfully stored in our size-10 hash table using chains!",
      tableState: {
        5: [15, 25, 35],
        8: [8, 18, 28],
        2: [42, 52],
        9: [99],
        7: [7]
      }
    }
  ];

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  const keysQueue = [15, 25, 35, 8, 18, 28, 42, 52, 99, 7];

  const visualizerContent = (
    <div className={`w-full border border-[#DDD7CC] bg-[#FCFBF8] p-6 rounded-sm space-y-4 shadow-sm transition-all duration-300 ${
      isFocused ? "max-w-2xl m-auto" : ""
    }`}>
      
      {/* Header containing Title, Step counter, and Control buttons on Top */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DDD7CC]/50 pb-3">
        <div>
          <h4 className="text-xs font-extrabold text-[#232323] uppercase tracking-wide flex items-center gap-2">
            Chaining Simulation Visualizer
          </h4>
          <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Watch how colliding elements are linked step-by-step."
          </p>
        </div>
        
        {/* Controls Toolbar on Top */}
        <div className="flex items-center gap-2">
          {/* Focus mode toggle */}
          <button
            onClick={() => setIsFocused(!isFocused)}
            className="p-1.5 border border-[#DDD7CC] rounded-sm text-[10px] font-bold bg-white text-[#666666] hover:bg-[#F4F1EA] cursor-pointer"
            title={isFocused ? "Exit Focus Mode" : "Enter Focus Mode"}
          >
            {isFocused ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleReset}
            disabled={currentStep === 0}
            className={`p-1.5 border border-[#DDD7CC] rounded-sm text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 cursor-pointer transition-colors ${
              currentStep === 0
                ? "opacity-40 cursor-not-allowed"
                : "bg-white text-[#666666] hover:bg-[#F4F1EA]"
            }`}
            title="Reset Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`px-2.5 py-1.5 border border-[#DDD7CC] rounded-sm text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 cursor-pointer transition-colors ${
              currentStep === 0
                ? "opacity-40 cursor-not-allowed"
                : "bg-white text-[#232323] hover:bg-[#F4F1EA]"
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Prev
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className={`px-2.5 py-1.5 border border-[#3F51B5] rounded-sm text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 cursor-pointer transition-colors ${
              currentStep === steps.length - 1
                ? "opacity-40 cursor-not-allowed"
                : "bg-[#3F51B5] text-white hover:bg-[#3F51B5]/90"
            }`}
          >
            Next
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <span className="text-[10px] font-mono font-bold bg-[#F4F1EA] px-2 py-1 border border-[#DDD7CC] rounded-sm text-[#666666] shrink-0">
            {currentStep} / {steps.length - 1}
          </span>
        </div>
      </div>

      {/* Input Keys Queue Visualizer */}
      <div className="p-3 border border-[#DDD7CC] bg-[#F4F1EA]/30 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <span className="text-[9px] uppercase font-bold text-[#666666]">Keys to Insert (10 elements):</span>
        <div className="flex flex-wrap gap-1.5 justify-end">
          {keysQueue.map((k, idx) => {
            const isActive = step.activeKey === k;
            const isInserted = keysQueue.indexOf(step.activeKey!) >= idx;
            return (
              <div
                key={idx}
                className={`w-8 h-7 border flex items-center justify-center font-mono text-[10px] font-bold rounded-sm transition-all duration-200 ${
                  isActive
                    ? "bg-[#3F51B5] border-[#3F51B5] text-white shadow-sm scale-115 animate-pulse"
                    : isInserted && step.activeKey !== null
                    ? "bg-[#2E7D32]/10 border-[#2E7D32]/40 text-[#2E7D32]"
                    : "bg-[#FCFBF8] border-[#DDD7CC] text-[#666666]"
                }`}
              >
                {k}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Simulation Content Area */}
      <div className={`p-4 border border-dashed border-[#DDD7CC] bg-secondary/5 rounded-sm flex flex-col justify-center transition-all ${
        isFocused ? "min-h-[300px]" : "min-h-[220px]"
      }`}>
        <div className="w-full flex flex-col gap-1.5 font-mono text-[10px]">
          {Array.from({ length: 10 }).map((_, i) => {
            const chain = step.tableState[i] || [];
            const isTargetSlot = step.activeKey !== null && (step.activeKey % 10 === i);

            return (
              <div
                key={i}
                className={`flex items-center gap-4 py-1 px-2 rounded-sm transition-colors duration-200 ${
                  isTargetSlot ? "bg-[#3F51B5]/5" : ""
                }`}
              >
                <span className={`w-14 text-right font-bold transition-colors ${
                  isTargetSlot ? "text-[#3F51B5]" : "text-[#666666]"
                }`}>{`Slot [${i}]:`}</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {chain.length === 0 ? (
                    <span className="text-[#666666]/30 italic">null</span>
                  ) : (
                    <>
                      {chain.map((val, idx) => {
                        const isNewNode = val === step.activeKey;
                        return (
                          <React.Fragment key={idx}>
                            <div
                              className={`px-2.5 py-0.5 border rounded-sm font-bold text-[10px] transition-all duration-300 ${
                                isNewNode
                                  ? "bg-[#2E7D32] border-[#2E7D32] text-white scale-110 shadow-sm"
                                  : "bg-[#FCFBF8] stroke-[#DDD7CC] border-[#3F51B5] text-[#3F51B5]"
                              }`}
                            >
                              {val}
                            </div>
                            <span className="text-[#3F51B5] font-black">──▶</span>
                          </React.Fragment>
                        );
                      })}
                      <span className="text-[#666666]/30 italic">null</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Explanation Card */}
      <div className="p-3 border border-[#DDD7CC] bg-[#F4F1EA] rounded-sm space-y-2">
        <div className="flex justify-between items-center border-b border-[#DDD7CC]/50 pb-1">
          <span className="text-[10px] uppercase font-bold text-[#232323]">{step.title}</span>
          {step.formula && (
            <span className="text-[10px] font-mono font-bold text-[#3F51B5] bg-white border border-[#DDD7CC] px-2 py-0.5 rounded-sm">
              Formula: {step.formula}
            </span>
          )}
        </div>
        <p className="text-[11px] text-[#666666] font-serif leading-relaxed">
          {step.explanation}
        </p>
      </div>

    </div>
  );

  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      {/* Inline Render */}
      {!isFocused && visualizerContent}

      {/* Focus Mode Modal Render */}
      {isFocused && (
        <div className="fixed inset-0 z-50 bg-[#232323]/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#FCFBF8] rounded-sm relative">
            {visualizerContent}
          </div>
        </div>
      )}
    </div>
  );
}
