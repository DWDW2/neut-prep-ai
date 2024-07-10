import TestButton from '@/components/specific/TestButton'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function SPecific({}: Props) {
  return (
    <section>
      <section className='text-center p-5 text-3xl font-bold'>
        Test your skills
      </section>
      <section className='p-5 grid grid-cols-3 gap-5'>
        <TestButton option='Test Button' />
        <TestButton option='Test Button' />
        <TestButton option='Test Button' />
        <TestButton option='Test Button' />
        <TestButton option='Test Button' />
        <TestButton option='Test Button' />
        <TestButton option='Test Button' />
      </section>
    </section>
  )
}