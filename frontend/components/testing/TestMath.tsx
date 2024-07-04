import React, { useEffect } from 'react'
import Link  from 'next/link'
import useMath from '@/hooks/useMath'
type Props = {
  id: string
}

export default function Test({id}: Props) {
  const {fetchById, mathUrl, mathData} = useMath()
 
  return (
    <Link href={`math/${id}`} onClick={() => fetchById(id)} >
        <div className='p-5 w-fit h-2 bg-black text-white pb-5'>
         {id}
        </div>
    </Link>
  )
}