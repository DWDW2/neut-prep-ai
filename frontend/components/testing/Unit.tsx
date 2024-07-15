import React from 'react'
import UnitButton from './UnitButton'
import { Roadmap } from '@/types/useRoadmap.types'

type Props = {
  data?: Roadmap | Roadmap[] | null
}

export default function Unit({data}: Props) {
  
  return (
    <section className='flex flex-col items-center gap-4'>
        <UnitButton place={0}/>
        <UnitButton place={1}/>
        <UnitButton place={5}/>
        <UnitButton place={7}/>
        <UnitButton place={9}/>
        <UnitButton place={10}/>
    </section>
  )
}