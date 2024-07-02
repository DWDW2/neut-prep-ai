import { model } from "../core/config/gemini";
import { partsCritical } from "../core/promts/getPrompts";
import { generationConfig, safetySetting } from "../core/config/gemini";
import  CriticalDataModel from '../models/critical.models'; // Import your CriticalData model and Mongoose model
import UseCriticalResponseModel from "../models/critical.models";
import { UseCriticalResponseType } from "../types/useCritical.types";
export default class CriticalService {
  private criticalDataModel: CriticalDataModel;

  constructor(criticalDataModel: CriticalDataModel) {
    this.criticalDataModel = criticalDataModel;
  }

  async getCriticalData() {
    const res = await model.generateContent({
      contents: [{ 'role': 'user', parts: partsCritical }],
      generationConfig,
      safetySettings: safetySetting
    });
    console.log('triggered getCriticalData service');
    return res.response;
  }

  async createCriticalData(data: CriticalData): Promise<CriticalData> {
    // 1. Use your model to generate content based on the provided data.
    const generatedContent = await model.generateContent({
      contents: [{ 'role': 'user', parts: data.parts }], // Adapt to your data structure
      generationConfig,
      safetySettings: safetySetting
    });

    // 2. Store the generated content (and potentially other data) in your database.
    const newCriticalData = new this.criticalDataModel({ ...data, generatedContent });
    await newCriticalData.save();

    // 3. Return the newly created CriticalData object.
    return newCriticalData;
  }

  async getCriticalDataById(id: string): Promise<CriticalData | null> {
    // 1. Fetch critical data from your database based on the provided ID.
    const retrievedData = await this.criticalDataModel.findById(id);

    // 2. Return the retrieved CriticalData object or null if not found.
    return retrievedData;
  }

  async getAllCriticalData(): Promise<CriticalData[]> {
    // 1. Fetch all critical data from your database.
    const retrievedData = await this.criticalDataModel.find();

    // 2. Return the array of CriticalData objects.
    return retrievedData;
  }

  async updateCriticalData(id: string, data: Partial<CriticalData>): Promise<CriticalData | null> {
    // 1. Fetch the existing critical data from your database.
    const existingData = await this.criticalDataModel.findById(id);

    // 2. Update the retrieved data with the provided changes.
    if (existingData) {
      Object.assign(existingData, data);
      await existingData.save();
      return existingData;
    } else {
      return null;
    }
  }

  async deleteCriticalData(id: string): Promise<boolean> {
    // 1. Delete the critical data from your database based on the provided ID.
    const deletionResult = await this.criticalDataModel.findByIdAndDelete(id);

    // 2. Return true if the deletion was successful, false otherwise.
    return !!deletionResult;
  }

  async removeDoubleBackslashNewline(str: string): Promise<string> {
    const formattedStr = JSON.parse(str);
    return formattedStr;
  }
}
