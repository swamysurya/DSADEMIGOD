"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VariableMemoryVisualizerProps } from "./types";

export default function VariableMemoryVisualizer({
  variables,
  showAddress,
  changedVariables
}: VariableMemoryVisualizerProps) {
  const [zoomScale, setZoomScale] = useState<number>(1.0);
  if (!variables || variables.length === 0) {
    return (
      <div className="w-full flex-1 bg-card border border-border/80 rounded-md select-none flex flex-col overflow-hidden shadow-sm">
        {/* Title bar to match CodePanel */}
        <div className="flex items-center justify-between p-3 border-b border-border/40 bg-secondary/5">
          <span className="text-[10px] font-bold text-secondary-foreground uppercase tracking-widest">
            RAM (Variable Memory)
          </span>
          <span className="text-[9px] font-mono text-muted-foreground/50">
            Active: 0
          </span>
        </div>

        {/* Empty state content */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <p
            className="text-muted-foreground font-semibold"
            style={{ fontFamily: "'Caveat', cursive", fontSize: "19px" }}
          >
            Memory is currently empty.
          </p>
          <p className="text-[11px] text-muted-foreground/75 mt-1 max-w-[200px] leading-relaxed">
            Variables will appear in RAM once they are declared in the code.
          </p>
        </div>

        {/* Deprecated footer border buffer */}
        <div className="p-2 border-t border-border/30 bg-secondary/5 text-right h-8"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 bg-card border border-border/80 rounded-md select-none flex flex-col overflow-hidden shadow-sm">
      {/* Title bar to match CodePanel */}
      <div className="flex items-center justify-between p-3 border-b border-border/40 bg-secondary/5">
        <span className="text-[10px] font-bold text-secondary-foreground uppercase tracking-widest">
          RAM (Variable Memory)
        </span>
        <div className="flex items-center gap-3">
          {/* Zoom Controls */}
          <div className="flex items-center border border-border bg-card shadow-sm text-[9px] font-mono select-none rounded-sm overflow-hidden">
            <button 
              onClick={() => setZoomScale(prev => Math.max(prev - 0.15, 0.7))}
              disabled={zoomScale <= 0.75}
              className="px-2 py-0.5 border-r border-border hover:bg-secondary/10 disabled:opacity-30 cursor-pointer font-bold text-foreground"
              title="Zoom Out Memory"
            >
              -
            </button>
            <span className="px-2 py-0.5 text-muted-foreground font-bold select-none bg-secondary/5 border-r border-border text-[9px]">
              {Math.round(zoomScale * 100)}%
            </span>
            <button 
              onClick={() => setZoomScale(prev => Math.min(prev + 0.15, 1.45))}
              disabled={zoomScale >= 1.4}
              className="px-2 py-0.5 hover:bg-secondary/10 disabled:opacity-30 cursor-pointer font-bold text-foreground"
              title="Zoom In Memory"
            >
              +
            </button>
          </div>
          <span className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-widest font-bold select-none">
            Slots: {variables.length}
          </span>
        </div>
      </div>

      {/* Variables Grid */}
      <div className="flex-1 p-3.5 overflow-y-auto max-h-[180px] lg:max-h-none">
        <div className="flex flex-wrap gap-4 items-start justify-start">
          <AnimatePresence mode="popLayout">
            {variables.map((variable) => {
              const isChanged = changedVariables?.includes(variable.name);
              return (
                <motion.div
                  key={variable.name}
                  layout
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -10 }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  className="flex flex-col items-center select-none"
                  style={{ width: `${80 * zoomScale}px` }}
                >
                  {/* Variable Name label (above box) */}
                  <div 
                    className="font-mono font-bold text-foreground text-center w-full truncate"
                    style={{ 
                      fontSize: `${Math.max(10, Math.round(12 * (0.4 + 0.6 * zoomScale)))}px`, 
                      marginBottom: `${6 * zoomScale}px` 
                    }}
                  >
                    {variable.name}
                  </div>

                  {/* Memory Box with wobbly hand-drawn border */}
                  <div 
                    className="flex items-center justify-center relative bg-card transition-colors duration-150 select-none"
                    style={{ width: `${64 * zoomScale}px`, height: `${48 * zoomScale}px` }}
                  >
                    <svg className="absolute inset-0 w-full h-full pointer-events-none text-foreground" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path
                        d="M 3 3 Q 50 1.5 97 3 Q 98.5 50 97 97 Q 50 98.5 3 97 Q 1.5 50 3 3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>

                    {/* Stored Value */}
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={variable.value}
                        initial={{ scale: 0.75, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.75, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className={`font-mono font-bold ${isChanged ? "text-primary" : "text-foreground"}`}
                        style={{ fontSize: `${Math.max(11, Math.round(14 * (0.4 + 0.6 * zoomScale)))}px` }}
                      >
                        {variable.value}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  {/* Variable Type (below box) */}
                  <div 
                    className="text-muted-foreground font-mono select-none text-center"
                    style={{ 
                      fontSize: `${Math.max(8, Math.round(10 * (0.5 + 0.5 * zoomScale)))}px`, 
                      marginTop: `${6 * zoomScale}px` 
                    }}
                  >
                    {variable.type}
                  </div>

                  {/* Optional Memory Address (below type) */}
                  <div 
                    className="w-full mt-0.5 flex flex-col items-center justify-start overflow-hidden"
                    style={{ minHeight: `${14 * zoomScale}px` }}
                  >
                    <AnimatePresence>
                      {showAddress && (
                        <motion.span
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.15 }}
                          className="font-semibold font-mono text-muted-foreground/60 select-none"
                          style={{ fontSize: `${Math.max(7, Math.round(9 * (0.6 + 0.4 * zoomScale)))}px` }}
                        >
                          {variable.address}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Educational handwritten annotation under diagram */}
      <div className="p-2 border-t border-border/30 bg-secondary/5">
        <div
          className="text-muted-foreground select-none text-[13px] leading-tight"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          <span className="font-bold text-foreground">Teacher's Note: </span>
          Each box represents a slot in the computer's memory. When you update a variable, the new value overwrites the old value in that exact same slot.
        </div>
      </div>
    </div>
  );
}
