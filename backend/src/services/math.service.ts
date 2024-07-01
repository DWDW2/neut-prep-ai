import { model } from "../core/config/gemini";
import {partsMath} from "../core/promts/getCritical";
import { generationConfig, safetySetting } from "../core/config/gemini";
export default class CriticalService {
    async getMathData() {
        const res = await model.generateContent({
            contents: [{'role': 'user', parts: partsMath}],
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
