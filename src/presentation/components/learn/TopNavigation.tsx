"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, User, ExternalLink, HelpCircle } from "lucide-react";

interface TopNavigationProps {
  subjectTitle: string;
}

export default function TopNavigation({ subjectTitle }: TopNavigationProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-sm border-b border-border/80 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Left Side: Home Link */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-foreground font-serif hover:underline outline-none focus-visible:ring-1 focus-visible:ring-foreground"
          >
            <BookOpen className="h-4.5 w-4.5" />
            <span className="font-bold text-sm tracking-wide">TOC Index</span>
          </Link>
        </div>

        {/* Center: Subject Title */}
        <div className="text-center">
          <h2 className="text-sm font-extrabold tracking-widest text-foreground uppercase">
            {subjectTitle}
          </h2>
        </div>

        {/* Right Side: Resources & Profile */}
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden sm:flex items-center gap-4.5 text-xs font-bold uppercase tracking-wider text-secondary-foreground">
            <a
              href="#documentation"
              className="hover:text-foreground hover:underline transition-colors outline-none focus-visible:ring-1 focus-visible:ring-foreground"
            >
              Docs
            </a>
            <a
              href="#cheatsheets"
              className="hover:text-foreground hover:underline transition-colors outline-none focus-visible:ring-1 focus-visible:ring-foreground"
            >
              Cheatsheets
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground hover:underline transition-colors outline-none focus-visible:ring-1 focus-visible:ring-foreground"
            >
              <span>GitHub</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </nav>

          {/* Profile Icon / Menu */}
          <div className="flex items-center gap-2">
            <button
              className="p-1 rounded-sm border border-border bg-card hover:bg-secondary/40 text-secondary-foreground hover:text-foreground transition-colors outline-none focus-visible:ring-1 focus-visible:ring-foreground"
              aria-label="User Profile"
            >
              <User className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
