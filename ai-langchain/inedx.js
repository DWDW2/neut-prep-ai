import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import 'dotenv/config'
import mongoose from 'mongoose'
import path from 'path'
import { GoogleGenerativeAI } from "@google/generative-ai";
// mongoose.connect(process.env.MONGO_URI).then(console.log('Connected to MongoDB'))

const model = new GoogleGenerativeAI(' ')

const genAi = model.getGenerativeModel({model: "gemini-1.5-pro"})


// const KDocumentSchema = mongoose.Schema({
//   text: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   metadata: {
//     type: Object,
//     default: {},
//   },
//   pdfPath: {
//     type: String,
//     required: true,
//   },
// });

// const KDocument = mongoose.model('KDocument', KDocumentSchema);

async function loadAndSavePDF(pdfPath) {
  const loader = new PDFLoader(path.resolve(pdfPath), { splitPages: true });
  const docs = await loader.load();

  
  let allpromise = [];
  for (const doc of docs) {
    const parts = [
      {text: `input: GOAL:\nCreate a comprehensive JSON file containing 1 challenging critical thinking practice question for the National University Entrance Test (NUET) based on the page of the NUET specimen paper: ${doc.pageContent} STRUCTURE:\n{\n\"statement\": \"STRING\",\"question\": \"STRING\",\"type\": \"STRING\",\"explanation\": \"STRING\",\"variants\": [\n\"STRING\", // Variant 1 text\n\"STRING\", // Variant 2 text\n\"STRING\", // Variant 3 text\n\"STRING\", // Variant 4 text\n\"STRING\" // Optional, for 5-choice questions\n],\n\"rightAnswer\": \"NUMBER\" // NUMBER of the correct variant, e.g., '1'\n}FORMAT REQUIREMENTS:statement: Directly copy the task content from the specified page.question: Directly copy the question content from the specified page.type: Clearly specify the type of question (e.g., 'identify main conclusion', 'evaluate argument', 'identify bias').explanation: Provide a detailed explanation that clearly justifies the correct answer and explores the reasoning process.variants: Include the answer choices exactly as they appear on the page.rightAnswer: Indicate the number of the correct variant (e.g., '1' for the first variant).EXAMPLE OUTPUT:\n{\n\"statement\": \"If people go to a foreign country, they should try to learn at least some of the language of that country because, while it is difficult to pick up a foreign language in a short time, learning just a little of a foreign language helps you to find out more about the country itself and its peoples customs. As well as this, it means that you can do things much more easily, such as asking for directions or just being able to order what you want at a restaurant, which is much less embarrassing than pointing and arm-waving.\",\n\"question\": \"Which one of the following is an expression of the main conclusion of the above argument?\",\n\"type\": \"main conclusion\",\n\"explanation\": \"The main conclusion of the argument is that if people go to a foreign country, they should try to learn at least some of the language of that country. This statement encapsulates the overall advice given by the author, supported by the various benefits mentioned.\",\n\"variants\": [\n\"Learning a little of a foreign language helps you to find out more about the country and its customs.\",\n\"You can do things much more easily in a foreign country by learning some of the language.\",\n\"It is difficult to pick up a foreign language in a short time.\",\n\"If people go to a foreign country, they should try to learn at least some of the language of that country.\",\n\"Being able to order what you want at a restaurant is much less embarrassing than pointing and arm-waving.\"\n],\n\"rightAnswer\": 3\n}`},
      {text: " "},
    ];
    allpromise.push(genAi.generateContentStream({
      contents: [{ role: "user", parts }]
    }));
  }

  const results = await Promise.all(allpromise);
  console.log(results.map(res => res.response))
}

// Example usage:
const pdfPath = 'NUET 2022 Critical Thinking and Problem Solving specimen paper.pdf'; // Replace with your PDF path

loadAndSavePDF(pdfPath)
console.log("PDF loaded and saved to KDocument");
