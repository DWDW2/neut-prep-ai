import Image from "next/image";
import Link from "next/link";
import ScoreCard from "./ScoreCard";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  return(
  <main className="container mx-auto px-4 py-16 flex items-center pl-14">
    <div className="w-1/2 pr-8">
      <h1 className="text-5xl font-bold mb-4">Achieve best scores on <span className="text-[#DCAF52]">nuet exam</span> with us!</h1>
      <p className="text-gray-600 mb-8">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati itaque voluptatibus harum debitis quia reprehenderit expedita deserunt provident dolores. Consectetur ipsam eos molestias distinctio quam at aliquam expedita veniam aspernatur?</p>
      <Button variant={'primary'} size={'lg'} onClick={() => router.push('/testing')}>Get Started</Button>
    </div>
    <div className="w-1/2 relative">
      <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-purple-200 rounded-full -z-10"></div>
      <ScoreCard />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-cyan-300 rounded-full -z-10"></div>
    </div>
  </main>
  )}
export default HeroSection;