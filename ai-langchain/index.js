import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import {CharacterTextSplitter} from "langchain/text_splitter"
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
const loader = new PDFLoader('/home/zhansar/projects/neut-prep-ai/ai-langchain/dat/ilovepdf_merged.pdf')

const docs = await loader.load()
const text = docs.map((page) => page.pageContent).join('\n\n');

const textSplitter = new CharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});
const chunks = await textSplitter.splitText(text);

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: 'AIzaSyDBvkSfTeqPqBdT1PfWD_Y2-MIVQMia6tQ',
  model: 'models/embedding-001',
});

const docEmbeddings = await Promise.all(
  chunks.map(async (chunk) => embeddings.embedQuery(chunk))
);

const pineconeClient = new Pinecone({
  apiKey: 'f43a9bd8-bfac-4345-8803-7892b39d5edc',
});

const index = pineconeClient.Index('nuet-ai');

const docsVectors = docEmbeddings.map((embedding, i) => ({
  id: String(i),
  values: embedding,
}));
console.log(docsVectors)
await index.upsert(docsVectors);

console.log('Done');