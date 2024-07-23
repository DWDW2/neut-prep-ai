import { model, generationConfig, safetySetting } from "../core/config/gemini";
import { RoadMap } from "../models/roadmap.models";
import NuetDocument from "../models/nuetexampaper.models";
import { UserModel as User, UserType } from "../models/user.models";

export default class RoadMapService {
  async getRoadMapCriticalByUserId(userId: string) {
    try {
      const user = await User.findById(userId);
      if (user?.roadmapCriticalId) {
        const existingRoadMap = await RoadMap.findById(user?.roadmapCriticalId);
        if (existingRoadMap) {
          return existingRoadMap; 
        }
      }
      const documents = await NuetDocument.findById('6693c1e849ce670483ae0cc7')
      let generalString = documents?.text;
      const RoadMapPrompt =  [
        {text: "You are an educational expert tasked with generating a comprehensive roadmap to develop critical thinking and logical analysis skills. The roadmap should address a range of question types commonly found in logical reasoning and critical thinking exams. Your goal is to create a roadmap with at least 20 sections, each focusing on a specific question type.\n\nQuestion Types:\nExpression of the main conclusion of an argument.\nIdentification of the flaw in an argument.\nDrawing a conclusion reliably from a passage.\nIdentifying an underlying assumption in an argument.\nWeakening an argument by providing counter-evidence.\nIdentifying the flaw in reasoning.\nDetermining the truthfulness of a statement.\nDrawing a conclusion reliably from data.\nIdentifying an underlying assumption.\nWeakening an argument by providing counter-evidence.\nExpressing the flaw in an argument.\nParalleling reasoning used in an argument.\nIdentifying the principle underlying an argument.\nDrawing a conclusion from a passage.\nDrawing a conclusion from a passage.\nSupporting a conclusion with data.\nRoadmap Requirements:\nquestionType: Specify the type of question based on the list above.\nlessons: Provide a sequence of at least five lessons that build progressively from basic to advanced skills required to address the question type. Each lesson should include:\ntitle: The title of the lesson.\ndescription: A brief explanation of the lesson's content and objectives.\ndifficulty: The level of difficulty (e.g., \"easy\", \"medium\", \"hard\").\nxp: Experience points awarded for completing the lesson.\nunit: Name of the unit the section belongs to.\nsection: Name of the specific section within the unit.\n### Example Roadmap Entry:\n[\n    {\n        \"id\": 1,\n        \"unit\": \"Logical Reasoning\",\n        \"section\": \"Identifying Main Conclusions\",\n        \"questionType\": \"Expression of the main conclusion of an argument\",\n        \"lessons\": [\n            {\n                \"title\": \"Introduction to Main Conclusions\",\n                \"description\": \"Learn the basics of identifying main conclusions in arguments.\",\n                \"difficulty\": \"easy\",\n                \"xp\": 10\n            },\n            {\n                \"title\": \"Intermediate Techniques for Identifying Conclusions\",\n                \"description\": \"Develop intermediate skills in identifying main conclusions with more complex examples.\",\n                \"difficulty\": \"medium\",\n                \"xp\": 20\n            },\n            {\n                \"title\": \"Advanced Conclusion Identification Strategies\",\n                \"description\": \"Master advanced strategies for identifying the main conclusions in challenging arguments.\",\n                \"difficulty\": \"medium\",\n                \"xp\": 25\n            },\n            {\n                \"title\": \"Analyzing Complex Arguments\",\n                \"description\": \"Apply techniques to analyze and identify conclusions in complex arguments.\",\n                \"difficulty\": \"hard\",\n                \"xp\": 30\n            },\n            {\n                \"title\": \"Expert-Level Conclusion Analysis\",\n                \"description\": \"Practice identifying main conclusions with high difficulty and nuanced examples.\",\n                \"difficulty\": \"hard\",\n                \"xp\": 35\n            }\n        ]\n    },\n    {\n        \"id\": 2,\n        \"unit\": \"Logical Reasoning\",\n        \"section\": \"Identifying Flaws in Arguments\",\n        \"questionType\": \"Identification of the flaw in an argument\",\n        \"lessons\": [\n            {\n                \"title\": \"Introduction to Argument Flaws\",\n                \"description\": \"Understand the basic concept of identifying flaws in arguments.\",\n                \"difficulty\": \"easy\",\n                \"xp\": 10\n            },\n            {\n                \"title\": \"Intermediate Flaw Identification\",\n                \"description\": \"Learn intermediate skills to identify flaws in more complex arguments.\",\n                \"difficulty\": \"medium\",\n                \"xp\": 20\n            },\n            {\n                \"title\": \"Advanced Flaw Analysis Techniques\",\n                \"description\": \"Develop advanced techniques for recognizing flaws in intricate arguments.\",\n                \"difficulty\": \"medium\",\n                \"xp\": 25\n            },\n            {\n                \"title\": \"Evaluating Complex Arguments for Flaws\",\n                \"description\": \"Apply skills to evaluate and identify flaws in complex argument structures.\",\n                \"difficulty\": \"hard\",\n                \"xp\": 30\n            },\n            {\n                \"title\": \"Mastering Flaw Identification\",\n                \"description\": \"Perfect your ability to identify flaws with challenging examples and scenarios.\",\n                \"difficulty\": \"hard\",\n                \"xp\": 35\n            }\n        ]\n    },\n    // Repeat similarly for each question type from the list\n]\n\n\n### Notes:\n- Ensure each lesson title and description is specific to the question type and builds on the previous lessons.\n- Adjust difficulty levels and experience points according to the complexity of the content and the expected effort for each lesson.\n- Use realistic examples and scenarios to enhance the practical application of skills.\n- Generate at least 20 objexts at one roadmap"},
        {text: "[     {        \"id\" : 1         \"unit\": \"unit name\",         \"section\": \"section name\",         \"questionType\": \"Identifying Main Conclusions\",         \"lessons\": [             {                 \"title\": \"text of title\",         \"description\": \"text of desc\"                 \"difficulty\": \"easy\",                 \"xp\": 10             },]}] "},
      ];
    

      const result = await this.generateRoadmapWithRetries(RoadMapPrompt, 3); 

      if (!user) {
        return null;
      }

      const newRoadMap = new RoadMap({ roadmap: result, user: user._id });
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
        {text: `You are an educational expert tasked with generating a comprehensive roadmap for developing critical thinking and logical analysis skills. Your roadmap should be based on the following types of questions, which are commonly found in logical reasoning and critical thinking exams. Each roadmap should include a sequence of at least five lessons that progressively develop the skills needed to effectively answer these questions.\n\n### Questions:\nHere are the extracted questions from the NUET 2022 Mathematics specimen paper:\n\n1. The symbol \\( \\ge \\) defines a mathematical binary operation such that \\( y \\ge x = \\frac{y}{x^x} \\) for all positive integers. What is the value of \\( (2 \\ge 3) \\ge 2 \\)?\n2. Solve the inequality: \\( x^2 \\ge 8 - 2x \\)\n3. The sum of the two values of \\( x \\) that satisfy the simultaneous equations \\( x - 3y + 1 = 0 \\) and \\( 3x^2 - 7xy = 5 \\) is:\n4. Calculate the length of DE (with a diagram not provided):\n5. A cube has unit length sides. What is the length of a line joining a vertex to the midpoint of one of the opposite faces (the dashed line in the diagram below)?\n6. The diagram shows three similar right-angled triangles. What is the area of the largest triangle, in \\( \\text{cm}^2 \\)?\n7. The \\( n \\)-th term of a sequence is \\( \\frac{n}{n+1} \\). What is an expression for the difference between the \\( (n+1) \\)-th term and the \\( n \\)-th term?\n8. Given that \\( c \\) and \\( d \\) are non-zero integers, when is the expression \\( \\frac{10^{c-2d} \\times 20^{2c+d}}{8^c \\times 125^{c+d}} \\) an integer?\n9. For what values of the non-zero real number \\( a \\) does the quadratic equation \\( ax^2 + (a-2)x = 2 \\) have real distinct roots?\n10. The sum of the roots of a quadratic equation is 7, the product of the roots is 9. What is the equation?\n11. The roots of the equation \\( 2x^2 - 11x + a = 0 \\) differ by 2. What is the value of \\( a \\)?\n12. The longest side of a right-angled triangle is \\( 6 + \\sqrt{5} \\) units. One of the shorter sides is \\( 3 + 2\\sqrt{5} \\) units. What is the length of the third side?\n13. Given that \\( y \\) is a solution to the simultaneous equations \\( 4x^2 + y^2 + 10y = 47 \\) and \\( 2x - y = 5 \\), what is the value of \\( y \\) when \\( x \\ge 0 \\)?\n14. Five runners competed in a race: Fred, George, Hermione, Lavender, and Ron. Fred beat George. Hermione beat Lavender. Lavender beat George. Ron beat George. Assuming there were no ties, how many possible finishing orders could there have been, given only this information?\n15. Simplify \\( \\frac{4 - x^2(1 - 16x^2)}{(4x - 1)2x^3} \\):\n16. Which of the expressions below has the largest value for \\( 0 < x < 1 \\)?\n17. The diagram shows a quadrant of a circle, centre O, radius 20 cm. The chord AB has been drawn. What fraction of the quadrant is shaded?\n18. What is the equation of the straight line passing through (4, 1) which is parallel to the line given by the equation \\( 3x + 2y = 12 \\)?\n19. For any real numbers \\( a \\), \\( b \\), and \\( c \\) where \\( a \\ge b \\), consider these three statements\n20. For any integer \\( x \\), consider the three statements:\n### Roadmap Requirements:\n1. **questionType:** The type of question from the provided list.\n2. **lessons:** A series of at least five lessons that progressively develop the skills needed to answer the question type.\n3. **difficulty:** The difficulty level of each lesson (e.g., \"easy\", \"medium\", \"hard\").\n4. **xp:** Experience points awarded for completing the lesson.\n\n### Example Roadmap Entry:\n[\n    {\n       \"id\" : 1\n        \"unit\": \"unit name\",\n        \"section\": \"section name\",\n        \"questionType\": \"Identifying Main Conclusions\",\n        \"lessons\": [\n            {\n                \"title\": \"text of title\",\n        \"description\": \"text of desc\"\n                \"difficulty\": \"easy\",\n                \"xp\": 10\n            },\n            {\n                \"title\": \"text of title\",\n        \"description\": \"text of desc\"\n                \"difficulty\": \"medium\",\n                \"xp\": 20\n            },\n            {\n                \"title\": \"text of title\",\n        \"description\": \"text of desc\"\n                \"difficulty\": \"medium\",\n                \"xp\": 25\n            },\n            {\n                \"title\": \"text of title\",\n        \"description\": \"text of desc\"\n                \"difficulty\": \"hard\",\n                \"xp\": 30\n            },\n            {\n                 \"title\": \"text of title\",\n        \"description\": \"text of desc\"\n                \"difficulty\": \"hard\",\n                \"xp\": 35\n            }\n        ]\n    }\n]\n\nGenerate a roadmap covering all the question types listed, ensuring each entry follows the specified structure and requirements.`},
        {text: "[     {        \"id\" : 1         \"unit\": \"unit name\",         \"section\": \"section name\",         \"questionType\": \"Identifying Main Conclusions\",         \"lessons\": [             {                 \"title\": \"text of title\",         \"description\": \"text of desc\"                 \"difficulty\": \"easy\",                 \"xp\": 10             },             {                 \"title\": \"text of title\",         \"description\": \"text of desc\"                 \"difficulty\": \"medium\",                 \"xp\": 20             },             {                 \"title\": \"text of title\",         \"description\": \"text of desc\"                 \"difficulty\": \"medium\",                 \"xp\": 25             },             {                 \"title\": \"text of title\",         \"description\": \"text of desc\"                 \"difficulty\": \"hard\",                 \"xp\": 30             },             {                  \"title\": \"text of title\",         \"description\": \"text of desc\"                 \"difficulty\": \"hard\",                 \"xp\": 35             }         ]     } ] "},
      ];

      const result = await this.generateRoadmapWithRetries(RoadMapPrompt, 3);

      const newRoadMap = new RoadMap({ roadmap: result, user: user._id });
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

  // Helper function for retrying roadmap generation
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
    throw new Error
  }
}