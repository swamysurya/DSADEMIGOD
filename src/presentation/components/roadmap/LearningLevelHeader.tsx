"use client";

import React from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import { LearningLevel } from "@/domain/models/roadmap";

interface LearningLevelHeaderProps {
  level: LearningLevel;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  headerId: string;
  panelId: string;
}

export default function LearningLevelHeader({
  level,
  index,
  isExpanded,
  onToggle,
  headerId,
  panelId,
}: LearningLevelHeaderProps) {
  // Pastel highlighter badge colors
  const difficultyStyles = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-blue-100/60 text-blue-800 border-blue-200/80";
      case "Easy":
        return "bg-emerald-100/60 text-emerald-800 border-emerald-200/80";
      case "Medium":
        return "bg-amber-100/60 text-amber-800 border-amber-200/80";
      case "Hard":
        return "bg-rose-100/60 text-rose-800 border-rose-200/80";
      case "Legendary":
        return "bg-purple-100/60 text-purple-800 border-purple-200/80";
      default:
        return "bg-secondary text-secondary-foreground border-border";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <div
      id={headerId}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-controls={panelId}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      className={`
        w-full flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:py-6 md:px-8
        transition-colors duration-250 select-none cursor-pointer outline-none
        border-b border-border/80 hover:bg-secondary/20 group
        ${isExpanded ? "bg-secondary/35" : "bg-card"}
        focus-visible:ring-1 focus-visible:ring-foreground
      `}
    >
      {/* Left Column: Number flag, Title, and Description */}
      <div className="flex items-start gap-4 min-w-0 flex-1">
        <div className="text-lg font-bold tracking-wider text-secondary-foreground/40 select-none tabular-nums pt-0.5">
          {formattedIndex}
        </div>
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-base md:text-lg font-bold text-foreground tracking-tight">
              {level.title}
            </h2>
            <span
              className={`text-[9px] font-bold px-2 py-0.5 border tracking-wider uppercase shrink-0 rounded-sm ${difficultyStyles(
                level.difficulty
              )}`}
            >
              {level.difficulty}
            </span>
          </div>
          <p className="text-xs md:text-sm text-secondary-foreground line-clamp-2 md:line-clamp-1 leading-relaxed">
            {level.shortDescription}
          </p>
        </div>
      </div>

      {/* Right Column: Status and Toggle */}
      <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 pt-2 md:pt-0 border-t border-border/40 md:border-t-0">
        <div className="flex items-center gap-2 text-xs font-semibold text-secondary-foreground">
          {level.progress === 100 ? (
            <div className="flex items-center gap-1.5 text-emerald-800">
              <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
              <span className="font-bold uppercase tracking-wider text-[10px]">Complete</span>
            </div>
          ) : level.progress > 0 ? (
            <div className="flex items-center gap-1.5 text-foreground">
              <span className="h-3 w-3 rounded-full border border-foreground/60 bg-accent shrink-0" />
              <span className="tabular-nums font-bold text-[10px] uppercase tracking-wider">{level.progress}% Read</span>
            </div>
          ) : (
            <span className="text-secondary-foreground/60 font-semibold uppercase tracking-wider text-[10px]">
              Not Read
            </span>
          )}
        </div>

        <ChevronDown
          className={`
            h-4.5 w-4.5 text-secondary-foreground transition-transform duration-250 shrink-0
            group-hover:text-foreground
            ${isExpanded ? "rotate-180 text-foreground" : ""}
          `}
        />
      </div>
    </div>
  );
}
