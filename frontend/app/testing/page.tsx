'use client'
import React, { useEffect, useState } from 'react'
import useCritical from '@/hooks/useCritical'
import { useCriticalResponseType } from '@/types/useCritical.types'
import Test from '@/components/testing/Test'
import Link from 'next/link'
import useMath from '@/hooks/useMath'

type Props = {}

export default function Testing({}: Props) {
    
 return (
  <>
    <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <Link href="" className="flex items-center ps-2.5 mb-5">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">NUET AI</span>
          </Link>
          <ul className="space-y-2 font-medium">
            <li>
                <Link href={'/testing/critical'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                  <span className="ms-3">Critical thinking</span>
                </Link>
            </li>
            <li>
                <Link href={'/testing/math'}  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <span className="flex-1 ms-3 whitespace-nowrap">Math</span>
                </Link>
            </li>
            <li>
                <Link href={'/testing/specific'}  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <span className="flex-1 ms-3 whitespace-nowrap">Practice specific questions</span>
                </Link>
            </li>
            
          </ul>
      </div>
    </aside>

    <div className="p-4 sm:ml-64">
      {/* there will be dashboard about user's progress and roadmap */}
    </div>
  </>
  )
}
