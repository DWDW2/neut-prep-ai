'use client'
import React from 'react'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
type Props = {
    href: string,
    text: string,
    imageSrc: string,
    imageAlt: string
}

export default function SideBarItem({href, text, imageAlt, imageSrc}: Props) {
    const pathname = usePathname()
    const isActive = pathname === href
  return (
      <Link href={href}>
        <Button size={'lg'} variant={isActive ? 'sidebarOutline' : 'sidebar'} className='flex items-center gap-2 w-[248px] justify-start'>
            <Image src={imageSrc} alt={imageAlt} width={32} height={32} /> 
            {text}
        </Button>
      </Link>
  )
}