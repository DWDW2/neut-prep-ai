import Image from 'next/image'
import React from 'react'
import { Crown } from 'lucide-react'
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
type Props = {
  totalCount: number;
  index: number;
  onClick: () => void;
}

export default function LessonButton({onClick, index, totalCount}: Props) {
  const cyclelenght = 8
  const cycleIndex = index % cyclelenght

  let indendationLevel = 0

  if(cycleIndex <= 2){
    indendationLevel = cycleIndex
  }else if(cycleIndex <= 4){
    indendationLevel = 4 - cycleIndex 
  }else if(cycleIndex <= 6){
    indendationLevel = 4 - cycleIndex
  } else {
    indendationLevel = cycleIndex - 8
  }

  const rightPosition = indendationLevel * 40

  const isFirst = index === 0;
  const isLast = index === totalCount
  return (
    <div className={`relative flex flex-col items-center`} onClick={onClick} style={
      {
        right: `${rightPosition}px`,
        marginTop: isFirst ? 60 : 24
      }
    }>
        <Image src={'/testing/critical/star-rings-svgrepo-com.svg'} className='rounded-full bg-yellow-500 p-2 border-b-8 active:border-b-4 border-yellow-600' width={80} height={80} alt='star'/>
    </div>
  )
}   