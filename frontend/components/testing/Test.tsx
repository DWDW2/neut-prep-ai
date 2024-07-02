import React from 'react'
import QuestionList from './Questions'
import { data } from '@/data'
import Link  from 'next/link'
type Props = {
 
}

export default function Test({}: Props) {
  return (
    <Link href={`testing/${data[0].id}`}>
        Test 1
    </Link>
  )
}