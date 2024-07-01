import { model } from "../core/config/gemini";
import {partsMath} from "../core/promts/getPrompts";
import { safetySetting } from "../core/config/gemini";
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 20000,
    responseMimeType: "application/json",
  };
export default class MathService {
    async getMathData() {
        const res = await model.generateContent({
            contents: [{'role': 'user', parts: partsMath}],
            generationConfig,
            safetySettings: safetySetting
        })
        console.log('triggered getMathData service')
        return res.response;
    } 
    async removeDoubleBackslashNewline(str: any): Promise<string> {
        try{
            const formattedStr = JSON.parse(str)
            return formattedStr
        }catch(e){
            console.log(e)
            return ""
        }
    }

    async formatDataUsingAi(str: string) {
        try{
            const prompt = `${str} format this string. You need to return clear json without any markdown. I need this clear json for web site`
            const res = await model.generateContent(prompt)
            return res.response.text()
        }catch(err){
            console.log(err)
        }
    }
}
