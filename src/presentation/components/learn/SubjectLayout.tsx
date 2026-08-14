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
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col font-serif h-screen overflow-hidden">
      {/* Sticky Top Navigation */}
      <TopNavigation subjectTitle={curriculum.title} />

      {/* Sub-Header bar visible on all devices */}
      <div className="h-10 px-4 border-b border-border/80 bg-card flex items-center justify-between select-none shrink-0">
        <button
          onClick={() => {
            setChaptersOpen(true);
            setLeftSidebarCollapsed((prev) => !prev);
          }}
          className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest outline-none focus-visible:ring-1 focus-visible:ring-foreground transition-colors hover:text-foreground ${
            leftSidebarCollapsed ? "text-muted-foreground/60" : "text-foreground"
          }`}
        >
          <Menu className="h-4 w-4" />
          <span>Chapters</span>
          <span className="hidden lg:inline text-[9px] text-muted-foreground/50 font-mono font-normal">
            [{leftSidebarCollapsed ? "Show" : "Hide"}]
          </span>
        </button>

        <button
          onClick={() => {
            setRightSidebarOpen(true);
            setRightSidebarCollapsed((prev) => !prev);
          }}
          className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest outline-none focus-visible:ring-1 focus-visible:ring-foreground transition-colors hover:text-foreground ${
            rightSidebarCollapsed ? "text-muted-foreground/60" : "text-foreground"
          }`}
        >
          <span className="hidden xl:inline text-[9px] text-muted-foreground/50 font-mono font-normal">
            [{rightSidebarCollapsed ? "Show" : "Hide"}]
          </span>
          <span>Page Index</span>
          <List className="h-4 w-4" />
        </button>
      </div>

      {/* Main Core Body (unified book container) */}
      <div className="flex-1 w-full max-w-[1800px] mx-auto px-5 md:px-6 lg:py-6 lg:px-7 overflow-hidden relative flex flex-col justify-center">
        <div className="w-full h-full book-layout-grid border-x md:border border-border/80 bg-card overflow-hidden grid md:rounded-lg">
          {/* Inject style for dynamic responsive grid cols */}
          <style dangerouslySetInnerHTML={{ __html: `
            @media (min-width: 1280px) {
              .book-layout-grid {
                grid-template-columns: ${leftSidebarCollapsed ? "0px" : "260px"} 1fr ${rightSidebarCollapsed ? "0px" : "280px"};
              }
            }
            @media (min-width: 1024px) and (max-width: 1279px) {
              .book-layout-grid {
                grid-template-columns: ${leftSidebarCollapsed ? "0px" : "260px"} 1fr 0px;
              }
            }
            @media (max-width: 1023px) {
              .book-layout-grid {
                grid-template-columns: 1fr;
              }
            }
          ` }} />

          {/* Left Sidebar (Chapters Navigation) */}
          <ChapterSidebar
            curriculum={curriculum}
            activeLessonId={activeLessonId}
            subjectId={subjectId}
            isOpen={chaptersOpen}
            onClose={() => setChaptersOpen(false)}
            isCollapsed={leftSidebarCollapsed}
          />

          {/* Center: Main Reading Area (Unified Paper Page) */}
          <main className="h-full overflow-y-auto min-w-0 bg-card lg:col-start-2">
            {children}
          </main>

          {/* Right Sidebar (Table of Contents + Notes) */}
          {/* Permanent on XL Desktop screens, unless collapsed */}
          {!rightSidebarCollapsed && (
            <aside className="hidden xl:block xl:col-start-3 w-full h-full border-l border-border/80 bg-card overflow-y-auto p-5 space-y-6">
              <TableOfContents headings={headings} />
              <NotesPanel lessonId={activeLessonId} />
            </aside>
          )}
        </div>

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
            <NotesPanel lessonId={activeLessonId} />
          </div>
        </div>
      </div>
    </div>
  );
}
