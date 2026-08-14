"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, RotateCcw, Maximize2, Minimize2, Check, HelpCircle, Lightbulb } from "lucide-react";

interface TraversalStep {
  windowRange: [number, number];
  leavingIdx: number | null;
  enteringIdx: number | null;
  explanation: string;
  math: string;
  currentSum: number;
  maxSum: number;
  recordedSums: number[];
}

export default function SlidingWindowDiscovery() {
  const [activeStage, setActiveStage] = useState<"predict" | "discover" | "traverse">("predict");
  const [isFocused, setIsFocused] = useState(false);

  // Focus Mode overflow handling
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

  // Stage 1 State: Prediction
  const [firstSumInput, setFirstSumInput] = useState("");
  const [isFirstSumCorrect, setIsFirstSumCorrect] = useState<boolean | null>(null);
  const [predictAdditions, setPredictAdditions] = useState<string | null>(null);
  const [predictFeedback, setPredictFeedback] = useState("");

  const handleVerifyFirstSum = () => {
    const val = parseInt(firstSumInput.trim(), 10);
    if (val === 8) {
      setIsFirstSumCorrect(true);
    } else {
      setIsFirstSumCorrect(false);
    }
  };

  const handleVerifyAdditions = (choice: string) => {
    setPredictAdditions(choice);
    if (choice === "efficient") {
      setPredictFeedback("Exactly! We only need to subtract the leaving element (2) and add the entering element (1). That's just 2 operations instead of re-adding all 3 elements from scratch! Let's proceed to Stage 2 to discover the formula.");
    } else {
      setPredictFeedback("Not quite. While calculating from scratch takes 3 additions, we can be much smarter by reusing the previous sum. Let's see how in the next stage!");
    }
  };

  // Stage 2 State: Formula Discovery
  const [formulaChoice, setFormulaChoice] = useState<string | null>(null);
  const [formulaFeedback, setFormulaFeedback] = useState("");

  const handleVerifyFormula = (choice: string) => {
    setFormulaChoice(choice);
    if (choice === "correct") {
      setFormulaFeedback("Bravo! You've discovered the core Sliding Window update formula! New Sum = Previous Sum - Element Leaving + Element Entering.");
    } else if (choice === "add_only") {
      setFormulaFeedback("Wait! If we only add the entering element, the sum will keep growing, and we will have 4 elements instead of 3. We must remove the element that left!");
    } else {
      setFormulaFeedback("Wait! If we only subtract the leaving element, we will only have 2 elements in our window instead of 3. We must add the new element!");
    }
  };

  // Stage 3 State: Visual Traversal
  const [currentStep, setCurrentStep] = useState(0);
  const arrayVal = [2, 1, 5, 1, 3, 2];

  const traversalSteps: TraversalStep[] = [
    {
      windowRange: [0, 2],
      leavingIdx: null,
      enteringIdx: null,
      explanation: "Initialization: We calculate the sum of the first 3 days (indices 0, 1, 2). The window is [2, 1, 5]. Sum = 2 + 1 + 5 = 8. We set our maximum sum to 8.",
      math: "2 + 1 + 5 = 8",
      currentSum: 8,
      maxSum: 8,
      recordedSums: [8]
    },
    {
      windowRange: [1, 3],
      leavingIdx: 0,
      enteringIdx: 3,
      explanation: "We slide the window 1 step forward. Element 2 (index 0) leaves the window on the left, and 1 (index 3) enters on the right. We compute the new sum by subtracting 2 and adding 1.",
      math: "8 - 2 + 1 = 7",
      currentSum: 7,
      maxSum: 8,
      recordedSums: [8, 7]
    },
    {
      windowRange: [2, 4],
      leavingIdx: 1,
      enteringIdx: 4,
      explanation: "We slide the window forward again. Element 1 (index 1) leaves on the left, and 3 (index 4) enters on the right. We get a new sum: 9! Since 9 is greater than our max sum (8), we update our maximum sum to 9.",
      math: "7 - 1 + 3 = 9",
      currentSum: 9,
      maxSum: 9,
      recordedSums: [8, 7, 9]
    },
    {
      windowRange: [3, 5],
      leavingIdx: 2,
      enteringIdx: 5,
      explanation: "We slide to the final window of 3 elements. Element 5 (index 2) leaves, and 2 (index 5) enters. The new sum is 9 - 5 + 2 = 6. Our maximum sum remains 9.",
      math: "9 - 5 + 2 = 6",
      currentSum: 6,
      maxSum: 9,
      recordedSums: [8, 7, 9, 6]
    }
  ];

  const traversalStep = traversalSteps[currentStep];

  const handleNextStep = () => {
    if (currentStep < traversalSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const containerStyle = isFocused
    ? "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm select-none overflow-y-auto"
    : "w-full my-8 select-none flex flex-col items-center";

  const cardStyle = isFocused
    ? "w-full max-w-4xl h-[95vh] border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm flex flex-col justify-between shadow-2xl overflow-y-auto"
    : "w-full max-w-3xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-6 shadow-md";

  return (
    <div className={containerStyle}>
      <div className={cardStyle}>
        
        {/* Toolbar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DDD7CC]/50 pb-3">
          <div>
            <h4 className="text-xs font-extrabold text-[#232323] uppercase tracking-wider">
              Sliding Window Interactive Discovery
            </h4>
            <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
              "Let's discover why the sliding window works step-by-step!"
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Stages tabs */}
            <div className="flex border border-[#DDD7CC] bg-white rounded-sm overflow-hidden text-[9px] font-bold uppercase tracking-wider">
              <button
                onClick={() => {
                  setActiveStage("predict");
                  setCurrentStep(0);
                }}
                className={`px-3 py-1.5 transition-colors cursor-pointer ${
                  activeStage === "predict" ? "bg-[#3F51B5] text-white" : "text-[#666666] hover:bg-slate-50 border-r border-[#DDD7CC]"
                }`}
              >
                1. Predict
              </button>
              <button
                onClick={() => {
                  setActiveStage("discover");
                  setCurrentStep(0);
                }}
                className={`px-3 py-1.5 transition-colors cursor-pointer ${
                  activeStage === "discover" ? "bg-[#3F51B5] text-white" : "text-[#666666] hover:bg-slate-50 border-r border-[#DDD7CC]"
                }`}
              >
                2. Formula
              </button>
              <button
                onClick={() => {
                  setActiveStage("traverse");
                  setCurrentStep(0);
                }}
                className={`px-3 py-1.5 transition-colors cursor-pointer ${
                  activeStage === "traverse" ? "bg-[#3F51B5] text-white" : "text-[#666666] hover:bg-slate-50"
                }`}
              >
                3. Slide Simulation
              </button>
            </div>

            {/* Focus button */}
            <button
              onClick={() => setIsFocused(!isFocused)}
              className="p-1.5 border border-[#DDD7CC] bg-white rounded-sm text-[#232323] hover:bg-slate-50 cursor-pointer"
              title={isFocused ? "Exit Focus Mode" : "Focus Mode"}
            >
              {isFocused ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* STAGE 1: PREDICTION */}
        {activeStage === "predict" && (
          <div className="space-y-5 py-2 select-none">
            <div className="space-y-3 font-serif">
              <span className="text-[10px] font-extrabold text-[#3F51B5] uppercase tracking-wider block">
                Stage 1: Predict the math
              </span>
              
              {/* Visual Array representation showing first window */}
              <div className="flex gap-2 items-center justify-start overflow-x-auto py-2 font-sans select-none">
                {arrayVal.map((val, idx) => {
                  const isHighlighted = idx < 3;
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <div className={`w-12 h-12 flex flex-col items-center justify-center border rounded-md transition-all ${
                        isHighlighted 
                          ? "border-[#3F51B5] ring-2 ring-[#3F51B5]/35 bg-[#3F51B5]/5" 
                          : "border-[#DDD7CC] bg-[#FCFBF8]"
                      }`}>
                        <span className="text-[9px] text-[#666666] font-mono leading-none mb-1">Day {idx + 1}</span>
                        <span className="text-xs font-bold text-[#232323]">{val}</span>
                      </div>
                      {isHighlighted && <span className="text-[9px] font-semibold text-[#3F51B5] mt-1 font-mono">In Window</span>}
                    </div>
                  );
                })}
              </div>

              <p className="text-xs md:text-sm text-[#232323] leading-relaxed">
                Imagine we have a window covering the first 3 days highlighted above: `[2, 1, 5]`. 
                The sum of books sold is:
              </p>
              
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Enter sum"
                  value={firstSumInput}
                  onChange={(e) => setFirstSumInput(e.target.value)}
                  className="px-3 py-2 border border-[#DDD7CC] rounded-sm text-xs w-28 outline-none focus:border-[#3F51B5] font-mono text-center"
                />
                <button
                  onClick={handleVerifyFirstSum}
                  className="px-4 py-2 bg-foreground text-background font-bold text-xs uppercase tracking-wider rounded-sm cursor-pointer hover:bg-foreground/90 transition-opacity"
                >
                  Verify
                </button>
              </div>

              {isFirstSumCorrect !== null && (
                <div className={`p-3 rounded-sm border text-xs ${
                  isFirstSumCorrect 
                    ? "border-emerald-200 bg-emerald-50/20 text-emerald-950" 
                    : "border-rose-200 bg-rose-50/20 text-rose-950"
                }`}>
                  {isFirstSumCorrect 
                    ? "Correct! The sum is 8. Let's look at the next step." 
                    : "Not quite. Check your calculation: 2 + 1 + 5 = ?"}
                </div>
              )}
            </div>

            {isFirstSumCorrect && (
              <div className="space-y-3 font-serif animate-in fade-in duration-300">
                <p className="text-xs md:text-sm text-[#232323] leading-relaxed">
                  Now, we want to slide the window 1 step forward to cover: `[1, 5, 1]`.
                  What is the most efficient way to compute this new sum?
                </p>

                <div className="grid grid-cols-1 gap-2.5">
                  <button
                    onClick={() => handleVerifyAdditions("naive")}
                    className={`w-full flex items-center justify-between p-3 border rounded-sm text-left text-xs md:text-sm font-semibold transition-all ${
                      predictAdditions === "naive" ? "border-rose-500 bg-rose-50/20" : "border-[#DDD7CC] bg-white hover:bg-slate-50"
                    }`}
                  >
                    <span>(A) Re-calculate from scratch: 1 + 5 + 1 = 7 (requires 3 additions)</span>
                  </button>
                  <button
                    onClick={() => handleVerifyAdditions("efficient")}
                    className={`w-full flex items-center justify-between p-3 border rounded-sm text-left text-xs md:text-sm font-semibold transition-all ${
                      predictAdditions === "efficient" ? "border-emerald-500 bg-emerald-50/20" : "border-[#DDD7CC] bg-white hover:bg-slate-50"
                    }`}
                  >
                    <span>(B) Subtract the leaving element (2) and add the entering element (1) (requires 2 operations)</span>
                  </button>
                </div>

                {predictFeedback && (
                  <div className={`p-3 rounded-sm border text-xs ${
                    predictAdditions === "efficient"
                      ? "border-emerald-200 bg-emerald-50/20 text-emerald-950"
                      : "border-rose-200 bg-rose-50/20 text-rose-950"
                  }`}>
                    {predictFeedback}
                  </div>
                )}

                {predictAdditions === "efficient" && (
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setActiveStage("discover")}
                      className="px-5 py-2.5 bg-[#3F51B5] text-white hover:bg-[#3F51B5]/90 font-sans font-bold text-xs uppercase tracking-wider rounded-sm cursor-pointer shadow-sm transition-colors"
                    >
                      Go to Stage 2: Discover Formula
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* STAGE 2: FORMULA DISCOVERY */}
        {activeStage === "discover" && (
          <div className="space-y-5 py-2 select-none animate-in fade-in duration-200">
            <div className="space-y-3 font-serif">
              <span className="text-[10px] font-extrabold text-[#3F51B5] uppercase tracking-wider block">
                Stage 2: Formulate the pattern
              </span>

              {/* Visual representation of transition */}
              <div className="flex gap-2 items-center justify-start overflow-x-auto py-2 font-sans select-none">
                {arrayVal.map((val, idx) => {
                  let cellBorder = "border-[#DDD7CC]";
                  let cellBg = "bg-[#FCFBF8]";
                  let label = "";
                  let labelColor = "text-[#666666]";

                  if (idx === 0) {
                    cellBorder = "border-rose-600 ring-2 ring-rose-500/20";
                    cellBg = "bg-rose-50/40";
                    label = "Leaving (-2)";
                    labelColor = "text-rose-600";
                  } else if (idx === 1 || idx === 2) {
                    cellBorder = "border-[#3F51B5] ring-1 ring-[#3F51B5]/25";
                    cellBg = "bg-[#3F51B5]/5";
                    label = "Staying";
                    labelColor = "text-[#3F51B5]";
                  } else if (idx === 3) {
                    cellBorder = "border-emerald-600 ring-2 ring-emerald-500/20";
                    cellBg = "bg-emerald-50/40";
                    label = "Entering (+1)";
                    labelColor = "text-emerald-700";
                  }

                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <div className={`w-12 h-12 flex flex-col items-center justify-center border rounded-md transition-all ${cellBorder} ${cellBg}`}>
                        <span className="text-[9px] text-[#666666] font-mono leading-none mb-1">Day {idx + 1}</span>
                        <span className="text-xs font-bold text-[#232323]">{val}</span>
                      </div>
                      {label && <span className={`text-[9px] font-bold mt-1 font-mono ${labelColor}`}>{label}</span>}
                    </div>
                  );
                })}
              </div>

              <p className="text-xs md:text-sm text-[#232323] leading-relaxed">
                When the window slides forward, one element leaves from the **left** and one enters from the **right**.
                Select the correct formula to update the sum:
              </p>

              <div className="grid grid-cols-1 gap-2.5">
                <button
                  onClick={() => handleVerifyFormula("add_only")}
                  className={`w-full p-3 border rounded-sm text-left text-xs md:text-sm font-semibold transition-all ${
                    formulaChoice === "add_only" ? "border-rose-500 bg-rose-50/20" : "border-[#DDD7CC] bg-white hover:bg-slate-50"
                  }`}
                >
                  New Sum = Previous Sum + Element Entering
                </button>
                <button
                  onClick={() => handleVerifyFormula("sub_only")}
                  className={`w-full p-3 border rounded-sm text-left text-xs md:text-sm font-semibold transition-all ${
                    formulaChoice === "sub_only" ? "border-rose-500 bg-rose-50/20" : "border-[#DDD7CC] bg-white hover:bg-slate-50"
                  }`}
                >
                  New Sum = Previous Sum - Element Leaving
                </button>
                <button
                  onClick={() => handleVerifyFormula("correct")}
                  className={`w-full p-3 border rounded-sm text-left text-xs md:text-sm font-semibold transition-all ${
                    formulaChoice === "correct" ? "border-emerald-500 bg-emerald-50/20" : "border-[#DDD7CC] bg-white hover:bg-slate-50"
                  }`}
                >
                  New Sum = Previous Sum - Element Leaving + Element Entering
                </button>
              </div>

              {formulaFeedback && (
                <div className={`p-3 rounded-sm border text-xs ${
                  formulaChoice === "correct"
                    ? "border-emerald-200 bg-emerald-50/20 text-emerald-950"
                    : "border-rose-200 bg-rose-50/20 text-rose-950"
                }`}>
                  {formulaFeedback}
                </div>
              )}

              {formulaChoice === "correct" && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveStage("traverse")}
                    className="px-5 py-2.5 bg-[#3F51B5] text-white hover:bg-[#3F51B5]/90 font-sans font-bold text-xs uppercase tracking-wider rounded-sm cursor-pointer shadow-sm transition-colors"
                  >
                    Go to Stage 3: Slide Simulation
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STAGE 3: TRAVERSAL / DRY RUN */}
        {activeStage === "traverse" && (
          <div className="space-y-5 flex flex-col flex-grow animate-in fade-in duration-200">
            
            {/* Visualizer Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#F4F1EA]/50 border border-[#DDD7CC] p-3 rounded-sm select-none">
              <span className="text-xs font-mono font-bold text-[#666666] bg-white border border-[#DDD7CC] px-2 py-1 rounded-sm">
                Window Slide: Step {currentStep + 1} of {traversalSteps.length}
              </span>
              
              {/* Stepping controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  className={`px-3 py-1.5 border border-[#DDD7CC] bg-white rounded-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-40 disabled:pointer-events-none hover:bg-[#F4F1EA] text-[#232323]`}
                >
                  Prev
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={currentStep === traversalSteps.length - 1}
                  className={`px-3 py-1.5 border border-[#3F51B5] bg-[#3F51B5] text-white rounded-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-40 disabled:pointer-events-none hover:bg-[#3F51B5]/90`}
                >
                  Next
                </button>
                <button
                  onClick={() => {
                    setCurrentStep(0);
                  }}
                  disabled={currentStep === 0}
                  className={`p-1.5 border border-[#DDD7CC] bg-white rounded-sm text-xs font-bold cursor-pointer disabled:opacity-40 hover:bg-[#F4F1EA]`}
                  title="Reset"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="flex flex-col gap-5 border border-[#DDD7CC] bg-white p-5 rounded-sm select-none">
              
              {/* Array state visualization */}
              <div className="space-y-3">
                <div className="text-[10px] font-bold text-[#666666] uppercase tracking-wider">
                  Visual Array & Sliding Window Frame (K = 3)
                </div>
                
                <div className="flex flex-wrap gap-4 items-center justify-start py-2 font-sans">
                  {arrayVal.map((val, idx) => {
                    const inRange = idx >= traversalStep.windowRange[0] && idx <= traversalStep.windowRange[1];
                    const isEntering = idx === traversalStep.enteringIdx;
                    const isLeaving = idx === traversalStep.leavingIdx;

                    let cellBorder = "border-[#DDD7CC]";
                    let cellBg = "bg-[#FCFBF8]";

                    if (isEntering) {
                      cellBorder = "border-emerald-600 ring-2 ring-emerald-500/20";
                      cellBg = "bg-emerald-50/40";
                    } else if (isLeaving) {
                      cellBorder = "border-rose-600 ring-2 ring-rose-500/20";
                      cellBg = "bg-rose-50/40";
                    } else if (inRange) {
                      cellBorder = "border-[#3F51B5] ring-2 ring-[#3F51B5]/35";
                      cellBg = "bg-[#3F51B5]/5";
                    }

                    return (
                      <div key={idx} className="flex flex-col items-center">
                        <div className={`w-14 h-14 flex flex-col items-center justify-center border rounded-md transition-all duration-200 ${cellBorder} ${cellBg}`}>
                          <span className="text-[9px] text-[#666666] font-mono leading-none mb-1">Day {idx + 1}</span>
                          <span className="text-sm font-bold text-[#232323]">{val}</span>
                        </div>
                        {isEntering && <span className="text-[9px] font-bold text-emerald-700 mt-1.5 font-mono">Entering (+{val})</span>}
                        {isLeaving && <span className="text-[9px] font-bold text-rose-600 mt-1.5 font-mono">Leaving (-{val})</span>}
                        {!isEntering && !isLeaving && inRange && <span className="text-[9px] font-semibold text-[#3F51B5] mt-1.5 font-mono">In Window</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Math & Sum status info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans select-none pt-2">
                <div className="border border-[#DDD7CC] bg-[#F4F1EA]/30 p-3 rounded-sm text-center">
                  <div className="text-[9px] uppercase font-bold text-[#666666]">Window Sum Math</div>
                  <div className="font-extrabold text-sm text-[#232323] mt-1">{traversalStep.math}</div>
                </div>
                <div className="border border-[#DDD7CC] bg-[#F4F1EA]/30 p-3 rounded-sm text-center">
                  <div className="text-[9px] uppercase font-bold text-[#3F51B5]">Current Sum</div>
                  <div className="font-extrabold text-sm text-[#3F51B5] mt-1">{traversalStep.currentSum}</div>
                </div>
                <div className="border border-[#DDD7CC] bg-[#F4F1EA]/30 p-3 rounded-sm text-center">
                  <div className="text-[9px] uppercase font-bold text-emerald-800">Max Sum Found</div>
                  <div className="font-extrabold text-sm text-emerald-800 mt-1">{traversalStep.maxSum}</div>
                </div>
              </div>

              {/* Recorded Sums list */}
              <div className="border border-[#DDD7CC] bg-[#FCFBF8] p-3 rounded-sm space-y-1.5 pt-3">
                <div className="text-[10px] font-bold text-[#666666] uppercase tracking-wider">
                  List of Recorded Sums
                </div>
                <div className="flex gap-2 items-center flex-wrap select-none font-mono">
                  {traversalStep.recordedSums.map((s, idx) => {
                    const isMax = s === traversalStep.maxSum;
                    return (
                      <span
                        key={idx}
                        className={`px-3 py-1 border rounded-md text-xs font-bold transition-all ${
                          isMax
                            ? "bg-emerald-100 border-emerald-300 text-emerald-900 ring-2 ring-emerald-500/10 scale-105"
                            : "bg-white border-[#DDD7CC] text-foreground"
                        }`}
                      >
                        {s} {isMax && "🏆 (Max)"}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Step Explanation Text */}
              <div className="p-3.5 border-l-4 border-[#3F51B5] bg-[#F4F1EA]/25 text-xs md:text-sm text-secondary-foreground font-serif leading-relaxed">
                <span className="font-sans font-bold text-[9px] text-[#3F51B5] uppercase tracking-wider block mb-1">
                  Step Description
                </span>
                {traversalStep.explanation}
              </div>

            </div>

            {/* Teacher's Annotation Note */}
            <div className="p-3.5 border border-dashed border-[#DDD7CC] bg-[#FCFBF8] rounded-sm select-none">
              <div className="text-[13px] leading-relaxed text-secondary-foreground font-serif" style={{ fontFamily: "'Caveat', cursive", fontSize: "16px" }}>
                <span className="font-sans font-bold uppercase text-[9px] text-[#232323] tracking-widest block mb-1">Teacher's Whiteboard</span>
                Look at how the window moves forward! We don't run any loops to sum all 3 numbers again. We just do one subtraction (of the element that is leaving on the left) and one addition (of the element that is entering on the right). This takes exactly O(1) constant time per slide!
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
