import mongoose from 'mongoose';

interface Lesson {
  title: string;
  description: string;
  difficulty: string;
  xp: number; 
}
interface RoadMapType {
  roadmap:[
    {
      id: string;
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