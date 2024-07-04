import Link from "next/link";

const HeroSection = () => (
    <section className="text-center py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-black ">NUET AI</h1>
        <h2 className="text-3xl font-semibold mb-6 text-[#DCAF52]">IMPROVE YOUR SCORE</h2>
        <p className="text-xl mb-8 text-gray-600">Model your test-taking AI strategies to generate new practice test questions made just for you.</p>
        <Link href="/testing">
            <button className="bg-[#DCAF52] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-600 transition duration-300 shadow-lg">
            Get Started
            </button>
        </Link>
      </div>
    </section>
  );
export default HeroSection;