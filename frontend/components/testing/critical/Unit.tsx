import React from 'react'
import UnitButton from './UnitButton'

type Props = {}

export default function Unit({}: Props) {
  return (
    <section className='flex flex-col items-center gap-4 mr-'>
        <UnitButton place={0}/>
        <UnitButton place={1}/>
        <UnitButton place={5}/>
        <UnitButton place={7}/>
        <UnitButton place={9}/>
        <UnitButton place={10}/>
    </section>
  )
}