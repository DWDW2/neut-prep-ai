import mongoose, { Document, Schema } from 'mongoose';
import { UseMathResponseType } from '../types/useMath.types';

// Omit the id field when extending Document
interface IUseMathResponse extends Omit<UseMathResponseType, 'id'>, Document {}

const optionsSchema: Schema = new Schema({
    A: { type: String, required: true },
    B: { type: String, required: true },
    C: { type: String, required: true },
    D: { type: String, required: true },
    E: { type: String, default: null },
}, { _id: false });

const useMathResponseSchema: Schema = new Schema({
    id: { type: String, required: true },
    question: { type: String, required: true },
    question_type: { type: String, required: true },
    explanation: { type: String, required: true },
    options: { type: optionsSchema, required: true },
    correct_option: { type: String, required: true },
    svg_file: { type: String, default: null }
});

const UseMathResponseModel = mongoose.model<IUseMathResponse>('UseMathResponse', useMathResponseSchema);

export default UseMathResponseModel;
