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
          {text: `Create a comprehensive JSON file containing 1 challenging math practice question for the National University Entrance Test (NUET) based on the lesson description: ${lesson}.\n\n\nSTRUCTURE{\n  \"statement\": \"STRING\",  // Optional introductory statement or context\n  \"question\": \"STRING\",  // Question text using better-react-mathjax markdown\n  \"type\": \"STRING\",  // Type of question, e.g., 'inequality solving'\n  \"explanation\": \"STRING\",  // Detailed explanation using better-react-mathjax markdown, if applicable\n  \"variants\": [\n    \"STRING\",  // Variant 1 text\n    \"STRING\",  // Variant 2 text\n    \"STRING\",  // Variant 3 text\n    \"STRING\",  // Variant 4 text\n    \"STRING\"   // Variant 5 text\n  ],\n  \"rightAnswer\": \"NUMBER\"  // Index of the correct variant, starting from 0, e.g., '0' for the first variant\n}\nEMPHASIS:\nEnsure questions meet the following criteria: Advanced Mathematical Reasoning, Multi-Perspective ExaminationFORMAT REQUIREMENTS:question: Use better-react-mathjax markdown for mathematical expressions.type: Clearly specify the type of question (e.g., 'inequality solving').explanation: Provide a detailed solution using better-react-mathjax markdown, if applicable.variants: Include exactly 5 answer choices.rightAnswer: Indicate the index of the correct variant (starting from 0, e.g., '0' for the first variant).Ensure that each question is challenging, requiring higher-order thinking and a deep understanding of the material.Ensure questions are closely related to the specific topics covered in the lesson description.For geometric questions, provide SVG files or references to diagrams where applicable\n{\n  \"id\": \"1\",\n  \"statement\": \"Consider the binary operation defined as follows:\",\n  \"question\": \"If \\\\( a \\\\ast b = a^2 + b^2 - ab \\\\), find the value of \\\\( (2 \\\\ast 3) \\\\ast 4 \\\\).\",\n  \"type\": \"binary operations\",\n  \"explanation\": \"First, calculate \\\\( 2 \\\\ast 3 = 2^2 + 3^2 - (2 \\\\cdot 3) = 7 \\\\). Next, calculate \\\\( (2 \\\\ast 3) \\\\ast 4 = 7 \\\\ast 4 = 7^2 + 4^2 - (7 \\\\cdot 4) = 33 \\\\).\",\n  \"variants\": [\n    \"13\",\n    \"25\",\n    \"33\",\n    \"49\",\n    \"None of the above\"\n  ],\n  \"rightAnswer\": \"2\"  // Index of the correct variant, starting from 0\n}`},
          {text: " "},
        ];
        return this.generateRoadmapWithRetries(parts, 3);
      }
      if (roadmapType === 'critical') {
        const parts = [
          {text: `GOAL:\nCreate a comprehensive JSON file containing 1 challenging critical thinking practice question for the National University Entrance Test (NUET) based on the lesson description: ${lesson}\n\n\nSTRUCTURE{\n  \"statement\": \"STRING\",\n  \"question\": \"STRING\",\n  \"type\": \"STRING\",\n  \"explanation\": \"STRING\",\n  \"variants\": [\n    \"STRING\",  // Variant 1 text\n    \"STRING\",  // Variant 2 text\n    \"STRING\",  // Variant 3 text\n    \"STRING\",  // Variant 4 text\n    \"STRING\"   // Variant 5 text\n  ],\n  \"rightAnswer\": \"NUMBER\"  // Index of the correct variant, starting from 0\n}\nEMPHASIS:\nEnsure questions meet the following criteria: Advanced Critical Thinking, Multi-Perspective AnalysisFORMAT REQUIREMENTS:question: Ensure the question is complex and requires deep analysis and reasoning.type: Clearly specify the type of question (e.g., 'identify main conclusion', 'evaluate argument', 'identify bias').explanation: Provide a detailed explanation that clearly justifies the correct answer and explores the reasoning process.variants: Include answer choices that are plausible and require careful consideration to differentiate.rightAnswer: Indicate the index of the correct variant (starting from 0, e.g., '0' for the first variant).Ensure questions are closely related to the specific topics covered in the lesson description. For questions involving data or arguments, include relevant data or scenarios to analyze.EXAMPLE OUTPUT:\n\n\n{\n  \"statement\": \"If people go to a foreign country, they should try to learn at least some of the language of that country because, while it is difficult to pick up a foreign language in a short time, learning just a little of a foreign language helps you to find out more about the country itself and its people’s customs. As well as this, it means that you can do things much more easily, such as asking for directions or just being able to order what you want at a restaurant, which is much less embarrassing than pointing and arm-waving.\",\n  \"question\": \"Which one of the following is an expression of the main conclusion of the above argument?\",\n  \"type\": \"main conclusion\",\n  \"explanation\": \"The main conclusion of the argument is that if people go to a foreign country, they should try to learn at least some of the language of that country. This statement encapsulates the overall advice given by the author, supported by the various benefits mentioned.\",\n  \"variants\": [\n    \"Learning a little of a foreign language helps you to find out more about the country and its customs.\",\n    \"You can do things much more easily in a foreign country by learning some of the language.\",\n    \"It is difficult to pick up a foreign language in a short time.\",\n    \"If people go to a foreign country, they should try to learn at least some of the language of that country.\",\n    \"Being able to order what you want at a restaurant is much less embarrassing than pointing and arm-waving.\"\n  ],\n  \"rightAnswer\": 3  // Index of the correct variant, starting from 0\n}`},
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
      console.log(roadmap)
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
  
      const incorrectIndexes = lesson.lessons
        .map((question, index) => question.answer !== question.rightAnswer ? index : null)
        .filter(index => index !== null) as number[];
  
      const incorrectLessons = lesson.lessons
        .filter((_, index) => incorrectIndexes.includes(index));
  
      if (incorrectIndexes.length === 0) {
        roadmap.roadmap[sectionIndex].lessons[lessonIndex].finished = true;
        roadmap.roadmap[sectionIndex].lessons[lessonIndex].locked = true;
        roadmap.roadmap[sectionIndex].lessons[lessonIndex].isCurrent = false;
        roadmap.roadmap[sectionIndex].lessons[lessonIndex + 1].isCurrent = true;
        roadmap.roadmap[sectionIndex].lessons[lessonIndex + 1].locked = false;
        await roadmap.save();
        return { message: 'Lesson finished', success: true };
      } else {
        return { incorrectIndexes: incorrectIndexes, incorrectLessons: incorrectLessons, success: true };
      }
    } catch (error: any) {
      console.log(error);
      return { message: error.message, success: false };
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

  async setUserAnswers(answers: number[], incorrectIndexes: number[], lessonIndex: number, sectionIndex: number, roadmapId: string) {
    try {
      const roadmap = await RoadMap.findById(roadmapId);
      if (!roadmap) {
        return { message: 'RoadmapId is required', success: false };
      }
  
      const lessonId = roadmap.roadmap[sectionIndex].lessons[lessonIndex].lessonContent;
      const lesson = await LessonModel.findById(lessonId);
      if (!lesson) {
        return { message: 'Lesson not found', success: false };
      }
  
      incorrectIndexes.forEach((incorrectIndex, i) => {
        lesson.lessons[incorrectIndex].answer = answers[i];
      });
  
      await lesson.save();
      await roadmap.save();
      return { message: 'Answers saved', success: true };
  
    } catch (error: any) {
      console.log(error);
      return { message: error.message, success: false };
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

  async setXpGained(lessonIndex: number, sectionIndex: number, roadmapId: string, xp: number) {
    try {
      const roadmap = await RoadMap.findById(roadmapId);
      if (!roadmap) {
        return { message: 'Roadmap not found', success: false };
      }
      roadmap.roadmap[sectionIndex].lessons[lessonIndex].xpGained = Math.round(xp);
      await roadmap.save();
      return { message: 'Lesson finished', success: true };
    } catch (error) {
      console.log(error);
      return { message: error, success: false };
    }
  }
  
  async handleIncorrectThemes(userId: string, incorrectThemes: string[]) {
    try {
      const user = await User.findById(userId);
      if (!user) return null;

      // Remove % and numbers from incorrect themes
      const processedIncorrectThemes = incorrectThemes.map(theme => 
        theme.replace(/%|\d/g, '') 
      );

      user.themesToImprove = [...new Set([...user.themesToImprove, ...processedIncorrectThemes])];

      user.bestThemes = user.bestThemes.filter(theme => 
        !processedIncorrectThemes.includes(theme.replace(/%|\d/g, ''))
      );

      await user.save();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  
  async updateXp(userId: string, points: number) {
    try {
      const user = await User.findById(userId);
      if (!user) return null;
      const roundedPoints = Math.round(points);
      user.todaysXp += roundedPoints;
      user.totalXp += roundedPoints;
  
      await user.save();
      return true;
    } catch (error) {
      console.log(error);
      return false;
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
        if(user.lastActivityDate){
          const today = new Date();
          const todayDateString = today.toISOString().split('T')[0];
          const lastActivityDate = new Date(user.lastActivityDate);
          const lastActivityDateString = lastActivityDate.toISOString().split('T')[0];
          if(lastActivityDateString !== todayDateString){
            user.todaysXp = 0;
            await user.save();
            return true;
          }
        }
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

  async updateBestThemes(userId: string, bestThemes: string[]) {
    try {
      const user = await User.findById(userId);
      if (!user) return null;

      const processedBestThemes = bestThemes.map(theme => 
        theme.replace(/%|\d/g, '')
      );

      user.bestThemes = [...new Set([...user.bestThemes, ...processedBestThemes])];

      user.themesToImprove = user.themesToImprove.filter(theme => 
        !processedBestThemes.includes(theme.replace(/%|\d/g, ''))
      );

      await user.save();
      return true;
    } catch (error) {
      console.log(error);
      return false;
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

