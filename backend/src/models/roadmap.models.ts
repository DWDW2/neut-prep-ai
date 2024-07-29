import mongoose from 'mongoose';
import { ILesson } from './lessoncontent.models';

interface Lesson {
  title: string;
  description: string;
  difficulty: string;
  xp: number;
  finished: boolean;
  locked: boolean;
  isCurrent: boolean;
  xpGained: number;
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
  userId: {
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
      lessons: {
        type: [
          {
            title: { type: String, required: true },
            description: { type: String, required: true },
            difficulty: { type: String, required: true },
            xp: { type: Number, required: true },
            finished: {type: Boolean, default: false},
            locked: {type: Boolean, default: true},
            isCurrent: {type: Boolean, default: false},
            xpGained: {type: Number, default: 0},
            lessonContent: { 
              type: mongoose.Schema.Types.ObjectId, 
              ref: 'Lesson', 
              default: null
            }
          }
        ],
        required: true
      }
    }
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, 
  }
});

const RoadMap = mongoose.model<RoadMapType>('RoadMap', RoadMapSchema);

export {RoadMap, RoadMapType};
