import React from 'react'

type Props = {}

export default function Navbar({}: Props) {
  return (
    <div className='flex flex-row justify-between p-5'>
        <div className='flex flex-row space-x-10'>
            <div> 
                NUET AI
            </div>
            <ul className='flex flex-row space-x-5'>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
        <div> 
            Login
        </div>
    </div>
  )
}