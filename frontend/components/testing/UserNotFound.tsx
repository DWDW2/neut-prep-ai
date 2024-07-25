import Image from 'next/image'
import React from 'react'

type Props = {
    username: string;

}

export default function HeroTesting({username}: Props) {
  return (
    <section className='flex flex-col justify-center items-center my-auto'>
        <div className='flex flex-row gap-10 items-center'>
            <div className='flex flex-col items-start'>
                <h1 className='font-bold lg:text-6xl text-3xl'>
                    Hello, {username}!
                </h1>
                <h3 className='text-gray-600 lg:text-2xl text-xl'>
                    try unlimited practice right now!
                </h3>
            </div>
            <Image src={'/testing/people-unknown-svgrepo-com.svg'} width={150} height={150} className='max-[800px]:w-20' alt='user not found' />
        </div>
    </section>
  )
}
