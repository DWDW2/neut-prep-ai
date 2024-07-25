'use client'
import React, { use, useEffect, useState } from 'react'
import useCourseApi from '@/hooks/useCourse';
import { UserType } from '@/types/User.types';
import LeaderboardItem from '@/components/testing/leaderboard/LeaderboardItem';
import dynamic from 'next/dynamic';
import StickySideBar from '@/components/testing/Sticky-sidebar';
import UserSideBar from '@/components/testing/XPgained';
import UserProgress from '@/components/testing/UserProgress';
import FeedWrapper from '@/components/testing/Feed-sidebar';
import { ToastContainer } from 'react-toastify';

const Loading = dynamic(() => import('@/components/Loading'), {
  ssr: false,
});


type Props = {}

export default function Leaderboard({}: Props) {
  const {useGetAllUsers, useGetUser} = useCourseApi()
  const {data:users, isLoading, isError} = useGetAllUsers()
  const [sortedUsers, setSortedUsers] = useState<UserType[]>([]);
  const {data:user} = useGetUser()

  useEffect(() => {
    if (users) {
      const sorted = [...users].sort((a, b) => b.totalXp - a.totalXp);
      setSortedUsers(sorted);
    }
  }, [users]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error fetching users.</div>;
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickySideBar>
        <section className="flex flex-col gap-y-4 p-4">
          <UserSideBar title="Daily quest" dailyGoal={20} xp={user?.todaysXp ? user.todaysXp : 0}/>
          <UserProgress dailyGoal={20} xp={user?.todaysXp ? user.todaysXp : 0}/>
        </section>
      </StickySideBar>
      <FeedWrapper>
        <section className="pt-6 gap-y-4 flex flex-col">
          <h2 className="text-2xl font-bold">Leaderboard</h2>
          <ul className="mt-4">
            {sortedUsers.map((user, index) => (
              <LeaderboardItem 
                key={index} 
                rank={index + 1} 
                user={user} 
                first={index === 0}
                third={index === 2}
                second={index === 1}
              />
            ))}
          </ul>
        </section>
      </FeedWrapper>
      <ToastContainer/>
    </div>
  );
}
