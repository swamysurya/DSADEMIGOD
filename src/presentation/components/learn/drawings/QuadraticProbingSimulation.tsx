"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, RotateCcw, Maximize2, Minimize2 } from "lucide-react";

interface SimulationStep {
  activeKey: number | null;
  formula: string | null;
  explanation: string;
  arrayState: (number | null)[];
  probedIndexes: number[];
}

export default function QuadraticProbingSimulation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

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
      activeKey: null,
      formula: null,
      explanation: "We start with an empty array of capacity 10. We will insert the same 10 keys: 15, 25, 35, 45, 55, 18, 28, 38, 48, and 58. Watch how Quadratic Probing's step increments (i² = +1, +4, +9...) distribute colliding elements, but still result in secondary clustering when keys share the same hash value.",
      arrayState: [null, null, null, null, null, null, null, null, null, null],
      probedIndexes: []
    },
    {
      activeKey: 15,
      formula: "15 % 10 = 5",
      explanation: "Key 15 hashes to index 5. Slot [5] is empty, so 15 is stored directly.",
      arrayState: [null, null, null, null, null, 15, null, null, null, null],
      probedIndexes: [5]
    },
    {
      activeKey: 25,
      formula: "25 % 10 = 5 (Collision!)",
      explanation: "Key 25 hashes to index 5 (occupied). We calculate the next probing slot using offset 1² = 1: index 5 + 1 = 6. Slot [6] is empty, so we store 25.",
      arrayState: [null, null, null, null, null, 15, 25, null, null, null],
      probedIndexes: [5, 6]
    },
    {
      activeKey: 35,
      formula: "35 % 10 = 5 (Collision!)",
      explanation: "Key 35 hashes to index 5. It probes 5 + 1² = 6 (occupied), and probes 5 + 2² = 9. Slot [9] is empty, so we store 35 there.",
      arrayState: [null, null, null, null, null, 15, 25, null, null, 35],
      probedIndexes: [5, 6, 9]
    },
    {
      activeKey: 45,
      formula: "45 % 10 = 5 (Collision!)",
      explanation: "Key 45 hashes to index 5. It probes 5 + 1² = 6 (occupied), 5 + 2² = 9 (occupied), and probes 5 + 3² = 14 % 10 = 4. Slot [4] is empty, so we store 45 there.",
      arrayState: [null, null, null, null, 45, 15, 25, null, null, 35],
      probedIndexes: [5, 6, 9, 4]
    },
    {
      activeKey: 55,
      formula: "55 % 10 = 5 (Collision!)",
      explanation: "Key 55 hashes to index 5. Probing checks [5], [6] (occupied), [9] (occupied), [4] (occupied), and checks 5 + 4² = 21 % 10 = 1. Slot [1] is empty, so we store 55.",
      arrayState: [null, 55, null, null, 45, 15, 25, null, null, 35],
      probedIndexes: [5, 6, 9, 4, 1]
    },
    {
      activeKey: 18,
      formula: "18 % 10 = 8",
      explanation: "Key 18 hashes to index 8. Slot [8] is empty, so we store 18 directly.",
      arrayState: [null, 55, null, null, 45, 15, 25, null, 18, 35],
      probedIndexes: [8]
    },
    {
      activeKey: 28,
      formula: "28 % 10 = 8 (Collision!)",
      explanation: "Key 28 hashes to index 8. Probing checks 8 + 1² = 9 (occupied by 35), and checks 8 + 2² = 12 % 10 = 2. Slot [2] is empty, so 28 is stored.",
      arrayState: [null, 55, 28, null, 45, 15, 25, null, 18, 35],
      probedIndexes: [8, 9, 2]
    },
    {
      activeKey: 38,
      formula: "38 % 10 = 8 (Collision!)",
      explanation: "Key 38 hashes to index 8. Probing checks 8 + 1² = 9 (occupied), 8 + 2² = 2 (occupied), and checks 8 + 3² = 17 % 10 = 7. Slot [7] is empty, so 38 is stored.",
      arrayState: [null, 55, 28, null, 45, 15, 25, 38, 18, 35],
      probedIndexes: [8, 9, 2, 7]
    },
    {
      activeKey: 48,
      formula: "48 % 10 = 8 (Collision!)",
      explanation: "Key 48 hashes to index 8. Probing checks [8], [9] (occupied), [2] (occupied), [7] (occupied), [4] (occupied), and checks 8 + 5² = 33 % 10 = 3. Slot [3] is empty, so 48 is stored.",
      arrayState: [null, 55, 28, 48, 45, 15, 25, 38, 18, 35],
      probedIndexes: [8, 9, 2, 7, 4, 3]
    },
    {
      activeKey: 58,
      formula: "58 % 10 = 8 (Collision Cycle!)",
      explanation: "CRITICAL FAILURE: Key 58 hashes to index 8. Probing checks [8], [9], [2], [7], [4], [3] (all occupied). The quadratic offsets now cycle back to [4], [7], [2], [9]... It repeatedly loops and NEVER finds an empty slot, even though index 0 and index 5 are empty! This happens because table capacity 10 is not a prime number.",
      arrayState: [null, 55, 28, 48, 45, 15, 25, 38, 18, 35],
      probedIndexes: [8, 9, 2, 7, 4, 3]
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

  const keysQueue = [15, 25, 35, 45, 55, 18, 28, 38, 48, 58];

  const visualizerContent = (
    <div className="w-full border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-4 shadow-sm">
      
      {/* Header containing Title, Step counter, and Control buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DDD7CC]/50 pb-3">
        <div>
          <h4 className="text-xs font-extrabold text-[#232323] uppercase tracking-wide">
            Quadratic Probing Simulator
          </h4>
          <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Step-by-step visual of Secondary Clustering."
          </p>
        </div>
        
        {/* Controls Toolbar */}
        <div className="flex items-center gap-2">
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

      {/* Array Visualizer Area */}
      <div className={`p-4 border border-dashed border-[#DDD7CC] bg-secondary/5 rounded-sm flex flex-col justify-center transition-all ${
        isFocused ? "min-h-[160px]" : "min-h-[100px]"
      }`}>
        <div className="w-full flex flex-col items-center space-y-2">
          <div className="w-full grid grid-cols-10 border border-[#DDD7CC] rounded-sm overflow-hidden bg-[#FCFBF8] font-mono">
            {step.arrayState.map((val, idx) => {
              const isProbed = step.probedIndexes.includes(idx);
              const isLatest = val === step.activeKey && val !== null;
              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center border-r last:border-r-0 border-[#DDD7CC] py-2.5 transition-all duration-300 ${
                    isLatest
                      ? "bg-[#2E7D32] text-white font-black scale-105 shadow-sm"
                      : isProbed
                      ? "bg-[#C0392B]/10 text-[#C0392B] font-bold"
                      : "text-[#232323]"
                  }`}
                >
                  <span className="text-[10px] font-bold">{val !== null ? val : "-"}</span>
                </div>
              );
            })}
          </div>
          
          <div className="w-full grid grid-cols-10 font-mono text-[9px] text-[#666666] text-center">
            {Array.from({ length: 10 }).map((_, idx) => (
              <span key={idx}>{`[${idx}]`}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Step Explanation Card */}
      <div className="p-3 border border-[#DDD7CC] bg-[#F4F1EA] rounded-sm space-y-2">
        <div className="flex justify-between items-center border-b border-[#DDD7CC]/50 pb-1">
          <span className="text-[10px] uppercase font-bold text-[#232323]">Insertion Trace</span>
          {step.formula && (
            <span className="text-[10px] font-mono font-bold text-[#3F51B5] bg-white border border-[#DDD7CC] px-2 py-0.5 rounded-sm">
              {step.formula}
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
      {!isFocused && visualizerContent}

      {isFocused && (
        <div className="fixed inset-0 z-50 bg-[#232323]/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-[#FCFBF8] rounded-sm relative">
            {visualizerContent}
          </div>
        </div>
      )}
    </div>
  );
}
