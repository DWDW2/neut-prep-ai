// components/StudyPathPrompt.tsx
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

// Define types for options
type OptionWithDescription = {
  id: string;
  label: string;
  description: string;
};

type OptionWithoutDescription = {
  id: string;
  label: string;
};

type Option = OptionWithDescription | OptionWithoutDescription;

// Define questions with typed options
const questions = [
  {
    id: 1,
    question: 'Какой путь вы хотите выбрать?',
    options: [
      { id: '1', label: 'Начать с основ', description: 'Пройдите вводный урок из курса испанского' },
      { id: '2', label: 'Определить мой уровень', description: 'Duo посоветует, с чего лучше начать' }
    ] as Option[]
  },
  {
    id: 2,
    question: 'Сколько часов в день вы посвящаете учебе?',
    options: [
      { id: '1', label: '1 час' },
      { id: '2', label: '2 часа' },
      { id: '3', label: '3 часа' },
      { id: '4', label: 'Больше 3 часов' }
    ] as Option[]
  },
  {
    id: 3,
    question: 'Сколько раз в неделю вы занимаетесь?',
    options: [
      { id: '1', label: '1 раз' },
      { id: '2', label: '2-3 раза' },
      { id: '3', label: '4-5 раз' },
      { id: '4', label: 'Больше 5 раз' }
    ] as Option[]
  },
  {
    id: 4,
    question: 'Каковы ваши цели по учебе?',
    options: [
      { id: '1', label: 'Изучение основы' },
      { id: '2', label: 'Достижение продвинутого уровня' },
      { id: '3', label: 'Подготовка к экзаменам' },
      { id: '4', label: 'Другие цели' }
    ] as Option[]
  }
];

const StudyPathPrompt = () => {
  const [step, setStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});

  const handleOptionClick = (questionId: number, optionId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [questionId]: optionId }));
    setStep(step + 1);
  };

  const handleFinish = () => {
    setStep(3);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-gray-900">
      {step <= questions.length ? (
        <>
          <h2 className="text-2xl font-bold mb-4">{questions[step - 1].question}</h2>
          <div className="flex flex-col space-y-4 w-full max-w-md">
            {questions[step - 1].options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(questions[step - 1].id, option.id)}
                className="flex p-3 bg-white rounded-lg hover:border-b-2 transition duration-300 border-gray-300 border-b-4 border-2 items-center justify-start"
              >
                <div className='text-3xl'>🚀</div>
                <div className="flex justify-start flex-col mx-auto">
                  <h3 className="text-lg font-bold">{option.label}</h3>
                  {'description' in option && <p className="text-sm">{option.description}</p>}
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
          <p className="mb-4">To save your progress, please register or log in.</p>
          <Button onClick={() => signIn()} variant="primary" size="lg" className="text-xl font-bold mt-4">
            Register / Login
          </Button>
        </>
      )}
    </div>
  );
};

export default StudyPathPrompt;
