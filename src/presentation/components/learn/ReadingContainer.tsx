"use client";

import React from "react";

interface ReadingContainerProps {
  children: React.ReactNode;
}

export default function ReadingContainer({ children }: ReadingContainerProps) {
  return (
    <article className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-8 select-text">
      {children}
    </article>
  );
}
