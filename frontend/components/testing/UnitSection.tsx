import React from 'react'

type Props = {
    UnitName:string;
    Unit: string;
}

export default function UnitSection({UnitName, Unit}: Props) {
  return (
    <section className='bg-yellow-400 p-5 px-10 rounded-2xl border-b-8 border-yellow-500'>
        <p className='text-white text font-bold'>
            {Unit}
        </p>
        <h1 className='text-2xl font-bold text-white'>
            {UnitName}
        </h1>
    </section>
  )
}