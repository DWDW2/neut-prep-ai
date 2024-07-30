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
  options: string[];
  rightAnswer: number;
  type: string;
  explanation: string;
  answer: number;
}

export type {PayloadCourse, UpdatePayloadCourse, Lesson}

//