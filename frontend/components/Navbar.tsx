import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { SignInButton, SignedIn, SignedOut, UserButton, SignOutButton } from '@clerk/nextjs'
interface Popa {
  icon: React.ComponentType;
  title: string;
  description: string;
}

const Header = () => (
  <header className="flex justify-between items-center p-6 max-w-6xl mx-auto">
    <div className='flex flex-row items-center justify-between w-[14%] max-[800px]:w-[20%]'>
      <div className='h-fit w-fit max-[800px]:w-4 max-[800px]:h-4'><Image src={'/drago.svg'} width={36} height={36} alt={'logo'}/></div>
      <div className="text-2xl  text-black font-extrabold">NUET AI</div>
    </div>
    <nav className="space-x-6">
      <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
      <Link href="#features" className="text-gray-600 hover:text-gray-800">Features</Link>
      <Link href="#about" className="text-gray-600 hover:text-gray-800">About</Link>
    </nav>
    <SignedIn>
      <SignOutButton>
        <div className="text-gray-600 hover:text-gray-800">Sign out</div>
      </SignOutButton>
    </SignedIn>
    <SignedOut>
      <SignInButton>
        <div className="text-gray-600 hover:text-gray-800">Sign in</div>
      </SignInButton>
    </SignedOut>
  </header>
);

export default Header

