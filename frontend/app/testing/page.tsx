// pages/testing/index.tsx
'use client'
import React, { useEffect } from 'react';
import StudyPathPrompt from '@/components/testing/StudyGoalPrompt';
import FooterNav from '@/components/testing/FooterNav';

type Props = {}

export default function Testing({}: Props) {
  
  return (
    <div className="min-h-screen flex flex-col">
      <StudyPathPrompt />
    </div>
  );
}
