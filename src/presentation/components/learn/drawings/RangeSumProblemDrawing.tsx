"use client";

import React from "react";

export default function RangeSumProblemDrawing() {
  const arr = [2, 4, 1, 5, 3];
  const L = 1;
  const R = 3;

  return (
    <div className="w-full my-6 select-none flex flex-col items-center">
      <div className="w-full max-w-2xl border border-[#DDD7CC] bg-[#FCFBF8] p-5 rounded-sm space-y-4 shadow-sm">
        <div>
          <h4 className="text-xs font-extrabold text-[#232323] uppercase tracking-wide">
            Problem Visualization: Range Sum Query
          </h4>
          <p className="text-xs text-[#666666]" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            "Given indices L and R, calculate the sum of values from index L to index R."
          </p>
        </div>

        <div className="p-4 bg-[#F4F1EA]/25 border border-dashed border-[#DDD7CC] rounded-sm flex flex-col items-center space-y-4">
          <div className="text-xs font-semibold text-[#232323] font-mono">
            Query: L = {L}, R = {R}
          </div>

          {/* Array layout with highlighted subsegment */}
          <div className="flex border border-[#DDD7CC] bg-white rounded-sm shadow-sm overflow-hidden">
            {arr.map((val, idx) => {
              const isIncluded = idx >= L && idx <= R;
              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center w-14 h-14 justify-center border-[#DDD7CC] font-mono font-bold text-sm transition-all ${
                    idx < arr.length - 1 ? "border-r" : ""
                  } ${
                    isIncluded
                      ? "bg-[#3F51B5]/15 text-[#3F51B5] font-extrabold scale-[1.02]"
                      : "bg-white text-[#666666] opacity-60"
                  }`}
                >
                  <span>{val}</span>
                  <span className="text-[8.5px] opacity-60 mt-0.5">[{idx}]</span>
                </div>
              );
            })}
          </div>

          {/* Calculation annotation */}
          <div className="text-center font-serif text-xs max-w-md leading-relaxed text-[#666666]">
            <span className="font-bold text-[#232323]">Result: </span>
            Sum elements from index <span className="font-mono bg-indigo-50 text-indigo-700 px-1 font-bold">1</span> to <span className="font-mono bg-indigo-50 text-indigo-700 px-1 font-bold">3</span>:
            <div className="font-mono text-sm font-extrabold text-[#3F51B5] mt-1">
              arr[1] + arr[2] + arr[3] = 4 + 1 + 5 = 10
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
