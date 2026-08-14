import { redirect } from "next/navigation";
import curriculumData from "@/infrastructure/data/curriculum.json";
import roadmapData from "@/infrastructure/data/roadmap.json";
import { lessonsRegistry } from "@/infrastructure/data/lessonsRegistry";
import { SubjectCurriculum } from "@/domain/models/subject";
import { LearningLevel } from "@/domain/models/roadmap";
import ComingSoonLevel from "@/presentation/components/learn/ComingSoonLevel";
import React from "react";

import SubjectLayout from "@/presentation/components/learn/SubjectLayout";

interface SubjectPageProps {
  params: {
    subjectId: string;
  };
}

export default function SubjectPage({ params }: SubjectPageProps) {
  const { subjectId } = params;

  // 1. Check if the subject exists in curriculum and has lessons implemented
  const curriculum = (curriculumData as SubjectCurriculum[]).find((c) => c.id === subjectId) || null;
  const firstLessonId = curriculum?.chapters[0]?.lessons[0]?.id || "";
  const key = `${subjectId}/${firstLessonId}`;
  const isImplemented = !!lessonsRegistry[key];

  if (isImplemented) {
    redirect(`/learn/${subjectId}/${firstLessonId}`);
  }

  // 2. Fallback to Coming Soon page
  const level = (roadmapData as LearningLevel[]).find((l) => l.id === subjectId) || null;

  if (!level) {
    redirect("/");
  }

  if (curriculum) {
    return (
      <SubjectLayout
        curriculum={curriculum}
        activeLessonId=""
        subjectId={subjectId}
        headings={[]}
      >
        <ComingSoonLevel level={level} curriculum={curriculum} />
      </SubjectLayout>
    );
  }

  return <ComingSoonLevel level={level} curriculum={null} />;
}
