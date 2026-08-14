"use client";

import React, { useEffect, useRef } from "react";
import { Terminal, ChevronDown, ChevronUp } from "lucide-react";
import { ConsolePanelProps } from "./types";

export default function ConsolePanel({ output, isMaximized, isCollapsed, onToggleCollapse }: ConsolePanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [output]);

  return (
    <div className={`w-full h-full bg-card border border-border/80 p-4 rounded-md select-none flex flex-col shadow-sm justify-between transition-all duration-300 ${isCollapsed ? "py-2.5 px-4 space-y-0" : "space-y-2"}`}>
      {/* Title bar */}
      <div className="flex items-center justify-between select-none shrink-0">
        <div className="flex items-center gap-2">
          {onToggleCollapse && (
            <button 
              onClick={onToggleCollapse}
              className="p-0.5 hover:bg-secondary/20 rounded cursor-pointer transition-colors text-secondary-foreground"
              title={isCollapsed ? "Expand console" : "Collapse console"}
            >
              {isCollapsed ? (
                <ChevronDown className="h-3.5 w-3.5" />
              ) : (
                <ChevronUp className="h-3.5 w-3.5" />
              )}
            </button>
          )}
          <span className="text-[10px] font-bold font-mono text-secondary-foreground uppercase tracking-widest">
            Σ CONSOLE OUTPUT
          </span>
        </div>
        {!isCollapsed && (
          <button
            onClick={() => {}} // mock clear button
            className="text-[10px] font-bold text-secondary-foreground/60 hover:text-foreground font-mono uppercase tracking-widest cursor-pointer transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Console screen box */}
      {!isCollapsed && (
        <div className={`w-full bg-[#1e1e1a] border border-[#2d2d27] rounded-sm flex flex-col justify-center overflow-hidden transition-all duration-300 ${isMaximized ? "h-[85px] p-2" : "h-[50px] lg:h-[42px]"}`}>
          <div
            ref={containerRef}
            className="p-3 overflow-y-auto font-mono text-[11px] md:text-xs text-[#faf8f5] leading-relaxed whitespace-pre-wrap select-text"
          >
            {output ? (
              <div>
                <span className="text-emerald-500/90 mr-1.5 select-none">&gt;</span>
                {output}
                {/* Blinking cursor */}
                <span className="inline-block w-1.5 h-3 bg-neutral-400 ml-0.5 animate-pulse" />
              </div>
            ) : (
              <div className="text-muted-foreground/40 italic flex items-center gap-1.5 select-none">
                <span className="text-muted-foreground/30">&gt;</span>
                <span>[no program output yet]</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
