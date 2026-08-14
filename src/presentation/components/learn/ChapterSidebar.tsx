"use client";

import React, { useState, useEffect } from "react";
import { X, Book } from "lucide-react";
import { SubjectCurriculum } from "@/domain/models/subject";
import ChapterAccordion from "./ChapterAccordion";

interface ChapterSidebarProps {
  curriculum: SubjectCurriculum;
  activeLessonId: string;
  subjectId: string;
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
}

export default function ChapterSidebar({
  curriculum,
  activeLessonId,
  subjectId,
  isOpen,
  onClose,
  isCollapsed = false,
}: ChapterSidebarProps) {
  // Find which chapter has the active lesson on initial load
  const initialChapterId = () => {
    const parent = curriculum.chapters.find((ch) =>
      ch.lessons.some((l) => l.id === activeLessonId)
    );
    return parent ? parent.id : curriculum.chapters[0]?.id || "";
  };

  const [expandedChapterId, setExpandedChapterId] = useState<string>(initialChapterId);

  useEffect(() => {
    const activeCh = curriculum.chapters.find((ch) =>
      ch.lessons.some((l) => l.id === activeLessonId)
    );
    if (activeCh) {
      setExpandedChapterId(activeCh.id);
    }
  }, [activeLessonId, curriculum]);

  const handleToggle = (chapterId: string) => {
    setExpandedChapterId((prev) => (prev === chapterId ? "" : chapterId));
  };

  const sidebarContent = (
    <div className="h-full flex flex-col bg-card select-none">
      {/* Sidebar Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-border/80 shrink-0">
        <div className="flex items-center gap-2 text-foreground">
          <Book className="h-4 w-4 text-secondary-foreground" />
          <span className="text-xs font-extrabold uppercase tracking-widest">Chapters</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-sm border border-border bg-card text-secondary-foreground hover:text-foreground outline-none focus-visible:ring-1 focus-visible:ring-foreground"
          aria-label="Close Chapters Menu"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Accordions List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {curriculum.chapters.map((chapter) => (
          <ChapterAccordion
            key={chapter.id}
            chapter={chapter}
            activeLessonId={activeLessonId}
            isExpanded={expandedChapterId === chapter.id}
            onToggle={() => handleToggle(chapter.id)}
            subjectId={subjectId}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Permanent Sidebar Container */}
      {!isCollapsed && (
        <aside className="hidden lg:block lg:col-start-1 w-full h-full border-r border-border/80 bg-card overflow-hidden">
          {sidebarContent}
        </aside>
      )}

      {/* Mobile/Tablet Side Drawer */}
      <div
        className={`
          lg:hidden fixed inset-0 z-50 transition-opacity duration-300 pointer-events-none
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0"}
        `}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-foreground/20 backdrop-blur-xs transition-opacity duration-300"
          onClick={onClose}
        />
        {/* Sliding Panel */}
        <div
          className={`
            absolute top-0 bottom-0 left-0 w-72 bg-background border-r border-border shadow-md transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {sidebarContent}
        </div>
      </div>
    </>
  );
}
