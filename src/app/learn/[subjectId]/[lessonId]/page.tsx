"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Book } from "lucide-react";
import Link from "next/link";

// Static JSON database imports
import curriculumData from "@/infrastructure/data/curriculum.json";
import SubjectLayout from "@/presentation/components/learn/SubjectLayout";
import ReadingContainer from "@/presentation/components/learn/ReadingContainer";
import LessonRenderer from "@/presentation/components/learn/LessonRenderer";
import PreviousNextNavigation from "@/presentation/components/learn/PreviousNextNavigation";
import { SubjectCurriculum } from "@/domain/models/subject";
import { Lesson } from "@/domain/models/lesson";

// Local static registry of lesson pages
const lessonsRegistry: Record<string, any> = {
  "fundamentals/intro-to-programming": require("@/infrastructure/data/lessons/fundamentals/intro-to-programming.json"),
  "fundamentals/variables": require("@/infrastructure/data/lessons/fundamentals/variables.json"),
  "fundamentals/data-types": require("@/infrastructure/data/lessons/fundamentals/data-types.json"),
  "fundamentals/functions": require("@/infrastructure/data/lessons/fundamentals/functions.json"),
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();

  const subjectId = (params?.subjectId as string) || "";
  const lessonId = (params?.lessonId as string) || "";

  // 1. Resolve active curriculum
  const curriculum = useMemo(() => {
    return (curriculumData as SubjectCurriculum[]).find((c) => c.id === subjectId) || null;
  }, [subjectId]);

  // 2. Resolve active lesson content
  const lesson = useMemo((): Lesson | null => {
    const key = `${subjectId}/${lessonId}`;
    return lessonsRegistry[key] || null;
  }, [subjectId, lessonId]);

  // 3. Filter headings dynamically for the scrollspy TOC
  const headings = useMemo(() => {
    if (!lesson) return [];
    return lesson.content.filter((block) => block.type === "heading");
  }, [lesson]);

  if (!curriculum || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6 select-none font-serif">
        <div className="text-center space-y-4 max-w-sm">
          <Book className="h-8 w-8 text-secondary-foreground mx-auto" />
          <h2 className="text-lg font-bold text-foreground">Chapter Not Found</h2>
          <p className="text-xs text-secondary-foreground leading-relaxed">
            The requested course module could not be retrieved from the textbook index.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-foreground text-foreground font-bold text-xs uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors outline-none focus-visible:ring-1 focus-visible:ring-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Roadmap</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <SubjectLayout
      curriculum={curriculum}
      activeLessonId={lessonId}
      subjectId={subjectId}
      headings={headings}
    >
      <ReadingContainer>
        {/* Lesson Header Block */}
        <header className="space-y-2 pb-6 border-b border-border/80">
          <div className="text-[10px] font-bold text-secondary-foreground uppercase tracking-widest">
            Curriculum Lesson
          </div>
          <h1 className="text-2xl md:text-3xl font-black font-serif text-foreground tracking-tight leading-tight">
            {lesson.title}
          </h1>
        </header>

        {/* Lesson Content Blocks Renderer */}
        <LessonRenderer content={lesson.content} />

        {/* Previous / Next Lesson Links */}
        <PreviousNextNavigation
          prevLessonId={lesson.prevLessonId}
          nextLessonId={lesson.nextLessonId}
          subjectId={subjectId}
          curriculum={curriculum}
        />
      </ReadingContainer>
    </SubjectLayout>
  );
}
