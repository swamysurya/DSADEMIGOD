"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SubjectCurriculum } from "@/domain/models/subject";

interface PreviousNextNavigationProps {
  prevLessonId: string | null;
  nextLessonId: string | null;
  subjectId: string;
  curriculum: SubjectCurriculum;
}

export default function PreviousNextNavigation({
  prevLessonId,
  nextLessonId,
  subjectId,
  curriculum,
}: PreviousNextNavigationProps) {
  // Resolve lesson title
  const getLessonTitle = (lessonId: string | null): string => {
    if (!lessonId) return "";
    for (const chapter of curriculum.chapters) {
      const found = chapter.lessons.find((l) => l.id === lessonId);
      if (found) return found.title;
    }
    return "";
  };

  const prevTitle = getLessonTitle(prevLessonId);
  const nextTitle = getLessonTitle(nextLessonId);

  return (
    <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-border/80 select-none">
      {/* Previous Lesson Button */}
      {prevLessonId ? (
        <Link
          href={`/learn/${subjectId}/${prevLessonId}`}
          className="group flex flex-col items-start gap-1 p-4 border border-border/80 bg-card/40 hover:border-foreground/80 hover:bg-secondary/15 transition-all outline-none focus-visible:ring-1 focus-visible:ring-foreground rounded-sm"
        >
          <span className="flex items-center gap-1.5 text-[9px] font-bold text-secondary-foreground uppercase tracking-widest">
            <ArrowLeft className="h-3 w-3 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Previous Chapter
          </span>
          <span className="text-sm font-bold text-foreground group-hover:underline">
            {prevTitle || "Go Back"}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {/* Next Lesson Button */}
      {nextLessonId ? (
        <Link
          href={`/learn/${subjectId}/${nextLessonId}`}
          className="group flex flex-col items-end gap-1 p-4 border border-border/80 bg-card/40 hover:border-foreground/80 hover:bg-secondary/15 transition-all text-right outline-none focus-visible:ring-1 focus-visible:ring-foreground rounded-sm"
        >
          <span className="flex items-center gap-1.5 text-[9px] font-bold text-secondary-foreground uppercase tracking-widest">
            Next Chapter
            <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
          <span className="text-sm font-bold text-foreground group-hover:underline">
            {nextTitle || "Continue"}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
    </nav>
  );
}
