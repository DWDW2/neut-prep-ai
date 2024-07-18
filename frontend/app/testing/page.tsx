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
import Loading from '@/components/Loading';
import useCourseApi from '@/hooks/useCourse';
import UserNotFound from '@/components/testing/UserNotFound';
import { useRouter } from 'next/navigation';


type Props = {}

export default function Testing({}: Props) {
  const router = useRouter()
  const {useGetUser} = useCourseApi()
  const {data:user, isLoading, isError} = useGetUser()
  const [visitDates, setVisitDates] = useState<Date[]>([]);
  // if(!user.tested){
  //   router.push('/check/experience')
  // }
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
    {
      user ? (
        <div className="flex flex-col m-4">
        <Themes performanceData={performanceData} />
        <TestStatistics
          points={85}
          skills={skills}
          bestSkills={bestSkills}
          continueCourse={continueCourse}
        />
    </div>
      ) : (
        <UserNotFound />
      )
    }
</div>
  )
}
