'use client'

import FeedWrapper from "@/components/testing/critical/Feed-sidebar"
import StickySideBar from "../../../components/testing/critical/Sticky-sidebar"
import UserSideBar from "@/components/testing/critical/XPgained"
import UserProgress from "@/components/testing/critical/UserProgress"
import UnitButton from "@/components/testing/critical/UnitButton"
import Unit from "@/components/testing/critical/Unit"

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
        <Unit />
      </FeedWrapper>
    </div>
  )
}