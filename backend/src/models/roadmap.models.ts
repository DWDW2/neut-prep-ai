import mongoose from 'mongoose';

interface Lesson {
  theme: string;
  skills: string;
  points: number;
}

interface RoadMap {
  section: string;
  unit: string;
  lessons: Lesson[];
}

const RoadMapSchema = new mongoose.Schema<RoadMap>({
  section: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  lessons: {
    type: [
      {
        theme: {
          type: String,
          required: true,
        },
        skills: {
          type: String,
          required: true,
        },
        points: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },
});

const RoadMap = mongoose.model<RoadMap>('RoadMap', RoadMapSchema);

export default RoadMap