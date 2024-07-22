import { RoadMap, RoadMapType } from "../models/roadmap.models";
import { UserModel as User, UserType } from "../models/user.models";
import { model, generationConfig, safetySetting } from "../core/config/gemini";
import LessonModel from "../models/lessoncontent.models";

export default class CourseService {
  async generateLessonMath(roadmapId: string, lessonIndex: number, sectionIndex: number) {
    try {
      const roadmap = await RoadMap.findById(roadmapId);
      if (!roadmap) return null;
      const lesson = roadmap.roadmap[sectionIndex].lessons[lessonIndex];
      if (!lesson) return null;

        const parts =  [
          {text: `Given the lesson structure ${lesson}, generate 5 questions based on the provided questions below. Ensure the questions cover various mathematical concepts and follow the structure exactly. Use  better-react-mathjax markdown for mathematical expressions to ensure proper rendering.\n\n### Example Questions:\n\n[\n  {\n    \"statement\": \"Evaluate the following argument:\",\n    \"question\": \"The symbol \\\\(\\\\geq\\\\) defines a mathematical binary operation such that \\\\(y \\\\geq x = \\\\frac{y}{x^x}\\\\) for all positive integers. What is the value of \\\\((2 \\\\geq 3) \\\\geq 2\\\\)?\",\n    \"variants\": [\n      \"0.074074\",\n      \"0.027778\",\n      \"0.148148\",\n      \"0.222222\"\n    ],\n    \"rightAnswer\": 0,\n    \"type\": \"Mathematics\",\n    \"explanation\": \"First, compute \\\\(2 \\\\geq 3\\\\): \\\\(2 \\\\geq 3 = \\\\frac{2}{3^3} = \\\\frac{2}{27} \\\\approx 0.074074\\\\). Then, compute \\\\(0.074074 \\\\geq 2\\\\): \\\\(0.074074 \\\\geq 2 = \\\\frac{0.074074}{2^2} = \\\\frac{0.074074}{4} \\\\approx 0.018518\\\\).\"\n  },\n  {\n    \"statement\": \"Solve the inequality:\",\n    \"question\": \"\\\\(x^2 \\\\geq 8 - 2x\\\\)\",\n    \"variants\": [\n      \"x \\\\leq -4 \\\\text{ or } x \\\\geq 2\",\n      \"x \\\\geq -4 \\\\text{ or } x \\\\leq 2\",\n      \"x \\\\leq -2 \\\\text{ or } x \\\\geq 4\",\n      \"x \\\\geq -2 \\\\text{ or } x \\\\leq 4\"\n    ],\n    \"rightAnswer\": 0,\n    \"type\": \"Mathematics\",\n    \"explanation\": \"Rearrange the inequality: \\\\(x^2 + 2x - 8 \\\\geq 0\\\\). Factorize: \\\\((x + 4)(x - 2) \\\\geq 0\\\\). The solution is \\\\(x \\\\leq -4\\\\) or \\\\(x \\\\geq 2\\\\).\"\n  },\n  {\n    \"statement\": \"Find the sum of the two values of x that satisfy the simultaneous equations:\",\n    \"question\": \"\\\\(x - 3y + 1 = 0\\\\) and \\\\(3x^2 - 7xy = 5\\\\)\",\n    \"variants\": [\n      \"7\",\n      \"5\",\n      \"9\",\n      \"11\"\n    ],\n    \"rightAnswer\": 0,\n    \"type\": \"Mathematics\",\n    \"explanation\": \"Solving the first equation for \\\\(x\\\\) gives \\\\(x = 3y - 1\\\\). Substitute into the second equation: \\\\(3(3y-1)^2 - 7(3y-1)y = 5\\\\). Simplify and solve for \\\\(y\\\\), then find \\\\(x\\\\) values and their sum.\"\n  },\n  {\n    \"statement\": \"Calculate the length of a line joining a vertex to the midpoint of one of the opposite faces of a cube with unit length sides.\",\n    \"question\": \"A cube has unit length sides. What is the length of a line joining a vertex to the midpoint of one of the opposite faces?\",\n    \"variants\": [\n      \"\\\\(\\\\frac{\\\\sqrt{3}}{2}\\\\)\",\n      \"\\\\(\\\\frac{\\\\sqrt{2}}{2}\\\\)\",\n      \"\\\\(\\\\frac{\\\\sqrt{3}}{4}\\\\)\",\n      \"\\\\(\\\\frac{\\\\sqrt{2}}{4}\\\\)\"\n    ],\n    \"rightAnswer\": 0,\n    \"type\": \"Mathematics\",\n    \"explanation\": \"The diagonal of a cube face is \\\\(\\\\sqrt{2}\\\\). The midpoint of the opposite face is at half this distance, so the line length is \\\\(\\\\frac{\\\\sqrt{3}}{2}\\\\).\"\n  },\n  {\n    \"statement\": \"Find the expression for the difference between the \\\\((n+1)\\\\)-th term and the \\\\(n\\\\)-th term of the sequence:\",\n    \"question\": \"The \\\\(n\\\\)-th term of a sequence is \\\\(\\\\frac{n}{n+1}\\\\). What is an expression for the difference between the \\\\((n+1)\\\\)-th term and the \\\\(n\\\\)-th term?\",\n    \"variants\": [\n      \"-\\\\frac{1}{(n+1)(n+2)}\",\n      \"\\\\frac{1}{(n+1)(n+2)}\",\n      \"-\\\\frac{n}{(n+1)(n+2)}\",\n      \"\\\\frac{n}{(n+1)(n+2)}\"\n    ],\n    \"rightAnswer\": 0,\n    \"type\": \"Mathematics\",\n    \"explanation\": \"The \\\\(n\\\\)-th term is \\\\(\\\\frac{n}{n+1}\\\\). The \\\\((n+1)\\\\)-th term is \\\\(\\\\frac{n+1}{n+2}\\\\). The difference is \\\\(\\\\frac{n+1}{n+2} - \\\\frac{n}{n+1} = -\\\\frac{1}{(n+1)(n+2)}\\\\).\"\n  }\n]`},
          {text: "[ {    \"statement\": \"Evaluate the following argument:\",    \"question\": \"If all humans are mortal, and Socrates is a human, what can we conclude about Socrates?\",    \"variants\": [      \"Socrates is immortal.\",      \"Socrates is a god.\",      \"Socrates is mortal.\",      \"Socrates is an animal.\",      \"Socrates is an alien.\"    ],    \"rightAnswer\": 2,    \"type\": \"Critical Thinking\",    \"explanation\": \"Since the premises state that all humans are mortal and Socrates is a human, the conclusion logically follows that Socrates is mortal.\" } "},
        ];

      const lessonContent = await model.generateContent({
          generationConfig: generationConfig,
          contents: [{role: "user", parts: parts}]
      })

      const LessonJson = JSON.parse(lessonContent.response.text())
      console.log(LessonJson)
      const lessonModelInstance = new LessonModel({lessons: LessonJson})
      if(typeof lessonModelInstance.id === 'string'){
          roadmap.roadmap[sectionIndex].lessons[lessonIndex].lessonContent = lessonModelInstance.id
      }
      await lessonModelInstance.save()
      await roadmap.save()
      return LessonJson
    } catch (error) {
      console.log("Error" ,error)
      return null
    }
  }

