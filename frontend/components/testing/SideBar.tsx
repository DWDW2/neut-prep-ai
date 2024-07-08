import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
type Props = {
    className?: string
}

export default function SideBar({className}: Props) {
  return (
    <section className={cn('w-[256px] h-full bg-slate-500 lg:fixed left-0 top-0 border-r-2 flex-col', className)}>
        <div className='flex flex-row items-center justify-between w-[14%]'>
            <div className='h-fit w-fit'><Image src={'/drago.svg'} width={36} height={36} alt={'logo'}/></div>
            <div className="text-2xl  text-black font-extrabold">NUET AI</div>
        </div>
    </section>
  )
}