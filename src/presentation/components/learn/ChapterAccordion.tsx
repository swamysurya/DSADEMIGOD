"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Chapter } from "@/domain/models/subject";

interface ChapterAccordionProps {
  chapter: Chapter;
  activeLessonId: string;
  isExpanded: boolean;
  onToggle: () => void;
  subjectId: string;
}

export default function ChapterAccordion({
  chapter,
  activeLessonId,
  isExpanded,
  onToggle,
  subjectId,
}: ChapterAccordionProps) {
  const panelId = `chapter-panel-${chapter.id}`;
  const headerId = `chapter-header-${chapter.id}`;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div className={`border border-border/80 bg-card rounded-none transition-all duration-200 ${isExpanded ? "border-foreground shadow-sm animate-fade-in" : "hover:border-foreground/45"}`}>
      {/* Chapter Trigger Header */}
      <div
        id={headerId}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        className={`
          w-full py-3.5 px-5 flex items-center justify-between gap-3 select-none cursor-pointer outline-none
          hover:bg-secondary/15 transition-colors
          ${isExpanded ? "bg-secondary/25 border-b border-border/40" : ""}
          focus-visible:ring-1 focus-visible:ring-foreground
        `}
      >
        <span className="text-[11px] font-bold uppercase tracking-wider text-foreground">
          {chapter.title}
        </span>
        <ChevronRight
          className={`
            h-3.5 w-3.5 text-secondary-foreground/60 transition-transform duration-200
            ${isExpanded ? "rotate-90 text-foreground" : ""}
          `}
        />
      </div>

      {/* Chapter Lessons List */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden bg-background"
          >
            <ul className="py-2 space-y-1 relative" role="list">
              {/* Vertical timeline guide line in the background */}
              <div className="absolute left-[24px] top-0 bottom-0 w-px bg-border/50" />

              {chapter.lessons.map((lesson) => {
                const isActive = lesson.id === activeLessonId;
                return (
                  <li key={lesson.id} role="listitem">
                    <Link
                      href={`/learn/${subjectId}/${lesson.id}`}
                      className={`
                        w-full flex items-center gap-3 py-2 pl-8 pr-4 text-xs font-serif
                        transition-all duration-150 outline-none relative group
                        ${isActive
                          ? "text-foreground font-bold"
                          : "text-secondary-foreground hover:text-foreground hover:underline"}
                        focus-visible:ring-1 focus-visible:ring-foreground/50
                      `}
                    >
                      {/* Interactive indicator dot linking to the vertical rule line */}
                      <span
                        className={`
                          absolute left-[21px] w-1.5 h-1.5 rounded-full border border-border bg-background transition-all duration-150 z-10
                          ${isActive ? "bg-foreground scale-110 border-foreground" : "group-hover:bg-foreground/50"}
                        `}
                      />

                      {/* Lesson title */}
                      <span className="truncate pl-3">{lesson.title}</span>

                      {/* Soft highlight bar behind the text when active */}
                      {isActive && (
                        <span className="absolute inset-y-0.5 left-0 right-0 bg-accent/30 -z-10" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
