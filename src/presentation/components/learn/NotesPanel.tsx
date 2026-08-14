"use client";

import React, { useState, useEffect } from "react";
import { Edit3, Check } from "lucide-react";

interface NotesPanelProps {
  lessonId: string;
}

export default function NotesPanel({ lessonId }: NotesPanelProps) {
  const [note, setNote] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Load note for this specific lesson on load/change
  useEffect(() => {
    const savedNote = localStorage.getItem(`dsa-note-${lessonId}`);
    setNote(savedNote || "");
  }, [lessonId]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNote(value);
    setIsSaving(true);

    // Save to localStorage
    localStorage.setItem(`dsa-note-${lessonId}`, value);

    // Simulate a brief save indicator timeout
    setTimeout(() => {
      setIsSaving(false);
    }, 450);
  };

  return (
    <div className="space-y-3 select-none">
      <div className="flex items-center justify-between text-foreground h-5 shrink-0">
        <div className="flex items-center gap-2">
          <Edit3 className="h-4 w-4 text-secondary-foreground" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Margin Notes</span>
        </div>
        
        {/* Subtle save status */}
        <div className="text-[9px] font-semibold text-secondary-foreground/60 flex items-center gap-1 transition-all h-4 items-center">
          {isSaving ? (
            <span className="animate-pulse">Writing...</span>
          ) : note ? (
            <span className="flex items-center gap-0.5">
              <Check className="h-3 w-3 text-emerald-700 stroke-[2.5]" />
              <span>Saved</span>
            </span>
          ) : (
            <span className="opacity-0 pointer-events-none">Idle</span>
          )}
        </div>
      </div>

      {/* Notebook styled paper card */}
      <div className="p-4 border border-border/80 bg-card rounded-md space-y-2 relative overflow-hidden">
        {/* Lined paper lines pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(to bottom, #2b2b2b 1px, transparent 1px)",
            backgroundSize: "100% 20px"
          }}
        />

        <h4 className="text-xs font-bold text-foreground">My Personal Annotations</h4>
        
        {/* Active textarea for note entry */}
        <textarea
          value={note}
          onChange={handleNoteChange}
          placeholder="Type here to add personal reflections, key takeaways, or pseudo-code blocks for this chapter..."
          className="w-full mt-2 p-2.5 text-xs font-serif border border-border/60 bg-background/40 resize-none h-40 outline-none text-foreground leading-relaxed focus:border-foreground/80 focus:ring-0 select-text"
        />
      </div>
    </div>
  );
}
