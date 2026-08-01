export type DifficultyLevel = "Beginner" | "Easy" | "Medium" | "Hard" | "Legendary";

export interface LearningLevel {
  id: string;
  title: string;
  shortDescription: string;
  difficulty: DifficultyLevel;
  progress: number; // 0 to 100
  about: string;
  whatYouWillLearn: string[];
  duration: string; // e.g., "15 hours", "3 weeks"
  modulesCount: number;
  projectsCount: number;
  certificateAvailable: boolean;
  startUrl: string; // target path/URL for start button
}
