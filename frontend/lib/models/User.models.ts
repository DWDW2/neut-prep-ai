import mongoose, { Schema, model, models } from 'mongoose';

interface RoadMap {
  _id: string;
  section: string;
  roadmap: string;
  lessons: {
    theme: string;
    skills: string;
    points: number;
  }[];
}

interface UserType {
  email: string;
  username: string;
  password?: string;
  roadmapCriticalId?: mongoose.Types.ObjectId; 
  roadmapMathId?: mongoose.Types.ObjectId; 
  totalPoints?: number;
  imageUrl?: string;
}

const UserSchema = new Schema<UserType>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  roadmapCriticalId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoadMap',
    default: null,
  },
  roadmapMathId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoadMap',
    default: null,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
    default: null,
  }
});

const UserModel = models?.User || model<UserType>('User', UserSchema);

export { UserModel };
export type { UserType };
