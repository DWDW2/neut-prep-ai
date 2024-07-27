'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Button } from '../ui/button';
import { FaGoogle } from 'react-icons/fa';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {data: screen} = useSession()
  console.log(screen?.accessToken)
  console.log(screen)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: '/'
    });
    if (result?.error) {
      console.error('Authentication failed:', result.error);
    } else {
      console.log('Authentication successful:', result);
    }
  };

  return (
    <section className="bg-gray-100 h-full"> {/* Light gray background */}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0"> {/* White form container */}
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className='flex flex-row gap-2'>
                <Image src={'/drago.svg'} width={30} height={30} alt='image' />
                <h1 className="text-xl">NUET AI</h1>
            </div>
            
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5 w-full">
                  <Button variant={'sidebarOutline'} className='w-full flex flex-row gap-3 font-normal' onClick={ () => { const result = signIn('google', {callbackUrl: '/'}) }}>
                    <FaGoogle />Sign In with Google
                  </Button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500">
                Dont have an account?{' '}
                <Link
                  href={'/register'}
                  className="font-medium text-primary-600 hover:underline"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;

