"use client";

import React, { useState } from "react";
import { Menu, BookOpen, ChevronRight, X, List } from "lucide-react";
import { SubjectCurriculum } from "@/domain/models/subject";
import { ContentBlock } from "@/domain/models/lesson";
import TopNavigation from "./TopNavigation";
import ChapterSidebar from "./ChapterSidebar";
import TableOfContents from "./TableOfContents";
import NotesPanel from "./NotesPanel";

interface SubjectLayoutProps {
  curriculum: SubjectCurriculum;
  activeLessonId: string;
  subjectId: string;
  headings: ContentBlock[];
  children: React.ReactNode;
}

export default function SubjectLayout({
  curriculum,
  activeLessonId,
  subjectId,
  headings,
  children,
}: SubjectLayoutProps) {
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col font-serif">
      {/* Sticky Top Navigation */}
      <TopNavigation subjectTitle={curriculum.title} />

      {/* Sub-Header bar visible ONLY on tablet & mobile */}
      <div className="lg:hidden h-10 px-4 border-b border-border/80 bg-card/60 backdrop-blur-xs flex items-center justify-between select-none">
        <button
          onClick={() => setChaptersOpen(true)}
          className="flex items-center gap-1.5 text-[10px] font-bold text-secondary-foreground hover:text-foreground uppercase tracking-widest outline-none focus-visible:ring-1 focus-visible:ring-foreground"
        >
          <Menu className="h-4 w-4" />
          <span>Chapters</span>
        </button>

        <button
          onClick={() => setRightSidebarOpen(true)}
          className="flex items-center gap-1.5 text-[10px] font-bold text-secondary-foreground hover:text-foreground uppercase tracking-widest outline-none focus-visible:ring-1 focus-visible:ring-foreground"
        >
          <span>Page Index</span>
          <List className="h-4 w-4" />
        </button>
      </div>

      {/* Main Core Body */}
      <div className="flex-1 flex relative">
        {/* Left Sidebar (Chapters Navigation) */}
        <ChapterSidebar
          curriculum={curriculum}
          activeLessonId={activeLessonId}
          subjectId={subjectId}
          isOpen={chaptersOpen}
          onClose={() => setChaptersOpen(false)}
        />

        {/* Center: Main Reading Area */}
        <main className="flex-1 min-w-0 bg-background overflow-y-auto">
          {children}
        </main>

        {/* Right Sidebar (Table of Contents + Notes) */}
        {/* Permanent on XL Desktop screens */}
        <aside className="hidden xl:block w-64 shrink-0 border-l border-border/80 sticky top-14 h-[calc(100vh-3.5rem)] bg-background overflow-y-auto p-6 space-y-8">
          <TableOfContents headings={headings} />
          <NotesPanel />
        </aside>

        {/* Dynamic sliding drawer on Mobile & Tablet for Right Sidebar */}
        <div
          className={`
            xl:hidden fixed inset-0 z-50 transition-opacity duration-300 pointer-events-none
            ${rightSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0"}
          `}
        >
          {/* Backdrop overlay */}
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setRightSidebarOpen(false)}
          />
          {/* Sliding Panel */}
          <div
            className={`
              absolute top-0 bottom-0 right-0 w-72 bg-background border-l border-border shadow-md transition-transform duration-300 ease-in-out p-6 space-y-8 overflow-y-auto
              ${rightSidebarOpen ? "translate-x-0" : "translate-x-full"}
            `}
          >
            <div className="flex justify-end select-none">
              <button
                onClick={() => setRightSidebarOpen(false)}
                className="p-1 rounded-sm border border-border bg-card text-secondary-foreground hover:text-foreground outline-none focus-visible:ring-1 focus-visible:ring-foreground"
                aria-label="Close Index Menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <TableOfContents headings={headings} />
            <NotesPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
