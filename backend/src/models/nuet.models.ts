import { Schema, model, Document } from 'mongoose';
import { nuetTestModelType } from '../types/useNuet.types';
import CriticalTestModel from './critical.models'; 
import MathTestModel from './math.models'; 

export interface INuetTestModelType extends Document, nuetTestModelType { }

const nuetSchema = new Schema<INuetTestModelType>({
  critical: { type: Schema.Types.ObjectId, ref: 'CriticalTest', required: true }, 
  math: { type: Schema.Types.ObjectId, ref: 'MathTest', required: true }, 
});

const Nuet = model<INuetTestModelType>('Nuet', nuetSchema);

export { Nuet };
