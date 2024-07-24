import { ArrowBigRight } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { RoadMap } from '@/app/constants'
import { Lesson, Roadmap } from '@/types/useRoadmap.types'
import Link from 'next/link'
type Props = {
 questionType: string;
 onClick: () => void; 
}


export default function TestButton({questionType, onClick}: Props) {
  return (
    <section className='bg-[#DCAF52] p-6 shadow-lg flex flex-col justify-between rounded-sm'>
      <div className='font-bold text-xl text-black'>
        {questionType}
      </div>
      <div className='bg-white font-bold text-black px-5 py-3 rounded-md w-fit hover:bg-slate-200' onClick={onClick}>
        Practice
      </div>
    </section>
  )
}