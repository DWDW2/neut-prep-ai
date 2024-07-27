import mongoose, { Schema, Document } from 'mongoose';

export interface Task {
  question: string;
  statement: string;
  variants: string[];
  rightAnswer: number;
  explonation: string;
}

interface PracticeTest extends Document {
  tasks: Task[];
  points: number;
  userId: string;
}

const taskSchema: Schema = new Schema({
  question: { type: String, required: true },
  statement: { type: String, required: false },
  variants: { type: [String], required: true },
  rightAnswer: { type: Number, required: true },
  explonation: { type: String, required: true },
});

const practiceTestSchema: Schema = new Schema({
  tasks: { type: [taskSchema], required: true },
  points: { type: Number, required: true },
  userId: { type: String, required: true },
});

const PracticeTestModel = mongoose.model<PracticeTest>('PracticeTest', practiceTestSchema);

export default PracticeTestModel;
