'use client'
import MobileHeader from '@/components/MobileHeader'
import SideBar from '@/components/testing/SideBar'
import React, { Suspense } from 'react'
import loading from './loading'
import Loading from '@/components/Loading'
import FooterNav from '@/components/testing/FooterNav'
import { useSession } from 'next-auth/react'
type Props = {
    children: React.ReactNode
}

export default function layout({children}: Props) {
  
  return (
    <>
        <MobileHeader />
        <SideBar className='hidden lg:flex' />
        <div className='lg:pl-[256px] h-full pt-[50px] lg:pt-[0px]'>
            <div className='h-full'>
                {children}
            </div>
        </div>
        <FooterNav />
    </>
  )
}