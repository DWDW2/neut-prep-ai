import { get } from "http";
import { model } from "../core/config/gemini";
import getCriticalPromt from "../core/promts/getCritical";
import { generationConfig } from "../core/config/gemini";
class CriticalService {
    async getCriticalData() {
        const promt = getCriticalPromt;
        const res = await model.generateContent({
            contents: [{'role': 'user', 'parts': promt}],
            generationConfig
        })
        console.log('triggered getCriticalData service')
        return res;
    } 
}

export default CriticalService;