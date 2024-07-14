import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import 'dotenv/config'
import mongoose from 'mongoose'
import path from 'path'
import { GoogleGenerativeAI } from "@google/generative-ai";
mongoose.connect(process.env.MONGO_URI).then(console.log('Connected to MongoDB'))
const DocumentsSchema = mongoose.Schema({
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
})

const Documents = mongoose.model('Documents', DocumentsSchema)

const loader = new PDFLoader(path.resolve('NUET 2022 Critical Thinking and Problem Solving specimen paper.pdf'), {splitPages: true})

const docs = await loader.load()

// for (const doc of docs) {
//   const newDocument = Documents({
//     text: doc.pageContent,
//     metadata: {
//       source: doc.metadata.source,
//     }
//   });
//   await newDocument.save()
// }

console.log(docs)