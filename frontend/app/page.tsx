'use client'
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight"
import Hero from "@/components/Hero";
import Link from "next/link";
import { ToggleTheme } from "@/components/ThemeToggle";
import { Grid } from "@/components/Grid";

export default function Home() {
  return (
    <main className="h-[50rem] w-full dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative">
      <div className="flex flex-row justify-between pt-4 pb-2 px-3 backdrop-blur-sm bg-white/30"> 
        <div className="font-bold text-black text-2xl flex items-center">
          UniAI
        </div>
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center mt-36">
        <Hero />
        <Link href={'/testing'}>
        <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black  text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 mt-5">
          Start Testing
        </button>
        </Link>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
    </main>
  );
}
