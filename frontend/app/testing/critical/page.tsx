'use client'
import FeedWrapper from "@/components/testing/Feed-sidebar"
import StickySideBar from "../../../components/testing/Sticky-sidebar"
import UserSideBar from "@/components/testing/XPgained"
import UserProgress from "@/components/testing/UserProgress"
import UnitButton from "@/components/testing/LessonButton"
import Unit from "@/components/testing/Unit"
import UnitSection from "@/components/testing/UnitSection"
import { useRoadmapQuery } from "@/hooks/useRoadmap"
import { useEffect, useState } from "react"
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@/components/ui/button"
import Loading from "@/components/Loading"
type Props = {}
interface handleLesson {
  activeLesson: boolean,
  isCurrent: boolean;
  isLoked: boolean;
  lessonId: string
}
export default function CriticalDetailed({}: Props) {
  const {useGenerateCriticalRoadmap} = useRoadmapQuery()
  const [isLessonActive, setLessonActive] = useState(false)
  const {data: CriticalRoadmap, isLoading, isError} = useGenerateCriticalRoadmap()
  const handleLessonClick = ({lessonId, isCurrent, isLoked, activeLesson}: handleLesson) => {
    setLessonActive(!activeLesson)
    
  }
  if(isLoading){
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
          <UserSideBar title="Daily quest" dailyGoal={100} xp={10}/>
          <UserProgress dailyGoal={100} xp={20}/>
        </section>
      </StickySideBar>
      <FeedWrapper>
        <section className="pt-6 gap-y-4 flex flex-col">
          {

            CriticalRoadmap?.roadmap.map((route, index) => {
              return(
                <div key={index}>
                  <UnitSection Unit={route.unit} UnitName={route.section}/>
                  <Unit data={CriticalRoadmap} onClick={handleLessonClick}/>
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