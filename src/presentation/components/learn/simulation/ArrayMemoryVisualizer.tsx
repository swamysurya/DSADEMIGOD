"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MemoryVariable } from "@/domain/models/lesson";

interface ArrayMemoryVisualizerProps {
  variables: MemoryVariable[];
  showAddress: boolean;
  changedVariables?: string[];
}

interface ArrayElement {
  index: number;
  value: string;
  address: string;
  fullName: string;
}

interface ParsedArray {
  name: string;
  type: string;
  elements: ArrayElement[];
}

interface ParsedVar {
  name: string;
  type: string;
  value: string;
  address: string;
}
export default function ArrayMemoryVisualizer({
  variables,
  showAddress,
  changedVariables
}: ArrayMemoryVisualizerProps) {
  const [zoomScale, setZoomScale] = useState<number>(1.0);

  if (!variables || variables.length === 0) {
    return (
      <div className="w-full flex-1 bg-card border border-border/80 rounded-md select-none flex flex-col overflow-hidden shadow-sm">
        <div className="flex items-center justify-between p-3 border-b border-border/40 bg-[#F4F1EA]/30">
          <span className="text-[10px] font-bold text-secondary-foreground uppercase tracking-widest">
            RAM (Array Memory)
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <p className="text-muted-foreground font-semibold font-serif text-sm">
            Memory is currently empty.
          </p>
        </div>
      </div>
    );
  }

  // Predefined pointer names
  const POINTER_NAMES = ["left", "right", "i", "j", "low", "high", "mid", "start", "end", "p", "p1", "p2", "curr", "prev"];

  // Parse variables into contiguous arrays and single scalar variables
  const arrays: Record<string, ParsedArray> = {};
  const singleVars: ParsedVar[] = [];

  variables.forEach((v) => {
    const arrayMatch = v.name.match(/^([^\[]+)\[(\d+)\]$/);
    if (arrayMatch) {
      const arrayName = arrayMatch[1];
      const index = parseInt(arrayMatch[2], 10);
      if (!arrays[arrayName]) {
        arrays[arrayName] = {
          name: arrayName,
          type: v.type,
          elements: []
        };
      }
      arrays[arrayName].elements.push({
        index,
        value: v.value,
        address: v.address || "",
        fullName: v.name
      });
    } else {
      // Check if it is classified as a pointer
      const isPointer = POINTER_NAMES.includes(v.name.toLowerCase()) && 
                        !isNaN(parseInt(v.value, 10)) && 
                        parseInt(v.value, 10) >= 0;
      
      if (!isPointer) {
        singleVars.push({
          name: v.name,
          type: v.type,
          value: v.value,
          address: v.address || ""
        });
      }
    }
  });

  // Sort array elements by index to maintain correct ordering
  Object.values(arrays).forEach((arr) => {
    arr.elements.sort((a, b) => a.index - b.index);
  });

  // Sort singleVars consistently by a custom order so variables don't jump around
  singleVars.sort((a, b) => {
    const order = ["n", "maxVal", "i", "j", "key"];
    const indexA = order.indexOf(a.name);
    const indexB = order.indexOf(b.name);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.name.localeCompare(b.name);
  });

  // Helper to find pointers for a specific element index
  const getPointersForIndex = (arrayLength: number, index: number) => {
    return variables
      .filter((v) => {
        if (!POINTER_NAMES.includes(v.name.toLowerCase())) return false;
        const parsed = parseInt(v.value, 10);
        return !isNaN(parsed) && parsed === index && parsed >= 0 && parsed < arrayLength;
      })
      .map((v) => v.name);
  };

  return (
    <div className="w-full flex-1 bg-card border border-border/80 rounded-md select-none flex flex-col overflow-hidden shadow-sm font-sans font-semibold">
      {/* Title bar */}
      <div className="flex items-center justify-between p-3 border-b border-border/40 bg-secondary/5">
        <span className="text-[10px] font-bold text-secondary-foreground uppercase tracking-widest">
          RAM (Memory Layout)
        </span>
        <div className="flex items-center gap-3">
          {/* Zoom Controls */}
          <div className="flex items-center border border-border bg-white shadow-sm text-[9px] font-mono select-none rounded-sm overflow-hidden">
            <button 
              onClick={() => setZoomScale(prev => Math.max(prev - 0.15, 0.7))}
              disabled={zoomScale <= 0.75}
              className="px-2 py-0.5 border-r border-border hover:bg-secondary/10 disabled:opacity-30 cursor-pointer font-bold text-foreground"
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
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Main visualizer body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-6">
        {/* 1. Arrays Section */}
        {Object.keys(arrays).length > 0 && (
          <div className="space-y-5">
            {Object.keys(arrays)
              .sort((a, b) => {
                // Stably order arrays: arr, count, output, then alphabetical
                const order = ["arr", "count", "output"];
                const indexA = order.indexOf(a);
                const indexB = order.indexOf(b);
                if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                if (indexA !== -1) return -1;
                if (indexB !== -1) return 1;
                return a.localeCompare(b);
              })
              .map((name) => {
                const arr = arrays[name];
                return (
                  <div key={arr.name} className="space-y-2">
                    {/* Array Name and Type Label */}
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-foreground">
                    {arr.type} {arr.name}[{arr.elements.length}]
                  </span>
                  <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">
                    (Contiguous Array)
                  </span>
                </div>

                {/* Contiguous Memory Blocks */}
                <div className="flex items-start overflow-x-auto pb-2">
                  <div className="flex border border-[#DDD7CC] bg-[#FCFBF8] rounded-sm shadow-sm overflow-hidden shrink-0">
                    {arr.elements.map((elem, idx) => {
                      const isChanged = changedVariables?.includes(elem.fullName);
                      const cellPointers = getPointersForIndex(arr.elements.length, elem.index);
                      return (
                        <div
                          key={elem.fullName}
                          className={`flex flex-col items-center border-[#DDD7CC] transition-colors duration-150 ${
                            idx < arr.elements.length - 1 ? "border-r" : ""
                          }`}
                          style={{
                            width: `${60 * zoomScale}px`,
                            minWidth: `${60 * zoomScale}px`
                          }}
                        >
                          {/* Pointers Row above the cell */}
                          <div 
                            className="w-full flex flex-col items-center justify-end select-none text-[#3F51B5] pb-1"
                            style={{ 
                              height: `${20 * zoomScale}px`
                            }}
                          >
                            {cellPointers.length > 0 && (
                              <div className="flex gap-1 items-center justify-center font-bold leading-none">
                                {cellPointers.map((ptrName, pIdx) => (
                                  <span 
                                    key={ptrName} 
                                    style={{ fontFamily: "'Caveat', cursive", fontSize: `${Math.max(13, Math.round(16 * zoomScale))}px` }}
                                  >
                                    {ptrName}{pIdx < cellPointers.length - 1 ? "," : ""}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Memory Cell */}
                          <div 
                            className={`flex items-center justify-center font-mono font-bold transition-colors w-full border-t border-[#DDD7CC]/40`}
                            style={{
                              height: `${48 * zoomScale}px`,
                              fontSize: `${Math.max(11, Math.round(14 * (0.4 + 0.6 * zoomScale)))}px`
                            }}
                          >
                            <AnimatePresence mode="wait">
                              <motion.span
                                key={elem.value}
                                initial={{ scale: 0.75, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.75, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className={isChanged ? "text-[#3F51B5]" : "text-foreground"}
                              >
                                {elem.value}
                              </motion.span>
                            </AnimatePresence>
                          </div>

                          {/* Index labels underneath cells */}
                          <div 
                            className="w-full text-center border-t border-[#DDD7CC] bg-[#F4F1EA]/30 font-mono text-muted-foreground font-bold"
                            style={{
                              fontSize: `${Math.max(8, Math.round(9 * (0.6 + 0.4 * zoomScale)))}px`,
                              paddingTop: `${4 * zoomScale}px`,
                              paddingBottom: `${4 * zoomScale}px`
                            }}
                          >
                            [{elem.index}]
                          </div>

                          {/* Optional hex addresses */}
                          {showAddress && (
                            <div 
                              className="w-full text-center border-t border-[#DDD7CC]/50 font-mono text-muted-foreground/60"
                              style={{
                                fontSize: `${Math.max(7, Math.round(8 * (0.6 + 0.4 * zoomScale)))}px`,
                                paddingTop: `${2 * zoomScale}px`,
                                paddingBottom: `${2 * zoomScale}px`
                              }}
                            >
                              {elem.address}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
                );
            })}
          </div>
        )}

        {/* 2. Scalar / Normal Variables Section */}
        {singleVars.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-[#DDD7CC]/40">
            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
              Scalar Variables
            </span>
            <div className="flex flex-wrap gap-4">
              {singleVars.map((v) => {
                const isChanged = changedVariables?.includes(v.name);
                return (
                  <div
                    key={v.name}
                    className="flex flex-col items-center"
                    style={{ width: `${64 * zoomScale}px` }}
                  >
                    {/* Variable label */}
                    <span 
                      className="font-mono font-bold text-foreground text-center truncate w-full"
                      style={{ fontSize: `${Math.max(9, Math.round(11 * (0.4 + 0.6 * zoomScale)))}px` }}
                    >
                      {v.name}
                    </span>

                    {/* Box */}
                    <div 
                      className={`flex items-center justify-center relative bg-white border border-[#DDD7CC] rounded-sm shadow-sm transition-colors ${
                        isChanged ? "border-[#3F51B5] bg-[#3F51B5]/5 text-[#3F51B5]" : "text-foreground"
                      }`}
                      style={{
                        width: `${48 * zoomScale}px`,
                        height: `${36 * zoomScale}px`,
                        marginTop: "4px"
                      }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={v.value}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="font-mono font-bold"
                          style={{ fontSize: `${Math.max(10, Math.round(12 * (0.4 + 0.6 * zoomScale)))}px` }}
                        >
                          {v.value}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    {/* Type */}
                    <span 
                      className="text-muted-foreground font-mono mt-1 text-center"
                      style={{ fontSize: `${Math.max(7, Math.round(9 * (0.6 + 0.4 * zoomScale)))}px` }}
                    >
                      {v.type}
                    </span>

                    {/* Address */}
                    {showAddress && (
                      <span 
                        className="text-muted-foreground/60 font-mono mt-0.5 text-center"
                        style={{ fontSize: `${Math.max(7, Math.round(8 * (0.6 + 0.4 * zoomScale)))}px` }}
                      >
                        {v.address}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Note footer */}
      <div className="p-2 border-t border-border/30 bg-secondary/5">
        <div
          className="text-muted-foreground select-none text-[13px] leading-tight"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          <span className="font-bold text-foreground">Teacher's Note: </span>
          Arrays are stored in <span className="font-semibold text-foreground">contiguous</span> (adjacent) memory blocks. This allows instant $O(1)$ access to any element using its index.
        </div>
      </div>
    </div>
  );
}
