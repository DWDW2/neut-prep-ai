'use client'
import React, { useEffect, useState } from 'react'
import { FaRegDotCircle } from "react-icons/fa";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import Link from 'next/link'
import Streak from '@/components/testing/dashboard/Streak';
import TestStatistics from '@/components/testing/dashboard/TestStatistics';
import Themes from '@/components/testing/dashboard/Themes';
import { PieChartComponent } from '@/components/testing/dashboard/PieChart';
import { ChartConfig } from '@/components/ui/chart';


type Props = {}

export default function Testing({}: Props) {
  const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
  ]
  
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig
    
  const performanceData = [
    { name: 'Critical Thinking', score: 45 },
    { name: 'Math', score: 60 },
    { name: 'Reading Comprehension', score: 35 },
    { name: 'Writing', score: 75 }
  ];
  
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
      {/* <TestStatistics
        points={85}
        skills={skills}
        bestSkills={bestSkills}
        continueCourse={continueCourse}
      /> */}
    </div>
  </div>
  <PieChartComponent chartData={chartData} chartConfig={chartConfig} title='sdsadad' description='dsadsasd' nameKey='browser' dataKey='visitors' text='peeppp'/>
  <div className="p-4">
    <Themes performanceData={performanceData} />
  </div>
</div>
  )
}
