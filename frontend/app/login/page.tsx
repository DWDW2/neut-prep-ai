'use client'
import LoginForm from '@/components/auth/LoginForm'
import React from 'react'

type Props = {}

export default function Register({}: Props) {
  return (
    <div className='flex justify-center items-center h-screen'>
        <LoginForm onSubmit={() => console.log('sunmit')} />
    </div>
  )
}