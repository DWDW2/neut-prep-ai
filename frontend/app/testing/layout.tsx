import MobileHeader from '@/components/MobileHeader'
import SideBar from '@/components/testing/SideBar'
import React, { Suspense } from 'react'
import loading from './loading'
type Props = {
    children: React.ReactNode
}

export default function layout({children}: Props) {
  return (
    <>

        <MobileHeader />
        <SideBar className='hidden lg:flex' userProfLink='/user-profile'/>
        <div className='lg:pl-[256px] h-full pt-[50px] lg:pt-[0px]'>
            <div className='h-full'>
                {children}
            </div>
        </div>
    </>
  )
}