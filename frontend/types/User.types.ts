interface User {
    email?: string | null | undefined,
    username?: string,
    accessToken?: string,
    refreshToken?: string,
}

interface UserType{
  avatarUrl: string | undefined;
  email: string;
  username: string;
  password?: string;
  roadmapCriticalId?: string
  roadmapMathId?: string; 
  themesToImprove: string[]; 
  totalXp: number; 
  lastActivityDate: Date;
  longestStreak: number; 
  streak: number; 
  todaysXp: number; 
  tested: boolean;
  bestThemes: string[];
  visitedDays: string[];
}

export type {User, UserType}