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
  questionType: string;
}

interface Lesson {
  _id: string;
  title: string;
  description: string;
  difficulty: string;
  xp: number;
  finished: boolean;
  first: boolean;
  xpGained: number;
  lessonContent: string; 
}
export type {Roadmap, RoadmapPayload, Lesson}