import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import 'dotenv/config'
import mongoose from 'mongoose'
import path from 'path'
import { GoogleGenerativeAI } from "@google/generative-ai";
mongoose.connect(process.env.MONGO_URI).then(console.log('Connected to MongoDB'))

const KDocumentSchema = mongoose.Schema({
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

const KDocument = mongoose.model('KDocument', KDocumentSchema);

async function loadAndSavePDF(pdfPath) {
  const loader = new PDFLoader(path.resolve(pdfPath), { splitPages: true });
  const docs = await loader.load();

  let allText = "";
  for (const doc of docs) {
    allText += doc.pageContent;
  }

  const newDocument = new KDocument({
    text: allText,
    metadata: {
      source: pdfPath,
    },
    pdfPath: pdfPath,
  });
  await newDocument.save();
}

// Example usage:
const pdfPath = 'NUET 2022 Critical Thinking and Problem Solving specimen paper.pdf'; // Replace with your PDF path
await loadAndSavePDF(pdfPath);

console.log("PDF loaded and saved to KDocument");
