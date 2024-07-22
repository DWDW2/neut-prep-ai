import mongoose from 'mongoose';
import { ILesson } from './lessoncontent.models';

interface Lesson {
  title: string;
  description: string;
  difficulty: string;
  xp: number;
  lessonContent: string;
}

interface RoadMapType {
  roadmap: [
    {
      section: string;
      unit: string;
      questionType: string;
      lessons: Lesson[];
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}

const RoadMapSchema = new mongoose.Schema<RoadMapType>({
  roadmap: [
    {
      section: { type: String, required: true },
      unit: { type: String, required: true },
      questionType: { type: String, required: true },
      lessons: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          difficulty: { type: String, required: true },
          xp: { type: Number, required: true },
          lessonContent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson',
            default: null,
          }
        }
      ]
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, 
  }
});

const RoadMap = mongoose.model<RoadMapType>('RoadMap', RoadMapSchema);

export {RoadMap, RoadMapType};
