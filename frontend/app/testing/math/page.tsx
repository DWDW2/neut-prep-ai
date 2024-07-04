'use client'
import React, {useEffect} from 'react'
import useMath from '@/hooks/useMath'
import Test from '@/components/testing/Test'

type Props = {}

export default function Math({}: Props) {
  const {fetchMathData, mathData, mathDataAll, isLoading, error, getAllMathTests, mathUrl} = useMath()
  const handleAnswer = () => {
    return (answer: string) => {
        console.log(answer)
    }
}

const handleFetch = async () => {
    await fetchMathData()
    getAllMathTests()
}

useEffect(() => {
    getAllMathTests()
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
console.log(mathDataAll, mathUrl, mathData)
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
      {mathDataAll?.map((test, index) => (
        <Test id={test._id} key={index} path='math/'/>
      ))
      }
    </div>
  </main>
)
}