'use client'
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
    <div>page</div>
  )
}