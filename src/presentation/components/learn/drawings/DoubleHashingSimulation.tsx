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

export default function DoubleHashingSimulation() {
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
      explanation: "We start with an empty array of capacity 10. We will insert the same 10 keys. The jumping distance we use to find the next empty slot is called the 'step size'. In Double Hashing, the step size is calculated using a second hash function Hash₂(key), creating a unique jump path for each key. Let's trace it!",
      arrayState: [null, null, null, null, null, null, null, null, null, null],
      probedIndexes: []
    },
    {
      activeKey: 15,
      formula: "Hash₁(15) = 5",
      explanation: "Key 15 hashes to index 5. Slot [5] is empty, so we store 15 directly.",
      arrayState: [null, null, null, null, null, 15, null, null, null, null],
      probedIndexes: [5]
    },
    {
      activeKey: 25,
      formula: "Hash₁(25) = 5, Hash₂(25) = 3 (Collision!)",
      explanation: "Key 25 hashes to index 5 (occupied). We calculate step size using Hash₂(25) = 7 - (25 % 7) = 3. We check index 5 + 3 = 8. Slot [8] is empty, so we store 25.",
      arrayState: [null, null, null, null, null, 15, null, null, 25, null],
      probedIndexes: [5, 8]
    },
    {
      activeKey: 35,
      formula: "Hash₁(35) = 5, Hash₂(35) = 7 (Collision!)",
      explanation: "Key 35 hashes to index 5. Step size is Hash₂(35) = 7 - (35 % 7) = 7. We check index 5 + 7 = 12 % 10 = 2. Slot [2] is empty, so we store 35.",
      arrayState: [null, null, 35, null, null, 15, null, null, 25, null],
      probedIndexes: [5, 2]
    },
    {
      activeKey: 45,
      formula: "Hash₁(45) = 5, Hash₂(45) = 4 (Collision!)",
      explanation: "Key 45 hashes to index 5. Step size is Hash₂(45) = 4. We check index 5 + 4 = 9. Slot [9] is empty, so we store 45.",
      arrayState: [null, null, 35, null, null, 15, null, null, 25, 45],
      probedIndexes: [5, 9]
    },
    {
      activeKey: 55,
      formula: "Hash₁(55) = 5, Hash₂(55) = 1 (Collision!)",
      explanation: "Key 55 hashes to index 5. Step size is Hash₂(55) = 1. We check index 5 + 1 = 6. Slot [6] is empty, so we store 55.",
      arrayState: [null, null, 35, null, null, 15, 55, null, 25, 45],
      probedIndexes: [5, 6]
    },
    {
      activeKey: 18,
      formula: "Hash₁(18) = 8, Hash₂(18) = 3 (Collision!)",
      explanation: "Key 18 hashes to index 8 (occupied). Step size is Hash₂(18) = 3. We check index 8 + 3 = 11 % 10 = 1. Slot [1] is empty, so we store 18.",
      arrayState: [null, 18, 35, null, null, 15, 55, null, 25, 45],
      probedIndexes: [8, 1]
    },
    {
      activeKey: 28,
      formula: "Hash₁(28) = 8, Hash₂(28) = 7 (Collision!)",
      explanation: "Key 28 hashes to index 8. Step size is Hash₂(28) = 7. It probes 8 + 7 = 15%10 = 5 (occ), 8 + 2*7 = 2 (occ), 8 + 3*7 = 9 (occ), 8 + 4*7 = 6 (occ), and lands in slot 8 + 5*7 = 43 % 10 = 3 (empty).",
      arrayState: [null, 18, 35, 28, null, 15, 55, null, 25, 45],
      probedIndexes: [8, 5, 2, 9, 6, 3]
    },
    {
      activeKey: 38,
      formula: "Hash₁(38) = 8, Hash₂(38) = 4 (Collision!)",
      explanation: "Key 38 hashes to index 8. Step size is Hash₂(38) = 4. It probes 8 + 4 = 12 % 10 = 2 (occupied), 8 + 2*4 = 16 % 10 = 6 (occupied), and probes 8 + 3*4 = 20 % 10 = 0. Slot [0] is empty, so we store 38.",
      arrayState: [38, 18, 35, 28, null, 15, 55, null, 25, 45],
      probedIndexes: [8, 2, 6, 0]
    },
    {
      activeKey: 48,
      formula: "Hash₁(48) = 8, Hash₂(48) = 1 (Collision!)",
      explanation: "Key 48 hashes to index 8. Step size is Hash₂(48) = 1. Probing sequentially scans [9], [0], [1], [2], [3] (occupied) and stores in slot [4].",
      arrayState: [38, 18, 35, 28, 48, 15, 55, null, 25, 45],
      probedIndexes: [8, 9, 0, 1, 2, 3, 4]
    },
    {
      activeKey: 58,
      formula: "Hash₁(58) = 8, Hash₂(58) = 5 (Collision Cycle!)",
      explanation: "DISADVANTAGE/CYCLE FAILURE: Key 58 collides at index 8. Step size is Hash₂(58) = 5. It probes 8 + 5 = 13%10 = 3 (occupied), then 3 + 5 = 8 (occupied). It cycles between 8 and 3, failing to find empty slot 7! This happens because N = 10 is not coprime to step size 5. We solve this in production by choosing a prime number (like 11) as our table capacity N, ensuring step sizes never get stuck in cycles.",
      arrayState: [38, 18, 35, 28, 48, 15, 55, null, 25, 45],
      probedIndexes: [8, 3]
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
            Double Hashing Simulator
          </h4>
          <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Step-by-step visual of uniform distribution."
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
