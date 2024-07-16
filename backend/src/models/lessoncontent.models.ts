import mongoose, { Document, Schema } from 'mongoose';

export interface ILesson extends Document {
  question: string;
  answer: string;
  questionVariants: string[];
  explanation: string;
}

const LessonSchema: Schema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  questionVariants: { type: [String], required: true },
  explanation: { type: String, required: true },
});

const LessonModel = mongoose.model<ILesson>('Lesson', LessonSchema);
export default LessonModel;
