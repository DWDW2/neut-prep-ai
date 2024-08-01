'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import { FaGoogle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import BASE_URL from '@/lib/env';

type RegistrationProps = {
  onSuccess?: () => void
}

const RegistrationForm = ({ onSuccess }: RegistrationProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          username,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        const { token } = result;
        const signInResult = await signIn('credentials', {
          email,
          password,
          redirect: false, 
        });

        if (signInResult?.ok) {
          if (onSuccess) {
            await onSuccess();
          }
        } else {
          toast.error('Sign-in failed after registration');
        }
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegistration = async () => {
    try {
      const signInResult = await signIn('google', { callbackUrl: '/testing/app/' });
      if (signInResult?.ok) {
        if (onSuccess) {
          await onSuccess();
        }
      } else {
        toast.error('Sign-in failed after registration');
      }
    } catch (error) {
      console.error('Error during Google registration:', error);
      toast.error('An error occurred during Google registration');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-row gap-2 mb-4">
          <Image src={'/drago.svg'} width={30} height={30} alt='image' />
          <h1 className="text-xl font-bold">NUET AI</h1>
        </div>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 mb-4">
          Create an account
        </h1>
        <form className="space-y-4" onSubmit={handleRegistration}>
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
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="John Doe"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex items-start mb-4">
            <Button variant={'sidebarOutline'} className='w-full flex flex-row gap-3 font-normal' onClick={handleGoogleRegistration}>
              <FaGoogle /> Sign Up with Google
            </Button>
          </div>
          <button
            type="submit"
            className={`w-full text-white ${isLoading ? 'bg-gray-400' : 'bg-blue-400 hover:bg-primary-700'} focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create an account'}
          </button>
          <p className="text-sm font-light text-gray-500 mt-4">
            Already have an account?{' '}
            <Link
              href={'/login'}
              className="font-medium text-primary-600 hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegistrationForm;
