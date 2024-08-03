import LoginForm from '@/components/auth/LoginForm'
import React from 'react'

type Props = {}

export default function Login({}: Props) {
  return (
    <div className='items-center justify-center h-full  bg-gray-100 w-full mx-auto max-[800px]:mt-[50%]'>
      <LoginForm />
    </div>
    )
}