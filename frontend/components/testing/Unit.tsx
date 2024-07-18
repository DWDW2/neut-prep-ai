import React from 'react'
import UnitButton from './LessonButton'
import { Roadmap } from '@/types/useRoadmap.types'
interface handleLesson {
  activeLesson: boolean,
  isCurrent: boolean;
  isLoked: boolean;
  lessonId: string
}

type Props = {
  data?: Roadmap | null
  onClick: ({lessonId, isCurrent, isLoked, activeLesson}:handleLesson) => void;
}

interface Lesson {
  activeLesson: boolean,
  isCurrent: boolean;
  isLoked: boolean;
}

export default function Unit({data, onClick}: Props) {

  return (
    <section className='flex flex-col items-center gap-4'>
        {
          data && data.roadmap.map((lesson, index) => {
            return(
              <UnitButton key={index} onClick={() => onClick}/>
            )
          })
        }
    </section>
  )
}