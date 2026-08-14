"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CodePanelProps } from "./types";

export default function CodePanel({ code, language, currentLine }: CodePanelProps) {
  const lines = code.split("\n");
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeIdx = currentLine - 1;
    const activeEl = lineRefs.current[activeIdx];
    const container = containerRef.current;

    if (activeEl && container) {
      const offsetTop = activeEl.offsetTop;
      const containerHeight = container.clientHeight;
      const elementHeight = activeEl.clientHeight;

      if (containerHeight > 0) {
        const scrollTop = container.scrollTop;
        if (offsetTop < scrollTop) {
          container.scrollTo({ top: offsetTop, behavior: "smooth" });
        } else if (offsetTop + elementHeight > scrollTop + containerHeight) {
          container.scrollTo({
            top: offsetTop - containerHeight + elementHeight,
            behavior: "smooth"
          });
        }
      }
    }
  }, [currentLine]);

  // Simple token highlight colorizer for C++
  const colorizeLine = (lineText: string) => {
    if (lineText.trim().startsWith("//")) {
      return <span className="text-[#1a7f37] italic">{lineText}</span>;
    }

    // Split using keywords, comments, numbers, and strings
    const tokenRegex = /(\/\/.*|"(?:\\.|[^\\"])*"|'[^']*'|<[a-zA-Z0-9_\/.]+>|\b(?:#include|int|double|float|char|void|bool|class|struct|public|private|protected|return|using|namespace|const|if|else|for|while|do|switch|case|break|continue|new|delete)\b|\b\d+\b)/g;
    const parts = lineText.split(tokenRegex);

    return parts.map((part, idx) => {
      if (!part) return null;
      if (part.startsWith("//")) {
        return <span key={idx} className="text-[#1a7f37] italic">{part}</span>;
      }
      if (part.startsWith('"') || part.startsWith("'")) {
        return <span key={idx} className="text-[#cf222e]">{part}</span>;
      }
      if (part.startsWith("<") && part.endsWith(">")) {
        return <span key={idx} className="text-[#0550ae]">{part}</span>;
      }

      const keywords = [
        "#include", "int", "double", "float", "char", "void", "bool",
        "class", "struct", "public", "private", "protected", "return",
        "using", "namespace", "const", "if", "else", "for", "while",
        "do", "switch", "case", "break", "continue", "new", "delete"
      ];

      if (keywords.includes(part)) {
        return (
          <span key={idx} className="text-[#cf222e] font-bold">
            {part}
          </span>
        );
      }

      if (/^\d+$/.test(part)) {
        return (
          <span key={idx} className="text-[#0550ae]">
            {part}
          </span>
        );
      }

      return <span key={idx} className="text-foreground">{part}</span>;
    });
  };

  const [fontSize, setFontSize] = useState<number>(12);

  return (
    <div className="w-full h-full bg-card border border-border/80 rounded-md select-none flex flex-col overflow-hidden shadow-sm">
      {/* Title */}
      <div className="flex items-center justify-between p-3 border-b border-border/40 bg-secondary/5">
        <span className="text-[10px] font-bold text-secondary-foreground uppercase tracking-widest">
          Source Code ({language.toUpperCase()})
        </span>
        <div className="flex items-center gap-2">
          {/* Font Controls */}
          <div className="flex border border-border bg-card shadow-sm text-[9px] font-mono select-none">
            <button
              onClick={() => setFontSize(prev => Math.max(prev - 1, 10))}
              disabled={fontSize <= 10}
              className="px-2 py-0.5 border-r border-border hover:bg-secondary/10 disabled:opacity-30 cursor-pointer font-bold text-foreground"
              title="Decrease Font Size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize(prev => Math.min(prev + 1, 18))}
              disabled={fontSize >= 18}
              className="px-2 py-0.5 hover:bg-secondary/10 disabled:opacity-30 cursor-pointer font-bold text-foreground"
              title="Increase Font Size"
            >
              A+
            </button>
          </div>
          <div className="flex space-x-1.5 shrink-0">
            <span className="w-2 h-2 border border-border bg-amber-500/10 rounded-full" />
            <span className="w-2 h-2 border border-border bg-emerald-500/10 rounded-full" />
            <span className="w-2 h-2 border border-border bg-blue-500/10 rounded-full" />
          </div>
        </div>
      </div>

      {/* Code Editor Container */}
      <div
        ref={containerRef}
        className="flex-grow overflow-y-auto p-4 font-mono leading-relaxed relative bg-card max-h-[180px] lg:max-h-none text-left flex flex-col justify-start items-stretch"
        style={{ fontSize: `${fontSize}px` }}
      >
        {lines.map((line, idx) => {
          const lineNumber = idx + 1;
          const isActive = lineNumber === currentLine;

          return (
            <div
              key={idx}
              ref={(el) => {
                lineRefs.current[idx] = el;
              }}
              className="relative flex items-center py-0.5 px-1 min-h-[24px] text-left justify-start w-full"
            >
              {/* Highlight Background with Framer Motion layoutId */}
              {isActive && (
                <motion.div
                  layoutId="activeLineHighlight"
                  className="absolute inset-0 bg-[#FFF9E6] border-l-[3px] border-amber-600/80 -z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}

              {/* Active Line Pointer Arrow */}
              <div className="w-4 flex items-center justify-center text-amber-600 font-bold text-[10px] z-10 mr-1 select-none">
                {isActive ? "▶" : ""}
              </div>

              {/* Line Number */}
              <div className="w-6 text-right pr-2 text-muted-foreground/45 select-none font-mono text-[10px] md:text-xs z-10 border-r border-border/30 mr-3">
                {lineNumber}
              </div>

              {/* Line Code Content */}
              <div className="flex-1 whitespace-pre z-10 font-medium text-left">
                {colorizeLine(line)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-2 border-t border-border/30 bg-secondary/5 text-right">
        <span className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-wider">
          Currently Executing Line: {currentLine}
        </span>
      </div>
    </div>
  );
}
