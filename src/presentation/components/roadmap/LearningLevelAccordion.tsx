"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LearningLevel } from "@/domain/models/roadmap";
import LearningLevelHeader from "./LearningLevelHeader";
import LearningLevelOverview from "./LearningLevelOverview";

interface LearningLevelAccordionProps {
  level: LearningLevel;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function LearningLevelAccordion({
  level,
  index,
  isExpanded,
  onToggle,
}: LearningLevelAccordionProps) {
  const headerId = `level-header-${level.id}`;
  const panelId = `level-panel-${level.id}`;

  return (
    <motion.div
      layout="position"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`
        overflow-hidden border border-border/80 rounded-sm transition-all duration-200
        ${isExpanded 
          ? "border-foreground ring-1 ring-foreground/10 shadow-sm" 
          : "hover:border-foreground/40"}
      `}
    >
      <LearningLevelHeader
        level={level}
        index={index}
        isExpanded={isExpanded}
        onToggle={onToggle}
        headerId={headerId}
        panelId={panelId}
      />

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <LearningLevelOverview
              level={level}
              panelId={panelId}
              headerId={headerId}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
