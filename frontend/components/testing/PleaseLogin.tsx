import React from 'react'
import { IoLogInOutline } from "react-icons/io5";

type Props = {}

export default function PleaseLogin({}: Props) {
  return (
    <div className='flex flex-col items-center justify-center max-[800px]:mt-[50%] mt-[20%]'>
        <div className='flex flex-row items-center justify-center gap-3'>
            <IoLogInOutline className='max-[800px]:w-32 max-[800px]:h-32 w-52 h-52'/> 
            <div className='font-bold text-2xl max-[800px]:text-xl'>
                Please, register or login to access full features of the application!
            </div>
        </div>
    </div>
  )
}