'use client'
import React, { useEffect, useState } from 'react'
import useCritical from '@/hooks/useCritical'
import { useCriticalResponseType } from '@/types/useCritical.types'
import QuestionList from '@/components/testing/Questions'
import Test from '@/components/testing/Test'
type Props = {}

export default function Testing({}: Props) {
    const {isLoading, fetchCriticalData, error, criticalData, criticalUrl, getAllCriticalTests, criticalDataAll, ids, selectedTestId, setSelectedTestId} = useCritical()
     // State for selected test ID

    const handleAnswer = () => {
        return (answer: string) => {
            console.log(answer)
        }
    }

    const handleFetch = () => {
        fetchCriticalData()
    }
   // Add criticalDataAll as a dependency

    const handleTestClick = (id: string) => {
        setSelectedTestId(id) // Update selectedTestId when a button is clicked
    }

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: ere</div>
    }
    console.log(criticalData, criticalUrl, criticalDataAll)
  return (
    <main className='flex flex-row '>
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
        <ul>
            {ids.map(id => (
                <li key={id}>
                    <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400" onClick={() => handleTestClick(id)}>
                        {id}
                    </button>
                </li>
            ))}
        </ul>
      </div>
      {
        selectedTestId ? (<Test id={selectedTestId}/>) : (<></>) // Use selectedTestId to load Test
      }
    </main>
  )
}
