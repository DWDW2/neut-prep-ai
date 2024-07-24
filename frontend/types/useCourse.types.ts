interface PayloadCourse{
    roadmapId: string;
    unitIndex: number;
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
}

export type {PayloadCourse, UpdatePayloadCourse, Lesson}

//