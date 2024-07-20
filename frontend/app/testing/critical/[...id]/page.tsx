'use client'
import useCourseApi from '@/hooks/useCourse'
import React, { useState } from 'react'
import { RoadMapLesson } from '@/app/constants'
import Loading from '@/components/Loading'
import { useRouter } from 'next/navigation';

type Props = {
    params:{
        id: string,
    },
}

export default function CriticalThinkingId({params}: Props) {
    const router = useRouter();
    const {id} = params
    const lessonIndex = id[2]
    const sectionIndex = id[1]
    const roadmapId = id[0]
    const {useGenerateLessonCritical} = useCourseApi() 
    const {mutate, isLoading:isLoadingCritical, isError: isErrorCritical, data:CriticalRoadmapLesson} = useGenerateLessonCritical() 
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);

    React.useEffect(() => {
        mutate({lessonIndex, sectionIndex, roadmapId})
    }, [])

    if(isLoadingCritical){ 
        return(
            <Loading/>
        )
    }

    if (CriticalRoadmapLesson) { 
        return (
          <section className='flex flex-col h-screen justify-between'>
            <section className='h-[30%]'>
                <div className='text-xl font-bold'>{CriticalRoadmapLesson.statement}</div>
                <div className='text-gray-600'>{CriticalRoadmapLesson.question}</div>
            </section>
            <section className='h-[30%]'>
              {
                CriticalRoadmapLesson.variants.map((variant, index) => {
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
                  {selectedAnswer === CriticalRoadmapLesson.rightAnswer ? (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                      <strong className="font-bold">Correct!</strong>
                      <span className="block sm:inline">{CriticalRoadmapLesson.explanation}</span>
                    </div>
                  ) : (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                      <strong className="font-bold">Incorrect.</strong>
                      <span className="block sm:inline">{CriticalRoadmapLesson.explanation}</span>
                    </div>
                  )}
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                    onClick={() => {
                      const nextLessonIndex = lessonIndex + 1;
                      const nextId = `${roadmapId}/${sectionIndex}/${nextLessonIndex}`;
                      router.push(`/testing/critical/${nextId}`);
                    }}
                  >
                    Next Question
                  </button>
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
