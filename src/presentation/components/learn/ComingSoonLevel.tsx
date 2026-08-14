"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, FolderOpen, Code2, Award, Sparkles } from "lucide-react";
import { LearningLevel } from "@/domain/models/roadmap";
import { SubjectCurriculum } from "@/domain/models/subject";

interface ComingSoonLevelProps {
  level: LearningLevel;
  curriculum: SubjectCurriculum | null;
}

export default function ComingSoonLevel({ level, curriculum }: ComingSoonLevelProps) {
  // Pastel highlighter badge difficulty styles
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

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 md:px-8 font-serif select-none max-w-4xl mx-auto space-y-10">
      {/* Return to Roadmap button */}
      <div className="flex justify-between items-center pb-4 border-b border-border/80">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border text-secondary-foreground hover:text-foreground hover:border-foreground font-bold text-xs uppercase tracking-wider transition-colors outline-none focus-visible:ring-1 focus-visible:ring-foreground rounded-sm bg-card"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Roadmap</span>
        </Link>
        <span className="text-[10px] font-bold text-secondary-foreground uppercase tracking-widest bg-secondary px-2.5 py-1 rounded-sm border border-border/50">
          Coming Soon
        </span>
      </div>

      {/* Level Header Banner */}
      <header className="space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            {level.title}
          </h1>
          <span
            className={`text-[9px] font-bold px-2 py-0.5 border tracking-wider uppercase rounded-sm ${difficultyStyles(
              level.difficulty
            )}`}
          >
            {level.difficulty}
          </span>
        </div>
        <p className="text-sm md:text-base text-secondary-foreground leading-relaxed max-w-2xl">
          {level.shortDescription}
        </p>
      </header>

      {/* Stats Board Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b border-border divide-x divide-y divide-border lg:divide-y-0 bg-card/40 rounded-sm">
        <div className="p-4 flex items-center gap-3">
          <Clock className="h-5 w-5 text-secondary-foreground/75 shrink-0" />
          <div>
            <div className="text-[9px] font-bold text-secondary-foreground uppercase tracking-widest">
              Study Time
            </div>
            <div className="text-sm font-bold text-foreground mt-0.5">{level.duration}</div>
          </div>
        </div>

        <div className="p-4 flex items-center gap-3 border-t-0">
          <FolderOpen className="h-5 w-5 text-secondary-foreground/75 shrink-0" />
          <div>
            <div className="text-[9px] font-bold text-secondary-foreground uppercase tracking-widest">
              Modules
            </div>
            <div className="text-sm font-bold text-foreground mt-0.5">{level.modulesCount} Chapters</div>
          </div>
        </div>

        <div className="p-4 flex items-center gap-3 border-t-0">
          <Code2 className="h-5 w-5 text-secondary-foreground/75 shrink-0" />
          <div>
            <div className="text-[9px] font-bold text-secondary-foreground uppercase tracking-widest">
              Guided Builds
            </div>
            <div className="text-sm font-bold text-foreground mt-0.5">
              {level.projectsCount} {level.projectsCount === 1 ? "Project" : "Projects"}
            </div>
          </div>
        </div>

        <div className="p-4 flex items-center gap-3 border-t-0">
          <Award className="h-5 w-5 text-secondary-foreground/75 shrink-0" />
          <div>
            <div className="text-[9px] font-bold text-secondary-foreground uppercase tracking-widest">
              Certification
            </div>
            <div className="text-sm font-bold text-foreground mt-0.5">
              {level.certificateAvailable ? "Available" : "Not Available"}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
        {/* Left Column: About & Outcomes */}
        <div className="md:col-span-7 space-y-6">
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-secondary-foreground">
              About this Volume
            </h2>
            <p className="text-base text-foreground/95 leading-relaxed font-serif">
              {level.about}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-secondary-foreground">
              What You Will Learn
            </h2>
            <ul className="space-y-3">
              {level.whatYouWillLearn.map((milestone, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-foreground/90">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary border border-border text-[10px] font-bold text-secondary-foreground shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{milestone}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column: Teacher's Margin Note */}
        <div className="md:col-span-5">
          <div className="p-6 border border-amber-200/80 bg-amber-50/20 rounded-sm relative overflow-hidden space-y-3">
            {/* Hand-drawn aesthetic title */}
            <div className="flex items-center gap-1.5 text-amber-800/90 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Teacher's Note</span>
            </div>
            <p className="text-lg leading-relaxed text-amber-900/90 font-normal" style={{ fontFamily: "'Caveat', cursive" }}>
              "We are currently drafting the interactive visual materials, memory simulator graphs, and code playgrounds for this level. Our goal is to make every pointer shift, heap mutation, and traversal path feel entirely visual and simple. Check back soon for the updated textbook volume!"
            </p>
          </div>
        </div>
      </div>

      {/* Syllabus Preview Section */}
      {curriculum && curriculum.chapters.length > 0 && (
        <section className="pt-6 border-t border-border space-y-4">
          <div className="flex items-center gap-2 text-foreground">
            <BookOpen className="h-4.5 w-4.5 text-secondary-foreground" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-secondary-foreground">
              Planned Syllabus Outline
            </h2>
          </div>
          
          <div className="space-y-4">
            {curriculum.chapters.map((chapter, cIdx) => (
              <div key={chapter.id} className="p-4 border border-border/80 bg-card/30 rounded-sm space-y-3">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="text-[10px] font-mono text-secondary-foreground">Chapter {cIdx + 1}:</span>
                  {chapter.title}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4 border-l border-border/50">
                  {chapter.lessons.map((lesson) => (
                    <li key={lesson.id} className="text-xs text-secondary-foreground flex items-center justify-between pr-4">
                      <span className="truncate">{lesson.title}</span>
                      <span className="text-[10px] text-muted-foreground/60 font-mono italic shrink-0 ml-2">
                        {lesson.estimatedTime}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
