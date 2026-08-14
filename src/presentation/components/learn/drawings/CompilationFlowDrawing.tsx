"use client";

import React from "react";

export default function CompilationFlowDrawing() {
  return (
    <div className="w-full my-6 select-none">
      {/* Desktop Layout: Horizontal Row (5x1) */}
      <div className="hidden sm:flex items-center justify-between w-full gap-1">
        <StepBox index="1" title="Clean Up" subtitle="Collects code files" />
        <Arrow />
        <StepBox index="2" title="Translate" subtitle="Turns C++ to CPU commands" />
        <Arrow />
        <StepBox index="3" title="Machine Code" subtitle="Converts to binary 0/1" />
        <Arrow />
        <StepBox index="4" title="Link" subtitle="Glues parts into one file" />
        <Arrow />
        <StepBox index="5" title="Run" subtitle="main.exe is ready!" highlight />
      </div>

      {/* Mobile Layout: Responsive Row Wrap (no scrollbars) */}
      <div className="flex sm:hidden flex-col gap-3 w-full">
        {/* Row 1: Steps 1 to 3 */}
        <div className="grid grid-cols-5 items-center gap-0.5 w-full">
          <StepBox index="1" title="Clean Up" subtitle="Gathers code files" />
          <Arrow />
          <StepBox index="2" title="Translate" subtitle="To CPU commands" />
          <Arrow />
          <StepBox index="3" title="Machine Code" subtitle="Converts to 0s & 1s" />
        </div>

        {/* Row 2: Steps 4 and 5 */}
        <div className="grid grid-cols-5 items-center gap-0.5 w-full">
          <StepBox index="4" title="Link" subtitle="Glues into one file" />
          <Arrow opacity="opacity-0 pointer-events-none" /> {/* Empty spacer arrow to align Grid */}
          <div className="flex-1" /> {/* Empty grid slot */}
          <Arrow />
          <StepBox index="5" title="Run" subtitle="main.exe is ready!" highlight />
        </div>
      </div>
    </div>
  );
}

function StepBox({ 
  index, 
  title, 
  subtitle, 
  highlight = false 
}: { 
  index: string; 
  title: string; 
  subtitle: string; 
  highlight?: boolean; 
}) {
  return (
    <div 
      className={`flex-1 min-w-0 flex flex-col justify-center items-center text-center p-1 py-2 border ${
        highlight 
          ? "border-accent bg-accent/10 text-accent-foreground" 
          : "border-border bg-card text-foreground"
      }`}
    >
      <h4 className="text-[9px] md:text-[10px] font-bold font-serif leading-tight">{index}. {title}</h4>
      <p className="text-secondary-foreground leading-none mt-1" style={{ fontFamily: "'Caveat', cursive", fontSize: "11px" }}>
        {subtitle}
      </p>
    </div>
  );
}

function Arrow({ opacity = "" }: { opacity?: string }) {
  return (
    <div className={`flex items-center justify-center shrink-0 w-3 md:w-5 ${opacity}`}>
      <span className="text-secondary-foreground/40 text-[10px] font-bold font-serif">→</span>
    </div>
  );
}
