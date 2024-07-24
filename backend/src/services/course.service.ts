import { RoadMap, RoadMapType } from "../models/roadmap.models";
import { UserModel as User, UserModel, UserType } from "../models/user.models";
import { model, generationConfig, safetySetting } from "../core/config/gemini";
import LessonModel from "../models/lessoncontent.models";

export default class CourseService {
  private async retryOperation<T>(operation: () => Promise<T>, retries: number = 3): Promise<T | null> {
    let attempt = 0;
    while (attempt < retries) {
      try {
        return await operation();
      } catch (error) {
        attempt++;
        console.log(`Attempt ${attempt} failed. Retrying...`);
        if (attempt >= retries) {
          console.log('Max retries reached. Operation failed.');
          return null;
        }
        await new Promise(res => setTimeout(res, 2000)); 
      }
    }
    return null;
  }

  async generateLessonMath(roadmapId: string, lessonIndex: number, sectionIndex: number) {
    return this.retryOperation(async () => {
      const roadmap = await RoadMap.findById(roadmapId);
      if (!roadmap) return null;
      const lesson = roadmap.roadmap[sectionIndex].lessons[lessonIndex];
      if (!lesson) return null;
      if(lesson.lessonContent){
        return await LessonModel.findById(lesson.lessonContent)
      }
      const parts =   [
        {
          "text": `**Goal:** Create a comprehensive JSON file containing 5 precise math practice questions for the National University Entrance Test (NUET) based on the lesson description: ${lesson.title}.\n\n**Structure:** Each element in the array should be a JSON object with the following format:\n[\n  {\n    \"id\": \"1\",  // Unique identifier for the question\n    \"statement\": \"STRING\",  // Optional introductory statement or context\n    \"question\": \"STRING\",  // Question text using better-react-mathjax markdown\n    \"type\": \"STRING\",  // Type of question, e.g., \"inequality solving\"\n    \"explanation\": \"STRING\",  // Detailed explanation using better-react-mathjax markdown, if applicable\n    \"options\": [\n      \"STRING\",  // Option 1 text\n      \"STRING\",  // Option 2 text\n      \"STRING\",  // Option 3 text\n      \"STRING\",  // Option 4 text\n      \"STRING\"   // Optional, for 5-choice questions\n    ],\n    \"rightAnswer\": \"NUMBER\"  // NUMBER of the correct option, e.g., \"1\"\n  }\n]\n\n**Emphasis:** Ensure questions meet the following criteria:\n\n- **Mathematical Reasoning:** Questions should require mathematical concepts and logical reasoning for solutions.\n- **Clarity:** Each question should be clear and unambiguous.\n\n**Question Types:** Generate questions based on the following NUET question formats as outlined in the lesson description:\n\n1. **Binary Operations and Properties:** Include operations with integers, fractions, and decimals.\n2. **Inequality Solving:** Formulate inequalities requiring solutions.\n3. **Simultaneous Equations:** Create problems involving multiple variables.\n4. **Algebraic Fractions and Manipulation:** Develop questions involving algebraic fraction simplification.\n5. **Exponents and Logarithms:** Generate problems that use exponent rules and logarithmic identities.\n6. **Quadratic Equations:** Formulate equations requiring the quadratic formula or factoring.\n7. **Geometric Problems:** Include geometric scenarios, potentially with visual aids (SVG files).\n8. **Straight Line Equations and Relationships:** Questions should involve slopes, intercepts, and analysis of linear equations.\n9. **Logic and Reasoning:** Develop problems requiring logical deductions from given statements.\n10. **Word Problems:** Create word problems involving volumes, surface areas, and real-world contexts.\n11. **Permutation and Combination Problems:** Generate questions involving combinatorial principles.\n\n**Format Requirements:**\n\n- **question:** Use better-react-mathjax markdown for mathematical expressions.\n\n- **questionType:** Clearly specify the type of question (e.g., \"inequality solving\").\n\n- **explanation:** Provide a detailed solution using better-react-mathjax markdown, if applicable.\n\n- **options:** Include answer choices. Optional fifth choice can be included.\n\n- **rightAnswer:** Indicate the number of the correct option (e.g., \"1\" for the first option).\n\n**Additional Constraints:**\n\n- **Difficulty Level:** Ensure each question is appropriate for the NUET level, requiring mathematical reasoning and understanding of the material.\n\n- **Contextual Relevance:** Ensure questions are relevant to the specific topics covered in the lesson description.\n\n- **Visual Aids:** For geometric questions, provide SVG files or references to diagrams where applicable.\n\n**Example Output:**\n[\n  {\n    \"id\": \"1\",\n    \"statement\": \"Consider the binary operation defined as follows:\",\n    \"question\": \"If \\\\( a \\\\ast b = a^2 + b^2 - ab \\\\), find the value of \\\\( (2 \\\\ast 3) \\\\ast 4 \\\\).\",\n    \"type\": \"binary operations\",\n    \"explanation\": \"First, calculate \\\\( 2 \\\\ast 3 = 2^2 + 3^2 - (2 \\\\cdot 3) = 7 \\\\). Next, calculate \\\\( (2 \\\\ast 3) \\\\ast 4 = 7 \\\\ast 4 = 7^2 + 4^2 - (7 \\\\cdot 4) = 33 \\\\).\",\n    \"options\": [\n      \"13\",\n      \"25\",\n      \"33\",\n      \"49\",\n      \"None of the above\"\n    ],\n    \"rightAnswer\": \"3\"\n  },\n  {\n    \"id\": \"2\",\n    \"statement\": \"Solve the following inequality:\",\n    \"question\": \"\\\\( 3x - 5 < 2x + 4 \\\\)\",\n    \"type\": \"inequality solving\",\n    \"explanation\": \"Subtract \\\\(2x\\\\) from both sides to get \\\\(x - 5 < 4\\\\). Add 5 to both sides to get \\\\(x < 9\\\\).\",\n    \"options\": [\n      \"x > 9\",\n      \"x < 9\",\n      \"x = 9\",\n      \"x \\\\leq 9\",\n      \"None of the above\"\n    ],\n    \"rightAnswer\": \"2\"\n  }\n]`
        },
        {
          "text": "[ {\n    \"statement\": \"Evaluate the following argument:\",\n    \"question\": \"If all humans are mortal, and Socrates is a human, what can we conclude about Socrates?\",\n    \"variants\": [\n      \"Socrates is immortal.\",\n      \"Socrates is a god.\",\n      \"Socrates is mortal.\",\n      \"Socrates is an animal.\",\n      \"Socrates is an alien.\"\n    ],\n    \"rightAnswer\": 2,\n    \"type\": \"Critical Thinking\",\n    \"explanation\": \"Since the premises state that all humans are mortal and Socrates is a human, the conclusion logically follows that Socrates is mortal.\"\n} ]"
        }
      ]

      const lessonContent = await model.generateContent({
        generationConfig: generationConfig,
        contents: [{ role: "user", parts: parts }]
      });

      const LessonJson = JSON.parse(lessonContent.response.text());
      console.log(LessonJson);
      const lessonModelInstance = new LessonModel({ lessons: LessonJson });
      if (typeof lessonModelInstance.id === 'string') {
        roadmap.roadmap[sectionIndex].lessons[lessonIndex].lessonContent = lessonModelInstance.id;
      }
      await lessonModelInstance.save();
      await roadmap.save();
      return LessonJson;
    });
  }

