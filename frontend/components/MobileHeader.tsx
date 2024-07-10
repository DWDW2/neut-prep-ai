import React from 'react'
import MobileSideBar from './testing/MobileSideBar'

type Props = {}

export default function MobileHeader({}: Props) {
  return (
    <nav className='lg:hidden px-6 border-b flex items-center bg-yellow-400 h-[50px] fixed top-0 w-full z-50'>
        <MobileSideBar />
    </nav>
  )
}