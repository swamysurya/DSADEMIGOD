"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Play, Square, Maximize2, Minimize2 } from "lucide-react";
import { SimulationToolbarProps } from "./types";
import MemoryAddressToggle from "./MemoryAddressToggle";

export default function SimulationToolbar({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onRunToggle,
  isRunning,
  showAddress,
  onAddressToggle,
  isMaximized,
  onMaximizeToggle
}: SimulationToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border/60 mb-6 select-none">
      {/* Title / Header */}
      <div className="space-y-0.5">
        <span className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest">
          Execution Flow
        </span>
        <h4 className="text-sm md:text-base font-black font-serif text-foreground uppercase tracking-tight">
          Code Simulation Engine
        </h4>
      </div>

      {/* Controls & Toggle */}
      <div className="flex flex-wrap items-center gap-4 sm:justify-end">
        <MemoryAddressToggle
          showAddress={showAddress}
          onToggle={onAddressToggle}
        />

        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={onPrevious}
            disabled={currentStep === 0 || isRunning}
            className="inline-flex items-center gap-1 px-3 py-1.5 border border-border text-foreground font-mono text-xs uppercase tracking-wider font-bold transition-all hover:bg-secondary/40 active:bg-secondary disabled:opacity-40 disabled:hover:bg-transparent outline-none focus-visible:ring-1 focus-visible:ring-primary"
            title="Go to previous step"
          >
            <ChevronLeft className="h-3 w-3" />
            <span>Previous</span>
          </button>

          {/* Next Button */}
          <button
            onClick={onNext}
            disabled={currentStep === totalSteps - 1 || isRunning}
            className="inline-flex items-center gap-1 px-3 py-1.5 border border-border text-foreground font-mono text-xs uppercase tracking-wider font-bold transition-all hover:bg-secondary/40 active:bg-secondary disabled:opacity-40 disabled:hover:bg-transparent outline-none focus-visible:ring-1 focus-visible:ring-primary"
            title="Go to next step"
          >
            <span>Next</span>
            <ChevronRight className="h-3 w-3" />
          </button>

          {/* Run / Play Button */}
          <button
            onClick={onRunToggle}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 border font-mono text-xs uppercase tracking-wider font-bold transition-all outline-none focus-visible:ring-1 focus-visible:ring-primary ${isRunning
                ? "bg-[#FFF9E6] border-amber-600/60 text-amber-800 hover:bg-[#FFF9E6]/85"
                : "border-primary text-foreground hover:bg-secondary/40 active:bg-secondary"
              }`}
            title={isRunning ? "Pause simulation" : "Run simulation from current step"}
          >
            {isRunning ? (
              <>
                <Square className="h-3 w-3 fill-amber-700 stroke-amber-700 animate-pulse" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3 fill-foreground" />
                <span>Run</span>
              </>
            )}
          </button>

          {/* Maximize / Focus Mode Toggle Button */}
          <button
            onClick={onMaximizeToggle}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border text-foreground font-mono text-xs uppercase tracking-wider font-bold transition-all hover:bg-secondary/40 active:bg-secondary outline-none focus-visible:ring-1 focus-visible:ring-primary cursor-pointer rounded-sm"
            title={isMaximized ? "Exit focus mode" : "Expand to focus mode"}
          >
            {isMaximized ? (
              <>
                <Minimize2 className="h-3.5 w-3.5" />
                <span>Minimize</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-3.5 w-3.5" />
                <span>Focus</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
