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
    text: 'What is your primary learning goal?',
    options: ['Improve my English skills', 'Prepare for a test', 'Learn for fun', 'Other'],
    correctAnswer: 'Improve my English skills',
  },
  {
    text: 'How much time are you willing to dedicate to learning each week?',
    options: ['Less than 1 hour', '1-3 hours', '3-5 hours', 'More than 5 hours'],
    correctAnswer: '1-3 hours',
  },
  {
    text: 'What is your preferred learning style?',
    options: ['Visual', 'Auditory', 'Kinesthetic', 'Other'],
    correctAnswer: 'Visual',
  },
  {
    text: 'What is your current English level?',
    options: ['Beginner', 'Intermediate', 'Advanced', 'Native'],
    correctAnswer: 'Intermediate',
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
            <ul className="list-disc pl-6">
              {currentQuestion.options.map((option) => (
                <li
                  key={option}
                  className={`cursor-pointer ${
                    selectedAnswer === option ? 'text-blue-500' : ''
                  }`}
                  onClick={() => handleAnswerClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
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
