'use client'
import { SessionProvider } from 'next-auth/react';
import React from 'react'
import { QueryClientProvider, QueryClient } from 'react-query';

type Props = {
    children: any;
}

export default function GlobalProvider({children}: Props) {
    const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </QueryClientProvider>
  )
}