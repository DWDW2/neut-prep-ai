import Lottie from 'react-lottie';
import animationData from '../public/Aniki Hamster.json'

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r bg-[#DCAF52] text-white">
      <Lottie options={defaultOptions} height={300} width={300} />
      <div className="mt-4 text-xl font-bold animate-bounce">Loading...</div>
    </div>
  );
};

export default Loading;
