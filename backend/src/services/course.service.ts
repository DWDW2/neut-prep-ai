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

      const parts =   [
        {
          "text": `**Goal:** Create a comprehensive JSON file containing 5 precise math practice questions for the National University Entrance Test (NUET) based on the lesson description: ${lesson}.\n\n**Structure:** Each element in the array should be a JSON object with the following format:\n[\n  {\n    \"id\": \"1\",  // Unique identifier for the question\n    \"statement\": \"STRING\",  // Optional introductory statement or context\n    \"question\": \"STRING\",  // Question text using better-react-mathjax markdown\n    \"type\": \"STRING\",  // Type of question, e.g., \"inequality solving\"\n    \"explanation\": \"STRING\",  // Detailed explanation using better-react-mathjax markdown, if applicable\n    \"options\": [\n      \"STRING\",  // Option 1 text\n      \"STRING\",  // Option 2 text\n      \"STRING\",  // Option 3 text\n      \"STRING\",  // Option 4 text\n      \"STRING\"   // Optional, for 5-choice questions\n    ],\n    \"rightAnswer\": \"NUMBER\"  // NUMBER of the correct option, e.g., \"1\"\n  }\n]\n\n**Emphasis:** Ensure questions meet the following criteria:\n\n- **Mathematical Reasoning:** Questions should require mathematical concepts and logical reasoning for solutions.\n- **Clarity:** Each question should be clear and unambiguous.\n\n**Question Types:** Generate questions based on the following NUET question formats as outlined in the lesson description:\n\n1. **Binary Operations and Properties:** Include operations with integers, fractions, and decimals.\n2. **Inequality Solving:** Formulate inequalities requiring solutions.\n3. **Simultaneous Equations:** Create problems involving multiple variables.\n4. **Algebraic Fractions and Manipulation:** Develop questions involving algebraic fraction simplification.\n5. **Exponents and Logarithms:** Generate problems that use exponent rules and logarithmic identities.\n6. **Quadratic Equations:** Formulate equations requiring the quadratic formula or factoring.\n7. **Geometric Problems:** Include geometric scenarios, potentially with visual aids (SVG files).\n8. **Straight Line Equations and Relationships:** Questions should involve slopes, intercepts, and analysis of linear equations.\n9. **Logic and Reasoning:** Develop problems requiring logical deductions from given statements.\n10. **Word Problems:** Create word problems involving volumes, surface areas, and real-world contexts.\n11. **Permutation and Combination Problems:** Generate questions involving combinatorial principles.\n\n**Format Requirements:**\n\n- **question:** Use better-react-mathjax markdown for mathematical expressions.\n\n- **questionType:** Clearly specify the type of question (e.g., \"inequality solving\").\n\n- **explanation:** Provide a detailed solution using better-react-mathjax markdown, if applicable.\n\n- **options:** Include answer choices. Optional fifth choice can be included.\n\n- **rightAnswer:** Indicate the number of the correct option (e.g., \"1\" for the first option).\n\n**Additional Constraints:**\n\n- **Difficulty Level:** Ensure each question is appropriate for the NUET level, requiring mathematical reasoning and understanding of the material.\n\n- **Contextual Relevance:** Ensure questions are relevant to the specific topics covered in the lesson description.\n\n- **Visual Aids:** For geometric questions, provide SVG files or references to diagrams where applicable.\n\n**Example Output:**\n[\n  {\n    \"id\": \"1\",\n    \"statement\": \"Consider the binary operation defined as follows:\",\n    \"question\": \"If \\\\( a \\\\ast b = a^2 + b^2 - ab \\\\), find the value of \\\\( (2 \\\\ast 3) \\\\ast 4 \\\\).\",\n    \"type\": \"binary operations\",\n    \"explanation\": \"First, calculate \\\\( 2 \\\\ast 3 = 2^2 + 3^2 - (2 \\\\cdot 3) = 7 \\\\). Next, calculate \\\\( (2 \\\\ast 3) \\\\ast 4 = 7 \\\\ast 4 = 7^2 + 4^2 - (7 \\\\cdot 4) = 33 \\\\).\",\n    \"options\": [\n      \"13\",\n      \"25\",\n      \"33\",\n      \"49\",\n      \"None of the above\"\n    ],\n    \"rightAnswer\": \"3\"\n  },\n  {\n    \"id\": \"2\",\n    \"statement\": \"Solve the following inequality:\",\n    \"question\": \"\\\\( 3x - 5 < 2x + 4 \\\\)\",\n    \"type\": \"inequality solving\",\n    \"explanation\": \"Subtract \\\\(2x\\\\) from both sides to get \\\\(x - 5 < 4\\\\). Add 5 to both sides to get \\\\(x < 9\\\\).\",\n    \"options\": [\n      \"x > 9\",\n      \"x < 9\",\n      \"x = 9\",\n      \"x \\\\leq 9\",\n      \"None of the above\"\n    ],\n    \"rightAnswer\": \"2\"\n  }\n]`
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

      const parts = [
        {text: `You are the best NUET test creator in the world, and your goal is to develop critical thinking skills for the National University Entrance Test (NUET). Focus on open-ended scenarios that require analyzing information (including data presented in HTML tables), identifying biases, and evaluating potential outcomes. Emphasize logical reasoning, including drawing conclusions and identifying logical fallacies from data and arguments. Encourage examining situations from multiple perspectives for a nuanced understanding.\n\n**Instructions for Generating Questions:**\n\n- Each question must be based on the provided lesson description: ${lesson}.\n- Ensure that each statement is at least 90 words long and directly relevant to the lesson content. Avoid including any extraneous information.\n- Generate questions in the following formats:\n\n1. **Expression of the Main Conclusion:**\n   \"Which one of the following is an expression of the main conclusion of the above argument? Analyze the lesson description to determine the overall conclusion drawn by the author. Identify which statement most accurately reflects the primary conclusion of the argument based on the lesson content.\"\n\n2. **Identification of Flaws:**\n   \"Which one of the following is the best statement of the flaw in the above argument? Evaluate the lesson description for any logical errors or unsupported assumptions. Identify the statement that best captures a critical flaw or weakness in the argument.\"\n\n3. **Drawing Reliable Conclusions:**\n   \"Which one of the following is a conclusion that can reliably be drawn from the above passage? Review the lesson description to identify which conclusion logically follows from the information provided.\"\n\n4. **Underlying Assumptions:**\n   \"Which one of the following is an underlying assumption of the above argument? Analyze the lesson description to identify the most critical underlying assumption necessary for the argument's reasoning.\"\n\n5. **Weakening the Argument:**\n   \"Which one of the following, if true, would most weaken the above argument? Consider the argument presented in the lesson description and identify which piece of information would most significantly challenge or undermine its validity.\"\n\n6. **Additional Question Types:**\n   - \"Which one of the following best identifies the flaw in the above reasoning?\"\n   - \"Which one of the following is a conclusion that can be drawn from the above passage?\"\n   - \"What is the main conclusion that can be drawn from the data in the table above?\"\n   - \"Which of the following conclusions is best supported by the data presented in the table?\"\n\n**Requirements:**\n\n1. **Length and Clarity:** Each statement must be at least 90 words long.\n2. **Direct Relevance:** Statements should strictly adhere to the lesson description and not include any extraneous information.\n3. **Complexity and Analysis:** Ensure each question rigorously tests critical thinking and deep analysis.\n4. **Answer Variants:** Provide five answer options for each question.\n5. **Explanations:** Include detailed explanations for why the correct answer is correct, linking back to the lesson content.\n6. **Data Presentation:** If applicable, include HTML tables to present data and formulate questions related to data analysis.\n\n**Output Example:**\n\n[\n  {\n    \"id\": \"1\",\n    \"question\": \"Which one of the following is an expression of the main conclusion of the above argument?\",\n    \"statement\": \"The lesson describes a situation where recent research highlights the significant health benefits of adopting a plant-based diet, including reduced risk of chronic diseases such as heart disease and diabetes. The argument discusses various health improvements associated with plant-based eating and emphasizes the growing body of evidence supporting this dietary approach. It also contrasts these benefits with the common arguments against plant-based diets, suggesting that the evidence strongly supports a shift towards plant-based eating for better overall health.\",\n    \"options\": [\n      \"The evidence strongly supports a shift towards plant-based eating for better overall health.\",\n      \"Recent research highlights the health benefits of adopting a plant-based diet.\",\n      \"Plant-based eating reduces the risk of chronic diseases such as heart disease and diabetes.\",\n      \"The argument contrasts the benefits of plant-based diets with common counterarguments.\",\n      \"The growing body of evidence supports a shift towards plant-based eating.\"\n    ],\n    \"rightAnswer\": \"1\",\n    \"explanation\": \"The main conclusion is that the evidence strongly supports a shift towards plant-based eating for better overall health, which is directly derived from the lesson description.\",\n    \"table\": \"\",\n    \"type\": \"main conclusion\"\n  },\n  {\n    \"id\": \"2\",\n    \"question\": \"Which one of the following is the best statement of the flaw in the above argument?\",\n    \"statement\": \"The lesson discusses a proposed policy that aims to reduce carbon emissions by implementing a nationwide ban on single-use plastics. The argument is based on evidence showing that plastic waste contributes significantly to environmental pollution. However, it fails to consider the potential economic impacts on industries reliant on plastic products and overlooks alternative strategies for reducing carbon emissions. The argument also assumes that banning plastics alone will lead to a substantial reduction in overall carbon emissions without addressing other contributing factors.\",\n    \"options\": [\n      \"The argument assumes that banning plastics alone will significantly reduce carbon emissions without considering other factors.\",\n      \"It does not account for the economic impact on industries that rely on plastic products.\",\n      \"The argument overlooks alternative strategies for reducing carbon emissions.\",\n      \"It fails to address the issue of plastic waste beyond banning single-use plastics.\",\n      \"It ignores the potential benefits of plastic recycling programs.\"\n    ],\n    \"rightAnswer\": \"1\",\n    \"explanation\": \"The flaw in the argument is that it assumes banning plastics will significantly reduce carbon emissions without addressing other contributing factors, which is a critical oversight based on the lesson description.\",\n    \"table\": \"\",\n    \"type\": \"flaw identification\"\n  },\n  {\n    \"id\": \"3\",\n    \"question\": \"What is the main conclusion that can be drawn from the data in the table above?\",\n    \"statement\": \"The table presents data on the average weekly time spent by employees on various activities, including work, commuting, exercise, and leisure. It shows that employees spend the majority of their time working and commuting, with relatively less time allocated to exercise and leisure activities. This data suggests that employees have limited time for personal well-being and suggests a need for improved work-life balance strategies to enhance overall health and productivity.\",\n    \"options\": [\n      \"Employees have limited time for personal well-being and need better work-life balance strategies.\",\n      \"The majority of employees' time is spent working and commuting.\",\n      \"Employees allocate more time to exercise than to leisure activities.\",\n      \"Time spent on commuting is less than time spent on work.\",\n      \"Leisure activities occupy the most time compared to other activities.\"\n    ],\n    \"rightAnswer\": \"1\",\n    \"explanation\": \"The data suggests that employees have limited time for personal well-being, highlighting the need for better work-life balance strategies, as derived from the lesson description.\",\n    \"table\": \"ActivityHours Spent per WeekWork40Commuting10Exercise5Leisure8\",\n    \"type\": \"data analysis\"\n  },\n  {\n    \"id\": \"4\",\n    \"question\": \"Which of the following conclusions is best supported by the data presented in the table?\",\n    \"statement\": \"The table shows quarterly sales figures for various product categories in a retail store. It highlights that electronics generate the highest revenue, followed by clothing and home appliances, while food products have the lowest sales figures. This indicates a strong preference for electronics among consumers, which significantly impacts the store's overall revenue. The data suggests that focusing on electronics could be a strategic decision to enhance store profitability.\",\n    \"options\": [\n      \"Focusing on electronics could enhance store profitability.\",\n      \"Clothing and home appliances generate higher revenue than electronics.\",\n      \"Food products have the highest sales figures.\",\n      \"Electronics generate the lowest revenue among product categories.\",\n      \"Revenue from home appliances surpasses that from clothing.\"\n    ],\n    \"rightAnswer\": \"1\",\n    \"explanation\": \"The data supports the conclusion that focusing on electronics could enhance store profitability due to their highest revenue generation, as shown in the lesson description.\",\n    \"table\": \"Product CategoryQuarterly Revenue (USD)Electronics50000Clothing30000Home Appliances25000Food15000\",\n    \"type\": \"data analysis\"\n  }\n]`},
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
}
