import mongoose, { Schema, model } from 'mongoose';

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
  password: string;
  roadmapId?: mongoose.Types.ObjectId; 
  totalPoints?: number;
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
    required: true,
  },
  roadmapId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoadMap',
  },
  totalPoints: {
    type: Number,
    default: 0,
  }
});

const UserModel = model('User', UserSchema);

export  {UserModel, UserType};