"use client";

import React from "react";
import { HelpCircle, Lightbulb } from "lucide-react";

export default function LanguageGapDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      {/* Side-by-side comparison of Robot understanding */}
      <div className="flex flex-col md:flex-row gap-6 w-full items-stretch justify-center max-w-2xl px-2">
        
        {/* Left Card: Human Language (Confused Robot) */}
        <div className="flex-1 border border-border bg-card p-5 flex flex-col justify-between items-center text-center relative min-h-[220px]">
          <div className="space-y-1 w-full">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400">Human Words</h4>
            <p className="text-[11px] text-secondary-foreground font-serif leading-relaxed mt-1">
              If we send English-like instructions directly to the hardware...
            </p>
          </div>

          {/* Diagram: Code -> Confused Robot */}
          <div className="flex items-center justify-center gap-4 w-full my-4">
            {/* English Instruction card */}
            <div className="p-2 border border-border bg-muted text-[10px] font-mono leading-none">
              say "Hello"
            </div>

            {/* Arrow */}
            <span className="text-rose-600 font-bold">→</span>

            {/* Confused Robot */}
            <div className="relative">
              {/* Confused Bubble */}
              <div className="absolute -top-6 -right-2 bg-rose-500/10 border border-rose-600 text-rose-600 w-5 h-5 flex items-center justify-center rounded-none font-bold text-xs">
                ?
              </div>
              <RobotFace color="text-rose-600" confused />
            </div>
          </div>

          <div className="pt-2 border-t border-border/40 text-[10px] text-secondary-foreground font-serif leading-relaxed w-full">
            * The robot has no idea what "say" or "Hello" means. It cannot run this.
          </div>
        </div>

        {/* Right Card: Binary (Understood Robot with Bulb) */}
        <div className="flex-1 border border-border bg-card p-5 flex flex-col justify-between items-center text-center relative min-h-[220px]">
          <div className="space-y-1 w-full">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Binary Signals</h4>
            <p className="text-[11px] text-secondary-foreground font-serif leading-relaxed mt-1">
              If we send raw electrical current signals (ON and OFF)...
            </p>
          </div>

          {/* Diagram: Binary -> Smart Robot */}
          <div className="flex items-center justify-center gap-4 w-full my-4">
            {/* Binary Instruction card */}
            <div className="p-2 border border-border bg-muted text-[10px] font-mono leading-none tracking-wider">
              01101000
            </div>

            {/* Arrow */}
            <span className="text-emerald-600 font-bold">→</span>

            {/* Happy Robot */}
            <div className="relative">
              {/* Glowing Bulb */}
              <div className="absolute -top-6 -right-2 bg-amber-500/10 border border-amber-600 text-amber-600 w-5 h-5 flex items-center justify-center rounded-none font-bold text-xs animate-pulse">
                <Lightbulb className="w-3.5 h-3.5 fill-amber-500/20" />
              </div>
              <RobotFace color="text-emerald-600" />
            </div>
          </div>

          <div className="pt-2 border-t border-border/40 text-[10px] text-secondary-foreground font-serif leading-relaxed w-full">
            * Circuits switch ON and OFF perfectly. The instruction is understood instantly!
          </div>
        </div>

      </div>
    </div>
  );
}

function RobotFace({ color, confused = false }: { color: string; confused?: boolean }) {
  return (
    <div className={`w-12 h-12 flex items-center justify-center border-2 ${color} bg-card relative shadow-sm`}>
      {/* Robot Face details in vector SVG */}
      <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Antenna */}
        <line x1="20" y1="10" x2="20" y2="2" />
        <circle cx="20" cy="2" r="1.5" fill="currentColor" />
        {/* Eyes */}
        <circle cx="14" cy="18" r="2" fill="currentColor" />
        <circle cx="26" cy="18" r="2" fill="currentColor" />
        {/* Mouth */}
        {confused ? (
          // Squiggly mouth
          <path d="M 12 28 Q 16 24 20 28 T 28 28" />
        ) : (
          // Happy mouth
          <path d="M 13 26 Q 20 32 27 26" />
        )}
      </svg>
    </div>
  );
}
