import mongoose, { Document, Schema } from 'mongoose';
import { UseCriticalResponseType } from '../types/useCritical.types';

interface IUseCriticalResponse extends Omit<UseCriticalResponseType, 'id'>, Document {}

const useCriticalResponseSchema: Schema = new Schema({
    id: { type: String, required: true },
    question: { type: String, required: true },
    statement: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: String, required: true },
    explanation: { type: String, required: true },
    table: { type: String, default: null },
    questionType: { type: String, required: true } // camelCase for consistency
});

const UseCriticalResponseModel = mongoose.model<IUseCriticalResponse>('UseCriticalResponse', useCriticalResponseSchema);

export default UseCriticalResponseModel;
