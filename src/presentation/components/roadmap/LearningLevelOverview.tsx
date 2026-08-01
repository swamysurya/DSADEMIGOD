"use client";

import React from "react";
import { Clock, FolderOpen, Code2, Award, ArrowRight } from "lucide-react";
import { LearningLevel } from "@/domain/models/roadmap";
import ProgressBar from "./ProgressBar";
import StartLearningButton from "./StartLearningButton";

interface LearningLevelOverviewProps {
  level: LearningLevel;
  panelId: string;
  headerId: string;
}

export default function LearningLevelOverview({
  level,
  panelId,
  headerId,
}: LearningLevelOverviewProps) {
  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={headerId}
      className="p-6 md:p-8 space-y-8 bg-card/45 border-b border-border/80"
    >
      {/* Overview and Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: About Section */}
        <div className="md:col-span-7 space-y-3">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-secondary-foreground">
            About this Level
          </h3>
          <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
            {level.about}
          </p>
        </div>

        {/* Right Column: Milestones */}
        <div className="md:col-span-5 space-y-3">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-secondary-foreground">
            Curriculum Core
          </h3>
          <ul className="space-y-2">
            {level.whatYouWillLearn.map((milestone, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-foreground/85">
                <ArrowRight className="h-3.5 w-3.5 text-secondary-foreground/60 shrink-0 mt-0.5" />
                <span>{milestone}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Stats Board (looks like a clean printed rule grid) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b border-border/85 divide-x divide-y divide-border/85 lg:divide-y-0 select-none">
        {/* Stat 1: Duration */}
        <div className="p-4 flex items-center gap-3">
          <Clock className="h-4.5 w-4.5 text-secondary-foreground/70 shrink-0" />
          <div>
            <div className="text-[9px] font-bold text-secondary-foreground uppercase tracking-widest">
              Study Time
            </div>
            <div className="text-sm font-bold text-foreground mt-0.5">
              {level.duration}
            </div>
          </div>
        </div>

        {/* Stat 2: Modules */}
        <div className="p-4 flex items-center gap-3 border-t-0">
          <FolderOpen className="h-4.5 w-4.5 text-secondary-foreground/70 shrink-0" />
          <div>
            <div className="text-[9px] font-bold text-secondary-foreground uppercase tracking-widest">
              Modules
            </div>
            <div className="text-sm font-bold text-foreground mt-0.5">
              {level.modulesCount} Chapters
            </div>
          </div>
        </div>

        {/* Stat 3: Projects */}
        <div className="p-4 flex items-center gap-3 border-t-0">
          <Code2 className="h-4.5 w-4.5 text-secondary-foreground/70 shrink-0" />
          <div>
            <div className="text-[9px] font-bold text-secondary-foreground uppercase tracking-widest">
              Guided Builds
            </div>
            <div className="text-sm font-bold text-foreground mt-0.5">
              {level.projectsCount} {level.projectsCount === 1 ? "Project" : "Projects"}
            </div>
          </div>
        </div>

        {/* Stat 4: Certificate */}
        <div className="p-4 flex items-center gap-3 border-t-0">
          <Award className="h-4.5 w-4.5 text-secondary-foreground/70 shrink-0" />
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

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 pt-2">
        <div className="flex-1 max-w-sm">
          <ProgressBar progress={level.progress} showText size="sm" />
        </div>
        <div className="shrink-0 flex justify-end">
          <StartLearningButton href={level.startUrl} />
        </div>
      </div>
    </div>
  );
}
