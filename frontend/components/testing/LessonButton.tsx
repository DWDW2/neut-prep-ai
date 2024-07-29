import Image from 'next/image'
import React from 'react'
import 'react-circular-progressbar/dist/styles.css'
import {Button} from '../ui/button'
import { FaStar } from "react-icons/fa6";
import {CircularProgressbar, CircularProgressbarWithChildren} from 'react-circular-progressbar'
import { cn } from '@/lib/utils';
type Props = {
  totalCount: number;
  index: number;
  locked: boolean;
  xp:number;
  isCurrent: boolean;
  onClick: () => void;
}

export default function LessonButton({ onClick, index, totalCount, isCurrent, xp, locked }: Props) {
  const cycleLength = 8
  const cycleIndex = index % cycleLength

  let indentationLevel = 0

  if (cycleIndex <= 2) {
    indentationLevel = cycleIndex
  } else if (cycleIndex <= 4) {
    indentationLevel = 4 - cycleIndex
  } else if (cycleIndex <= 6) {
    indentationLevel = 4 - cycleIndex
  } else {
    indentationLevel = cycleIndex - 8
  }

  const rightPosition = indentationLevel * 40

  const isFirst = index === 0
  const isLast = index === totalCount - 1

  return (
    <div
      className="relative flex flex-col items-center"
      onClick={onClick}
      style={{
        right: `${rightPosition}px`,
        marginTop: isFirst ? 60 : 24,
      }}
    >
      {
        isCurrent ? (
          <div className='h-[102px] w-[102px] relative'> 
            <div className='absolute -top-6 left-2.5 px-3 py-2.5 font-bold uppercase border-2 bg-white rounded-xl animate-bounce tracking-wide z-10'>
              Start
              <div className='absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2 z-100' />
            </div>
            <CircularProgressbarWithChildren
              value={xp}
              styles={{
                path: {
                  stroke: "#DCAF52",
                  
                },
                trail:{
                  stroke: "e5e7eb"
                }
              }}
              className='z-0'
            >
              <Button 
                className="h-[70px] w-[70px] border-b-8"
                size={'rounded'}
                variant={locked ? 'locked' : 'lesson'}
              >
                <FaStar className={cn("h10 w-10", locked ? "fill-neutral-400 text-neutral-400 stroke-neutral-400" : "fill-white text-white stroke-white h-10 w-10")}/>
              </Button>
            </CircularProgressbarWithChildren>
          </div>
        ) : (
          <div className='h-[102px] w-[102px] relative'> 
            <Button 
                className="h-[70px] w-[70px] border-b-8"
                size={'rounded'}
                variant={locked ? 'locked' : 'lesson'}
              >
                <FaStar className={cn("h10 w-10", locked ? "fill-neutral-400 text-neutral-400 stroke-neutral-400" : "fill-white text-white stroke-white h-10 w-10")}/>
              </Button>
          </div>
        )
      }
    </div>
  )
}