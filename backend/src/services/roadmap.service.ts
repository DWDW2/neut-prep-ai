import { model, generationConfig, safetySetting } from "../core/config/gemini";
import { RoadMap } from "../models/roadmap.models";
import NuetDocument from "../models/nuetexampaper.models";
import { UserModel as User, UserType } from "../models/user.models";

export default class RoadMapService {
  async getRoadMapCriticalByUserId(userId: string) {
    try {
      console.log('whtd')
      const user = await User.findById(userId);
      if (user?.roadmapCriticalId) {
        console.log('user?.roadmapCriticalId')
        const existingRoadMap = await RoadMap.findById(user?.roadmapCriticalId);
        if (existingRoadMap) {
          return existingRoadMap; 
        }
      }
      const documents = await NuetDocument.findById('6693c1e849ce670483ae0cc7')
      let generalString = documents?.text;
      console.log('data', generalString)
      const RoadMapPrompt =  [
        {text: "You are an educational expert tasked with generating a comprehensive roadmap for developing critical thinking and logical analysis skills. Your roadmap should be based on the following types of questions, which are commonly found in logical reasoning and critical thinking exams. Each roadmap should include a sequence of at least five lessons that progressively develop the skills needed to effectively answer these questions.\n\n### Questions:\n1. Which one of the following is an expression of the main conclusion of the above argument?\n2. Which one of the following is the best statement of the flaw in the above argument?\n3. Which one of the following is a conclusion that can reliably be drawn from the above passage?\n4. Which one of the following is an underlying assumption of the above argument?\n5. Which one of the following, if true, would most weaken the above argument?\n6. Which one of the following best identifies the flaw in the above reasoning?\n7. Which one of the following statements is not true?\n8. Which one of the following conclusions can reliably be drawn from the above passage?\n9. Which one of the following is an underlying assumption of the above argument?\n10. Which one of the following, if true, would most weaken the above argument?\n11. Which one of the following is the best expression of the flaw in the above argument?\n12. Which one of the following most closely parallels the reasoning used in the above argument?\n13. Which one of the following identifies the principle underlying the above argument?\n14. Which one of the following conclusions can be drawn from the above passage?\n15. Which one of the following is a conclusion that can be drawn from the above passage?\n16. Which one of the following conclusions is best supported by the data given above?\n\n### Roadmap Requirements:\n1. **questionType:** The type of question from the provided list.\n2. **lessons:** A series of at least five lessons that progressively develop the skills needed to answer the question type.\n3. **difficulty:** The difficulty level of each lesson (e.g., \"easy\", \"medium\", \"hard\").\n4. **xp:** Experience points awarded for completing the lesson.\n\n### Example Roadmap Entry:\n[\n    {\n       \"id\" : 1\n        \"unit\": \"unit name\",\n        \"section\": \"section name\",\n        \"questionType\": \"Identifying Main Conclusions\",\n        \"lessons\": [\n            {\n                \"title\": \"text of title\",\n        \"description\": \"text of desc\"\n                \"difficulty\": \"easy\",\n                \"xp\": 10\n            },\n            {\n                \"title\": \"text of title\",\n        \"description\": \"text of desc\"\n                \"difficulty\": \"medium\",\n                \"xp\": 20\n            },\n            {\n                \"title\": \"text of title\",\n        \"description\": \"text of desc\"\n                \"difficulty\": \"medium\",\n                \"xp\": 25\n            },\n            {\n                \"title\": \"text of title\",\n        \"description\": \"text of desc\"\n                \"difficulty\": \"hard\",\n                \"xp\": 30\n            },\n            {\n                 \"title\": \"text of title\",\n        \"description\": \"text of desc\"\n                \"difficulty\": \"hard\",\n                \"xp\": 35\n            }\n        ]\n    }\n]\n\nGenerate a roadmap covering all the question types listed, ensuring each entry follows the specified structure and requirements."},
        {text: "output: "},
      ];

      const result = await model.generateContent({
        contents: [{ role: "user", parts: RoadMapPrompt }],
        generationConfig,
      });

      const resJson = JSON.parse(result.response.text());
      
      if (!user) {
        return null;
      }

      const newRoadMap = new RoadMap({ roadmap: resJson, user: user._id });
      await newRoadMap.save();
      user.roadmapCriticalId = newRoadMap._id;
      await user.save();
      return newRoadMap;

    } catch (error) {
      console.error("Error generating critical roadmap:", error);
      return null;
    }
  }

