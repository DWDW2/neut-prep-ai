interface Roadmap {
  map(arg0: (lesson: any, index: any) => import("react").JSX.Element): import("react").ReactNode;
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
  _id: string;
  theme: string;
  skills: string;
  points: number;
  lessonContent: string;
}
export type {Roadmap, RoadmapPayload, Lesson}