import MobileHeader from '@/components/MobileHeader'
import SideBar from '@/components/testing/SideBar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function layout({children}: Props) {
  return (
    <main className='flex flex-row'>
        <MobileHeader />
        <SideBar className='hidden lg:flex'/>
        <div className='lg:pl-[256px] h-full pt-[50px] lg:pt-[0px]'>
            <div className='h-full'>
                {children}
            </div>
        </div>
    </main>
  )
}