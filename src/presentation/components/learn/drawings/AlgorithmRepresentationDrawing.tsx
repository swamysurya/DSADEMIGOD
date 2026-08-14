"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type RepType = "natural" | "flowchart" | "pseudocode";

interface RepTab {
  id: RepType;
  title: string;
  badge: string;
  explanation: string;
  visual: React.ReactNode;
}

export default function AlgorithmRepresentationDrawing() {
  const [activeTab, setActiveTab] = useState<RepType>("natural");

  const tabs: RepTab[] = [
    {
      id: "natural",
      title: "1. Natural Language",
      badge: "Plain English",
      explanation: "Explaining the steps in plain human language. Easy to write and understand, but can be verbose or imprecise.",
      visual: (
        <div className="flex flex-col gap-2 max-w-md w-full bg-[#FCFBF8] border border-[#DDD7CC] p-4 rounded-sm shadow-sm font-serif">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block border-b border-[#DDD7CC]/40 pb-1">
            Steps for finding 30 in [10, 20, 30, 40]:
          </span>
          <ol className="list-decimal pl-4 text-xs space-y-1.5 text-foreground pt-1.5">
            <li>Start by looking at the first element (index 0).</li>
            <li>Check if the value is equal to 30. If yes, return the index.</li>
            <li>If it does not match, move to the next element.</li>
            <li>Repeat the check for each card until you find 30.</li>
            <li>If you reach the end of the list without a match, report -1 (not found).</li>
          </ol>
        </div>
      )
    },
    {
      id: "flowchart",
      title: "2. Flowchart",
      badge: "Visual Diagram",
      explanation: "A diagrammatic layout showing decision routes. Excellent for grasping the control flow structure quickly.",
      visual: (
        <svg viewBox="0 0 240 180" className="w-full max-w-[340px] h-auto overflow-visible">
          {/* Start oval */}
          <rect x="90" y="5" width="60" height="20" rx="10" fill="#FCFBF8" stroke="#232323" strokeWidth="1.5" />
          <text x="120" y="18" textAnchor="middle" fill="#232323" fontSize="8" fontWeight="bold">Start</text>
          <line x1="120" y1="25" x2="120" y2="40" stroke="#666" strokeWidth="1.2" markerEnd="url(#arrow-flow)" />

          {/* Look at element box */}
          <rect x="80" y="40" width="80" height="22" fill="#FCFBF8" stroke="#232323" strokeWidth="1.5" />
          <text x="120" y="53" textAnchor="middle" fill="#232323" fontSize="7" fontWeight="bold">Check current value</text>
          <line x1="120" y1="62" x2="120" y2="80" stroke="#666" strokeWidth="1.2" markerEnd="url(#arrow-flow)" />

          {/* Matches Diamond */}
          <polygon points="120,80 155,95 120,110 85,95" fill="#FCFBF8" stroke="#3F51B5" strokeWidth="1.5" />
          <text x="120" y="98" textAnchor="middle" fill="#3F51B5" fontSize="7" fontWeight="bold">Is it 30?</text>

          {/* Yes branch to Output */}
          <line x1="155" y1="95" x2="185" y2="95" stroke="#666" strokeWidth="1.2" markerEnd="url(#arrow-flow)" />
          <text x="168" y="90" fill="#2E7D32" fontSize="7" fontWeight="bold">Yes</text>

          <rect x="185" y="85" width="48" height="20" fill="#FCFBF8" stroke="#2E7D32" strokeWidth="1.5" />
          <text x="209" y="97" textAnchor="middle" fill="#2E7D32" fontSize="7" fontWeight="bold">Return Index</text>

          {/* No branch to Loop */}
          <line x1="120" y1="110" x2="120" y2="130" stroke="#666" strokeWidth="1.2" markerEnd="url(#arrow-flow)" />
          <text x="125" y="120" fill="#C0392B" fontSize="7" fontWeight="bold">No</text>

          {/* End Check Box */}
          <polygon points="120,130 155,142 120,154 85,142" fill="#FCFBF8" stroke="#232323" strokeWidth="1.2" />
          <text x="120" y="145" textAnchor="middle" fill="#232323" fontSize="6.5" fontWeight="bold">End of list?</text>

          {/* Loop line back to Check */}
          <path d="M 85 142 L 50 142 L 50 51 L 80 51" fill="none" stroke="#666" strokeWidth="1.2" markerEnd="url(#arrow-flow)" />
          <text x="55" y="136" fill="#666" fontSize="6.5" fontWeight="bold">No (Move Next)</text>

          {/* End Oval */}
          <line x1="120" y1="154" x2="120" y2="170" stroke="#666" strokeWidth="1.2" markerEnd="url(#arrow-flow)" />
          <text x="125" y="163" fill="#C0392B" fontSize="7" fontWeight="bold">Yes</text>
          <rect x="95" y="170" width="50" height="10" rx="5" fill="#FCFBF8" stroke="#232323" strokeWidth="1" />
          <text x="120" y="177" textAnchor="middle" fill="#232323" fontSize="6" fontWeight="bold">Return -1</text>

          <defs>
            <marker id="arrow-flow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#666" />
            </marker>
          </defs>
        </svg>
      )
    },
    {
      id: "pseudocode",
      title: "3. Pseudocode",
      badge: "Structured Logic",
      explanation: "A structured, text-based outline of logic that reads like a programming language, but skips syntax rules.",
      visual: (
        <div className="w-full max-w-md border border-[#DDD7CC] bg-[#FCFBF8] rounded-sm p-4 text-[11px] font-mono text-foreground leading-relaxed shadow-sm">
          <div className="text-[10px] text-muted-foreground border-b border-[#DDD7CC]/40 pb-1 mb-2 uppercase font-bold tracking-wider">
            Pseudocode representation
          </div>
          <span className="text-[#3F51B5] font-bold">Algorithm</span> FindValue(A, n, target)<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#6B46C1] font-bold">for</span> i = 0 to n - 1<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#6B46C1] font-bold">if</span> A[i] == target<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-secondary-foreground font-bold">return</span> i<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-secondary-foreground font-bold">return</span> -1
        </div>
      )
    }
  ];

  const currentTab = tabs.find((t) => t.id === activeTab)!;

  const handlePrevious = () => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[#DDD7CC]/40 pb-3">
          <div>
            <h4 className="text-xs font-black text-foreground uppercase tracking-wider font-mono">
              Representations of an Algorithm
            </h4>
            <p className="text-[13px] text-muted-foreground" style={{ fontFamily: "'Caveat', cursive" }}>
              Toggle between the representations below using the steps to search for a value in a list.
            </p>
          </div>
          <span className="px-2 py-0.5 bg-[#3F51B5]/5 border border-[#3F51B5]/30 text-[#3F51B5] font-mono text-[9px] uppercase font-bold rounded-sm">
            Interactive Drawing
          </span>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#DDD7CC] text-[11px] font-mono">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 -mb-px border-t border-l border-r transition-all duration-150 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#FCFBF8] border-[#DDD7CC] text-[#3F51B5] font-bold"
                  : "bg-transparent border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.id === "natural" ? "Natural Language" : tab.id === "flowchart" ? "Flowchart" : "Pseudocode"}
            </button>
          ))}
        </div>

        {/* Panel Content */}
        <div className="min-h-[220px] flex flex-col justify-between p-5 border border-dashed border-[#DDD7CC] bg-[#F4F1EA]/10 rounded-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="space-y-4 flex-1 flex flex-col justify-between"
            >
              {/* Description info */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="font-serif font-black text-sm text-foreground">
                    {currentTab.title}
                  </h5>
                  <span className="text-[9px] font-mono font-bold bg-[#3F51B5]/5 border border-[#3F51B5]/20 text-[#3F51B5] px-2 py-0.5 rounded-sm">
                    {currentTab.badge}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-normal font-serif">
                  {currentTab.explanation}
                </p>
              </div>

              {/* Central Visual rendering */}
              <div className="py-2 flex items-center justify-center min-h-[90px]">
                {currentTab.visual}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Toolbar */}
        <div className="flex items-center justify-between font-mono pt-1">
          <span className="text-[10px] text-muted-foreground font-bold">
            Representation {tabs.findIndex((t) => t.id === activeTab) + 1} of 3
          </span>
          
          <div className="flex gap-2">
            <button
              disabled={activeTab === "natural"}
              onClick={handlePrevious}
              className="px-3 py-1.5 border border-[#DDD7CC] text-foreground font-bold hover:bg-secondary/10 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer text-[10px] uppercase tracking-wider rounded-sm"
            >
              Prev
            </button>
            <button
              disabled={activeTab === "pseudocode"}
              onClick={handleNext}
              className="px-3 py-1.5 bg-[#3F51B5] text-white border border-[#3F51B5] font-bold hover:bg-[#3F51B5]/95 disabled:opacity-30 disabled:hover:bg-[#3F51B5] cursor-pointer text-[10px] uppercase tracking-wider rounded-sm"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
