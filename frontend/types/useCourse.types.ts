interface PayloadCourse{
    roadmapType: string;
    lessonIndex: number;
    sectionIndex: number;
}

interface UpdatePayloadCourse {
    unitIndex: number;
    sectionIndex: number;
}

interface Lesson {
  statement: string;
  question: string;
  variants: string[];
  rightAnswer: number;
  type: string;
  explanation: string;
  answer: number;
}

interface SetFinishedPayload{
  roadmapId: string;
  lessonIndex: number;
  sectionIndex: number;
}

interface SetXpGainedPayload {
  roadmapId: string;
  lessonIndex: number;
  sectionIndex: number;
  xpGained: number;
}

interface HandleNextLessonPayload{
  roadmapId: string;
  lessonIndex: number;
  sectionIndex: number;
}

interface UseGetLessonPayload{
  roadmapId:string;
  lessonIndex:number;
  sectionIndex:number;
}

interface useSetUserAnswers {
  answers: number[];
  roadmapId: string;
  lessonIndex: number;
  sectionIndex: number;
  incorrectIndexes: number[]
}

export type {PayloadCourse, UpdatePayloadCourse, Lesson, SetFinishedPayload, SetXpGainedPayload, HandleNextLessonPayload, UseGetLessonPayload, useSetUserAnswers}

//