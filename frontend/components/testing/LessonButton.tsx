import Image from 'next/image'
import React from 'react'

type Props = {
  onClick: () => void;
}

export default function LessonButton({onClick}: Props) {
  return (
    <div className={`w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center border-b-8 active:border-b-4 border-yellow-700`} onClick={onClick}>
        <Image src={'/testing/critical/star-rings-svgrepo-com.svg'} width={50} height={50} alt='star'/>
    </div>
  )
}   