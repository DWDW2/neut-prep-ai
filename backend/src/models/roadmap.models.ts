import mongoose from 'mongoose';

interface Lesson {
  theme: string;
  skills: string;
  points: number;
  lessonContent: string;
}
interface RoadMapType {
  roadmap:[
    {
      section: string;
      unit: string;
      lessons: Lesson[];
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}

const RoadMapSchema = new mongoose.Schema({
  roadmap: [
    {
      section: String,
      unit: String,
      lessons: [
        {
          theme: String,
          skills: String,
          points: Number,
          lessonContent: {
            type:mongoose.Types.ObjectId,
            ref: 'LessonContent',
            default: null
          }
        }
      ]
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
})

const RoadMap = mongoose.model<RoadMapType>('RoadMap', RoadMapSchema);

export {RoadMap, RoadMapType}