'use client'

import { useEffect, useState, useMemo } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import FeedWrapper from "@/components/testing/Feed-sidebar"
import StickySideBar from "@/components/testing/Sticky-sidebar"
import UserSideBar from "@/components/testing/XPgained"
import UserProgress from "@/components/testing/UserProgress"
import UnitButton from "@/components/testing/LessonButton"
import UnitSection from "@/components/testing/UnitSection"
import { useRoadmapQuery } from "@/hooks/useRoadmap"
import useCourseApi from "@/hooks/useCourse"

const Loading = dynamic(() => import('@/components/Loading'), { ssr: false })

type Props = {}

// Define the structure for handleLesson function arguments
interface HandleLesson {
  sectionIndex: number,
  lessonIndex: number,
  roadmapId: string,
  xp: number,
  questionType: string,
}

export default function CriticalDetailed({}: Props) {
  const router = useRouter()
  const { useGenerateRoadmap, useGetRoadmap} = useRoadmapQuery()
  const { useGetUser } = useCourseApi()

  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useGetUser()
  const { isLoading, isError, mutate: mutateRoadmap } = useGenerateRoadmap()
  const { data: CriticalRoadmap, isLoading: isLoadingMath, isError: isErrorMath, refetch: refetchRoadmap } = useGetRoadmap()

  const handleLessonClick = ({ sectionIndex, lessonIndex, roadmapId, xp, questionType }: HandleLesson) => {
    router.push(`/testing/critical/${roadmapId}/${sectionIndex}/${lessonIndex}/${xp}/${questionType}`)
  }
  const refetchIfNeeded = () => {
    if (user?.roadmapMathId === null) {
      mutateRoadmap({ questionType: 'math' })
    } else {
      refetchRoadmap();
    }
  }

  useEffect(() => {
    refetchIfNeeded();
  }, [user]);

  useEffect(() => {
    const intervalId = setInterval(refetchRoadmap, 10000);
    return () => clearInterval(intervalId);
  }, []);
  const roadmapContent = useMemo(() => {
    if (!CriticalRoadmap?.criticalRoadmap?.roadmap) return null
    return CriticalRoadmap.criticalRoadmap.roadmap.map((section, index) => (
      <div key={index}>
        <UnitSection Unit={section.unit} UnitName={section.section} />
        {section.lessons.map((lesson, lessonIndex) => (
          <UnitButton 
            key={lessonIndex} 
            index={lessonIndex} 
            totalCount={section.lessons.length} 
            onClick={() => handleLessonClick({ 
              sectionIndex: index, 
              lessonIndex, 
              roadmapId: CriticalRoadmap.criticalRoadmap._id, 
              xp: lesson.xp, 
              questionType: section.questionType 
            })} 
          />
        ))}
      </div>
    ))
  }, [CriticalRoadmap])

  if (isLoading || isLoadingUser) return <Loading />

  if (isError || isErrorUser) {
    toast.error('An error occurred while loading the lesson. Please try again.')
  }

  return (
    <div className="flex flex-row-reverse gap-12 px-6">
      <StickySideBar>
        <section className="flex flex-col gap-y-4 p-4">
          <UserSideBar title="Daily quest" dailyGoal={10} xp={user?.todaysXp || 0} />
          <UserProgress dailyGoal={20} xp={user?.todaysXp || 0} />
        </section>
      </StickySideBar>
      <FeedWrapper>
        <section className="pt-6 gap-y-4 flex flex-col">
          {roadmapContent}
        </section>
      </FeedWrapper>
      <ToastContainer />
    </div>
  )
}
