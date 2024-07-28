import React from 'react';
import { UserType } from '@/types/User.types';
import Image from 'next/image';
type Props = {
  rank: number;
  user: UserType;
  first: boolean;
  second:boolean;
  third:boolean;
};

export default function LeaderboardItem({ rank, user, first, second, third}: Props) {
  return (
    <li className="flex flex-row justify-between mb-2">
      <div className='flex items-center gap-4'>
        <span className="font-bold">{rank}</span>
        <div className="flex items-center gap-2">
          <span>{user.username}</span>
        </div>
        <span className="text-gray-500">{user.totalXp} XP</span>
      </div>
      <Image src={'/testing/medal-gold-svgrepo-com.svg'} alt='crown' width={35} height={35} className={first ? 'float-right' : 'hidden'}/>
      <Image src={'/testing/silver-medal-svgrepo-com.svg'} alt='crown' width={35} height={35} className={second ? 'float-right' : 'hidden'}/>
      <Image src={'/testing/bronze-medal-svgrepo-com.svg'} alt='crown' width={35} height={35} className={third ? 'float-right' : 'hidden'}/>
    </li>
  );
}
