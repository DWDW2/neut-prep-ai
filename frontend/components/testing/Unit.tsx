import React from 'react'
import UnitButton from './LessonButton'
import { Roadmap } from '@/types/useRoadmap.types'
interface handleLesson {
  sectionIndex: number,
  lessonIndex: number,
  roadmapId: string
}
type Props = {
  data?: Roadmap | null
  onClick: ({sectionIndex, lessonIndex, roadmapId}:handleLesson) => void;
}

interface Lesson {
  activeLesson: boolean,
  isCurrent: boolean;
  isLoked: boolean;
}

export default function Unit({data, onClick}: Props) {

  return (
    <section className='flex flex-col items-center gap-4'>
      
    </section>
  )
}