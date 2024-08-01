'use client'
import { usePathname } from 'next/navigation'
import MobileHeader from '@/components/MobileHeader'
import FooterNav from '@/components/testing/FooterNav'
import SideBar from '@/components/testing/SideBar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function Layout({children}: Props) {
  const pathname = usePathname()
  const shouldHideFooterNav = () => {
    if (pathname.startsWith('/testing/app/math') || pathname.startsWith('/testing/app/critical')) {
      const segments = pathname.split('/')
      return segments.length > 4
    }
    return false
  }

  return (
    <>
        <MobileHeader />
        <SideBar className='hidden lg:flex' />
        <div className='lg:pl-[256px] h-full pt-[50px] lg:pt-[0px]'>
            <div className='h-full'>
                {children}
            </div>
        </div>
        {!shouldHideFooterNav() && <FooterNav />}
    </>
  )
}
