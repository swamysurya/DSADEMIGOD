export type BlockType = "heading" | "paragraph" | "callout" | "code" | "mcq" | "practice" | "drawing" | "video_layout" | "slide_deck" | "code_comparison" | "simulation" | "syntax_explanation" | "complexity_card" | "progressive_hints" | "table";

export interface MemoryVariable {
  name: string;
  type: string;
  value: string;
  address: string;
}

export interface SimulationStep {
  line: number;
  explanation: string;
  variables: MemoryVariable[];
  terminalOutput?: string;
}

export interface SimulationData {
  code: string;
  language: string;
  visualizer: "variables" | "array" | "list";
  steps: SimulationStep[];
}

export interface ContentBlock {
  type: BlockType;
  id?: string;
  level?: number; // e.g. 2, 3
  text?: string;
  style?: "important" | "tip" | "warning"; // for callouts
  language?: string; // for code
  code?: string; // for code
  question?: string; // for MCQ
  options?: string[]; // for MCQ
  correctAnswerIndex?: number; // for MCQ
  description?: string; // for practice
  initialCode?: string; // for practice
  codeLeft?: string;
  codeRight?: string;
  labelLeft?: string;
  labelRight?: string;
  simulationData?: SimulationData;
  items?: { syntax: string; explanation: string; }[];
  timeComplexity?: string;
  spaceComplexity?: string;
  timeExplanation?: string;
  spaceExplanation?: string;
  hints?: string[]; // for progressive hints
  headers?: string[];
  rows?: string[][];
}

export interface Lesson {
  id: string;
  title: string;
  subjectId: string;
  nextLessonId: string | null;
  prevLessonId: string | null;
  content: ContentBlock[];
}
