import React from 'react'
import useMath from '@/hooks/useMath'
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link';
type Props = {
  id: string,
  path: string
}

export default function Test({id, path}: Props) {
  const {fetchById} = useMath()
  
  return (
    <Link href={path + id} onClick={() => fetchById(id)}>
      <div className='flex flex-row p-4 bg-gray-200 rounded-md justify-between items-center'>
        <div>
          <div className='text-xl font-bold'>Nuet test</div>
          <div className='text-sm text-gray-500'>{id}</div>
        </div>
        <FaArrowRight size={30}/>
      </div>
    </Link>
  )
}