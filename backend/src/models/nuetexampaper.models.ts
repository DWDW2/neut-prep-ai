import mongoose from 'mongoose';

interface Document {
  text: string;
  createdAt: Date;
  metadata: object;
  pdfPath: string;
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
  pdfPath: {
    type: String,
    required: true,
  },            
});
const NuetDocument = mongoose.model<Document>('KDocuments', DocumentsSchema);

export default NuetDocument 