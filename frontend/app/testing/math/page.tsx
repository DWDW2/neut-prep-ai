'use client'

import FeedWrapper from "@/components/testing/Feed-sidebar"
import StickySideBar from "../../../components/testing/Sticky-sidebar"
import UserSideBar from "@/components/testing/XPgained"
import UserProgress from "@/components/testing/UserProgress"
import UnitButton from "@/components/testing/LessonButton"
import Unit from "@/components/testing/Unit"
import UnitSection from "@/components/testing/UnitSection"

type Props = {}

export default function CriticalDetailed({}: Props) {
  
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickySideBar>
        <UserSideBar title="Daily quest" dailyGoal={100} xp={10}/>
        <section className="flex flex-col gap-y-4 p-4">
          <UserProgress dailyGoal={100} xp={20}/>
        </section>
      </StickySideBar>
      <FeedWrapper>
        <section className="pt-6 gap-y-4 flex flex-col">
          <UnitSection UnitName="Getting strted with nuet" Unit="1 section, 1 unit"/>
          <Unit />
        </section>
      </FeedWrapper>
    </div>
  )
}