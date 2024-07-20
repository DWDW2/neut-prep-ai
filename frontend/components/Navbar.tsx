import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';
import SideNavbar from './SideNavbar';
interface Popa {
  icon: React.ComponentType;
  title: string;
  description: string;
}

const Header = () => {
  const session = useSession()
  console.log(session.status)
  return(
  <header className="flex justify-between items-center p-6 max-w-6xl mx-auto">
    <div className='flex flex-row items-center justify-between w-[14%] max-[800px]:w-[40%]'>
      <div className='h-fit w-fit'><Image src={'/drago.svg'} width={36} height={36} alt={'logo'}/></div>
      <div className="text-2xl  text-black font-extrabold">NUET AI</div>
    </div>
    <nav className="space-x-6 max-[800px]:hidden">
      <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
      <Link href="#features" className="text-gray-600 hover:text-gray-800">Features</Link>
      <Link href="#about" className="text-gray-600 hover:text-gray-800">About</Link>
    </nav>
      {session.status === 'authenticated' ? (
        <div className="text-gray-600 hover:text-gray-800 max-[800px]:hidden" onClick={() => signOut()}>Sign out</div>) :
        (<div className="text-gray-600 hover:text-gray-800 max-[800px]:hidden" onClick={() => signIn()}>Sign in</div>)
      }
    <div className='hidden max-[800px]:block'>
      <SideNavbar />
    </div>
  </header>
  );
}
export default Header

