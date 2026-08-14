"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, RotateCcw, Maximize2, Minimize2, Check, HelpCircle } from "lucide-react";

interface TraversalStep {
  leftIdx: number;
  rightIdx: number;
  explanation: string;
  math: string;
  currentSum: number;
  status: "small" | "large" | "match";
  action: string;
}

export default function TwoPointerIntroDrawing() {
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
  const [predictAction, setPredictAction] = useState<string | null>(null);
  const [predictFeedback, setPredictFeedback] = useState("");

  const handleVerifyFirstSum = () => {
    const val = parseInt(firstSumInput.trim(), 10);
    if (val === 10) {
      setIsFirstSumCorrect(true);
    } else {
      setIsFirstSumCorrect(false);
    }
  };

  const handleVerifyAction = (choice: string) => {
    setPredictAction(choice);
    if (choice === "left") {
      setPredictFeedback("Exactly! Since the array is sorted, moving the left pointer to the right gets us a larger number, which helps increase the sum towards our target (14). Let's proceed to Stage 2 to discover the rules.");
    } else {
      setPredictFeedback("Not quite. Moving the right pointer to the left would give us a smaller number, making our sum even smaller than 10! Since we want to increase the sum, we should move the left pointer instead.");
    }
  };

  // Stage 2 State: Rule Discovery
  const [ruleChoice, setRuleChoice] = useState<string | null>(null);
  const [ruleFeedback, setRuleFeedback] = useState("");

  const handleVerifyRule = (choice: string) => {
    setRuleChoice(choice);
    if (choice === "correct") {
      setRuleFeedback("Perfect! Sum < Target means we need a larger value, so we increment Left. Sum > Target means we need a smaller value, so we decrement Right.");
    } else {
      setRuleFeedback("Wait! If the sum is too large, incrementing Left would make it even larger! Think about how to reduce the sum.");
    }
  };

  // Stage 3 State: Visual Traversal
  const [currentStep, setCurrentStep] = useState(0);
  const arrayVal = [1, 2, 4, 6, 8, 9];
  const targetVal = 14;

  const traversalSteps: TraversalStep[] = [
    {
      leftIdx: 0,
      rightIdx: 5,
      explanation: "We place our Left pointer at the start (index 0, value 1) and our Right pointer at the end (index 5, value 9). Sum = 1 + 9 = 10. Since 10 < 14, the sum is too small. We must move the Left pointer rightward.",
      math: "1 + 9 = 10",
      currentSum: 10,
      status: "small",
      action: "Sum is too small (< 14). Move Left pointer right."
    },
    {
      leftIdx: 1,
      rightIdx: 5,
      explanation: "Left is now at index 1 (value 2), Right remains at index 5 (value 9). Sum = 2 + 9 = 11. Since 11 < 14, the sum is still too small. We move Left rightward again.",
      math: "2 + 9 = 11",
      currentSum: 11,
      status: "small",
      action: "Sum is too small (< 14). Move Left pointer right."
    },
    {
      leftIdx: 2,
      rightIdx: 5,
      explanation: "Left is now at index 2 (value 4), Right is at index 5 (value 9). Sum = 4 + 9 = 13. Since 13 < 14, it is still too small. Move Left rightward again.",
      math: "4 + 9 = 13",
      currentSum: 13,
      status: "small",
      action: "Sum is too small (< 14). Move Left pointer right."
    },
    {
      leftIdx: 3,
      rightIdx: 5,
      explanation: "Left is now at index 3 (value 6), Right is at index 5 (value 9). Sum = 6 + 9 = 15. Since 15 > 14, the sum is too large! We need a smaller total. We move the Right pointer leftward.",
      math: "6 + 9 = 15",
      currentSum: 15,
      status: "large",
      action: "Sum is too large (> 14). Move Right pointer left."
    },
    {
      leftIdx: 3,
      rightIdx: 4,
      explanation: "Left is at index 3 (value 6), Right is at index 4 (value 8). Sum = 6 + 8 = 14. We found a match! The pair at indices (3, 4) with values (6, 8) adds up exactly to our target sum 14.",
      math: "6 + 8 = 14",
      currentSum: 14,
      status: "match",
      action: "Match found! Pair indices = (3, 4)."
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
              Two Pointer Technique Interactive Discovery
            </h4>
            <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
              "Let's discover how Two Pointers balance sums in a sorted array!"
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
                2. Rules
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
                3. Step Simulation
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
                Stage 1: Initial State & Sum
              </span>
              
              {/* Visual Array representation showing first pointers */}
              <div className="flex gap-2 items-center justify-start overflow-x-auto py-2 font-sans select-none">
                {arrayVal.map((val, idx) => {
                  const isLeft = idx === 0;
                  const isRight = idx === 5;
                  const isHighlighted = isLeft || isRight;
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <div className={`w-12 h-12 flex flex-col items-center justify-center border rounded-md transition-all ${
                        isHighlighted 
                          ? "border-[#3F51B5] ring-2 ring-[#3F51B5]/35 bg-[#3F51B5]/5" 
                          : "border-[#DDD7CC] bg-[#FCFBF8]"
                      }`}>
                        <span className="text-[9px] text-[#666666] font-mono leading-none mb-1">idx {idx}</span>
                        <span className="text-xs font-bold text-[#232323]">{val}</span>
                      </div>
                      {isLeft && <span className="text-[9px] font-bold text-[#3F51B5] mt-1 font-mono">Left Pointer</span>}
                      {isRight && <span className="text-[9px] font-bold text-[#3F51B5] mt-1 font-mono">Right Pointer</span>}
                    </div>
                  );
                })}
              </div>

              <p className="text-xs md:text-sm text-[#232323] leading-relaxed">
                We place Left at the first element (index 0, value 1) and Right at the last element (index 5, value 9).
                What is the sum of these two pointed values?
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
                    ? "Correct! The initial sum is 10. Let's make an adjustment." 
                    : "Not quite. Check your calculation: 1 + 9 = ?"}
                </div>
              )}
            </div>

            {isFirstSumCorrect && (
              <div className="space-y-3 font-serif animate-in fade-in duration-300">
                <p className="text-xs md:text-sm text-[#232323] leading-relaxed">
                  Our target sum is **14**. The current sum is **10** (which is too small). 
                  To increase the sum, which pointer should we move?
                </p>

                <div className="grid grid-cols-1 gap-2.5">
                  <button
                    onClick={() => handleVerifyAction("left")}
                    className={`w-full flex items-center justify-between p-3 border rounded-sm text-left text-xs md:text-sm font-semibold transition-all ${
                      predictAction === "left" ? "border-emerald-500 bg-emerald-50/20" : "border-[#DDD7CC] bg-white hover:bg-slate-50"
                    }`}
                  >
                    <span>(A) Move Left pointer to the right (to point to a larger value: 2)</span>
                  </button>
                  <button
                    onClick={() => handleVerifyAction("right")}
                    className={`w-full flex items-center justify-between p-3 border rounded-sm text-left text-xs md:text-sm font-semibold transition-all ${
                      predictAction === "right" ? "border-rose-500 bg-rose-50/20" : "border-[#DDD7CC] bg-white hover:bg-slate-50"
                    }`}
                  >
                    <span>(B) Move Right pointer to the left (to point to a smaller value: 8)</span>
                  </button>
                </div>

                {predictFeedback && (
                  <div className={`p-3 rounded-sm border text-xs ${
                    predictAction === "left"
                      ? "border-emerald-200 bg-emerald-50/20 text-emerald-950"
                      : "border-rose-200 bg-rose-50/20 text-rose-950"
                  }`}>
                    {predictFeedback}
                  </div>
                )}

                {predictAction === "left" && (
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setActiveStage("discover")}
                      className="px-5 py-2.5 bg-[#3F51B5] text-white hover:bg-[#3F51B5]/90 font-sans font-bold text-xs uppercase tracking-wider rounded-sm cursor-pointer shadow-sm transition-colors"
                    >
                      Go to Stage 2: Discover Rules
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* STAGE 2: RULE DISCOVERY */}
        {activeStage === "discover" && (
          <div className="space-y-5 py-2 select-none animate-in fade-in duration-200">
            <div className="space-y-3 font-serif">
              <span className="text-[10px] font-extrabold text-[#3F51B5] uppercase tracking-wider block">
                Stage 2: Pointers Update Logic
              </span>

              <p className="text-xs md:text-sm text-[#232323] leading-relaxed">
                Based on your reasoning, what are the universal rules for moving pointers in a sorted array?
              </p>

              <div className="grid grid-cols-1 gap-2.5">
                <button
                  onClick={() => handleVerifyRule("incorrect")}
                  className={`w-full p-3 border rounded-sm text-left text-xs md:text-sm font-semibold transition-all ${
                    ruleChoice === "incorrect" ? "border-rose-500 bg-rose-50/20" : "border-[#DDD7CC] bg-white hover:bg-slate-50"
                  }`}
                >
                  If Sum &lt; Target: Decrement Right. If Sum &gt; Target: Increment Left.
                </button>
                <button
                  onClick={() => handleVerifyRule("correct")}
                  className={`w-full p-3 border rounded-sm text-left text-xs md:text-sm font-semibold transition-all ${
                    ruleChoice === "correct" ? "border-emerald-500 bg-emerald-50/20" : "border-[#DDD7CC] bg-white hover:bg-slate-50"
                  }`}
                >
                  If Sum &lt; Target: Increment Left. If Sum &gt; Target: Decrement Right.
                </button>
              </div>

              {ruleFeedback && (
                <div className={`p-3 rounded-sm border text-xs ${
                  ruleChoice === "correct"
                    ? "border-emerald-200 bg-emerald-50/20 text-emerald-950"
                    : "border-rose-200 bg-rose-50/20 text-rose-950"
                }`}>
                  {ruleFeedback}
                </div>
              )}

              {ruleChoice === "correct" && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveStage("traverse")}
                    className="px-5 py-2.5 bg-[#3F51B5] text-white hover:bg-[#3F51B5]/90 font-sans font-bold text-xs uppercase tracking-wider rounded-sm cursor-pointer shadow-sm transition-colors"
                  >
                    Go to Stage 3: Step Simulation
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
                Pointer State: Step {currentStep + 1} of {traversalSteps.length}
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
                  Visual Array & Active Pointers (Target = 14)
                </div>
                
                <div className="flex flex-wrap gap-4 items-center justify-start py-2 font-sans">
                  {arrayVal.map((val, idx) => {
                    const isLeft = idx === traversalStep.leftIdx;
                    const isRight = idx === traversalStep.rightIdx;

                    let cellBorder = "border-[#DDD7CC]";
                    let cellBg = "bg-[#FCFBF8]";

                    if (isLeft || isRight) {
                      cellBorder = "border-[#3F51B5] ring-2 ring-[#3F51B5]/35";
                      cellBg = "bg-[#3F51B5]/5";
                    }

                    return (
                      <div key={idx} className="flex flex-col items-center">
                        <div className={`w-14 h-14 flex flex-col items-center justify-center border rounded-md transition-all duration-200 ${cellBorder} ${cellBg}`}>
                          <span className="text-[9px] text-[#666666] font-mono leading-none mb-1">idx {idx}</span>
                          <span className="text-sm font-bold text-[#232323]">{val}</span>
                        </div>
                        {isLeft && <span className="text-[9px] font-bold text-rose-600 mt-1.5 font-mono">Left Pointer</span>}
                        {isRight && <span className="text-[9px] font-bold text-emerald-700 mt-1.5 font-mono">Right Pointer</span>}
                        {!isLeft && !isRight && <span className="text-[9px] text-transparent mt-1.5 font-mono">-</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Math & Sum status info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans select-none pt-2">
                <div className="border border-[#DDD7CC] bg-[#F4F1EA]/30 p-3 rounded-sm text-center">
                  <div className="text-[9px] uppercase font-bold text-[#666666]">Calculation</div>
                  <div className="font-extrabold text-sm text-[#232323] mt-1">{traversalStep.math}</div>
                </div>
                <div className="border border-[#DDD7CC] bg-[#F4F1EA]/30 p-3 rounded-sm text-center">
                  <div className="text-[9px] uppercase font-bold text-[#3F51B5]">Current Sum</div>
                  <div className={`font-extrabold text-sm mt-1 ${
                    traversalStep.status === "match" ? "text-emerald-700" : "text-[#3F51B5]"
                  }`}>{traversalStep.currentSum}</div>
                </div>
                <div className="border border-[#DDD7CC] bg-[#F4F1EA]/30 p-3 rounded-sm text-center">
                  <div className="text-[9px] uppercase font-bold text-[#666666]">Current Action</div>
                  <div className="font-bold text-xs text-foreground/80 mt-1">{traversalStep.action}</div>
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
                See how we shrink our search space! In brute force, we check every pair. Here, since the array is sorted, we can adjust pointers dynamically. Sum too small? Move Left. Sum too large? Move Right. We find the pair in just a single scan—$O(N)$ instead of $O(N^2)$!
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
