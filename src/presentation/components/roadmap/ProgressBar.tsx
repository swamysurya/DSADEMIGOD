"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function ProgressBar({
  progress,
  className = "",
  showText = false,
  size = "md",
}: ProgressBarProps) {
  const cleanProgress = Math.min(Math.max(progress, 0), 100);

  const heightMap = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-3.5",
  };

  return (
    <div className={`w-full flex flex-col gap-1 ${className}`}>
      <div className="flex items-center justify-between text-xs font-semibold text-secondary-foreground">
        {showText && <span>Completion Progress</span>}
        {showText && (
          <span className="text-foreground tabular-nums font-bold">
            {cleanProgress}%
          </span>
        )}
      </div>
      <div
        className={`w-full ${heightMap[size]} bg-secondary/50 border border-border/80 relative overflow-hidden`}
      >
        <motion.div
          className="h-full bg-accent relative"
          initial={{ width: 0 }}
          animate={{ width: `${cleanProgress}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
