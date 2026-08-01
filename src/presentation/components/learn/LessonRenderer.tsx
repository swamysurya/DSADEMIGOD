"use client";

import React, { useState } from "react";
import { Check, Copy, AlertTriangle, Lightbulb, HelpCircle, CheckCircle2, XCircle } from "lucide-react";
import { ContentBlock } from "@/domain/models/lesson";

interface LessonRendererProps {
  content: ContentBlock[];
}

export default function LessonRenderer({ content }: LessonRendererProps) {
  return (
    <div className="space-y-6">
      {content.map((block, idx) => (
        <div key={idx} className="block-item">
          {renderBlock(block)}
        </div>
      ))}
    </div>
  );
}

function renderBlock(block: ContentBlock) {
  switch (block.type) {
    case "heading":
      const HeadingTag = block.level === 3 ? "h3" : "h2";
      const headingClass =
        block.level === 3
          ? "text-base md:text-lg font-extrabold font-serif pt-6 pb-2 text-foreground"
          : "text-xl md:text-2xl font-black font-serif pt-8 pb-3 border-b border-border/80 text-foreground";
      return (
        <HeadingTag id={block.id} className={headingClass}>
          {block.text}
        </HeadingTag>
      );

    case "paragraph":
      return (
        <p className="text-sm md:text-[16px] leading-relaxed text-foreground/90 font-serif my-4">
          {block.text}
        </p>
      );

    case "callout":
      const calloutConfig = {
        important: {
          bg: "bg-accent/20 border-amber-600/30",
          border: "border-l-4 border-amber-500",
          icon: <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />,
          title: "Important"
        },
        tip: {
          bg: "bg-emerald-500/5 border-emerald-600/20",
          border: "border-l-4 border-emerald-500",
          icon: <Lightbulb className="h-4 w-4 text-emerald-600 shrink-0" />,
          title: "Tip"
        },
        warning: {
          bg: "bg-rose-500/5 border-rose-600/20",
          border: "border-l-4 border-rose-500",
          icon: <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0" />,
          title: "Warning"
        }
      };

      const config = calloutConfig[block.style || "tip"];
      return (
        <div className={`p-4 border ${config.bg} ${config.border} rounded-sm my-5 flex gap-3 items-start select-none`}>
          {config.icon}
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">
              {config.title}
            </span>
            <p className="text-xs md:text-sm font-serif text-secondary-foreground">
              {block.text}
            </p>
          </div>
        </div>
      );

    case "code":
      return <CodeBlock code={block.code || ""} language={block.language || "javascript"} />;

    case "mcq":
      return (
        <MCQBlock
          question={block.question || ""}
          options={block.options || []}
          correctAnswerIndex={block.correctAnswerIndex ?? 0}
        />
      );

    default:
      return null;
  }
}

/* Helper Code Block Component with Copy Action */
function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-border/80 bg-card rounded-sm my-5 overflow-hidden font-mono text-xs md:text-sm">
      {/* Code Header bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-secondary/30 border-b border-border/80 select-none">
        <span className="text-[10px] font-bold text-secondary-foreground uppercase tracking-widest">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[10px] font-bold text-secondary-foreground hover:text-foreground outline-none focus-visible:ring-1 focus-visible:ring-foreground py-0.5 px-1.5 border border-border/40 rounded-xs bg-background/50"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-600" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Pre code */}
      <pre className="p-4 overflow-x-auto leading-relaxed text-foreground select-text whitespace-pre bg-card/45">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* Helper MCQ Block Component with Feedback state */
function MCQBlock({
  question,
  options,
  correctAnswerIndex,
}: {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleOptionClick = (idx: number) => {
    if (submitted) return;
    setSelectedIdx(idx);
  };

  const handleClear = () => {
    setSelectedIdx(null);
    setSubmitted(false);
  };

  return (
    <div className="border border-border/80 bg-card/30 p-5 rounded-sm my-6 space-y-4 select-none">
      <div className="flex items-start gap-2.5">
        <HelpCircle className="h-4.5 w-4.5 text-secondary-foreground shrink-0 mt-0.5" />
        <h4 className="text-sm md:text-base font-bold text-foreground font-serif">
          {question}
        </h4>
      </div>

      <div className="space-y-2">
        {options.map((option, idx) => {
          let optionBorder = "border-border/80 hover:border-foreground/40";
          let optionBg = "bg-background/20";
          let markerIcon = null;

          if (selectedIdx === idx) {
            optionBorder = "border-foreground ring-1 ring-foreground/10";
            optionBg = "bg-secondary/40";
          }

          if (submitted) {
            if (idx === correctAnswerIndex) {
              optionBorder = "border-emerald-600 ring-1 ring-emerald-500/20";
              optionBg = "bg-emerald-500/5";
              markerIcon = <CheckCircle2 className="h-4.5 w-4.5 text-emerald-700 shrink-0" />;
            } else if (selectedIdx === idx) {
              optionBorder = "border-rose-500 ring-1 ring-rose-500/20";
              optionBg = "bg-rose-500/5";
              markerIcon = <XCircle className="h-4.5 w-4.5 text-rose-600 shrink-0" />;
            }
          }

          return (
            <button
              key={idx}
              disabled={submitted}
              onClick={() => handleOptionClick(idx)}
              className={`
                w-full flex items-center justify-between gap-3 p-3.5 border rounded-sm text-left text-xs md:text-sm font-semibold
                transition-all duration-150 outline-none
                ${optionBorder} ${optionBg}
                ${!submitted ? "cursor-pointer" : "cursor-default"}
                focus-visible:ring-1 focus-visible:ring-foreground
              `}
            >
              <span>{option}</span>
              {markerIcon}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 pt-2">
        {!submitted ? (
          <button
            disabled={selectedIdx === null}
            onClick={() => setSubmitted(true)}
            className="px-4 py-2 border border-foreground bg-foreground text-background font-bold text-xs uppercase tracking-wider rounded-sm outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:opacity-40 disabled:pointer-events-none hover:bg-foreground/90 transition-opacity"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleClear}
            className="px-4 py-2 border border-border bg-card hover:bg-secondary/30 text-secondary-foreground hover:text-foreground font-bold text-xs uppercase tracking-wider rounded-sm outline-none focus-visible:ring-1 focus-visible:ring-foreground transition-colors"
          >
            Reset Quiz
          </button>
        )}
      </div>
    </div>
  );
}
