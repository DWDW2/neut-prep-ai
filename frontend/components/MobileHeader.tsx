import React from 'react'
import MobileSideBar from './testing/MobileSideBar'
import FooterNav from './testing/FooterNav'

type Props = {}

export default function MobileHeader({}: Props) {
  return (
    <nav className='lg:hidden px-6 border-b flex fixed items-center bg-yellow-400 h-[50px] top-0 w-full z-50'>
        <MobileSideBar />
    </nav>
  )
}