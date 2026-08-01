"use client";

import React, { useState, useMemo } from "react";
import { Sparkles, Compass, Award } from "lucide-react";
import { LearningLevel } from "@/domain/models/roadmap";
import roadmapData from "@/infrastructure/data/roadmap.json";
import LearningLevelAccordion from "./LearningLevelAccordion";

export default function LearningRoadmapPage() {
  const levels = roadmapData as LearningLevel[];

  // Find the first unfinished level to expand by default
  const initialOpenLevel = useMemo(() => {
    const firstUnfinished = levels.find((l) => l.progress > 0 && l.progress < 100);
    return firstUnfinished ? firstUnfinished.id : levels[0]?.id || "";
  }, [levels]);

  const [expandedLevelId, setExpandedLevelId] = useState<string>(initialOpenLevel);

  const handleToggle = (id: string) => {
    setExpandedLevelId((prev) => (prev === id ? "" : id));
  };

  // Calculate overall statistics
  const overallStats = useMemo(() => {
    if (levels.length === 0) return { averageProgress: 0, completedCount: 0 };
    const total = levels.reduce((acc, current) => acc + current.progress, 0);
    const completed = levels.filter((l) => l.progress === 100).length;
    return {
      averageProgress: Math.round(total / levels.length),
      completedCount: completed,
    };
  }, [levels]);

  return (
    <div className="min-h-screen bg-background relative selection:bg-accent pb-24">

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-12">
        {/* Textbook-style Header Banner */}
        <header className="space-y-6 pb-8 border-b border-foreground/30 relative">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1 text-[10px] font-bold text-secondary-foreground uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5" />
              Syllabus & Curriculum
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-serif">
              Data Structures & Algorithms
            </h1>
            <p className="text-sm font-semibold tracking-wider uppercase text-secondary-foreground">
              A Complete Interactive Journey
            </p>
          </div>

          <div className="text-sm md:text-base text-foreground/80 leading-relaxed max-w-2xl font-serif italic">
            "Before entering the visual chapters, configure your path. This roadmap outlines the incremental study modules from first-principles fundamentals to legendary hardware optimizations."
          </div>

          {/* Mini Index Card for Statistics */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-border/80 bg-card rounded-sm">
            <div className="flex items-center gap-2.5 text-xs text-secondary-foreground font-semibold">
              <Compass className="h-4 w-4 text-secondary-foreground/80" />
              <span>
                Roadmap Progress: <span className="text-foreground font-bold tabular-nums">{overallStats.averageProgress}% read</span>
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-secondary-foreground font-semibold">
              <Award className="h-4 w-4 text-secondary-foreground/80" />
              <span>
                Completed: <span className="text-foreground font-bold">{overallStats.completedCount} of {levels.length} levels</span>
              </span>
            </div>
          </div>
        </header>

        {/* Section: Accordion Levels list */}
        <section className="space-y-4" aria-label="Roadmap Course Chapters">
          {levels.map((level, idx) => (
            <LearningLevelAccordion
              key={level.id}
              level={level}
              index={idx}
              isExpanded={expandedLevelId === level.id}
              onToggle={() => handleToggle(level.id)}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
