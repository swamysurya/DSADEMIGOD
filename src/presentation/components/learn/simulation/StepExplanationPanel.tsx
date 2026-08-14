import React from "react";
import { Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";
import { StepExplanationPanelProps } from "./types";

export default function StepExplanationPanel({
  explanation,
  currentStep,
  totalSteps,
  isCollapsed,
  onToggleCollapse
}: StepExplanationPanelProps) {
  if (isCollapsed) {
    return (
      <div className="w-full h-full bg-card border border-border/80 py-4 px-1 rounded-md select-none relative flex flex-col items-center justify-start gap-3.5 shadow-sm transition-all duration-300">
        {/* Expand Trigger Button (points Left to expand) */}
        {onToggleCollapse && (
          <button 
            onClick={onToggleCollapse}
            className="p-1 hover:bg-secondary/20 rounded cursor-pointer transition-colors text-secondary-foreground shrink-0"
            title="Expand explanation"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        {/* Lightbulb Icon */}
        <Lightbulb className="h-4 w-4 text-amber-500 stroke-[2] shrink-0 mt-1" />

        {/* Rotated Vertical Title */}
        <div 
          className="font-mono text-[9px] font-bold uppercase tracking-widest text-secondary-foreground select-none flex-1 mt-4 whitespace-nowrap"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          STEP EXPLANATION
        </div>

        {/* Small step indicator badge vertically oriented */}
        <div className="text-[8px] font-black font-mono px-1 py-1 border border-border/60 bg-secondary/30 text-secondary-foreground rounded shrink-0">
          S{currentStep + 1}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-card border border-border/80 p-4 rounded-md select-none relative flex flex-col shadow-sm transition-all duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-border/40 mb-3 shrink-0">
        <div className="flex items-center gap-2 text-foreground font-medium">
          {onToggleCollapse && (
            <button 
              onClick={onToggleCollapse}
              className="p-0.5 hover:bg-secondary/20 rounded cursor-pointer transition-colors text-secondary-foreground"
              title="Collapse to right border"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
          <Lightbulb className="h-4.5 w-4.5 text-amber-500 stroke-[2]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-secondary-foreground font-mono">
            STEP EXPLANATION
          </span>
        </div>
        <span className="font-mono text-[9px] font-bold px-2 py-0.5 border border-border/60 bg-secondary/30 text-secondary-foreground rounded-sm">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>

      {/* Explanation Text */}
      <p className="text-xs md:text-sm leading-relaxed text-foreground font-serif whitespace-pre-line flex-1 overflow-y-auto pr-1">
        {explanation}
      </p>

      {/* Bottom handwritten feel prompt */}
      <div
        className="mt-2 text-[12px] text-muted-foreground/80 font-medium italic text-right select-none shrink-0"
        style={{ fontFamily: "'Caveat', cursive" }}
      >
        * Press "Next" or "Run" to see the execution step forward.
      </div>
    </div>
  );
}
