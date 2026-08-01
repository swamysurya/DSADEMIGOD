"use client";

import React from "react";
import { Edit3 } from "lucide-react";

export default function NotesPanel() {
  return (
    <div className="space-y-3 select-none">
      <div className="flex items-center gap-2 text-foreground">
        <Edit3 className="h-4 w-4 text-secondary-foreground" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Margin Notes</span>
      </div>

      {/* Notebook styled paper card */}
      <div className="p-4 border border-border/80 bg-card/65 rounded-sm space-y-2 relative overflow-hidden">
        {/* Subtle lined pattern overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(to bottom, #2b2b2b 1px, transparent 1px)",
            backgroundSize: "100% 20px"
          }}
        />

        <h4 className="text-xs font-bold text-foreground">My Personal Notes</h4>
        <p className="text-xs text-secondary-foreground leading-relaxed font-serif italic">
          Annotate code blocks and write personal intuition notes. Your markings will be saved directly in the book margins.
        </p>

        {/* Disabled placeholder textarea */}
        <textarea
          disabled
          placeholder="Select text or click here to add margin annotations..."
          className="w-full mt-2 p-2 text-xs font-serif border border-border/60 bg-background/50 resize-none h-20 outline-none text-secondary-foreground/60"
        />
      </div>
    </div>
  );
}
