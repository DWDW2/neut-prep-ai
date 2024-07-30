'use client'
import useCourseApi from '@/hooks/useCourse'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import axios from 'axios'; 

interface Question {
  statement: string
  question: string
  options: string[]
  rightAnswer: number
  explanation: string
}

type MathRoadmapLessonType = Question[]

const Loading = dynamic(() => import('@/components/Loading'), { ssr: false })

type Props = {
  params: {
    id: string[]
  },
}

export default function MathId({params}: Props) {
    const router = useRouter();
    const {id} = params
    const lessonIndex = parseInt(id[2], 10); 
    const sectionIndex = parseInt(id[1], 10); 
    const roadmapType = 'math'
    const xp = parseInt(id[3], 10); 
    const questionType = id[4]; 
    const {useGenerateLesson, useHandleIncorrectThemes, useUpdateXpByLesson, useHandleBestThemes, useGetUser} = useCourseApi() 
    const {mutate, isLoading:isLoadingMath, isError: isErrorMath, data:MathRoadmapLesson, error: fetchError} = useGenerateLesson() 
    const {mutate:mutateIncorrectTheme} = useHandleIncorrectThemes()
    const {mutate:mutateXP} = useUpdateXpByLesson()
    const {mutate:mutateBestTheme} = useHandleBestThemes()
    const {refetch:refetchUser} = useGetUser()
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0); 
    console.log(MathRoadmapLesson)
    React.useEffect(() => {
        mutate({lessonIndex, sectionIndex, roadmapType})
    }, [])

    if(isLoadingMath){ 
        return(
            <Loading/>
        )
    }

    if (fetchError) {
      router.push('/testing/app/math')
      return null; 
    }

    if (MathRoadmapLesson) { 
        const currentQuestion = MathRoadmapLesson[currentQuestionIndex];

        const handleCheckAnswer = () => {
          setShowExplanation(true);
          if (selectedAnswer === currentQuestion.rightAnswer) {
            setCorrectAnswers(correctAnswers + 1);
          }
        };

        const handleNextQuestion = () => {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
          setShowExplanation(false);
        };

        const handleNextLesson = () => {
          router.push('/testing/app/math'); 
        };

        const calculatePerformance = () => {
          return (correctAnswers / MathRoadmapLesson.length) * 100;
        };

        const sendXPAndQuestionType = async () => {
          const performance = calculatePerformance();
          const xpEarned = (performance / 100) * xp; 
          try {
            if(performance <= 60){
              mutateIncorrectTheme({incorrectThemes: [questionType]})
            }else{
              mutateBestTheme({bestThemes: [questionType]})
            }
            mutateXP({points: xpEarned})
            console.log('XP and questionType sent successfully!');
          } catch (error) {
            console.error('Error sending XP and questionType:', error);
          }
        };

        return (
          <MathJaxContext>
            <section className='flex flex-col h-screen justify-between p-10 max-[800px]:p-4'>
              <section className='px-5'>
                  <div className='text-2xl font-bold pb-4'>
                    <MathJax inline>{currentQuestion.statement}</MathJax>
                  </div>
                  <div className='text-black text-xl pb-4'>
                    {
                      currentQuestion.question.split('\n').map((line, index) => (
                        <div key={index}>
                          <MathJax>{line}</MathJax>
                        </div>
                      ))
                    }
                  </div>
              </section>
              <section className='flex flex-col gap-1 px-5'>
                {   
                  currentQuestion.options.map((variant, index) => {
                    return (
                      <div 
                        key={index} 
                        className={`flex flex-row gap-4 items-center cursor-pointer border-2 border-slate-200 rounded-lg p-2 ${selectedAnswer === index + 1 ? 'bg-slate-300 text-black' : 'bg-gray-100'}`}
                        onClick={() => setSelectedAnswer(index + 1)}
                      >
                        <div className='text-lg font-bold'>
                          <MathJax inline>{variant}</MathJax>
                        </div>
                      </div>
                    )
                  })
                }
              </section>
              <section className='px-5 mt-5 flex flex-row gap-4'>
                {selectedAnswer !== null && (
                  <>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={handleCheckAnswer}
                    >
                      Check Answer
                    </button>
                    {currentQuestionIndex < MathRoadmapLesson.length - 1 && (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleNextQuestion}
                      >
                        Next Question
                      </button>
                    )}
                  </>
                )}
              </section>
              <section className='px-5 mt-5'>
                {showExplanation && (
                  <div className="mt-4">
                    {selectedAnswer === currentQuestion.rightAnswer ? (
                      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Correct!</strong>
                        <span className="block sm:inline">
                          <MathJax>{currentQuestion.explanation}</MathJax>
                        </span>
                      </div>
                    ) : (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Incorrect.</strong>
                        <span className="block sm:inline">
                          <MathJax>{currentQuestion.explanation}</MathJax>
                        </span>
                      </div>
                    )}
                  </div>
                )}
                {currentQuestionIndex === MathRoadmapLesson.length - 1 && (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                    onClick={() => {
                      sendXPAndQuestionType(); 
                      handleNextLesson();
                      refetchUser()
                    }}
                  >
                    Main Page
                  </button>
                )}
              </section>
            </section>
          </MathJaxContext>
        )
    } else {
        return (
           <Loading />
        ) 
    }
}