  async generateLessonCritical(roadmapId: string, lessonIndex: number, sectionIndex: number) {
    return this.retryOperation(async () => {
      const roadmap = await RoadMap.findById(roadmapId);
      console.log(roadmap);
      if (!roadmap) return null;
      const lesson = roadmap.roadmap[sectionIndex].lessons[lessonIndex];
      if (!lesson) return null;
      console.log(lesson);
      if(lesson.lessonContent){
        return await LessonModel.findById(lesson.lessonContent)
      }
      const parts = [
        {text: `**Prompt:**\n\nGenerate 5 critical thinking questions based on the provided lesson description: ${lesson.title}. Each question should be in the following JSON format and should focus on analyzing information, identifying biases, and evaluating potential outcomes. Emphasize logical reasoning, including drawing conclusions and identifying logical fallacies. Encourage examining situations from multiple perspectives for a nuanced understanding.\n\n\n{\n  \"id\": \"unique_id\",\n  \"question\": \"question_text\",\n  \"statement\": \"lesson_description\",\n  \"options\": [\n    \"Option 1\",\n    \"Option 2\",\n    \"Option 3\",\n    \"Option 4\",\n    \"Option 5\"\n  ],\n  \"rightAnswer\": \"index_of_the_correct_option\",\n  \"explanation\": \"The correct answer is explanation_of_why_the_selected_option_is_correct.\",\n  \"table\": \"optional_HTML_table_data_if_relevant\",\n  \"type\": \"question_type\"\n}\n**Instructions:**\n1. **Generate Each Question with a Unique id.**\n2. **The statement Should Summarize Key Arguments or Data from the Provided Lesson Description.**\n\n3. **Determine the Question Type Based on the Lesson Description:**\n   - **Main Conclusion:** Use the question: \"Which one of the following is an expression of the main conclusion of the above argument?\"\n   - **Flaw in the Argument:** Use: \"Which one of the following is the best statement of the flaw in the above argument?\"\n   - **Reliable Conclusion:** Use: \"Which one of the following is a conclusion that can reliably be drawn from the above passage?\"\n   - **Underlying Assumption:** Use: \"Which one of the following is an underlying assumption of the above argument?\"\n   - **Weakening the Argument:** Use: \"Which one of the following, if true, would most weaken the above argument?\"\n   - **Reasoning Parallel:** Use: \"Which one of the following most closely parallels the reasoning used in the above argument?\"\n   - **Identifying Principle:** Use: \"Which one of the following identifies the principle underlying the above argument?\"\n   - **Support from Data:** Use: \"Which one of the following conclusions is best supported by the data given above?\"\n\n4. **Provide 5 Distinct Options for Each Question, Ensuring Only One Option is Correct.**\n5. **The rightAnswer Should be the Index of the Correct Option (0-based Index).**\n6. **The explanation Should Clearly Justify Why the Selected Option is Correct Based on the Lesson Description.**\n7. **Include Relevant HTML Table Data in the table Field if Applicable.**\n8. **The type Field Should Indicate the Type of Question Being Asked (e.g., Main Conclusion, Flaw in the Argument).**\n\n**Examples:**\n\n1. **Main Conclusion**\n   {\n     \"id\": \"1\",\n     \"question\": \"Which one of the following is an expression of the main conclusion of the above argument?\",\n     \"statement\": \"Recent studies have shown that regular exercise significantly reduces the risk of chronic diseases such as heart disease, diabetes, and cancer. Despite these findings, many people continue to lead sedentary lifestyles, often citing a lack of time or motivation as reasons for not exercising. However, the long-term benefits of physical activity far outweigh the short-term challenges. Communities should therefore invest in public fitness programs to encourage a more active population.\",\n     \"options\": [\n       \"The long-term benefits of physical activity far outweigh the short-term challenges.\",\n       \"Regular exercise significantly reduces the risk of chronic diseases.\",\n       \"Many people continue to lead sedentary lifestyles.\",\n       \"Communities should invest in public fitness programs.\",\n       \"A lack of time or motivation prevents people from exercising.\"\n     ],\n     \"rightAnswer\": \"3\",\n     \"explanation\": \"The main conclusion of the argument is that communities should invest in public fitness programs to encourage a more active population.\",\n     \"table\": \"\",\n     \"type\": \"main conclusion\"\n   }\n\n2. **Flaw in the Argument**\n   {\n     \"id\": \"2\",\n     \"question\": \"Which one of the following is the best statement of the flaw in the above argument?\",\n     \"statement\": \"Governments should ban all forms of tobacco advertising. Tobacco use is linked to numerous health problems, including lung cancer and heart disease. By prohibiting tobacco advertisements, the government would prevent new users from starting and would encourage current users to quit. This would lead to a healthier population and reduced healthcare costs.\",\n     \"options\": [\n       \"It assumes that banning advertisements will directly result in a reduction of tobacco use.\",\n       \"It overlooks the potential loss of revenue from tobacco sales.\",\n       \"It ignores the role of personal choice in tobacco use.\",\n       \"It fails to consider other forms of advertising that could replace tobacco ads.\",\n       \"It does not provide evidence that tobacco advertising directly causes tobacco use.\"\n     ],\n     \"rightAnswer\": \"0\",\n     \"explanation\": \"The argument assumes that banning advertisements will directly result in a reduction of tobacco use without considering other factors that influence smoking behavior.\",\n     \"table\": \"\",\n     \"type\": \"flaw identification\"\n   }\n\n3. **Data Analysis**\n   {\n     \"id\": \"3\",\n     \"question\": \"What is the main conclusion that can be drawn from the data in the table above?\",\n     \"statement\": \"The following table shows the number of hours spent on different activities by students in a week.\",\n     \"options\": [\n       \"Students spend more time on social activities than on studying.\",\n       \"The majority of students' time is spent on academic activities.\",\n       \"Students spend an equal amount of time on sports and studying.\",\n       \"Extracurricular activities take up the least amount of students' time.\",\n       \"Students spend a significant amount of their time on leisure activities.\"\n     ],\n     \"rightAnswer\": \"1\",\n     \"explanation\": \"The table shows that the majority of students' time is spent on academic activities, indicating the importance placed on studying.\",\n     \"table\": \"ActivityHours SpentStudying20Social Activities10Sports5Extracurricular Activities2Leisure Activities8\",\n     \"type\": \"data analysis\"\n   }\n\n4. **Support from Data**\n   {\n     \"id\": \"4\",\n     \"question\": \"Which of the following conclusions is best supported by the data presented in the table?\",\n     \"statement\": \"The following table shows the sales figures for different product categories in a retail store over a quarter.\",\n     \"options\": [\n       \"Electronics have the highest sales figures.\",\n       \"Clothing sales are significantly higher than food sales.\",\n       \"The sales of home appliances are lower than those of electronics.\",\n       \"Food products have the lowest sales figures.\",\n       \"Clothing and electronics have similar sales figures.\"\n     ],\n     \"rightAnswer\": \"2\",\n     \"explanation\": \"The table shows that the sales of home appliances are indeed lower than those of electronics, supporting this conclusion.\",\n     \"table\": \"Product CategorySales (in units)Electronics1500Clothing1200Food800Home Appliances1000\",\n     \"type\": \"data analysis\"\n   }`},
        {text: "[ {    \"statement\": \"Evaluate the following argument:\",    \"question\": \"If all humans are mortal, and Socrates is a human, what can we conclude about Socrates?\",   \"table\": \"generate html table if question asks\" \" \"variants\": [      \"Socrates is immortal.\",      \"Socrates is a god.\",      \"Socrates is mortal.\",      \"Socrates is an animal.\",      \"Socrates is an alien.\"    ],    \"rightAnswer\": 2,    \"type\": \"Critical Thinking\",    \"explanation\": \"Since the premises state that all humans are mortal and Socrates is a human, the conclusion logically follows that Socrates is mortal.\" } "},
      ];

      const lessonContent = await model.generateContent({
        generationConfig: generationConfig,
        contents: [{ role: "user", parts: parts }]
      });

      const LessonJson = JSON.parse(lessonContent.response.text());
      console.log(LessonJson);
      const lessonModelInstance = new LessonModel({ lessons: LessonJson });
      if (typeof lessonModelInstance.id === 'string') {
        roadmap.roadmap[sectionIndex].lessons[lessonIndex].lessonContent = lessonModelInstance.id;
      }
      await lessonModelInstance.save();
      await roadmap.save();
      return LessonJson;
    });
  }

