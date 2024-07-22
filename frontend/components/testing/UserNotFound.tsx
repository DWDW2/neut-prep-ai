import Image from 'next/image'
import React from 'react'

type Props = {}

export default function UserNotFound({}: Props) {
  return (
    <section className='flex flex-col justify-center items-center my-auto'>
        <div className='flex flex-row gap-10 items-center'>
            <div className='flex flex-col items-start'>
                <h1 className='font-bold text-6xl'>
                    Start practising 
                </h1>
                <h3 className='text-gray-600 text-2xl'>
                    try unlimited practice right now!
                </h3>
            </div>
            <Image src={'/testing/people-unknown-svgrepo-com.svg'} width={150} height={150} alt='user not found' />
        </div>
    </section>
  )
}
