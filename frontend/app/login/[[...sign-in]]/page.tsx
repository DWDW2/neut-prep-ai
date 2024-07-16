'use client'
import { SignIn } from "@clerk/nextjs"
type Props = {}

export default function Register({}: Props) {
  return (
    <div className='flex justify-center items-center h-screen'>
        <SignIn />
    </div>
  )
}