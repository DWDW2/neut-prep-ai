import useCourseApi from '@/hooks/useCourse'
import React from 'react'
import { RoadMapLesson } from '@/app/constants'
type Props = {
    params:{
        id: string,
    },
}

export default function MathId({params}: Props) {
  // will be generating based on the params
    const {id} = params
    const lessonIndex = id[2]
    const sectionIndex = id[1]
    const roadmapId = id[0]
    // const {useGenerateLessonMath} = useCourseApi()
    // const {mutate, isLoading:isLoadingMath, isError: isErrorMath, data:MathRoadmapLesson} = useGenerateLessonMath()
    // mutate({})
    console.log(params)
    return (
      <section className='flex flex-col h-screen justify-between'>
        <section className='h-[30%]'>
            <div className='text-xl font-bold'>{RoadMapLesson.question}</div>
            <div className='text-gray-600'></div>
        </section>
        <section className='h-[30%]'>
          {
            RoadMapLesson.questionVariants.map((variant, index) => {
              return (
                <div key={index} className='flex flex-row gap-4 items-center'>
                  <div className='text-lg font-bold'>{variant}</div>
                </div>
              )
            })
          }
        </section>
      </section>
    )
}
