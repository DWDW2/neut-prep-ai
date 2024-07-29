'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import RegistrationForm from '../auth/RegistrationForms';
import Modal from './Modal';
import { useRoadmapQuery } from '@/hooks/useRoadmap';
import { toast } from 'react-toastify';
import Loading from '../Loading';
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
  },
  {
    id: 7,
    question: 'Как долго вы готовитесь к NUET/TSA/BMAT?',
    options: [
      { id: '1', label: 'Менее месяца' },
      { id: '2', label: '1-3 месяца' },
      { id: '3', label: '3-6 месяцев' },
      { id: '4', label: 'Больше 6 месяцев' }
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
  const { mutate, isLoading: roadmapLoading, isError, error } = useGenerateRoadmap();
  const router = useRouter()
  const handleOptionClick = (questionId: number, optionId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [questionId]: optionId }));
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleRegistrationSuccess = async () => {
    setIsModalOpen(false);
    setIsRegistering(true); 
    setIsLoading(true);
    try {
      await mutate();
      if (isError) {
        toast.error(error?.message || 'Failed to generate roadmaps');
      } else {
        router.push('/testing/app')
        toast.success('Registered successfully');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-gray-900">
      <div className="absolute top-4 left-4">
        <Link href="/login">
          <div className="text-blue-600 hover:underline">Already have an account?</div>
        </Link>
      </div>

      {isRegistering ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h2 className="text-2xl font-bold mb-4">Generating course...</h2>
          <Loadingbut/>
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
