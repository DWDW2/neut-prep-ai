import { GoogleGenerativeAI, HarmCategory } from "@google/generative-ai";
import getCriticalPromt from "../promts/getCritical";
import { envs } from "./env";
const apiKey = envs.GEMINI_API;
const genAI = new GoogleGenerativeAI(apiKey);
  
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
  
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 50000,
  responseMimeType: "text/plain",
};
  
export {
  model,
  generationConfig,
}