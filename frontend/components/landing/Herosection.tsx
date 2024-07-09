import Image from "next/image";
import Link from "next/link";
import ScoreCard from "./ScoreCard";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  return(
  <main className="container mx-auto py-16 flex items-center justify-between px-20 max-[800px]:block max-[800px]:px-1 max-[800px]: max-[800px]:py-8 max-[800px]:text-center">
    <div className="w-1/2 pr-8 max-[800px]:w-fit max-[800px]:px-5">
      <h1 className="text-5xl font-bold mb-4 max-[800px]:text-3xl">Achieve best scores on <span className="text-[#DCAF52]">nuet exam</span> with us!</h1>
      <p className="text-gray-600 mb-8">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati itaque voluptatibus harum debitis quia reprehenderit expedita deserunt provident dolores. Consectetur ipsam eos molestias distinctio quam at aliquam expedita veniam aspernatur?</p>
      <Button variant={'primary'} size={'lg'} onClick={() => router.push('/testing')}>Get Started</Button>
    </div>
    <div className="max-[800px]:hidden w-fit">
      <ScoreCard />
    </div>
  </main>
  )}
export default HeroSection;