import RegistrationForm from '@/components/auth/RegistrationForms'
import React from 'react'

type Props = {}

export default function Register({}: Props) {
  return (
    <section className="bg-gray-100 h-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <RegistrationForm />
        </div>
      </div>
    </section>
  )
}