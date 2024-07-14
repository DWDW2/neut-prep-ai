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
  roadmapCriticalId?: mongoose.Types.ObjectId; 
  roadmapMathId?: mongoose.Types.ObjectId; 
  themesToImprove: string[]; 
  totalXp: number; 
  streak: number; 
  todaysXp: number; 
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
  roadmapCriticalId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoadMap',
  },
  roadmapMathId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoadMap',
  },
  themesToImprove: {
    type: [String],
    default: [],
  },
  totalXp: {
    type: Number,
    default: 0,
  },
  streak: {
    type: Number,
    default: 0,
  },
  todaysXp: { // Add todaysXp field
    type: Number,
    default: 0,
  },
});

const UserModel = model('User', UserSchema);

export  {UserModel, UserType};
