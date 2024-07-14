'use client'
import MobileHeader from '@/components/MobileHeader'
import SideBar from '@/components/testing/SideBar'
import React, { Suspense } from 'react'
import loading from './loading'
import { useSession } from '@clerk/nextjs'
import Loading from '@/components/Loading'
type Props = {
    children: React.ReactNode
}

export default function layout({children}: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { session } = useSession()
  if (!session) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Loading />
      </Suspense>
    )
  }
  return (
    <>

        <MobileHeader />
        <SideBar className='hidden lg:flex' userProfLink={`/profile/${session.user.id}`} userProfImage={session.user.imageUrl} />
        <div className='lg:pl-[256px] h-full pt-[50px] lg:pt-[0px]'>
            <div className='h-full'>
                {children}
            </div>
        </div>
    </>
  )
}