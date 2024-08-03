'use client'
import React from 'react'
import PleaseLogin from '@/components/testing/PleaseLogin'
import UserDashboard from '@/components/testing/dashboard/Dashboard'
import useCourseApi from '@/hooks/useCourse'
import Loading from '@/components/Loading'

export default function DashboardPage() {
  const { useGetUser } = useCourseApi()
  const { data: user, isLoading } = useGetUser()

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      {user ? <UserDashboard /> : <PleaseLogin />}
    </div>
  )
}