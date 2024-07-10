import { ArrowBigRight } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

type Props = 
{
    option: string
}


export default function TestButton({option}: Props) {
  return (
    <section className='bg-yellow-500 border-b-8 active:border-b-2 border-2 border-yellow-700 p-4 flex flex-col rounded-2xl w-64 justify-between text-wrap'>
        <h1 className='font-bold text-2xl'>
            {option}
        </h1>
        <Button variant={'sidebarOutline'} size={'lg'} >
            Test skills
        </Button>
    </section>
  )
}