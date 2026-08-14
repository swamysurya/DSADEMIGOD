"use client";

import React, { useState } from "react";

export default function InPlacePrefixSumIntroDrawing() {
  const steps = [
    {
      label: "Initial State (Original Array)",
      values: [2, 4, 1, 5, 3],
      highlights: [],
      notes: "Every cell stores its original input value."
    },
    {
      label: "Step 1: Update Index 1",
      values: [2, 6, 1, 5, 3],
      highlights: [1],
      notes: "Index 1 is updated by adding the value at Index 0: 2 + 4 = 6."
    },
    {
      label: "Step 2: Update Index 2",
      values: [2, 6, 7, 5, 3],
      highlights: [2],
      notes: "Index 2 is updated by adding the value at Index 1: 6 + 1 = 7."
    },
    {
      label: "Step 3: Update Index 3",
      values: [2, 6, 7, 12, 3],
      highlights: [3],
      notes: "Index 3 is updated by adding the value at Index 2: 7 + 5 = 12."
    },
    {
      label: "Final State (In-place Prefix Sum)",
      values: [2, 6, 7, 12, 15],
      highlights: [4],
      notes: "Index 4 is updated: 12 + 3 = 15. The conversion is complete!"
    }
  ];

  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DDD7CC]/50 pb-3">
          <div>
            <h4 className="text-xs font-extrabold text-[#232323] uppercase tracking-wide">
              In-Place Transformation Timeline
            </h4>
            <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
              "Notice how we overwrite the cells of the same array one by one."
            </p>
          </div>

          {/* Step Selector Controls */}
          <div className="flex items-center gap-1.5 font-mono text-[10px]">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`px-2 py-1 border rounded-sm cursor-pointer font-bold ${
                  activeStep === idx
                    ? "bg-[#3F51B5] border-[#3F51B5] text-white"
                    : "bg-white border-[#DDD7CC] text-[#666666] hover:bg-[#F4F1EA]"
                }`}
              >
                Step {idx}
              </button>
            ))}
          </div>
        </div>

        {/* Array Visualization Area */}
        <div className="p-5 border border-dashed border-[#DDD7CC] bg-[#F4F1EA]/10 rounded-sm space-y-4">
          <div className="flex flex-col items-center">
            <span className="text-[9px] uppercase font-bold tracking-wider text-[#666666] mb-3 block">
              Array A (Single Memory Space)
            </span>

            {/* Adjacent boxes representation */}
            <div className="flex border border-[#DDD7CC] bg-white rounded-sm shadow-sm overflow-hidden">
              {steps[activeStep].values.map((val, idx) => {
                const isHighlighted = steps[activeStep].highlights.includes(idx);
                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center w-12 h-12 justify-center font-mono font-bold text-sm transition-colors duration-200 border-[#DDD7CC] ${
                      idx < 4 ? "border-r" : ""
                    } ${isHighlighted ? "bg-[#3F51B5]/10 text-[#3F51B5]" : "bg-white text-[#232323]"}`}
                  >
                    <span>{val}</span>
                    <span className="text-[8px] text-muted-foreground/60 font-semibold mt-0.5">
                      [{idx}]
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step description */}
          <div className="p-3 bg-[#FCFBF8] border border-[#DDD7CC] rounded-sm text-center">
            <div className="text-[11px] font-bold text-[#232323]">
              {steps[activeStep].label}
            </div>
            <p className="text-[10px] text-[#666666] mt-0.5 font-mono">
              {steps[activeStep].notes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
