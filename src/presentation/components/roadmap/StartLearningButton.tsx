"use client";

import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface StartLearningButtonProps {
  onClick?: () => void;
  href?: string;
  className?: string;
  fullWidth?: boolean;
}

export default function StartLearningButton({
  onClick,
  href,
  className = "",
  fullWidth = false,
}: StartLearningButtonProps) {
  const content = (
    <motion.div
      className={`
        inline-flex items-center justify-center gap-2 px-5 py-2.5 
        border border-foreground bg-transparent text-foreground font-bold text-sm tracking-wide
        cursor-pointer select-none relative transition-colors duration-200 group outline-none
        hover:bg-foreground hover:text-background
        focus-visible:ring-1 focus-visible:ring-foreground focus-visible:ring-offset-2
        ${fullWidth ? "w-full" : ""}
      `}
      whileTap={{ scale: 0.98 }}
    >
      <BookOpen className="h-4 w-4 shrink-0" />
      <span className="font-semibold">Start Learning</span>
      <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className={`${fullWidth ? "w-full" : ""} inline-block ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${fullWidth ? "w-full" : ""} ${className}`}
      type="button"
    >
      {content}
    </button>
  );
}
