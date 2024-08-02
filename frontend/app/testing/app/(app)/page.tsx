'use client'
import React from 'react'
import PleaseLogin from '@/components/testing/PleaseLogin'
import UserDashboard from '@/components/testing/dashboard/Dashboard'
import useCourseApi from '@/hooks/useCourse'

export default function DashboardPage() {
  const { useGetUser } = useCourseApi()
  const { data: user, isLoading } = useGetUser()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {user ? <UserDashboard /> : <PleaseLogin />}
    </div>
  )
}