
interface Roadmap {
  _id: string;
  roadmap:[
    {
      section: string;
      unit: string;
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
  theme: string;
  skills: string;
  points: number;
  lessonContent: string;
}
export type {Roadmap, RoadmapPayload, Lesson}