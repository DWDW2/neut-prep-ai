'use client'
import React from 'react'
import useCritical from '@/hooks/useCritical'
import { useCriticalResponseType } from '@/types/useCritical.types'
import QuestionList from '@/components/testing/Questions'
import Test from '@/components/testing/Test'
type Props = {}

export default function Testing({}: Props) {
    const {isLoading, fetchCriticalData, error, criticalData} = useCritical()
    const handleAnswer = () => {
        return (answer: string) => {
            console.log(answer)
        }
    }
    const handleFetch = () => {
        fetchCriticalData()
    }
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: ere</div>
    }
    console.log(criticalData)
  return (
    <main className='flex flex-row'>
      <div className='w-[20%] h-screen p-2 flex flex-col space-y-3'>
        <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400" onClick={handleFetch}>
          Generate test
        </button>
        <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400" onClick={handleFetch}>
          Previous tests
        </button>
        <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400" onClick={handleFetch}>
          Practice specific questions
        </button>
      </div>
      <Test />
    </main>
  )
}