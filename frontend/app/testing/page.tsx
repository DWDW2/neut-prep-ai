'use client'
import React, { useEffect, useState } from 'react'
import { FaRegDotCircle } from "react-icons/fa";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import Link from 'next/link'
import Streak from '@/components/testing/dashboard/Streak';
import TestStatistics from '@/components/testing/dashboard/TestStatistics';
import Themes from '@/components/testing/dashboard/Themes';


type Props = {}

export default function Testing({}: Props) {
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
 return (
  <div className="min-h-screen flex flex-col">
  <div className="flex">
    <div className="w-1/4 p-4">
      <Streak initialStreak={5} lastLoginDate="2024-07-08" />
    </div>
    <div className="w-[40%] p-4 flex justify-end">
      <TestStatistics
        points={85}
        skills={skills}
        bestSkills={bestSkills}
        continueCourse={continueCourse}
      />
    </div>
  </div>
  <div className="p-4">
    <Themes performanceData={performanceData} />
  </div>
</div>
  )
}
