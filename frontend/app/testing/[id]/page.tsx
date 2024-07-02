'use client'
import QuestionList from '@/components/testing/Questions'
import { data } from '@/data'
import useCritical from '@/hooks/useCritical'
import React from 'react'

type Props = {
    params:{
        id: string
    }
}

export default function TestID({}: Props) {
    function handleAnswer(answer: string): void {
        throw new Error('Function not implemented.')
    }
    const {fetchById, isLoading, error, criticalData} = useCritical()
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }
    
  return (
    <div>
        <QuestionList questions={data} handleAnswer={handleAnswer}/>
    </div>
  )
}