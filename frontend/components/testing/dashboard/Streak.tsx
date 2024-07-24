import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Confetti from 'react-confetti';

Modal.setAppElement('#__next'); // This sets the root element for accessibility reasons.

interface StreakModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  streakCount: number;
}

const StreakModal: React.FC<StreakModalProps> = ({ isOpen, onRequestClose, streakCount }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); 
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="flex items-center justify-center h-screen bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p className="text-lg">You have achieved a {streakCount}-day streak!</p>
        <button onClick={onRequestClose} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          Close
        </button>
      </div>
      {showConfetti && <Confetti />}
    </Modal>
  );
};

export default StreakModal;
