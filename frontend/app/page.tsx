'use client'
import FeaturesSection from "@/components/landing/FeatureSection";
import HeroSection from "@/components/landing/Herosection";
import UniversitySection from "@/components/landing/UniversitySection";
import Header from "@/components/Navbar";



export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
    <Header />
    <main>
      <HeroSection />
      <FeaturesSection />
      <UniversitySection />
    </main>
  </div>
  );
}
