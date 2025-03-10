'use client'
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Modal from '../testing/Modal';
import RegistrationForm from '../auth/RegistrationForms';
import { toast } from 'react-toastify';

const ParallaxBackground = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  const handleGetStartedClick = () => {
    setIsQuestionModalOpen(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full bg-[#DCAF52]"
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      >
        <svg
          className="w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          fill="white"
        >
          {/* Background pattern */}
          <path d="M20,0 L40,0 C60,20 80,20 100,0 L100,20 C80,40 60,40 40,20 L20,40 C0,20 0,20 0,0 Z" />
          <path d="M50 10 Q55 15 60 10 T70 10" stroke="white" strokeWidth="0.5" fill="none" />
          <path d="M15 85 C20 80 25 85 30 80 S40 75 45 80" stroke="white" strokeWidth="0.5" fill="none" />
          <path d="M20 50 H30 V60 H20 Z M70 40 A10 10 0 0 1 80 50" stroke="white" strokeWidth="0.5" fill="none" />

          <text x="5" y="15" fontSize="2" fill="white">E = mc²</text>
          <text x="60" y="25" fontSize="2" fill="white">∫_a^b f(x)dx</text>
          <text x="30" y="70" fontSize="2" fill="white">π ≈ 3.14159</text>
          <text x="75" y="75" fontSize="2" fill="white">Σn=1^∞ 1/n²</text>
          <text x="10" y="40" fontSize="2" fill="white">a² + b² = c²</text>
          <text x="50" y="90" fontSize="2" fill="white">y = mx + b</text>

          <circle cx="80" cy="20" r="5" stroke="white" strokeWidth="0.5" fill="none" />
          <line x1="10" y1="90" x2="90" y2="10" stroke="white" strokeWidth="0.5" />
          <polygon points="20,10 40,40 10,40" stroke="white" strokeWidth="0.5" fill="none" />
        </svg>
      </div>
      <div className="relative z-10 flex items-center justify-center h-full text-black">
        <main className="container py-16 flex items-center justify-center mx-20 max-[800px]:mx-9 max-[800px]:block max-[800px]:px-0  max-[800px]:py-8 max-[800px]:text-center  bg-white">
          <div className="w-1/2 pr-8 max-[800px]:w-full max-[800px]:px-5 float-left max-[800px]:text-center">
            <h1 className="text-5xl font-bold mb-4 max-[800px]:text-3xl text-black">Achieve best scores on <span className="text-[#DCAF52]">NUET exam</span> with us!</h1>
            <p className="text-black mb-8">Our comprehensive study platform is designed to help you excel in the NUET.
            Gain access to tailored lessons, practice tests, all in one place.</p>
            <Button variant={'primary'} size={'lg'} onClick={() => router.push('/testing/app/math')}>Get Started</Button>
          </div>
          <div className='ml-14 max-[800px]:hidden'>
            <Image src={'/Graduate-person.svg'} width={300} height={700} alt='person'/> 
          </div>
        </main> 
      </div>
    </div>
  );
};

export default ParallaxBackground;
