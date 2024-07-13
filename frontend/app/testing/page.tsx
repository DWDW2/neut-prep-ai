'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FaRegDotCircle } from "react-icons/fa";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import Link from 'next/link'
import Streak from '@/components/testing/dashboard/Streak';
import TestStatistics from '@/components/testing/dashboard/TestStatistics';
import Themes from '@/components/testing/dashboard/Themes';
import Calendar from '@/components/testing/dashboard/Calendar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

type Props = {}

export default function Testing({}: Props) {
  const {data:session} = useSession()
  const router = useRouter()
  const [visitDates, setVisitDates] = useState<Date[]>([]);

  // useEffect(() => {
  //   setVisitDates(visits);
  // }, []);

  useLayoutEffect(() => {
    if(!session){
      router.push('/login')
    }
  }, [router, session])
  if(!session){
    return <Loading />
  }
  const skills = [
    { name: 'Reading', points: 80 },
    { name: 'Writing', points: 70 },
    { name: 'Listening', points: 90 },
    { name: 'Speaking', points: 60 },
  ];
    
  const performanceData = [
    { name: 'Critical Thinking', score: 45 },
    { name: 'Math', score: 60 },
    { name: 'Reading Comprehension', score: 35 },
    { name: 'Writing', score: 75 }
  ];
  const bestSkills = skills.filter(skill => skill.points >= 70);
  
  const continueCourse = () => {
    alert('Continuing course...');
  };
  const visits = [
    new Date(2024, 6, 2),
    new Date(2024, 6, 5),
    new Date(2024, 6, 11),
    new Date(2024, 6, 18),
    new Date(2024, 6, 22)
  ];
 return (
  <div className="min-h-screen flex flex-col">
  <div className="flex lg:flex-row flex-col">
    <div className="w-full p-4 lg:w-1/2 mx-auto">
      <Themes performanceData={performanceData} />
      {/* <Calendar visitedDays={visitDates}/> */}
    </div>
    <div className="lg:w-[40%] w-full p-4">
      <TestStatistics
        points={85}
        skills={skills}
        bestSkills={bestSkills}
        continueCourse={continueCourse}
      />
    </div>
  </div>
</div>
  )
}
