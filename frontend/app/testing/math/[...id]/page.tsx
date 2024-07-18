import useCourseApi from '@/hooks/useCourse'
import React from 'react'

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
    <h1>There will be logic to handle course passing</h1>
  )
}