'use client'
import React, { useEffect, useState } from 'react'
import { FaRegDotCircle } from "react-icons/fa";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import Link from 'next/link'


type Props = {}

export default function Testing({}: Props) {
    
 return (
  <>
    <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-[#DCAF52]">
          <Link href="" className="flex items-center ps-2.5 mb-5">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-black">NUET AI</span>
          </Link>
          <ul className="space-y-2 font-medium">
            <li>
                <Link href={'/testing/critical'} className="flex items-center p-2  rounded-lg text-black hover:text-slate-700">
                  <div className='flex flex-row justify-between items-center'>
                    <FaRegDotCircle />
                    <span className="ms-3">Critical thinking</span>
                  </div>
                </Link>
            </li>
            <li>
                <Link href={'/testing/math'}  className="flex items-center p-2  rounded-lg text-black  hover:text-slate-700">
                <div className='flex flex-row justify-between items-center'>
                    <FaRegDotCircle />
                    <span className="ms-3">Math</span>
                  </div>
                </Link>
            </li>
            <li>
                <Link href={'/testing/specific'}  className="flex items-center p-2  rounded-lg text-black  hover:text-slate-700">
                <div className='flex flex-row justify-between items-center'>
                    <FaRegDotCircle />
                    <span className="ms-3">Practice questions</span>
                  </div>
                </Link>
            </li>
            <li>
                <Link href={'/'}  className="flex items-center p-2  rounded-lg text-black  hover:text-slate-900">
                <div className='flex flex-row justify-between items-center'>
                    <FaRegArrowAltCircleLeft />
                    <span className="ms-3 font-semibold">Go back</span>
                  </div>
                </Link>
            </li>
          </ul>
      </div>
    </aside>
    

    <div className="p-4 sm:ml-64">
      {/* result component */}
      {/* statistics */}
      {/* plan */}
    </div>
  </>
  )
}
