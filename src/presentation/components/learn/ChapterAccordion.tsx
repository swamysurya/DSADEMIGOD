"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
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
    <div className="border-b border-border/80">
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
          w-full py-3 px-4 flex items-center justify-between gap-2 select-none cursor-pointer outline-none
          hover:bg-secondary/20 transition-colors
          ${isExpanded ? "bg-secondary/30" : ""}
          focus-visible:ring-1 focus-visible:ring-foreground
        `}
      >
        <span className="text-xs font-extrabold uppercase tracking-wider text-foreground">
          {chapter.title}
        </span>
        <ChevronRight
          className={`
            h-4 w-4 text-secondary-foreground/60 transition-transform duration-200
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
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden bg-card/30"
          >
            <ul className="py-1.5 space-y-0.5" role="list">
              {chapter.lessons.map((lesson) => {
                const isActive = lesson.id === activeLessonId;
                return (
                  <li key={lesson.id} role="listitem">
                    <Link
                      href={`/learn/${subjectId}/${lesson.id}`}
                      className={`
                        w-full flex items-center justify-between gap-3 py-2 pl-7 pr-4 text-xs font-semibold
                        transition-all duration-150 outline-none
                        ${isActive
                          ? "bg-accent/40 text-foreground border-l-2 border-foreground"
                          : "text-secondary-foreground hover:text-foreground hover:bg-secondary/15"}
                        focus-visible:ring-1 focus-visible:ring-foreground/50
                      `}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-foreground" : "text-secondary-foreground/60"}`} />
                        <span className="truncate">{lesson.title}</span>
                      </div>
                      <span className="text-[10px] text-secondary-foreground/50 tabular-nums shrink-0 font-medium">
                        {lesson.estimatedTime}
                      </span>
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
