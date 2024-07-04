import Link from 'next/link'
import React from 'react'

type Props = {}

export default function SPecific({}: Props) {
  return (
    <Link href={'/testing'}>
        <div className='flex flex-col items-center justify-center h-screen text-5xl '>
            Cooming soon...
        </div>
    </Link>
  )
}