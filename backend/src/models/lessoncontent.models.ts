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
        explanation: { type: String, required: true }
      }
    ]
  }
);

const LessonModel = mongoose.model<ILesson>('Lesson', lessonSchema);
export default LessonModel;
