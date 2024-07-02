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
          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mt-3">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Start testing
            </span>
          </button>
        </Link>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
    </main>
  );
}
