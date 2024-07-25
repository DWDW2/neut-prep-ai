import Image from 'next/image'
import React from 'react'
import 'react-circular-progressbar/dist/styles.css'

type Props = {
  totalCount: number;
  index: number;
  onClick: () => void;
}

export default function LessonButton({ onClick, index, totalCount }: Props) {
  const cycleLength = 8
  const cycleIndex = index % cycleLength

  let indentationLevel = 0

  if (cycleIndex <= 2) {
    indentationLevel = cycleIndex
  } else if (cycleIndex <= 4) {
    indentationLevel = 4 - cycleIndex
  } else if (cycleIndex <= 6) {
    indentationLevel = 4 - cycleIndex
  } else {
    indentationLevel = cycleIndex - 8
  }

  const rightPosition = indentationLevel * 40

  const isFirst = index === 0
  const isLast = index === totalCount - 1

  return (
    <div
      className="relative flex flex-col items-center"
      onClick={onClick}
      style={{
        right: `${rightPosition}px`,
        marginTop: isFirst ? 60 : 24,
      }}
    >
      <div className="relative rounded-full bg-yellow-500 p-2 border-b-8 border-yellow-600 transition-transform duration-150 ease-in-out active:translate-y-1 active:border-b-4">
        <Image
          src={'/testing/critical/star-rings-svgrepo-com.svg'}
          width={60}
          height={60}
          alt="star"
        />
      </div>
    </div>
  )
}