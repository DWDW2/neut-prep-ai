'use client'

import { useEffect, useMemo } from "react"
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

interface HandleLesson {
  sectionIndex: number,
  lessonIndex: number,
  roadmapId: string,
  xp: number,
  questionType: string,
}

export default function CriticalDetailed({ }: Props) {
  const router = useRouter()
  const { useGetRoadmap } = useRoadmapQuery()
  const { useGetUser } = useCourseApi()
  
  const { data: user } = useGetUser()
  const { data: CriticalRoadmap, isLoading: isLoadingCritical, isError: isErrorCritical, refetch: refetchRoadmap } = useGetRoadmap()

  const handleLessonClick = ({ sectionIndex, lessonIndex, roadmapId, xp, questionType }: HandleLesson) => {
    router.push(`/testing/critical/${roadmapId}/${sectionIndex}/${lessonIndex}/${xp}/${questionType}`)
  }

  useEffect(() => {
    if (user?.roadmapMathId !== null) {
      refetchRoadmap();
    }
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
            locked={lesson.locked}
            isCurrent={lesson.isCurrent}
            xp={lesson.xpGained} 
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

  if (isLoadingCritical) return <Loading />

  if (isErrorCritical) {
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
