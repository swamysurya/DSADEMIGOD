"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, RotateCcw, Maximize2, Minimize2 } from "lucide-react";

interface Step {
  title: string;
  calculation: string | null;
  explanation: string;
  inputHighlight: number | null;
  prevPrefixHighlight: number | null;
  targetPrefixHighlight: number | null;
  prefixState: (string | number)[];
  isComplete: boolean;
}

export default function PrefixSumBuildingDrawing() {
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

  const inputArray = [2, 4, 1, 5, 3];

  const steps: Step[] = [
    {
      title: "1. Initialization",
      calculation: null,
      explanation: "We start by allocating a new array of the same size (5 cells) to store the prefix sums. All cells in the Prefix Sum array are initially empty.",
      inputHighlight: null,
      prevPrefixHighlight: null,
      targetPrefixHighlight: null,
      prefixState: ["-", "-", "-", "-", "-"],
      isComplete: false
    },
    {
      title: "2. Copy First Element (i = 0)",
      calculation: "P[0] = A[0] = 2",
      explanation: "The first element of the prefix sum is always identical to the first element of the original array because there are no previous elements to add.",
      inputHighlight: 0,
      prevPrefixHighlight: null,
      targetPrefixHighlight: 0,
      prefixState: [2, "-", "-", "-", "-"],
      isComplete: false
    },
    {
      title: "3. Accumulate Sum (i = 1)",
      calculation: "P[1] = P[0] + A[1] = 2 + 4 = 6",
      explanation: "To calculate the sum up to index 1, we take the prefix sum up to index 0 (which is 2) and add the current element from the original array (which is 4).",
      inputHighlight: 1,
      prevPrefixHighlight: 0,
      targetPrefixHighlight: 1,
      prefixState: [2, 6, "-", "-", "-"],
      isComplete: false
    },
    {
      title: "4. Accumulate Sum (i = 2)",
      calculation: "P[2] = P[1] + A[2] = 6 + 1 = 7",
      explanation: "For index 2, we take the prefix sum accumulated in the previous slot (6) and add the current element of the original array (1) to get 7.",
      inputHighlight: 2,
      prevPrefixHighlight: 1,
      targetPrefixHighlight: 2,
      prefixState: [2, 6, 7, "-", "-"],
      isComplete: false
    },
    {
      title: "5. Accumulate Sum (i = 3)",
      calculation: "P[3] = P[2] + A[3] = 7 + 5 = 12",
      explanation: "We take the cumulative sum up to index 2 (which is 7) and add the current element (5). This gives us 12.",
      inputHighlight: 3,
      prevPrefixHighlight: 2,
      targetPrefixHighlight: 3,
      prefixState: [2, 6, 7, 12, "-"],
      isComplete: false
    },
    {
      title: "6. Accumulate Sum (i = 4)",
      calculation: "P[4] = P[3] + A[4] = 12 + 3 = 15",
      explanation: "For the final element, we take the previous sum of 12 and add the last element (3). This completes the prefix sum array with a final value of 15.",
      inputHighlight: 4,
      prevPrefixHighlight: 3,
      targetPrefixHighlight: 4,
      prefixState: [2, 6, 7, 12, 15],
      isComplete: false
    },
    {
      title: "7. Build Complete!",
      calculation: "Final Array: [2, 6, 7, 12, 15]",
      explanation: "The prefix sum array is now fully built! Notice that every slot `P[i]` holds the sum of all elements in the original array `A` from index 0 up to `i`.",
      inputHighlight: null,
      prevPrefixHighlight: null,
      targetPrefixHighlight: null,
      prefixState: [2, 6, 7, 12, 15],
      isComplete: true
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

  const containerStyle = isFocused
    ? "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm select-none"
    : "w-full my-8 select-none flex flex-col items-center";

  return (
    <div className={containerStyle}>
      <div className="w-full max-w-2xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-5 shadow-md">
        
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DDD7CC]/50 pb-3">
          <div>
            <h4 className="text-xs font-extrabold text-[#232323] uppercase tracking-wide">
              Prefix Sum Builder Visualizer
            </h4>
            <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
              "Step-by-step visualization of building a cumulative sum array."
            </p>
          </div>

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
              title="Reset Visualizer"
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

        {/* Arrays Display Area */}
        <div className="p-5 border border-dashed border-[#DDD7CC] bg-[#F4F1EA]/10 rounded-sm space-y-6">
          
          {/* Input Array (A) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#666666]">
                Original Array (A)
              </span>
              {step.inputHighlight !== null && (
                <span className="text-[10px] font-mono text-[#3F51B5] font-bold" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
                  reading value A[{step.inputHighlight}] = {inputArray[step.inputHighlight]}
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {inputArray.map((val, idx) => {
                const isCurrent = step.inputHighlight === idx;
                return (
                  <div key={idx} className="flex flex-col items-center space-y-1">
                    <span className="text-[9px] font-mono text-[#666666]">[{idx}]</span>
                    <div
                      className={`w-full py-3 border flex items-center justify-center font-mono text-sm font-bold rounded-sm transition-all duration-300 ${
                        isCurrent
                          ? "bg-[#3F51B5]/10 border-[#3F51B5] text-[#3F51B5] shadow-sm scale-105 font-black ring-1 ring-[#3F51B5]/30"
                          : "bg-[#FCFBF8] border-[#DDD7CC] text-[#232323]"
                      }`}
                    >
                      {val}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Connective Math Line */}
          {step.calculation && (
            <div className="flex justify-center items-center py-1">
              <div className="bg-[#F4F1EA] px-4 py-1.5 border border-[#DDD7CC] rounded-sm text-center font-mono text-[11px] font-bold text-[#232323] shadow-sm animate-fadeIn">
                {step.calculation}
              </div>
            </div>
          )}

          {/* Output Array (P) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#666666]">
                Prefix Sum Array (P)
              </span>
              {step.targetPrefixHighlight !== null && (
                <span className="text-[10px] font-mono text-[#2E7D32] font-bold" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
                  writing prefix P[{step.targetPrefixHighlight}]
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {step.prefixState.map((val, idx) => {
                const isTarget = step.targetPrefixHighlight === idx;
                const isPrevSum = step.prevPrefixHighlight === idx;
                const hasValue = val !== "-";

                let cellClass = "bg-[#FCFBF8] border-[#DDD7CC] text-[#666666]";
                if (step.isComplete) {
                  cellClass = "bg-[#2E7D32]/10 border-[#2E7D32] text-[#2E7D32] font-black";
                } else if (isTarget) {
                  cellClass = "bg-[#2E7D32]/15 border-[#2E7D32] text-[#2E7D32] shadow-sm scale-105 font-black ring-1 ring-[#2E7D32]/30 animate-pulse";
                } else if (isPrevSum) {
                  cellClass = "bg-[#D97706]/10 border-[#D97706] text-[#D97706] font-bold";
                } else if (hasValue) {
                  cellClass = "bg-[#FCFBF8] border-[#DDD7CC] text-[#232323] font-medium";
                }

                return (
                  <div key={idx} className="flex flex-col items-center space-y-1">
                    <span className="text-[9px] font-mono text-[#666666]">[{idx}]</span>
                    <div
                      className={`w-full py-3 border flex items-center justify-center font-mono text-sm rounded-sm transition-all duration-300 ${cellClass}`}
                    >
                      {val}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Explanation & Annotation Card */}
        <div className="border border-dashed border-[#DDD7CC] bg-[#F4F1EA]/25 p-4 rounded-sm space-y-2 text-left">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#3F51B5]">
            {step.title}
          </div>
          <p 
            className="text-foreground font-serif leading-relaxed"
            style={{ fontFamily: "'Caveat', cursive", fontSize: "17px", lineHeight: "1.4" }}
          >
            {step.explanation}
          </p>
        </div>

      </div>
    </div>
  );
}
