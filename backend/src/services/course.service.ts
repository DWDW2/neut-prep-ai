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

        const parts = [
          {text: `\n\n1. The symbol \\( \\ge \\) defines a mathematical binary operation such that \\( y \\ge x = \\frac{y}{x^x} \\) for all positive integers. What is the value of \\( (2 \\ge 3) \\ge 2 \\)?\n \n2. Solve the inequality: \\( x^2 \\ge 8 - 2x \\)\n  \n3. The sum of the two values of \\( x \\) that satisfy the simultaneous equations \\( x - 3y + 1 = 0 \\) and \\( 3x^2 - 7xy = 5 \\) is:\n \n4. Calculate the length of DE (with a diagram not provided):\n   \n5. A cube has unit length sides. What is the length of a line joining a vertex to the midpoint of one of the opposite faces (the dashed line in the diagram below)?\n   \n6. The diagram shows three similar right-angled triangles. What is the area of the largest triangle, in \\( \\text{cm}^2 \\)?\n   \n7. The \\( n \\)-th term of a sequence is \\( \\frac{n}{n+1} \\). What is an expression for the difference between the \\( (n+1) \\)-th term and the \\( n \\)-th term?\n  \n8. Given that \\( c \\) and \\( d \\) are non-zero integers, when is the expression \\( \\frac{10^{c-2d} \\times 20^{2c+d}}{8^c \\times 125^{c+d}} \\) an integer?\n   \n9. For what values of the non-zero real number \\( a \\) does the quadratic equation \\( ax^2 + (a-2)x = 2 \\) have real distinct roots?\n   \n10. The sum of the roots of a quadratic equation is 7, the product of the roots is 9. What is the equation?\n  \n11. The roots of the equation \\( 2x^2 - 11x + a = 0 \\) differ by 2. What is the value of \\( a \\)?\n   \n12. The longest side of a right-angled triangle is \\( 6 + \\sqrt{5} \\) units. One of the shorter sides is \\( 3 + 2\\sqrt{5} \\) units. What is the length of the third side?\n   \n13. Given that \\( y \\) is a solution to the simultaneous equations \\( 4x^2 + y^2 + 10y = 47 \\) and \\( 2x - y = 5 \\), what is the value of \\( y \\) when \\( x \\ge 0 \\)?\n  \n14. Five runners competed in a race: Fred, George, Hermione, Lavender, and Ron. Fred beat George. Hermione beat Lavender. Lavender beat George. Ron beat George. Assuming there were no ties, how many possible finishing orders could there have been, given only this information?\n   \n15. Simplify \\( \\frac{4 - x^2(1 - 16x^2)}{(4x - 1)2x^3} \\):\n  \n16. Which of the expressions below has the largest value for \\( 0 < x < 1 \\)?\n\n17. The diagram shows a quadrant of a circle, centre O, radius 20 cm. The chord AB has been drawn. What fraction of the quadrant is shaded?\n   \n18. What is the equation of the straight line passing through (4, 1) which is parallel to the line given by the equation \\( 3x + 2y = 12 \\)?\n  \n19. For any real numbers \\( a \\), \\( b \\), and \\( c \\) where \\( a \\ge b \\), consider these three statements\n\n20. For any integer \\( x \\), consider the three statements:\n   \nbased on the types of questions provided you need to generate 5 questions based on this lesson structure ${lesson} you need to follow description and generate 5 questions based  on the questions provided above. You need to generate it using Katex code, so i can implement it later in my web page`},
          {text: "[ {    \"statement\": \"Evaluate the following argument:\",    \"question\": \"If all humans are mortal, and Socrates is a human, what can we conclude about Socrates?\",    \"variants\": [      \"Socrates is immortal.\",      \"Socrates is a god.\",      \"Socrates is mortal.\",      \"Socrates is an animal.\",      \"Socrates is an alien.\"    ],    \"rightAnswer\": 2,    \"type\": \"Critical Thinking\",    \"explanation\": \"Since the premises state that all humans are mortal and Socrates is a human, the conclusion logically follows that Socrates is mortal.\" }] "},
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
