'use client'
import React from 'react';
import { UserType } from '@/types/User.types';
import useCourseApi from '@/hooks/useCourse';

const ContributionGraph = ({ visitedDays }: { visitedDays: string[] }) => {
  const today = new Date();
  const lastYear = new Array(357).fill(0).map((_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - 356 + i);
    return date.toISOString().split('T')[0];
  });

  const getColor = (date: string) => {
    if (!visitedDays.includes(date)) return 'bg-gray-100';
    const count = visitedDays.filter(d => d === date).length;
    if (count === 1) return 'bg-green-200';
    if (count === 2) return 'bg-green-300';
    if (count === 3) return 'bg-green-400';
    return 'bg-green-500';
  };

  const months = [ 'Aug', 'Sep', 'Oct', 'Nov', 'Dec','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const weekdays = ['Mon', '', 'Wed', '', 'Fri', ''];

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full">
        <div className="flex">
          <div className="flex flex-col mr-2 text-xs text-right">
            {weekdays.map((day, index) => (
              <div key={index} className="h-[10px] leading-[10px]">{day}</div>
            ))}
          </div>
          <div>
            <div className="flex text-xs justify-around text-gray-600 mb-1">
              {months.map((month, index) => (
                <div key={index} className="w-[25px] mr-1">{month}</div>
              ))}
            </div>
            <div className="flex flex-col gap-[2px]">
              {[0, 1, 2, 3, 4, 5, 6].map(dayOfWeek => (
                <div key={dayOfWeek} className="flex gap-[2px]">
                  {lastYear.filter((_, index) => index % 7 === dayOfWeek).map(date => (
                    <div
                      key={date}
                      className={`w-[10px] h-[10px] ${getColor(date)}`}
                      title={`${date}: ${visitedDays.filter(d => d === date).length} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center mt-2 text-xs text-gray-600">
          <span className="mr-1">Less</span>
          <div className="flex gap-[2px]">
            <div className="w-[10px] h-[10px] bg-gray-100"></div>
            <div className="w-[10px] h-[10px] bg-green-200"></div>
            <div className="w-[10px] h-[10px] bg-green-300"></div>
            <div className="w-[10px] h-[10px] bg-green-400"></div>
            <div className="w-[10px] h-[10px] bg-green-500"></div>
          </div>
          <span className="ml-1">More</span>
        </div>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const { useGetUser } = useCourseApi();
  const { data: user, isLoading, isError } = useGetUser();

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Error loading user data</div>;
  if (!user) return <div className="text-center py-10">No user data available</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome, {user.username}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Progress</h2>
          <p className="mb-2"><span className="font-medium">Total XP:</span> {user.totalXp}</p>
          <p className="mb-2"><span className="font-medium">Todays XP:</span> {user.todaysXp}</p>
          <p className="mb-2"><span className="font-medium">Current Streak:</span> {user.streak} days</p>
          <p><span className="font-medium">Longest Streak:</span> {user.longestStreak} days</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Best Themes</h2>
          <ul className="list-disc pl-5 text-gray-600">
            {user.bestThemes.map((theme, index) => (
              <li key={index}>{theme}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Contribution Graph</h2>
        <ContributionGraph visitedDays={user.visitedDays} />
      </div>
      
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Themes to Improve</h2>
        {user.themesToImprove.length > 0 ? (
          <ul className="list-disc pl-5 text-gray-600">
            {user.themesToImprove.map((theme, index) => (
              <li key={index}>{theme}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Great job! You dont have any themes to improve right now.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;