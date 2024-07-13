'use client'
import RegistrationForm from '@/components/auth/RegistrationForms'
import React from 'react'

type Props = {}

export default function Register({}: Props) {
  return (
    <div className='flex justify-center items-center h-screen'>
        <RegistrationForm onSubmit={() => console.log('register') }/>
    </div>
  )
}