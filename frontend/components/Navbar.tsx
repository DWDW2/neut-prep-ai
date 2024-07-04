import React from 'react';
import Head from 'next/head';
interface Popa {
  icon: React.ComponentType;
  title: string;
  description: string;
}

const Header = () => (
  <header className="flex justify-between items-center p-6 max-w-6xl mx-auto">
    <div className="text-2xl  text-black font-extrabold">NUET AI</div>
    <nav className="space-x-6">
      <a href="#" className="text-gray-600 hover:text-gray-800">Home</a>
      <a href="#" className="text-gray-600 hover:text-gray-800">Features</a>
      <a href="#" className="text-gray-600 hover:text-gray-800">About</a>
    </nav>
    <button className="">Login</button>
  </header>
);

export default Header

