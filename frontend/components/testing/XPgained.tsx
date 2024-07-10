import React from 'react'
import {Award, Zap} from 'react-feather'
type Props = {
    title: string,
    dailyGoal: number,
    xp: number,
}

export default function UserSideBar({title, dailyGoal, xp}: Props) {
  return (
    <div className="flex items-center justify-between p-5 rounded-2xl border-2 border-slate-500 w-full">
    <div className="flex items-center">
      <div className="bg-purple-100 p-3 rounded-full mr-4">
        <Zap className="text-purple-500" size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-600">XP Gained Today</p>
        <p className="text-xl font-semibold text-gray-800">{xp} XP</p>
      </div>
    </div>
  </div>
  )
}