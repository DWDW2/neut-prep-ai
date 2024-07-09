import React, { useState, useEffect } from 'react';

type Props = {
  initialStreak: number;
  lastLoginDate: string;
};


const Streak = ({ initialStreak, lastLoginDate } : Props) => {
  const [streak, setStreak] = useState(initialStreak);
  const [lastLogin, setLastLogin] = useState(new Date(lastLoginDate));

  useEffect(() => {
    const today = new Date();
    const lastLoginDate = new Date(lastLogin);

    const differenceInTime = today.getTime() - lastLoginDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    if (differenceInDays >= 1 && differenceInDays < 2) {
      setStreak(streak + 1);
    } else if (differenceInDays >= 2) {
      setStreak(0);
    }

    setLastLogin(today);
  }, []);

  return (
    <div className="flex flex-col items-center mt-6">
      <div className="flex items-center bg-white border-2 border-gray-200 rounded-lg p-4 shadow-lg">
        <div className="text-4xl text-red-500 mr-4">🔥</div>
        <div className="text-4xl font-bold mr-4">{streak}</div>
        <div className="text-lg text-gray-600">Day Streak</div>
      </div>
    </div>
  );
};

export default Streak;
