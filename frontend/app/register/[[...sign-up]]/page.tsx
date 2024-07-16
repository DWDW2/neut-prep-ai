'use client'
import { SignUp } from "@clerk/nextjs"

type Props = {}

export default function Register({}: Props) {
  return (
    <div className='flex justify-center items-center h-screen'>
        <SignUp/>
    </div>
  )
}