  async generateLessonCritical(roadmapId:string, sectionIndex: number, lessonIndex: number){
    try {
      const roadmap = await RoadMap.findById(roadmapId);
      console.log(roadmap)
      if (!roadmap) return null;
      const lesson = roadmap.roadmap[sectionIndex].lessons[lessonIndex]
      if (!lesson) return null;
      console.log(lesson)
      const parts = [
        {text: `As the world's best lesson generator, your goal is to create five complex and thought-provoking questions based on the following lesson's description: ${lesson}. The questions should challenge their critical thinking skills and ability to analyze the lesson content deeply. Each generated statement you need to make 90 words long because it will test test takers critical thinking abilities \n\nSample Questions:\n\nWhich one of the following is an expression of the main conclusion of the above argument?\nWhich one of the following is the best statement of the flaw in the above argument?\nWhich one of the following is a conclusion that can reliably be drawn from the above passage?\nWhich one of the following is an underlying assumption of the above argument?\nWhich one of the following, if true, would most weaken the above argument?\nWhich one of the following best identifies the flaw in the above reasoning?\nWhich one of the following statements is not true?\nWhich one of the following conclusions can reliably be drawn from the above passage?\nWhich one of the following is an underlying assumption of the above argument?\nWhich one of the following, if true, would most weaken the above argument?\nWhich one of the following is the best expression of the flaw in the above argument?\nWhich one of the following most closely parallels the reasoning used in the above argument?\nWhich one of the following identifies the principle underlying the above argument?\nWhich one of the following conclusions can be drawn from the above passage?\nWhich one of the following is a conclusion that can be drawn from the above passage?`},
        {text: "[ {    \"statement\": \"Evaluate the following argument:\",    \"question\": \"If all humans are mortal, and Socrates is a human, what can we conclude about Socrates?\",    \"variants\": [      \"Socrates is immortal.\",      \"Socrates is a god.\",      \"Socrates is mortal.\",      \"Socrates is an animal.\",      \"Socrates is an alien.\"    ],    \"rightAnswer\": 2,    \"type\": \"Critical Thinking\",    \"explanation\": \"Since the premises state that all humans are mortal and Socrates is a human, the conclusion logically follows that Socrates is mortal.\" } "},
      ];

    const lessonContent = await model.generateContent({
        generationConfig: generationConfig,
        contents: [{role: "user", parts: parts}]
    })

    const LessonJson = JSON.parse(lessonContent.response.text())
    const lessonModelInstance = new LessonModel({lessons: LessonJson}) 
    if(typeof lessonModelInstance.id === 'string'){
        roadmap.roadmap[sectionIndex].lessons[lessonIndex].lessonContent = lessonModelInstance.id
    }
    await lessonModelInstance.save()
    await roadmap.save()
    return LessonJson
    } catch (error) {
      console.log("Error", error)
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
      console.log("Error handling incorrect themes:", error);
      return false; 
    }
  }

