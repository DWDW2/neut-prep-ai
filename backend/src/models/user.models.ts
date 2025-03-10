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
  password?: string;
  roadmapCriticalId?: mongoose.Types.ObjectId; 
  roadmapMathId?: mongoose.Types.ObjectId; 
  themesToImprove: string[]; 
  totalXp: number; 
  lastActivityDate: Date;
  longestStreak: number; 
  streak: number; 
  todaysXp: number; 
  tested: boolean;
  bestThemes: string[]
  visitedDays: string[];
}

const UserSchema = new Schema<UserType>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  roadmapCriticalId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoadMap',
    default: null
  },
  roadmapMathId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoadMap',
    default: null
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
  longestStreak: {
    type: Number,
    default: 0,
  },
  todaysXp: { 
    type: Number,
    default: 0,
  },
  lastActivityDate: {
    type: Date,
    default: Date.now,
  },
  tested: {
    type: Boolean,
    default: false,
  },
  bestThemes: {
    type: [String],
    default: [],
  },
  visitedDays: {
    type: [String],
    default: [],
  }
});

const UserModel = model('User', UserSchema);

export  {UserModel, UserType};
