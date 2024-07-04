import Lottie from 'react-lottie';
import animationData from '../public/Aniki Hamster.json';
import { useState, useEffect } from 'react';

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const [loadingText, setLoadingText] = useState('Loading...');
  const [textIndex, setTextIndex] = useState(0);

  const loadingTexts = ['Loading...', 'Generating tests...', 'Fetching database...'];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 2000); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r bg-[#DCAF52] text-white">
      <Lottie options={defaultOptions} height={300} width={300} />
      <div className="mt-4 text-xl font-bold animate-bounce">{loadingTexts[textIndex]}</div>
    </div>
  );
};

export default Loading;
