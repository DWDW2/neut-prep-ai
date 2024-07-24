'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import StreakModal from '@/components/testing/dashboard/Streak';
import Loading from '@/components/Loading';
import useCourseApi from '@/hooks/useCourse';
import HeroTesting from '@/components/testing/UserNotFound';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import PerformanceSummary from '@/components/testing/dashboard/Themes';
import Dashboard from '@/components/testing/dashboard/TestStatistics';
import Calendar from '@/components/testing/dashboard/Calendar';
import { Button } from '@/components/ui/button';


type Props = {}

export default function Testing({}: Props) {
  const router = useRouter()
  const {useGetUser, useResetTodaysXp} = useCourseApi()
  const {data:user, isLoading, isError} = useGetUser()
  const [visitDates, setVisitDates] = useState<Date[]>([]);
  const {data:session} = useSession()
  const {mutate: updateStreak, isLoading: isUpdatingStreak} = useResetTodaysXp()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [streakCount, setStreakCount] = useState(5); 
  console.log(session?.accessToken)
  console.log(user)

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    const lastShownDate = user?.lastActivityDate.toISOString().split('T')[0]

    if (lastShownDate !== currentDate) {
      setIsModalOpen(true);
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (user) {
      updateStreak();
    }
  }, [user]);

  if(isLoading){
    return(
      <Loading />
    )
  }
 return (
  <div className="min-h-screen flex flex-col">
    {
      user ? (
        <div className="flex flex-col m-4 justify-center">
          <h1 className='text-2xl font-bold text-center p-4 mb-40'>Hello, {user.username}!</h1>
          <div className='flex justify-start flex-col items-center'>
            <HeroTesting />
            <Button variant={'primary'} size={'lg'} className='text-xl font-bold w-6 h-10 mt-10'>
              Try it
            </Button>
          </div>
          {user.bestThemes.length >= 3 && (
            <div className='flex flex-row w-full p-4'>
              <div className=''>
                <PerformanceSummary themesToImprove={user.themesToImprove} />
                <Calendar visitedDays={user.visitedDays} />
              </div>
              <div className='ml-4'>
              <Dashboard points={0} skills={[]} bestSkills={[]} continueCourse={function (): void {
                  throw new Error('Function not implemented.');
                } } />
              </div>
            </div>
          )}
        </div>
      ) : (
        <HeroTesting />
      )
    }
</div>
  )
}
