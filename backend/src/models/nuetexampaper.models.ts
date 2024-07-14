import mongoose from 'mongoose';

interface Document {
  text: string;
  createdAt: Date;
  metadata: object;
}

const DocumentsSchema = new mongoose.Schema<Document>({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    type: Object,
    default: {},
  },
});
const NuetDocument = mongoose.model<Document>('Documents', DocumentsSchema);

export default NuetDocument 