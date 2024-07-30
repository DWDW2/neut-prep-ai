import { RoadMap, RoadMapType } from "../models/roadmap.models";
import { UserModel as User, UserModel, UserType } from "../models/user.models";
import { model, generationConfig, safetySetting } from "../core/config/gemini";
import LessonModel from "../models/lessoncontent.models";

export default class CourseService {
  private async generateRoadmapWithRetries(prompt: any[], maxRetries: number): Promise<any> {
    let retries = 0;
    while (retries < maxRetries) {
      try {
        const result = await model.generateContent({
          contents: [{ role: "user", parts: prompt }],
          generationConfig,
        });
        const resJson = JSON.parse(result.response.text());
        return resJson;
      } catch (error) {
        console.error(`Error generating roadmap, retrying... (Attempt ${retries + 1}/${maxRetries})`, error);
        retries++;
      }
    }
    throw new Error("Max retries reached. Roadmap generation failed.");
  }

  private cleanJsonString(jsonString: string): string {
    return jsonString.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\t/g, '\t');
  }

  async generateLessonByUserId(lessonIndex: number, sectionIndex: number, roadmapType: string, userId: string) {
    try {
      console.log('I am here');
  
      const user = await UserModel.findById(userId);
      if (!user) {
        return { message: 'User not found', success: false };
      }
      const id = roadmapType === 'math' ? user.roadmapMathId : user.roadmapCriticalId;
      if (!id) {
        return { message: 'Roadmap not found', success: false };
      }
      const roadmap = await RoadMap.findById(id);
      if (!roadmap) {
        return { message: 'Roadmap not found', success: false };
      }
  
      const lesson = roadmap.roadmap[sectionIndex].lessons[lessonIndex];
      if (!lesson) {
        return { message: 'Lesson not found', success: false };
      }
      
      const lessons = [];
      for (let i = 0; i < 5; i++) {
        const lessonDescription = lesson.title;
        lessons.push(this.generateLessonByRoadmapType(roadmapType, lessonDescription));
      }
  
      const results = await Promise.all(lessons);
      const lessonModel = new LessonModel({ lessons: results });
      if (typeof lessonModel.id === 'string') {
        roadmap.roadmap[sectionIndex].lessons[lessonIndex].lessonContent = lessonModel.id;
      }
      await lessonModel.save();
      await roadmap.save();
      console.log(results);
      return { message: 'Lessons generated successfully', success: true, lessons: results };
    } catch (error: any) {
      console.log(error);
      return { message: error.message, success: false };
    }
  }
  
  
  async generateLessonByRoadmapType(roadmapType: string, lesson: string) {
    try {
      if (roadmapType === 'math') {
        const parts = [
          {text: `GOAL :Create a comprehensive JSON file containing 1 challenging math practice questions for the National University Entrance Test (NUET) based on the lesson description: ${lesson}.\n\nSTRUCTURE:\n{\n      \"statement\": \"STRING\",  // Optional introductory statement or context\n      \"question\": \"STRING\",  // Question text using better-react-mathjax markdown\n      \"type\": \"STRING\",  // Type of question, e.g., 'inequality solving'\n      \"explanation\": \"STRING\",  // Detailed explanation using better-react-mathjax markdown, if applicable\n      \"variants\": [\n        \"STRING\",  // Variant 1 text\n        \"STRING\",  // Variant 2 text\n        \"STRING\",  // Variant 3 text\n        \"STRING\",  // Variant 4 text\n        \"STRING\"   // Optional, for 5-choice questions\n      ],\n      \"rightAnswer\": \"NUMBER\"  // NUMBER of the correct variant, e.g., '1'\n    }\n\nEMPHASIS:\nEnsure questions meet the following criteria: Advanced Mathematical Reasoning, Multi-Perspective Examination\n\nFORMAT REQUIRMENTS:\n\nquestion: Use better-react-mathjax markdown for mathematical expressions.,\n    type :Clearly specify the type of question (e.g., 'inequality solving').,\n    explanation: Provide a detailed solution using better-react-mathjax markdown, if applicable,\n    variants: Include answer choices. Optional fifth variant can be included for increased difficulty.,\n    rightAnswer: Indicate the number of the correct variant (e.g., '1' for the first variant).\n   Ensure that each question is challenging, requiring higher-order thinking and a deep understanding of the material.,\n    Ensure questions are closely related to the specific topics covered in the lesson description.,\n    For geometric questions, provide SVG files or references to diagrams where applicable.\n\nEXAMPLE OUTPUT:\n\n {\n      \"id\": \"1\",\n      \"statement\": \"Consider the binary operation defined as follows:\",\n      \"question\": \"If \\\\( a \\\\ast b = a^2 + b^2 - ab \\\\), find the value of \\\\( (2 \\\\ast 3) \\\\ast 4 \\\\).\",\n      \"type\": \"binary operations\",\n      \"explanation\": \"First, calculate \\\\( 2 \\\\ast 3 = 2^2 + 3^2 - (2 \\\\cdot 3) = 7 \\\\). Next, calculate \\\\( (2 \\\\ast 3) \\\\ast 4 = 7 \\\\ast 4 = 7^2 + 4^2 - (7 \\\\cdot 4) = 33 \\\\).\",\n      \"variants\": [\n        \"13\",\n        \"25\",\n        \"33\",\n        \"49\",\n        \"None of the above\"\n      ],\n      \"rightAnswer\": \"3\"\n    }`},
          {text: " "},
        ];
        return this.generateRoadmapWithRetries(parts, 3);
      }
      if (roadmapType === 'critical') {
        const parts = [
          {text: `GOAL:\nCreate a comprehensive JSON file containing 1 challenging critical thinking practice question for the National University Entrance Test (NUET) based on the lesson description: ${lesson}\nSTRUCTURE:\n{\n      \"statement\": \"STRING\",  \n      \"question\": \"STRING\",  \n      \"type\": \"STRING\",  \n      \"explanation\": \"STRING\",  \n      \"variants\": [\n        \"STRING\",  // Variant 1 text\n        \"STRING\",  // Variant 2 text\n        \"STRING\",  // Variant 3 text\n        \"STRING\",  // Variant 4 text\n        \"STRING\"   // Optional, for 5-choice questions\n      ],\n      \"rightAnswer\": \"NUMBER\"  // NUMBER of the correct variant, e.g., '1'\n }\n\nEMPHASIS: \nEnsure questions meet the following criteria: Advanced Critical Thinking, Multi-Perspective Analysis\n\nFORMAT REQUIRMENTS:\n\nquestion : Ensure the question is complex and requires deep analysis and reasoning.,\n    type: Clearly specify the type of question (e.g., 'identify main conclusion', 'evaluate argument', 'identify bias').\",\n    explanation: Provide a detailed explanation that clearly justifies the correct answer and explores the reasoning process.,\n    variants: Include answer choices that are plausible and require careful consideration to differentiate.,\n    rightAnswer: Indicate the number of the correct variant (e.g., '1' for the first variant).\n\n Ensure questions are closely related to the specific topics covered in the lesson description.,\n    For questions involving data or arguments, include relevant data or scenarios to analyze.\n\n\nEXAMPLE OUTPUT:\n {\n  \"statement\": \"If people go to a foreign country, they should try to learn at least some of the language of that country because, while it is difficult to pick up a foreign language in a short time, learning just a little of a foreign language helps you to find out more about the country itself and its people’s customs. As well as this, it means that you can do things much more easily, such as asking for directions or just being able to order what you want at a restaurant, which is much less embarrassing than pointing and arm-waving.\",\n  \"question\": \"Which one of the following is an expression of the main conclusion of the above argument?\",\n  \"type\": \"main conclusion\",\n  \"explanation\": \"The main conclusion of the argument is that if people go to a foreign country, they should try to learn at least some of the language of that country. This statement encapsulates the overall advice given by the author, supported by the various benefits mentioned.\",\n  \"variants\": [\n    \"Learning a little of a foreign language helps you to find out more about the country and its customs.\",\n    \"You can do things much more easily in a foreign country by learning some of the language.\",\n    \"It is difficult to pick up a foreign language in a short time.\",\n    \"If people go to a foreign country, they should try to learn at least some of the language of that country.\",\n    \"Being able to order what you want at a restaurant is much less embarrassing than pointing and arm-waving.\"\n  ],\n  \"rightAnswer\": 3\n}`},
          {text: " "},
        ];
      
        return this.generateRoadmapWithRetries(parts, 3);
      }
    } catch (error:any) {
      console.log(error);
      return {message: error.message, success: false};
    }
  }
  
  async getLessonById(lessonIndex: number, sectionIndex: number, roadmapId: string) {
    try {
      const roadmap = await RoadMap.findById(roadmapId);
      
      if (!roadmap) {
        return { message: 'Roadmap not found', success: false };
      }
  
      const section = roadmap.roadmap[sectionIndex];
      if (!section) {
        return { message: 'Section not found', success: false };
      }
  
      const lessonId = section.lessons[lessonIndex].lessonContent;
      const lesson = await LessonModel.findById(lessonId);
      if (!lesson) {
        return { message: 'Lesson not found', success: false };
      }
  
      const incorrectQuestions = lesson.lessons.filter(question => question.answer !== question.rightAnswer);
  
      return { lessons: incorrectQuestions, success: true };
    } catch (error) {
      console.log(error);
      return { message: error, success: false };
    }
  }
  

  async setFinished(lessonIndex: number, sectionIndex: number, roadmapId: string){
    try {
      const roadmap = await RoadMap.findById(roadmapId)
      if(!roadmap){
        return {message: 'Roadmap not found', success: false}
      }
      roadmap.roadmap[sectionIndex].lessons[lessonIndex].finished = true
      roadmap.roadmap[sectionIndex].lessons[lessonIndex].locked = true
      roadmap.roadmap[sectionIndex].lessons[lessonIndex].isCurrent = false
      roadmap.roadmap[sectionIndex].lessons[lessonIndex+1].isCurrent = true
      roadmap.roadmap[sectionIndex].lessons[lessonIndex+1].locked = false
      await roadmap.save()
      return {message: 'Lesson finished', success: true}
    } catch (error) {
      console.log(error)
      return {message: error, success: false}
    }
  }

  async setUserAnswers(answers: number[], lessonIndex: number, sectionIndex: number, roadmapId:string){
    try {
      const roadmap = await RoadMap.findById(roadmapId)
      if(!roadmap){
        return {message: 'Roadmapid is requrired', success: false}
      }
      const lesson = await LessonModel.findById(roadmap.roadmap[sectionIndex].lessons[lessonIndex].lessonContent)
      if(!lesson){
        return {message: 'Lesson not found', success: false}
      }
      lesson.lessons.map((les, index) => les.answer = answers[index])
      await lesson.save()
      await roadmap.save()
      return {message: 'Answers saved', success: true}
    } catch (error) {
      console.log(error)
      return {message: error, success: false}
    }
  }

  async handleNextLesson(lessonIndex:number, sectionIndex: number, roadmapId: string){
    try {
      const roadmap = await RoadMap.findById(roadmapId)
      if(!roadmap){
        return {message: 'Roadmap not found', success: false}
      }
      const lesson = roadmap.roadmap[sectionIndex].lessons[lessonIndex+1]
      lesson.locked = false
      await roadmap.save()
      return {message: 'Lesson unlocked', success: true}
    } catch (error) {
      console.log(error)
      return {message: error, success: false}
    }
  }

  async setXpGained(lessonIndex: number, sectionIndex: number, roadmapId: string, xp: number){
    try {
      const roadmap = await RoadMap.findById(roadmapId)
      if(!roadmap){
        return {message: 'Roadmap not found', success: false}
      }
      roadmap.roadmap[sectionIndex].lessons[lessonIndex].xpGained = xp
      await roadmap.save()
      return {message: 'Lesson finished', success: true}
    } catch (error) {
      console.log(error)
      return {message: error, success: false}
    }
  }

  async handleIncorrectThemes(userId: string, incorrectThemes: string[]) {
    try {
      const user = await User.findById(userId);
      if (!user) return null;
      
      user.themesToImprove = [...new Set([...user.themesToImprove, ...incorrectThemes])];
  
      await user.save();
      return true;
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async updateXp(userId: string, points: number) {
    try {
      const user = await User.findById(userId);
      if (!user) return null;
      user.todaysXp += points;
      user.totalXp += points;

      await user.save();
      return true;
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async updateStreak(userId: string) {
    try {
      const today = new Date();
      const todayDateString = today.toISOString().split('T')[0];
  
      let user = await UserModel.findById(userId);
      if (!user) {
        return false;
      }
  
      const lastActivityDate = new Date(user.lastActivityDate);
      const lastActivityDateString = lastActivityDate.toISOString().split('T')[0];
      console.log(lastActivityDate, lastActivityDateString, today, todayDateString)
      if (lastActivityDateString === todayDateString) {
        return { message: 'Already updated today', streakCount: user.streak };
      }
  
      const dayDifference = Math.floor((today.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24));
  
      if (dayDifference === 1) {
        user.streak += 1;
      } else {
        user.streak = 1;
      }
  

      if (!user.visitedDays.includes(todayDateString)) {
        user.visitedDays.push(todayDateString);
      }

      user.longestStreak = Math.max(user.longestStreak, user.streak);
      user.lastActivityDate = today;
      await user.save();
  
      return { message: 'Streak updated', streakCount: user.streak };
    } catch (error) {
      console.log(error)
      return false
    }
  }
  
  async fetchAllUserData(userId: string) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        console.log('User not found');
        return null;
      }
      const today = new Date().toISOString().split('T')[0];
      if(user.lastActivityDate.toISOString().split('T')[0] === today){
        user.todaysXp = 0;
        await user.save()
      }
      console.log(user);
      return user;
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async refreshTodaysXp(userId: string) {
    try {
        const user = await UserModel.findById(userId)
        if (!user) {
          console.log('User not found');
          return null;
        }
        user.todaysXp = 0;
        await user.save();
        return true;
      } catch (error) {
        console.log(error)
        return false
      }
  }

  async updateUser(userId: string, updatedUserData: Partial<UserType>) {
    try {
      const user = await User.findById(userId);
      if (!user) return null;

      Object.assign(user, updatedUserData);

      await user.save();
      return user;
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async updateBestThemes(userId: string, bestThemes: string[]){
    try {
      const user = await User.findById(userId);
      if (!user) return null;

      user.bestThemes = [...new Set([...user.bestThemes, ...bestThemes])];

      await user.save();
      return true; 
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getAllUsers(){
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

