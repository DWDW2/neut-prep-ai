import React from 'react'
type Props = {}

export default function Loadingbut({}: Props) {
  return (
    <div className='flex flex-row space-x-2'>

          <span className='sr-only'>Loading...</span>
          <div className='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
          <div className='h-4 w-6 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
          <div className='h-4 w-4 bg-black rounded-full animate-bounce'></div>
    </div>
  )
}