import React from 'react'

type Props = {
    dailyGoal: number,
    xp: number,
}

export default function UserProgress({dailyGoal, xp}: Props) {
    const progress = (xp / dailyGoal) * 100
  return (
    <div className="mb-6 p-5 border-2 border-slate-500 rounded-3xl">
        <h1 className='text-2xl font-bold mb-2'>Daily Goal</h1>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-gray-800">{xp}/{dailyGoal} XP</p>
        </div>
        <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
          <div 
            className="bg-green-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
    </div>
  )
}