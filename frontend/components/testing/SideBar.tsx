import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import SideBarItem from './SideBarItem'
type Props = {
    className?: string
    userProfImage?: string
    userProfLink: string
}

export default function SideBar({className, userProfImage, userProfLink}: Props) {
  return (
    <section className={cn('w-[256px] h-full bg-white lg:fixed left-0 top-0 border-r-2 border-slate-300 flex-col justify-between', className)}>
        <div>
            <Link href={'/'}>
                <div className='flex flex-row items-center p-10'>
                    <div className='h-fit w-fit'><Image src={'/drago.svg'} width={36} height={36} alt={'logo'}/></div>
                    <div className="text-2xl text-black font-extrabold ml-4">NUET AI</div>
                </div>
            </Link>
            <main className='flex flex-col items-center justify-center gap-4'>
                <SideBarItem href='/testing/critical' text='Critical thinking tests' imageAlt='image' imageSrc='/testing/pizza-slice.svg'/>
                <SideBarItem href='/testing/math' text='Math tests' imageAlt='image' imageSrc='/testing/calculator.svg'/>
                <SideBarItem href='/testing/specific' text='Practice questions' imageAlt='image' imageSrc='/testing/archery-focus-goal-svgrepo-com.svg'/>
                <SideBarItem href='/leaderboard' text='Leaderboard' imageAlt='image' imageSrc='/testing/crown-svgrepo-com.svg'/>
            </main>
        </div>
        <div className='w-full pb-5 pl-5'>
            <div>
                <Link href={userProfLink} className='flex flex-row items-center'>
                    <Image src={userProfImage ? userProfImage : '/empt.png'} width={36} height={36} alt='user profile' className='rounded-full'/>
                    <h1 className='text-black font-bold text-center ml-2'>PROFILE</h1>
                </Link>
            </div>
        </div>
    </section>
  )
}