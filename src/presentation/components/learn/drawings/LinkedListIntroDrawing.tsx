"use client";

import React, { useState, useEffect } from "react";
import { RotateCcw, Maximize2, Minimize2, ArrowRight } from "lucide-react";

interface TraversalStep {
  currentNodeIdx: number | null;
  explanation: string;
  terminalOutput: string;
  isFinished: boolean;
}

export default function LinkedListIntroDrawing() {
  const [activeStage, setActiveStage] = useState<"predict" | "discover" | "traverse">("predict");
  const [isFocused, setIsFocused] = useState(false);

  // Focus Mode body overflow handler
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

  // Stage 1 State: Node structure prediction
  const [nodeChoice, setNodeChoice] = useState<string | null>(null);
  const [nodeFeedback, setNodeFeedback] = useState("");

  const handleVerifyNodeChoice = (choice: string) => {
    setNodeChoice(choice);
    if (choice === "correct") {
      setNodeFeedback("Correct! Every node contains two slots: one for storing the data itself, and one containing the memory address of the next node. This address acts as a pointer or link!");
    } else if (choice === "index") {
      setNodeFeedback("Not quite. Unlike arrays, linked list nodes are scattered in memory, so they don't have indexes. We must store the actual memory address of the next node.");
    } else {
      setNodeFeedback("No. If we only stored data, the nodes would have no connection to each other and would get lost in memory!");
    }
  };

  // Stage 2 State: Scavenger Hunt Concept
  const [huntChoice, setHuntChoice] = useState<string | null>(null);
  const [huntFeedback, setHuntFeedback] = useState("");

  const handleVerifyHunt = (choice: string) => {
    setHuntChoice(choice);
    if (choice === "correct") {
      setHuntFeedback("Perfect! The Head pointer is our starting clue. If we lose the Head, we can never find the rest of the list because we don't know where the chain starts!");
    } else {
      setHuntFeedback("Think again. If you know the end (Tail), you can't walk backward in a Singly Linked List because arrows only point forward. We must know where it starts (Head)!");
    }
  };

  // Stage 3 State: Visual Traversal Simulation
  const [currentStep, setCurrentStep] = useState(0);

  const nodes = [
    { value: 10, address: "0x100", next: "0x300", name: "Node A (Head)" },
    { value: 20, address: "0x300", next: "0x200", name: "Node B" },
    { value: 30, address: "0x200", next: "NULL", name: "Node C (Tail)" }
  ];

  const traversalSteps: TraversalStep[] = [
    {
      currentNodeIdx: 0,
      explanation: "We start our hunt at the Head pointer, which points to address 0x100. We read Node A: Data = 10, Next Clue = 0x300.",
      terminalOutput: "Visited: Node A (Value: 10)",
      isFinished: false
    },
    {
      currentNodeIdx: 1,
      explanation: "Following the clue 0x300, we move to Node B in memory. We read Node B: Data = 20, Next Clue = 0x200.",
      terminalOutput: "Visited: Node A (Value: 10) -> Node B (Value: 20)",
      isFinished: false
    },
    {
      currentNodeIdx: 2,
      explanation: "Following the clue 0x200, we arrive at Node C. We read Node C: Data = 30, Next Clue = NULL.",
      terminalOutput: "Visited: Node A (Value: 10) -> Node B (Value: 20) -> Node C (Value: 30)",
      isFinished: false
    },
    {
      currentNodeIdx: null,
      explanation: "The Next pointer is NULL! This means there are no more clues. Our scavenger hunt is finished!",
      terminalOutput: "Visited: Node A (Value: 10) -> Node B (Value: 20) -> Node C (Value: 30) -> End",
      isFinished: true
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
              Linked List Interactive Discovery
            </h4>
            <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
              "Let's trace how nodes connect in memory like a scavenger hunt!"
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
                1. What is a Node?
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
                2. Scavenger Clue
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
                3. Walk Simulation
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

        {/* STAGE 1: WHAT IS A NODE */}
        {activeStage === "predict" && (
          <div className="space-y-5 py-2 select-none">
            <div className="space-y-3 font-serif">
              <span className="text-[10px] font-extrabold text-[#3F51B5] uppercase tracking-wider block">
                Stage 1: Anatomy of a memory block (Node)
              </span>

              {/* Visual representation of a single Node */}
              <div className="flex justify-center py-4">
                <div className="flex border-2 border-[#232323] rounded-md overflow-hidden bg-[#FCFBF8] shadow-sm select-none">
                  <div className="px-5 py-4 border-r-2 border-[#232323] text-center">
                    <span className="text-[9px] uppercase font-bold text-[#666666] block font-sans">Data Slot</span>
                    <span className="text-lg font-extrabold text-[#232323] font-mono">10</span>
                  </div>
                  <div className="px-5 py-4 text-center bg-blue-50/20">
                    <span className="text-[9px] uppercase font-bold text-[#3F51B5] block font-sans">Next Slot</span>
                    <span className="text-lg font-extrabold text-[#3F51B5] font-mono">0x300</span>
                  </div>
                </div>
              </div>

              <p className="text-xs md:text-sm text-[#232323] leading-relaxed">
                In a linked list, each element is stored inside a **Node** like the card shown above. 
                One slot holds the **Data** (our value, 10). What does the other slot (0x300) represent?
              </p>

              <div className="grid grid-cols-1 gap-2.5">
                <button
                  onClick={() => handleVerifyNodeChoice("data")}
                  className={`w-full p-3 border rounded-sm text-left text-xs md:text-sm font-semibold transition-all ${
                    nodeChoice === "data" ? "border-rose-500 bg-rose-50/20" : "border-[#DDD7CC] bg-white hover:bg-slate-50"
                  }`}
                >
                  (A) A duplicate copy of the same data.
                </button>
                <button
                  onClick={() => handleVerifyNodeChoice("index")}
                  className={`w-full p-3 border rounded-sm text-left text-xs md:text-sm font-semibold transition-all ${
                    nodeChoice === "index" ? "border-rose-500 bg-rose-50/20" : "border-[#DDD7CC] bg-white hover:bg-slate-50"
                  }`}
                >
                  (B) The index number of the element (like index 0, 1, 2).
                </button>
                <button
                  onClick={() => handleVerifyNodeChoice("correct")}
                  className={`w-full p-3 border rounded-sm text-left text-xs md:text-sm font-semibold transition-all ${
                    nodeChoice === "correct" ? "border-emerald-500 bg-emerald-50/20" : "border-[#DDD7CC] bg-white hover:bg-slate-50"
                  }`}
                >
                  (C) The memory address (pointer) of the next node.
                </button>
              </div>

              {nodeFeedback && (
                <div className={`p-3 rounded-sm border text-xs ${
                  nodeChoice === "correct"
                    ? "border-emerald-200 bg-emerald-50/20 text-emerald-950"
                    : "border-rose-200 bg-rose-50/20 text-rose-950"
                }`}>
                  {nodeFeedback}
                </div>
              )}

              {nodeChoice === "correct" && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveStage("discover")}
                    className="px-5 py-2.5 bg-[#3F51B5] text-white hover:bg-[#3F51B5]/90 font-sans font-bold text-xs uppercase tracking-wider rounded-sm cursor-pointer shadow-sm transition-colors"
                  >
                    Go to Stage 2: Scavenger Clue
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STAGE 2: SCAVENGER HUNT CONCEPT */}
        {activeStage === "discover" && (
          <div className="space-y-5 py-2 select-none animate-in fade-in duration-200">
            <div className="space-y-3 font-serif">
              <span className="text-[10px] font-extrabold text-[#3F51B5] uppercase tracking-wider block">
                Stage 2: How do we start the search?
              </span>

              {/* Visual representation of scattered memory */}
              <div className="border border-[#DDD7CC] bg-white p-4 rounded-sm space-y-2 select-none">
                <span className="text-[9px] uppercase font-bold text-[#666666] tracking-widest block mb-1">Scattered Memory Layout (RAM)</span>
                <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono select-none">
                  <div className="border border-dashed border-[#DDD7CC] p-2 bg-[#FCFBF8]">
                    <div className="text-[9px] text-[#666666]">0x100</div>
                    <div className="font-extrabold">Node A</div>
                    <div className="text-[9px] text-blue-600">Points to 0x300</div>
                  </div>
                  <div className="border border-dashed border-[#DDD7CC] p-2 bg-[#FCFBF8]">
                    <div className="text-[9px] text-[#666666]">0x200</div>
                    <div className="font-extrabold">Node C</div>
                    <div className="text-[9px] text-rose-600">Points to NULL</div>
                  </div>
                  <div className="border border-dashed border-[#DDD7CC] p-2 bg-[#FCFBF8]">
                    <div className="text-[9px] text-[#666666]">0x300</div>
                    <div className="font-extrabold">Node B</div>
                    <div className="text-[9px] text-blue-600">Points to 0x200</div>
                  </div>
                </div>
              </div>

              <p className="text-xs md:text-sm text-[#232323] leading-relaxed">
                Notice that Node A, B, and C are scattered at random addresses in memory. They are not side-by-side! 
                If we want to find the very first element (our starting point), what pointer must we keep track of?
              </p>

              <div className="grid grid-cols-1 gap-2.5">
                <button
                  onClick={() => handleVerifyHunt("tail")}
                  className={`w-full p-3 border rounded-sm text-left text-xs md:text-sm font-semibold transition-all ${
                    huntChoice === "tail" ? "border-rose-500 bg-rose-50/20" : "border-[#DDD7CC] bg-white hover:bg-slate-50"
                  }`}
                >
                  (A) The Tail pointer (pointing to Node C).
                </button>
                <button
                  onClick={() => handleVerifyHunt("correct")}
                  className={`w-full p-3 border rounded-sm text-left text-xs md:text-sm font-semibold transition-all ${
                    huntChoice === "correct" ? "border-emerald-500 bg-emerald-50/20" : "border-[#DDD7CC] bg-white hover:bg-slate-50"
                  }`}
                >
                  (B) The Head pointer (pointing to Node A).
                </button>
              </div>

              {huntFeedback && (
                <div className={`p-3 rounded-sm border text-xs ${
                  huntChoice === "correct"
                    ? "border-emerald-200 bg-emerald-50/20 text-emerald-950"
                    : "border-rose-200 bg-rose-50/20 text-rose-950"
                }`}>
                  {huntFeedback}
                </div>
              )}

              {huntChoice === "correct" && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveStage("traverse")}
                    className="px-5 py-2.5 bg-[#3F51B5] text-white hover:bg-[#3F51B5]/90 font-sans font-bold text-xs uppercase tracking-wider rounded-sm cursor-pointer shadow-sm transition-colors"
                  >
                    Go to Stage 3: Walk Simulation
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STAGE 3: WALK TRAVERSAL SIMULATION */}
        {activeStage === "traverse" && (
          <div className="space-y-5 flex flex-col flex-grow animate-in fade-in duration-200">
            
            {/* Visualizer Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#F4F1EA]/50 border border-[#DDD7CC] p-3 rounded-sm select-none">
              <span className="text-xs font-mono font-bold text-[#666666] bg-white border border-[#DDD7CC] px-2 py-1 rounded-sm">
                Traversal Step: {currentStep + 1} of {traversalSteps.length}
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
              
              {/* Nodes Linkage Diagram */}
              <div className="space-y-3">
                <div className="text-[10px] font-bold text-[#666666] uppercase tracking-wider">
                  Linked Nodes in Memory (Scavenger Hunt)
                </div>
                
                <div className="flex flex-wrap gap-4 items-center justify-start py-4 font-sans select-none">
                  {nodes.map((node, idx) => {
                    const isActive = idx === traversalStep.currentNodeIdx;
                    let borderClass = "border-[#DDD7CC]";
                    let bgClass = "bg-[#FCFBF8]";

                    if (isActive) {
                      borderClass = "border-[#3F51B5] ring-2 ring-[#3F51B5]/35 scale-105";
                      bgClass = "bg-[#3F51B5]/5";
                    }

                    return (
                      <React.Fragment key={idx}>
                        <div className={`flex flex-col border rounded-md transition-all duration-200 ${borderClass} ${bgClass} overflow-hidden shadow-sm`}>
                          <div className="bg-[#F4F1EA] px-3.5 py-1.5 border-b border-[#DDD7CC] text-[10px] font-bold text-[#232323] font-mono flex justify-between gap-4">
                            <span>{node.name}</span>
                            <span className="text-[#666666]/70">{node.address}</span>
                          </div>
                          <div className="flex">
                            <div className="px-4 py-2 border-r border-[#DDD7CC] text-center">
                              <span className="text-[8px] uppercase font-bold text-[#666666] block">data</span>
                              <span className="text-xs font-extrabold text-foreground">{node.value}</span>
                            </div>
                            <div className="px-4 py-2 text-center bg-blue-50/10">
                              <span className="text-[8px] uppercase font-bold text-[#3F51B5] block font-mono">next</span>
                              <span className="text-xs font-extrabold text-blue-600 font-mono">{node.next}</span>
                            </div>
                          </div>
                        </div>
                        {idx < nodes.length - 1 && (
                          <ArrowRight className="w-5 h-5 text-[#666666]/40" />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Status information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans select-none pt-2">
                <div className="border border-[#DDD7CC] bg-[#F4F1EA]/30 p-3 rounded-sm">
                  <div className="text-[9px] uppercase font-bold text-[#666666]">Active Address Location</div>
                  <div className="font-extrabold text-sm text-[#3F51B5] mt-1 font-mono">
                    {traversalStep.currentNodeIdx !== null ? nodes[traversalStep.currentNodeIdx].address : "NULL (End)"}
                  </div>
                </div>
                <div className="border border-[#DDD7CC] bg-[#F4F1EA]/30 p-3 rounded-sm">
                  <div className="text-[9px] uppercase font-bold text-[#666666]">Console Visited Path Log</div>
                  <div className="font-bold text-xs text-foreground/80 mt-1 font-mono">{traversalStep.terminalOutput}</div>
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
                Notice how we traverse! Since nodes aren't side-by-side, we can't jump directly to a node (no index lookup like `arr[2]`). We have to start at Head (0x100) and step along the pointers one-by-one. This is why search in a linked list is always $O(N)$!
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
