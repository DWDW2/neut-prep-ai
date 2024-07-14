// import { RoadMapType } from "../models/roadmap.models";
// import { UserModel as User, UserType } from "../models/user.models";
// import { model, generationConfig, safetySetting } from "../core/config/gemini";

// export default class CourseService {
//   async generateLessons(userId: string) {
//     try {
//       const user = await User.findOne({ _id: userId }).populate(
//         "roadmapId"
//       );
//       if (!user) {
//         return null;
//       }
//       const roadmap: RoadMapType = user.;

//       if (roadmap) {
//         // Implement logic to generate lessons based on roadmap data
//         const lessons = await this.generateLessonsFromRoadmap(roadmap);
//         return lessons;
//       } else {
//         console.error("Roadmap not found for user:", userId);
//         return null;
//       }
//     } catch (err) {
//       console.log(err);
//       return null;
//     }
//   }

//   async generateLessonsFromRoadmap(roadmap: RoadMapType) {
//     try {
//       const lessons: any[] = []; // Array to store generated lessons
//       for (const section of roadmap.roadmap) {
//         for (const unit of section.unit) {
//           for (const lesson of unit.lessons) {
//             // Generate a prompt based on the lesson's theme and skills
//             const prompt = this.createLessonPrompt(lesson.theme, lesson.skills);
//             // Use the language model to generate lesson content
//             const generatedLesson = await this.generateLessonContent(prompt);
//             // Add the generated lesson to the lessons array
//             lessons.push({
//               ...lesson, // Include existing lesson data
//               content: generatedLesson, // Add generated content
//             });
//           }
//         }
//       }
//       return lessons;
//     } catch (error) {
//       console.error("Error generating lessons from roadmap:", error);
//       return null;
//     }
//   }

//   createLessonPrompt(theme: string, skills: string) {
//     // Create a prompt based on the lesson's theme and skills
//     return `Generate a lesson on the theme of "${theme}" focusing on the skill of "${skills}". Include explanations, examples, and exercises.`;
//   }

//   async generateLessonContent(prompt: string) {
//     // Use the language model to generate lesson content
//     const result = await model.generateContent({
//       contents: [{ role: "user", parts: [{ text: prompt }] }],
//       generationConfig,
//     });
//     return result.response.text();
//   }

//   async generateLessonByTheme(userId: string, theme: string) {
//     try {
//       const user: UserType = await User.findOne({ _id: userId }).populate(
//         "roadmapId"
//       );
//       if (!user) {
//         return null;
//       }
//       const roadmap: RoadMapType = user.roadmapId;

//       if (roadmap) {
//         // Find lessons matching the theme
//         const lessons = roadmap.roadmap.flatMap((section) =>
//           section.unit.flatMap((unit) =>
//             unit.lessons.filter((lesson) => lesson.theme === theme)
//           )
//         );

//         if (lessons.length > 0) {
//           // Generate prompts and content for each matching lesson
//           const generatedLessons = await Promise.all(
//             lessons.map(async (lesson) => {
//               const prompt = this.createLessonPrompt(
//                 lesson.theme,
//                 lesson.skills
//               );
//               const generatedLesson = await this.generateLessonContent(prompt);
//               return {
//                 ...lesson,
//                 content: generatedLesson,
//               };
//             })
//           );
//           return generatedLessons;
//         } else {
//           console.error("No lessons found for theme:", theme);
//           return null;
//         }
//       } else {
//         console.error("Roadmap not found for user:", userId);
//         return null;
//       }
//     } catch (err) {
//       console.log(err);
//       return null;
//     }
//   }
// }
