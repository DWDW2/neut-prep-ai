import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  apiKey:"AIzaSyDBvkSfTeqPqBdT1PfWD_Y2-MIVQMia6tQ",
  model: "gemini-pro",
  maxOutputTokens: 2048,
});

const loader = new PDFLoader("/home/zhansar/projects/neut-prep-ai/ai-langchain/dat/bmat_2018_section_1.pdf");

const docs = await loader.load();
const res = await model.invoke([
    [
      "human",
      `You are a helpful assistant that helps to prepare to nuet exam. Based on this data ${docs[4].pageContent} generate me new similar practice test and latex image.`,
    ],
  ]);
console.log(res)