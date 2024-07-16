'use client'
import FeedWrapper from "@/components/testing/Feed-sidebar"
import StickySideBar from "../../../components/testing/Sticky-sidebar"
import UserSideBar from "@/components/testing/XPgained"
import UserProgress from "@/components/testing/UserProgress"
import UnitButton from "@/components/testing/UnitButton"
import Unit from "@/components/testing/Unit"
import UnitSection from "@/components/testing/UnitSection"
import useRoadmapApi from "@/hooks/useRoadmap"
import { useEffect, useState } from "react"
import Loading from "@/components/Loading"
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from "@clerk/nextjs"
import axiosInstance from "@/axiosInstance"
import { Button } from "@/components/ui/button"
type Props = {}

export default function CriticalDetailed({}: Props) {
  const {generateCriticalRoadmap, isLoading, error} = useRoadmapApi()
  useSession().session?.getToken().then((res) => {
    axiosInstance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${res}`
      console.log('finished')
      return config
    })
  })
  const handleClick = async() => {
    await generateCriticalRoadmap()
  } 
  if(isLoading){
    return(
      <Loading/>
    )
  }

  if(error){
    return(
      <div>Error</div>
    )
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickySideBar>
        <section className="flex flex-col gap-y-4 p-4">
          <UserSideBar title="Daily quest" dailyGoal={100} xp={10}/>
          <Button variant={'primary'} onClick={() => handleClick()}>Generate</Button>
          <UserProgress dailyGoal={100} xp={20}/>
        </section>
      </StickySideBar>
      <FeedWrapper>
        <section className="pt-6 gap-y-4 flex flex-col">
          <UnitSection UnitName="Getting strted with nuet" Unit="1 section, 1 unit"/>
          <Unit/>
        </section>
      </FeedWrapper>
      <ToastContainer/>
    </div>
  )
}