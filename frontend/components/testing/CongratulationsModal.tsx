'use client'
import { useEffect, useRef } from "react";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { useRouter } from "next/navigation";
import { AiOutlineClose } from 'react-icons/ai';
import html2canvas from 'html2canvas';

type Props = {
  show: boolean;
  onClose: () => void;
  xp: number;
};

const CongratulationsModal = ({ show, onClose, xp }: Props) => {
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

      if (platform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}&picture=${encodeURIComponent(dataUrl)}`, '_blank');
      } else if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?url=${currentUrl}&text=I've reached my daily XP goal of ${xp} XP!&media=${encodeURIComponent(dataUrl)}`, '_blank');
      } else if (platform === 'whatsapp') {
        window.open(`https://wa.me/?text=I've reached my daily XP goal of ${xp} XP! ${currentUrl}`, '_blank');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative" ref={modalRef}>
        <button
          className="absolute top-2 right-2 text-xl"
          onClick={onClose}
        >
          <AiOutlineClose />
        </button>
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p className="mb-4">You have reached your daily XP goal of {xp} XP!</p>
        <div className="flex justify-between">
          <button className="bg-blue-600 text-white py-2 px-4 rounded" onClick={() => captureAndShare('facebook')}>
            Share on Facebook
          </button>
          <button className="bg-blue-400 text-white py-2 px-4 rounded" onClick={() => captureAndShare('twitter')}>
            Share on Twitter
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={() => captureAndShare('whatsapp')}>
            Share on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsModal;
