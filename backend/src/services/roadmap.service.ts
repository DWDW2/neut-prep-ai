import { model, generationConfig, safetySetting } from "../core/config/gemini";
import RoadMap from "../models/roadmap.models";
import NuetDocument from "../models/nuetexampaper.models";
import { UserModel as User } from "../models/user.models";

export default class RoadMapService {
  async generateRoadMap(userId: string) {
    const documents = await NuetDocument.find();
    let generalString = "";

    for (const document of documents) {
      generalString += document.text + " "; 
    }
    console.log(generalString,  'data')
    const parts = [
      {
        text: `Prompt:  Using the following data ${generalString}, generate a comprehensive roadmap. The roadmap should include at least 20 sections, each containing at least 5 units. Each unit should have at least 5 lessons. For each lesson, include the theme, one skill tested, and points received for completing the lesson. Ensure that lessons are repeated across units to reinforce and strengthen the skills.  Data:  Data Set 1: [Include a brief description or list of data points relevant to the roadmap] Data Set 2: [Include a brief description or list of data points relevant to the roadmap] Data Set 3: [Include a brief description or list of data points relevant to the roadmap] The output should be in the following format:  json Copy code [     {         \"section\": \"Name of Section\",         \"unit\": \"Name of Unit\",         \"lessons\": [             {                 \"theme\": \"Name of Theme\",                 \"skills\": \"Name of Testing Skill\",                 \"points\": \"Number of Points Receiving for Completing the Lesson\"             }         ]     } ] Example:  json Copy code [     {         \"section\": \"Mathematics\",         \"unit\": \"Algebra\",         \"lessons\": [             {                 \"theme\": \"Linear Equations\",                 \"skills\": \"Solving Equations\",                 \"points\": 10             },             {                 \"theme\": \"Quadratic Equations\",                 \"skills\": \"Factoring\",                 \"points\": 15             },             {                 \"theme\": \"Polynomials\",                 \"skills\": \"Simplifying Expressions\",                 \"points\": 12             },             {                 \"theme\": \"Inequalities\",                 \"skills\": \"Graphing Solutions\",                 \"points\": 8             },             {                 \"theme\": \"Functions\",                 \"skills\": \"Analyzing Functions\",                 \"points\": 20             }         ]     },     {         \"section\": \"Science\",         \"unit\": \"Physics\",         \"lessons\": [             {                 \"theme\": \"Newton's Laws\",                 \"skills\": \"Understanding Motion\",                 \"points\": 10             },             {                 \"theme\": \"Thermodynamics\",                 \"skills\": \"Energy Transfer\",                 \"points\": 15             },             {                 \"theme\": \"Electromagnetism\",                 \"skills\": \"Magnetic Fields\",                 \"points\": 12             },             {                 \"theme\": \"Optics\",                 \"skills\": \"Light Behavior\",                 \"points\": 8             },             {                 \"theme\": \"Quantum Mechanics\",                 \"skills\": \"Particle Physics\",                 \"points\": 20             }         ]     } ] Generate the roadmap based on the provided data and ensure it meets the format and requirements specified. Include repeated lessons to reinforce skills throughout the roadmap. `,
      },
      { text: "output: " },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });

    const resJson = JSON.parse(result.response.text());
    const user = await User.findById(userId); 
    if (!user) {
      return null;
    }
    const newRoadMap = new RoadMap({ roadmap: resJson, user: user._id }); 
    await newRoadMap.save();

    user.roadmapId = newRoadMap._id; 
    await user.save();
    return newRoadMap;
  }

  async saveRoadMapToDb(roadmap: any, userId: string) {
    try {
      const user = await User.findById(userId); 
      if (!user) {
        throw new Error('User not found');
      }
      const newRoadMap = new RoadMap({ roadmap, user: user._id }); 
      await newRoadMap.save();

      user.roadmapId = newRoadMap._id; 
      await user.save();
      return true;
    } catch (error) {
      console.error('Error saving roadmap to database:', error);
      return false; 
    }
  }

  async getRoadMapFromDb(userId: string) {
    try {
      const roadmaps = await RoadMap.find({ user: userId });
      return roadmaps;
    } catch (error) {
      console.error('Error retrieving roadmap from database:', error);
      return []; 
    }
  }

  async getRoadMapById(id: string) {
    try {
      const roadmap = await RoadMap.findById(id);
      return roadmap;
    } catch (error) {
      console.error('Error retrieving roadmap by ID:', error);
      return null; 
    }
  }

  async updateRoadMap(id: string, roadmapData: any) {
    try {
      const updatedRoadMap = await RoadMap.findByIdAndUpdate(id, roadmapData, {
        new: true,
      });
      return updatedRoadMap;
    } catch (error) {
      console.error('Error updating roadmap:', error);
      return null; 
    }
  }

  async deleteRoadMap(id: string) {
    try {
      await RoadMap.findByIdAndDelete(id);
      return true; 
    } catch (error) {
      console.error('Error deleting roadmap:', error);
      return false; 
    }
  }
}
