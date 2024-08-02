import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {}

export default function FooterNav({}: Props) {
  const [showXp, setShowXp] = useState(false)
  const xpAmount = 1000; 

  return (
    <section className='lg:hidden sticky bottom-0 w-full z-50 bg-white h-[70px] border-t-2 border-slate-200'>
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
      </main>
    </section>
  )
}
