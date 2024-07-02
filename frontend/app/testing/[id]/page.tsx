'use client'
import QuestionList from '@/components/testing/Questions'
import { data } from '@/data'
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

  return (
    <div>
        <QuestionList questions={data} handleAnswer={handleAnswer}/>
    </div>
  )
}