'use client'

import useCourseApi from '@/hooks/useCourse'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const Loading = dynamic(() => import('@/components/Loading'), { ssr: false })

interface Question {
  statement: string
  question: string
  variants: string[]
  rightAnswer: number | string
  explanation: string
}

type CriticalRoadmapLessonType = Question[]

type Props = {
  params: { id: string[] }
}

export default function CriticalId({ params }: Props) {
  const router = useRouter()
  const { id } = params
  const lessonIndex = parseInt(id[2], 10)
  const sectionIndex = parseInt(id[1], 10)
  const roadmapId = id[0]
  const roadmapType = 'critical'
  const xp = parseInt(id[3], 10)
  const questionType = id[4]
  const lessonContent = id[5]
  const {
    useGenerateLesson,
    useHandleIncorrectThemes,
    useUpdateXpByLesson,
    useHandleBestThemes,
    useGetUser,
    useSetFinished,
    useSetXpGained,
    useGetLesson,
    useSetUserAnswers
  } = useCourseApi()

  const {
    mutate: generateLesson,
    isLoading: isLoadingCritical,
    isError: isErrorCritical,
    data: generatedLesson,
    error: fetchError
  } = useGenerateLesson()

  const { mutate: handleIncorrectTheme } = useHandleIncorrectThemes()
  const { mutate: updateXpByLesson } = useUpdateXpByLesson()
  const { mutate: handleBestTheme } = useHandleBestThemes()
  const { refetch: refetchUser } = useGetUser()
  const { mutate: setXpGained } = useSetXpGained()
  const { mutate: setAnswers } = useSetUserAnswers()
  const { mutate: setFinished } = useSetFinished()
  const { mutate: getLesson, isLoading: isLoadingLesson, isError: isErrorLesson, data: lessonData } = useGetLesson()

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [lesson, setLesson] = useState<CriticalRoadmapLessonType>([])
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [showNextButton, setShowNextButton] = useState(false);
  
  useEffect(() => {
    const fetchLesson = async () => {
      if (lessonContent) {
        await getLesson({ lessonIndex, sectionIndex, roadmapId })
      } else {
        await generateLesson({ lessonIndex, sectionIndex, roadmapType })
      }
    }

    fetchLesson()
  }, [lessonContent, getLesson, generateLesson, lessonIndex, sectionIndex, roadmapId, roadmapType])

  useEffect(() => {
    if (lessonContent && lessonData) {
      setLesson(lessonData as CriticalRoadmapLessonType)
    } else if (generatedLesson) {
      setLesson(generatedLesson as CriticalRoadmapLessonType)
    }
  }, [lessonContent, lessonData, generatedLesson])

  useEffect(() => {
    if (lesson.length > 0) {
      const answersCopy = [...userAnswers]
      answersCopy[currentQuestionIndex] = selectedAnswer ?? -1
      setUserAnswers(answersCopy)
    }
  }, [currentQuestionIndex, selectedAnswer, lesson.length])

  if (isLoadingCritical || (lessonContent && isLoadingLesson)) {
    return <Loading />
  }

  if (fetchError || (lessonContent && isErrorLesson)) {
    router.push('/testing/app/critical')
    return null
  }

  if (!lesson.length) {
    return <Loading />
  }

  const currentQuestion = lesson[currentQuestionIndex]

  const handleCheckAnswer = () => {
    setShowExplanation(true);    
    const rightAnswerNumber = typeof currentQuestion.rightAnswer === 'string'
      ? parseInt(currentQuestion.rightAnswer, 10)
      : currentQuestion.rightAnswer;
    
    if (selectedAnswer === rightAnswerNumber) {
      setCorrectAnswers(correctAnswers + 1);
    }
  }

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const handleNextLesson = async () => {
    if (calculatePerformance() === 100) {
      await setFinished({ roadmapId, lessonIndex, sectionIndex })
    }
    router.push('/testing/app/critical')
  }

  const calculatePerformance = () => {
    return (correctAnswers / lesson.length) * 100
  }

  const sendXPAndQuestionType = async () => {
    const performance = calculatePerformance()
    const xpEarned = (performance / 100) * xp
    try {
      if (performance <= 60) {
        handleIncorrectTheme({ incorrectThemes: [questionType] })
      } else {
        handleBestTheme({ bestThemes: [questionType] })
      }
      updateXpByLesson({ points: xpEarned })
      setXpGained({ xpGained: xpEarned, lessonIndex, sectionIndex, roadmapId })
      setAnswers({ answers: userAnswers, roadmapId, lessonIndex, sectionIndex })
      console.log('XP and questionType sent successfully!')
    } catch (error) {
      console.error('Error sending XP and questionType:', error)
    }
  }

  return (
    <section className='flex flex-col h-screen justify-between p-10 max-[800px]:p-4'>
      <section className='px-5'>
        <div className='text-2xl font-bold pb-4'>
          {currentQuestion.statement}
        </div>
        <div className='text-black text-xl pb-4'>
          {currentQuestion.question.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      </section>
      <section className='flex flex-col gap-1 px-5'>
        {currentQuestion.variants.map((variant, index) => (
          <div
            key={index}
            className={`flex flex-row gap-4 items-center cursor-pointer border-2 border-b-4 active:border-b-2 border-slate-300 rounded-lg p-2 ${
              selectedAnswer === index ? 'bg-sky-100 border-sky-300 text-black' : 'bg-slate-100'
            }`}
            onClick={() => setSelectedAnswer(index)}
          >
            <div className='text-lg font-bold'>
              {variant} 
            </div>
          </div>
        ))}
      </section>
      <section className='px-5 mt-5 flex flex-col gap-4'>
        {showExplanation && (
          <div className='bg-gray-100 border border-gray-400 p-4 rounded'>
            {selectedAnswer === (typeof currentQuestion.rightAnswer === 'string'
              ? parseInt(currentQuestion.rightAnswer, 10)
              : currentQuestion.rightAnswer) ? (
              <div
                className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'
                role='alert'
              >
                <strong className='font-bold'>Correct!</strong>
                <span className='block sm:inline'>
                  {currentQuestion.explanation}
                </span>
              </div>
            ) : (
              <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
                <strong className='font-bold'>Incorrect.</strong>
                <span className='block sm:inline'>
                  {currentQuestion.explanation}
                </span>
              </div>
            )}
          </div>
        )}
        <section className='flex flex-row gap-4'>
          {selectedAnswer !== null && (
            <>
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline max-[800px]:w-full max-[800px]:text-center max-[800px]:mb-2 max-[800px]:mx-2 ${showExplanation ? 'hidden' : ''}`}
                onClick={handleCheckAnswer}
              >
                Check Answer
              </button>
              {currentQuestionIndex < lesson.length - 1 && (
                <button
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline max-[800px]:${showExplanation ? 'w-full text-center mb-2 mx-2' : 'hidden'} `}
                  onClick={handleNextQuestion}
                >
                  Next Question
                </button>
              )}
            </>
          )}
        </section>
      </section>
      {currentQuestionIndex === lesson.length - 1 && (
        <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4'
        onClick={() => {
          sendXPAndQuestionType()
          handleNextLesson()
        }}
      >
        Finish Lesson
      </button>
      )}
    </section>
  )
}
