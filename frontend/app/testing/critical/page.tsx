'use client'
import FeedWrapper from "@/components/testing/Feed-sidebar"
import StickySideBar from "../../../components/testing/Sticky-sidebar"
import UserSideBar from "@/components/testing/XPgained"
import UserProgress from "@/components/testing/UserProgress"
import UnitButton from "@/components/testing/LessonButton"
import UnitSection from "@/components/testing/UnitSection"
import { useRoadmapQuery } from "@/hooks/useRoadmap"
import { useEffect, useState } from "react"
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import useCourseApi from "@/hooks/useCourse"
import dynamic from "next/dynamic"
const Loading = dynamic(() => import('@/components/Loading'), {ssr: false})
import { useRouter } from "next/navigation"
type Props = {}
interface handleLesson {
  sectionIndex: number,
  lessonIndex: number,
  roadmapId: string;
  xp: number;
  questionType: string;
}
export default function CriticalDetailed({}: Props) {
  const router = useRouter()
  const {useGenerateCriticalRoadmap} = useRoadmapQuery()
  const {useGenerateLessonCritical, useGetUser} = useCourseApi()
  const {data: user, isLoading: isLoadingUser, isError: isErrorUser} = useGetUser()
  const {data: CriticalRoadmap, isLoading, isError} = useGenerateCriticalRoadmap()
  const handleLessonClick = ({ sectionIndex, lessonIndex, roadmapId, xp, questionType}: handleLesson) => {
    router.push(`/testing/critical/${roadmapId}/${sectionIndex}/${lessonIndex}/${xp}/${questionType}`)
  }
  if(isLoading ){
    return(
      <Loading />
    )
  }

  if(isError){
    toast('error')
  }
  console.log(CriticalRoadmap)

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickySideBar>
        <section className="flex flex-col gap-y-4 p-4">
          <UserSideBar title="Daily quest" dailyGoal={10} xp={user?.todaysXp ? user.todaysXp : 0}/>
          <UserProgress dailyGoal={20} xp={user?.todaysXp ? user.todaysXp : 0}/>
        </section>
      </StickySideBar>
      <FeedWrapper>
        <section className="pt-6 gap-y-4 flex flex-col">
          {

            CriticalRoadmap?.roadmap.map((section, index) => {
              return(
                <div key={index}>
                  <UnitSection Unit={section.unit} UnitName={section.section}/>
                  {
                    section.lessons.map((lesson, lessonindex) => {
                      return(
                        <UnitButton index={lessonindex}  totalCount={section.lessons.length} onClick={() => handleLessonClick({sectionIndex: index, lessonIndex: lessonindex, roadmapId: CriticalRoadmap._id, xp: lesson.xp, questionType: section.questionType})} key={lessonindex}/>
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