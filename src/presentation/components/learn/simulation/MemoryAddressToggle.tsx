"use client";

import React from "react";
import { MemoryAddressToggleProps } from "./types";

export default function MemoryAddressToggle({
  showAddress,
  onToggle
}: MemoryAddressToggleProps) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer select-none py-1 group">
      <input
        type="checkbox"
        checked={showAddress}
        onChange={onToggle}
        className="h-3.5 w-3.5 rounded-sm border border-border bg-card text-primary focus:ring-0 focus:ring-offset-0 focus:outline-none accent-primary transition-all cursor-pointer"
      />
      <span className="text-[10px] font-bold text-secondary-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">
        Show Memory Address
      </span>
    </label>
  );
}
