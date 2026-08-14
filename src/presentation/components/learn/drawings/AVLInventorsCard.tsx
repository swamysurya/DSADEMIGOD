"use client";

import React, { useState } from "react";

export default function AVLInventorsCard() {
  const [velskyError, setVelskyError] = useState(false);
  const [landisError, setLandisError] = useState(false);

  return (
    <div className="w-full my-8 select-none flex flex-col items-center">
      <div className="w-full max-w-3xl border border-[#DDD7CC] bg-[#FCFBF8] p-6 rounded-sm space-y-6 shadow-sm">
        
        {/* Header */}
        <div className="border-b border-[#DDD7CC] pb-3 text-center sm:text-left">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#3F51B5] font-extrabold block mb-1">
            Historical Profile
          </span>
          <h4 className="text-lg md:text-xl font-bold font-serif text-[#232323]">
            The Inventors of the AVL Tree
          </h4>
        </div>

        {/* Dual Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          
          {/* Georgy Adelson-Velsky */}
          <div className="flex flex-col space-y-3">
            {/* 4:3 Aspect Ratio Grayscale Image with fallback */}
            <div className="w-full aspect-[4/3] border border-[#DDD7CC] bg-[#F4F1EA] overflow-hidden rounded-sm shadow-sm relative flex items-center justify-center">
              {!velskyError ? (
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Adelson-Velsky-G.Moscow-1980.jpg" 
                  alt="Georgy Adelson-Velsky" 
                  referrerPolicy="no-referrer"
                  onError={() => setVelskyError(true)}
                  className="w-full h-full object-cover grayscale"
                  style={{ filter: "grayscale(100%)" }}
                />
              ) : (
                /* Fallback classic monogram */
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-16 h-16 border border-[#DDD7CC] bg-[#FCFBF8] rounded-full flex items-center justify-center font-serif text-[#3F51B5] font-bold text-lg shadow-inner">
                    G.A.
                  </div>
                  <span className="text-[10px] text-[#666666] font-mono uppercase">Image Unavailable</span>
                </div>
              )}
            </div>
            <div className="text-center sm:text-left">
              <h5 className="text-sm font-bold font-serif text-[#232323]">
                Georgy Adelson-Velsky
              </h5>
              <span className="text-[11px] font-mono text-[#666666] block">
                1922 – 2014
              </span>
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#3F51B5] block mt-0.5 font-bold">
                Computer Scientist & Mathematician
              </span>
            </div>
          </div>

          {/* Evgenii Landis */}
          <div className="flex flex-col space-y-3">
            {/* 4:3 Aspect Ratio Grayscale Image with fallback */}
            <div className="w-full aspect-[4/3] border border-[#DDD7CC] bg-[#F4F1EA] overflow-hidden rounded-sm shadow-sm relative flex items-center justify-center">
              {!landisError ? (
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/2/23/%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D0%B9_%D0%9C%D0%B8%D1%85%D0%B0%D0%B9%D0%BB%D0%BE%D0%B2%D0%B8%D1%87_%D0%9B%D0%B0%D0%BD%D0%B4%D0%B8%D1%81.jpeg" 
                  alt="Evgenii Landis" 
                  referrerPolicy="no-referrer"
                  onError={() => setLandisError(true)}
                  className="w-full h-full object-cover grayscale"
                  style={{ filter: "grayscale(100%)" }}
                />
              ) : (
                /* Fallback classic monogram */
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-16 h-16 border border-[#DDD7CC] bg-[#FCFBF8] rounded-full flex items-center justify-center font-serif text-[#3F51B5] font-bold text-lg shadow-inner">
                    E.L.
                  </div>
                  <span className="text-[10px] text-[#666666] font-mono uppercase">Image Unavailable</span>
                </div>
              )}
            </div>
            <div className="text-center sm:text-left">
              <h5 className="text-sm font-bold font-serif text-[#232323]">
                Evgenii Landis
              </h5>
              <span className="text-[11px] font-mono text-[#666666] block">
                1921 – 1997
              </span>
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#3F51B5] block mt-0.5 font-bold">
                Mathematician & Computer Scientist
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
