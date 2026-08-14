"use client";

import React, { useState } from "react";
import { HelpCircle, CheckCircle2, XCircle, ChevronRight, RotateCcw } from "lucide-react";
import { ContentBlock } from "@/domain/models/lesson";

interface QuizContainerProps {
  questions: ContentBlock[];
}

export default function QuizContainer({ questions }: QuizContainerProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<boolean[]>([]); // Tracks true/false for each question
  const [quizFinished, setQuizFinished] = useState(false);

  if (questions.length === 0) return null;

  const currentQ = questions[activeIdx];
  const isCorrect = selectedIdx === currentQ.correctAnswerIndex;

  const handleSubmit = () => {
    if (selectedIdx === null || isSubmitted) return;
    setIsSubmitted(true);
    const newCorrect = selectedIdx === currentQ.correctAnswerIndex;
    if (newCorrect) {
      setScore((prev) => prev + 1);
    }
    setHistory((prev) => [...prev, newCorrect]);
  };

  const handleNext = () => {
    if (activeIdx + 1 < questions.length) {
      setActiveIdx((prev) => prev + 1);
      setSelectedIdx(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setActiveIdx(0);
    setSelectedIdx(null);
    setIsSubmitted(false);
    setScore(0);
    setHistory([]);
    setQuizFinished(false);
  };

  // 1. Render Summary Screen when finished
  if (quizFinished) {
    return (
      <div className="border border-border bg-card p-6 my-6 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-accent">Quiz Complete</span>
          <h3 className="text-xl font-bold font-serif text-foreground">Your Score</h3>
          <div className="flex justify-center items-center my-4">
            <div className="w-20 h-20 rounded-none border-2 border-accent flex flex-col justify-center items-center bg-accent/5">
              <span className="text-2xl font-bold text-foreground">{score}</span>
              <span className="text-[10px] text-secondary-foreground">of {questions.length}</span>
            </div>
          </div>
          <p className="text-xs md:text-sm font-serif text-secondary-foreground">
            {score === questions.length 
              ? "Flawless! You've mastered this topic." 
              : "Great effort! Review your answers below to learn more."}
          </p>
        </div>

        {/* Question Review List */}
        <div className="space-y-3 pt-4 border-t border-border/40">
          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Review Questions</h4>
          <div className="space-y-2.5">
            {questions.map((q, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-secondary-foreground leading-relaxed">
                {history[idx] ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold text-foreground font-serif">Q{idx + 1}: </span>
                  {q.question}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <button
          onClick={handleRestart}
          className="w-full flex items-center justify-center gap-2 border border-foreground bg-foreground text-background font-bold text-xs py-2.5 hover:bg-foreground/95 transition-all select-none"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Restart Quiz
        </button>
      </div>
    );
  }

  // 2. Render Active Question Card
  return (
    <div className="border border-border bg-card p-6 my-6 space-y-5">
      {/* Top Progress bar and header */}
      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-secondary-foreground select-none">
        <span className="flex items-center gap-1.5 text-foreground">
          <HelpCircle className="w-3.5 h-3.5 text-accent" />
          Check-in Quiz
        </span>
        <span>
          Question {activeIdx + 1} of {questions.length}
        </span>
      </div>

      {/* Progress tick bar */}
      <div className="w-full h-1 bg-border/40 flex gap-0.5">
        {questions.map((_, idx) => (
          <div 
            key={idx}
            className={`flex-1 h-full transition-all duration-300 ${
              idx < activeIdx 
                ? "bg-accent/60" 
                : idx === activeIdx 
                  ? "bg-accent" 
                  : "bg-transparent"
            }`}
          />
        ))}
      </div>

      {/* Question Text */}
      <div className="space-y-1">
        <h3 className="text-sm md:text-base font-bold font-serif text-foreground leading-snug">
          {currentQ.question}
        </h3>
      </div>

      {/* Options Stack */}
      <div className="flex flex-col gap-2">
        {currentQ.options?.map((option, idx) => {
          // Calculate border/bg styling based on submission state
          let optionStyle = "border-border hover:border-foreground/40 bg-card";
          if (selectedIdx === idx) {
            optionStyle = "border-foreground bg-foreground/5";
          }
          if (isSubmitted) {
            if (idx === currentQ.correctAnswerIndex) {
              optionStyle = "border-emerald-600 bg-emerald-500/10 text-emerald-950 dark:text-emerald-300 font-bold";
            } else if (selectedIdx === idx) {
              optionStyle = "border-rose-600 bg-rose-500/10 text-rose-950 dark:text-rose-300";
            } else {
              optionStyle = "border-border/60 opacity-60 bg-muted/10";
            }
          }

          return (
            <button
              key={idx}
              disabled={isSubmitted}
              onClick={() => setSelectedIdx(idx)}
              className={`w-full text-left px-4 py-3 border text-xs md:text-sm transition-all leading-normal flex items-start justify-between gap-3 ${optionStyle}`}
            >
              <span>{option}</span>
              {isSubmitted && idx === currentQ.correctAnswerIndex && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              )}
              {isSubmitted && selectedIdx === idx && idx !== currentQ.correctAnswerIndex && (
                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Interactive feedback & Actions */}
      <div className="pt-2">
        {!isSubmitted ? (
          <button
            disabled={selectedIdx === null}
            onClick={handleSubmit}
            className="w-full border border-foreground bg-foreground text-background font-bold text-xs py-2.5 hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all select-none"
          >
            Submit Answer
          </button>
        ) : (
          <div className="space-y-4">
            {/* Feedback callout */}
            <div className={`p-3 border text-xs font-serif leading-relaxed ${
              isCorrect 
                ? "border-emerald-600/30 bg-emerald-500/5 text-secondary-foreground" 
                : "border-rose-600/30 bg-rose-500/5 text-secondary-foreground"
            }`}>
              <span className="font-bold block uppercase text-[9px] tracking-wider mb-1">
                {isCorrect ? "Correct!" : "Incorrect"}
              </span>
              {isCorrect 
                ? "Excellent deduction! That is the right concept." 
                : `Not quite! The correct answer is: "${currentQ.options?.[currentQ.correctAnswerIndex ?? 0]}".`}
            </div>

            {/* Next button */}
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-1.5 border border-foreground bg-foreground text-background font-bold text-xs py-2.5 hover:bg-foreground/90 transition-all select-none"
            >
              {activeIdx + 1 === questions.length ? "Finish Quiz" : "Next Question"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
