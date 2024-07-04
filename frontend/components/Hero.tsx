import React from 'react'
import Button from './ui/Button'
import Link from 'next/link'

type Props = {}

export default function Hero({}: Props) {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='flex flex-col items-center'>
            <h1 className='text-5xl font-bold'>NUET AI</h1><br />
            <h2 className='text-5xl font-bold text-center text-[#D48C00] mb-6'>YOUR WAY TO BEST UNIVERSITIES IN KAZAKHSTAN</h2>
            <Link href='/testing'>
                <Button placeholder='Get Started'/>
            </Link>
        </div>
    </div>
  )
}