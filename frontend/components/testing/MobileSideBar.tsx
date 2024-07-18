import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Menu } from 'lucide-react'
import SideBar from './SideBar'
type Props = {}

export default function MobileSideBar({}: Props) {
  return (
    <Sheet>
        <SheetTrigger>
            <Menu className='text-white'/>
        </SheetTrigger>
        <SheetContent className='p-0 z-[100] w-fit' side={'left'}>
            <SideBar userProfLink={''} className='flex'/>
        </SheetContent>
    </Sheet>
  )
}