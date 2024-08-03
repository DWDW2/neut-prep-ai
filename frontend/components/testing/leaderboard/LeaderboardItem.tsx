import React from 'react';
import { UserType } from '@/types/User.types';

type LeaderboardItemProps = {
  rank: number;
  user: UserType;
  first?: boolean;
  second?: boolean;
  third?: boolean;
}

const LeaderboardItem = ({ rank, user, first, second, third }: LeaderboardItemProps) => {
  let rankClasses = '';
  if (first) rankClasses = 'bg-yellow-400';
  if (second) rankClasses = 'bg-gray-300';
  if (third) rankClasses = 'bg-orange-400';

  return (
    <li className={`flex items-center justify-between p-4 rounded-lg shadow-md ${ second ? rankClasses : ''} hover:shadow-lg ${third ? rankClasses : '' } transition-shadow duration-200 ${rankClasses}`}>
      <div className="flex items-center">
        <span className={`font-bold text-xl mr-4 ${first ? 'text-yellow-600' : second ? 'text-gray-600' : third ? 'text-orange-600' : 'text-gray-700'}`}>
          {rank}
        </span>
        <div>
          <p className="font-semibold">{user.username}</p>
          <p className="text-sm text-gray-500">{user.totalXp} XP</p>
        </div>
      </div>
    </li>
  );
};

export default LeaderboardItem;
