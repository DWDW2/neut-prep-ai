import { generationConfig, model } from "../core/config/gemini";
import { questionTypesCritical, questionTypesMath } from "../core/promts/prompts";
import { UserModel } from "../models/user.models";
import PracticeTestModel, { Task } from "../models/practice.models";
import {GoogleAIFileManager} from '@google/generative-ai/server'
import { envs } from "../core/config/env";
const fileManager = new GoogleAIFileManager(envs.GEMINI_API)

async function uploadToGemini(path:string, mimeType:string) {
  const uploadResult = await fileManager.uploadFile(path, {
    mimeType,
    displayName: path,
  });
  const file = uploadResult.file;
  console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
  return file;
}

export default class PracticeService {
  private async generateRoadmapWithRetries(prompt: any[], maxRetries: number): Promise<any> {
    let retries = 0;
    while (retries < maxRetries) {
      try {
        const result = await model.generateContent({
          contents: [{ role: "user", parts: prompt }],
          generationConfig,
        });
        // const cleanedResponse = this.cleanJsonString(result.response.text());
        const resJson = JSON.parse(result.response.text());
        return resJson;
      } catch (error) {
        console.error(`Error generating roadmap, retrying... (Attempt ${retries + 1}/${maxRetries})`, error);
        retries++;
      }
    }
    throw new Error("Max retries reached. Practice test generation failed.");
  }

