import mongoose, { Schema } from 'mongoose';
import { Document } from 'mongoose';

export interface ILesson extends Document {
  statement: string;
  question: string;
  variants: string[];
  rightAnswer: number;
  type: string;
  explanation: string;
  answer: number;
}

export interface ILessonModel extends Document {
  lessons: ILesson[]
}


const lessonSchema: Schema = new Schema(
  {
    lessons:[
      {
        statement: { type: String, required: true },
        question: { type: String, required: false },
        variants: { type: [String], required: true },
        rightAnswer: { type: Number, required: true },
        type: { type: String, required: true },
        explanation: { type: String, required: true },
        answer: { type: Number, default: null}
      }
    ]
  }
);

const LessonModel = mongoose.model<ILessonModel>('Lesson', lessonSchema);
export default LessonModel;
