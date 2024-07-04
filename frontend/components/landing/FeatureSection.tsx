import { ArrowRight, Book, PenTool, BarChart2 } from 'lucide-react';
import React from 'react';

interface Popa {
  icon: React.ComponentType;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: Popa) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
      <div className="w-12 h-12 bg-[#DCAF52] rounded-full flex items-center justify-center mb-4">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
  
  const FeaturesSection = () => (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-500">A brief description of how this AI application works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={PenTool}
            title="Generating your own way" 
            description="Create personalized practice questions tailored to your learning style and needs." 
          />
          <FeatureCard 
            icon={Book}
            title="Infinite practice" 
            description="Access an unlimited pool of AI-generated questions to hone your skills continuously." 
          />
          <FeatureCard 
            icon={BarChart2}
            title="Reporting" 
            description="Track your progress with detailed analytics and performance insights." 
          />
        </div>
      </div>
    </section>
  );
  
  export default FeaturesSection