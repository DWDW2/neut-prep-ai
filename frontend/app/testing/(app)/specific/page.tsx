'use client'
import TestButton from '@/components/specific/TestButton'
import { useRoadmapQuery } from '@/hooks/useRoadmap'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
const Loading = dynamic(() => import('@/components/Loading'), {ssr: false})
type Props = {}

export default function SPecific({}: Props) {
  const router = useRouter()
  const {useGenerateCriticalRoadmap, useGenerateMathRoadmap} = useRoadmapQuery()
  const {data: RoadMapCritical, isLoading: isLoadingCritical, isError: isErrorCritical} = useGenerateCriticalRoadmap()
  const {data: MathRoadmap, isLoading: isLoadingMath, isError: isErrorMath} = useGenerateMathRoadmap()
  const [searchTerm, setSearchTerm] = useState('');

  if(isLoadingCritical || isLoadingMath){
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredRoadmaps = combinedRoadmaps.map((roadmap) => {
    if (!roadmap) return null;
    return {
      ...roadmap,
      roadmap: roadmap.roadmap.map((section) => ({
        ...section,
        lessons: section.lessons.filter((lesson) =>
          lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      })),
    };
  });

  return (
    <section className='flex flex-col gap-4'>
      <section className='flex flex-row justify-between items-center p-5'>
        <h1 className='text-center p-5 text-3xl font-bold'>Test your skills</h1>
        <div className='flex flex-row items-center gap-2'>
          <Search className='text-gray-500' size={20} />
          <input
            type="text"
            placeholder="Search..."
            className='border border-gray-300 rounded-md px-3 py-2'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </section>
      <section className='p-5 grid lg:grid-cols-4 gap-5 grid-cols-2'>
        {filteredRoadmaps.map((roadmap, index) => {
          if (!roadmap) return null;
          return roadmap.roadmap.map((section, sectionIndex) => {
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
