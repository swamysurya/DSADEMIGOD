export interface LessonLink {
  id: string;
  title: string;
  estimatedTime: string;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: LessonLink[];
}

export interface SubjectCurriculum {
  id: string;
  title: string;
  chapters: Chapter[];
}
