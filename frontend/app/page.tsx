'use client'
import { NavbarDemo } from "@/components/Navbar";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight"
import Hero from "@/components/Hero";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#F8F9FF] h-screen">
      <NavbarDemo />
      <div className="flex flex-col items-center justify-center h-full mt-10">
        <Hero />
        <Link href={'/testing'}>
          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Start testing
            </span>
          </button>
        </Link>
      </div>
    </main>
  );
}
