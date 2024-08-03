import React, { useEffect, useRef } from 'react';
// import { FacebookShareButton, TwitterShareButton, WhatsAppShareButton } from 'react-share';
import { useRouter } from 'next/navigation';
import { AiOutlineClose } from 'react-icons/ai';
import { FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import html2canvas from 'html2canvas';

type Props = {
  show: boolean;
  onClose: () => void;
  xp: number;
};

const CongratulationsModal = ({ show, onClose, xp = 20 }: Props) => {
  const router = useRouter();
  const modalRef = useRef(null);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [show]);

  if (!show) return null;

  const captureAndShare = async (platform: string) => {
    if (modalRef.current) {
      const canvas = await html2canvas(modalRef.current);
      const dataUrl = canvas.toDataURL('image/png');
      const shareText = `🎉 I just earned ${xp} XP on my language learning journey! 🚀 Join me on Duolingo!`;

      if (platform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}&quote=${encodeURIComponent(shareText)}`, '_blank');
      } else if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodeURIComponent(shareText)}`, '_blank');
      } else if (platform === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`, '_blank');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-yellow-400 rounded-2xl shadow-lg p-6 w-full max-w-md relative" ref={modalRef}>
        <button
          className="absolute top-2 right-2 text-xl text-white"
          onClick={onClose}
        >
          <AiOutlineClose />
        </button>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">🎉 Congratulations! 🎉</h2>
          <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-4">
            <span className="text-5xl">🐹</span>
          </div>
          <p className="text-xl font-semibold mb-4 text-white">You earned {xp} XP today!</p>
          <p className="text-lg mb-6 text-white">Keep up the great work!</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-full flex items-center" onClick={() => captureAndShare('facebook')}>
              <FaFacebookF className="mr-2" /> Share
            </button>
            <button className="bg-blue-400 text-white py-2 px-4 rounded-full flex items-center" onClick={() => captureAndShare('twitter')}>
              <FaTwitter className="mr-2" /> Tweet
            </button>
            <button className="bg-green-500 text-white py-2 px-4 rounded-full flex items-center" onClick={() => captureAndShare('whatsapp')}>
              <FaWhatsapp className="mr-2" /> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsModal;