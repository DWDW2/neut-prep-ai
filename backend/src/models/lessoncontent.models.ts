import mongoose, { Schema } from 'mongoose';
import { Document } from 'mongoose';

export interface ILesson extends Document {
  statement: string;
  question: string;
  variants: string[];
  rightAnswer: number;
  type: string;
  explanation: string;
}


const lessonSchema: Schema = new Schema({
  statement: { type: String, required: true },
  question: { type: String, required: true },
  variants: { type: [String], required: true },
  rightAnswer: { type: Number, required: true },
  type: { type: String, required: true },
  explanation: { type: String, required: true }
});

const LessonModel = mongoose.model<ILesson>('Lesson', lessonSchema);
export default LessonModel;
