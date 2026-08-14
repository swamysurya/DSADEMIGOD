"use client";

import React from "react";

export default function AVLImbalanceFlowchartDrawing() {
  return (
    <div className="w-full max-w-3xl mx-auto my-8 bg-[#FCFBF8] border border-[#DDD7CC] rounded-sm p-6 shadow-sm font-serif">
      <div className="text-center mb-8">
        <h4 className="text-base font-extrabold text-[#232323] uppercase tracking-wider mb-2">
          How to Choose the Correct Rotation
        </h4>
        <p className="text-[13px] text-[#666666] leading-relaxed max-w-lg mx-auto">
          Follow this decision flow to identify the unbalanced tree shape and find the required rotation action.
        </p>
      </div>

      <div className="flex flex-col items-center space-y-6">
        {/* Step 1: Unbalanced Node */}
        <div className="w-72 bg-[#F4F1EA] border border-[#DDD7CC] rounded p-4 text-center shadow-sm">
          <span className="text-[10px] uppercase font-bold text-[#666666] block mb-1">Step 1</span>
          <span className="text-[13px] font-bold text-[#232323] block">Find Node with Balance Factor</span>
          <div className="mt-2 text-[12px] font-mono font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded inline-block border border-rose-100">
            BF = +2 or BF = -2
          </div>
        </div>

        {/* Arrow Split 1 */}
        <div className="w-full h-8 flex justify-center items-center">
          <svg width="340" height="32" className="overflow-visible">
            {/* Left arrow path */}
            <path d="M 170,0 L 170,8 L 60,8 L 60,30" fill="none" stroke="#3F51B5" strokeWidth="2" />
            <polygon points="60,32 56,26 64,26" fill="#3F51B5" />
            
            {/* Right arrow path */}
            <path d="M 170,0 L 170,8 L 280,8 L 280,30" fill="none" stroke="#3F51B5" strokeWidth="2" />
            <polygon points="280,32 276,26 284,26" fill="#3F51B5" />

            {/* Labels in Caveat */}
            <text x="110" y="5" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px", fill: "#3F51B5", fontWeight: "bold" }}>BF is +2 (Left-Heavy)</text>
            <text x="230" y="5" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px", fill: "#3F51B5", fontWeight: "bold" }}>BF is -2 (Right-Heavy)</text>
          </svg>
        </div>

        {/* Step 2: Child Check Column Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          
          {/* LEFT BRANCH: BF is +2 (Left-Heavy) */}
          <div className="flex flex-col items-center space-y-6 border border-dashed border-[#DDD7CC] rounded-sm p-5 bg-[#F4F1EA]/10">
            <div className="w-full bg-[#FCFBF8] border border-[#DDD7CC] rounded p-3 text-center shadow-sm">
              <span className="text-[10px] uppercase font-bold text-[#666666] block mb-1">Step 2 (Left-Heavy)</span>
              <span className="text-[13px] font-bold text-[#232323]">Check Left Child's BF</span>
            </div>

            {/* Arrow Split Left */}
            <svg width="220" height="32" className="overflow-visible">
              <path d="M 110,0 L 110,8 L 50,8 L 50,30" fill="none" stroke="#3F51B5" strokeWidth="1.5" />
              <polygon points="50,32 47,27 53,27" fill="#3F51B5" />

              <path d="M 110,0 L 110,8 L 170,8 L 170,30" fill="none" stroke="#3F51B5" strokeWidth="1.5" />
              <polygon points="170,32 167,27 173,27" fill="#3F51B5" />

              <text x="75" y="6" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "11px", fill: "#3F51B5" }}>Child BF ≥ 0</text>
              <text x="145" y="6" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "11px", fill: "#3F51B5" }}>Child BF &lt; 0</text>
            </svg>

            {/* Final Cases Left */}
            <div className="grid grid-cols-2 gap-3 w-full">
              
              {/* LL Case */}
              <div className="bg-[#FCFBF8] border border-[#DDD7CC] rounded p-3 text-center flex flex-col justify-between items-center min-h-[190px] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full">
                  <span className="text-[11px] font-mono text-[#D97706] font-bold block mb-1">LL Case (Left-Left)</span>
                  
                  {/* LL Graph visual */}
                  <div className="flex justify-center my-1 bg-[#F4F1EA]/30 py-1 rounded">
                    <svg width="90" height="60" className="overflow-visible font-mono text-[7px] font-bold">
                      <line x1="65" y1="12" x2="45" y2="30" stroke="#DDD7CC" strokeWidth="1.5" />
                      <line x1="45" y1="30" x2="25" y2="48" stroke="#DDD7CC" strokeWidth="1.5" />
                      
                      {/* Node 30 (Unbalanced) */}
                      <circle cx="65" cy="12" r="8" fill="#C0392B" />
                      <text x="65" y="14" textAnchor="middle" fill="#FFFFFF">30</text>
                      
                      {/* Node 20 */}
                      <circle cx="45" cy="30" r="8" fill="#3F51B5" />
                      <text x="45" y="32" textAnchor="middle" fill="#FFFFFF">20</text>
                      
                      {/* Node 10 */}
                      <circle cx="25" cy="48" r="8" fill="#3F51B5" />
                      <text x="25" y="50" textAnchor="middle" fill="#FFFFFF">10</text>
                    </svg>
                  </div>
                  <p className="text-[9px] text-[#666666] leading-tight mt-1">Straight left-heavy line</p>
                </div>
                <div className="bg-[#3F51B5] text-[#FCFBF8] text-[10px] font-bold py-1 w-full rounded mt-2 uppercase tracking-wide">
                  Rotate Right
                </div>
              </div>

              {/* LR Case */}
              <div className="bg-[#FCFBF8] border border-[#DDD7CC] rounded p-3 text-center flex flex-col justify-between items-center min-h-[190px] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full">
                  <span className="text-[11px] font-mono text-[#D97706] font-bold block mb-1">LR Case (Left-Right)</span>
                  
                  {/* LR Graph visual */}
                  <div className="flex justify-center my-1 bg-[#F4F1EA]/30 py-1 rounded">
                    <svg width="90" height="60" className="overflow-visible font-mono text-[7px] font-bold">
                      <line x1="65" y1="12" x2="25" y2="30" stroke="#DDD7CC" strokeWidth="1.5" />
                      <line x1="25" y1="30" x2="45" y2="48" stroke="#DDD7CC" strokeWidth="1.5" />
                      
                      {/* Node 30 (Unbalanced) */}
                      <circle cx="65" cy="12" r="8" fill="#C0392B" />
                      <text x="65" y="14" textAnchor="middle" fill="#FFFFFF">30</text>
                      
                      {/* Node 10 */}
                      <circle cx="25" cy="30" r="8" fill="#3F51B5" />
                      <text x="25" y="32" textAnchor="middle" fill="#FFFFFF">10</text>
                      
                      {/* Node 20 */}
                      <circle cx="45" cy="48" r="8" fill="#3F51B5" />
                      <text x="45" y="50" textAnchor="middle" fill="#FFFFFF">20</text>
                    </svg>
                  </div>
                  <p className="text-[9px] text-[#666666] leading-tight mt-1">Zig-zag left-then-right</p>
                </div>
                <div className="bg-[#3F51B5] text-[#FCFBF8] text-[10px] font-bold py-1 w-full rounded mt-2 uppercase tracking-wide">
                  Left-Right Rotate
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT BRANCH: BF is -2 (Right-Heavy) */}
          <div className="flex flex-col items-center space-y-6 border border-dashed border-[#DDD7CC] rounded-sm p-5 bg-[#F4F1EA]/10">
            <div className="w-full bg-[#FCFBF8] border border-[#DDD7CC] rounded p-3 text-center shadow-sm">
              <span className="text-[10px] uppercase font-bold text-[#666666] block mb-1">Step 2 (Right-Heavy)</span>
              <span className="text-[13px] font-bold text-[#232323]">Check Right Child's BF</span>
            </div>

            {/* Arrow Split Right */}
            <svg width="220" height="32" className="overflow-visible">
              <path d="M 110,0 L 110,8 L 50,8 L 50,30" fill="none" stroke="#3F51B5" strokeWidth="1.5" />
              <polygon points="50,32 47,27 53,27" fill="#3F51B5" />

              <path d="M 110,0 L 110,8 L 170,8 L 170,30" fill="none" stroke="#3F51B5" strokeWidth="1.5" />
              <polygon points="170,32 167,27 173,27" fill="#3F51B5" />

              <text x="75" y="6" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "11px", fill: "#3F51B5" }}>Child BF ≤ 0</text>
              <text x="145" y="6" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "11px", fill: "#3F51B5" }}>Child BF &gt; 0</text>
            </svg>

            {/* Final Cases Right */}
            <div className="grid grid-cols-2 gap-3 w-full">
              
              {/* RR Case */}
              <div className="bg-[#FCFBF8] border border-[#DDD7CC] rounded p-3 text-center flex flex-col justify-between items-center min-h-[190px] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full">
                  <span className="text-[11px] font-mono text-[#D97706] font-bold block mb-1">RR Case (Right-Right)</span>
                  
                  {/* RR Graph visual */}
                  <div className="flex justify-center my-1 bg-[#F4F1EA]/30 py-1 rounded">
                    <svg width="90" height="60" className="overflow-visible font-mono text-[7px] font-bold">
                      <line x1="25" y1="12" x2="45" y2="30" stroke="#DDD7CC" strokeWidth="1.5" />
                      <line x1="45" y1="30" x2="65" y2="48" stroke="#DDD7CC" strokeWidth="1.5" />
                      
                      {/* Node 10 (Unbalanced) */}
                      <circle cx="25" cy="12" r="8" fill="#C0392B" />
                      <text x="25" y="14" textAnchor="middle" fill="#FFFFFF">10</text>
                      
                      {/* Node 20 */}
                      <circle cx="45" cy="30" r="8" fill="#3F51B5" />
                      <text x="45" y="32" textAnchor="middle" fill="#FFFFFF">20</text>
                      
                      {/* Node 30 */}
                      <circle cx="65" cy="48" r="8" fill="#3F51B5" />
                      <text x="65" y="50" textAnchor="middle" fill="#FFFFFF">30</text>
                    </svg>
                  </div>
                  <p className="text-[9px] text-[#666666] leading-tight mt-1">Straight right-heavy line</p>
                </div>
                <div className="bg-[#3F51B5] text-[#FCFBF8] text-[10px] font-bold py-1 w-full rounded mt-2 uppercase tracking-wide">
                  Rotate Left
                </div>
              </div>

              {/* RL Case */}
              <div className="bg-[#FCFBF8] border border-[#DDD7CC] rounded p-3 text-center flex flex-col justify-between items-center min-h-[190px] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full">
                  <span className="text-[11px] font-mono text-[#D97706] font-bold block mb-1">RL Case (Right-Left)</span>
                  
                  {/* RL Graph visual */}
                  <div className="flex justify-center my-1 bg-[#F4F1EA]/30 py-1 rounded">
                    <svg width="90" height="60" className="overflow-visible font-mono text-[7px] font-bold">
                      <line x1="25" y1="12" x2="65" y2="30" stroke="#DDD7CC" strokeWidth="1.5" />
                      <line x1="65" y1="30" x2="45" y2="48" stroke="#DDD7CC" strokeWidth="1.5" />
                      
                      {/* Node 10 (Unbalanced) */}
                      <circle cx="25" cy="12" r="8" fill="#C0392B" />
                      <text x="25" y="14" textAnchor="middle" fill="#FFFFFF">10</text>
                      
                      {/* Node 30 */}
                      <circle cx="65" cy="30" r="8" fill="#3F51B5" />
                      <text x="65" y="32" textAnchor="middle" fill="#FFFFFF">30</text>
                      
                      {/* Node 20 */}
                      <circle cx="45" cy="48" r="8" fill="#3F51B5" />
                      <text x="45" y="50" textAnchor="middle" fill="#FFFFFF">20</text>
                    </svg>
                  </div>
                  <p className="text-[9px] text-[#666666] leading-tight mt-1">Zig-zag right-then-left</p>
                </div>
                <div className="bg-[#3F51B5] text-[#FCFBF8] text-[10px] font-bold py-1 w-full rounded mt-2 uppercase tracking-wide">
                  Right-Left Rotate
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
