import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function FooterNav({}: Props) {
  return (
    <section className='lg:hidden fixed bottom-0 w-full z-50 bg-white h-[50px] border-t-2 border-slate-200 mt-10'>
      <main className='flex flex-row justify-around space-x-2'>
        <div className='m-1'>
          <Link href={'/testing'} >
            <Image src={'/analytics-svgrepo-com.svg'} alt='image' className=''width={35} height={35}/>
          </Link>
        </div>
        <div className='m-1'>
          <Link href={'/testing/critical'} >
            <Image src={'/testing/calculator.svg'} alt='image' className='' width={35} height={35}/>
          </Link>
        </div>
        <div className='m-1'>
          <Link href={'/testing/math'} >
            <Image src={'/testing/pizza-slice.svg'} alt='image' className='' width={35} height={35}/>
          </Link>
        </div>
        <div className='m-1'>
          <Link href={'/testing/specific'} >
            <Image src={'/testing/archery-focus-goal-svgrepo-com.svg'} alt='image' className='' width={35} height={35}/>
          </Link>
        </div>
        <div className='m-1'>
          <Link href={'/testing/leaderboard'} >
            <Image src={'/testing/crown-svgrepo-com.svg'} alt='image' className='' width={35} height={35}/>
          </Link>
        </div>
      </main>
    </section>
  )
}