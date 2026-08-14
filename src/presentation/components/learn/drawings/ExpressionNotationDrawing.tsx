"use client";

import React from "react";

export default function ExpressionNotationDrawing() {
  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-border bg-card p-5 rounded-sm space-y-4">
        <div>
          <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wide">
            Infix to Postfix Conversion Steps
          </h4>
          <p className="text-xs text-secondary-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Operands go directly to the output. Operators wait on the stack based on priority."
          </p>
        </div>

        {/* Translation Flow */}
        <div className="flex flex-col gap-3 p-4 border border-dashed border-border/80 bg-secondary/5 font-mono text-xs">
          
          <div className="flex items-center justify-between border-b border-border/30 pb-1 text-[10px] font-bold text-secondary-foreground">
            <span>Scan Infix Token</span>
            <span>Operator Stack</span>
            <span>Postfix Output</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="w-24 text-[10px] font-bold">1. '('</span>
            <span className="w-24 px-1.5 border bg-card"> ( </span>
            <span className="w-32 text-secondary-foreground/40 italic">empty</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="w-24 text-[10px] font-bold">2. 'A'</span>
            <span className="w-24 px-1.5 border bg-card"> ( </span>
            <span className="w-32 font-bold text-primary">A</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="w-24 text-[10px] font-bold">3. '+'</span>
            <span className="w-24 px-1.5 border bg-card"> ( , + </span>
            <span className="w-32 font-bold text-primary">A</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="w-24 text-[10px] font-bold">4. 'B'</span>
            <span className="w-24 px-1.5 border bg-card"> ( , + </span>
            <span className="w-32 font-bold text-primary">A B</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="w-24 text-[10px] font-bold">5. ')'</span>
            <span className="w-24 px-1.5 border bg-card"> empty </span>
            <span className="w-32 font-bold text-primary">A B +</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="w-24 text-[10px] font-bold">6. '*'</span>
            <span className="w-24 px-1.5 border bg-card"> * </span>
            <span className="w-32 font-bold text-primary">A B +</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="w-24 text-[10px] font-bold">7. 'C'</span>
            <span className="w-24 px-1.5 border bg-card"> * </span>
            <span className="w-32 font-bold text-primary">A B + C</span>
          </div>

          <div className="flex items-center justify-between py-1 border-t border-dashed border-border/30 pt-1.5">
            <span className="w-24 text-[10px] font-extrabold text-emerald-800">8. End of string</span>
            <span className="w-24 px-1.5 border bg-card text-secondary-foreground/40 italic">empty</span>
            <span className="w-32 font-black text-emerald-800">A B + C *</span>
          </div>

        </div>
      </div>
    </div>
  );
}
