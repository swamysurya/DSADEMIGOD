"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, RotateCcw, Maximize2, Minimize2 } from "lucide-react";

interface Step {
  title: string;
  calculation: string | null;
  explanation: string;
  prevHighlight: number | null;
  targetHighlight: number | null;
  arrayState: number[];
  isComplete: boolean;
}

export default function InPlacePrefixSumBuildingDrawing() {
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

  const steps: Step[] = [
    {
      title: "1. Initialization",
      calculation: null,
      explanation: "We start with our original input array. Unlike the standard prefix sum, we will not allocate any extra space; we perform all operations in this same array.",
      prevHighlight: null,
      targetHighlight: null,
      arrayState: [2, 4, 1, 5, 3],
      isComplete: false
    },
    {
      title: "2. Skip Index 0",
      calculation: "A[0] remains unchanged",
      explanation: "The element at index 0 stays the same (2) because there are no elements before it to accumulate. Our loop will start from index 1.",
      prevHighlight: null,
      targetHighlight: 0,
      arrayState: [2, 4, 1, 5, 3],
      isComplete: false
    },
    {
      title: "3. Accumulate Sum (i = 1)",
      calculation: "A[1] = A[0] + A[1] = 2 + 4 = 6",
      explanation: "We update index 1 by adding the value from index 0. The original value 4 is overwritten with the sum 6.",
      prevHighlight: 0,
      targetHighlight: 1,
      arrayState: [2, 6, 1, 5, 3],
      isComplete: false
    },
    {
      title: "4. Accumulate Sum (i = 2)",
      calculation: "A[2] = A[1] + A[2] = 6 + 1 = 7",
      explanation: "We update index 2 by adding the cumulative sum now stored at index 1. The original value 1 is replaced by 7.",
      prevHighlight: 1,
      targetHighlight: 2,
      arrayState: [2, 6, 7, 5, 3],
      isComplete: false
    },
    {
      title: "5. Accumulate Sum (i = 3)",
      calculation: "A[3] = A[2] + A[3] = 7 + 5 = 12",
      explanation: "We take the sum from index 2 (which is 7) and add it to the original value at index 3 (which is 5). The slot now stores 12.",
      prevHighlight: 2,
      targetHighlight: 3,
      arrayState: [2, 6, 7, 12, 3],
      isComplete: false
    },
    {
      title: "6. Accumulate Sum (i = 4)",
      calculation: "A[4] = A[3] + A[4] = 12 + 3 = 15",
      explanation: "We add the sum at index 3 (12) to the last element (3) and overwrite index 4 with the final sum 15.",
      prevHighlight: 3,
      targetHighlight: 4,
      arrayState: [2, 6, 7, 12, 15],
      isComplete: false
    },
    {
      title: "7. In-Place Build Complete!",
      calculation: "Final Array: [2, 6, 7, 12, 15]",
      explanation: "The transformation is complete! Every slot in the original array now holds the prefix sum, and no extra memory was used.",
      prevHighlight: null,
      targetHighlight: null,
      arrayState: [2, 6, 7, 12, 15],
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
              In-Place Prefix Sum Visualizer
            </h4>
            <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
              "Watch how we overwrite cell values step-by-step."
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFocused(!isFocused)}
              className="p-1.5 border border-[#DDD7CC] rounded-sm text-[10px] font-bold bg-white text-[#666666] hover:bg-[#F4F1EA] cursor-pointer"
              title={isFocused ? "Exit Focus" : "Focus Visualizer"}
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
          <div className="flex flex-col items-center">
            <span className="text-[9px] uppercase font-bold tracking-wider text-[#666666] mb-2.5">
              Input Array A (Single Buffer)
            </span>
            <div className="flex border border-[#DDD7CC] bg-white rounded-sm shadow-sm overflow-hidden">
              {step.arrayState.map((val, idx) => {
                const isTarget = step.targetHighlight === idx;
                const isPrev = step.prevHighlight === idx;

                let cellBg = "bg-white";
                let textStyle = "text-[#232323]";
                let cellBorder = "border-[#DDD7CC]";

                if (isTarget) {
                  cellBg = "bg-[#3F51B5]/10";
                  textStyle = "text-[#3F51B5] font-black";
                  cellBorder = "border-[#3F51B5]/30";
                } else if (isPrev) {
                  cellBg = "bg-emerald-500/10";
                  textStyle = "text-emerald-800 font-extrabold";
                  cellBorder = "border-emerald-500/30";
                }

                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center w-14 h-14 justify-center font-mono font-bold text-sm border-[#DDD7CC] ${
                      idx < 4 ? "border-r" : ""
                    } ${cellBg} ${textStyle}`}
                  >
                    <span>{val}</span>
                    <span className="text-[8.5px] opacity-60 mt-0.5">[{idx}]</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Metadata & Calculation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left box: Current step calculation */}
            <div className="p-3 bg-white border border-[#DDD7CC] rounded-sm space-y-1">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#666666]">
                Step Detail
              </span>
              <h5 className="text-[11px] font-bold text-[#232323]">{step.title}</h5>
              <div className="font-mono text-[10px] text-[#3F51B5] font-bold pt-1">
                {step.calculation || "No operations this step."}
              </div>
            </div>

            {/* Right box: Student notes */}
            <div className="p-3 bg-white border border-[#DDD7CC] rounded-sm space-y-1">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#666666]">
                Teacher Explanation
              </span>
              <p className="text-[10px] leading-relaxed text-[#666666]">{step.explanation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
