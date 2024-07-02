import React, { useEffect } from 'react'
import Link  from 'next/link'
import useCritical from '@/hooks/useCritical'
type Props = {
  id: string
}

export default function Test({id}: Props) {
  const {fetchById, criticalDataAll, criticalUrl} = useCritical()
 
  return (
    <Link href={`testing/${id}`} onClick={() => fetchById(id)} >
        <div className='p-5 w-fit h-2 bg-black text-white pb-5'>
         {id}
        </div>
    </Link>
  )
}