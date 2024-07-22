'use client'
import useCourseApi from '@/hooks/useCourse'
import React, { useState } from 'react'
import { RoadMapLesson } from '@/app/constants'
const Loading = dynamic(() => import('@/components/Loading'), {ssr: false})
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic'
type Props = {
    params:{
        id: string,
    },
}

export default function CriticalThinkingId({params}: Props) {
    const router = useRouter();
    const {id} = params
    const lessonIndex = parseInt(id[2], 10); 
    const sectionIndex = parseInt(id[1], 10); 
    const roadmapId = id[0]; 
    const {useGenerateLessonCritical} = useCourseApi() 
    const {mutate, isLoading:isLoadingCriticalThinking, isError: isErrorCriticalThinking, data:CriticalThinkingRoadmapLesson} = useGenerateLessonCritical() 
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    React.useEffect(() => {
        mutate({lessonIndex, sectionIndex, roadmapId})
    }, [])

    if(isLoadingCriticalThinking){ 
        return(
            <Loading/>
        )
    }

    if (CriticalThinkingRoadmapLesson) { 
        const currentQuestion = CriticalThinkingRoadmapLesson[currentQuestionIndex];

        return (
          <section className='flex flex-col h-screen justify-between'>
            <section className='h-[30%]'>
                <div className='text-xl font-bold'>{currentQuestion.statement}</div>
                <div className='text-gray-600'>{currentQuestion.question}</div>
            </section>
            <section className='h-[30%]'>
              {
                currentQuestion.variants.map((variant, index) => {
                  return (
                    <div 
                      key={index} 
                      className={`flex flex-row gap-4 items-center cursor-pointer rounded-md p-2 ${selectedAnswer === index ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                      onClick={() => setSelectedAnswer(index)}
                    >
                      <div className='text-lg font-bold'>{variant}</div>
                    </div>
                  )
                })
              }
            </section>
            <section className='h-[30%]'>
              {selectedAnswer !== null && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setShowExplanation(true)}
                >
                  Check Answer
                </button>
              )}
              {showExplanation && (
                <div className="mt-4">
                  {selectedAnswer === currentQuestion.rightAnswer ? (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                      <strong className="font-bold">Correct!</strong>
                      <span className="block sm:inline">{currentQuestion.explanation}</span>
                    </div>
                  ) : (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                      <strong className="font-bold">Incorrect.</strong>
                      <span className="block sm:inline">{currentQuestion.explanation}</span>
                    </div>
                  )}
                  {currentQuestionIndex < CriticalThinkingRoadmapLesson.length - 1 && (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                      onClick={() => {
                        setCurrentQuestionIndex(currentQuestionIndex + 1);
                        setSelectedAnswer(null);
                        setShowExplanation(false);
                      }}
                    >
                      Next Question
                    </button>
                  )}
                  {currentQuestionIndex === CriticalThinkingRoadmapLesson.length - 1 && (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                      onClick={() => {
                        const nextLessonIndex = lessonIndex + 1;
                        const nextId = `${roadmapId}/${sectionIndex}/${nextLessonIndex}`;
                        router.push(`/testing/critical/${nextId}`);
                      }}
                    >
                      Next Lesson
                    </button>
                  )}
                </div>
              )}
            </section>
          </section>
        )
    } else {
        return (
           <Loading />
        ) 
    }
}
