"use client";

import React, { useState } from "react";
import { Check, Copy, AlertTriangle, Lightbulb, HelpCircle, CheckCircle2, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { ContentBlock } from "@/domain/models/lesson";
import CompilationFlowDrawing from "./drawings/CompilationFlowDrawing";
import RobotTeaDrawing from "./drawings/RobotTeaDrawing";
import TranslatorComparisonDrawing from "./drawings/TranslatorComparisonDrawing";
import CPPHistoryUsage from "./drawings/CPPHistoryUsage";
import LanguageGapDrawing from "./drawings/LanguageGapDrawing";
import IDEWorkspaceDrawing from "./drawings/IDEWorkspaceDrawing";
import SkeletonDrawing from "./drawings/SkeletonDrawing";
import StepByStepBreakdownDrawing from "./drawings/StepByStepBreakdownDrawing";
import NamespacesDrawing from "./drawings/NamespacesDrawing";
import ConfusionDrawing from "./drawings/ConfusionDrawing";
import SurnamesDrawing from "./drawings/SurnamesDrawing";
import StdNamespaceDrawing from "./drawings/StdNamespaceDrawing";
import InputOutputDrawing from "./drawings/InputOutputDrawing";
import CommentsDrawing from "./drawings/CommentsDrawing";
import QuizContainer from "./QuizContainer";
import SimulationEngine from "./simulation/SimulationEngine";
import HashingMappingDrawing from "./drawings/HashingMappingDrawing";
import CollisionResolutionDrawing from "./drawings/CollisionResolutionDrawing";
import CollisionClassificationDrawing from "./drawings/CollisionClassificationDrawing";
import ChainingDrawing from "./drawings/ChainingDrawing";
import ChainingSimulation from "./drawings/ChainingSimulation";
import LinearProbingDrawing from "./drawings/LinearProbingDrawing";
import LinearProbingSimulation from "./drawings/LinearProbingSimulation";
import QuadraticProbingDrawing from "./drawings/QuadraticProbingDrawing";
import QuadraticProbingSimulation from "./drawings/QuadraticProbingSimulation";
import DoubleHashingDrawing from "./drawings/DoubleHashingDrawing";
import DoubleHashingSimulation from "./drawings/DoubleHashingSimulation";
import SearchComparisonDrawing from "./drawings/SearchComparisonDrawing";
import DirectAddressTableDrawing from "./drawings/DirectAddressTableDrawing";
import WhyHashingDrawing from "./drawings/WhyHashingDrawing";
import CollisionConceptDrawing from "./drawings/CollisionConceptDrawing";
import HashPropertiesDrawing from "./drawings/HashPropertiesDrawing";
import HashingTechniquesDrawing from "./drawings/HashingTechniquesDrawing";
import DivisionMethodDrawing from "./drawings/DivisionMethodDrawing";
import MidSquareMethodDrawing from "./drawings/MidSquareMethodDrawing";
import FoldingMethodDrawing from "./drawings/FoldingMethodDrawing";
import ConsistentHashingDrawing from "./drawings/ConsistentHashingDrawing";
import HashingCodingPatternsDrawing from "./drawings/HashingCodingPatternsDrawing";
import MajorityCancellationDrawing from "./drawings/MajorityCancellationDrawing";
import RotateArrayReversalDrawing from "./drawings/RotateArrayReversalDrawing";
import StackPlatesDrawing from "./drawings/StackPlatesDrawing";
import StackArrayDrawing from "./drawings/StackArrayDrawing";
import StackLinkedListDrawing from "./drawings/StackLinkedListDrawing";
import MonotonicStackDrawing from "./drawings/MonotonicStackDrawing";
import ExpressionNotationDrawing from "./drawings/ExpressionNotationDrawing";
import HistogramStackDrawing from "./drawings/HistogramStackDrawing";
import StockProfitDrawing from "./drawings/StockProfitDrawing";
import StockProfitIIDrawing from "./drawings/StockProfitIIDrawing";
import PrefixSumBuildingDrawing from "./drawings/PrefixSumBuildingDrawing";
import PrefixSumIntroDrawing from "./drawings/PrefixSumIntroDrawing";
import SalesQueryComparisonDrawing from "./drawings/SalesQueryComparisonDrawing";
import InPlacePrefixSumIntroDrawing from "./drawings/InPlacePrefixSumIntroDrawing";
import InPlacePrefixSumBuildingDrawing from "./drawings/InPlacePrefixSumBuildingDrawing";
import RangeSumProblemDrawing from "./drawings/RangeSumProblemDrawing";
import SlidingWindowDiscovery from "./drawings/SlidingWindowDiscovery";
import TwoPointerIntroDrawing from "./drawings/TwoPointerIntroDrawing";
import LinkedListIntroDrawing from "./drawings/LinkedListIntroDrawing";
import AlgorithmCharacteristicsDrawing from "./drawings/AlgorithmCharacteristicsDrawing";
import AsymptoticBoundsDrawing from "./drawings/AsymptoticBoundsDrawing";
import AsymptoticConceptsDrawing from "./drawings/AsymptoticConceptsDrawing";
import AlgorithmRepresentationDrawing from "./drawings/AlgorithmRepresentationDrawing";
import ProblemSolutionsDrawing from "./drawings/ProblemSolutionsDrawing";
import AlgorithmLifecycleDrawing from "./drawings/AlgorithmLifecycleDrawing";
import CountingSortDrawing from "./drawings/CountingSortDrawing";
import CountingSortIntuitionDrawing from "./drawings/CountingSortIntuitionDrawing";
import BSTHeightDrawing from "./drawings/BSTHeightDrawing";
import BSTSearchDrawing from "./drawings/BSTSearchDrawing";
import AVLInventorsCard from "./drawings/AVLInventorsCard";
import AVLBalanceFactorDrawing from "./drawings/AVLBalanceFactorDrawing";
import AVLRotationsDrawing from "./drawings/AVLRotationsDrawing";
import AVLInsertionDrawing from "./drawings/AVLInsertionDrawing";
import UnbalancedThreeNodesDrawing from "./drawings/UnbalancedThreeNodesDrawing";
import AVLImbalanceFlowchartDrawing from "./drawings/AVLImbalanceFlowchartDrawing";
import AVLDeletionDrawing from "./drawings/AVLDeletionDrawing";

interface LessonRendererProps {
  content: ContentBlock[];
}

export default function LessonRenderer({ content }: LessonRendererProps) {
  const rendered: React.ReactNode[] = [];
  let currentMCQGroup: ContentBlock[] = [];

  const flushMCQGroup = (key: number) => {
    if (currentMCQGroup.length > 0) {
      const questions = [...currentMCQGroup];
      rendered.push(
        <div key={`quiz-${key}`} className="block-item">
          <QuizContainer questions={questions} />
        </div>
      );
      currentMCQGroup = [];
    }
  };

  content.forEach((block, idx) => {
    if (block.type === "mcq") {
      currentMCQGroup.push(block);
    } else {
      flushMCQGroup(idx);
      rendered.push(
        <div key={idx} className="block-item">
          {renderBlock(block)}
        </div>
      );
    }
  });
  flushMCQGroup(content.length);

  return <div className="space-y-6">{rendered}</div>;
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
      const isFormula = block.text?.startsWith("$$") && block.text?.endsWith("$$");
      if (isFormula) {
        const formulaContent = block.text?.slice(2, -2);
        return (
          <div className="w-full flex justify-center my-6 select-all">
            <div className="border-y border-border/80 py-3.5 px-8 text-base md:text-lg font-mono text-primary font-bold text-center bg-secondary/5 rounded-sm tracking-wide shadow-sm">
              {formulaContent}
            </div>
          </div>
        );
      }
      return (
        <p className="text-sm md:text-[16px] leading-relaxed text-foreground/90 font-serif my-4 w-full">
          {formatText(block.text || "")}
        </p>
      );

    case "callout":
      const calloutConfig = {
        important: {
          bg: "bg-warning/10 border-warning/30",
          border: "border-l-4 border-warning",
          icon: <AlertTriangle className="h-4 w-4 text-warning shrink-0" />,
          title: "Important"
        },
        tip: {
          bg: "bg-success/10 border-success/30",
          border: "border-l-4 border-success",
          icon: <Lightbulb className="h-4 w-4 text-success shrink-0" />,
          title: "Tip"
        },
        warning: {
          bg: "bg-error/10 border-error/30",
          border: "border-l-4 border-error",
          icon: <AlertTriangle className="h-4 w-4 text-error shrink-0" />,
          title: "Warning"
        }
      };

      const styleKey = (block.style || "tip") as keyof typeof calloutConfig;
      const config = calloutConfig[styleKey] || calloutConfig.tip;
      return (
        <div className={`p-4 border ${config.bg} ${config.border} rounded my-5 flex gap-3 items-start select-none`}>
          {config.icon}
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">
              {config.title}
            </span>
            <p className="text-xs md:text-sm font-serif text-secondary-foreground">
              {formatText(block.text || "")}
            </p>
          </div>
        </div>
      );

    case "complexity_card":
      return (
        <div className="w-full my-6 grid grid-cols-1 sm:grid-cols-2 gap-4 select-none font-sans text-left">
          {/* Time Complexity Card */}
          <div className="border border-[#DDD7CC] bg-[#FCFBF8] p-4 rounded-sm space-y-1.5 shadow-sm">
            <span className="text-[9px] uppercase font-extrabold tracking-wider text-[#3F51B5] block">
              Time Complexity
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black font-mono text-[#3F51B5]">
                {block.timeComplexity}
              </span>
              <span className="text-[9px] text-[#666666] italic">
                (Average Case)
              </span>
            </div>
            <p className="text-[11px] text-[#666666] leading-relaxed">
              {block.timeExplanation}
            </p>
          </div>

          {/* Space Complexity Card */}
          <div className="border border-[#DDD7CC] bg-[#FCFBF8] p-4 rounded-sm space-y-1.5 shadow-sm">
            <span className="text-[9px] uppercase font-extrabold tracking-wider text-[#2E7D32] block">
              Space Complexity
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black font-mono text-[#2E7D32]">
                {block.spaceComplexity}
              </span>
            </div>
            <p className="text-[11px] text-[#666666] leading-relaxed">
              {block.spaceExplanation}
            </p>
          </div>
        </div>
      );

    case "code":
      return <CodeBlock code={block.code || ""} language={block.language || "javascript"} />;

    case "table":
      return (
        <div className="w-full my-6 overflow-x-auto border border-[#DDD7CC]/85 bg-[#FCFBF8] rounded-sm shadow-sm select-all">
          <table className="min-w-full divide-y divide-[#DDD7CC] text-left text-xs md:text-sm font-serif">
            <thead className="bg-[#F4F1EA]/50 font-bold text-[#232323]">
              <tr>
                {block.headers?.map((header, idx) => (
                  <th key={idx} className="px-4 py-2.5 border-b border-[#DDD7CC] font-extrabold uppercase tracking-wide text-[10px]">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD7CC]/40 text-[#4A4A4A]">
              {block.rows?.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-[#F4F1EA]/10 transition-colors">
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="px-4 py-2.5 text-xs md:text-sm">
                      {formatText(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "mcq":
      return (
        <MCQBlock
          question={block.question || ""}
          options={block.options || []}
          correctAnswerIndex={block.correctAnswerIndex ?? 0}
        />
      );

    case "drawing":
      if (block.id === "compilation-flow") {
        return <CompilationFlowDrawing />;
      }
      if (block.id === "robot-tea") {
        return <RobotTeaDrawing />;
      }
      if (block.id === "translator-comparison") {
        return <TranslatorComparisonDrawing />;
      }
      if (block.id === "cpp-history-usage") {
        return <CPPHistoryUsage />;
      }
      if (block.id === "language-gap") {
        return <LanguageGapDrawing />;
      }
      if (block.id === "ide-workspace") {
        return <IDEWorkspaceDrawing />;
      }
      if (block.id === "skeleton-drawing") {
        return <SkeletonDrawing />;
      }
      if (block.id === "step-breakdown-drawing") {
        return <StepByStepBreakdownDrawing />;
      }
      if (block.id === "namespaces-drawing") {
        return <NamespacesDrawing />;
      }
      if (block.id === "confusion-drawing") {
        return <ConfusionDrawing />;
      }
      if (block.id === "surnames-drawing") {
        return <SurnamesDrawing />;
      }
      if (block.id === "std-namespace-drawing") {
        return <StdNamespaceDrawing />;
      }
      if (block.id === "input-output-drawing") {
        return <InputOutputDrawing />;
      }
      if (block.id === "comments-drawing") {
        return <CommentsDrawing />;
      }
      if (block.id === "hashing-mapping-drawing") {
        return <HashingMappingDrawing />;
      }
      if (block.id === "collision-resolution-drawing") {
        return <CollisionResolutionDrawing />;
      }
      if (block.id === "collision-classification-drawing") {
        return <CollisionClassificationDrawing />;
      }
      if (block.id === "chaining-drawing") {
        return <ChainingDrawing />;
      }
      if (block.id === "chaining-simulation") {
        return <ChainingSimulation />;
      }
      if (block.id === "linear-probing-drawing") {
        return <LinearProbingDrawing />;
      }
      if (block.id === "linear-probing-simulation") {
        return <LinearProbingSimulation />;
      }
      if (block.id === "quadratic-probing-drawing") {
        return <QuadraticProbingDrawing />;
      }
      if (block.id === "quadratic-probing-simulation") {
        return <QuadraticProbingSimulation />;
      }
      if (block.id === "double-hashing-drawing") {
        return <DoubleHashingDrawing />;
      }
      if (block.id === "double-hashing-simulation") {
        return <DoubleHashingSimulation />;
      }
      if (block.id === "search-comparison-drawing") {
        return <SearchComparisonDrawing />;
      }
      if (block.id === "direct-address-table-drawing") {
        return <DirectAddressTableDrawing />;
      }
      if (block.id === "why-hashing-drawing") {
        return <WhyHashingDrawing />;
      }
      if (block.id === "collision-concept-drawing") {
        return <CollisionConceptDrawing />;
      }
      if (block.id === "hash-properties-drawing") {
        return <HashPropertiesDrawing />;
      }
      if (block.id === "hashing-techniques-drawing") {
        return <HashingTechniquesDrawing />;
      }
      if (block.id === "division-method-drawing") {
        return <DivisionMethodDrawing />;
      }
      if (block.id === "midsquare-method-drawing") {
        return <MidSquareMethodDrawing />;
      }
      if (block.id === "folding-method-drawing") {
        return <FoldingMethodDrawing />;
      }
      if (block.id === "consistent-hashing-drawing") {
        return <ConsistentHashingDrawing />;
      }
      if (block.id === "hashing-coding-patterns-drawing") {
        return <HashingCodingPatternsDrawing />;
      }
      if (block.id === "majority-cancellation-drawing") {
        return <MajorityCancellationDrawing />;
      }
      if (block.id === "rotate-array-reversal-drawing") {
        return <RotateArrayReversalDrawing />;
      }
      if (block.id === "stack-plates-drawing") {
        return <StackPlatesDrawing />;
      }
      if (block.id === "stack-array-drawing") {
        return <StackArrayDrawing />;
      }
      if (block.id === "stack-linked-list-drawing") {
        return <StackLinkedListDrawing />;
      }
      if (block.id === "monotonic-stack-drawing") {
        return <MonotonicStackDrawing />;
      }
      if (block.id === "expression-notation-drawing") {
        return <ExpressionNotationDrawing />;
      }
      if (block.id === "histogram-stack-drawing") {
        return <HistogramStackDrawing />;
      }
      if (block.id === "stock-profit-drawing") {
        return <StockProfitDrawing />;
      }
      if (block.id === "stock-profit-ii-drawing") {
        return <StockProfitIIDrawing />;
      }
      if (block.id === "prefix-sum-building-drawing") {
        return <PrefixSumBuildingDrawing />;
      }
      if (block.id === "prefix-sum-intro-drawing") {
        return <PrefixSumIntroDrawing />;
      }
      if (block.id === "bst-height-drawing") {
        return <BSTHeightDrawing />;
      }
      if (block.id === "bst-search-drawing") {
        return <BSTSearchDrawing />;
      }
      if (block.id === "avl-inventors-card") {
        return <AVLInventorsCard />;
      }
      if (block.id === "avl-balance-factor-drawing") {
        return <AVLBalanceFactorDrawing />;
      }
      if (block.id === "avl-rotations-drawing") {
        return <AVLRotationsDrawing />;
      }
      if (block.id === "avl-insertion-drawing") {
        return <AVLInsertionDrawing />;
      }
      if (block.id === "avl-deletion-drawing") {
        return <AVLDeletionDrawing />;
      }
      if (block.id === "unbalanced-three-nodes-drawing") {
        return <UnbalancedThreeNodesDrawing />;
      }
      if (block.id === "avl-imbalance-flowchart-drawing") {
        return <AVLImbalanceFlowchartDrawing />;
      }
      if (block.id === "sales-query-comparison-drawing") {
        return <SalesQueryComparisonDrawing />;
      }
      if (block.id === "in-place-prefix-sum-intro-drawing") {
        return <InPlacePrefixSumIntroDrawing />;
      }
      if (block.id === "in-place-prefix-sum-building-drawing") {
        return <InPlacePrefixSumBuildingDrawing />;
      }
      if (block.id === "range-sum-problem-drawing") {
        return <RangeSumProblemDrawing />;
      }
      if (block.id === "sliding-window-discovery") {
        return <SlidingWindowDiscovery />;
      }
      if (block.id === "two-pointer-intro-drawing") {
        return <TwoPointerIntroDrawing />;
      }
      if (block.id === "linked-list-intro-drawing") {
        return <LinkedListIntroDrawing />;
      }
      if (block.id === "algorithm-characteristics-drawing") {
        return <AlgorithmCharacteristicsDrawing />;
      }
      if (block.id === "asymptotic-bounds-drawing") {
        return <AsymptoticBoundsDrawing />;
      }
      if (block.id === "algorithm-representation-drawing") {
        return <AlgorithmRepresentationDrawing />;
      }
      if (block.id === "problem-solutions-drawing") {
        return <ProblemSolutionsDrawing />;
      }
      if (block.id === "algorithm-lifecycle-drawing") {
        return <AlgorithmLifecycleDrawing />;
      }
      if (block.id === "counting-sort-drawing") {
        return <CountingSortDrawing />;
      }
      if (block.id === "counting-sort-intuition-drawing") {
        return <CountingSortIntuitionDrawing />;
      }
      if (block.id === "asymptotic-concepts-drawing") {
        return <AsymptoticConceptsDrawing />;
      }
      return null;

    case "video_layout":
      return <VideoLayoutBlock />;

    case "slide_deck":
      return <SlideDeckBlock />;

    case "code_comparison":
      return (
        <CodeComparisonBlock
          codeLeft={block.codeLeft || ""}
          codeRight={block.codeRight || ""}
          labelLeft={block.labelLeft || ""}
          labelRight={block.labelRight || ""}
          language={block.language || "cpp"}
        />
      );

    case "syntax_explanation":
      return (
        <div className="space-y-4 my-5 select-none">
          {block.items?.map((item, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-10 gap-4 items-stretch border border-border/60 bg-[#FCFBF8] rounded p-3 shadow-sm hover:border-primary/25 transition-colors">
              {/* Syntax on Left */}
              <div className="md:col-span-4 flex items-center bg-secondary/15 border border-border/30 rounded px-3 py-2 font-mono text-xs font-semibold text-foreground overflow-x-auto select-all">
                {colorizeCode(item.syntax || "", "cpp")}
              </div>
              {/* Explanation on Right */}
              <div className="md:col-span-6 flex items-center text-xs md:text-sm text-secondary-foreground leading-relaxed font-serif">
                {formatText(item.explanation || "")}
              </div>
            </div>
          ))}
        </div>
      );

    case "simulation":
      if (block.simulationData) {
        return <SimulationEngine data={block.simulationData} />;
      }
      return null;

    case "progressive_hints":
      return <ProgressiveHintsBlock hints={block.hints || []} />;

    default:
      return null;
  }
}

/* Helper Syntax Highlighting Function for C++ (aligned to light/white theme) */
function colorizeCode(code: string, language: string) {
  const lang = language.toLowerCase();
  if (lang !== "cpp" && lang !== "c++" && lang !== "text" && lang !== "json") {
    return <span>{code}</span>;
  }

  const lines = code.split("\n");
  
  return (
    <>
      {lines.map((line, idx) => {
        // Comment matching
        if (line.trim().startsWith("//")) {
          return (
            <div key={idx} className="text-[#1a7f37]">
              {line}
            </div>
          );
        }
        
        const elements: React.ReactNode[] = [];
        let remaining = line;
        
        // Match: comments, string literals, headers inside include, keywords, numbers
        const tokenRegex = /(\/\/.*|"(?:\\.|[^\\"])*"|'[^']*'|<[a-zA-Z0-9_\/.]+>|\b(?:#include|int|double|float|char|void|bool|class|struct|public|private|protected|return|using|namespace|const|if|else|for|while|do|switch|case|break|continue|new|delete)\b|\b\d+\b)/g;
        
        let match;
        let lastIndex = 0;
        let key = 0;
        
        while ((match = tokenRegex.exec(remaining)) !== null) {
          const matchIndex = match.index;
          const matchText = match[0];
          
          if (matchIndex > lastIndex) {
            elements.push(remaining.substring(lastIndex, matchIndex));
          }
          
          if (matchText.startsWith("//")) {
            elements.push(<span key={key++} className="text-[#1a7f37]">{matchText}</span>);
          } else if (matchText.startsWith('"') || matchText.startsWith("'")) {
            elements.push(<span key={key++} className="text-[#cf222e]">{matchText}</span>);
          } else if (matchText.startsWith("<") && (line.includes("#include") || line.includes("import"))) {
            elements.push(<span key={key++} className="text-[#cf222e]">{matchText}</span>);
          } else if (/\b(?:#include|int|double|float|char|void|bool|class|struct|public|private|protected|return|using|namespace|const|if|else|for|while|do|switch|case|break|continue|new|delete)\b/.test(matchText)) {
            elements.push(<span key={key++} className="text-[#0550ae] font-bold">{matchText}</span>);
          } else if (/^\d+$/.test(matchText)) {
            elements.push(<span key={key++} className="text-[#8250df]">{matchText}</span>);
          } else {
            elements.push(matchText);
          }
          
          lastIndex = tokenRegex.lastIndex;
        }
        
        if (lastIndex < remaining.length) {
          elements.push(remaining.substring(lastIndex));
        }
        
        return (
          <div key={idx} className="min-h-[1.1rem]">
            {elements.length > 0 ? elements : " "}
          </div>
        );
      })}
    </>
  );
}

/* Helper Code Block Component with Copy Action (White/Light Theme Aligned) */
function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-border/80 bg-[#f8f9fa] rounded-md my-5 overflow-hidden font-mono text-[11px] md:text-xs text-[#24292f] shadow-sm w-full">
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#f1f3f5] border-b border-border/70 select-none">
        <span className="text-[9px] font-bold text-secondary-foreground uppercase tracking-widest">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[9px] font-bold text-secondary-foreground hover:text-foreground outline-none focus-visible:ring-1 focus-visible:ring-foreground py-0.5 px-1.5 border border-border/40 rounded-sm bg-background/50 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-700" />
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
      <pre className="p-3 overflow-x-auto leading-relaxed select-text whitespace-pre-wrap break-words bg-[#fafafa]">
        <code>{colorizeCode(code, language)}</code>
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
    <div className="border border-border/80 bg-card/30 p-5 rounded-md my-6 space-y-4 select-none">
      <div className="flex items-start gap-2.5">
        <HelpCircle className="h-4.5 w-4.5 text-secondary-foreground shrink-0 mt-0.5" />
        <h4 className="text-sm md:text-base font-bold text-foreground font-serif">
          {question}
        </h4>
      </div>

      <div className="space-y-2">
        {options.map((option, idx) => {
          let optionBorder = "border-border/80 hover:border-foreground/45";
          let optionBg = "bg-background/20";
          let markerIcon = null;

          if (selectedIdx === idx) {
            optionBorder = "border-foreground ring-1 ring-foreground/10";
            optionBg = "bg-secondary/45";
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
            className="px-4 py-2 border border-foreground bg-foreground text-background font-bold text-xs uppercase tracking-wider rounded-sm outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:opacity-40 disabled:pointer-events-none hover:bg-foreground/90 transition-opacity cursor-pointer"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleClear}
            className="px-4 py-2 border border-border bg-card hover:bg-secondary/30 text-secondary-foreground hover:text-foreground font-bold text-xs uppercase tracking-wider rounded-sm outline-none focus-visible:ring-1 focus-visible:ring-foreground transition-colors cursor-pointer"
          >
            Reset Quiz
          </button>
        )}
      </div>
    </div>
  );
}

/* Helper Video Split Layout Component */
function VideoLayoutBlock() {
  const [activeTab, setActiveTab] = useState<"vscode" | "mingw">("vscode");

  const videoSrc =
    activeTab === "vscode"
      ? "https://www.youtube.com/embed/DoLYVXR9SSc"
      : "https://www.youtube.com/embed/oC69vlWofJQ";

  const videoTitle =
    activeTab === "vscode"
      ? "VS Code Installation Tutorial"
      : "MinGW C++ Compiler Setup Tutorial";

  const videoCaption =
    activeTab === "vscode"
      ? "Follow along with Amit Thinks to install the VS Code editor on Windows."
      : "Follow along with Tariq Brown, Software Engineer at Microsoft, to configure the compiler.";

  return (
    <div className="w-full my-6 border border-border bg-card overflow-hidden">
      <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-border">
        {/* Left Side: YouTube Video Player */}
        <div className="w-full lg:w-1/2 p-4 flex flex-col justify-center bg-secondary/5">
          <div className="text-[10px] font-extrabold text-rose-600 uppercase tracking-wider mb-2 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
            Video Walkthrough
          </div>
          <div className="relative w-full aspect-video border border-border bg-black shadow-md">
            <iframe
              key={videoSrc} // Force iframe reload when source changes
              src={videoSrc}
              title={videoTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
          <div className="mt-3 text-[11px] text-secondary-foreground text-center font-serif leading-relaxed">
            {videoCaption}
          </div>
        </div>

        {/* Right Side: Step-by-Step Instructions */}
        <div className="w-full lg:w-1/2 flex flex-col bg-card">
          {/* Tab Headers */}
          <div className="flex border-b border-border bg-secondary/10 select-none">
            <button
              onClick={() => setActiveTab("vscode")}
              className={`flex-1 py-3 px-4 text-center text-xs font-bold uppercase tracking-wider transition-colors outline-none focus-visible:bg-secondary/20 cursor-pointer ${
                activeTab === "vscode"
                  ? "bg-card text-foreground border-b-2 border-primary"
                  : "text-secondary-foreground hover:text-foreground hover:bg-secondary/5"
              }`}
            >
              1. VS Code Setup
            </button>
            <button
              onClick={() => setActiveTab("mingw")}
              className={`flex-1 py-3 px-4 text-center text-xs font-bold uppercase tracking-wider transition-colors outline-none focus-visible:bg-secondary/20 cursor-pointer ${
                activeTab === "mingw"
                  ? "bg-card text-foreground border-b-2 border-primary"
                  : "text-secondary-foreground hover:text-foreground hover:bg-secondary/5"
              }`}
            >
              2. MinGW Compiler Setup
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-5 flex-1 overflow-y-auto max-h-[360px] font-serif text-sm">
            {activeTab === "vscode" ? (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h4 className="text-sm font-extrabold text-foreground border-b border-border/50 pb-1.5 uppercase tracking-wide">
                  Installing the Editor & Extension
                </h4>
                <ol className="space-y-3.5 list-decimal pl-4 text-foreground/90 leading-relaxed text-xs md:text-sm">
                  <li>
                    <strong className="text-foreground">Download VS Code:</strong>
                    <div className="text-secondary-foreground mt-0.5">
                      Go to{" "}
                      <a
                        href="https://code.visualstudio.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-semibold inline-flex items-center gap-0.5"
                      >
                        code.visualstudio.com
                      </a>{" "}
                      to download and get the latest version for Windows.
                    </div>
                  </li>
                  <li>
                    <strong className="text-foreground">Run the Installer:</strong>
                    <div className="text-secondary-foreground mt-0.5">
                      Open the downloaded installer file, accept the license agreement, and click <span className="font-semibold text-foreground">Next</span>.
                    </div>
                  </li>
                  <li>
                    <strong className="text-foreground">Complete Onscreen Steps:</strong>
                    <div className="text-secondary-foreground mt-0.5">
                      The installation needs about 373 MB of disk space. Click <span className="font-semibold text-foreground">Next</span> through the destination folder screen. You can optionally check the box to create a desktop shortcut icon.
                    </div>
                  </li>
                  <li>
                    <strong className="text-foreground">Perform Installation:</strong>
                    <div className="text-secondary-foreground mt-0.5">
                      Click <span className="font-semibold text-foreground">Install</span> to finish. Once done, uncheck the launch checkbox and click <span className="font-semibold text-foreground">Finish</span> (you can open VS Code anytime from the Windows Start menu by typing "VS Code").
                    </div>
                  </li>
                  <li>
                    <strong className="text-foreground">Install C/C++ Extension:</strong>
                    <div className="text-secondary-foreground mt-0.5">
                      Open VS Code, click the <span className="font-semibold text-foreground">Extensions</span> icon on the left sidebar (looks like four small blocks), search for <span className="font-semibold text-foreground">"C/C++"</span> (by Microsoft), and click <span className="font-semibold text-foreground">Install</span>. This connects the editor to your compiler.
                    </div>
                  </li>
                </ol>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h4 className="text-sm font-extrabold text-foreground border-b border-border/50 pb-1.5 uppercase tracking-wide">
                  Setting Up the Compiler Toolchain
                </h4>
                <ol className="space-y-3 list-decimal pl-4 text-foreground/90 leading-relaxed text-xs md:text-sm">
                  <li>
                    <strong className="text-foreground">Download MSYS2:</strong>
                    <div className="text-secondary-foreground mt-0.5">
                      Visit{" "}
                      <a
                        href="https://www.msys2.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-semibold"
                      >
                        msys2.org
                      </a>{" "}
                      to download the installer. Run it and follow the onscreen setup instructions.
                    </div>
                  </li>
                  <li>
                    <strong className="text-foreground">Run Install Command:</strong>
                    <div className="text-secondary-foreground mt-0.5">
                      Open MSYS2 (a terminal will pop up) and paste the following command:
                      <div className="my-1.5 p-2 bg-secondary/20 border border-border font-mono text-[11px] select-all break-all text-foreground leading-tight">
                        pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain
                      </div>
                      Press <span className="font-semibold text-foreground">Enter</span> to accept packages, type <span className="font-semibold text-foreground">y</span>, and press <span className="font-semibold text-foreground">Enter</span> to run.
                    </div>
                  </li>
                  <li>
                    <strong className="text-foreground">Update System PATH:</strong>
                    <div className="text-secondary-foreground mt-0.5">
                      Search for <span className="italic">"edit environment variables for your account"</span> in the Windows search bar. Click Path, click Edit, click New, click Browse, navigate to:
                      <code className="block mt-1 p-1 bg-secondary/15 font-mono text-[11px] text-foreground select-all border border-border/50">
                        C:\msys64\ucrt64\bin
                      </code>
                      Select this folder, click OK, OK, and OK to save.
                    </div>
                  </li>
                  <li>
                    <strong className="text-foreground">Double-Check compiler in Terminal:</strong>
                    <div className="text-secondary-foreground mt-0.5">
                      Open a new Command Prompt (<kbd className="bg-secondary/10 px-1 border rounded">cmd</kbd>) and type:
                      <code className="block mt-1 p-1 bg-secondary/15 font-mono text-[11px] text-foreground">g++ --version</code>
                      It should print the compiler version details.
                    </div>
                  </li>
                  <li>
                    <strong className="text-foreground">Configure VS Code:</strong>
                    <div className="text-secondary-foreground mt-0.5">
                      In VS Code, press <kbd className="bg-secondary/10 px-1 border rounded">Ctrl + Shift + P</kbd>, search for <span className="font-semibold text-foreground">"Select IntelliSense Configuration"</span>, and pick the GCC compiler from the dropdown list.
                    </div>
                  </li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Helper Video Slide Deck Component */
function SlideDeckBlock() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "1. Open a Folder",
      desc: "Create a new folder on your computer named 'MyC++Projects'. In VS Code, go to the top menu and select File > Open Folder. Select this folder to open your workspace.",
      image: "/images/setup/step1.png"
    },
    {
      title: "2. Create a C++ File",
      desc: "In the VS Code sidebar explorer, click the 'New File' icon (or press Ctrl + N). Type 'main.cpp' and press Enter. The '.cpp' extension tells VS Code this is a C++ code file.",
      image: "/images/setup/step2.png"
    },
    {
      title: "3. Write Your Code",
      desc: "Paste this simple starter code into main.cpp. The '#include <iostream>' library lets us print text, 'int main()' is where execution starts, and 'std::cout' prints Hello World to the screen.",
      image: "/images/setup/step3.png"
    },
    {
      title: "4. Compile (Translate) Code",
      desc: "Open the built-in terminal using Ctrl + ~ (or Terminal > New Terminal). Type 'g++ main.cpp -o main' and press Enter. This tells the compiler to translate main.cpp into a runnable file named main.exe.",
      image: "/images/setup/step4.png"
    },
    {
      title: "5. Run the Executable",
      desc: "Now, run the translated file. Type '.\\main' in the terminal and press Enter. You should see 'Hello World!' print to your terminal screen. Your C++ program successfully executed!",
      image: "/images/setup/step5.png"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full my-8 border border-border bg-card overflow-hidden select-none">
      {/* Header bar of Slide Deck / presentation box */}
      <div className="flex justify-between items-center px-4 py-2.5 bg-secondary/15 border-b border-border text-xs font-bold uppercase tracking-wider text-secondary-foreground">
        <span>Step-by-Step Presentation</span>
        <span className="font-mono text-xs font-bold">Step {currentStep + 1} of {steps.length}</span>
      </div>

      <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-border">
        {/* Left Side: Real IDE Screen Image */}
        <div className="w-full lg:w-1/2 h-[260px] md:h-[300px] flex items-center justify-center p-3 md:p-5 bg-secondary/5 overflow-hidden">
          <div className="w-full h-full border border-border bg-black shadow-2xl overflow-hidden relative flex items-center justify-center">
            <img
              src={steps[currentStep].image}
              alt={steps[currentStep].title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        {/* Right Side: Step Text Description and Slider Controls */}
        <div className="w-full lg:w-1/2 p-5 flex flex-col justify-between bg-card text-foreground font-serif">
          <div className="space-y-3">
            <span className="text-[10px] font-extrabold text-[#0550ae] uppercase tracking-widest">
              Execution Sequence
            </span>
            <h3 className="text-base md:text-lg font-black text-foreground">
              {steps[currentStep].title}
            </h3>
            <p className="text-xs md:text-sm text-foreground/85 leading-relaxed">
              {steps[currentStep].desc}
            </p>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/50">
            {/* Dots */}
            <div className="flex gap-2">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all border border-border/60 cursor-pointer ${
                    currentStep === idx ? "bg-primary scale-110" : "bg-secondary/20 hover:bg-secondary/40"
                  }`}
                />
              ))}
            </div>

            {/* Next/Prev Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 border border-border bg-card hover:bg-secondary/20 text-xs font-bold uppercase tracking-wider rounded-sm outline-none focus-visible:ring-1 focus-visible:ring-foreground transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Prev</span>
              </button>
              <button
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 border border-foreground bg-foreground text-background hover:bg-foreground/90 text-xs font-bold uppercase tracking-wider rounded-sm outline-none focus-visible:ring-1 focus-visible:ring-foreground transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Helper Side-by-Side Code Comparison Component */
function CodeComparisonBlock({
  codeLeft,
  codeRight,
  labelLeft,
  labelRight,
  language,
}: {
  codeLeft: string;
  codeRight: string;
  labelLeft: string;
  labelRight: string;
  language: string;
}) {
  return (
    <div className="w-full my-6 select-none flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Code Column */}
        <div className="flex flex-col">
          <div 
            className="text-[11px] font-extrabold text-[#0550ae] uppercase tracking-wider mb-1.5"
            style={{ fontFamily: "'Caveat', cursive", fontSize: "16px" }}
          >
            {labelLeft}
          </div>
          <CodeBlock code={codeLeft} language={language} />
        </div>

        {/* Right Code Column */}
        <div className="flex flex-col">
          <div 
            className="text-[11px] font-extrabold text-[#0550ae] uppercase tracking-wider mb-1.5"
            style={{ fontFamily: "'Caveat', cursive", fontSize: "16px" }}
          >
            {labelRight}
          </div>
          <CodeBlock code={codeRight} language={language} />
        </div>
      </div>
    </div>
  );
}

/* Helper to parse and highlight inline backticks and double asterisks */
function formatText(text: string): React.ReactNode {
  if (!text) return "";
  
  // Split text by code tags (backticks) or bold tags (double asterisks)
  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  const parts = text.split(regex);
  
  return parts.map((part, idx) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code 
          key={idx} 
          className="mx-0.5 px-1 py-0.5 bg-secondary/50 border border-border/50 text-foreground font-mono text-[13px] rounded-sm select-all"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong 
          key={idx} 
          className="font-black text-foreground bg-accent/25 px-1"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

/* Reusable Progressive Hints Component */
function ProgressiveHintsBlock({ hints }: { hints: string[] }) {
  const [revealedCount, setRevealedCount] = useState(0);

  const handleRevealNext = () => {
    if (revealedCount < hints.length) {
      setRevealedCount(revealedCount + 1);
    }
  };

  const handleReset = () => {
    setRevealedCount(0);
  };

  return (
    <div className="border border-border/80 bg-[#FCFBF8] p-5 rounded-sm my-6 space-y-4 select-none">
      <div className="flex items-center justify-between border-b border-border/40 pb-2">
        <span className="text-[10px] font-bold text-secondary-foreground uppercase tracking-widest flex items-center gap-1.5">
          <Lightbulb className="h-4 w-4 text-amber-500 shrink-0" /> Progressive Hint System
        </span>
        <span className="text-[10px] font-mono text-muted-foreground/60 font-bold">
          Revealed: {revealedCount} of {hints.length}
        </span>
      </div>

      {revealedCount === 0 ? (
        <p className="text-xs md:text-sm font-serif text-secondary-foreground italic leading-relaxed">
          Stuck on the problem? Click below to reveal hints one-by-one. Try to think through each hint before revealing the next one!
        </p>
      ) : (
        <div className="space-y-2.5">
          {hints.slice(0, revealedCount).map((hint, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 text-xs md:text-sm text-foreground/90 font-serif leading-relaxed"
            >
              <span className="w-5 h-5 rounded-full bg-secondary/80 border border-border/60 flex items-center justify-center font-mono font-bold text-[10px] text-secondary-foreground shrink-0 mt-0.5 select-none">
                {idx + 1}
              </span>
              <span className="flex-1 pt-0.5">{formatText(hint)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 pt-1">
        {revealedCount < hints.length ? (
          <button
            onClick={handleRevealNext}
            className="px-4 py-2 border border-[#3F51B5] bg-[#3F51B5] hover:bg-[#3F51B5]/90 text-white font-bold text-xs uppercase tracking-wider rounded-sm outline-none transition-colors cursor-pointer"
          >
            {revealedCount === 0 ? "Get a Hint" : "Next Hint"}
          </button>
        ) : (
          <div className="flex items-center justify-between w-full">
            <span className="text-[11px] text-emerald-700 font-serif font-bold italic">
              All hints revealed. Keep practicing!
            </span>
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-border bg-card hover:bg-[#F4F1EA]/50 text-secondary-foreground hover:text-foreground font-bold text-xs uppercase tracking-wider rounded-sm outline-none transition-colors cursor-pointer"
            >
              Reset Hints
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
