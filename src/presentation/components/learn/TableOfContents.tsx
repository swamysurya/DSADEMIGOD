"use client";

import React, { useState, useEffect, useRef } from "react";
import { List } from "lucide-react";
import { ContentBlock } from "@/domain/models/lesson";

interface TableOfContentsProps {
  headings: ContentBlock[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    // Disconnect old observer if exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Set active ID to the first heading initially
    if (headings[0]?.id) {
      setActiveId(headings[0].id);
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Find entries that are intersecting
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Active heading is the one closest to the top of the viewport
        const topVisible = visibleEntries.reduce((prev, curr) => 
          curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev
        );
        if (topVisible.target.id) {
          setActiveId(topVisible.target.id);
        }
      }
    };

    // Create an intersection observer that detects when heading is in the top portion of the screen
    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: "-80px 0px -60% 0px", // triggers when heading is near the top
      threshold: 0.1,
    });

    // Observe each heading element on the page
    headings.forEach((heading) => {
      if (heading.id) {
        const el = document.getElementById(heading.id);
        if (el) {
          observerRef.current?.observe(el);
        }
      }
    });

    return () => observerRef.current?.disconnect();
  }, [headings]);

  const handleHeadingClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 75; // Account for sticky nav
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="space-y-4 select-none">
      <div className="flex items-center gap-2 text-foreground">
        <List className="h-4 w-4 text-secondary-foreground" />
        <span className="text-[10px] font-bold uppercase tracking-widest">On this Page</span>
      </div>

      <div className="relative pl-3 border-l border-border/80">
        {/* Dynamic sliding indicator dot/bar */}
        <div className="absolute left-[-1px] top-0 bottom-0 w-px bg-foreground/20" />

        <ul className="space-y-3" role="list">
          {headings.map((heading) => {
            if (!heading.id || !heading.text) return null;
            const isActive = heading.id === activeId;
            const isSubheading = heading.level === 3;

            return (
              <li
                key={heading.id}
                className={`
                  text-xs transition-all duration-200
                  ${isSubheading ? "pl-3" : ""}
                  ${isActive ? "text-foreground font-bold" : "text-secondary-foreground hover:text-foreground"}
                `}
                role="listitem"
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleHeadingClick(e, heading.id!)}
                  className="block relative py-0.5 outline-none focus-visible:ring-1 focus-visible:ring-foreground"
                >
                  {/* Subtle highlight marker on active item */}
                  {isActive && (
                    <span className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-foreground rounded-full" />
                  )}
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
