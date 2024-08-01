'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import RegistrationForm from '../auth/RegistrationForms';
import Modal from './Modal';
import { useRoadmapQuery } from '@/hooks/useRoadmap';
import { toast } from 'react-toastify';
import Loadingbut from '../ui/loading';
import { useRouter } from 'next/navigation';

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

const questions = [
  {
    id: 1,
    question: 'What study path would you like to follow for NUET preparation?',
    options: [
      { id: '1', label: 'Start with the basics', description: 'Complete an introductory lesson on fundamental concepts.' },
      { id: '2', label: 'Assess my level', description: 'Get recommendations on where to start based on your current knowledge.' }
    ] as Option[]
  },
  {
    id: 2,
    question: 'How many hours per day can you dedicate to preparing for the NUET?',
    options: [
      { id: '1', label: '1 hour' },
      { id: '2', label: '2 hours' },
      { id: '3', label: '3 hours' },
      { id: '4', label: 'More than 3 hours' }
    ] as Option[]
  },
  {
    id: 3,
    question: 'How many times a week do you plan to study for the NUET?',
    options: [
      { id: '1', label: 'Once' },
      { id: '2', label: '2-3 times' },
      { id: '3', label: '4-5 times' },
      { id: '4', label: 'More than 5 times' }
    ] as Option[]
  },
  {
    id: 4,
    question: 'What are your primary goals for NUET preparation?',
    options: [
      { id: '1', label: 'Understand the fundamentals' },
      { id: '2', label: 'Reach an advanced level' },
      { id: '3', label: 'Prepare specifically for NUET' },
      { id: '4', label: 'Other goals related to the exam' }
    ] as Option[]
  },
  {
    id: 5,
    question: 'How long have you been preparing for the NUET?',
    options: [
      { id: '1', label: 'Less than a month' },
      { id: '2', label: '1-3 months' },
      { id: '3', label: '3-6 months' },
      { id: '4', label: 'More than 6 months' }
    ] as Option[]
  }
];

const StudyPathPrompt = () => {
  const [step, setStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const { useGenerateRoadmap } = useRoadmapQuery();
  
  const { mutate, isLoading: roadmapLoading, isError, error, isSuccess } = useGenerateRoadmap();
  const router = useRouter();

  const handleOptionClick = (questionId: number, optionId: string) => {
    const selectedOption = questions[step - 1].options.find(option => option.id === optionId);
    
    if (selectedOption?.label === 'Start with the basics') {
      setIsModalOpen(true);
    } else {
      setSelectedOptions((prev) => ({ ...prev, [questionId]: optionId }));
      if (step < questions.length) {
        setStep(step + 1);
      } else {
        setIsModalOpen(true);
      }
    }
  };

  const handleRegistrationSuccess = () => {
    setIsModalOpen(false);
    setIsRegistering(true);
    setIsLoading(true);
  
    mutate(undefined, {
      onSuccess: () => {
        toast.success('Registered successfully');
        router.push('/testing/app/math');
      },
      onError: (error) => {
        toast.error('Failed to generate roadmaps');
        console.error(error);
      },
      onSettled: () => {
        setIsLoading(false);
      }
    });
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-gray-900">
      {isRegistering ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h2 className="text-2xl font-bold mb-4">Generating course...</h2>
          <Loadingbut />
        </div>
      ) : step <= questions.length ? (
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
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full text-white bg-blue-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Register or Log In
          </Button>
        </>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RegistrationForm onSuccess={handleRegistrationSuccess} />
      </Modal>
    </div>
  );
};

export default StudyPathPrompt;