  private cleanJsonString(jsonString: string): string {
    return jsonString.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\t/g, '\t');
  }

  async generateTask(questionType: string){
    const parts = [
        {text: `input: GOAL :Create a comprehensive JSON file containing 1 challenging math practice questions for the National University Entrance Test (NUET) based on the question type: ${questionType}.\nSTRUCTURE:\n{\nquestion: string;\nstatement: string;\nvariants: string[];\nrightAnswer: number;\nexplonation: string;\n}EXAMPLE OUTPUT:\n{\n\"statement\": \"Consider the binary operation defined as follows:\",\n\"question\": \"If \\\\( a \\\\ast b = a^2 + b^2 - ab \\\\), find the value of \\\\( (2 \\\\ast 3) \\\\ast 4 \\\\).\",\n\"explanation\": \"First, calculate \\\\( 2 \\\\ast 3 = 2^2 + 3^2 - (2 \\\\cdot 3) = 7 \\\\). Next, calculate \\\\( (2 \\\\ast 3) \\\\ast 4 = 7 \\\\ast 4 = 7^2 + 4^2 - (7 \\\\cdot 4) = 33 \\\\).\",\n\"variants\": [\n\"13\",\n\"25\",\n\"33\",\n\"49\",\n\"None of the above\"\n],\n\"rightAnswer\": \"3\"\n}\nEXAMPLE OUTPUT for critical thinking:\n{\n\"statement\": \"If people go to a foreign country, they should try to learn at least some of the language of that country because, while it is difficult to pick up a foreign language in a short time, learning just a little of a foreign language helps you to find out more about the country itself and its people’s customs. As well as this, it means that you can do things much more easily, such as asking for directions or just being able to order what you want at a restaurant, which is much less embarrassing than pointing and arm-waving.\",\n\"question\": \"Which one of the following is an expression of the main conclusion of the above argument?\",\n\"type\": \"main conclusion\",\n\"explanation\": \"The main conclusion of the argument is that if people go to a foreign country, they should try to learn at least some of the language of that country. This statement encapsulates the overall advice given by the author, supported by the various benefits mentioned.\",\n\"variants\": [\n\"Learning a little of a foreign language helps you to find out more about the country and its customs.\",\n\"You can do things much more easily in a foreign country by learning some of the language.\",\n\"It is difficult to pick up a foreign language in a short time.\",\n\"If people go to a foreign country, they should try to learn at least some of the language of that country.\",\n\"Being able to order what you want at a restaurant is much less embarrassing than pointing and arm-waving.\"\n],\n\"rightAnswer\": 3\n}`},
        {text: " "},
      ];

      return this.generateRoadmapWithRetries(parts, 3);
  }

    async generateRoadmapForQuestionType(userId: string): Promise<any> {
        try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return { message: 'User not found', success: false };
        }

        const tasks = [];
        

        for (let i = 0; i < 30; i++) {
            const randomType = questionTypesMath[Math.floor(Math.random() * questionTypesMath.length)];
            tasks.push(this.generateTask(randomType))
        }
        
        for (let i = 0; i < 30; i++) {
            const randomType = questionTypesCritical[Math.floor(Math.random() * questionTypesCritical.length)];
            tasks.push(this.generateTask(randomType))
        }

        const results = await Promise.all(tasks);
        console.log(results.length)

        if(results){
            const practice = new PracticeTestModel({test:results, userId: userId})
            practice.save()
            await user.save()
        }

        return { results, success: true };
        } catch (error) {
        console.error(error);
        return { message: error, success: false };
        }
  }

  async setScoreToPracticeTest(score: number, practiceTestId: string){
    try {
        if(!score || !practiceTestId){
            return {message: 'provide all data', success: false}
        }
        const practiceTest = await PracticeTestModel.findById(practiceTestId)
        if(!practiceTest){
            return {message: 'practice test not found', success: false}
        }
        practiceTest.points = score
        await practiceTest.save()
        return {message: 'practice test updated', success: true}
    } catch (error) {
        console.log(error)
        return {message: error, success: false}
    }
  }

  async generateSimilarQuestion(filepath: string, mimeType: string){
    try {
      const files = [
        await uploadToGemini(filepath, mimeType)
      ]

      const parts = [
       {text: "input: GOAL :Create a comprehensive JSON file containing 1 challenging math practice questions for the National University Entrance Test (NUET) based on the image provided. You need to extract information from the image, and generate similar question as follow:\nSTRUCTURE:\n{\nquestion: string;\nstatement: string;\nvariants: string[];\nrightAnswer: number;\nexplonation: string;\n}EXAMPLE OUTPUT:\n{\n\"statement\": \"Consider the binary operation defined as follows:\",\n\"question\": \"If \\\\( a \\\\ast b = a^2 + b^2 - ab \\\\), find the value of \\\\( (2 \\\\ast 3) \\\\ast 4 \\\\).\",\n\"explanation\": \"First, calculate \\\\( 2 \\\\ast 3 = 2^2 + 3^2 - (2 \\\\cdot 3) = 7 \\\\). Next, calculate \\\\( (2 \\\\ast 3) \\\\ast 4 = 7 \\\\ast 4 = 7^2 + 4^2 - (7 \\\\cdot 4) = 33 \\\\).\",\n\"variants\": [\n\"13\",\n\"25\",\n\"33\",\n\"49\",\n\"None of the above\"\n],\n\"rightAnswer\": \"3\"\n}\nEXAMPLE OUTPUT for critical thinking:\n{\n\"statement\": \"If people go to a foreign country, they should try to learn at least some of the language of that country because, while it is difficult to pick up a foreign language in a short time, learning just a little of a foreign language helps you to find out more about the country itself and its people’s customs. As well as this, it means that you can do things much more easily, such as asking for directions or just being able to order what you want at a restaurant, which is much less embarrassing than pointing and arm-waving.\",\n\"question\": \"Which one of the following is an expression of the main conclusion of the above argument?\",\n\"type\": \"main conclusion\",\n\"explanation\": \"The main conclusion of the argument is that if people go to a foreign country, they should try to learn at least some of the language of that country. This statement encapsulates the overall advice given by the author, supported by the various benefits mentioned.\",\n\"variants\": [\n\"Learning a little of a foreign language helps you to find out more about the country and its customs.\",\n\"You can do things much more easily in a foreign country by learning some of the language.\",\n\"It is difficult to pick up a foreign language in a short time.\",\n\"If people go to a foreign country, they should try to learn at least some of the language of that country.\",\n\"Being able to order what you want at a restaurant is much less embarrassing than pointing and arm-waving.\"\n],\n\"rightAnswer\": 3\n}"},
        {
          fileData: {
            mimeType: files[0].mimeType,
            fileUri: files[0].uri,
          },
        },
        {text: ""},
      ];
      const similarQuestions = []
      for (let i = 0; i < 5; i++) {
        similarQuestions.push(model.generateContent({
          contents: [{ role: "user", parts }],
          generationConfig,
        }))
    }
      const result = await Promise.all(similarQuestions)
      console.log(result)
      const resultFinal = result.map(res => JSON.parse(res.response.text()))
      return {message: 'similar question generated', success: true, result: resultFinal}
    } catch (error) {
      console.log(error)
      return {message: error, success: false}
    }
  }
}

