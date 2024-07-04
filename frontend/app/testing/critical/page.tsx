'use client'
import Loading from '@/components/Loading'
import Test from '@/components/testing/Test'
import useCritical from '@/hooks/useCritical'
import React, {useEffect} from 'react'
import { RiAiGenerate } from "react-icons/ri";
import { FaRoad } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import Link from 'next/link'

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
    <main className='flex flex-row'>
      <div className='w-[30%] h-fit p-2 flex flex-col space-y-3 bg-slate-400'>
        <div className='font-bold text-white text-2xl ml-2'>Critical thinking</div>
        <div className='block max-w-sm p-6 bg-gray-800 border border-gray-100 rounded-lg shadow hover:bg-gray-600 '>
          <div className='flex flex-row items-center justify-between space-x-5 mb-10'>
            <RiAiGenerate color='white' size={60}/>
              <div>
                <h1 className='text-xl font-bold text-white'>Generate test</h1>
                <h3 className='text-sm text-gray-400'>Create unlimited nuet practice questions</h3>
              </div>
          </div>
          <div>
              <button className='px-6 py-4 bg-white rounded-lg' onClick={handleFetch}>
                Create
              </button>
          </div>
        </div>
        <div className='block max-w-sm p-6 bg-gray-800 border border-gray-100 rounded-lg shadow hover:bg-gray-600 '>
          <div className='flex flex-row items-center justify-between space-x-5 mb-10'>
          <FaRoad size={60} color='white'/>
              <div>
                <h1 className='text-xl font-bold text-white'>Roadmap</h1>
                <h3 className='text-sm text-gray-400'>Follow instructions from AI to achieve your goals</h3>
              </div>
          </div>
          <div>
          <Link href={'/testing/specific'}>
              <button className='px-6 py-4 bg-white rounded-lg'>
                View
              </button>
            </Link>
          </div>
        </div>
        <div className='block max-w-sm p-6 bg-gray-800 border border-gray-100 rounded-lg shadow hover:bg-gray-600 '>
          <div className='flex flex-row items-center justify-between space-x-5 mb-10'>
              <MdOutlineWork size={60} color='white'/>
              <div>
                <h1 className='text-xl font-bold text-white'>Practice</h1>
                <h3 className='text-sm text-gray-400'>Practice specific question types to enhance your knowledge</h3>
              </div>
          </div>
          <div>
            <Link href={'/testing/specific'}>
              <button className='px-6 py-4 bg-white rounded-lg'>
                Practice
              </button>
            </Link>
          </div>
        </div>
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