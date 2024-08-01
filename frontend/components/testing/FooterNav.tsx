import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {}

export default function FooterNav({}: Props) {
  const [showXp, setShowXp] = useState(false)
  const xpAmount = 1000; 

  return (
    <section className='lg:hidden fixed bottom-0 w-full z-50 bg-white h-[70px] border-t-2 border-slate-200'>
      <main className='flex flex-row justify-around items-center h-full'>
        <div className='relative m-1'>
          <Link href={'/testing/app'} >
            <Image
              src={'/analytics-svgrepo-com.svg'}
              alt='Analytics'
              width={35}
              height={35}
              className='transition-transform duration-300 transform hover:scale-110'
            />
          </Link>
        </div>
        <div className='relative m-1'>
          <Link href={'/testing/app/math'} >
            <Image  
              src={'/testing/calculator.svg'}
              alt='Critical'
              width={35}
              height={35}
              className='transition-transform duration-300 transform hover:scale-110'
            />
          </Link>
        </div>
        <div className='relative m-1'>
          <Link href={'/testing/app/critical'} >
            <Image
              src={'/testing/pizza-slice.svg'}
              alt='Math'
              width={35}
              height={35}
              className='transition-transform duration-300 transform hover:scale-110'
            />
          </Link>
        </div>
        {/* <div className='relative m-1'>
          <Link href={'/testing/app/specific'} >
            <Image
              src={'/testing/archery-focus-goal-svgrepo-com.svg'}
              alt='Specific'
              width={35}
              height={35}
              className='transition-transform duration-300 transform hover:scale-110'
            />
          </Link>
        </div> */}
        <div className='relative m-1'>
          <Link href={'/testing/app/leaderboard'} >
            <Image
              src={'/testing/crown-svgrepo-com.svg'}
              alt='Leaderboard'
              width={35}
              height={35}
              className='transition-transform duration-300 transform hover:scale-110'
            />
          </Link>
        </div>
        <div className='fixed bottom-16 right-4 z-50'>
          <button
            onClick={() => setShowXp(!showXp)}
            className='bg-blue-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center'
          >
            <span className='font-bold text-xl'>XP</span>
          </button>
          {showXp && (
            <div className='absolute bottom-12 right-0 bg-white border border-gray-300 shadow-lg rounded-lg p-3'>
              <p className='text-lg font-semibold'>XP: {xpAmount}</p>
            </div>
          )}
        </div>
      </main>
    </section>
  )
}
