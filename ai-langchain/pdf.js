import { PDFLoader } from "langchain/document_loaders/fs/pdf";

const loader = new PDFLoader("/home/zhansar/projects/neut-prep-ai/ai-langchain/dat/NUET 2022 Critical Thinking and Problem Solving specimen paper.pdf");

const docs = await loader.load();

console.log(docs)