import { model, generationConfig, safetySetting } from "../core/config/gemini";
import { RoadMap } from "../models/roadmap.models";
import NuetDocument from "../models/nuetexampaper.models";
import { UserModel as User, UserType } from "../models/user.models";

export default class RoadMapService {
  async getRoadMapCriticalByUserId(userId: string) {
    try {
      const documents = await NuetDocument.findById('6693c1e849ce670483ae0cc7')
      let generalString = documents?.text;
      console.log('data', generalString)
      const RoadMapPrompt = [
        {
          text: `Prompt:  Using the following data ${generalString}, generate a comprehensive roadmap. The roadmap should include at least 20 sections, each containing at least 5 units. Each unit should have at least 5 lessons. For each lesson, include the theme, one skill tested, and points received for completing the lesson. Ensure that lessons are repeated across units to reinforce and strengthen the skills.  Data:  Data Set 1: [Include a brief description or list of data points relevant to the roadmap] Data Set 2: [Include a brief description or list of data points relevant to the roadmap] Data Set 3: [Include a brief description or list of data points relevant to the roadmap] The output should be in the following format:  json Copy code [     {         \"section\": \"Name of Section\",         \"unit\": \"Name of Unit\",         \"lessons\": [             {                 \"theme\": \"Name of Theme\",                 \"skills\": \"Name of Testing Skill\",                 \"points\": \"Number of Points Receiving for Completing the Lesson\"             }         ]     } ] Example:  json Copy code [     {         \"section\": \"Mathematics\",         \"unit\": \"Algebra\",         \"lessons\": [             {                 \"theme\": \"Linear Equations\",                 \"skills\": \"Solving Equations\",                 \"points\": 10             },             {                 \"theme\": \"Quadratic Equations\",                 \"skills\": \"Factoring\",                 \"points\": 15             },             {                 \"theme\": \"Polynomials\",                 \"skills\": \"Simplifying Expressions\",                 \"points\": 12             },             {                 \"theme\": \"Inequalities\",                 \"skills\": \"Graphing Solutions\",                 \"points\": 8             },             {                 \"theme\": \"Functions\",                 \"skills\": \"Analyzing Functions\",                 \"points\": 20             }         ]     },     {         \"section\": \"Science\",         \"unit\": \"Physics\",         \"lessons\": [             {                 \"theme\": \"Newton's Laws\",                 \"skills\": \"Understanding Motion\",                 \"points\": 10             },             {                 \"theme\": \"Thermodynamics\",                 \"skills\": \"Energy Transfer\",                 \"points\": 15             },             {                 \"theme\": \"Electromagnetism\",                 \"skills\": \"Magnetic Fields\",                 \"points\": 12             },             {                 \"theme\": \"Optics\",                 \"skills\": \"Light Behavior\",                 \"points\": 8             },             {                 \"theme\": \"Quantum Mechanics\",                 \"skills\": \"Particle Physics\",                 \"points\": 20             }         ]     } ] Generate the roadmap based on the provided data and ensure it meets the format and requirements specified. Include repeated lessons to reinforce skills throughout the roadmap. `,
        },
        { text: "output: " },
      ];

      const result = await model.generateContent({
        contents: [{ role: "user", parts: RoadMapPrompt }],
        generationConfig,
      });

      const resJson = JSON.parse(result.response.text());
      const user = await User.findById(userId);
      if (!user) {
        return null;
      }

      if (user.roadmapCriticalId) {
        const existingRoadMap = await RoadMap.findById(user.roadmapCriticalId);
        if (existingRoadMap) {
          return existingRoadMap; 
        } else {
          const newRoadMap = new RoadMap({ roadmap: resJson, user: user._id });
          await newRoadMap.save();
          user.roadmapCriticalId = newRoadMap._id;
          await user.save();
          return newRoadMap;
        }
      } else {
        const newRoadMap = new RoadMap({ roadmap: resJson, user: user._id });
        await newRoadMap.save();
        user.roadmapCriticalId = newRoadMap._id;
        await user.save();
        return newRoadMap;
      }
    } catch (error) {
      console.error("Error generating critical roadmap:", error);
      return null;
    }
  }

  async getRoadMapMathByUserId(userId: string) {
    try {
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
      const user = await User.findById(userId);
      if (!user) {
        return null;
      }

      if (user.roadmapMathId) {
        const existingRoadMap = await RoadMap.findById(user.roadmapMathId);
        if (existingRoadMap) {
          return existingRoadMap; 
        } else {
          const newRoadMap = new RoadMap({ roadmap: resJson, user: user._id });
          await newRoadMap.save();
          user.roadmapMathId = newRoadMap._id;
          await user.save();
          return newRoadMap;
        }
      } else {
        const newRoadMap = new RoadMap({ roadmap: resJson, user: user._id });
        await newRoadMap.save();
        user.roadmapMathId = newRoadMap._id;
        await user.save();
        return newRoadMap;
      }
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
