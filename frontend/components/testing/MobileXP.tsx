import React, { useState } from 'react';
import { FaFire } from 'react-icons/fa';

interface MobileXPDisplayProps {
  xp: number;
  dailyGoal: number;
}

const MobileXPDisplay: React.FC<MobileXPDisplayProps> = ({ xp, dailyGoal }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const progress = Math.min((xp / dailyGoal) * 100, 100);

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleExpand}
        className="bg-green-500 text-white rounded-full p-2 shadow-md flex items-center justify-center"
      >
        <FaFire className="text-xl" />
        <span className="ml-1 font-bold">{xp}</span>
      </button>
      {isExpanded && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-64">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-gray-700">Daily Goal</span>
            <span className="font-bold text-green-500">{xp} / {dailyGoal} XP</span>
          </div>
          <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-green-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileXPDisplay;