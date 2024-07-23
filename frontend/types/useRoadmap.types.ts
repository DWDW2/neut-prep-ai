interface Roadmap {
  _id: string;
  roadmap:[
    {
      _id: string;
      section: string;
      unit: string;
      questionType: string;
      lessons: Lesson[];
    }
  ],
  user:string;
}

interface RoadmapPayload {
  roadmapId:string;
  unitIndex: number;
  sectionIndex: number;
}

interface Lesson {
  _id: string;
  title: string;
  description: string;
  xp: number;
  difficulty: string;
  lessonContent: string;
}
export type {Roadmap, RoadmapPayload, Lesson}