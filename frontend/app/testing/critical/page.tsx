'use client'
import Loading from '@/components/Loading'
import Test from '@/components/testing/Test'
import useCritical from '@/hooks/useCritical'
import React, {useEffect} from 'react'

type Props = {}

export default function CriticalDetailed({}: Props) {
  const {isLoading, fetchCriticalData, error, criticalData, criticalUrl, getAllCriticalTests, criticalDataAll} = useCritical()

  const handleFetch = async () => {
      await fetchCriticalData()
      getAllCriticalTests()
  }

  useEffect(() => {
      getAllCriticalTests()
  }, []) 


  if (isLoading) {
      return(
        <Loading />
      )
  }
  if (error) {
      return <div>Error: ere</div>
  }
  console.log(criticalData, criticalUrl, criticalDataAll)
  return (
    <main className='flex flex-row '>
      <div className='w-[20%] h-screen p-2 flex flex-col space-y-3 bg-slate-200'>
        <div>NUET AI</div>
        <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400" onClick={handleFetch}>
          Generate test
        </button>

      </div>
      <div className='w-[80%] h-screen p-2 flex flex-col space-y-3'>
        {criticalDataAll?.map((test, index) => (
          <Test id={test._id} key={index} path='critical/' />
        ))
        }
      </div>
    </main>
  )
}