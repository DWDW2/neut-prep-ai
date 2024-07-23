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
      <Link href={href} className={isActive ? 'font-bold text-black border-sky-500 border-2 bg-sky-100/90 flex flex-row justify-start gap-2 items-center w-[248px] h-[54px] pl-4 rounded-xl' : 'font-bold flex flex-row justify-start gap-2 items-center w-[248px] h-[54px] pl-4'}>
            <Image src={imageSrc} alt={imageAlt} width={32} height={32} /> 
            <div>
              {text}
            </div>
      </Link>
  )
}