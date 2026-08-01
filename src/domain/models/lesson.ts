export type BlockType = "heading" | "paragraph" | "callout" | "code" | "mcq" | "practice";

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
}

export interface Lesson {
  id: string;
  title: string;
  subjectId: string;
  nextLessonId: string | null;
  prevLessonId: string | null;
  content: ContentBlock[];
}
