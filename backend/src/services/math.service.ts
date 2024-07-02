// home/zhansar/projects/neut-prep-ai/backend/src/services/math.service.ts
import { model } from "../core/config/gemini";
import {partsMath} from "../core/promts/getPrompts";
import { generationConfig, safetySetting } from "../core/config/gemini";
import { mathTestModelType, mathTestType } from "../types/useMath.types";
import MathModel from "../models/math.models"; // Import your Mongoose model

export default class MathService {
    async getMathData() {
        const res = await model.generateContent({
            contents: [{'role': 'user', parts:partsMath}],
            generationConfig,
            safetySettings: safetySetting
        })
        console.log('triggered getMathData service')
        return res.response;
    } 
    async removeDoubleBackslashNewline(str: any): Promise<mathTestType[]> {
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
    async saveMathDataToDB(data: mathTestType[]){
        try{
            const test = new MathModel({test: data})
            await test.save()
            return test
            console.log('Math data saved to DB')
        }catch(e){
            console.log(e)

        }
    }

    // CRUD Operations

    // Get all math data
    async getAllMathData(): Promise<mathTestModelType[]> {
        try {
            const mathData = await MathModel.find();
            return mathData;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    // Get math data by ID
    async getMathDataById(id: string): Promise<mathTestModelType | null> {
        try {
            const mathData = await MathModel.findById(id);
            return mathData;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Create new math data
    async createMathData(data: mathTestType[]): Promise<mathTestModelType> {
        try {
            const newMathData = new MathModel({ test: data });
            const savedMathData = await newMathData.save();
            return savedMathData;
        } catch (error) {
            console.log(error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }

    // Update math data by ID
    async updateMathData(id: string, data: mathTestType[]): Promise<mathTestModelType | null> {
        try {
            const updatedMathData = await MathModel.findByIdAndUpdate(
                id,
                { test: data },
                { new: true }
            );
            return updatedMathData;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Delete math data by ID
    async deleteMathData(id: string): Promise<boolean> {
        try {
            const deletedMathData = await MathModel.findByIdAndDelete(id);
            return !!deletedMathData; // Check if data was deleted
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
