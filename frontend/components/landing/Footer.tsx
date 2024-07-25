import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, } from 'react-feather';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Image src={'/drago.svg'} width={35} height={35} alt="Nuet ai" />
              <h3 className="text-lg font-semibold ml-3">Nuet ai</h3>
            </div>
            <p className="text-gray-400 mb-4">Ace the NUET with our personalized study plans, interactive lessons, and practice tests. Start your journey to success today!.</p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/nuet_prepper" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/zhansar-sadriev-7951182a7/" className="text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link href="#about" className="text-gray-400 hover:text-white">About</Link></li>
              <li><Link href="https://www.instagram.com/zhansar822/" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Nuet ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;