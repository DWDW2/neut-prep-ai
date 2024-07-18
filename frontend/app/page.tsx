'use client'
import AboutPage from "@/components/landing/About";
import FeaturesSection from "@/components/landing/FeatureSection";
import HeroSection from "@/components/landing/Herosection";
import Header from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import { use } from "react";
import { useSession } from "next-auth/react";


export default function Home() {
  console.log(useSession().data?.accessToken)
  return (
    <div className="min-h-screen bg-gray-50">
    <Header />
    <main>
      <HeroSection />
      <FeaturesSection />
      <AboutPage />
      <Footer />
    </main>
  </div>
  );
}
