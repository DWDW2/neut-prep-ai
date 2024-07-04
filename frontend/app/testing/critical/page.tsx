'use client'
import Test from '@/components/testing/Test'
import useCritical from '@/hooks/useCritical'
import React, {useEffect} from 'react'

type Props = {}

export default function CriticalDetailed({}: Props) {
  const {isLoading, fetchCriticalData, error, criticalData, criticalUrl, getAllCriticalTests, criticalDataAll} = useCritical()

  const handleAnswer = () => {
      return (answer: string) => {
          console.log(answer)
      }
  }

  const handleFetch = async () => {
      await fetchCriticalData()
      getAllCriticalTests()
  }

  useEffect(() => {
      getAllCriticalTests()
  }, []) 


  if (isLoading) {
      return(
        <div>
          loading
        </div>
      )
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

      </div>
      <div className='w-[80%] h-screen p-2 flex flex-col space-y-3'>
        {criticalDataAll?.map((test, index) => (
          <Test id={test._id} key={index} />
        ))
        }
      </div>
    </main>
  )
}