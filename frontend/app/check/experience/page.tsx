'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type Question = {
  text: string;
  options: string[];
  correctAnswer: string;
};

const questions: Question[] = [
  {
    text: 'What is the primary focus of the NUET exam?',
    options: ['General knowledge', 'English proficiency', 'Math skills', 'Science knowledge'],
    correctAnswer: 'English proficiency',
  },
  {
    text: 'Which section of the NUET exam assesses reading comprehension?',
    options: ['Listening', 'Writing', 'Reading', 'Speaking'],
    correctAnswer: 'Reading',
  },
  {
    text: 'What type of questions are typically found in the NUET writing section?',
    options: ['Multiple choice', 'Essay writing', 'Fill-in-the-blanks', 'Short answer'],
    correctAnswer: 'Essay writing',
  },
  {
    text: 'How many sections are there in the NUET exam?',
    options: ['Two', 'Three', 'Four', 'Five'],
    correctAnswer: 'Four',
  },
];

const ExperienceCheck: React.FC = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      setAnswers([...answers, selectedAnswer]);
      setSelectedAnswer('');
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleFinish = () => {
    // Process the answers here (e.g., send to backend)
    console.log('Answers:', answers);
    // router.push('/check/experience/results'); // Navigate to results page
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Experience Check</h1>

      {currentQuestionIndex < questions.length ? (
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-lg font-medium mb-2">{currentQuestion.text}</p>
            <div className="grid grid-cols-1 gap-4 mt-4">
              {currentQuestion.options.map((option) => (
                <div
                  key={option}
                  className={`bg-gray-100 rounded-lg shadow-md p-4 cursor-pointer flex items-center justify-between ${
                    selectedAnswer === option ? 'bg-blue-500 text-white' : ''
                  }`}
                  onClick={() => handleAnswerClick(option)}
                >
                  <p className="text-lg font-medium">{option}</p>
                  {selectedAnswer === option && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
          >
            Next
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-lg font-medium mb-2">Thank you for completing the experience check!</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleFinish}
          >
            Finish
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceCheck;
