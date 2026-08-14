"use client";

import React, { useState, useEffect } from "react";
import { SimulationEngineProps } from "./types";
import { MemoryVariable } from "@/domain/models/lesson";
import SimulationToolbar from "./SimulationToolbar";
import CodePanel from "./CodePanel";
import MemoryPanel from "./MemoryPanel";
import StepExplanationPanel from "./StepExplanationPanel";
import ConsolePanel from "./ConsolePanel";
import { Settings } from "lucide-react";

export default function SimulationEngine({ data }: SimulationEngineProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showAddress, setShowAddress] = useState<boolean>(false);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [isConsoleCollapsed, setIsConsoleCollapsed] = useState<boolean>(false);
  const [isExplanationCollapsed, setIsExplanationCollapsed] = useState<boolean>(false);

  // Listen for Escape key to exit Focus Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMaximized) {
        setIsMaximized(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMaximized]);

  const steps = data.steps;
  const activeStep = steps[currentStep];
  const prevStep = currentStep > 0 ? steps[currentStep - 1] : null;

  // Accumulate all variables defined from step 0 to the current step, keeping the latest value
  const accumulatedVariables: MemoryVariable[] = [];
  const varMap: Record<string, MemoryVariable> = {};
  const discoveredNames: string[] = [];

  for (let s = 0; s <= currentStep; s++) {
    steps[s].variables.forEach((v) => {
      varMap[v.name] = v;
      if (!discoveredNames.includes(v.name)) {
        discoveredNames.push(v.name);
      }
    });
  }

  discoveredNames.forEach((name) => {
    if (varMap[name]) {
      accumulatedVariables.push(varMap[name]);
    }
  });

  // Calculate which variables changed in this step
  const changedVariables = activeStep.variables
    .filter((v) => {
      if (!prevStep) return true;
      const prevVar = prevStep.variables.find((pv) => pv.name === v.name);
      return !prevVar || prevVar.value !== v.value;
    })
    .map((v) => v.name);

  // Auto-run simulation step player
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsRunning(false);
            return prev;
          }
        });
      }, 2500); // Friendly step interval of 2.5 seconds for reading
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, steps.length]);

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleRunToggle = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      // If we are at the end, loop back to the beginning to run again
      if (currentStep === steps.length - 1) {
        setCurrentStep(0);
      }
      setIsRunning(true);
    }
  };

  return (
    <div className="w-full my-4 select-none flex flex-col items-center">
      {isMaximized ? (
        <>
          {/* Backdrop overlay (only visible when maximized) */}
          <div 
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm cursor-zoom-out"
            onClick={() => setIsMaximized(false)}
          />

          {/* Maximized Modal Container */}
          <div 
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] lg:w-[80vw] lg:max-w-none h-[calc(100vh-2rem)] lg:h-[85vh] border border-border bg-card shadow-2xl rounded-lg p-4 md:p-6 flex flex-col gap-4 overflow-hidden"
          >
            {/* 1. Simulation Toolbar (Title + Controls + Address Toggle) */}
            <SimulationToolbar
              currentStep={currentStep}
              totalSteps={steps.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onRunToggle={handleRunToggle}
              isRunning={isRunning}
              showAddress={showAddress}
              onAddressToggle={() => setShowAddress((prev) => !prev)}
              isMaximized={isMaximized}
              onMaximizeToggle={() => setIsMaximized((prev) => !prev)}
            />

            {/* 2. Main Simulation Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch flex-1 min-h-0">
              {/* Left Column: C++ Code */}
              <div className="lg:col-span-5 xl:col-span-4 flex flex-col h-full min-h-0">
                <CodePanel
                  code={data.code}
                  language={data.language}
                  currentLine={activeStep.line}
                />
              </div>

              {/* Right Column: Memory, Explanation, Console */}
              <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between gap-4 h-full min-h-0">
                {/* Top Row: Memory & Explanation (Flexbox to handle horizontal collapse smoothly) */}
                <div className="flex flex-col sm:flex-row gap-4 items-stretch w-full flex-1 min-h-0">
                  {/* Memory (grows when explanation is collapsed) */}
                  <div className={`flex flex-col transition-all duration-300 min-w-0 ${
                    isExplanationCollapsed 
                      ? "flex-grow flex-1" 
                      : "sm:w-[60%] min-h-0 h-full"
                  }`}>
                    <MemoryPanel
                      visualizer={data.visualizer}
                      variables={accumulatedVariables}
                      showAddress={showAddress}
                      changedVariables={changedVariables}
                    />
                  </div>

                  {/* Teacher Explanation */}
                  <div className={`flex flex-col transition-all duration-300 ${
                    isExplanationCollapsed 
                      ? "w-full sm:w-[42px] shrink-0 h-[48px] sm:h-full" 
                      : "sm:w-[40%] flex-1 min-h-0 h-full"
                  }`}>
                    <StepExplanationPanel
                      explanation={activeStep.explanation}
                      currentStep={currentStep}
                      totalSteps={steps.length}
                      isCollapsed={isExplanationCollapsed}
                      onToggleCollapse={() => setIsExplanationCollapsed((prev) => !prev)}
                    />
                  </div>
                </div>

                {/* Bottom Row: Console */}
                <div className={`w-full transition-all duration-300 ${isConsoleCollapsed ? "h-[45px] shrink-0" : "h-[140px] shrink-0"}`}>
                  <ConsolePanel 
                    output={activeStep.terminalOutput || ""} 
                    isMaximized={isMaximized} 
                    isCollapsed={isConsoleCollapsed}
                    onToggleCollapse={() => setIsConsoleCollapsed((prev) => !prev)}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Inline Preview State */
        <div className="w-full border border-border bg-card p-4 md:p-5 rounded-md shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/30">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-6 items-stretch">
            {/* Left Column: C++ Source Code (Fully visible and readable) */}
            <div className="md:col-span-6 flex flex-col h-[220px] min-h-0">
              <CodePanel
                code={data.code}
                language={data.language}
                currentLine={1}
              />
            </div>

            {/* Right Column: Engine description & launch trigger */}
            <div className="md:col-span-4 flex flex-col justify-between h-[220px] bg-secondary/5 rounded border border-border/40 p-4 text-center">
              <div className="flex flex-col items-center">
                {/* Center Dual Spinning Gears (Opposite directions, touching teeth) */}
                <div className="flex items-center justify-center mb-3">
                  <div className="relative flex items-center justify-center w-8 h-8">
                    <Settings className="w-7 h-7 text-primary animate-[spin_6s_linear_infinite]" />
                  </div>
                  <div className="relative flex items-center justify-center w-5 h-5 -mt-3.5 -ml-1.5">
                    <Settings className="w-4.5 h-4.5 text-primary/75 animate-[spin_4s_linear_infinite_reverse]" />
                  </div>
                </div>

                <h5 className="font-serif font-black text-xs md:text-sm text-foreground uppercase tracking-wider mb-2">
                  Simulation Engine
                </h5>
                <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed font-serif max-w-[240px]">
                  This interactive tool lets you step through C++ execution line-by-line. 
                  You can inspect how variables change in RAM and watch live console outputs as the computer runs each line.
                </p>
              </div>

              <div>
                <button
                  onClick={() => setIsMaximized(true)}
                  className="group/btn flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-primary text-primary-foreground font-mono text-[11px] uppercase tracking-wider font-bold shadow hover:bg-primary/95 transition-all outline-none focus-visible:ring-1 focus-visible:ring-primary cursor-pointer rounded-sm"
                >
                  <span>Launch Simulator</span>
                  <span className="text-[9px] transition-transform duration-200 group-hover/btn:translate-x-0.5">▶</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

