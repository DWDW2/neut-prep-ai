'use client'
import { useEffect, useState, useMemo } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

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

interface handleLesson {
  sectionIndex: number,
  lessonIndex: number,
  roadmapId: string;
  xp: number;
  questionType: string
  locked: boolean;
  lessonContent: string;
}

export default function MathDetailed({ }: Props) {
  const router = useRouter()
  const { useGetRoadmap } = useRoadmapQuery()
  const { useGetUser, useUpdateStreak} = useCourseApi()
  const { data: user } = useGetUser()
  const [isLessonActive, setLessonActive] = useState(false)
  const { data: RoadMapMath, isLoading: isLoadingMath, isError: isErrorMath, refetch: refetchRoadmap } = useGetRoadmap()
  const { mutate: mutateStreak } = useUpdateStreak()

  const handleLessonClick = ({ lessonIndex, sectionIndex, roadmapId, xp, questionType, locked, lessonContent }: handleLesson) => {
    if (!locked) {
      router.push(`/testing/app/math/${roadmapId}/${sectionIndex}/${lessonIndex}/${xp}/${questionType}/${lessonContent ? lessonContent : ''}`)
    } else {
      toast.info('Complete previous lessons to unlock this one')
    }
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

  useEffect(() => {
    const lastUpdatedDate = new Date(user?.lastActivityDate || 0);
    const today = new Date();
    if (lastUpdatedDate.toDateString() !== today.toDateString()) {
      mutateStreak();
    }
  }, [user, mutateStreak]);

  console.log(RoadMapMath?.mathRoadmap.roadmap[0])
  const roadmapContent = useMemo(() => {
    if (!RoadMapMath?.mathRoadmap?.roadmap) return null;
    return RoadMapMath.mathRoadmap.roadmap.map((section, index) => (
      <div key={index}>
        <UnitSection Unit={section.unit} UnitName={section.section} />
        {section.lessons.map((lesson, lessonIndex) => (
          <UnitButton 
            locked={lesson.locked}
            isCurrent={lesson.isCurrent}
            maxValue={lesson.xp}
            finished={lesson.finished}
            xp={lesson.xpGained}
            key={lessonIndex} 
            index={lessonIndex} 
            totalCount={section.lessons.length} 
            onClick={() => handleLessonClick({ roadmapId: RoadMapMath.mathRoadmap._id, sectionIndex: index, lessonIndex, xp: lesson.xp, questionType: section.questionType, locked: lesson.locked, lessonContent: lesson.lessonContent})} 
          />
        ))}
      </div>
    ));
  }, [RoadMapMath]);

  if (isLoadingMath) return <Loading />

  if (isErrorMath) {
    toast.error('An error occurred while loading the lesson. Please try again.');
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickySideBar>
        <section className="flex flex-col gap-y-4 p-4">
          <UserSideBar title="Daily quest" dailyGoal={20} xp={user?.todaysXp || 0} />
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
