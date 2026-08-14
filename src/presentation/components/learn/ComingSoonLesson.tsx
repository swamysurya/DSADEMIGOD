"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";

interface ComingSoonLessonProps {
  lessonTitle: string;
  estimatedTime?: string;
}

export default function ComingSoonLesson({ lessonTitle, estimatedTime }: ComingSoonLessonProps) {
  return (
    <div className="py-12 px-4 md:px-8 font-serif select-none max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Lesson Sub-Header */}
      <div className="space-y-2 pb-6 border-b border-border/80">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-secondary-foreground uppercase tracking-widest">
            Curriculum Lesson
          </span>
          {estimatedTime && (
            <span className="text-[10px] font-mono text-muted-foreground/60 italic">
              Estimated: {estimatedTime}
            </span>
          )}
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight leading-tight">
          {lessonTitle}
        </h1>
      </div>

      {/* Main Body */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-secondary-foreground">
            Status
          </h2>
          <p className="text-sm md:text-base text-foreground/90 leading-relaxed font-serif">
            This lesson is currently under construction. Our content authors are writing the text, preparing step-by-step dry runs, and building interactive simulators for this topic.
          </p>
        </div>

        {/* Teacher's Handwritten Note */}
        <div className="p-6 border border-amber-200/80 bg-amber-50/15 rounded-sm space-y-3">
          <div className="flex items-center gap-1.5 text-amber-800/90 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Note from the Instructor</span>
          </div>
          <p className="text-lg leading-relaxed text-amber-900/90 font-normal" style={{ fontFamily: "'Caveat', cursive" }}>
            "We are preparing visual diagrams, code compilation examples, and memory layouts for this lesson. We want this chapter to feel just as intuitive and interactive as the variables and functions lessons in the fundamentals. Stay tuned!"
          </p>
        </div>

        {/* Back navigation */}
        <div className="pt-4 flex justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-foreground text-foreground font-bold text-xs uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors outline-none focus-visible:ring-1 focus-visible:ring-foreground rounded-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Roadmap</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
