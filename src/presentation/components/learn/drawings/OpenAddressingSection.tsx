"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, RotateCcw, Maximize2, Minimize2 } from "lucide-react";

interface SimStep {
  activeKey: number | null;
  formula: string | null;
  explanation: string;
  arrayState: (number | null)[];
  probedIndexes: number[];
}

interface ProbingData {
  title: string;
  intro: string;
  formulaLabel: string;
  steps: SimStep[];
  pros: string;
  cons: string;
}

export default function OpenAddressingSection() {
  const [activeTab, setActiveTab] = useState<"linear" | "quadratic" | "double">("linear");
  
  // Simulation step state per tab
  const [linearStep, setLinearStep] = useState(0);
  const [quadraticStep, setQuadraticStep] = useState(0);
  const [doubleStep, setDoubleStep] = useState(0);

  // Focus mode state
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

  const currentStep = activeTab === "linear" ? linearStep : activeTab === "quadratic" ? quadraticStep : doubleStep;
  const setCurrentStep = activeTab === "linear" ? setLinearStep : activeTab === "quadratic" ? setQuadraticStep : setDoubleStep;

  const data: Record<"linear" | "quadratic" | "double", ProbingData> = {
    linear: {
      title: "Linear Probing Simulation",
      intro: "Linear Probing searches for the next available slot sequentially (index + 1, index + 2...) wrapping around when it reaches the end of the array.",
      formulaLabel: "Hash(x, i) = (Hash(x) + i) % N",
      pros: "Very simple to implement. It is also fast because the computer can read slots that are right next to each other in memory much faster.",
      cons: "Primary Clustering: Keys gather in long consecutive blocks, making insertions progressively slower.",
      steps: [
        {
          activeKey: null,
          formula: null,
          explanation: "We start with an empty array of capacity 10. Let's insert keys: 25, 35, and 45. Linear Probing checks H + i.",
          arrayState: [null, null, null, null, null, null, null, null, null, null],
          probedIndexes: []
        },
        {
          activeKey: 25,
          formula: "25 % 10 = 5",
          explanation: "Key 25 hashes to index 5. Slot [5] is empty, so we store 25 directly at index 5.",
          arrayState: [null, null, null, null, null, 25, null, null, null, null],
          probedIndexes: [5]
        },
        {
          activeKey: 35,
          formula: "35 % 10 = 5 (Collision!)",
          explanation: "Key 35 hashes to index 5. Since index 5 is occupied, we check the next slot sequentially: index 6. Index 6 is empty, so we store 35 there.",
          arrayState: [null, null, null, null, null, 25, 35, null, null, null],
          probedIndexes: [5, 6]
        },
        {
          activeKey: 45,
          formula: "45 % 10 = 5 (Collision!)",
          explanation: "Key 45 hashes to index 5. It collides at 5, probes index 6 (occupied), and checks index 7. Index 7 is empty, so we store 45 there.",
          arrayState: [null, null, null, null, null, 25, 35, 45, null, null],
          probedIndexes: [5, 6, 7]
        }
      ]
    },
    quadratic: {
      title: "Quadratic Probing Simulation",
      intro: "Quadratic Probing searches for open slots by checking quadratic step offsets (index + 1², index + 2², index + 3²...) to skip past blocks.",
      formulaLabel: "Hash(x, i) = (Hash(x) + i²) % N",
      pros: "Effectively solves primary clustering by jumping across occupied blocks.",
      cons: "Secondary Clustering: Keys hashing to the same starting index follow the exact same search path.",
      steps: [
        {
          activeKey: null,
          formula: null,
          explanation: "We start with an empty array of capacity 10. Let's insert keys: 25, 35, and 45. Quadratic Probing checks H + i².",
          arrayState: [null, null, null, null, null, null, null, null, null, null],
          probedIndexes: []
        },
        {
          activeKey: 25,
          formula: "25 % 10 = 5",
          explanation: "Key 25 hashes to index 5. Index 5 is empty, so 25 is stored directly at slot [5].",
          arrayState: [null, null, null, null, null, 25, null, null, null, null],
          probedIndexes: [5]
        },
        {
          activeKey: 35,
          formula: "35 % 10 = 5 (Collision!)",
          explanation: "Key 35 hashes to index 5. Since it's occupied, we check index 5 + 1² = 6. Index 6 is empty, so we store 35 at slot [6].",
          arrayState: [null, null, null, null, null, 25, 35, null, null, null],
          probedIndexes: [5, 6]
        },
        {
          activeKey: 45,
          formula: "45 % 10 = 5 (Collision!)",
          explanation: "Key 45 hashes to index 5. It collides at 5, probes 5 + 1² = 6 (occupied), and probes 5 + 2² = 9. Slot 9 is empty, so 45 is stored at index 9.",
          arrayState: [null, null, null, null, null, 25, 35, null, null, 45],
          probedIndexes: [5, 6, 9]
        }
      ]
    },
    double: {
      title: "Double Hashing Simulation",
      intro: "Double Hashing uses a second hash function Hash₂(x) to compute a key-specific step size, creating unique search paths for different keys.",
      formulaLabel: "Hash(x, i) = (Hash₁(x) + i * Hash₂(x)) % N",
      pros: "Completely eliminates both primary and secondary clustering, creating uniform distributions.",
      cons: "Requires computing two hash functions, taking slightly more CPU calculation steps.",
      steps: [
        {
          activeKey: null,
          formula: null,
          explanation: "We start with an empty array of capacity 10. Let's insert keys: 25, 35, and 45. We assume Hash₂(key) = 3.",
          arrayState: [null, null, null, null, null, null, null, null, null, null],
          probedIndexes: []
        },
        {
          activeKey: 25,
          formula: "Hash₁(25) = 5",
          explanation: "Key 25 hashes to index 5. Slot 5 is empty, so 25 is stored directly.",
          arrayState: [null, null, null, null, null, 25, null, null, null, null],
          probedIndexes: [5]
        },
        {
          activeKey: 35,
          formula: "Hash₁(35) = 5, Hash₂(35) = 3",
          explanation: "Key 35 hashes to index 5. Since slot 5 is occupied, we calculate a step size of Hash₂ = 3. We check index 5 + 3 = 8. Slot 8 is empty, so we store 35 there.",
          arrayState: [null, null, null, null, null, 25, null, null, 35, null],
          probedIndexes: [5, 8]
        },
        {
          activeKey: 45,
          formula: "Hash₁(45) = 5, Hash₂(45) = 3",
          explanation: "Key 45 hashes to index 5. It collides at 5, probes 5 + 3 = 8 (occupied), and probes 5 + 2 * 3 = 11 % 10 = 1. Slot 1 is empty, so we store 45 there.",
          arrayState: [null, 45, null, null, null, 25, null, null, 35, null],
          probedIndexes: [5, 8, 1]
        }
      ]
    }
  };

  const activeData = data[activeTab];
  const step = activeData.steps[currentStep];

  const handleNext = () => {
    if (currentStep < activeData.steps.length - 1) {
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

  const keysQueue = [25, 35, 45];

  const visualizerContent = (
    <div className={`w-full border border-[#DDD7CC] bg-[#FCFBF8] p-6 rounded-sm space-y-4 shadow-sm transition-all duration-300 ${
      isFocused ? "max-w-4xl m-auto" : ""
    }`}>
      
      {/* Tab Switcher Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Left Side: Simulation Panel */}
        <div className="md:col-span-3 space-y-4">
          
          {/* Header block with controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DDD7CC]/50 pb-3">
            <div>
              <h4 className="text-xs font-extrabold text-[#232323] uppercase tracking-wide">
                {activeData.title}
              </h4>
              <p className="text-[11px] text-[#666666] leading-relaxed mt-0.5">
                {activeData.intro}
              </p>
            </div>
            
            {/* Simulation Toolbar */}
            <div className="flex items-center gap-1.5 shrink-0">
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
                title="Reset simulation step"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={`px-2 py-1.5 border border-[#DDD7CC] rounded-sm text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 cursor-pointer transition-colors ${
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
                disabled={currentStep === activeData.steps.length - 1}
                className={`px-2 py-1.5 border border-[#3F51B5] rounded-sm text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 cursor-pointer transition-colors ${
                  currentStep === activeData.steps.length - 1
                    ? "opacity-40 cursor-not-allowed"
                    : "bg-[#3F51B5] text-white hover:bg-[#3F51B5]/90"
                }`}
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-[10px] font-mono font-bold bg-[#F4F1EA] px-2 py-1 border border-[#DDD7CC] rounded-sm text-[#666666] shrink-0">
                {currentStep} / {activeData.steps.length - 1}
              </span>
            </div>
          </div>

          {/* Keys list to insert */}
          <div className="p-3 border border-[#DDD7CC] bg-[#F4F1EA]/30 rounded-sm flex items-center justify-between gap-3">
            <span className="text-[9px] uppercase font-bold text-[#666666]">Keys to Insert:</span>
            <div className="flex gap-2">
              {keysQueue.map((k, idx) => {
                const isActive = step.activeKey === k;
                const isInserted = keysQueue.indexOf(step.activeKey!) >= idx;
                return (
                  <div
                    key={idx}
                    className={`w-9 h-7 border flex items-center justify-center font-mono text-[10px] font-bold rounded-sm transition-all duration-200 ${
                      isActive
                        ? "bg-[#3F51B5] border-[#3F51B5] text-white shadow-sm scale-110 animate-pulse"
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
            isFocused ? "min-h-[140px]" : "min-h-[100px]"
          }`}>
            {/* Horizontal Array Grid */}
            <div className="w-full flex flex-col items-center space-y-2">
              <div className="w-full grid grid-cols-10 border border-[#DDD7CC] rounded-sm overflow-hidden bg-[#FCFBF8] font-mono">
                {step.arrayState.map((val, idx) => {
                  const isProbed = step.probedIndexes.includes(idx);
                  const isLatest = val === step.activeKey && val !== null;
                  return (
                    <div
                      key={idx}
                      className={`flex flex-col items-center justify-center border-r last:border-r-0 border-[#DDD7CC] py-2 transition-all duration-300 ${
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
              
              {/* Indices Labels */}
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

          {/* Pros & Cons box */}
          <div className="p-3 border border-[#DDD7CC]/80 bg-[#FCFBF8] rounded-sm space-y-2 text-[11px]">
            <span className="text-[9px] uppercase font-extrabold text-[#666666] tracking-wide block">
              Method Properties:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="font-bold text-[#2E7D32] uppercase text-[9px]">Advantages</span>
                <p className="text-[#666666] leading-relaxed">{activeData.pros}</p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-[#C0392B] uppercase text-[9px]">Disadvantages</span>
                <p className="text-[#666666] leading-relaxed">{activeData.cons}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Tab Switcher Buttons (Desktop) */}
        <div className="flex flex-col gap-2 justify-start pt-1.5">
          <span className="text-[9px] uppercase font-extrabold text-[#666666] tracking-wider mb-1 block">
            Probing Techniques
          </span>
          
          {(["linear", "quadratic", "double"] as const).map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  // Preserve simulation state or reset
                }}
                className={`w-full py-2.5 px-3 text-left font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wide border rounded-sm transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#3F51B5] border-[#3F51B5] text-white shadow-sm font-extrabold translate-x-1"
                    : "bg-[#FCFBF8] border-[#DDD7CC] text-[#666666] hover:bg-[#F4F1EA]/30 hover:text-[#232323]"
                }`}
              >
                {tab === "linear" ? "Linear Probing" : tab === "quadratic" ? "Quadratic Probing" : "Double Hashing"}
              </button>
            );
          })}
          
          <div className="mt-4 p-2.5 border border-dashed border-[#DDD7CC] bg-[#F4F1EA]/30 rounded-sm text-[10px] text-[#666666] leading-relaxed font-serif">
            <strong>Formula Reference</strong>:<br />
            <code className="text-[9px] font-mono text-[#3F51B5] bg-white border border-[#DDD7CC] px-1 py-0.5 rounded-sm block mt-1">
              {activeData.formulaLabel}
            </code>
          </div>
        </div>

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
          <div className="w-full max-w-4xl bg-[#FCFBF8] rounded-sm relative">
            {visualizerContent}
          </div>
        </div>
      )}
    </div>
  );
}
