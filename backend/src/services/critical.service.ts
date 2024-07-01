import { model } from "../core/config/gemini";
import {partsCritical} from "../core/promts/getPrompts";
import { generationConfig, safetySetting } from "../core/config/gemini";
export default class CriticalService {
    async getCriticalData() {
        const res = await model.generateContent({
            contents: [{'role': 'user', parts:partsCritical}],
            generationConfig,
            safetySettings: safetySetting
        })
        console.log('triggered getCriticalData service')
        return res.response;
    } 
    async removeDoubleBackslashNewline(str: string): Promise<string> {
        const formattedStr = JSON.parse(str)
        return formattedStr
    }
}
