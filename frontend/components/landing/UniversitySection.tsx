import { ArrowRight } from "lucide-react";
import Link from "next/link";

const UniversitySection = () => (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div className="w-2/3">
          <h2 className="text-3xl font-bold mb-4 text-white">Your way to the best university in Kazakhstan</h2>
          <Link href="/testing">
            <button className="bg-[#DCAF52] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-600 transition duration-300 shadow-lg flex items-center">
                Try NUET AI
                <ArrowRight className="ml-2" size={20} />
            </button>  
          </Link>
        </div>
        <div className="w-1/3 flex justify-end">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
            <span className="text-4xl font-bold text-blue-600">NZ</span>
          </div>
        </div>
      </div>
    </section>
    
)

export default UniversitySection;