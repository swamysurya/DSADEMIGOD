"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BoundType = "big-o" | "big-omega" | "big-theta";

interface GraphInfo {
  id: BoundType;
  title: string;
  mathDef: string;
  explanation: string;
  badge: string;
  graphContent: React.ReactNode;
}

export default function AsymptoticBoundsDrawing() {
  const [activeTab, setActiveTab] = useState<BoundType>("big-o");
  const [sliderN, setSliderN] = useState<number>(1);

  // Example math calculations: f(n) = 3n + 2, g(n) = n, c = 4 (O) or c = 2 (Omega)
  const f_n = 3 * sliderN + 2;
  const cg_o = 4 * sliderN;  // Upper bound: c = 4
  const cg_omega = 2 * sliderN; // Lower bound: c = 2

  const graphList: GraphInfo[] = [
    {
      id: "big-o",
      title: "Big-O (Upper Bound)",
      mathDef: "f(n) ≤ c · g(n) for all n ≥ n₀",
      explanation: "f(n) does not grow faster than a constant multiple of g(n). It defines the absolute worst-case growth rate.",
      badge: "Upper Limit",
      graphContent: (
        <svg viewBox="0 0 200 140" className="w-full max-w-[280px] h-auto overflow-visible select-none">
          {/* Axes */}
          <line x1="20" y1="120" x2="190" y2="120" stroke="#666" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <line x1="20" y1="120" x2="20" y2="15" stroke="#666" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="185" y="132" fill="#666" fontSize="9" fontWeight="bold">n</text>
          <text x="10" y="12" fill="#666" fontSize="9" fontWeight="bold">Time</text>

          {/* n0 vertical line */}
          <line x1="80" y1="120" x2="80" y2="25" stroke="#DDD7CC" strokeWidth="1" strokeDasharray="3,3" />
          <text x="75" y="132" fill="#666" fontSize="9" fontWeight="bold">n₀ (2)</text>

          {/* c * g(n) curve (Upper Bound) */}
          <path d="M 20 110 Q 70 85, 120 50 T 180 20" fill="none" stroke="#3F51B5" strokeWidth="2" />
          <text x="155" y="16" fill="#3F51B5" fontSize="13" style={{ fontFamily: "'Caveat', cursive", fontWeight: "bold" }}>c · g(n) (4n)</text>

          {/* f(n) curve */}
          <path d="M 20 115 Q 60 100, 110 80 T 170 55" fill="none" stroke="#232323" strokeWidth="1.5" strokeDasharray="1" />
          <text x="158" y="70" fill="#232323" fontSize="13" style={{ fontFamily: "'Caveat', cursive", fontWeight: "bold" }}>f(n) (3n + 2)</text>

          {/* Dynamic position dot indicator */}
          {sliderN >= 0 && (
            <>
              {/* Dot for f(n) */}
              <circle cx={20 + sliderN * 30} cy={115 - sliderN * 12} r="4" fill="#232323" />
              {/* Dot for c*g(n) */}
              <circle cx={20 + sliderN * 30} cy={110 - sliderN * 18} r="4" fill="#3F51B5" />
            </>
          )}

          {/* Arrow markers definitions */}
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#666" />
            </marker>
          </defs>
        </svg>
      )
    },
    {
      id: "big-omega",
      title: "Big-Omega (Lower Bound)",
      mathDef: "f(n) ≥ c · g(n) for all n ≥ n₀",
      explanation: "f(n) grows at least as fast as a constant multiple of g(n). It defines the absolute best-case growth rate.",
      badge: "Lower Limit",
      graphContent: (
        <svg viewBox="0 0 200 140" className="w-full max-w-[280px] h-auto overflow-visible select-none">
          {/* Axes */}
          <line x1="20" y1="120" x2="190" y2="120" stroke="#666" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <line x1="20" y1="120" x2="20" y2="15" stroke="#666" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="185" y="132" fill="#666" fontSize="9" fontWeight="bold">n</text>
          <text x="10" y="12" fill="#666" fontSize="9" fontWeight="bold">Time</text>

          {/* n0 vertical line */}
          <line x1="80" y1="120" x2="80" y2="25" stroke="#DDD7CC" strokeWidth="1" strokeDasharray="3,3" />
          <text x="75" y="132" fill="#666" fontSize="9" fontWeight="bold">n₀ (2)</text>

          {/* f(n) curve (Above) */}
          <path d="M 20 110 Q 70 80, 110 55 T 170 20" fill="none" stroke="#232323" strokeWidth="1.5" strokeDasharray="1" />
          <text x="155" y="16" fill="#232323" fontSize="13" style={{ fontFamily: "'Caveat', cursive", fontWeight: "bold" }}>f(n) (3n + 2)</text>

          {/* c * g(n) curve (Lower Bound) */}
          <path d="M 20 115 Q 60 100, 120 85 T 180 65" fill="none" stroke="#3F51B5" strokeWidth="2" />
          <text x="150" y="82" fill="#3F51B5" fontSize="13" style={{ fontFamily: "'Caveat', cursive", fontWeight: "bold" }}>c · g(n) (2n)</text>

          {/* Dynamic position dot indicator */}
          {sliderN >= 0 && (
            <>
              {/* Dot for f(n) */}
              <circle cx={20 + sliderN * 30} cy={110 - sliderN * 18} r="4" fill="#232323" />
              {/* Dot for c*g(n) */}
              <circle cx={20 + sliderN * 30} cy={115 - sliderN * 10} r="4" fill="#3F51B5" />
            </>
          )}

          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#666" />
            </marker>
          </defs>
        </svg>
      )
    },
    {
      id: "big-theta",
      title: "Big-Theta (Tight Bound)",
      mathDef: "c₁ · g(n) ≤ f(n) ≤ c₂ · g(n) for all n ≥ n₀",
      explanation: "f(n) is trapped between c₁·g(n) and c₂·g(n). It represents a tight bound where growth rate matches exactly.",
      badge: "Tight Limit",
      graphContent: (
        <svg viewBox="0 0 200 140" className="w-full max-w-[280px] h-auto overflow-visible select-none">
          {/* Axes */}
          <line x1="20" y1="120" x2="190" y2="120" stroke="#666" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <line x1="20" y1="120" x2="20" y2="15" stroke="#666" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="185" y="132" fill="#666" fontSize="9" fontWeight="bold">n</text>
          <text x="10" y="12" fill="#666" fontSize="9" fontWeight="bold">Time</text>

          {/* n0 vertical line */}
          <line x1="80" y1="120" x2="80" y2="25" stroke="#DDD7CC" strokeWidth="1" strokeDasharray="3,3" />
          <text x="75" y="132" fill="#666" fontSize="9" fontWeight="bold">n₀ (2)</text>

          {/* c2 * g(n) curve (Upper) */}
          <path d="M 20 105 Q 60 75, 110 40 T 170 15" fill="none" stroke="#3F51B5" strokeWidth="1.5" />
          <text x="150" y="12" fill="#3F51B5" fontSize="13" style={{ fontFamily: "'Caveat', cursive", fontWeight: "bold" }}>c₂ · g(n) (4n)</text>

          {/* f(n) curve (Middle) */}
          <path d="M 20 110 Q 60 85, 110 55 T 170 35" fill="none" stroke="#232323" strokeWidth="1.5" strokeDasharray="1" />
          <text x="158" y="47" fill="#232323" fontSize="13" style={{ fontFamily: "'Caveat', cursive", fontWeight: "bold" }}>f(n) (3n + 2)</text>

          {/* c1 * g(n) curve (Lower) */}
          <path d="M 20 115 Q 60 95, 110 70 T 170 55" fill="none" stroke="#3F51B5" strokeWidth="1.5" />
          <text x="150" y="70" fill="#3F51B5" fontSize="13" style={{ fontFamily: "'Caveat', cursive", fontWeight: "bold" }}>c₁ · g(n) (2n)</text>

          {/* Dynamic position dot indicator */}
          {sliderN >= 0 && (
            <>
              {/* Dot for f(n) */}
              <circle cx={20 + sliderN * 30} cy={110 - sliderN * 15} r="4" fill="#232323" />
              {/* Dot for c2*g(n) */}
              <circle cx={20 + sliderN * 30} cy={105 - sliderN * 20} r="4" fill="#3F51B5" />
              {/* Dot for c1*g(n) */}
              <circle cx={20 + sliderN * 30} cy={115 - sliderN * 10} r="4" fill="#3F51B5" />
            </>
          )}

          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#666" />
            </marker>
          </defs>
        </svg>
      )
    }
  ];

  const currentGraph = graphList.find((g) => g.id === activeTab)!;

  // Crossover checks
  const getCrossoverStatus = () => {
    if (activeTab === "big-o") {
      const active = f_n <= cg_o;
      return {
        active,
        text: active 
          ? `✓ Active! f(n) [${f_n}] ≤ c·g(n) [${cg_o}]. The ceiling bound is successfully holding.`
          : `✗ Not active yet! f(n) [${f_n}] > c·g(n) [${cg_o}]. We are before the threshold n₀.`
      };
    } else if (activeTab === "big-omega") {
      const active = f_n >= cg_omega;
      return {
        active,
        text: active 
          ? `✓ Active! f(n) [${f_n}] ≥ c·g(n) [${cg_omega}]. The floor bound is successfully holding.`
          : `✗ Not active yet! f(n) [${f_n}] < c·g(n) [${cg_omega}]. We are before the threshold n₀.`
      };
    } else {
      const active = cg_omega <= f_n && f_n <= cg_o;
      return {
        active,
        text: active 
          ? `✓ Active! c₁·g(n) [${cg_omega}] ≤ f(n) [${f_n}] ≤ c₂·g(n) [${cg_o}]. f(n) is trapped.`
          : `✗ Not active yet! f(n) is not trapped yet because we are before the threshold n₀.`
      };
    }
  };

  const crossover = getCrossoverStatus();

  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[#DDD7CC]/40 pb-3">
          <div>
            <h4 className="text-xs font-black text-foreground uppercase tracking-wider font-mono">
              Asymptotic Bound Graphs
            </h4>
            <p className="text-[13px] text-muted-foreground" style={{ fontFamily: "'Caveat', cursive" }}>
              Explore how c·g(n) limits or envelopes the execution function f(n) past the threshold n₀.
            </p>
          </div>
          <span className="px-2 py-0.5 bg-[#3F51B5]/5 border border-[#3F51B5]/30 text-[#3F51B5] font-mono text-[9px] uppercase font-bold rounded-sm">
            Whiteboard Mode
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-[#DDD7CC] text-xs font-mono">
          {graphList.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveTab(g.id)}
              className={`px-4 py-2 -mb-px border-t border-l border-r transition-all duration-150 cursor-pointer ${
                activeTab === g.id
                  ? "bg-[#FCFBF8] border-[#DDD7CC] text-[#3F51B5] font-bold"
                  : "bg-transparent border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {g.id === "big-o" ? "O" : g.id === "big-omega" ? "Ω" : "Θ"} Notation
            </button>
          ))}
        </div>

        {/* Dynamic Display Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-4 border border-dashed border-[#DDD7CC]/80 bg-[#F4F1EA]/10 rounded-sm">
          {/* Left Side: Graph SVG */}
          <div className="md:col-span-5 flex items-center justify-center min-h-[150px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="w-full flex justify-center"
              >
                {currentGraph.graphContent}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Info Panel */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2">
              <h5 className="font-serif font-black text-sm text-foreground">
                {currentGraph.title}
              </h5>
              <span className="text-[9px] font-mono font-bold bg-[#3F51B5]/5 border border-[#3F51B5]/20 text-[#3F51B5] px-2 py-0.5 rounded-sm">
                {currentGraph.badge}
              </span>
            </div>

            {/* Formula Block */}
            <div className="p-2 border border-[#DDD7CC] bg-[#FCFBF8] text-xs font-mono font-bold text-center rounded-sm text-[#3F51B5]">
              {currentGraph.mathDef}
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed font-serif">
              {currentGraph.explanation}
            </p>

            <div
              className="text-[13px] text-foreground leading-tight pt-1.5 border-t border-[#DDD7CC]/40"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              <span className="font-bold text-[#3F51B5]">Visual Note: </span>
              Notice how the boundary limits take effect only <span className="font-semibold text-foreground">after passing the vertical n₀ line</span>. Prior to n₀, f(n) can cross the bounds.
            </div>
          </div>
        </div>

        {/* Concrete Numeric Example Sandbox Section */}
        <div className="border border-[#DDD7CC] bg-[#F4F1EA]/25 p-4 rounded-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#DDD7CC]/40 pb-2">
            <h5 className="text-xs font-bold text-foreground font-mono uppercase tracking-wider">
              Let's Make This Graph Concrete! (Interactive Example)
            </h5>
            <span className="text-[11px] text-[#3F51B5] font-bold" style={{ fontFamily: "'Caveat', cursive" }}>
              Prove: f(n) = 3n + 2 is O(n)
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-serif leading-relaxed">
              We define: actual steps <span className="font-mono text-foreground font-bold">f(n) = 3n + 2</span>, benchmark <span className="font-mono text-foreground font-bold">g(n) = n</span>.
              {activeTab === "big-o" && <span> We choose constant <span className="font-bold text-[#3F51B5]">c = 4</span>. Let's see if 3n + 2 ≤ 4n holds as we change problem size n:</span>}
              {activeTab === "big-omega" && <span> We choose constant <span className="font-bold text-[#3F51B5]">c = 2</span>. Let's see if 3n + 2 ≥ 2n holds as we change problem size n:</span>}
              {activeTab === "big-theta" && <span> We choose constants <span className="font-bold text-[#3F51B5]">c₁ = 2</span> and <span className="font-bold text-[#3F51B5]">c₂ = 4</span>. Let's see if 2n ≤ 3n + 2 ≤ 4n holds:</span>}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center bg-[#FCFBF8] p-3 border border-[#DDD7CC] rounded-sm">
            {/* Input Slider Column */}
            <div className="w-full sm:w-[45%] space-y-2">
              <div className="flex justify-between text-xs font-mono font-bold">
                <span>Problem Size (n):</span>
                <span className="text-[#3F51B5] text-sm">{sliderN}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={sliderN}
                onChange={(e) => setSliderN(parseInt(e.target.value, 10))}
                className="w-full accent-[#3F51B5] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-muted-foreground select-none">
                <span>n = 0</span>
                <span>n₀ = 2</span>
                <span>n = 5</span>
              </div>
            </div>

            {/* Calculations Display Column */}
            <div className="w-full sm:w-[55%] flex flex-col justify-center border-t sm:border-t-0 sm:border-l border-[#DDD7CC] pt-3 sm:pt-0 sm:pl-4 space-y-2">
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-muted-foreground">f(n) (3n+2):</span>
                  <div className="font-bold text-foreground">{f_n} steps</div>
                </div>
                {activeTab === "big-o" && (
                  <div>
                    <span className="text-muted-foreground">c·g(n) (4n):</span>
                    <div className="font-bold text-[#3F51B5]">{cg_o} steps</div>
                  </div>
                )}
                {activeTab === "big-omega" && (
                  <div>
                    <span className="text-muted-foreground">c·g(n) (2n):</span>
                    <div className="font-bold text-[#3F51B5]">{cg_omega} steps</div>
                  </div>
                )}
                {activeTab === "big-theta" && (
                  <div>
                    <span className="text-muted-foreground">c₁·g(n) / c₂·g(n):</span>
                    <div className="font-bold text-[#3F51B5]">{cg_omega} / {cg_o}</div>
                  </div>
                )}
              </div>

              {/* Bound Status message */}
              <div className={`p-2 rounded-sm border text-[11px] font-mono ${
                crossover.active 
                  ? "bg-[#2E7D32]/5 border-[#2E7D32]/20 text-[#2E7D32]" 
                  : "bg-[#C0392B]/5 border-[#C0392B]/20 text-[#C0392B]"
              }`}>
                {crossover.text}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
