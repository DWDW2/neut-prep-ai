const partsCritical = [
    {text: "input: Goal: Develop critical thinking skills for the National University Entrance Test (NUET).\n\nRequest: Generate 30 practice questions in JSON format, with maximum 7 questions featuring HTML tables for data analysis. This tables should be high level tasks.\n\nAction: Craft complex scenarios (at least 100 words each) that explore diverse themes and require thoughtful analysis.\n\nDetails:Include diverse viewpoints and data (emphasize data for table-based questions) to enhance the challenge.Focus on open-ended scenarios that necessitate analyzing information (including data presented in HTML tables), identifying biases, and evaluating potential outcomes.Emphasize logical reasoning, including drawing conclusions and identifying logical fallacies from data and arguments.Encourage examining situations from multiple perspectives for a nuanced understanding.\n\nQuestion Types:\n\nPrioritize questions that leverage data in HTML tables for analysis (maximum 7 questions).\n\n* \"Which one of the following is an expression of the main conclusion of the above argument? \"\n* \"Which one of the following is the best statement of the flaw in the above argument?\"\n* \"Which one of the following is a conclusion that can reliably be drawn from the above passage?\"\n* \"Which one of the following is an underlying assumption of the above argument? \"\n* \"Which one of the following, if true, would most weaken the above argument?\"\n* \"Which one of the following best identifies the flaw in the above reasoning? \"\n* \"Which one of the following is a conclusion that can be drawn from the above passage? \n\nExamples: \"What is the main conclusion that can be drawn from the data in the table above?\" or \"Which of the following conclusions is best supported by the data presented in the table?\"\n\nFormat:The output should be a single JSON file containing an array of 30 question objects. \n\nEach question object should have the following structure:\n\n{   \"id\": \"1\"\n    \"question\":\"question\",\n    \"statement\": \"passage\"\n    \"options\": [\n      \"option 1\",\n      \"option 2\",\n      \"option 3\",\n      \"option 4\",\n      \"option 5\"\n    ],\n    \"answer\": \"number_of_option\",\n    \"explanation\": \"explanation\",\n    \"table\": \"HTML_CODE\",\n    \"question type\": \"question type\"\n  }"},
    {text: "output:[{   \"id\": \"1\"     \"question\":\"question\",     \"statement\": \"passage\"     \"options\": [       \"option 1\",       \"option 2\",       \"option 3\",       \"option 4\",       \"option 5\"     ],     \"answer\": \"number_of_option\",     \"explanation\": \"explanation\",     \"table\": \"HTML_CODE\",     \"question type\": \"question-type\"   }] "},
  ];

  const partsMath = [
    {text: "input: Goal: Create a comprehensive JSON file containing 30 unique and challenging math practice questions for the National University Entrance Test (NUET).Structure:Generate an array named questions.\n\nEach element in the array should be a JSON object adhering to the specified format:\n\n{\n  \"id\": \"1\" (Unique identifier for the question),\n  \"question\": \"STRING\" (Question text using better-react-mathjax markdown),\n  \"question_type\": \"STRING\" (Type of question, e.g., \"inequality solving\"),\n  \"explanation\": \"STRING\" (Explanation using better-react-mathjax markdown, if applicable),\n  \"options\": {\n    \"A\": \"STRING\" (Option 1 text),\n    \"B\": \"STRING\" (Option 2 text),\n    \"C\": \"STRING\" (Option 3 text),\n    \"D\": \"STRING\" (Option 4 text),\n    \"E\": \"STRING\" (Optional, for 5-choice questions)\n  },\n  \"correct_option\": \"STRING\" (Letter of the correct option, e.g., \"A\"),\n  \"svg_file\": \"STRING\" (Optional, path to the SVG file for geometric problems)\n}\n\nEmphasis:Focus on open-ended scenarios that demand:Application of logical reasoning to draw conclusions and evaluate outcomes.Multi-perspective examination for a comprehensive understanding.Question Types:Cover classic NUET question formats, including:Binary operations and propertiesInequality solvingSimultaneous equationsAlgebraic fractions and manipulationExponents and logarithmsQuadratic equations and propertiesGeometric problems (separate process for SVG generation)Straight line equations and relationshipsLogic and reasoning with statementsWord problems involving volumes/surface areas (consider for challenge)Permutation and combination problems (consider for challenge)"},
    {text: ""},
  ];


export {partsCritical, partsMath};
