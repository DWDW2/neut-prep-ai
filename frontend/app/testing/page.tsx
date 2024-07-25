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
import FooterNav from '@/components/testing/FooterNav';


type Props = {}

export default function Testing({}: Props) {
  const router = useRouter()
  const {useGetUser, useUpdateStreak, useUpdateXp} = useCourseApi()
  const {data:user, isLoading, isError} = useGetUser()
  const [visitDates, setVisitDates] = useState<Date[]>([]);
  const {data:session} = useSession()
  const {mutate: updateStreak, isLoading: isUpdatingStreak} = useUpdateStreak()
  console.log(session?.accessToken)
  console.log(user)

  const { refetch: updateXp } = useUpdateXp(); 

  
  useEffect(() => {
    const checkAndUpdateXp = () => {
      const lastUpdatedDate = localStorage.getItem('lastXpUpdateDate');
      const today = new Date().toISOString().split('T')[0];

      if (lastUpdatedDate !== today) {
        updateXp();
        localStorage.setItem('lastXpUpdateDate', today);
      }
    };

    checkAndUpdateXp();

    const intervalId = setInterval(checkAndUpdateXp, 24 * 60 * 60 * 1000); 
    return () => clearInterval(intervalId);
  }, [updateXp]);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateXp();
    }, 24 * 60 * 60 * 1000); 
    return () => clearInterval(intervalId);
  }, []);

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
          <div className='flex flex-col items-center justify-center h-screen'>
            <HeroTesting username={user.username}/>
            {/* <Button variant={'primary'} size={'lg'} className='text-xl font-bold w-6 h-10 mt-10'>
              Try math practice
            </Button>
            <Button variant={'primary'} size={'lg'} className='text-xl font-bold w-6 h-10 mt-10'>
              Try critical thinking practice
            </Button> */}
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
        <HeroTesting username="use" />
      )
    }
    <FooterNav />
</div>
  )
}