  async handleIncorrectThemes(userId: string, incorrectThemes: string[]) {
    return this.retryOperation(async () => {
      const user = await User.findById(userId);
      if (!user) return null;
      
      user.themesToImprove = [...new Set([...user.themesToImprove, ...incorrectThemes])];

      await user.save();
      return true;
    });
  }

  async updateXp(userId: string, points: number) {
    return this.retryOperation(async () => {
      const user = await User.findById(userId);
      if (!user) return null;

      user.todaysXp += points;
      user.totalXp += points;

      await user.save();
      return true;
    });
  }

  async updateStreak(userId: string) {
    return this.retryOperation(async () => {
      const today = new Date();
      let user = await UserModel.findById(userId);

      if (!user) {
        return false;
      }

      const lastActivityDate: Date = new Date(user.lastActivityDate);
      let dayDifference = Math.floor((today.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24)); 

      if (dayDifference === 0) {
        return { message: 'Already updated today', streakCount: user.streak };
      }

      if (dayDifference === 1) {
        user.streak += 1;
      } else {
        user.streak = 1;
      }
      if (!user.visitedDays.includes(today.toISOString().split('T')[0])) {
        user.visitedDays.push(today.toISOString().split('T')[0]);
      }
      user.longestStreak = Math.max(user.longestStreak, user.streak);
      user.lastActivityDate = today;
      await user.save();

      return { message: 'Streak updated', streakCount: user.streak };
    });
  }

  async fetchAllUserData(userId: string) {
    return this.retryOperation(async () => {
      const user = await User.findById(userId);
      if (!user) {
        console.log('User not found');
        return null;
      }
      console.log(user);
      return user;
    });
  }

  async updateUser(userId: string, updatedUserData: Partial<UserType>) {
    return this.retryOperation(async () => {
      const user = await User.findById(userId);
      if (!user) return null;

      Object.assign(user, updatedUserData);

      await user.save();
      return user;
    });
  }

  async updateBestThemes(userId: string, bestThemes: string[]){
    return this.retryOperation(async () => {
      const user = await User.findById(userId);
      if (!user) return null;

      user.bestThemes = [...new Set([...user.bestThemes, ...bestThemes])];

      await user.save();
      return true;
    });
  }
}