  async updateXpAndStreak(userId: string, points: number) {
    try {
      const user = await User.findById(userId);
      if (!user) return null;

      user.todaysXp += points;
      user.totalXp += points;

      if (user.todaysXp > 0) {
        user.streak++;
      } else {
        user.streak = 0;
      }

      await user.save();

      return true; 
    } catch (error) {
      console.log("Error updating XP and streak:", error);
      return false; 
    }
  }

  async resetTodaysXp(userId: string) {
    try {
      const user = await User.findById(userId);
      if (!user) return null;

      user.todaysXp = 0;

      await user.save();

      return true; 
    } catch (error) {
      console.log("Error resetting todaysXp:", error);
      return false; 
    }
  }
  async fetchAllUserData(userId: string) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        console.log('dadadadada')
        return null; 
      }
      console.log(user)
      return user; 
    } catch (error) {
      console.log("Error fetching user data:", error);
      return null; // Indicate failure
    }
  }
  async updateUser(userId: string, updatedUserData: Partial<UserType>) {
    try {
      const user = await User.findById(userId);
      if (!user) return null;

      // Update the user with the provided data
      Object.assign(user, updatedUserData);

      // Save the updated user
      await user.save();

      return user; // Return the updated user object
    } catch (error) {
      console.log("Error updating user:", error);
      return null; // Indicate failure
    }
  }
}
