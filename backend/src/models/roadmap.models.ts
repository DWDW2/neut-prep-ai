import mongoose from 'mongoose';

interface Lesson {
  theme: string;
  skills: string;
  points: number;
}
interface RoadMap {
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
        }
      ]
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
})

const RoadMap = mongoose.model<RoadMap>('RoadMap', RoadMapSchema);

export default RoadMap