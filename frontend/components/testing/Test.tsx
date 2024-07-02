import React from 'react'
import QuestionList from './Questions'
import { data } from '@/data'
import Link  from 'next/link'
import useCritical from '@/hooks/useCritical'
type Props = {
  id: string
}

export default function Test({id}: Props) {
  const {fetchById, criticalData, criticalUrl } = useCritical()
  return (
    <Link href={`testing/${id}`} onClick={() => fetchById(id)} >
        <div className='p-2 w-4 h-2 bg-black text-white'>\
          {criticalUrl.id}
        </div>
    </Link>
  )
}