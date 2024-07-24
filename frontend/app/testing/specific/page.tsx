'use client'
import TestButton from '@/components/specific/TestButton'
import { useRoadmapQuery } from '@/hooks/useRoadmap'
import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
const Loading = dynamic(() => import('@/components/Loading'), {ssr: false})
type Props = {}

export default function SPecific({}: Props) {
  const router = useRouter()
  const {useGenerateCriticalRoadmap, useGenerateMathRoadmap} = useRoadmapQuery()
  const {data: RoadMapCritical, isLoading: isLoadingCritical, isError: isErrorCritical} = useGenerateCriticalRoadmap()
  const {data: MathRoadmap, isLoading: isLoadingMath, isError: isErrorMath} = useGenerateMathRoadmap()

  if(isLoadingCritical){
    return(
      <Loading />
    )
  }

  if(isErrorCritical || isErrorMath){
    return(
      <div>Error</div>
    )
  }

  const combinedRoadmaps = [RoadMapCritical, MathRoadmap];

  const handleButtonClick = (roadmapId: string, sectionIndex: number, lessonIndex: number) => {

    const lessonType = roadmapId === RoadMapCritical?._id ? 'critical' : 'math';
    router.push(`/testing/${lessonType}/${roadmapId}/${sectionIndex}/${lessonIndex}`);
  };

  return (
    <section>
      <section className='text-center p-5 text-3xl font-bold'>
        Test your skills
      </section>
      <section className='p-5 grid grid-cols-3 gap-5'>
        {combinedRoadmaps.map((roadmap, index) => {

          return roadmap?.roadmap.map((section, sectionIndex) => {
            return section.lessons.map((lesson, lessonIndex) => (
              <TestButton 
                key={`${index}-${sectionIndex}-${lessonIndex}`} 
                questionType={lesson.title} 
                onClick={() => handleButtonClick(roadmap._id, sectionIndex, lessonIndex)} 
              />
            ));
          });
        })}
      </section>
    </section>
  )
}
