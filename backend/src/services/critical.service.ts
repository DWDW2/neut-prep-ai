import { model } from "../core/config/gemini";
import {partsCritical} from "../core/promts/getPrompts";
import { generationConfig, safetySetting } from "../core/config/gemini";
import { criticalTestType } from "../types/useCritical.types";
import criticalTestModel from "../models/critical.models";
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
    async removeDoubleBackslashNewline(str: any): Promise<criticalTestType[]> {
        try{
            const formattedStr = JSON.parse(str)
            return formattedStr
        }catch(e){
            console.log(e)
            return []
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
    async saveCriticalDataToDB(data: criticalTestType[]){
        try{
            const test = new criticalTestModel({test: data})
            await test.save()
            console.log('Critical data saved to DB')
        }catch(e){
            console.log(e)
        }
    }
}
