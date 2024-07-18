import { RoadMap, RoadMapType } from "../models/roadmap.models";
import { UserModel as User, UserType } from "../models/user.models";
import { model, generationConfig, safetySetting } from "../core/config/gemini";
import LessonModel from "../models/lessoncontent.models";

export default class CourseService {
  async generateLessonMath(roadmapId: string, lessonIndex: number, sectionIndex: number) {
    try {
      const roadmap = await RoadMap.findById(roadmapId);
      if (!roadmap) return null;
      const lesson = roadmap.roadmap[sectionIndex].lessons[lessonIndex]
      if (!lesson) return null;
      console.log(roadmapId, lessonIndex, sectionIndex )
      const parts = [
          {text: `Prompt for LLM:  Please generate a JSON object for a lesson question based on the following structure:  json {   \"question\": \"string\",   \"answer\": \"string\",   \"questionVariants\": [\"string\", \"string\", \"string\", \"string\"],   \"explanation\": \"string\" } The generated question should be relevant to the given lesson details:  Theme: The overarching topic or subject of the lesson. Skills: Specific skills or subtopics that will be covered in the lesson. Points: A numerical value representing the points or weightage of the lesson. Example Input:  json Copy code {   \"theme\": \"Algebra\",   \"skills\": \"Solving linear equations\",   \"points\": 10 } Example Output:  json Copy code {   \"question\": \"Explain how to solve the linear equation 3x + 5 = 20.\",   \"answer\": \"Subtract 5 from both sides, then divide by 3: x = 5.\",   \"questionVariants\": [\"Add 5 to both sides, then divide by 3: x = 5.\", \"Subtract 5 from both sides, then divide by 3: x = 5.\", \"Divide by 3, then subtract 5: x = 5.\", \"Multiply by 3, then add 5: x = 5.\"],   \"explanation\": \"To solve 3x + 5 = 20, first subtract 5 from both sides to get 3x = 15. Then, divide both sides by 3 to isolate x, resulting in x = 5.\" } Here are the lesson details for which you need to generate the JSON object:  json Copy code {   \"theme\": \"[Insert Theme]\",   \"skills\": \"[Insert Skills]\",   \"points\": [Insert Points] } Use the following data for creating relevant questions:  Algebra:  Explain how to solve linear equations step-by-step. Simplify the expression <expression> and provide a detailed explanation of each step. Create a real-world problem involving a quadratic equation and demonstrate how to solve it. Explain the difference between a linear and a quadratic function using examples. Show how to factor the polynomial <polynomial> and check the solution. Describe the process of completing the square for the equation <equation> and solve it. Illustrate how to use the quadratic formula to solve <equation> and explain why it works. Provide a step-by-step guide on graphing the linear equation <equation>. Explain the concept of functions and give examples of linear and non-linear functions. Demonstrate how to solve a system of linear equations using the substitution method. Outline the steps to solve a system of equations using the elimination method and apply it to <system of equations>. Explain the significance of the discriminant in a quadratic equation and what it tells us about the nature of the roots. Show how to convert the standard form of a quadratic equation to vertex form and vice versa. Describe how to find the slope of a line given two points on the line and provide an example. Explain the concept of exponential growth and decay with a practical application example. Geometry:  Explain how to calculate the area of a regular pentagon given its side length. Describe the process for finding the volume of a right circular cone with a given radius and height. Outline the steps to prove that the sum of the interior angles of a triangle is 180 degrees. Provide a method to calculate the surface area of a sphere with a known radius. Demonstrate how to find the length of the hypotenuse of a right-angled triangle using Pythagoras' theorem. Explain the relationship between the radius, diameter, and circumference of a circle. Detail the process for finding the centroid of a given triangle with vertices at specific coordinates. Show how to calculate the area of a trapezoid given the lengths of its bases and height. Explain how to determine the equation of a circle given its center and a point on the circle. Provide a step-by-step guide to construct a perpendicular bisector of a given line segment without using a protractor. Describe the method to find the interior angles of a regular hexagon. Explain how to use the sine, cosine, and tangent functions to solve for unknown sides in right triangles. Detail the process for calculating the lateral surface area of a regular pyramid given its slant height and perimeter of the base. Describe how to prove that two triangles are similar using the AA (Angle-Angle) similarity postulate. Explain the method for finding the arc length of a sector in a circle with a known radius and central angle measure. here is data that you need to rely on when generating tasks : ${lesson}`},
          {text: " "},
        ];
  
      const lessonContent = await model.generateContent({
          generationConfig: generationConfig,
          contents: [{role: "user", parts: parts}]
      })
  
      const LessonJson = JSON.parse(lessonContent.response.text())
      const lessonModelInstance = new LessonModel(LessonJson)
      if(typeof lessonModelInstance.id === 'string'){
          roadmap.roadmap[sectionIndex].lessons[lessonIndex].lessonContent = lessonModelInstance.id
      }
      console.log(lessonModelInstance.id)
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
      console.log(roadmapId, sectionIndex, lessonIndex)
      const roadmap = await RoadMap.findById(roadmapId);
    if (!roadmap) return null;
    const lesson = roadmap.roadmap[sectionIndex].lessons[lessonIndex]
    if (!lesson) return null;

    const parts = [
        {text: `Prompt for LLM:  Please generate a JSON object for a lesson question based on the following structure:  json {   \"question\": \"string\",   \"answer\": \"string\",   \"questionVariants\": [\"string\", \"string\", \"string\", \"string\"],   \"explanation\": \"string\" } The generated question should be relevant to the given lesson details:  Theme: The overarching topic or subject of the lesson. Skills: Specific skills or subtopics that will be covered in the lesson. Points: A numerical value representing the points or weightage of the lesson. Example Input:  json Copy code {   \"theme\": \"Algebra\",   \"skills\": \"Solving linear equations\",   \"points\": 10 } Example Output:  json Copy code {   \"question\": \"Explain how to solve the linear equation 3x + 5 = 20.\",   \"answer\": \"Subtract 5 from both sides, then divide by 3: x = 5.\",   \"questionVariants\": [\"Add 5 to both sides, then divide by 3: x = 5.\", \"Subtract 5 from both sides, then divide by 3: x = 5.\", \"Divide by 3, then subtract 5: x = 5.\", \"Multiply by 3, then add 5: x = 5.\"],   \"explanation\": \"To solve 3x + 5 = 20, first subtract 5 from both sides to get 3x = 15. Then, divide both sides by 3 to isolate x, resulting in x = 5.\" } Here are the lesson details for which you need to generate the JSON object:  json Copy code {   \"theme\": \"[Insert Theme]\",   \"skills\": \"[Insert Skills]\",   \"points\": [Insert Points] } Use the following data for creating relevant questions:  Algebra:  Explain how to solve linear equations step-by-step. Simplify the expression <expression> and provide a detailed explanation of each step. Create a real-world problem involving a quadratic equation and demonstrate how to solve it. Explain the difference between a linear and a quadratic function using examples. Show how to factor the polynomial <polynomial> and check the solution. Describe the process of completing the square for the equation <equation> and solve it. Illustrate how to use the quadratic formula to solve <equation> and explain why it works. Provide a step-by-step guide on graphing the linear equation <equation>. Explain the concept of functions and give examples of linear and non-linear functions. Demonstrate how to solve a system of linear equations using the substitution method. Outline the steps to solve a system of equations using the elimination method and apply it to <system of equations>. Explain the significance of the discriminant in a quadratic equation and what it tells us about the nature of the roots. Show how to convert the standard form of a quadratic equation to vertex form and vice versa. Describe how to find the slope of a line given two points on the line and provide an example. Explain the concept of exponential growth and decay with a practical application example. Geometry:  Explain how to calculate the area of a regular pentagon given its side length. Describe the process for finding the volume of a right circular cone with a given radius and height. Outline the steps to prove that the sum of the interior angles of a triangle is 180 degrees. Provide a method to calculate the surface area of a sphere with a known radius. Demonstrate how to find the length of the hypotenuse of a right-angled triangle using Pythagoras' theorem. Explain the relationship between the radius, diameter, and circumference of a circle. Detail the process for finding the centroid of a given triangle with vertices at specific coordinates. Show how to calculate the area of a trapezoid given the lengths of its bases and height. Explain how to determine the equation of a circle given its center and a point on the circle. Provide a step-by-step guide to construct a perpendicular bisector of a given line segment without using a protractor. Describe the method to find the interior angles of a regular hexagon. Explain how to use the sine, cosine, and tangent functions to solve for unknown sides in right triangles. Detail the process for calculating the lateral surface area of a regular pyramid given its slant height and perimeter of the base. Describe how to prove that two triangles are similar using the AA (Angle-Angle) similarity postulate. Explain the method for finding the arc length of a sector in a circle with a known radius and central angle measure. here is data that you need to rely on when generating tasks : ${lesson}`},
        {text: " "},
      ];

    const lessonContent = await model.generateContent({
        generationConfig: generationConfig,
        contents: [{role: "user", parts: parts}]
    })

    const LessonJson = JSON.parse(lessonContent.response.text())
    const lessonModelInstance = new LessonModel(LessonJson)
    if(typeof lessonModelInstance.id === 'string'){
        roadmap.roadmap[sectionIndex].lessons[lessonIndex].lessonContent = lessonModelInstance.id
    }
    console.log(lessonModelInstance.id)
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
}
