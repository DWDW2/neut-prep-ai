import { model, generationConfig, safetySetting } from "../core/config/gemini";
import { RoadMap, RoadMapType } from "../models/roadmap.models";
import NuetDocument from "../models/nuetexampaper.models";
import { UserModel as User, UserType } from "../models/user.models";
import { questionTypesCritical, questionTypesMath } from "../core/promts/prompts";

type LessonPlan = {
  section: string;
  unit: string;
  questionType: string;
  lessons: number;
};

type LessonPlans = LessonPlan[][];

export default class RoadMapService {
  async generateRoadmapByUserId(userId: string, questionType: string) {
    try {
      if (!userId) {
        return { message: 'UserId required', success: false };
      }
      const user = await User.findById(userId);

      if (!user) {
        return { message: 'User not found', success: false };
      }

      let questionTypes: string[] = [];

      if (questionType === 'critical') {
        questionTypes = questionTypesCritical;
      } else if (questionType === 'math') {
        questionTypes = questionTypesMath;
      } else {
        return { message: 'Invalid question type', success: false };
      }

      const roadmapPromises = questionTypes.map(type => this.generateRoadmapForQuestionType(type));
      const roadmaps: any = await Promise.all(roadmapPromises);

      if(roadmaps){
        try {
          const roadmap = new RoadMap({
            userId: userId,
            roadmap: roadmaps
          })
          roadmap.save()
          questionType === 'math' ? user.roadmapMathId = roadmap.id : user.roadmapCriticalId = roadmap.id
          await user.save()
          return {message: 'Roadmap generated successfully', success: true, roadmap: roadmap}
        } catch (error) {
          console.log(error)
          return {message: error, success: false}
        }
      }
      
    } catch (err) {
      console.log(err);
      return { message: 'Error generating roadmap', success: false };
    }
  }

  async generateRoadmapForQuestionType(questionType: string): Promise<any> {
    const prompt = [
      {
        text: `input: **Generate a comprehensive roadmap for the given question type ${questionType}. The roadmap should include the following details:**

- **unit**: The main topic or unit of study relevant to {{questionType}}.
- **section**: The specific section within the unit related to {{questionType}}.
- **questionType**: The specific type of question being addressed (replace {{questionType}} with the actual question type).
- **lessons**: An array of lesson objects, each containing:
  - **title**: The title of the lesson.
  - **description**: A concise description of the lesson content, focusing on key concepts and learning objectives related to {{questionType}}.
  - **difficulty**: The difficulty level of the lesson, categorized as easy, medium, or hard.
  - **xp**: The experience points awarded for completing the lesson, reflecting the complexity and effort required.

**For {{questionType}}, generate a roadmap with the following structure:**

1. **Introduction to {{questionType}}**: Overview and foundational concepts related to the question type.
2. **In-Depth Study of {{questionType}}**: Detailed exploration of key aspects and strategies for the question type.
3. **Practice and Application for {{questionType}}**: Hands-on practice with problems and techniques specific to the question type.
4. **Review and Feedback for {{questionType}}**: Summary and feedback on key concepts and common mistakes.
5. **Final Preparation for {{questionType}}**: Mock exams and strategy review to consolidate learning.

**Example:**

For the {{questionType}} "Main Conclusion", the roadmap could be structured as follows:

{
    "unit": "Arguments",
    "section": "Basic Argument Structure",
    "questionType": "Which one of the following is an expression of the main conclusion of the above argument?",
    "lessons": [
        {
            "title": "Introduction to Arguments",
            "description": "Learn the basic structure of an argument, including premises and conclusions.",
            "difficulty": "easy",
            "xp": 10
        },
        {
            "title": "Identifying Premises and Conclusions",
            "description": "Practice distinguishing between statements that support an argument and the argument's main point.",
            "difficulty": "medium",
            "xp": 20
        },
        {
            "title": "Unstated Conclusions",
            "description": "Learn how to identify conclusions that are implied but not explicitly stated.",
            "difficulty": "medium",
            "xp": 25
        },
        {
            "title": "Complex Arguments",
            "description": "Analyze arguments with multiple premises and sub-conclusions to determine the main conclusion.",
            "difficulty": "hard",
            "xp": 30
        },
        {
            "title": "Evaluating Main Conclusion Strength",
            "description": "Assess how well the premises support the main conclusion and identify any gaps or weaknesses.",
            "difficulty": "hard",
            "xp": 35
        }
    ]
}`,
      },
      { text: " " },
    ];

    return this.generateRoadmapWithRetries(prompt, 3);
  }

  private async generateRoadmapWithRetries(prompt: any[], maxRetries: number): Promise<any> {
    let retries = 0;
    while (retries < maxRetries) {
      try {
        const result = await model.generateContent({
          contents: [{ role: "user", parts: prompt }],
          generationConfig,
        });
        const cleanedResponse = this.cleanJsonString(result.response.text());
        const resJson = JSON.parse(cleanedResponse);
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


  async getRoadmapById(roadmapId: string){
    try {
      const roadmap = await RoadMap.findById(roadmapId)
      if(!roadmap){
        return {message: 'roadmap not found', success: false}
      }

      return {message: 'Roadmap found', roadmap: roadmap, success: true}
    } catch (error) {
      console.log(error)
      return {message: error, success: false}
    }
  }
}
