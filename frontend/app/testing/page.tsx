'use client'
import React from 'react'
import useCritical from '@/hooks/useCritical'
import { useCriticalResponseType } from '@/types/useCritical.types'
type Props = {}

export default function Testing({}: Props) {
    const {isLoading, fetchCriticalData, error, criticalData} = useCritical()
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
    <main>
      <div className='w-[30%] h-screen p-10 flex flex-col'>
        <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400" onClick={handleFetch}>
          Generate test
        </button>
      </div>
    </main>
  )
}