  async getRoadMapMathByUserId(userId: string) {
    try {
      const user = await User.findById(userId);
      if(!user){
        return null
      }
      if (user?.roadmapMathId) {
        const existingRoadMap = await RoadMap.findById(user?.roadmapMathId);
        if (existingRoadMap) {
          return existingRoadMap; 
        }
      }
      const documents = await NuetDocument.findById('6693c1970c4480a49aafc1c1')
      let generalString  = documents?.text

      console.log(generalString, "data");
      const RoadMapPrompt = [
        {
          text: `Prompt:  Generate a comprehensive roadmap for mathematics based on the data provided ${generalString}. The roadmap should include at least 20 sections, each containing at least 5 units. Each unit should have at least 5 lessons. For each lesson, include the theme, one skill tested, and points received for completing the lesson. Ensure that lessons are repeated across units to reinforce and strengthen the skills. The output should be in the following format:  json Copy code [     {         \"section\": \"Name of Section\",         \"unit\": \"Name of Unit\",         \"lessons\": [             {                 \"theme\": \"Name of Theme\",                 \"skills\": \"Name of Testing Skill\",                 \"points\": \"Number of Points Receiving for Completing the Lesson\"             }         ]     } ] Example:  json Copy code [     {         \"section\": \"Mathematics\",         \"unit\": \"Algebra\",         \"lessons\": [             {                 \"theme\": \"Linear Equations\",                 \"skills\": \"Solving Equations\",                 \"points\": 10             },             {                 \"theme\": \"Quadratic Equations\",                 \"skills\": \"Factoring\",                 \"points\": 15             },             {                 \"theme\": \"Polynomials\",                 \"skills\": \"Simplifying Expressions\",                 \"points\": 12             },             {                 \"theme\": \"Inequalities\",                 \"skills\": \"Graphing Solutions\",                 \"points\": 8             },             {                 \"theme\": \"Functions\",                 \"skills\": \"Analyzing Functions\",                 \"points\": 20             }         ]     },     {         \"section\": \"Science\",         \"unit\": \"Physics\",         \"lessons\": [             {                 \"theme\": \"Newton's Laws\",                 \"skills\": \"Understanding Motion\",                 \"points\": 10             },             {                 \"theme\": \"Thermodynamics\",                 \"skills\": \"Energy Transfer\",                 \"points\": 15             },             {                 \"theme\": \"Electromagnetism\",                 \"skills\": \"Magnetic Fields\",                 \"points\": 12             },             {                 \"theme\": \"Optics\",                 \"skills\": \"Light Behavior\",                 \"points\": 8             },             {                 \"theme\": \"Quantum Mechanics\",                 \"skills\": \"Particle Physics\",                 \"points\": 20             }         ]     } ] Generate the roadmap based on the provided data and ensure it meets the format and requirements specified. Include repeated lessons to reinforce skills throughout the roadmap. `,
        },
        { text: "output: " },
      ];

      const result = await model.generateContent({
        contents: [{ role: "user", parts: RoadMapPrompt }],
        generationConfig,
      });

      const resJson = JSON.parse(result.response.text());
     
      const newRoadMap = new RoadMap({ roadmap: resJson, user: user._id });
      await newRoadMap.save();
      user.roadmapMathId = newRoadMap._id;
      await user.save();
      return newRoadMap;
    } catch (error) {
      console.error("Error generating math roadmap:", error);
      return null;
    }
  }

  async getMathRoadMap(userId: string) {
    try {
      const user = await User.findById(userId);
      if (!user || !user.roadmapMathId) {
        return null; 
      }
      const roadmap = await RoadMap.findById(user.roadmapMathId);
      return roadmap;
    } catch (error) {
      console.error("Error retrieving math roadmap:", error);
      return null;
    }
  }

  async getCriticalThinkingRoadMap(userId: string) {
    try {
      const user = await User.findById(userId);
      if (!user || !user.roadmapCriticalId) {
        return null; 
      }
      const roadmap = await RoadMap.findById(user.roadmapCriticalId);
      return roadmap;
    } catch (error) {
      console.error("Error retrieving critical thinking roadmap:", error);
      return null;
    }
  }

  async saveRoadMapToDb(roadmap: any, userId: string, isCritical: boolean) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const newRoadMap = new RoadMap({ roadmap, user: user._id });
      await newRoadMap.save();

      if (isCritical) {
        user.roadmapCriticalId = newRoadMap._id;
      } else {
        user.roadmapMathId = newRoadMap._id;
      }
      await user.save();
      return true;
    } catch (error) {
      console.error("Error saving roadmap to database:", error);
      return false;
    }
  }

  async getRoadMapFromDb(userId: string) {
    try {
      const roadmaps = await RoadMap.find({ user: userId });
      return roadmaps;
    } catch (error) {
      console.error("Error retrieving roadmap from database:", error);
      return [];
    }
  }

  async getRoadMapById(id: string) {
    try {
      const roadmap = await RoadMap.findById(id);
      return roadmap;
    } catch (error) {
      console.error("Error retrieving roadmap by ID:", error);
      return null;
    }
  }

  async updateRoadMap(id: string, roadmapData: any) {
    try {
      const updatedRoadMap = await RoadMap.findByIdAndUpdate(
        id,
        roadmapData,
        {
          new: true,
        }
      );
      return updatedRoadMap;
    } catch (error) {
      console.error("Error updating roadmap:", error);
      return null;
    }
  }

  async deleteRoadMap(id: string) {
    try {
      await RoadMap.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.error("Error deleting roadmap:", error);
      return false;
    }
  }
}
