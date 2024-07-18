'use client'

import FeedWrapper from "@/components/testing/Feed-sidebar"
import StickySideBar from "../../../components/testing/Sticky-sidebar"
import UserSideBar from "@/components/testing/XPgained"
import UserProgress from "@/components/testing/UserProgress"
import UnitButton from "@/components/testing/LessonButton"
import Unit from "@/components/testing/Unit"
import UnitSection from "@/components/testing/UnitSection"
import { useRoadmapQuery } from "@/hooks/useRoadmap"
import { useState } from "react"
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import useCourseApi from "@/hooks/useCourse"
import Loading from "@/components/Loading"
import { RoadMap, RoadMapLesson} from "@/app/constants"
import { useRouter } from "next/navigation"
type Props = {}
interface handleLesson {
  sectionIndex: number,
  lessonIndex: number,
  roadmapId: string
}
export default function CriticalDetailed({}: Props) {
  // const {useGenerateMathRoadmap} = useRoadmapQuery()
  // const {useGenerateLessonMath} = useCourseApi()
  // const {mutate, isLoading:isLoadingMath, isError: isErrorMath, data:MathRoadmapLesson} = useGenerateLessonMath()
  // const [isLessonActive, setLessonActive] = useState(false)
  // const {data: RoadMap, isLoading, isError} = useGenerateMathRoadmap()
  // const handleLessonClick = ({ sectionIndex, lessonIndex, roadmapId}: handleLesson) => {
  //   setLessonActive(!isLessonActive)
  //   console.log()
  //   mutate({sectionIndex, lessonIndex, roadmapId})
  // }
  // if(isLoading){
  //   return(
  //     <Loading />
  //   )
  // }

  // if(isError){
  //   toast('error')
  // }
  // console.log(RoadMap)
  // console.log(MathRoadmapLesson)
  
  const router = useRouter()
  const handleLessonClick = ({lessonIndex, sectionIndex, roadmapId}:handleLesson) => {
    router.push(`/testing/math/${roadmapId}/${sectionIndex}/${lessonIndex}`)
  }
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickySideBar>
        <section className="flex flex-col gap-y-4 p-4">
          <UserSideBar title="Daily quest" dailyGoal={100} xp={10}/>
          <UserProgress dailyGoal={100} xp={20}/>
        </section>
      </StickySideBar>
      <FeedWrapper>
        <section className="pt-6 gap-y-4 flex flex-col">
          {
            RoadMap?.roadmap.map((section, index) => {
              return(
                <div key={index}>
                  <UnitSection Unit={section.unit} UnitName={section.section}/>
                  {
                    section.lessons.map((lesson, lessonindex) => {
                      return(
                        <UnitButton index={lessonindex} totalCount={section.lessons.length} onClick={() => handleLessonClick({roadmapId: RoadMap._id, sectionIndex: index, lessonIndex: lessonindex})}  key={lessonindex}/>
                      )
                    })
                  }
                </div>
              )
            })
          }

        </section>
      </FeedWrapper>
      <ToastContainer/>
    </div>
  )
}
